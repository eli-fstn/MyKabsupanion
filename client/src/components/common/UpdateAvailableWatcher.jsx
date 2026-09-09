import { useEffect, useRef } from "react";
import { registerSW } from "virtual:pwa-register";
import { useToast } from "../../context/toastContext";

function UpdateAvailableWatcher() {
  const { showToast } = useToast();
  const hasPrompted = useRef(false);

  useEffect(() => {
    const updateSW = registerSW({
      immediate: true,
      onNeedRefresh() {
        if (hasPrompted.current) return;
        hasPrompted.current = true;

        showToast(
          "Kabsupanion has been updated. Refresh to see the latest changes.",
          "info",
          {
            persist: true,
            action: { label: "Refresh Now", onClick: () => updateSW(true) },
          }
        );
      },
      onOfflineReady() {
        console.log("Kabsupanion is ready to work offline.");
      },
      onRegisteredSW(swUrl, registration) {
        if (!registration) return;

        setInterval(() => {
          registration.update();
        }, 5 * 60 * 1000);
      },
    });
  }, [showToast]);

  return null;
}

export default UpdateAvailableWatcher;