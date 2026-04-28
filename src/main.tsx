import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Register service worker for PWA / Google Play Store support
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    const swUrl = `${import.meta.env.BASE_URL}service-worker.js`;
    navigator.serviceWorker
      .register(swUrl, { scope: import.meta.env.BASE_URL })
      .catch((err) => {
        console.warn("[SW] Registration failed:", err);
      });
  });
}

createRoot(document.getElementById("root")!).render(<App />);
