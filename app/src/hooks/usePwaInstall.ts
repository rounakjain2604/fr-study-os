import { useCallback, useEffect, useState } from "react";

// The `beforeinstallprompt` event isn't in the standard lib DOM types.
type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>;
};

const standalone = () =>
  window.matchMedia("(display-mode: standalone)").matches ||
  // iOS Safari
  (window.navigator as unknown as { standalone?: boolean }).standalone === true;

/**
 * Surfaces the browser's "Add to home screen" prompt as an in-app action.
 * `canInstall` is true only when the browser has offered a deferred prompt and
 * the app isn't already installed/standalone.
 */
export function usePwaInstall() {
  const [deferred, setDeferred] = useState<BeforeInstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(standalone);

  useEffect(() => {
    const onPrompt = (event: Event) => {
      event.preventDefault();
      setDeferred(event as BeforeInstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setDeferred(null);
    };
    window.addEventListener("beforeinstallprompt", onPrompt);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onPrompt);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  const promptInstall = useCallback(async () => {
    if (!deferred) return;
    await deferred.prompt();
    await deferred.userChoice;
    setDeferred(null);
  }, [deferred]);

  return { canInstall: Boolean(deferred) && !installed, promptInstall };
}
