import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Trophy,
  Clock,
  Dumbbell,
  Flame,
  Calendar as CalendarIcon,
  CheckCircle2,
  Play,
  Award,
  Activity,
  ChevronLeft,
  ChevronRight,
  Search,
  X,
  ArrowUpDown,
  Target,
  Bell,
  Sliders,
  Check,
  Sparkles,
} from 'lucide-react';
import { Button } from '../design-system/components/Buttons';
import { StatisticsCard } from '../design-system/components/Cards';
import {
  TextInput,
  ToggleSwitch,
} from '../design-system/components/FormComponents';
import {
  EmptyState,
  SuccessMessage,
} from '../design-system/components/FeedbackComponents';
import {
  loadCompletedWorkoutHistory,
  loadActiveWorkoutSession,
  loadPersonalGoals,
  savePersonalGoals,
  calculateOverallProgressStatistics,
  calculateWeeklyActivity,
  calculateMonthlyProgress,
  formatSecondsToMMSS,
} from '../services/workoutStorage';
import {
  CompletedWorkoutHistoryEntry,
  PersonalGoalsPreferences,
} from '../types/workoutSession';

type HistoryCategoryFilter =
  | 'All'
  | 'Full Body'
  | 'Upper Body'
  | 'Lower Body'
  | 'Core'
  | 'Recovery';

const HISTORY_CATEGORY_TABS: HistoryCategoryFilter[] = [
  'All',
  'Full Body',
  'Upper Body',
  'Lower Body',
  'Core',
  'Recovery',
];

