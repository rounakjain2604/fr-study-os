import { useEffect, useState } from "react";
import { AlertTriangle, CheckCircle2, Info, X } from "lucide-react";
import { dismissToast, subscribeToasts, type ToastItem } from "../lib/toast";

const cx = (...classes: Array<string | false | null | undefined>) => classes.filter(Boolean).join(" ");

const iconFor = (tone: ToastItem["tone"]) => {
  if (tone === "success") return CheckCircle2;
  if (tone === "error") return AlertTriangle;
  return Info;
};

export function Toaster() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  useEffect(() => subscribeToasts(setToasts), []);

  if (!toasts.length) return null;

  return (
    <div className="toaster" role="status" aria-live="polite">
      {toasts.map((entry) => {
        const Icon = iconFor(entry.tone);
        return (
          <div className={cx("toast", entry.tone)} key={entry.id}>
            <Icon size={16} strokeWidth={2} />
            <span>{entry.message}</span>
            <button aria-label="Dismiss" type="button" onClick={() => dismissToast(entry.id)}>
              <X size={14} />
            </button>
          </div>
        );
      })}
    </div>
  );
}
