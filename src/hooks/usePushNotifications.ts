import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";

interface PushNotificationState {
  isSupported: boolean;
  isSubscribed: boolean;
  permission: NotificationPermission | "default";
}

export const usePushNotifications = (email?: string) => {
  const [state, setState] = useState<PushNotificationState>({
    isSupported: false,
    isSubscribed: false,
    permission: "default",
  });
  const [vapidKey, setVapidKey] = useState<string | null>(null);

  useEffect(() => {
    const isSupported = "serviceWorker" in navigator && "PushManager" in window;
    setState((prev) => ({
      ...prev,
      isSupported,
      permission: isSupported ? Notification.permission : "default",
    }));

    if (isSupported) {
      // Fetch VAPID key
      supabase.functions.invoke("get-vapid-key").then(({ data, error }) => {
        if (!error && data?.vapidPublicKey) {
          setVapidKey(data.vapidPublicKey);
        }
      });
    }
  }, []);

  const subscribe = useCallback(
    async (userEmail: string) => {
      if (!state.isSupported || !vapidKey) {
        console.error("Push notifications not supported or VAPID key missing");
        return false;
      }

      try {
        // Request permission
        const permission = await Notification.requestPermission();
        setState((prev) => ({ ...prev, permission }));

        if (permission !== "granted") {
          console.log("Notification permission denied");
          return false;
        }

        // Register service worker
        const registration = await navigator.serviceWorker.register("/sw.js");
        await navigator.serviceWorker.ready;

        // Subscribe to push
        const applicationServerKey = urlBase64ToUint8Array(vapidKey);
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: applicationServerKey.buffer as ArrayBuffer,
        });

        // Save subscription to backend
        const { error } = await supabase.functions.invoke(
          "save-push-subscription",
          {
            body: {
              email: userEmail,
              subscription: subscription.toJSON(),
            },
          }
        );

        if (error) {
          console.error("Error saving subscription:", error);
          return false;
        }

        setState((prev) => ({ ...prev, isSubscribed: true }));
        return true;
      } catch (err) {
        console.error("Error subscribing to push:", err);
        return false;
      }
    },
    [state.isSupported, vapidKey]
  );

  return {
    ...state,
    subscribe,
  };
};

// Helper function to convert base64 to Uint8Array
function urlBase64ToUint8Array(base64String: string): Uint8Array {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
}
