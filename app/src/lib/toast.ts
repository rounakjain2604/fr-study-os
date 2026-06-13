// Tiny module-level toast store. Importable anywhere (no context plumbing);
// a single <Toaster /> mounted in App subscribes and renders.

export type ToastTone = "default" | "success" | "error";

export type ToastItem = {
  id: number;
  message: string;
  tone: ToastTone;
};

type Listener = (toasts: ToastItem[]) => void;

let toasts: ToastItem[] = [];
const listeners = new Set<Listener>();
let counter = 0;

const emit = () => {
  for (const listener of listeners) listener(toasts);
};

export function toast(message: string, tone: ToastTone = "default", ttl = 3200): number {
  const id = ++counter;
  // Cap the stack so a burst of events can't bury the screen.
  toasts = [...toasts, { id, message, tone }].slice(-4);
  emit();
  if (ttl > 0) window.setTimeout(() => dismissToast(id), ttl);
  return id;
}

export function dismissToast(id: number) {
  toasts = toasts.filter((entry) => entry.id !== id);
  emit();
}

export function subscribeToasts(listener: Listener): () => void {
  listeners.add(listener);
  listener(toasts);
  return () => {
    listeners.delete(listener);
  };
}
