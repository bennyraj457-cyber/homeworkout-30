import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Home,
  Play,
  Dumbbell,
  BarChart3,
  User,
  Palette,
  Calendar,
  RotateCcw,
} from 'lucide-react';
import {
  MobileBottomNav,
  DesktopSidebarNav,
  NavItemId,
  NavItemSpec,
} from '../design-system/components/Navigation';
import { ConfirmationDialog } from '../design-system/components/FeedbackComponents';
import { resetAllWorkoutDataAndCaches } from '../services/workoutStorage';
import {
  ConnectionStatusPill,
  HeaderInstallAction,
  PwaSystemBanners,
  InstallInstructionsModal,
} from './PwaStatusComponents';

export const APP_NAV_ITEMS: NavItemSpec[] = [
  { id: 'today', label: 'Home', icon: Home },
  { id: 'weekly-plan', label: 'Weekly Plan', icon: Calendar, badge: '7d' },
  { id: 'workouts', label: 'Workouts', icon: Play, badge: '30m' },
  { id: 'exercises', label: 'Exercises', icon: Dumbbell },
  { id: 'progress', label: 'Progress', icon: BarChart3 },
  { id: 'profile', label: 'Profile', icon: User },
];

const ROUTE_TO_TAB: Record<string, NavItemId> = {
  '/': 'today',
  '/weekly-plan': 'weekly-plan',
  '/workouts': 'workouts',
  '/exercises': 'exercises',
  '/progress': 'progress',
  '/profile': 'profile',
};

const TAB_TO_ROUTE: Record<NavItemId, string> = {
  today: '/',
  'weekly-plan': '/weekly-plan',
  workouts: '/workouts',
  exercises: '/exercises',
  progress: '/progress',
  profile: '/profile',
};

export interface AppShellProps {
  children: React.ReactNode;
}

