import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  Dumbbell,
  Flame,
  Play,
  CheckCircle2,
  Calendar,
  Layers,
  Activity,
  Shield,
  Zap,
  Target,
  ChevronRight,
  Trophy,
  Info,
  Download,
  Smartphone,
  Check,
} from 'lucide-react';
import { usePwa } from '../context/PwaContext';
import { Button } from '../design-system/components/Buttons';
import {
  StatisticsCard,
  ExerciseCategoryCard,
} from '../design-system/components/Cards';
import {
  WEEKLY_ACTIVITY_SAMPLE,
  QUICK_STATS_SAMPLE,
  EXERCISE_CATEGORIES_SAMPLE,
  RECENT_ACTIVITY_SAMPLE,
  MuscleCategorySlug,
} from '../data/dashboardSampleData';
import {
  REPEATING_WEEKLY_SCHEDULE,
  WORKOUT_PLANS_DATA,
  getTodaysScheduledPlan,
} from '../data/workoutLibraryData';
import {
  loadActiveWorkoutSession,
  loadCompletedWorkoutHistory,
  calculateWorkoutProgress,
  calculateOverallProgressStatistics,
  calculateWeeklyActivity,
  loadPersonalGoals,
  formatSecondsToMMSS,
} from '../services/workoutStorage';

const CATEGORY_ICON_MAP: Record<MuscleCategorySlug, React.ReactNode> = {
  chest: <Shield className="w-5 h-5" strokeWidth={2.25} />,
  back: <Layers className="w-5 h-5" strokeWidth={2.25} />,
  shoulders: <Zap className="w-5 h-5" strokeWidth={2.25} />,
  arms: <Dumbbell className="w-5 h-5" strokeWidth={2.25} />,
  legs: <Activity className="w-5 h-5" strokeWidth={2.25} />,
  core: <Target className="w-5 h-5" strokeWidth={2.25} />,
};

const STAT_ICON_MAP: Record<string, React.ReactNode> = {
  'workouts-completed': <Trophy className="w-4 h-4" strokeWidth={2.25} />,
  'total-minutes': <Clock className="w-4 h-4" strokeWidth={2.25} />,
  'current-streak': <Flame className="w-4 h-4" strokeWidth={2.25} />,
};

