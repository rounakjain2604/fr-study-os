// Cloud sync: keeps every device's full state (ledger, cards, mastery, AI
// chats) mirrored through the Worker's /api/sync endpoint, using the same
// v2 backup envelope the Vault exports. Whole-envelope last-write-wins —
// fine for a single owner moving between phone and desktop.

import { getAiServerBaseUrl, getSyncSecret, setSyncSecret } from "./ai";
import { buildFullBackup, parseAnyBackup, type FullBackup } from "./backup";
import { loadLedgerState, saveLedgerState } from "./state";

const SYNC_LAST_SEEN_KEY = "fr45-sync-last";
const SYNC_SNAPSHOT_KEY = "fr45-sync-snapshot";

export type SyncStatus = "off" | "syncing" | "synced" | "error";

export { getSyncSecret, setSyncSecret };

export const syncConfigured = () => !!(getAiServerBaseUrl() && getSyncSecret());

const syncUrl = () => `${getAiServerBaseUrl()}/api/sync`;

const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getSyncSecret()}`,
});

const getLastSeen = (): string | null => {
  try {
    return localStorage.getItem(SYNC_LAST_SEEN_KEY);
  } catch {
    return null;
  }
};

const setLastSeen = (updatedAt: string | null) => {
  try {
    if (updatedAt) localStorage.setItem(SYNC_LAST_SEEN_KEY, updatedAt);
    else localStorage.removeItem(SYNC_LAST_SEEN_KEY);
  } catch {
    // storage unavailable
  }
};

// Stable fingerprint of the envelope. Bookkeeping timestamps (exportedAt,
// ledger.updatedAt — bumped on every save — and lastBackupAt) are excluded so
// only real edits change the hash; otherwise every app-open would look like
// new content and ping-pong reloads between devices.
const fingerprint = (envelope: FullBackup): string => {
  const stable = JSON.stringify({
    ledger: { ...envelope.ledger, updatedAt: "", lastBackupAt: "" },
    companionKeys: envelope.companionKeys,
  });
  let hash = 5381;
  for (let index = 0; index < stable.length; index += 1) {
    hash = ((hash << 5) + hash + stable.charCodeAt(index)) | 0;
  }
  return `${stable.length}:${hash}`;
};

const getSnapshot = (): string | null => {
  try {
    return localStorage.getItem(SYNC_SNAPSHOT_KEY);
  } catch {
    return null;
  }
};

const setSnapshot = (value: string) => {
  try {
    localStorage.setItem(SYNC_SNAPSHOT_KEY, value);
  } catch {
    // storage unavailable
  }
};

const buildEnvelope = (): FullBackup => buildFullBackup(loadLedgerState());

export const hasLocalChanges = (): boolean => {
  if (!syncConfigured()) return false;
  return fingerprint(buildEnvelope()) !== getSnapshot();
};

// A device with no real study data (fresh install) must adopt the cloud copy
// rather than "win" a timestamp race with its just-created empty state.
const isPristineLocal = (envelope: FullBackup): boolean => {
  const { ledger, companionKeys } = envelope;
  const ledgerEmpty =
    Object.keys(ledger.checkedTasks).length === 0 &&
    Object.keys(ledger.actualHours).length === 0 &&
    Object.keys(ledger.notes).length === 0 &&
    ledger.mistakes.length === 0 &&
    ledger.mockAttempts.length === 0;
  const companionsEmpty = Object.values(companionKeys).every((value) => value === "[]" || value === "{}" || !value);
  return ledgerEmpty && companionsEmpty;
};

// Applies a server envelope to this device. Returns true when the page should
// reload so every view re-reads the restored stores.
const applyServerEnvelope = (data: unknown, updatedAt: string): boolean => {
  const incoming = data as FullBackup;
  const incomingPrint = fingerprint(incoming);
  if (incomingPrint === fingerprint(buildEnvelope())) {
    // Same content, just record the server version.
    setLastSeen(updatedAt);
    setSnapshot(incomingPrint);
    return false;
  }

  const ledger = parseAnyBackup(JSON.stringify(incoming));
  saveLedgerState(ledger);
  setLastSeen(updatedAt);
  setSnapshot(fingerprint(buildEnvelope()));
  return true;
};

type PushResult = { ok: boolean; conflict?: { updatedAt: string; data: unknown } };

const pushEnvelope = async (force = false): Promise<PushResult> => {
  const envelope = buildEnvelope();
  const response = await fetch(syncUrl(), {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ parentUpdatedAt: getLastSeen(), force, data: envelope }),
  });

  if (response.status === 409) {
    const body = await response.json();
    return { ok: false, conflict: { updatedAt: body.updatedAt, data: body.data } };
  }
  if (!response.ok) throw new Error(`Sync push failed (HTTP ${response.status}).`);

  const body = await response.json();
  setLastSeen(body.updatedAt);
  setSnapshot(fingerprint(envelope));
  return { ok: true };
};

// Newer side wins a conflict. "Newer" = the ledger's updatedAt, which is
// bumped on every real edit on either device.
const resolveConflict = async (conflict: { updatedAt: string; data: unknown }): Promise<boolean> => {
  const serverLedgerUpdated = (conflict.data as FullBackup)?.ledger?.updatedAt ?? "";
  const localLedgerUpdated = loadLedgerState().updatedAt ?? "";

  if (localLedgerUpdated > serverLedgerUpdated) {
    setLastSeen(conflict.updatedAt);
    await pushEnvelope(true);
    return false;
  }
  return applyServerEnvelope(conflict.data, conflict.updatedAt);
};

export type SyncOutcome = { status: SyncStatus; reloaded?: boolean; detail?: string };

// Pull-then-push reconciliation. Returns whether the caller should reload.
export const syncNow = async (): Promise<SyncOutcome> => {
  if (!syncConfigured()) return { status: "off" };

  try {
    const response = await fetch(syncUrl(), { headers: authHeaders() });
    if (response.status === 401) return { status: "error", detail: "Wrong sync passphrase." };
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const server = (await response.json()) as { updatedAt: string | null; data: unknown };

    // First device to sync seeds the server.
    if (!server.updatedAt || !server.data) {
      await pushEnvelope(true);
      return { status: "synced" };
    }

    if (server.updatedAt !== getLastSeen()) {
      // Server moved since we last looked (another device pushed), or this
      // device is syncing for the first time.
      const firstContact = getLastSeen() === null;
      if (firstContact && isPristineLocal(buildEnvelope())) {
        const reloaded = applyServerEnvelope(server.data, server.updatedAt);
        return { status: "synced", reloaded };
      }
      if (hasLocalChanges()) {
        const reloaded = await resolveConflict({ updatedAt: server.updatedAt, data: server.data });
        return { status: "synced", reloaded };
      }
      const reloaded = applyServerEnvelope(server.data, server.updatedAt);
      return { status: "synced", reloaded };
    }

    // Server unchanged — push if this device has new edits.
    if (hasLocalChanges()) {
      const result = await pushEnvelope();
      if (!result.ok && result.conflict) {
        const reloaded = await resolveConflict(result.conflict);
        return { status: "synced", reloaded };
      }
    }
    return { status: "synced" };
  } catch (error) {
    return { status: "error", detail: error instanceof Error ? error.message : "Sync failed." };
  }
};

// Fire-and-forget push when the app is being hidden/closed. keepalive caps
// payloads (~64KB), so large states quietly skip — the next open syncs them.
export const pushOnHide = () => {
  if (!syncConfigured() || !hasLocalChanges()) return;
  const body = JSON.stringify({ parentUpdatedAt: getLastSeen(), force: true, data: buildEnvelope() });
  if (body.length > 60_000) return;
  try {
    void fetch(syncUrl(), { method: "PUT", headers: authHeaders(), body, keepalive: true });
  } catch {
    // best effort
  }
};