export const WorkoutHistoryPage: React.FC = () => {
  const navigate = useNavigate();

  // 1. Shared localStorage Workout History & Active Session
  const [history, setHistory] = useState<CompletedWorkoutHistoryEntry[]>(() =>
    loadCompletedWorkoutHistory()
  );
  const activeSession = loadActiveWorkoutSession();

  // 2. Personal Goals & Preferences (Persisted in localStorage)
  const [goals, setGoals] = useState<PersonalGoalsPreferences>(() =>
    loadPersonalGoals()
  );
  const [goalSavedBanner, setGoalSavedBanner] = useState(false);

  // Sync on mount and if localStorage changes across tabs
  useEffect(() => {
    setHistory(loadCompletedWorkoutHistory());
    setGoals(loadPersonalGoals());

    const handleStorageChange = () => {
      setHistory(loadCompletedWorkoutHistory());
      setGoals(loadPersonalGoals());
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Update goals in state and localStorage immediately so progress calculations react live
  const handleUpdateGoals = (partial: Partial<PersonalGoalsPreferences>) => {
    setGoals((prev) => {
      const updated = { ...prev, ...partial };
      savePersonalGoals(updated);
      return updated;
    });
    setGoalSavedBanner(true);
    window.setTimeout(() => setGoalSavedBanner(false), 2200);
  };

  // 3. Overall Progress Statistics (100% from actual saved workout records)
  const stats = useMemo(
    () => calculateOverallProgressStatistics(history),
    [history]
  );

  // 4. Weekly Activity Navigation State (0 = Current Week, -1 = Last Week, etc.)
  const [weekOffset, setWeekOffset] = useState<number>(0);
  const weeklyReport = useMemo(
    () => calculateWeeklyActivity(history, weekOffset),
    [history, weekOffset]
  );
  // Current week report specifically for Personal Goals progress bars
  const currentWeekReport = useMemo(
    () => calculateWeeklyActivity(history, 0),
    [history]
  );

  // 5. Monthly Progress & Calendar Navigation State
  const now = new Date();
  const [selectedYear, setSelectedYear] = useState<number>(now.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(now.getMonth());
  const [selectedCalendarDateKey, setSelectedCalendarDateKey] = useState<
    string | null
  >(null);

  const monthlyReport = useMemo(
    () => calculateMonthlyProgress(history, selectedYear, selectedMonth),
    [history, selectedYear, selectedMonth]
  );

  const handlePrevMonth = () => {
    setSelectedCalendarDateKey(null);
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear((y) => y - 1);
    } else {
      setSelectedMonth((m) => m - 1);
    }
  };

  const handleNextMonth = () => {
    setSelectedCalendarDateKey(null);
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear((y) => y + 1);
    } else {
      setSelectedMonth((m) => m + 1);
    }
  };

  const handleResetToCurrentMonth = () => {
    const today = new Date();
    setSelectedYear(today.getFullYear());
    setSelectedMonth(today.getMonth());
    setSelectedCalendarDateKey(null);
  };

  // 6. Workout History Search, Category Filter & Sort State
  const [historySearch, setHistorySearch] = useState<string>('');
  const [historyCategory, setHistoryCategory] =
    useState<HistoryCategoryFilter>('All');
  const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

  const filteredHistory = useMemo(() => {
    const filtered = history.filter((item) => {
      const matchesCat =
        historyCategory === 'All' || item.category === historyCategory;

      const matchesCalendarDay =
        !selectedCalendarDateKey ||
        item.finishedAt.startsWith(selectedCalendarDateKey) ||
        new Date(item.finishedAt).toLocaleDateString('en-CA') ===
          selectedCalendarDateKey;

      const query = historySearch.trim().toLowerCase();
      if (!query) return matchesCat && matchesCalendarDay;

      const matchesName = item.workoutName.toLowerCase().includes(query);
      const matchesCategoryText = item.category.toLowerCase().includes(query);
      const matchesExercises =
        item.exercises?.some((ex) =>
          ex.name.toLowerCase().includes(query)
        ) || false;

      return (
        matchesCat &&
        matchesCalendarDay &&
        (matchesName || matchesCategoryText || matchesExercises)
      );
    });

    return [...filtered].sort((a, b) => {
      const timeA = new Date(a.finishedAt).getTime();
      const timeB = new Date(b.finishedAt).getTime();
      return sortOrder === 'newest' ? timeB - timeA : timeA - timeB;
    });
  }, [
    history,
    historyCategory,
    historySearch,
    sortOrder,
    selectedCalendarDateKey,
  ]);

  // Goal completion percentages for current week
  const weeklyDaysProgressPct = Math.min(
    100,
    Math.round(
      (currentWeekReport.activeDaysInWeek /
        Math.max(1, goals.weeklyWorkoutDaysGoal)) *
        100
    )
  );
  const weeklyMinutesProgressPct = Math.min(
    100,
    Math.round(
      (currentWeekReport.totalMinutesInWeek /
        Math.max(1, goals.weeklyWorkoutMinutesGoal)) *
        100
    )
  );

  // Max minutes in viewed week for proportional chart bar scaling
  const maxDayMinutesInWeek = Math.max(
    30,
    ...weeklyReport.days.map((d) => d.totalMinutes)
  );

  return (
    <div className="space-y-8">
      {/* =====================================================================
          1. PROGRESS DASHBOARD HEADER & 6 ACTUAL WORKOUT STATISTICS
          Page title: "Your Progress"
          ===================================================================== */}
      <section className="space-y-5">
        <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-5 sm:p-6 shadow-hf-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.05em] text-[#E53935] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HomeFit 30 Analytics Engine</span>
            </div>
            <h1 className="text-[26px] sm:text-[32px] leading-[1.15] font-extrabold text-[#111827] tracking-tight">
              Your Progress
            </h1>
            <p className="text-[14px] font-medium text-[#4B5563] mt-0.5">
              Live performance metrics calculated directly from your completed workout sessions
            </p>
          </div>

          <div className="flex items-center gap-2.5 self-start sm:self-center">
            <Button
              variant="primary"
              size="md"
              onClick={() => navigate('/workout/active')}
              leftIcon={<Play className="w-4 h-4 fill-current" />}
            >
              {activeSession && activeSession.stage === 'active'
                ? 'Resume Active Workout'
                : 'Start Workout'}
            </Button>
          </div>
        </div>

        {/* Unfinished Session Resume Banner if one is currently in progress */}
        {activeSession && activeSession.stage === 'active' && (
          <div className="bg-[#FEF2F2] border-2 border-[#E53935] rounded-[12px] p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-hf-xs">
            <div>
              <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#E53935]">
                <span className="w-2 h-2 rounded-full bg-[#E53935] animate-pulse" />
                Workout In Progress
              </span>
              <h3 className="text-[17px] font-extrabold text-[#111827] mt-0.5">
                {activeSession.workoutName} — Exercise{' '}
                {activeSession.currentExerciseIndex + 1} of{' '}
                {activeSession.exercises.length}
              </h3>
              <p className="text-[13px] font-medium text-[#4B5563]">
                Complete and finish your active session to add it to your progress statistics.
              </p>
            </div>
            <Button
              variant="primary"
              size="sm"
              onClick={() => navigate('/workout/active')}
              leftIcon={<Play className="w-4 h-4 fill-current" />}
            >
              Resume Session
            </Button>
          </div>
        )}

        {/* 6 Core Statistics Cards (Calculated from Actual Saved Data) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <StatisticsCard
            label="Total Workouts Completed"
            value={String(stats.totalWorkoutsCompleted)}
            unit={stats.totalWorkoutsCompleted === 1 ? 'Workout' : 'Workouts'}
            trend={
              stats.totalWorkoutsCompleted > 0
                ? `${stats.totalSetsCompleted} total sets completed`
                : 'Complete a workout to begin tracking'
            }
            trendPositive
            accentRed
            icon={<Trophy className="w-4 h-4" strokeWidth={2.25} />}
          />

          <StatisticsCard
            label="Total Workout Minutes"
            value={String(stats.totalWorkoutMinutes)}
            unit="Minutes"
            trend={`${formatSecondsToMMSS(stats.totalWorkoutSeconds)} total logged time`}
            trendPositive
            icon={<Clock className="w-4 h-4" strokeWidth={2.25} />}
          />

          <StatisticsCard
            label="Total Exercises Completed"
            value={String(stats.totalExercisesCompleted)}
            unit="Exercises"
            trend={`${stats.totalRepetitionsCompleted} total repetitions`}
            trendPositive
            icon={<Dumbbell className="w-4 h-4" strokeWidth={2.25} />}
          />

          <StatisticsCard
            label="Current Workout Streak"
            value={String(stats.currentStreakDays)}
            unit={stats.currentStreakDays === 1 ? 'Day' : 'Days'}
            trend={
              stats.currentStreakDays > 0
                ? 'Active consecutive training days'
                : 'Train today to start a streak'
            }
            trendPositive
            accentRed
            icon={<Flame className="w-4 h-4" strokeWidth={2.25} />}
          />

          <StatisticsCard
            label="Longest Workout Streak"
            value={String(stats.longestStreakDays)}
            unit={stats.longestStreakDays === 1 ? 'Day' : 'Days'}
            trend="All-time personal record"
            trendPositive
            icon={<Award className="w-4 h-4" strokeWidth={2.25} />}
          />

          <StatisticsCard
            label="Average Workout Duration"
            value={
              stats.totalWorkoutsCompleted > 0
                ? formatSecondsToMMSS(stats.averageWorkoutDurationSeconds)
                : '00:00'
            }
            unit="MM:SS"
            trend={
              stats.totalWorkoutsCompleted > 0
                ? `~${stats.averageWorkoutDurationMinutes} min per session`
                : 'No completed sessions yet'
            }
            trendPositive
            icon={<Activity className="w-4 h-4" strokeWidth={2.25} />}
          />
        </div>
      </section>

      {/* =====================================================================
          2. WEEKLY ACTIVITY CHART & 6. PERSONAL GOALS
          ===================================================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left 7 Cols: Weekly Activity Chart (Mon-Sun, workouts/day, mins/day, week navigation) */}
        <div className="lg:col-span-7 bg-white rounded-[12px] border border-[#E5E7EB] p-5 sm:p-6 shadow-hf-xs flex flex-col justify-between">
          <div>
            {/* Header & Week Switcher */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-[#F1F5F9]">
              <div>
                <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.05em] text-[#E53935]">
                  <span className="w-2 h-2 rounded-full bg-[#E53935]" />
                  Weekly Activity Chart
                </span>
                <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#111827] mt-0.5">
                  {weeklyReport.weekRangeLabel}
                </h2>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setWeekOffset((w) => w - 1)}
                  aria-label="Previous week"
                  className="w-9 h-9 rounded-[8px] border border-[#E5E7EB] bg-white hover:bg-[#FEF2F2] hover:border-[#FECACA] text-[#111827] hover:text-[#E53935] flex items-center justify-center transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
                </button>
                <button
                  type="button"
                  disabled={weekOffset === 0}
                  onClick={() => setWeekOffset(0)}
                  className={`px-3 h-9 rounded-[8px] font-mono text-[11px] font-bold uppercase border transition-colors ${
                    weekOffset === 0
                      ? 'bg-[#FEF2F2] text-[#E53935] border-[#FECACA]'
                      : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:text-[#111827]'
                  }`}
                >
                  {weekOffset === 0 ? 'Current Week' : 'Jump to Current'}
                </button>
                <button
                  type="button"
                  disabled={weekOffset >= 0}
                  onClick={() => setWeekOffset((w) => Math.min(0, w + 1))}
                  aria-label="Next week"
                  className="w-9 h-9 rounded-[8px] border border-[#E5E7EB] bg-white hover:bg-[#FEF2F2] hover:border-[#FECACA] text-[#111827] hover:text-[#E53935] disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-colors"
                >
                  <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
                </button>
              </div>
            </div>

            {/* Weekly Summary Strip */}
            <div className="grid grid-cols-3 gap-3 my-4">
              <div className="p-3 rounded-[10px] bg-[#FEF2F2] border border-[#FECACA]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C62828] block">
                  Active Days Goal
                </span>
                <span className="font-mono tabular-nums text-[18px] font-extrabold text-[#E53935]">
                  {weeklyReport.activeDaysInWeek} / {goals.weeklyWorkoutDaysGoal}{' '}
                  <span className="text-[11px] font-bold">Days</span>
                </span>
              </div>

              <div className="p-3 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block">
                  Workouts Logged
                </span>
                <span className="font-mono tabular-nums text-[18px] font-extrabold text-[#111827]">
                  {weeklyReport.totalWorkoutsInWeek}{' '}
                  <span className="text-[11px] font-bold text-[#6B7280]">
                    Sessions
                  </span>
                </span>
              </div>

              <div className="p-3 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB]">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block">
                  Weekly Minutes
                </span>
                <span className="font-mono tabular-nums text-[18px] font-extrabold text-[#111827]">
                  {weeklyReport.totalMinutesInWeek} /{' '}
                  {goals.weeklyWorkoutMinutesGoal}m
                </span>
              </div>
            </div>

            {/* Monday to Sunday Bar Chart */}
            <div className="pt-2">
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider text-[#6B7280] mb-3">
                <span>Monday – Sunday Daily Breakdown</span>
                <span className="text-[#E53935]">Minutes & Workouts / Day</span>
              </div>

              <div className="grid grid-cols-7 gap-2 sm:gap-3">
                {weeklyReport.days.map((day) => {
                  const barHeightPct =
                    day.totalMinutes > 0
                      ? Math.max(
                          18,
                          Math.min(
                            100,
                            Math.round(
                              (day.totalMinutes / maxDayMinutesInWeek) * 100
                            )
                          )
                        )
                      : 0;
                  const hasWorkout = day.workoutsCount > 0;

                  return (
                    <div
                      key={day.dateKey}
                      className={`flex flex-col items-center p-2 sm:p-2.5 rounded-[10px] border transition-all ${
                        day.isToday
                          ? 'bg-[#FEF2F2]/60 border-[#E53935] ring-1 ring-[#E53935]/20'
                          : hasWorkout
                          ? 'bg-white border-[#FECACA]'
                          : 'bg-[#F8FAFC] border-[#F1F5F9]'
                      }`}
                    >
                      <span
                        className={`text-[10px] font-extrabold uppercase tracking-wider ${
                          day.isToday
                            ? 'text-[#E53935]'
                            : hasWorkout
                            ? 'text-[#111827]'
                            : 'text-[#6B7280]'
                        }`}
                      >
                        {day.dayShort}
                      </span>
                      <span className="font-mono text-[10px] font-semibold text-[#9CA3AF] mb-2">
                        {day.dateNumber}
                      </span>

                      {/* Vertical Bar Well */}
                      <div className="w-full h-28 bg-[#F1F5F9] rounded-[6px] p-1 flex flex-col justify-end overflow-hidden relative">
                        {hasWorkout && (
                          <div
                            className="w-full bg-[#E53935] rounded-[4px] transition-all duration-300"
                            style={{ height: `${barHeightPct}%` }}
                            title={`${day.dayFull}: ${day.workoutsCount} workout(s), ${day.totalMinutes} min`}
                          />
                        )}
                      </div>

                      {/* Minutes Label */}
                      <span
                        className={`mt-2 font-mono tabular-nums text-[11px] font-extrabold ${
                          hasWorkout ? 'text-[#E53935]' : 'text-[#9CA3AF]'
                        }`}
                      >
                        {day.totalMinutes}m
                      </span>

                      {/* Workouts Count Pill */}
                      <span
                        className={`mt-1 px-1.5 py-0.5 rounded-[4px] font-mono tabular-nums text-[10px] font-bold ${
                          hasWorkout
                            ? 'bg-[#E53935] text-white'
                            : 'bg-white text-[#9CA3AF] border border-[#E5E7EB]'
                        }`}
                      >
                        {day.workoutsCount}w
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Weekly Goal Footer Bar */}
          <div className="mt-5 pt-4 border-t border-[#F1F5F9]">
            <div className="flex items-center justify-between text-[12px] font-bold mb-1.5">
              <span className="text-[#4B5563]">
                Weekly Days Goal ({weeklyReport.activeDaysInWeek} of{' '}
                {goals.weeklyWorkoutDaysGoal} days)
              </span>
              <span className="font-mono tabular-nums text-[#E53935]">
                {Math.min(
                  100,
                  Math.round(
                    (weeklyReport.activeDaysInWeek /
                      Math.max(1, goals.weeklyWorkoutDaysGoal)) *
                      100
                  )
                )}
                %
              </span>
            </div>
            <div className="w-full h-2.5 bg-[#F1F5F9] rounded-full overflow-hidden">
              <div
                className="h-full bg-[#E53935] rounded-full transition-all duration-300"
                style={{
                  width: `${Math.min(
                    100,
                    Math.round(
                      (weeklyReport.activeDaysInWeek /
                        Math.max(1, goals.weeklyWorkoutDaysGoal)) *
                        100
                    )
                  )}%`,
                }}
              />
            </div>
          </div>
        </div>

        {/* Right 5 Cols: 6. Personal Goals (Editable & Persisted in localStorage) */}
        <div className="lg:col-span-5 bg-white rounded-[12px] border border-[#E5E7EB] p-5 sm:p-6 shadow-hf-xs flex flex-col justify-between space-y-5">
          <div className="space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#F1F5F9]">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-[8px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] flex items-center justify-center">
                  <Target className="w-5 h-5" strokeWidth={2.25} />
                </div>
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#E53935] block">
                    Editable Targets
                  </span>
                  <h2 className="text-[18px] font-extrabold text-[#111827]">
                    Personal Goals
                  </h2>
                </div>
              </div>
              <Sliders className="w-4 h-4 text-[#6B7280]" />
            </div>

            {goalSavedBanner && (
              <SuccessMessage
                title="Goals Saved to LocalStorage"
                description="Your weekly progress bars have been updated immediately."
              />
            )}

            {/* Goal 1: Weekly Workout Days Goal (1-7 days, default 5) */}
            <div className="p-4 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[13px] font-bold text-[#111827] block">
                    Weekly Workout Days Goal
                  </span>
                  <span className="text-[11px] font-medium text-[#6B7280]">
                    Current week: {currentWeekReport.activeDaysInWeek} of{' '}
                    {goals.weeklyWorkoutDaysGoal} days completed
                  </span>
                </div>
                <span className="font-mono tabular-nums text-[16px] font-extrabold text-[#E53935]">
                  {weeklyDaysProgressPct}%
                </span>
              </div>

              {/* Progress Bar toward Weekly Days Goal */}
              <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#E53935] rounded-full transition-all"
                  style={{ width: `${weeklyDaysProgressPct}%` }}
                />
              </div>

              {/* 1 to 7 Day Pill Selector */}
              <div className="flex items-center justify-between gap-1 pt-1">
                {[1, 2, 3, 4, 5, 6, 7].map((d) => {
                  const active = goals.weeklyWorkoutDaysGoal === d;
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() =>
                        handleUpdateGoals({ weeklyWorkoutDaysGoal: d })
                      }
                      className={`flex-1 py-1.5 rounded-[6px] font-mono text-[12px] font-extrabold border transition-all ${
                        active
                          ? 'bg-[#E53935] text-white border-[#E53935] shadow-hf-xs'
                          : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:border-[#E53935]'
                      }`}
                    >
                      {d}d
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Goal 2: Weekly Workout Minutes Goal (default 150 minutes) */}
            <div className="p-4 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB] space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[13px] font-bold text-[#111827] block">
                    Weekly Workout Minutes Goal
                  </span>
                  <span className="text-[11px] font-medium text-[#6B7280]">
                    Current week: {currentWeekReport.totalMinutesInWeek} of{' '}
                    {goals.weeklyWorkoutMinutesGoal} mins logged
                  </span>
                </div>
                <span className="font-mono tabular-nums text-[16px] font-extrabold text-[#E53935]">
                  {weeklyMinutesProgressPct}%
                </span>
              </div>

              {/* Progress Bar toward Weekly Minutes Goal */}
              <div className="w-full h-2 bg-[#E5E7EB] rounded-full overflow-hidden">
                <div
                  className="h-full bg-[#E53935] rounded-full transition-all"
                  style={{ width: `${weeklyMinutesProgressPct}%` }}
                />
              </div>

              {/* Preset & Stepper Controls for Minutes Goal */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex items-center gap-1.5">
                  {[90, 120, 150, 180, 210].map((preset) => {
                    const active = goals.weeklyWorkoutMinutesGoal === preset;
                    return (
                      <button
                        key={preset}
                        type="button"
                        onClick={() =>
                          handleUpdateGoals({ weeklyWorkoutMinutesGoal: preset })
                        }
                        className={`px-2.5 py-1 rounded-[6px] font-mono tabular-nums text-[11px] font-extrabold border transition-all ${
                          active
                            ? 'bg-[#E53935] text-white border-[#E53935]'
                            : 'bg-white text-[#4B5563] border-[#E5E7EB] hover:border-[#E53935]'
                        }`}
                      >
                        {preset}m
                      </button>
                    );
                  })}
                </div>

                <input
                  type="number"
                  aria-label="Custom weekly minutes goal"
                  min={15}
                  max={600}
                  step={15}
                  value={goals.weeklyWorkoutMinutesGoal}
                  onChange={(e) =>
                    handleUpdateGoals({
                      weeklyWorkoutMinutesGoal: Math.max(
                        15,
                        Number(e.target.value) || 150
                      ),
                    })
                  }
                  className="w-20 h-8 rounded-[6px] px-2 bg-white border border-[#D1D5DB] font-mono tabular-nums text-[12px] font-bold text-[#111827] text-center focus:outline-none focus:border-[#E53935]"
                />
              </div>
            </div>

            {/* Goal 3: Daily Workout Reminder Preference */}
            <div className="space-y-2.5">
              <ToggleSwitch
                label="Daily Workout Reminder"
                description="Preparation for daily PWA training notifications"
                checked={goals.dailyReminderEnabled}
                onChange={(checked) =>
                  handleUpdateGoals({ dailyReminderEnabled: checked })
                }
              />

              {goals.dailyReminderEnabled && (
                <div className="flex items-center justify-between px-3.5 py-2.5 rounded-[8px] bg-[#FEF2F2]/60 border border-[#FECACA]">
                  <span className="inline-flex items-center gap-2 text-[12px] font-bold text-[#111827]">
                    <Bell className="w-4 h-4 text-[#E53935]" />
                    Preferred Reminder Time
                  </span>
                  <input
                    type="time"
                    aria-label="Preferred daily reminder time"
                    value={goals.dailyReminderTime}
                    onChange={(e) =>
                      handleUpdateGoals({ dailyReminderTime: e.target.value })
                    }
                    className="h-8 px-2.5 rounded-[6px] bg-white border border-[#FECACA] font-mono text-[12px] font-bold text-[#E53935] focus:outline-none focus:border-[#E53935]"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. MONTHLY PROGRESS & ACTIVITY CALENDAR
          ===================================================================== */}
      <section className="bg-white rounded-[12px] border border-[#E5E7EB] p-5 sm:p-6 shadow-hf-xs space-y-6">
        {/* Month Header & Switcher */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#F1F5F9]">
          <div>
            <span className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.05em] text-[#E53935]">
              <CalendarIcon className="w-3.5 h-3.5" />
              Monthly Progress & Completion Calendar
            </span>
            <h2 className="text-[20px] sm:text-[22px] font-extrabold text-[#111827] mt-0.5">
              {monthlyReport.monthTitle}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrevMonth}
              aria-label="Previous month"
              className="w-9 h-9 rounded-[8px] border border-[#E5E7EB] bg-white hover:bg-[#FEF2F2] hover:border-[#FECACA] text-[#111827] hover:text-[#E53935] flex items-center justify-center transition-colors"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
            </button>
            <button
              type="button"
              onClick={handleResetToCurrentMonth}
              className="px-3 h-9 rounded-[8px] bg-[#F8FAFC] hover:bg-[#FEF2F2] border border-[#E5E7EB] hover:border-[#FECACA] font-mono text-[12px] font-bold text-[#111827] hover:text-[#E53935] transition-colors"
            >
              {monthlyReport.monthTitle}
            </button>
            <button
              type="button"
              onClick={handleNextMonth}
              aria-label="Next month"
              className="w-9 h-9 rounded-[8px] border border-[#E5E7EB] bg-white hover:bg-[#FEF2F2] hover:border-[#FECACA] text-[#111827] hover:text-[#E53935] flex items-center justify-center transition-colors"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={2.5} />
            </button>
          </div>
        </div>

        {/* 4 Monthly KPIs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-[10px] bg-[#FEF2F2] border border-[#FECACA]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#C62828] block">
              Monthly Workouts
            </span>
            <span className="font-mono tabular-nums text-[24px] font-extrabold text-[#E53935] mt-1 block">
              {monthlyReport.monthlyCompletedWorkouts}
            </span>
            <span className="text-[11px] font-semibold text-[#C62828]">
              Completed sessions
            </span>
          </div>

          <div className="p-4 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] block">
              Total Workout Time
            </span>
            <span className="font-mono tabular-nums text-[24px] font-extrabold text-[#111827] mt-1 block">
              {monthlyReport.totalWorkoutMinutes}{' '}
              <span className="text-[13px] font-bold text-[#6B7280]">MIN</span>
            </span>
            <span className="text-[11px] font-semibold text-[#4B5563]">
              {formatSecondsToMMSS(monthlyReport.totalWorkoutSeconds)} exact
            </span>
          </div>

          <div className="p-4 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] block">
              Avg Workouts / Week
            </span>
            <span className="font-mono tabular-nums text-[24px] font-extrabold text-[#111827] mt-1 block">
              {monthlyReport.averageWorkoutsPerWeek}
            </span>
            <span className="text-[11px] font-semibold text-[#4B5563]">
              Sessions per week
            </span>
          </div>

          <div className="p-4 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB]">
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] block">
              Completion Days
            </span>
            <span className="font-mono tabular-nums text-[24px] font-extrabold text-[#111827] mt-1 block">
              {monthlyReport.monthlyActiveDays}{' '}
              <span className="text-[13px] font-bold text-[#6B7280]">DAYS</span>
            </span>
            <span className="text-[11px] font-semibold text-[#4B5563]">
              Active training days
            </span>
          </div>
        </div>

        {/* Monthly Activity Calendar Grid (Monday – Sunday) */}
        <div>
          <div className="grid grid-cols-7 gap-1.5 sm:gap-2 mb-2 text-center">
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((d) => (
              <div
                key={d}
                className="text-[11px] font-extrabold uppercase tracking-wider text-[#6B7280] py-1"
              >
                {d}
              </div>
            ))}
          </div>

          <div className="grid grid-cols-7 gap-1.5 sm:gap-2">
            {monthlyReport.calendarCells.map((cell) => {
              const hasWorkout = cell.workoutsCount > 0;
              const isSelected = selectedCalendarDateKey === cell.dateKey;

              return (
                <button
                  key={cell.dateKey}
                  type="button"
                  onClick={() =>
                    setSelectedCalendarDateKey((prev) =>
                      prev === cell.dateKey ? null : cell.dateKey
                    )
                  }
                  className={`min-h-[60px] sm:min-h-[72px] p-1.5 sm:p-2 rounded-[10px] border text-left flex flex-col justify-between transition-all ${
                    !cell.isCurrentMonth ? 'opacity-40' : ''
                  } ${
                    isSelected
                      ? 'bg-[#E53935] text-white border-[#E53935] shadow-hf-red'
                      : hasWorkout
                      ? 'bg-[#FEF2F2] border-[#E53935] hover:bg-[#FEE2E2]'
                      : cell.isToday
                      ? 'bg-white border-2 border-[#111827]'
                      : 'bg-[#F8FAFC] border-[#E5E7EB] hover:bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`font-mono tabular-nums text-[12px] font-extrabold ${
                        isSelected
                          ? 'text-white'
                          : hasWorkout
                          ? 'text-[#E53935]'
                          : 'text-[#111827]'
                      }`}
                    >
                      {cell.dayOfMonth}
                    </span>

                    {hasWorkout && (
                      <span
                        className={`w-4 h-4 rounded-full flex items-center justify-center ${
                          isSelected
                            ? 'bg-white text-[#E53935]'
                            : 'bg-[#E53935] text-white'
                        }`}
                      >
                        <Check className="w-2.5 h-2.5" strokeWidth={3} />
                      </span>
                    )}
                  </div>

                  {hasWorkout ? (
                    <div className="mt-1">
                      <span
                        className={`block font-mono tabular-nums text-[10px] font-extrabold leading-tight ${
                          isSelected ? 'text-white' : 'text-[#C62828]'
                        }`}
                      >
                        {cell.totalMinutes}m
                      </span>
                      <span
                        className={`hidden sm:block text-[10px] font-bold leading-tight truncate ${
                          isSelected ? 'text-white/90' : 'text-[#E53935]'
                        }`}
                      >
                        {cell.workoutsCount}{' '}
                        {cell.workoutsCount === 1 ? 'workout' : 'workouts'}
                      </span>
                    </div>
                  ) : cell.isToday ? (
                    <span className="text-[9px] font-bold uppercase text-[#6B7280]">
                      Today
                    </span>
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[12px] font-medium text-[#6B7280]">
            <div className="flex items-center gap-4">
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-[3px] bg-[#FEF2F2] border border-[#E53935]" />
                Workout Completed Day
              </span>
              <span className="inline-flex items-center gap-1.5">
                <span className="w-3 h-3 rounded-[3px] bg-white border-2 border-[#111827]" />
                Today
              </span>
            </div>

            {selectedCalendarDateKey && (
              <button
                type="button"
                onClick={() => setSelectedCalendarDateKey(null)}
                className="text-[12px] font-bold text-[#E53935] hover:underline"
              >
                Filtering history by {selectedCalendarDateKey} (Clear Date Filter)
              </button>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. WORKOUT HISTORY LIST (Search, Category Filter, Sort, Open Details)
          ===================================================================== */}
      <section className="space-y-4">
        <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-5 sm:p-6 shadow-hf-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#F1F5F9]">
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E53935] block">
                Completed Sessions Log
              </span>
              <h2 className="text-[20px] sm:text-[22px] font-extrabold text-[#111827]">
                Workout History ({filteredHistory.length})
              </h2>
            </div>

            {/* Sort Newest / Oldest Toggle */}
            <button
              type="button"
              onClick={() =>
                setSortOrder((prev) => (prev === 'newest' ? 'oldest' : 'newest'))
              }
              className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] bg-[#F8FAFC] hover:bg-[#FEF2F2] border border-[#E5E7EB] hover:border-[#FECACA] text-[12px] font-bold text-[#111827] hover:text-[#E53935] transition-colors self-start sm:self-center"
            >
              <ArrowUpDown className="w-3.5 h-3.5 text-[#E53935]" />
              <span>
                Sort: {sortOrder === 'newest' ? 'Newest to Oldest' : 'Oldest to Newest'}
              </span>
            </button>
          </div>

          {/* Search Input & Category Filter Tabs */}
          <div className="space-y-4">
            <div className="relative max-w-xl">
              <TextInput
                label="Search Workout History"
                placeholder="Search completed workouts by name, category, or exercise..."
                value={historySearch}
                onChange={(e) => setHistorySearch(e.target.value)}
                leftIcon={<Search className="w-4 h-4 text-[#6B7280]" />}
              />
              {historySearch && (
                <button
                  type="button"
                  onClick={() => setHistorySearch('')}
                  aria-label="Clear history search"
                  className="absolute right-3 top-[34px] w-7 h-7 rounded-[6px] bg-[#F1F5F9] hover:bg-[#FEE2E2] text-[#4B5563] hover:text-[#E53935] flex items-center justify-center"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
              {HISTORY_CATEGORY_TABS.map((cat) => {
                const active = historyCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setHistoryCategory(cat)}
                    className={`px-3.5 py-1.5 rounded-[8px] text-[12px] font-bold whitespace-nowrap border transition-all ${
                      active
                        ? 'bg-[#E53935] text-white border-[#E53935] shadow-hf-xs'
                        : 'bg-[#F8FAFC] text-[#4B5563] border-[#E5E7EB] hover:border-[#FECACA] hover:text-[#E53935]'
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* History Items or Friendly Empty State */}
        {history.length === 0 ? (
          <EmptyState
            title="No Workout History Yet"
            description="Your completed workouts will appear here automatically with full exercise-by-exercise breakdowns, sets, repetitions, and exact durations."
            ctaLabel="Start Your First Workout"
            onCtaClick={() => navigate('/workout/active')}
          />
        ) : filteredHistory.length === 0 ? (
          <EmptyState
            title="No Matching Workout Records"
            description="No completed sessions match your current search, category filter, or selected calendar date."
            ctaLabel="Reset History Filters"
            onCtaClick={() => {
              setHistorySearch('');
              setHistoryCategory('All');
              setSelectedCalendarDateKey(null);
            }}
          />
        ) : (
          <div className="space-y-3.5">
            {filteredHistory.map((entry) => {
              const formattedDateTime = new Intl.DateTimeFormat('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              }).format(new Date(entry.finishedAt));

              return (
                <article
                  key={entry.sessionId}
                  onClick={() => navigate(`/progress/${entry.sessionId}`)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) =>
                    e.key === 'Enter' &&
                    navigate(`/progress/${entry.sessionId}`)
                  }
                  className="group bg-white rounded-[12px] border border-[#E5E7EB] hover:border-[#E53935] p-5 shadow-hf-xs hover:shadow-hf-sm transition-all flex flex-col lg:flex-row lg:items-center justify-between gap-4 cursor-pointer"
                >
                  <div className="flex items-start gap-3.5">
                    <div className="w-11 h-11 rounded-[10px] bg-[#FEF2F2] group-hover:bg-[#E53935] border border-[#FECACA] text-[#E53935] group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                      <Dumbbell className="w-5 h-5" strokeWidth={2.25} />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-[17px] font-bold text-[#111827] group-hover:text-[#E53935] transition-colors">
                          {entry.workoutName}
                        </h3>
                        <span className="px-2 py-0.5 rounded-[5px] bg-[#F8FAFC] border border-[#E5E7EB] text-[11px] font-bold text-[#4B5563]">
                          {entry.category}
                        </span>
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[5px] bg-[#F0FDF4] border border-[#BBF7D0] text-[#16A34A] font-mono tabular-nums text-[11px] font-bold">
                          <CheckCircle2 className="w-3 h-3" strokeWidth={2.5} />
                          {entry.completionPercentage}%
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-medium text-[#6B7280] mt-1">
                        <span className="inline-flex items-center gap-1">
                          <CalendarIcon className="w-3.5 h-3.5 text-[#E53935]" />
                          {formattedDateTime}
                        </span>
                        <span>•</span>
                        <span>Difficulty: {entry.difficulty}</span>
                        <span>•</span>
                        <span className="font-mono font-semibold text-[#111827]">
                          {entry.totalRepetitions} total reps
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Right KPI Pills + View Details CTA */}
                  <div className="flex flex-wrap items-center justify-between lg:justify-end gap-2.5 pt-3 lg:pt-0 border-t lg:border-t-0 border-[#F1F5F9]">
                    <div className="flex items-center gap-2 font-mono tabular-nums">
                      <div className="px-3 py-1.5 rounded-[8px] bg-[#FEF2F2] border border-[#FECACA] text-center">
                        <span className="block text-[9px] font-bold uppercase text-[#C62828]">
                          Duration
                        </span>
                        <span className="text-[13px] font-extrabold text-[#E53935]">
                          {formatSecondsToMMSS(entry.actualDurationSeconds)}
                        </span>
                      </div>

                      <div className="px-3 py-1.5 rounded-[8px] bg-[#F8FAFC] border border-[#E5E7EB] text-center">
                        <span className="block text-[9px] font-bold uppercase text-[#6B7280]">
                          Exercises
                        </span>
                        <span className="text-[13px] font-bold text-[#111827]">
                          {entry.completedExercises}/{entry.totalExercises}
                        </span>
                      </div>

                      <div className="px-3 py-1.5 rounded-[8px] bg-[#F8FAFC] border border-[#E5E7EB] text-center">
                        <span className="block text-[9px] font-bold uppercase text-[#6B7280]">
                          Sets
                        </span>
                        <span className="text-[13px] font-bold text-[#111827]">
                          {entry.completedSets}/{entry.totalSets}
                        </span>
                      </div>
                    </div>

                    <span className="inline-flex items-center gap-1 px-3 py-2 rounded-[8px] bg-[#F8FAFC] group-hover:bg-[#E53935] border border-[#E5E7EB] group-hover:border-[#E53935] text-[12px] font-bold text-[#111827] group-hover:text-white transition-colors">
                      <span>Details</span>
                      <ChevronRight className="w-4 h-4" strokeWidth={2.25} />
                    </span>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
};
