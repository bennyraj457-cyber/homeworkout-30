import React from 'react';
import {
  Wifi,
  WifiOff,
  Download,
  CheckCircle2,
  RefreshCw,
  HelpCircle,
  X,
  Smartphone,
  Monitor,
  Share,
  PlusSquare,
  ShieldCheck,
} from 'lucide-react';
import { usePwa } from '../context/PwaContext';
import { Button } from '../design-system/components/Buttons';

/* ==========================================================================
   1. SMALL CONNECTION STATUS INDICATOR (Online / Offline Pill)
   ========================================================================== */
export const ConnectionStatusPill: React.FC = () => {
  const { isOnline } = usePwa();

  return (
    <div
      role="status"
      aria-live="polite"
      title={
        isOnline
          ? 'Connected — Offline cache ready'
          : "You're offline. Your workouts are still available."
      }
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[7px] border text-[11px] font-bold uppercase tracking-wider transition-colors ${
        isOnline
          ? 'bg-[#F0FDF4] border-[#BBF7D0] text-[#16A34A]'
          : 'bg-[#FEF2F2] border-[#E53935] text-[#E53935]'
      }`}
    >
      {isOnline ? (
        <>
          <span className="w-2 h-2 rounded-full bg-[#16A34A]" />
          <Wifi className="w-3.5 h-3.5 hidden sm:inline" strokeWidth={2.25} />
          <span>Online</span>
        </>
      ) : (
        <>
          <span className="w-2 h-2 rounded-full bg-[#E53935] animate-pulse" />
          <WifiOff className="w-3.5 h-3.5" strokeWidth={2.25} />
          <span>Offline</span>
        </>
      )}
    </div>
  );
};

/* ==========================================================================
   2. INSTALL APP BUTTON / MANUAL GUIDE TRIGGER
   Rules:
   - Do NOT show the install button when installation is unavailable or the app is already installed.
   - When native `beforeinstallprompt` is available (`canInstallPrompt === true`), show the red "Install App" button.
   - When the app is not installed and the browser does not expose `beforeinstallprompt` (e.g. iOS Safari or desktop browsers without prompt), provide a clean "How to Install" instructions trigger.
   ========================================================================== */
export const HeaderInstallAction: React.FC = () => {
  const {
    canInstallPrompt,
    isInstalled,
    triggerInstallPrompt,
    setShowManualInstructionsModal,
  } = usePwa();

  if (isInstalled) {
    return null;
  }

  if (canInstallPrompt) {
    return (
      <button
        type="button"
        onClick={triggerInstallPrompt}
        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#E53935] hover:bg-[#D32F2F] active:bg-[#C62828] text-white text-[12px] font-bold shadow-hf-red transition-all active:scale-95"
      >
        <Download className="w-3.5 h-3.5" strokeWidth={2.5} />
        <span>Install App</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setShowManualInstructionsModal(true)}
      title="Installation instructions for your browser"
      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-[8px] bg-[#F8FAFC] hover:bg-[#FEF2F2] border border-[#E5E7EB] hover:border-[#FECACA] text-[11px] font-bold text-[#4B5563] hover:text-[#E53935] transition-colors"
    >
      <HelpCircle className="w-3.5 h-3.5 text-[#E53935]" strokeWidth={2.25} />
      <span className="hidden md:inline">Install Guide</span>
    </button>
  );
};

/* ==========================================================================
   3. OFFLINE MESSAGE BANNER, INSTALL SUCCESS BANNER & SERVICE WORKER UPDATE BANNER
   ========================================================================== */
export const PwaSystemBanners: React.FC = () => {
  const {
    isOnline,
    justInstalledSuccess,
    dismissInstalledSuccess,
    needRefresh,
    dismissUpdateNotification,
    applyServiceWorkerUpdate,
    isWorkoutCurrentlyActive,
    offlineReady,
    dismissOfflineReady,
  } = usePwa();

  return (
    <div className="space-y-2.5">
      {/* A. Offline Friendly Banner — Exact required text: "You're offline. Your workouts are still available." */}
      {!isOnline && (
        <div
          role="status"
          aria-live="polite"
          className="bg-[#FEF2F2] border-2 border-[#E53935] rounded-[10px] px-4 py-3 flex flex-wrap items-center justify-between gap-3 shadow-hf-xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[7px] bg-[#E53935] text-white flex items-center justify-center shrink-0">
              <WifiOff className="w-4 h-4" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[14px] font-extrabold text-[#111827]">
                You're offline. Your workouts are still available.
              </p>
              <p className="text-[12px] font-medium text-[#4B5563]">
                All workout plans, 24 exercise guides, active timers, and local workout history continue working offline.
              </p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-[5px] bg-white border border-[#FECACA] font-mono text-[11px] font-bold text-[#E53935] uppercase">
            Local Storage Active
          </span>
        </div>
      )}

      {/* B. Installation Success State Banner */}
      {justInstalledSuccess && (
        <div
          role="status"
          className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-[10px] px-4 py-3 flex items-center justify-between gap-3 shadow-hf-xs"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[7px] bg-[#16A34A] text-white flex items-center justify-center shrink-0">
              <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} />
            </div>
            <div>
              <p className="text-[14px] font-bold text-[#111827]">
                HomeFit 30 Installed Successfully!
              </p>
              <p className="text-[12px] font-medium text-[#4B5563]">
                You can now launch HomeFit directly from your home screen or desktop in standalone mode, even while offline.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={dismissInstalledSuccess}
            aria-label="Dismiss installation success message"
            className="w-7 h-7 rounded-[6px] text-[#4B5563] hover:text-[#111827] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* C. First-Time Offline Cache Ready Toast */}
      {offlineReady && isOnline && !needRefresh && (
        <div
          role="status"
          className="bg-white border border-[#E5E7EB] border-l-4 border-l-[#16A34A] rounded-[10px] px-4 py-2.5 flex items-center justify-between gap-3 shadow-hf-xs"
        >
          <div className="flex items-center gap-2.5">
            <ShieldCheck className="w-4 h-4 text-[#16A34A] shrink-0" strokeWidth={2.5} />
            <span className="text-[13px] font-semibold text-[#111827]">
              HomeFit 30 is cached and ready for 100% offline workouts.
            </span>
          </div>
          <button
            type="button"
            onClick={dismissOfflineReady}
            aria-label="Dismiss offline ready notification"
            className="text-[#6B7280] hover:text-[#111827]"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* D. Service Worker Update Notification (Never interrupts an active workout automatically) */}
      {needRefresh && (
        <div
          role="alert"
          className="bg-white border-2 border-[#E53935] rounded-[10px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-hf-sm"
        >
          <div className="flex items-start gap-3">
            <div className="w-9 h-9 rounded-[8px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] flex items-center justify-center shrink-0">
              <RefreshCw className="w-4 h-4" strokeWidth={2.5} />
            </div>
            <div>
              <h4 className="text-[14px] font-extrabold text-[#111827]">
                New Version of HomeFit 30 Available
              </h4>
              <p className="text-[12px] font-medium text-[#4B5563] mt-0.5">
                {isWorkoutCurrentlyActive
                  ? 'You have an active workout in progress. Your session is safely saved in localStorage—finish your set or click Update Now when ready.'
                  : 'Click Update Now to load the latest improvements. Your saved workout history and goals will remain untouched.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={dismissUpdateNotification}
            >
              Later
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={applyServiceWorkerUpdate}
              leftIcon={<RefreshCw className="w-3.5 h-3.5" />}
            >
              Update Now
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

/* ==========================================================================
   4. BROWSER INSTALLATION INSTRUCTIONS MODAL
   For browsers that do not expose `beforeinstallprompt` (iOS Safari, Firefox, or already dismissed)
   ========================================================================== */
export const InstallInstructionsModal: React.FC = () => {
  const {
    showManualInstructionsModal,
    setShowManualInstructionsModal,
    canInstallPrompt,
    isInstalled,
    triggerInstallPrompt,
  } = usePwa();

  React.useEffect(() => {
    if (!showManualInstructionsModal) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setShowManualInstructionsModal(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showManualInstructionsModal, setShowManualInstructionsModal]);

  if (!showManualInstructionsModal) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pwa-install-guide-title"
      className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px] flex items-center justify-center p-4"
    >
      <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-6 shadow-hf-lg max-w-lg w-full space-y-5">
        <div className="flex items-start justify-between gap-3 pb-4 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[10px] bg-[#E53935] text-white font-extrabold text-[15px] flex items-center justify-center shrink-0 shadow-hf-red">
              30
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E53935] block">
                Progressive Web App Setup
              </span>
              <h3
                id="pwa-install-guide-title"
                className="text-[18px] font-extrabold text-[#111827]"
              >
                Install HomeFit 30 on Your Device
              </h3>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setShowManualInstructionsModal(false)}
            aria-label="Close installation guide"
            className="w-8 h-8 rounded-[6px] text-[#6B7280] hover:text-[#111827] hover:bg-[#F8FAFC] flex items-center justify-center"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {isInstalled ? (
          <div className="p-4 rounded-[10px] bg-[#F0FDF4] border border-[#BBF7D0] flex items-center gap-3">
            <CheckCircle2 className="w-5 h-5 text-[#16A34A] shrink-0" />
            <p className="text-[13px] font-bold text-[#111827]">
              HomeFit 30 is already installed on your device and running in standalone mode.
            </p>
          </div>
        ) : (
          <div className="space-y-3.5 text-[13px] text-[#4B5563]">
            {canInstallPrompt && (
              <div className="p-4 rounded-[10px] bg-[#FEF2F2] border border-[#FECACA] flex items-center justify-between gap-3">
                <div>
                  <span className="text-[12px] font-bold text-[#E53935] block">
                    One-Click Browser Install Ready
                  </span>
                  <span className="text-[12px] text-[#111827]">
                    Your browser supports direct installation.
                  </span>
                </div>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    triggerInstallPrompt();
                    setShowManualInstructionsModal(false);
                  }}
                  leftIcon={<Download className="w-4 h-4" />}
                >
                  Install App
                </Button>
              </div>
            )}

            {/* Android Chrome Instructions */}
            <div className="p-3.5 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB] space-y-1">
              <div className="flex items-center gap-2 font-bold text-[#111827]">
                <Smartphone className="w-4 h-4 text-[#E53935]" />
                <span>Android (Chrome / Edge)</span>
              </div>
              <p className="leading-relaxed">
                Tap the browser menu icon (<strong>⋮</strong>) in the top-right corner and select{' '}
                <strong>"Install app"</strong> or <strong>"Add to Home screen"</strong>.
              </p>
            </div>

            {/* iOS / iPadOS Safari Instructions */}
            <div className="p-3.5 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB] space-y-1">
              <div className="flex items-center gap-2 font-bold text-[#111827]">
                <Share className="w-4 h-4 text-[#E53935]" />
                <span>iPhone & iPad (Safari)</span>
              </div>
              <p className="leading-relaxed">
                Tap the <strong>Share</strong> button at the bottom of Safari, scroll down, and tap{' '}
                <strong className="inline-flex items-center gap-1">
                  <PlusSquare className="w-3.5 h-3.5 text-[#E53935]" /> Add to Home Screen
                </strong>
                .
              </p>
            </div>

            {/* Desktop Chrome / Edge Instructions */}
            <div className="p-3.5 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB] space-y-1">
              <div className="flex items-center gap-2 font-bold text-[#111827]">
                <Monitor className="w-4 h-4 text-[#E53935]" />
                <span>Desktop (Chrome / Edge)</span>
              </div>
              <p className="leading-relaxed">
                Click the <strong>Install HomeFit 30</strong> icon on the right side of your address bar, or open the browser menu (<strong>⋮</strong>) → <strong>"Save and share" → "Install HomeFit 30"</strong>.
              </p>
            </div>
          </div>
        )}

        <div className="flex justify-end pt-2 border-t border-[#F1F5F9]">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowManualInstructionsModal(false)}
          >
            Got It
          </Button>
        </div>
      </div>
    </div>
  );
};