export const HomeDashboard: React.FC = () => {
  const navigate = useNavigate();
  const {
    canInstallPrompt,
    isInstalled,
    triggerInstallPrompt,
    setShowManualInstructionsModal,
  } = usePwa();

  const savedSession = loadActiveWorkoutSession();
  const hasActiveUnfinishedSession =
    savedSession && savedSession.stage === 'active';
  const savedProgress = hasActiveUnfinishedSession
    ? calculateWorkoutProgress(savedSession)
    : null;

  const savedHistory = loadCompletedWorkoutHistory();
  const hasRealHistory = savedHistory.length > 0;
  const realStats = hasRealHistory
    ? calculateOverallProgressStatistics(savedHistory)
    : null;
  const currentWeekActivity = calculateWeeklyActivity(savedHistory, 0);
  const realWeekly = hasRealHistory ? currentWeekActivity : null;
  const userGoals = loadPersonalGoals();

  // Resolve Today's Scheduled Workout from the Repeating 7-Day Weekly Plan
  const { daySchedule: todaysDaySchedule, workoutPlan: todaysScheduledPlan } =
    getTodaysScheduledPlan();

  const isTodayCompleted = Boolean(
    currentWeekActivity.days.find((d) => d.isToday && d.workoutsCount > 0)
  );
  const todaysCompletionPercent = isTodayCompleted
    ? 100
    : hasActiveUnfinishedSession &&
      savedSession?.planId === todaysScheduledPlan.id &&
      savedProgress
    ? savedProgress.completionPercentage
    : 0;

  const displayedCompletedDays = realWeekly
    ? realWeekly.activeDaysInWeek
    : WEEKLY_ACTIVITY_SAMPLE.completedDays;
  const displayedTargetDays = userGoals.weeklyWorkoutDaysGoal;
  const displayedTotalMinutesInWeek = realWeekly
    ? realWeekly.totalMinutesInWeek
    : WEEKLY_ACTIVITY_SAMPLE.totalMinutesCompleted;
  const displayedTargetMinutesInWeek = userGoals.weeklyWorkoutMinutesGoal;

  const weeklyProgressPercent = Math.min(
    100,
    Math.round(
      (displayedCompletedDays / Math.max(1, displayedTargetDays)) * 100
    )
  );

  return (
    <div className="space-y-8">
      {/* Unfinished Workout Resume Banner (if an active workout is saved in localStorage) */}
      {hasActiveUnfinishedSession && savedSession && savedProgress && (
        <section className="bg-[#FEF2F2] rounded-[12px] border-2 border-[#E53935] p-4 sm:p-5 shadow-hf-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#E53935]">
              <span className="w-2 h-2 rounded-full bg-[#E53935] animate-pulse" />
              Unfinished Workout Session Saved
            </div>
            <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#111827]">
              {savedSession.workoutName} — Exercise{' '}
              {savedSession.currentExerciseIndex + 1} of{' '}
              {savedSession.exercises.length}
            </h2>
            <p className="text-[13px] font-medium text-[#4B5563]">
              {savedProgress.completedSetsCount} of {savedProgress.totalSets} sets
              completed ({savedProgress.completionPercentage}%) •Elapsed:{' '}
              {formatSecondsToMMSS(savedSession.accumulatedElapsedSeconds)}
            </p>
          </div>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/workout/active')}
            leftIcon={<Play className="w-4 h-4 fill-current" />}
            className="shrink-0"
          >
            Resume Workout
          </Button>
        </section>
      )}
      {/* =====================================================================
          TOP GRID: 1. TODAY'S WORKOUT CARD + 2. WEEKLY ACTIVITY SECTION
          ===================================================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* -------------------------------------------------------------------
            SECTION 2: TODAY'S WORKOUT CARD (Automatically Loads Today's Day from Repeating Weekly Plan)
            ------------------------------------------------------------------- */}
        <div className="lg:col-span-7 bg-white rounded-[12px] border-2 border-[#E53935] p-5 sm:p-6 shadow-hf-sm flex flex-col justify-between">
          <div>
            {/* Top Status & Badges */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] font-mono tabular-nums text-[12px] font-bold">
                  <Clock className="w-3.5 h-3.5" strokeWidth={2.25} />
                  {todaysScheduledPlan.durationMinutes} Minutes
                </span>
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[6px] bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] text-[12px] font-bold">
                  <Dumbbell className="w-3.5 h-3.5 text-[#E53935]" strokeWidth={2.25} />
                  {todaysScheduledPlan.primaryCategory}
                </span>
                <span className="inline-flex items-center px-2.5 py-1 rounded-[6px] bg-[#F8FAFC] border border-[#E5E7EB] font-mono tabular-nums text-[#4B5563] text-[12px] font-bold">
                  {todaysScheduledPlan.exercises.length} Exercises
                </span>
              </div>

              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-[#E53935] text-white text-[11px] font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                {todaysDaySchedule.dayName} •{' '}
                {todaysDaySchedule.isRestDay ? 'Recovery Day' : 'Day ' + todaysDaySchedule.dayIndex + ' of 6'}
              </span>
            </div>

            {/* Workout Title & Subtitle */}
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#E53935] block mb-0.5">
              Today’s Scheduled Plan: {todaysDaySchedule.focusTitle}
            </span>
            <h1 className="text-[24px] sm:text-[28px] font-extrabold text-[#111827] tracking-tight leading-tight">
              {todaysScheduledPlan.name}
            </h1>
            <p className="text-[14px] font-medium text-[#4B5563] mt-1.5">
              {todaysScheduledPlan.subtitle}
            </p>

            {/* Compact Circuit Preview Pills */}
            <div className="mt-4 pt-4 border-t border-[#F1F5F9]">
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.04em] text-[#6B7280]">
                  Circuit Lineup ({todaysScheduledPlan.exercises.length} Exercises)
                </span>
                <span className="font-mono tabular-nums text-[11px] font-semibold text-[#6B7280]">
                  Est. {todaysScheduledPlan.estimatedCalories} kcal
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {todaysScheduledPlan.exercises.map((ex, index) => {
                  return (
                    <div
                      key={`${ex.exerciseId}-${index}`}
                      className={`px-2.5 py-2 rounded-[8px] border text-left flex items-center justify-between gap-1.5 ${
                        isTodayCompleted
                          ? 'bg-[#F0FDF4] border-[#BBF7D0]'
                          : 'bg-[#F8FAFC] border-[#E5E7EB]'
                      }`}
                    >
                      <div className="min-w-0">
                        <span className="block text-[12px] font-bold text-[#111827] truncate">
                          {index + 1}. {ex.name}
                        </span>
                        <span className="block font-mono tabular-nums text-[11px] font-semibold text-[#6B7280]">
                          {ex.sets} × {ex.repsOrDuration}
                        </span>
                      </div>
                      {isTodayCompleted && (
                        <CheckCircle2
                          className="w-3.5 h-3.5 text-[#16A34A] shrink-0"
                          strokeWidth={2.5}
                        />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Progress Indicator & Red Start Workout Button */}
          <div className="mt-6 pt-4 border-t border-[#F1F5F9] space-y-4">
            <div>
              <div className="flex items-center justify-between text-[12px] font-bold mb-1.5">
                <span className="text-[#4B5563]">
                  {isTodayCompleted
                    ? `Completed Today (${todaysDaySchedule.dayName})`
                    : `${todaysDaySchedule.dayName} Schedule Status`}
                </span>
                <span className="font-mono tabular-nums text-[#E53935]">
                  {todaysCompletionPercent}%
                </span>
              </div>
              <div className="w-full h-2.5 bg-[#F1F5F9] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#E53935] rounded-full transition-all duration-300"
                  style={{ width: `${todaysCompletionPercent}%` }}
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={() =>
                  navigate(`/workout/active?plan=${todaysScheduledPlan.id}`)
                }
                leftIcon={<Play className="w-5 h-5 fill-current" />}
              >
                {todaysDaySchedule.isRestDay
                  ? 'Start Optional 15m Stretch'
                  : `Start ${todaysDaySchedule.dayName} Workout`}
              </Button>
              <Button
                variant="outline"
                size="lg"
                onClick={() =>
                  navigate(`/workouts/${todaysScheduledPlan.id}`)
                }
                className="shrink-0"
              >
                View Details
              </Button>
            </div>
          </div>
        </div>

        {/* -------------------------------------------------------------------
            SECTION 3: WEEKLY ACTIVITY (Monday to Sunday Circular Progress)
            ------------------------------------------------------------------- */}
        <div className="lg:col-span-5 bg-white rounded-[12px] border border-[#E5E7EB] p-5 sm:p-6 shadow-hf-xs flex flex-col justify-between">
          <div>
            {/* Section Title & Demo Badge */}
            <div className="flex items-start justify-between gap-2 mb-4">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.05em] text-[#E53935] mb-0.5">
                  <span className="w-2 h-2 rounded-full bg-[#E53935]" />
                  Weekly Activity
                </span>
                <h2 className="text-[18px] sm:text-[20px] font-bold text-[#111827]">
                  {displayedCompletedDays} of {displayedTargetDays} Workout Days Completed
                </h2>
              </div>
              <span className="px-2 py-0.5 rounded-[5px] bg-[#F8FAFC] border border-[#E5E7EB] text-[10px] font-bold uppercase tracking-wider text-[#6B7280] shrink-0">
                {hasRealHistory ? 'Live Data' : 'Sample Data'}
              </span>
            </div>

            {/* Overall Weekly Goal Summary Box with Circular Progress Ring */}
            <div className="p-4 rounded-[10px] bg-[#FEF2F2] border border-[#FECACA] flex items-center justify-between gap-4 mb-5">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C62828] block">
                  Weekly Workout Progress
                </span>
                <div className="font-mono tabular-nums text-[22px] font-extrabold text-[#111827] mt-0.5">
                  {displayedTotalMinutesInWeek}{' '}
                  <span className="text-[13px] font-bold text-[#6B7280]">
                    / {displayedTargetMinutesInWeek} MIN
                  </span>
                </div>
                <p className="text-[12px] font-semibold text-[#C62828] mt-0.5">
                  {displayedCompletedDays >= displayedTargetDays
                    ? 'Weekly workout days goal achieved!'
                    : `${Math.max(0, displayedTargetDays - displayedCompletedDays)} more session(s) to hit weekly goal`}
                </p>
              </div>

              {/* Circular SVG Progress Indicator */}
              <div className="relative w-16 h-16 flex items-center justify-center shrink-0">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 64 64">
                  <circle
                    cx="32"
                    cy="32"
                    r="26"
                    fill="none"
                    stroke="#FEE2E2"
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
                    strokeDashoffset={
                      2 * Math.PI * 26 * (1 - weeklyProgressPercent / 100)
                    }
                  />
                </svg>
                <span className="absolute font-mono tabular-nums text-[14px] font-extrabold text-[#E53935]">
                  {weeklyProgressPercent}%
                </span>
              </div>
            </div>

            {/* Monday to Sunday Circular Day Indicators */}
            <div>
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#6B7280] mb-2.5">
                <span>Monday – Sunday Schedule</span>
                <span className="text-[#E53935]">30m / Day Target</span>
              </div>

              <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
                {realWeekly
                  ? realWeekly.days.map((day) => {
                      const isCompleted = day.workoutsCount > 0;
                      const isToday = day.isToday;

                      return (
                        <div
                          key={day.dateKey}
                          className={`flex flex-col items-center py-2.5 px-1 rounded-[10px] border transition-all ${
                            isToday
                              ? 'bg-[#FEF2F2] border-[#E53935] ring-1 ring-[#E53935]/20'
                              : isCompleted
                              ? 'bg-white border-[#E5E7EB]'
                              : 'bg-[#F8FAFC] border-[#F1F5F9]'
                          }`}
                        >
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${
                              isToday
                                ? 'text-[#E53935]'
                                : isCompleted
                                ? 'text-[#111827]'
                                : 'text-[#6B7280]'
                            }`}
                          >
                            {day.dayShort}
                          </span>

                          <div className="relative w-9 h-9 flex items-center justify-center mb-1.5">
                            {isCompleted ? (
                              <div className="w-8 h-8 rounded-full bg-[#E53935] text-white flex items-center justify-center shadow-hf-xs">
                                <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} />
                              </div>
                            ) : isToday ? (
                              <div className="w-8 h-8 rounded-full border-2 border-[#E53935] bg-white flex items-center justify-center font-mono tabular-nums text-[10px] font-extrabold text-[#E53935]">
                                {day.dateNumber}
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full border border-[#D1D5DB] bg-white flex items-center justify-center font-mono tabular-nums text-[11px] font-semibold text-[#9CA3AF]">
                                {day.dateNumber}
                              </div>
                            )}
                          </div>

                          <span
                            className={`font-mono tabular-nums text-[10px] font-bold ${
                              isCompleted
                                ? 'text-[#E53935]'
                                : isToday
                                ? 'text-[#C62828]'
                                : 'text-[#9CA3AF]'
                            }`}
                          >
                            {isCompleted
                              ? `${day.totalMinutes}m`
                              : isToday
                              ? 'Today'
                              : '—'}
                          </span>
                        </div>
                      );
                    })
                  : WEEKLY_ACTIVITY_SAMPLE.days.map((day) => {
                      const isCompleted = day.status === 'completed';
                      const isToday = day.status === 'today';

                      return (
                        <div
                          key={day.dayShort}
                          className={`flex flex-col items-center py-2.5 px-1 rounded-[10px] border transition-all ${
                            isToday
                              ? 'bg-[#FEF2F2] border-[#E53935] ring-1 ring-[#E53935]/20'
                              : isCompleted
                              ? 'bg-white border-[#E5E7EB]'
                              : 'bg-[#F8FAFC] border-[#F1F5F9]'
                          }`}
                        >
                          <span
                            className={`text-[10px] font-bold uppercase tracking-wider mb-2 ${
                              isToday
                                ? 'text-[#E53935]'
                                : isCompleted
                                ? 'text-[#111827]'
                                : 'text-[#6B7280]'
                            }`}
                          >
                            {day.dayShort}
                          </span>

                          {/* Circular Day Progress Ring */}
                          <div className="relative w-9 h-9 flex items-center justify-center mb-1.5">
                            {isCompleted ? (
                              <div className="w-8 h-8 rounded-full bg-[#E53935] text-white flex items-center justify-center shadow-hf-xs">
                                <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} />
                              </div>
                            ) : isToday ? (
                              <div className="w-8 h-8 rounded-full border-2 border-[#E53935] bg-white flex items-center justify-center font-mono tabular-nums text-[10px] font-extrabold text-[#E53935]">
                                30m
                              </div>
                            ) : (
                              <div className="w-8 h-8 rounded-full border border-[#D1D5DB] bg-white flex items-center justify-center font-mono tabular-nums text-[11px] font-semibold text-[#9CA3AF]">
                                {day.dateNumber}
                              </div>
                            )}
                          </div>

                          <span
                            className={`font-mono tabular-nums text-[10px] font-bold ${
                              isCompleted
                                ? 'text-[#E53935]'
                                : isToday
                                ? 'text-[#C62828]'
                                : 'text-[#9CA3AF]'
                            }`}
                          >
                            {isCompleted ? '30m' : isToday ? 'Today' : '—'}
                          </span>
                        </div>
                      );
                    })}
              </div>
            </div>
          </div>

          {/* Weekly Linear Progress Bar Footer */}
          <div className="mt-5 pt-4 border-t border-[#F1F5F9]">
            <div className="flex items-center justify-between text-[12px] font-semibold mb-1.5">
              <span className="text-[#4B5563]">Weekly Goal Completion</span>
              <span className="font-mono tabular-nums font-bold text-[#111827]">
                {displayedCompletedDays} / {displayedTargetDays} Days ({weeklyProgressPercent}%)
              </span>
            </div>
            <div className="w-full h-2 bg-[#F1F5F9] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#E53935] rounded-full transition-all"
                style={{ width: `${weeklyProgressPercent}%` }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          REPEATING 7-DAY WEEKLY WORKOUT PLAN (Repeats Every Week)
          6 Workout Days (Monday – Saturday) + 1 Recovery/Rest Day (Sunday)
          ===================================================================== */}
      <section className="bg-white rounded-[12px] border border-[#E5E7EB] p-5 sm:p-6 shadow-hf-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#F1F5F9]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.05em] text-[#E53935]">
              <Calendar className="w-3.5 h-3.5" />
              <span>Repeating Weekly Training Split • Repeats Every Week</span>
            </div>
            <h2 className="text-[19px] sm:text-[22px] font-extrabold text-[#111827] tracking-tight mt-0.5">
              Your 7-Day Weekly Workout Plan (Mon – Sun)
            </h2>
            <p className="text-[13px] font-medium text-[#4B5563]">
              6 structured workout days (Monday–Saturday) + 1 rest & recovery day (Sunday). Tap any day to start or preview that day’s workout.
            </p>
          </div>
          <span className="px-3 py-1 rounded-[6px] bg-[#FEF2F2] border border-[#FECACA] font-mono text-[12px] font-bold text-[#E53935]">
            6 Days On • 1 Day Rest
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3">
          {REPEATING_WEEKLY_SCHEDULE.map((dayItem, idx) => {
            const assignedPlan =
              WORKOUT_PLANS_DATA.find((p) => p.id === dayItem.planId) ||
              WORKOUT_PLANS_DATA[0];
            const isTodayDay = dayItem.jsDayOfWeek === new Date().getDay();
            const dayBucketInCurrentWeek = currentWeekActivity.days[idx];
            const isDoneThisWeek = Boolean(
              dayBucketInCurrentWeek && dayBucketInCurrentWeek.workoutsCount > 0
            );

            return (
              <div
                key={dayItem.dayShort}
                onClick={() =>
                  navigate(`/workout/active?plan=${assignedPlan.id}`)
                }
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === 'Enter' &&
                  navigate(`/workout/active?plan=${assignedPlan.id}`)
                }
                className={`p-3.5 rounded-[10px] border transition-all flex flex-col justify-between cursor-pointer group ${
                  isTodayDay
                    ? 'bg-[#FEF2F2] border-2 border-[#E53935] shadow-hf-xs'
                    : dayItem.isRestDay
                    ? 'bg-[#F8FAFC] border-[#E5E7EB] hover:border-[#D1D5DB]'
                    : 'bg-white border-[#E5E7EB] hover:border-[#E53935]'
                }`}
              >
                <div>
                  {/* Day Name + Today / Completed Badge */}
                  <div className="flex items-center justify-between gap-1 mb-2">
                    <span
                      className={`font-mono text-[11px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-[4px] ${
                        isTodayDay
                          ? 'bg-[#E53935] text-white'
                          : dayItem.isRestDay
                          ? 'bg-[#E5E7EB] text-[#4B5563]'
                          : 'bg-[#F8FAFC] text-[#111827] border border-[#E5E7EB]'
                      }`}
                    >
                      {dayItem.dayShort}
                    </span>

                    {isDoneThisWeek ? (
                      <span className="inline-flex items-center gap-0.5 text-[10px] font-bold text-[#16A34A]">
                        <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2.5} />
                        Done
                      </span>
                    ) : isTodayDay ? (
                      <span className="text-[10px] font-extrabold uppercase text-[#E53935]">
                        Today
                      </span>
                    ) : (
                      <span className="font-mono text-[10px] font-bold text-[#6B7280]">
                        {assignedPlan.durationMinutes}m
                      </span>
                    )}
                  </div>

                  {/* Focus Title & Plan Name */}
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-[#E53935] truncate">
                    {dayItem.isRestDay ? 'Rest & Mobility' : assignedPlan.primaryCategory}
                  </span>
                  <h3 className="text-[14px] font-extrabold text-[#111827] group-hover:text-[#E53935] transition-colors leading-snug mt-0.5">
                    {dayItem.isRestDay ? 'Sunday Rest / Stretch' : assignedPlan.name}
                  </h3>
                  <p className="text-[11px] font-medium text-[#4B5563] mt-1 line-clamp-2 leading-snug">
                    {dayItem.focusTitle}
                  </p>
                </div>

                {/* Bottom Action */}
                <div className="mt-3 pt-2 border-t border-[#F1F5F9] flex items-center justify-between text-[11px] font-bold">
                  <span className="font-mono text-[#6B7280]">
                    {assignedPlan.exercises.length} moves
                  </span>
                  <span className="text-[#E53935] inline-flex items-center gap-0.5 group-hover:translate-x-0.5 transition-transform">
                    {isTodayDay ? 'Train Now' : 'Open'}
                    <ChevronRight className="w-3.5 h-3.5" />
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          SECTION 4: QUICK STATISTICS (3 Cards with Live or Demo Data Badge)
          ===================================================================== */}
      <section className="space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[18px] sm:text-[20px] font-bold text-[#111827] tracking-tight">
              Quick Statistics
            </h2>
            <p className="text-[13px] font-medium text-[#4B5563]">
              Your cumulative 30-minute home training consistency
            </p>
          </div>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[6px] bg-[#F8FAFC] border border-[#E5E7EB] text-[11px] font-bold uppercase tracking-wider text-[#6B7280]">
            <Info className="w-3.5 h-3.5 text-[#E53935]" />
            {hasRealHistory ? 'Live Local Data' : 'Demo Data'}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {realStats ? (
            <>
              <StatisticsCard
                label="Workouts Completed"
                value={String(realStats.totalWorkoutsCompleted)}
                unit={realStats.totalWorkoutsCompleted === 1 ? 'Session' : 'Sessions'}
                trend={`${realStats.totalSetsCompleted} sets logged`}
                trendPositive
                accentRed
                icon={STAT_ICON_MAP['workouts-completed']}
              />
              <StatisticsCard
                label="Total Workout Minutes"
                value={String(realStats.totalWorkoutMinutes)}
                unit="Mins"
                trend={`${formatSecondsToMMSS(realStats.totalWorkoutSeconds)} exact time`}
                trendPositive
                icon={STAT_ICON_MAP['total-minutes']}
              />
              <StatisticsCard
                label="Current Workout Streak"
                value={String(realStats.currentStreakDays)}
                unit={realStats.currentStreakDays === 1 ? 'Day' : 'Days'}
                trend={`Longest Streak: ${realStats.longestStreakDays}d`}
                trendPositive
                accentRed
                icon={STAT_ICON_MAP['current-streak']}
              />
            </>
          ) : (
            QUICK_STATS_SAMPLE.map((stat) => (
              <StatisticsCard
                key={stat.id}
                label={stat.label}
                value={stat.value}
                unit={stat.unit}
                trend={stat.trend}
                trendPositive
                accentRed={stat.accentRed}
                icon={STAT_ICON_MAP[stat.id]}
              />
            ))
          )}
        </div>
      </section>

      {/* =====================================================================
          SECTION 5: EXERCISE CATEGORIES (6 Clickable Muscle Category Cards)
          Chest, Back, Shoulders, Arms, Legs, Core
          ===================================================================== */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[18px] sm:text-[20px] font-bold text-[#111827] tracking-tight">
              Exercise Categories
            </h2>
            <p className="text-[13px] font-medium text-[#4B5563]">
              Select a target muscle group to browse Barbell, Dumbbell, and Bodyweight movements
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/exercises')}
            className="inline-flex items-center gap-1 text-[13px] font-bold text-[#E53935] hover:text-[#C62828] transition-colors"
          >
            <span>All Exercises</span>
            <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {EXERCISE_CATEGORIES_SAMPLE.map((category) => (
            <ExerciseCategoryCard
              key={category.slug}
              title={category.name}
              subtitle={category.subtitle}
              exerciseCount={category.exerciseCount}
              durationRange={category.durationRange}
              icon={CATEGORY_ICON_MAP[category.slug]}
              onClick={() =>
                navigate(
                  `/exercises?category=${encodeURIComponent(
                    category.slug === 'legs' ? 'Legs & Glutes' : category.name
                  )}`
                )
              }
            />
          ))}
        </div>
      </section>

      {/* =====================================================================
          SECTION 6: RECENT ACTIVITY (Last 3 Completed Workouts)
          ===================================================================== */}
      <section className="space-y-3.5">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-[18px] sm:text-[20px] font-bold text-[#111827] tracking-tight">
              Recent Activity
            </h2>
            <p className="text-[13px] font-medium text-[#4B5563]">
              Your last three completed 30-minute workouts
            </p>
          </div>
          <button
            type="button"
            onClick={() => navigate('/progress')}
            className="inline-flex items-center gap-1 text-[13px] font-bold text-[#E53935] hover:text-[#C62828] transition-colors"
          >
            <span>Full History</span>
            <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
          </button>
        </div>

        <div className="bg-white rounded-[12px] border border-[#E5E7EB] divide-y divide-[#F1F5F9] shadow-hf-xs overflow-hidden">
          {savedHistory.slice(0, 3).map((entry) => {
            const formattedDate = new Intl.DateTimeFormat('en-US', {
              weekday: 'long',
              month: 'short',
              day: 'numeric',
            }).format(new Date(entry.finishedAt));

            return (
              <div
                key={entry.sessionId}
                onClick={() => navigate(`/progress/${entry.sessionId}`)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) =>
                  e.key === 'Enter' && navigate(`/progress/${entry.sessionId}`)
                }
                className="p-4 sm:p-5 bg-[#FEF2F2]/30 hover:bg-[#FEF2F2]/60 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
              >
                <div className="flex items-start sm:items-center gap-3.5">
                  <div className="w-11 h-11 rounded-[10px] bg-[#E53935] text-white flex items-center justify-center shrink-0">
                    <Dumbbell className="w-5 h-5" strokeWidth={2.25} />
                  </div>
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-[15px] sm:text-[16px] font-bold text-[#111827]">
                        {entry.workoutName}
                      </h3>
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] bg-[#F0FDF4] border border-[#BBF7D0] text-[#16A34A] text-[11px] font-bold uppercase tracking-wider">
                        <CheckCircle2 className="w-3 h-3" strokeWidth={2.5} />
                        Completed ({entry.completionPercentage}%)
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-medium text-[#6B7280] mt-1">
                      <span className="inline-flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5 text-[#E53935]" />
                        {formattedDate}
                      </span>
                      <span>•</span>
                      <span>
                        {entry.category} • {entry.totalRepetitions} Reps
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F1F5F9]">
                  <div className="flex items-center gap-2 font-mono tabular-nums">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[6px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] text-[12px] font-bold">
                      <Clock className="w-3.5 h-3.5" strokeWidth={2.25} />
                      {formatSecondsToMMSS(entry.actualDurationSeconds)}
                    </span>
                    <span className="px-2.5 py-1 rounded-[6px] bg-white border border-[#E5E7EB] text-[#111827] text-[12px] font-bold">
                      {entry.completedSets} / {entry.totalSets} Sets
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#9CA3AF]" strokeWidth={2.25} />
                </div>
              </div>
            );
          })}

          {RECENT_ACTIVITY_SAMPLE.slice(0, Math.max(0, 3 - savedHistory.length)).map((workout) => (
            <div
              key={workout.id}
              onClick={() => navigate('/progress')}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && navigate('/progress')}
              className="p-4 sm:p-5 hover:bg-[#F8FAFC] transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3 cursor-pointer"
            >
              <div className="flex items-start sm:items-center gap-3.5">
                <div className="w-11 h-11 rounded-[10px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] flex items-center justify-center shrink-0">
                  <Dumbbell className="w-5 h-5" strokeWidth={2.25} />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-[15px] sm:text-[16px] font-bold text-[#111827]">
                      {workout.workoutName}
                    </h3>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[4px] bg-[#F0FDF4] border border-[#BBF7D0] text-[#16A34A] text-[11px] font-bold uppercase tracking-wider">
                      <CheckCircle2 className="w-3 h-3" strokeWidth={2.5} />
                      {workout.status}
                    </span>
                  </div>
                  <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-medium text-[#6B7280] mt-1">
                    <span className="inline-flex items-center gap-1">
                      <Calendar className="w-3.5 h-3.5 text-[#9CA3AF]" />
                      {workout.dateLabel}
                    </span>
                    <span>•</span>
                    <span>{workout.focusTag}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-[#F1F5F9]">
                <div className="flex items-center gap-2 font-mono tabular-nums">
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[6px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] text-[12px] font-bold">
                    <Clock className="w-3.5 h-3.5" strokeWidth={2.25} />
                    {workout.duration}
                  </span>
                  <span className="px-2.5 py-1 rounded-[6px] bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] text-[12px] font-bold">
                    {workout.setsCompleted}
                  </span>
                </div>
                <ChevronRight className="w-4 h-4 text-[#9CA3AF]" strokeWidth={2.25} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          PWA INSTALLATION & STANDALONE STATUS CARD
          - When not installed & beforeinstallprompt available: Shows Install App CTA
          - When not installed & browser lacks prompt: Shows How to Install guide button
          - When installed: Shows Standalone PWA Installed verification badge
          ===================================================================== */}
      <section className="bg-[#F8FAFC] rounded-[12px] border border-[#E5E7EB] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3.5">
          <div className="w-11 h-11 rounded-[10px] bg-[#E53935] text-white font-extrabold text-[15px] flex items-center justify-center shrink-0 shadow-hf-red">
            30
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-[15px] sm:text-[16px] font-bold text-[#111827]">
                {isInstalled
                  ? 'HomeFit 30 Installed on Device'
                  : 'Install HomeFit 30 Progressive Web App'}
              </h3>
              <span className="px-2 py-0.5 rounded-[4px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] text-[10px] font-bold uppercase">
                Offline-Ready
              </span>
            </div>
            <p className="text-[13px] font-medium text-[#4B5563] mt-0.5">
              {isInstalled
                ? 'Running in standalone PWA mode. All workouts, exercises, and timers work 100% offline.'
                : 'Add HomeFit 30 to your home screen or desktop for instant standalone launch and full offline training.'}
            </p>
          </div>
        </div>

        <div className="shrink-0">
          {isInstalled ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-2 rounded-[8px] bg-[#F0FDF4] border border-[#BBF7D0] text-[#16A34A] text-[12px] font-bold">
              <Check className="w-4 h-4" strokeWidth={2.5} />
              App Installed
            </span>
          ) : canInstallPrompt ? (
            <Button
              variant="primary"
              size="md"
              onClick={triggerInstallPrompt}
              leftIcon={<Download className="w-4 h-4" />}
            >
              Install App
            </Button>
          ) : (
            <Button
              variant="outline"
              size="md"
              onClick={() => setShowManualInstructionsModal(true)}
              leftIcon={<Smartphone className="w-4 h-4" />}
            >
              Installation Instructions
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};
