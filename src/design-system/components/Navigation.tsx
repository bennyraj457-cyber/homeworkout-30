import React from 'react';
import {
  Home,
  Dumbbell,
  Play,
  BarChart3,
  User,
  Flame,
  Bell,
  ChevronLeft,
  Settings,
  Calendar,
  LucideIcon,
} from 'lucide-react';

export type NavItemId =
  | 'today'
  | 'weekly-plan'
  | 'workouts'
  | 'exercises'
  | 'progress'
  | 'profile';

export interface NavItemSpec {
  id: NavItemId;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

export const DEFAULT_NAV_ITEMS: NavItemSpec[] = [
  { id: 'today', label: 'Today', icon: Home },
  { id: 'weekly-plan', label: 'Weekly Plan', icon: Calendar, badge: '7d' },
  { id: 'workouts', label: '30-Min Plan', icon: Play, badge: '30m' },
  { id: 'exercises', label: 'Exercises', icon: Dumbbell },
  { id: 'progress', label: 'Analytics', icon: BarChart3 },
  { id: 'profile', label: 'Athlete', icon: User },
];

export interface MobileBottomNavProps {
  activeTab: NavItemId;
  onSelect: (id: NavItemId) => void;
  items?: NavItemSpec[];
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeTab,
  onSelect,
  items = DEFAULT_NAV_ITEMS,
}) => {
  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="w-full bg-white border-t border-[#E5E7EB] px-2 h-16 flex items-center justify-around select-none"
    >
      {items.map((item) => {
        const Icon = item.icon;
        const isActive = activeTab === item.id;
        return (
          <button
            key={item.id}
            type="button"
            aria-current={isActive ? 'page' : undefined}
            onClick={() => onSelect(item.id)}
            className={`relative flex flex-col items-center justify-center py-1.5 px-3 rounded-[8px] transition-colors min-w-[60px] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E53935] ${
              isActive
                ? 'text-[#E53935]'
                : 'text-[#6B7280] hover:text-[#111827] hover:bg-[#F8FAFC]'
            }`}
          >
            {/* Top active indicator pill */}
            {isActive && (
              <span className="absolute -top-[9px] w-7 h-[3px] bg-[#E53935] rounded-b-full" />
            )}
            <div
              className={`relative flex items-center justify-center w-9 h-7 rounded-[6px] transition-colors ${
                isActive ? 'bg-[#FEF2F2]' : 'bg-transparent'
              }`}
            >
              <Icon
                className="w-5 h-5"
                strokeWidth={isActive ? 2.25 : 1.75}
              />
              {item.badge && (
                <span
                  className={`absolute -top-1 -right-2 px-1 py-0.2 text-[9px] font-bold uppercase rounded-[4px] leading-tight ${
                    isActive
                      ? 'bg-[#E53935] text-white'
                      : 'bg-[#F1F5F9] text-[#4B5563]'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </div>
            <span
              className={`mt-0.5 text-[11px] leading-tight tracking-tight ${
                isActive ? 'font-bold text-[#E53935]' : 'font-medium text-[#6B7280]'
              }`}
            >
              {item.label}
            </span>
          </button>
        );
      })}
    </nav>
  );
};

export interface DesktopSidebarNavProps {
  activeTab: NavItemId;
  onSelect: (id: NavItemId) => void;
  items?: NavItemSpec[];
}

export const DesktopSidebarNav: React.FC<DesktopSidebarNavProps> = ({
  activeTab,
  onSelect,
  items = DEFAULT_NAV_ITEMS,
}) => {
  return (
    <aside
      aria-label="Desktop Sidebar Navigation"
      className="w-64 bg-white border-r border-[#E5E7EB] flex flex-col justify-between p-4 select-none"
    >
      <div>
        {/* Brand Header */}
        <div className="flex items-center justify-between px-2 pb-5 mb-4 border-b border-[#F1F5F9]">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-[8px] bg-[#E53935] flex items-center justify-center text-white font-extrabold text-[15px] tracking-tighter shadow-hf-red">
              30
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold text-[16px] tracking-tight text-[#111827]">
                  HomeFit
                </span>
                <span className="text-[11px] font-bold uppercase px-1.5 py-0.5 rounded-[4px] bg-[#FEF2F2] text-[#E53935]">
                  PWA
                </span>
              </div>
              <p className="text-[11px] font-medium text-[#6B7280]">
                30-Min Home Strength
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Section Label */}
        <div className="px-2.5 mb-2">
          <span className="text-[11px] font-semibold uppercase tracking-[0.05em] text-[#6B7280]">
            Training Menu
          </span>
        </div>

        {/* Navigation Links */}
        <div className="space-y-1">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                aria-current={isActive ? 'page' : undefined}
                onClick={() => onSelect(item.id)}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-[8px] text-[14px] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E53935] ${
                  isActive
                    ? 'bg-[#FEF2F2] text-[#E53935] font-semibold border border-[#FECACA]'
                    : 'text-[#4B5563] hover:text-[#111827] hover:bg-[#F8FAFC] font-medium border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-5 h-5 ${
                      isActive ? 'text-[#E53935]' : 'text-[#6B7280]'
                    }`}
                    strokeWidth={isActive ? 2.25 : 1.75}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge ? (
                  <span
                    className={`text-[11px] font-bold px-1.5 py-0.5 rounded-[4px] ${
                      isActive
                        ? 'bg-[#E53935] text-white'
                        : 'bg-[#F1F5F9] text-[#4B5563]'
                    }`}
                  >
                    {item.badge}
                  </span>
                ) : isActive ? (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E53935]" />
                ) : null}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bottom Streak / Session Readiness Card inside Sidebar */}
      <div className="mt-6 pt-4 border-t border-[#F1F5F9]">
        <div className="p-3 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB]">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
              Weekly Target
            </span>
            <span className="inline-flex items-center gap-1 text-[12px] font-bold text-[#E53935]">
              <Flame className="w-3.5 h-3.5 fill-[#E53935]" /> 4 / 5 Days
            </span>
          </div>
          <div className="w-full h-1.5 bg-[#E5E7EB] rounded-full overflow-hidden">
            <div className="h-full bg-[#E53935] rounded-full w-4/5" />
          </div>
          <p className="mt-2 text-[12px] text-[#4B5563] font-medium">
            120 mins completed this week
          </p>
        </div>
      </div>
    </aside>
  );
};

export interface TopNavigationBarProps {
  title: string;
  subtitle?: string;
  variant?: 'dashboard' | 'workout-session';
  streakCount?: number;
  sessionProgressText?: string;
  onBack?: () => void;
}

export const TopNavigationBar: React.FC<TopNavigationBarProps> = ({
  title,
  subtitle,
  variant = 'dashboard',
  streakCount = 12,
  sessionProgressText = 'Block 2 of 4 • 18:45 Left',
  onBack,
}) => {
  return (
    <header className="w-full h-[60px] bg-white border-b border-[#E5E7EB] px-4 flex items-center justify-between">
      {variant === 'dashboard' ? (
        <>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-[7px] bg-[#E53935] flex items-center justify-center text-white font-extrabold text-[13px] tracking-tighter">
              30
            </div>
            <div>
              <h3 className="text-[15px] font-bold text-[#111827] leading-tight">
                {title}
              </h3>
              {subtitle && (
                <p className="text-[12px] font-medium text-[#6B7280] leading-tight">
                  {subtitle}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Active Streak Chip */}
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] text-[12px] font-bold">
              <Flame className="w-3.5 h-3.5 fill-[#E53935]" strokeWidth={2} />
              <span className="tabular-nums">{streakCount}d</span>
            </div>
            <button
              type="button"
              aria-label="Schedule"
              className="w-9 h-9 rounded-[8px] border border-[#E5E7EB] bg-white hover:bg-[#F8FAFC] flex items-center justify-center text-[#4B5563] hover:text-[#111827]"
            >
              <Calendar className="w-4 h-4" strokeWidth={2} />
            </button>
            <button
              type="button"
              aria-label="Notifications"
              className="relative w-9 h-9 rounded-[8px] border border-[#E5E7EB] bg-white hover:bg-[#F8FAFC] flex items-center justify-center text-[#4B5563] hover:text-[#111827]"
            >
              <Bell className="w-4 h-4" strokeWidth={2} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-[#E53935]" />
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onBack}
              aria-label="Back to workout overview"
              className="w-9 h-9 rounded-[8px] border border-[#E5E7EB] bg-white hover:bg-[#FEF2F2] hover:border-[#FECACA] flex items-center justify-center text-[#111827] hover:text-[#E53935] transition-colors"
            >
              <ChevronLeft className="w-5 h-5" strokeWidth={2.25} />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-[#E53935] animate-pulse" />
                <h3 className="text-[15px] font-bold text-[#111827] leading-tight">
                  {title}
                </h3>
              </div>
              <p className="text-[12px] font-mono tabular-nums font-semibold text-[#E53935]">
                {sessionProgressText}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="hidden sm:inline-flex items-center px-2.5 py-1 rounded-[6px] bg-[#F8FAFC] border border-[#E5E7EB] text-[11px] font-semibold uppercase tracking-wider text-[#4B5563]">
              30-Min Timer Active
            </span>
            <button
              type="button"
              aria-label="Session settings"
              className="w-9 h-9 rounded-[8px] border border-[#E5E7EB] bg-white hover:bg-[#F8FAFC] flex items-center justify-center text-[#4B5563]"
            >
              <Settings className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </>
      )}
    </header>
  );
};
