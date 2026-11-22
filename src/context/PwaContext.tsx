import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from 'react';
import { useRegisterSW } from 'virtual:pwa-register/react';
import { loadActiveWorkoutSession } from '../services/workoutStorage';

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}

export interface PwaContextValue {
  isOnline: boolean;
  canInstallPrompt: boolean;
  isInstalled: boolean;
  justInstalledSuccess: boolean;
  dismissInstalledSuccess: () => void;
  triggerInstallPrompt: () => Promise<void>;
  showManualInstructionsModal: boolean;
  setShowManualInstructionsModal: (show: boolean) => void;
  needRefresh: boolean;
  offlineReady: boolean;
  dismissOfflineReady: () => void;
  dismissUpdateNotification: () => void;
  applyServiceWorkerUpdate: () => Promise<void>;
  isWorkoutCurrentlyActive: boolean;
}

const PwaContext = createContext<PwaContextValue | null>(null);

export const PwaProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  // 1. Online / Offline status tracking
  const [isOnline, setIsOnline] = useState<boolean>(() =>
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  // 2. Installability & Standalone detection
  const [deferredPrompt, setDeferredPrompt] =
    useState<BeforeInstallPromptEvent | null>(null);
  const [isInstalled, setIsInstalled] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const isStandaloneDisplay = window.matchMedia(
      '(display-mode: standalone)'
    ).matches;
    const isIosStandalone = Boolean(
      (window.navigator as unknown as { standalone?: boolean }).standalone
    );
    return isStandaloneDisplay || isIosStandalone;
  });
  const [justInstalledSuccess, setJustInstalledSuccess] =
    useState<boolean>(false);
  const [showManualInstructionsModal, setShowManualInstructionsModal] =
    useState<boolean>(false);

  // 3. Service Worker Registration & Update Detection (prompt mode)
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    onRegisteredSW(_swUrl, registration) {
      // Periodically check for updates every 60 minutes when online
      if (registration) {
        window.setInterval(() => {
          if (navigator.onLine) {
            registration.update().catch(() => {});
          }
        }, 60 * 60 * 1000);
      }
    },
  });

  // Listen for online/offline events
  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Listen for beforeinstallprompt, appinstalled, and display-mode changes
  useEffect(() => {
    const handleBeforeInstallPrompt = (e: Event) => {
      // Prevent default mini-infobar so we can trigger it from our custom Install App button
      e.preventDefault();
      setDeferredPrompt(e as BeforeInstallPromptEvent);
    };

    const handleAppInstalled = () => {
      setDeferredPrompt(null);
      setIsInstalled(true);
      setJustInstalledSuccess(true);
    };

    const mediaQuery = window.matchMedia('(display-mode: standalone)');
    const handleDisplayModeChange = (e: MediaQueryListEvent) => {
      if (e.matches) {
        setIsInstalled(true);
        setDeferredPrompt(null);
      }
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);
    mediaQuery.addEventListener('change', handleDisplayModeChange);

    return () => {
      window.removeEventListener(
        'beforeinstallprompt',
        handleBeforeInstallPrompt
      );
      window.removeEventListener('appinstalled', handleAppInstalled);
      mediaQuery.removeEventListener('change', handleDisplayModeChange);
    };
  }, []);

  const triggerInstallPrompt = useCallback(async () => {
    if (!deferredPrompt) return;
    try {
      await deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult.outcome === 'accepted') {
        setDeferredPrompt(null);
      }
    } catch {
      // Prompt dismissed or failed
    }
  }, [deferredPrompt]);

  // Check if an active workout is currently running so updates never interrupt a session
  const activeSession = loadActiveWorkoutSession();
  const isWorkoutCurrentlyActive = Boolean(
    activeSession && activeSession.stage === 'active'
  );

  const applyServiceWorkerUpdate = useCallback(async () => {
    // User explicitly confirmed update; localStorage workout history & goals remain untouched
    await updateServiceWorker(true);
  }, [updateServiceWorker]);

  const value: PwaContextValue = {
    isOnline,
    canInstallPrompt: Boolean(deferredPrompt) && !isInstalled,
    isInstalled,
    justInstalledSuccess,
    dismissInstalledSuccess: () => setJustInstalledSuccess(false),
    triggerInstallPrompt,
    showManualInstructionsModal,
    setShowManualInstructionsModal,
    needRefresh,
    offlineReady,
    dismissOfflineReady: () => setOfflineReady(false),
    dismissUpdateNotification: () => setNeedRefresh(false),
    applyServiceWorkerUpdate,
    isWorkoutCurrentlyActive,
  };

  return <PwaContext.Provider value={value}>{children}</PwaContext.Provider>;
};

export function usePwa(): PwaContextValue {
  const ctx = useContext(PwaContext);
  if (!ctx) {
    throw new Error('usePwa must be used inside a PwaProvider');
  }
  return ctx;
}
