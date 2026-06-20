// Whole-app backup: ledger state plus every companion localStorage key
// (chapter mastery, AI threads, flashcards), in one portable JSON envelope.

import { chapters } from "../data/catalog";
import { AI_THREADS_KEY } from "./aiThreads";
import { CARD_PROGRESS_KEY, USER_CARDS_KEY } from "./flashcards";
import { normalizeImportedState, type LedgerState } from "./state";

export const BACKUP_APP_ID = "trinsic";
const LEGACY_BACKUP_APP_IDS = new Set(["fr-study-os", BACKUP_APP_ID]);
export const BACKUP_SCHEMA = 2;

export type FullBackup = {
  app: typeof BACKUP_APP_ID;
  schema: typeof BACKUP_SCHEMA;
  exportedAt: string;
  ledger: LedgerState;
  companionKeys: Record<string, string>;
};

// Every localStorage key the app owns outside the main ledger state.
const companionKeyList = (): string[] => [
  ...chapters.filter((chapter) => chapter.doc).map((chapter) => chapter.doc!.storageKey),
  AI_THREADS_KEY,
  USER_CARDS_KEY,
  CARD_PROGRESS_KEY,
];

export const buildFullBackup = (ledger: LedgerState): FullBackup => {
  const companionKeys: Record<string, string> = {};
  for (const key of companionKeyList()) {
    try {
      const value = localStorage.getItem(key);
      if (value !== null) companionKeys[key] = value;
    } catch {
      // storage unavailable — export the ledger alone
    }
  }

  return {
    app: BACKUP_APP_ID,
    schema: BACKUP_SCHEMA,
    exportedAt: new Date().toISOString(),
    ledger,
    companionKeys,
  };
};

export const serializeFullBackup = (ledger: LedgerState) => JSON.stringify(buildFullBackup(ledger), null, 2);

// Restores companion keys (if present) and returns the ledger state to load.
// Accepts the v2 envelope, the plain v1 ledger JSON, and legacy HTML-tracker
// backups, so every old export remains importable.
export const parseAnyBackup = (backupText: string): LedgerState => {
  const parsed: unknown = JSON.parse(backupText);

  if (
    typeof parsed === "object" &&
    parsed !== null &&
    typeof (parsed as FullBackup).app === "string" &&
    LEGACY_BACKUP_APP_IDS.has((parsed as FullBackup).app) &&
    typeof (parsed as FullBackup).ledger === "object"
  ) {
    const envelope = parsed as FullBackup;
    if (envelope.companionKeys && typeof envelope.companionKeys === "object") {
      for (const [key, value] of Object.entries(envelope.companionKeys)) {
        if (typeof value !== "string") continue;
        try {
          localStorage.setItem(key, value);
        } catch {
          // best-effort restore
        }
      }
    }
    return normalizeImportedState(envelope.ledger);
  }

  return normalizeImportedState(parsed);
};

export const downloadBackupFile = (ledger: LedgerState) => {
  const stamp = new Date().toISOString().slice(0, 10);
  const blob = new Blob([serializeFullBackup(ledger)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = `trinsic-backup-${stamp}.json`;
  document.body.appendChild(anchor);
  anchor.click();
  anchor.remove();
  URL.revokeObjectURL(url);
};