export const AppShell: React.FC<AppShellProps> = ({ children }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showGlobalResetModal, setShowGlobalResetModal] = useState(false);

  const handleConfirmGlobalReset = async () => {
    await resetAllWorkoutDataAndCaches();
    setShowGlobalResetModal(false);
    window.location.href = '/';
  };

  // Determine active tab from current pathname
  const resolveActiveTab = (): NavItemId => {
    const path = location.pathname;
    if (path.startsWith('/weekly-plan')) {
      return 'weekly-plan';
    }
    if (path.startsWith('/workout/active') || path.startsWith('/workouts')) {
      return 'workouts';
    }
    if (path.startsWith('/category/') || path.startsWith('/exercises')) {
      return 'exercises';
    }
    if (path.startsWith('/progress')) {
      return 'progress';
    }
    if (path.startsWith('/profile')) {
      return 'profile';
    }
    return ROUTE_TO_TAB[path] || 'today';
  };

  const activeTab = resolveActiveTab();

  const handleSelectTab = (tabId: NavItemId) => {
    navigate(TAB_TO_ROUTE[tabId]);
  };

  const formattedCurrentDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date());

  return (
    <div className="min-h-screen bg-white text-[#111827] flex flex-col lg:flex-row">
      {/* Desktop Left Sidebar Navigation (Visible on lg: 1024px+) */}
      <div className="hidden lg:flex lg:flex-col lg:w-64 lg:fixed lg:inset-y-0 lg:z-30 bg-white">
        <div className="flex-1 flex flex-col min-h-0">
          <DesktopSidebarNav
            activeTab={activeTab}
            onSelect={handleSelectTab}
            items={APP_NAV_ITEMS}
          />
          {/* Extra Footer Links in Sidebar: Reset Data & UI Design System */}
          <div className="px-4 pb-4 space-y-2 bg-white border-r border-[#E5E7EB]">
            <button
              type="button"
              onClick={() => setShowGlobalResetModal(true)}
              className="w-full flex items-center justify-between px-3 py-2 rounded-[8px] bg-[#FEF2F2] hover:bg-[#FEE2E2] border border-[#FECACA] text-[12px] font-bold text-[#E53935] transition-colors"
            >
              <span className="flex items-center gap-2">
                <RotateCcw className="w-3.5 h-3.5 text-[#E53935]" />
                <span>Reset All Data</span>
              </span>
              <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-white border border-[#FECACA]">
                Clear
              </span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/design-system')}
              className="w-full flex items-center justify-between px-3 py-2 rounded-[8px] bg-[#F8FAFC] hover:bg-[#FEF2F2] border border-[#E5E7EB] hover:border-[#FECACA] text-[12px] font-semibold text-[#4B5563] hover:text-[#E53935] transition-colors"
            >
              <span className="flex items-center gap-2">
                <Palette className="w-3.5 h-3.5 text-[#E53935]" />
                <span>UI Design System</span>
              </span>
              <span className="text-[10px] font-mono font-bold uppercase px-1.5 py-0.5 rounded bg-white border border-[#E5E7EB]">
                v1.0
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Column */}
      <div className="flex-1 flex flex-col lg:pl-64 min-h-screen pb-20 lg:pb-10">
        {/* Top Header */}
        <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-sm border-b border-[#E5E7EB]">
          <div className="max-w-[1160px] mx-auto px-4 sm:px-6 lg:px-8 h-[68px] flex items-center justify-between gap-2 sm:gap-3">
            {/* Left: HomeFit 30 Logo/Name + Greeting */}
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                onClick={() => navigate('/')}
                className="w-10 h-10 rounded-[10px] bg-[#E53935] hover:bg-[#D32F2F] active:bg-[#C62828] flex items-center justify-center text-white font-extrabold text-[16px] tracking-tighter shadow-hf-red transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E53935] focus-visible:ring-offset-2"
                aria-label="HomeFit 30 Home"
              >
                30
              </button>

              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-[16px] sm:text-[18px] font-extrabold tracking-tight text-[#111827] leading-tight truncate">
                    HomeFit 30
                  </span>
                  <span className="hidden sm:inline-flex items-center px-2 py-0.5 rounded-[5px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] text-[10px] font-bold uppercase tracking-wider">
                    30-Min PWA
                  </span>
                </div>
                <p className="text-[12px] sm:text-[13px] font-semibold text-[#4B5563] leading-tight mt-0.5 truncate">
                  Ready to get stronger?
                </p>
              </div>
            </div>

            {/* Right: Online/Offline Status + Install App / Guide + Current Date + Profile Icon */}
            <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
              {/* Quick Weekly Plan Button in Top Header */}
              <button
                type="button"
                onClick={() => navigate('/weekly-plan')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] border text-[12px] font-bold transition-all ${
                  activeTab === 'weekly-plan'
                    ? 'bg-[#E53935] text-white border-[#E53935] shadow-hf-red'
                    : 'bg-[#FEF2F2] hover:bg-[#FEE2E2] text-[#E53935] border-[#FECACA]'
                }`}
              >
                <Calendar className="w-3.5 h-3.5 shrink-0" strokeWidth={2.25} />
                <span>Weekly Plan</span>
              </button>

              {/* Reset Button in Top Header */}
              <button
                type="button"
                onClick={() => setShowGlobalResetModal(true)}
                title="Reset Workout Progress, History & Cache"
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[8px] bg-white hover:bg-[#FEF2F2] border border-[#E5E7EB] hover:border-[#FECACA] text-[12px] font-bold text-[#4B5563] hover:text-[#E53935] transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5 text-[#E53935]" strokeWidth={2.25} />
                <span>Reset</span>
              </button>

              {/* Small Connection Status Indicator (Online / Offline) */}
              <ConnectionStatusPill />

              {/* Install App Button (Only shown when beforeinstallprompt is available & not installed; otherwise shows Install Guide trigger) */}
              <HeaderInstallAction />

              {/* Current Date */}
              <div className="hidden md:inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-[8px] bg-[#F8FAFC] border border-[#E5E7EB] text-[#4B5563] text-[12px] font-semibold">
                <Calendar className="w-3.5 h-3.5 text-[#E53935] shrink-0" strokeWidth={2.25} />
                <span className="tabular-nums">{formattedCurrentDate}</span>
              </div>

              <button
                type="button"
                onClick={() => navigate('/profile')}
                aria-label="Open Athlete Profile"
                title="Athlete Profile"
                className={`w-10 h-10 rounded-[10px] border flex items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E53935] focus-visible:ring-offset-2 ${
                  activeTab === 'profile'
                    ? 'bg-[#E53935] text-white border-[#E53935] shadow-hf-red'
                    : 'bg-white hover:bg-[#FEF2F2] text-[#111827] hover:text-[#E53935] border-[#E5E7EB] hover:border-[#FECACA]'
                }`}
              >
                <User className="w-5 h-5" strokeWidth={2.25} />
              </button>
            </div>
          </div>
        </header>

        {/* Page Viewport */}
        <main className="flex-1 max-w-[1160px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-5">
          {/* Global PWA Banners: Offline Message ("You're offline. Your workouts are still available."), Install Success, SW Updates */}
          <PwaSystemBanners />

          {children}
        </main>
      </div>

      {/* Fixed Mobile & Tablet Bottom Navigation (Hidden on lg: 1024px+) */}
      <div className="lg:hidden fixed bottom-0 inset-x-0 z-30 bg-white shadow-[0_-2px_10px_rgba(17,24,39,0.04)]">
        <MobileBottomNav
          activeTab={activeTab}
          onSelect={handleSelectTab}
          items={APP_NAV_ITEMS}
        />
      </div>

      {/* Browser Installation Instructions Modal */}
      <InstallInstructionsModal />

      {/* Global Reset Confirmation Dialog */}
      {showGlobalResetModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px] flex items-center justify-center p-4">
          <ConfirmationDialog
            title="Reset All Workout Data & Cache?"
            description="This will reset any active workout session, clear saved workout history, restore default weekly goals, and refresh the app cache."
            confirmLabel="Reset Everything"
            cancelLabel="Cancel"
            onConfirm={handleConfirmGlobalReset}
            onCancel={() => setShowGlobalResetModal(false)}
          />
        </div>
      )}
    </div>
  );
};
