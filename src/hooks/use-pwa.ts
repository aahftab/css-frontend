import { useState, useEffect } from 'react';
import { registerSW } from 'virtual:pwa-register';

export function usePWA() {
  const [needRefresh, setNeedRefresh] = useState(false);
  const [offlineReady, setOfflineReady] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [updateSW, setUpdateSW] = useState<(() => Promise<void>) | undefined>(undefined);

  useEffect(() => {
    const handleStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    // Listen for online/offline events
    window.addEventListener('online', handleStatusChange);
    window.addEventListener('offline', handleStatusChange);

    try {
      const registerSWHandler = registerSW({
        onNeedRefresh() {
          setNeedRefresh(true);
        },
        onOfflineReady() {
          setOfflineReady(true);
        },
      });
      
      setUpdateSW(() => registerSWHandler);
    } catch (error) {
      console.error('PWA registration failed:', error);
    }

    return () => {
      window.removeEventListener('online', handleStatusChange);
      window.removeEventListener('offline', handleStatusChange);
    };
  }, []);

  const refresh = () => {
    if (updateSW) {
      updateSW().catch(console.error);
      setNeedRefresh(false);
    }
  };

  return { needRefresh, offlineReady, isOnline, refresh };
}