import React from 'react';
import {
  Clock,
  Dumbbell,
  Flame,
  Play,
  CheckCircle2,
  TrendingUp,
  ChevronRight,
  Layers,
  Award,
} from 'lucide-react';
import { Button } from './Buttons';

/* ==========================================================================
   1. WORKOUT CARD (Structured 30-Minute Full-Body Routine Card)
   ========================================================================== */
export interface WorkoutCardProps {
  title: string;
  focusArea: string;
  durationMin?: number;
  exerciseCount: number;
  estimatedCalories: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  equipmentList: string[];
  completionPercent?: number;
  featured?: boolean;
  onStart?: () => void;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({
  title,
  focusArea,
  durationMin = 30,
  exerciseCount,
  estimatedCalories,
  difficulty,
  equipmentList,
  completionPercent = 0,
  featured = false,
  onStart,
}) => {
  return (
    <div
      className={`bg-white rounded-[12px] border transition-all p-5 flex flex-col justify-between ${
        featured
          ? 'border-[#E53935] shadow-hf-sm ring-1 ring-[#E53935]/15'
          : 'border-[#E5E7EB] hover:border-[#D1D5DB] shadow-hf-xs'
      }`}
    >
      <div>
        {/* Top Metadata Row */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[6px] bg-[#FEF2F2] text-[#E53935] font-mono tabular-nums text-[12px] font-bold">
              <Clock className="w-3.5 h-3.5" strokeWidth={2.25} />
              {durationMin} MIN
            </span>
            <span className="inline-flex items-center px-2.5 py-1 rounded-[6px] bg-[#F8FAFC] border border-[#E5E7EB] text-[#4B5563] text-[11px] font-semibold uppercase tracking-wider">
              {difficulty}
            </span>
          </div>
          {featured && (
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#E53935] bg-[#FEF2F2] border border-[#FECACA] px-2 py-0.5 rounded-[4px]">
              Today’s Pick
            </span>
          )}
        </div>

        {/* Title & Focus */}
        <h3 className="text-[18px] font-bold text-[#111827] tracking-[-0.01em] mb-1">
          {title}
        </h3>
        <p className="text-[14px] font-medium text-[#4B5563] mb-4">
          {focusArea}
        </p>

        {/* Equipment Pills */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {equipmentList.map((eq) => (
            <span
              key={eq}
              className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[5px] bg-[#F8FAFC] border border-[#E5E7EB] text-[11px] font-semibold text-[#4B5563]"
            >
              <Dumbbell className="w-3 h-3 text-[#6B7280]" strokeWidth={2} />
              {eq}
            </span>
          ))}
        </div>
      </div>

      <div>
        {/* Metrics Bar */}
        <div className="grid grid-cols-3 gap-2 py-3 px-3 rounded-[8px] bg-[#F8FAFC] border border-[#F1F5F9] mb-4">
          <div>
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#6B7280]">
              Exercises
            </span>
            <span className="font-mono tabular-nums text-[14px] font-bold text-[#111827]">
              {exerciseCount} Moves
            </span>
          </div>
          <div>
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#6B7280]">
              Est. Burn
            </span>
            <span className="font-mono tabular-nums text-[14px] font-bold text-[#111827]">
              {estimatedCalories} kcal
            </span>
          </div>
          <div>
            <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#6B7280]">
              Format
            </span>
            <span className="font-mono tabular-nums text-[14px] font-bold text-[#E53935]">
              Full Body
            </span>
          </div>
        </div>

        {/* Progress if partially started */}
        {completionPercent > 0 && (
          <div className="mb-4">
            <div className="flex justify-between text-[12px] font-semibold mb-1">
              <span className="text-[#4B5563]">Session Progress</span>
              <span className="font-mono tabular-nums text-[#E53935]">
                {completionPercent}%
              </span>
            </div>
            <div className="w-full h-1.5 bg-[#F1F5F9] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#E53935] rounded-full transition-all"
                style={{ width: `${completionPercent}%` }}
              />
            </div>
          </div>
        )}

        <Button
          variant={featured ? 'primary' : 'outline'}
          fullWidth
          onClick={onStart}
          leftIcon={<Play className="w-4 h-4 fill-current" />}
        >
          {completionPercent > 0 ? 'Resume 30-Min Workout' : 'Start 30-Min Session'}
        </Button>
      </div>
    </div>
  );
};

/* ==========================================================================
   2. DAILY PROGRESS CARD
   ========================================================================== */
export interface DailyProgressCardProps {
  completedMinutes: number;
  targetMinutes?: number;
  completedSets: number;
  targetSets: number;
  caloriesBurned: number;
  workoutTitle: string;
}

export const DailyProgressCard: React.FC<DailyProgressCardProps> = ({
  completedMinutes,
  targetMinutes = 30,
  completedSets,
  targetSets,
  caloriesBurned,
  workoutTitle,
}) => {
  const percentage = Math.min(100, Math.round((completedMinutes / targetMinutes) * 100));

  return (
    <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-5 shadow-hf-xs">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.05em] text-[#E53935] mb-1">
            <span className="w-2 h-2 rounded-full bg-[#E53935]" />
            Daily 30-Min Goal
          </span>
          <h3 className="text-[18px] font-bold text-[#111827]">{workoutTitle}</h3>
          <p className="text-[13px] text-[#4B5563] font-medium">
            {percentage === 100
              ? 'Full 30-minute target achieved today!'
              : `${targetMinutes - completedMinutes} minutes remaining to hit daily goal`}
          </p>
        </div>

        {/* Circular Mini Ring */}
        <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
          <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
            <circle
              cx="32"
              cy="32"
              r="26"
              fill="none"
              stroke="#F1F5F9"
              strokeWidth="6"
            />
            <circle
              cx="32"
              cy="32"
              r="26"
              fill="none"
              stroke="#E53935"
              strokeWidth="6"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 26}
              strokeDashoffset={2 * Math.PI * 26 * (1 - percentage / 100)}
            />
          </svg>
          <span className="absolute font-mono tabular-nums text-[14px] font-extrabold text-[#111827]">
            {percentage}%
          </span>
        </div>
      </div>

      {/* Linear Progress Bar */}
      <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-[#E53935] rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Bottom Metric Columns */}
      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-[#F1F5F9]">
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] block">
            Duration
          </span>
          <span className="font-mono tabular-nums text-[16px] font-extrabold text-[#111827]">
            {completedMinutes}
            <span className="text-[12px] font-semibold text-[#6B7280]">
              /{targetMinutes}m
            </span>
          </span>
        </div>
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] block">
            Sets Done
          </span>
          <span className="font-mono tabular-nums text-[16px] font-extrabold text-[#111827]">
            {completedSets}
            <span className="text-[12px] font-semibold text-[#6B7280]">
              /{targetSets}
            </span>
          </span>
        </div>
        <div>
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280] block">
            Active Burn
          </span>
          <span className="font-mono tabular-nums text-[16px] font-extrabold text-[#E53935]">
            {caloriesBurned}{' '}
            <span className="text-[12px] font-semibold text-[#6B7280]">kcal</span>
          </span>
        </div>
      </div>
    </div>
  );
};

/* ==========================================================================
   3. STATISTICS CARD
   ========================================================================== */
export interface StatisticsCardProps {
  label: string;
  value: string;
  unit?: string;
  trend?: string;
  trendPositive?: boolean;
  icon: React.ReactNode;
  accentRed?: boolean;
}

export const StatisticsCard: React.FC<StatisticsCardProps> = ({
  label,
  value,
  unit,
  trend,
  trendPositive = true,
  icon,
  accentRed = false,
}) => {
  return (
    <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-4 shadow-hf-xs flex flex-col justify-between">
      <div className="flex items-center justify-between mb-3">
        <span className="text-[12px] font-semibold uppercase tracking-[0.04em] text-[#4B5563]">
          {label}
        </span>
        <div
          className={`w-9 h-9 rounded-[8px] flex items-center justify-center ${
            accentRed
              ? 'bg-[#FEF2F2] text-[#E53935] border border-[#FECACA]'
              : 'bg-[#F8FAFC] text-[#1E293B] border border-[#E5E7EB]'
          }`}
        >
          {icon}
        </div>
      </div>

      <div>
        <div className="flex items-baseline gap-1.5">
          <span
            className={`font-mono tabular-nums text-[28px] leading-none font-extrabold tracking-tight ${
              accentRed ? 'text-[#E53935]' : 'text-[#111827]'
            }`}
          >
            {value}
          </span>
          {unit && (
            <span className="text-[13px] font-bold uppercase text-[#6B7280]">
              {unit}
            </span>
          )}
        </div>

        {trend && (
          <div className="mt-2 flex items-center gap-1 text-[12px] font-semibold">
            <TrendingUp
              className={`w-3.5 h-3.5 ${
                trendPositive ? 'text-[#16A34A]' : 'text-[#DC2626]'
              }`}
              strokeWidth={2.25}
            />
            <span className={trendPositive ? 'text-[#16A34A]' : 'text-[#DC2626]'}>
              {trend}
            </span>
            <span className="text-[#6B7280] font-normal">vs last week</span>
          </div>
        )}
      </div>
    </div>
  );
};

/* ==========================================================================
   4. WEEKLY ACTIVITY CARD
   ========================================================================== */
export interface DayActivity {
  dayShort: string;
  dateNum: number;
  status: 'completed' | 'today-active' | 'rest' | 'upcoming';
  minutes: number;
}

export interface WeeklyActivityCardProps {
  days?: DayActivity[];
  weeklyStreak?: number;
}

const DEFAULT_WEEK: DayActivity[] = [
  { dayShort: 'MON', dateNum: 18, status: 'completed', minutes: 30 },
  { dayShort: 'TUE', dateNum: 19, status: 'completed', minutes: 30 },
  { dayShort: 'WED', dateNum: 20, status: 'rest', minutes: 0 },
  { dayShort: 'THU', dateNum: 21, status: 'completed', minutes: 30 },
  { dayShort: 'FRI', dateNum: 22, status: 'today-active', minutes: 20 },
  { dayShort: 'SAT', dateNum: 23, status: 'upcoming', minutes: 0 },
  { dayShort: 'SUN', dateNum: 24, status: 'upcoming', minutes: 0 },
];

export const WeeklyActivityCard: React.FC<WeeklyActivityCardProps> = ({
  days = DEFAULT_WEEK,
  weeklyStreak = 4,
}) => {
  return (
    <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-5 shadow-hf-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-[16px] font-bold text-[#111827]">
            Weekly 30-Min Consistency
          </h3>
          <p className="text-[13px] font-medium text-[#4B5563]">
            110 / 150 weekly target minutes logged
          </p>
        </div>
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] text-[12px] font-bold">
          <Flame className="w-3.5 h-3.5 fill-[#E53935]" />
          <span>{weeklyStreak} Sessions</span>
        </div>
      </div>

      {/* 7-Day Columns */}
      <div className="grid grid-cols-7 gap-2 pt-2">
        {days.map((d) => {
          const isCompleted = d.status === 'completed';
          const isToday = d.status === 'today-active';

          return (
            <div
              key={d.dayShort}
              className={`flex flex-col items-center p-2 rounded-[8px] border transition-all ${
                isToday
                  ? 'bg-[#FEF2F2] border-[#E53935]'
                  : isCompleted
                  ? 'bg-white border-[#E5E7EB]'
                  : 'bg-[#F8FAFC] border-[#F1F5F9]'
              }`}
            >
              <span
                className={`text-[10px] font-bold uppercase tracking-wider mb-1.5 ${
                  isToday ? 'text-[#E53935]' : 'text-[#6B7280]'
                }`}
              >
                {d.dayShort}
              </span>

              {/* Visual Bar / Status Pill */}
              <div className="w-full h-14 bg-[#F1F5F9] rounded-[5px] flex items-end p-0.5 overflow-hidden mb-1.5">
                <div
                  className={`w-full rounded-[4px] transition-all ${
                    isCompleted
                      ? 'bg-[#E53935] h-full'
                      : isToday
                      ? 'bg-[#E53935] h-2/3'
                      : 'bg-transparent h-0'
                  }`}
                />
              </div>

              {isCompleted ? (
                <CheckCircle2
                  className="w-4 h-4 text-[#E53935]"
                  strokeWidth={2.5}
                />
              ) : isToday ? (
                <span className="font-mono tabular-nums text-[11px] font-extrabold text-[#E53935]">
                  {d.minutes}m
                </span>
              ) : (
                <span className="font-mono tabular-nums text-[11px] font-semibold text-[#9CA3AF]">
                  {d.dateNum}
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

/* ==========================================================================
   5. EXERCISE CATEGORY CARD (Equipment & Movement Modalities)
   ========================================================================== */
export interface ExerciseCategoryCardProps {
  title: string;
  subtitle: string;
  exerciseCount: number;
  durationRange: string;
  icon: React.ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export const ExerciseCategoryCard: React.FC<ExerciseCategoryCardProps> = ({
  title,
  subtitle,
  exerciseCount,
  durationRange,
  icon,
  active = false,
  onClick,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full text-left bg-white rounded-[12px] border p-4 transition-all flex items-center justify-between group ${
        active
          ? 'border-[#E53935] bg-[#FEF2F2]/40 ring-1 ring-[#E53935]/20'
          : 'border-[#E5E7EB] hover:border-[#E53935]/60 hover:bg-[#F8FAFC]'
      }`}
    >
      <div className="flex items-center gap-3.5">
        <div
          className={`w-12 h-12 rounded-[10px] flex items-center justify-center shrink-0 transition-colors ${
            active
              ? 'bg-[#E53935] text-white shadow-hf-red'
              : 'bg-[#FEF2F2] text-[#E53935] group-hover:bg-[#E53935] group-hover:text-white'
          }`}
        >
          {icon}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-[16px] font-bold text-[#111827]">{title}</h4>
            <span className="font-mono tabular-nums text-[11px] font-bold px-1.5 py-0.5 rounded-[4px] bg-[#F1F5F9] text-[#4B5563]">
              {exerciseCount}
            </span>
          </div>
          <p className="text-[13px] font-medium text-[#4B5563] mt-0.5">
            {subtitle}
          </p>
          <div className="flex items-center gap-3 mt-1.5 text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
            <span className="inline-flex items-center gap-1">
              <Layers className="w-3 h-3 text-[#E53935]" /> {durationRange}
            </span>
            <span className="inline-flex items-center gap-1">
              <Award className="w-3 h-3 text-[#E53935]" /> Home Ready
            </span>
          </div>
        </div>
      </div>

      <div
        className={`w-8 h-8 rounded-[8px] flex items-center justify-center transition-colors ${
          active
            ? 'bg-[#E53935] text-white'
            : 'bg-[#F8FAFC] text-[#6B7280] group-hover:text-[#E53935] group-hover:bg-[#FEF2F2]'
        }`}
      >
        <ChevronRight className="w-4 h-4" strokeWidth={2.25} />
      </div>
    </button>
  );
};
