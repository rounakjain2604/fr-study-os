import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './styles/dashboard.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

if ("serviceWorker" in navigator) {
  if (import.meta.env.PROD) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register(`${import.meta.env.BASE_URL}sw.js`).then((registration) => {
        const activateWaitingWorker = () => registration.waiting?.postMessage({ type: "SKIP_WAITING" });

        registration.addEventListener("updatefound", () => {
          const worker = registration.installing;
          if (!worker) return;
          worker.addEventListener("statechange", () => {
            if (worker.state === "installed" && navigator.serviceWorker.controller) activateWaitingWorker();
          });
        });

        window.setInterval(() => registration.update().catch(() => undefined), 60 * 60 * 1000);
        registration.update().catch(() => undefined);
      }).catch(() => undefined);

      let refreshing = false;
      navigator.serviceWorker.addEventListener("controllerchange", () => {
        if (refreshing) return;
        refreshing = true;
        // Leave a breadcrumb so the freshly-loaded build can confirm the update.
        try {
          localStorage.setItem("fr45-just-updated", "1");
        } catch {
          // storage unavailable — reload silently
        }
        window.location.reload();
      });
    });
  } else {
    // Dev: make sure no previously-installed worker serves stale cached assets.
    navigator.serviceWorker.getRegistrations()
      .then((registrations) => Promise.all(registrations.map((registration) => registration.unregister())))
      .catch(() => undefined);
    if ("caches" in window) {
      caches.keys()
        .then((keys) => Promise.all(keys.filter((key) => key.startsWith("fr-study-os")).map((key) => caches.delete(key))))
        .catch(() => undefined);
    }
  }
}
