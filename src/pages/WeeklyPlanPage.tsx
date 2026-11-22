import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Clock,
  Dumbbell,
  Play,
  CheckCircle2,
  Flame,
  Layers,
  Target,
  Sparkles,
  Repeat,
} from 'lucide-react';
import { Button } from '../design-system/components/Buttons';
import { ExerciseIllustration } from '../design-system/components/ExerciseVisuals';
import {
  REPEATING_WEEKLY_SCHEDULE,
  WORKOUT_PLANS_DATA,
} from '../data/workoutLibraryData';
import {
  loadCompletedWorkoutHistory,
  calculateWeeklyActivity,
} from '../services/workoutStorage';

export const WeeklyPlanPage: React.FC = () => {
  const navigate = useNavigate();

  const todayJsDay = new Date().getDay();
  const [selectedDayFilter, setSelectedDayFilter] = useState<number | 'ALL'>(
    'ALL'
  );

  const history = loadCompletedWorkoutHistory();
  const currentWeekActivity = calculateWeeklyActivity(history, 0);

  const visibleDays =
    selectedDayFilter === 'ALL'
      ? REPEATING_WEEKLY_SCHEDULE
      : REPEATING_WEEKLY_SCHEDULE.filter(
          (d) => d.jsDayOfWeek === selectedDayFilter
        );

  const totalWeeklyWorkoutMinutes = REPEATING_WEEKLY_SCHEDULE.reduce(
    (sum, d) => {
      if (d.isRestDay) return sum;
      const plan = WORKOUT_PLANS_DATA.find((p) => p.id === d.planId);
      return sum + (plan?.durationMinutes || 30);
    },
    0
  );

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* =====================================================================
          1. PAGE HEADER: REPEATING 7-DAY WEEKLY WORKOUT PLAN
          ===================================================================== */}
      <section className="bg-white rounded-[12px] border-2 border-[#E53935] p-5 sm:p-7 shadow-hf-sm space-y-5">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-5 border-b border-[#F1F5F9]">
          <div>
            <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] text-[11px] font-bold uppercase tracking-wider mb-2">
              <Repeat className="w-3.5 h-3.5" />
              <span>Repeats Every Week • Monday to Sunday</span>
            </div>
            <h1 className="text-[26px] sm:text-[32px] font-extrabold text-[#111827] tracking-tight leading-tight">
              Weekly Workout Plan (Mon – Sun)
            </h1>
            <p className="text-[14px] sm:text-[15px] font-medium text-[#4B5563] mt-1">
              Your structured 6-Day Training + 1-Day Recovery schedule. Every day’s full workout and exercise list is shown below.
            </p>
          </div>

          {/* Summary KPI Pills */}
          <div className="grid grid-cols-3 gap-2.5 shrink-0">
            <div className="px-3.5 py-2.5 rounded-[10px] bg-[#FEF2F2] border border-[#FECACA] text-center">
              <span className="block text-[10px] font-bold uppercase text-[#C62828]">
                Training Days
              </span>
              <span className="font-mono tabular-nums text-[18px] font-extrabold text-[#E53935]">
                6 Days
              </span>
            </div>

            <div className="px-3.5 py-2.5 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB] text-center">
              <span className="block text-[10px] font-bold uppercase text-[#6B7280]">
                Rest / Stretch
              </span>
              <span className="font-mono tabular-nums text-[18px] font-extrabold text-[#111827]">
                Sunday
              </span>
            </div>

            <div className="px-3.5 py-2.5 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB] text-center">
              <span className="block text-[10px] font-bold uppercase text-[#6B7280]">
                Weekly Time
              </span>
              <span className="font-mono tabular-nums text-[18px] font-extrabold text-[#111827]">
                {totalWeeklyWorkoutMinutes}m
              </span>
            </div>
          </div>
        </div>

        {/* Day Filter Bar: View All 7 Days or Isolate a Single Day */}
        <div>
          <span className="block text-[11px] font-bold uppercase tracking-wider text-[#6B7280] mb-2">
            Jump to Day or View All 7 Days
          </span>
          <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedDayFilter('ALL')}
              className={`px-3.5 py-2 rounded-[8px] text-[12px] font-bold whitespace-nowrap border transition-all ${
                selectedDayFilter === 'ALL'
                  ? 'bg-[#E53935] text-white border-[#E53935] shadow-hf-red'
                  : 'bg-[#F8FAFC] text-[#4B5563] border-[#E5E7EB] hover:border-[#E53935] hover:text-[#E53935]'
              }`}
            >
              All 7 Days (Mon – Sun)
            </button>

            {REPEATING_WEEKLY_SCHEDULE.map((dayItem) => {
              const isSelected = selectedDayFilter === dayItem.jsDayOfWeek;
              const isToday = dayItem.jsDayOfWeek === todayJsDay;

              return (
                <button
                  key={dayItem.dayShort}
                  type="button"
                  onClick={() => setSelectedDayFilter(dayItem.jsDayOfWeek)}
                  className={`px-3.5 py-2 rounded-[8px] text-[12px] font-bold whitespace-nowrap border transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-[#E53935] text-white border-[#E53935] shadow-hf-red'
                      : isToday
                      ? 'bg-[#FEF2F2] text-[#E53935] border-[#FECACA]'
                      : 'bg-white text-[#111827] border-[#E5E7EB] hover:border-[#E53935]'
                  }`}
                >
                  <span>{dayItem.dayName}</span>
                  {isToday && (
                    <span
                      className={`text-[10px] font-mono uppercase px-1.5 py-0.2 rounded ${
                        isSelected
                          ? 'bg-white/20 text-white'
                          : 'bg-[#E53935] text-white'
                      }`}
                    >
                      Today
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. FULL WORKOUT BREAKDOWN FOR EACH DAY (MONDAY TO SUNDAY)
          ===================================================================== */}
      <section className="space-y-6">
        {visibleDays.map((dayItem) => {
          const assignedPlan =
            WORKOUT_PLANS_DATA.find((p) => p.id === dayItem.planId) ||
            WORKOUT_PLANS_DATA[0];
          const isToday = dayItem.jsDayOfWeek === todayJsDay;
          const dayBucket = currentWeekActivity.days[dayItem.dayIndex - 1];
          const isCompletedThisWeek = Boolean(
            dayBucket && dayBucket.workoutsCount > 0
          );
          const totalSets = assignedPlan.exercises.reduce(
            (s, ex) => s + ex.sets,
            0
          );

          return (
            <article
              key={dayItem.dayName}
              className={`bg-white rounded-[12px] border overflow-hidden shadow-hf-xs transition-all ${
                isToday
                  ? 'border-2 border-[#E53935] shadow-hf-sm'
                  : 'border-[#E5E7EB]'
              }`}
            >
              {/* Top Day Banner Header */}
              <div
                className={`p-5 sm:p-6 border-b border-[#E5E7EB] flex flex-col lg:flex-row lg:items-center justify-between gap-4 ${
                  isToday
                    ? 'bg-[#FEF2F2]/70'
                    : dayItem.isRestDay
                    ? 'bg-[#F8FAFC]'
                    : 'bg-white'
                }`}
              >
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span
                      className={`px-3 py-1 rounded-[6px] font-mono text-[12px] font-extrabold uppercase tracking-wider ${
                        isToday
                          ? 'bg-[#E53935] text-white shadow-hf-red'
                          : dayItem.isRestDay
                          ? 'bg-[#1E293B] text-white'
                          : 'bg-[#FEF2F2] text-[#E53935] border border-[#FECACA]'
                      }`}
                    >
                      {dayItem.dayName} •{' '}
                      {dayItem.isRestDay
                        ? 'Rest & Recovery Day'
                        : `Workout Day ${dayItem.dayIndex} of 6`}
                    </span>

                    {isToday && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[6px] bg-[#E53935] text-white text-[11px] font-bold uppercase">
                        <Sparkles className="w-3 h-3" />
                        Today’s Scheduled Workout
                      </span>
                    )}

                    {isCompletedThisWeek && (
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[6px] bg-[#F0FDF4] border border-[#BBF7D0] text-[#16A34A] text-[11px] font-bold uppercase">
                        <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2.5} />
                        Completed This Week
                      </span>
                    )}

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[6px] bg-white border border-[#E5E7EB] font-mono text-[12px] font-bold text-[#111827]">
                      <Clock className="w-3.5 h-3.5 text-[#E53935]" />
                      {assignedPlan.durationMinutes} Minutes
                    </span>

                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[6px] bg-white border border-[#E5E7EB] font-mono text-[12px] font-bold text-[#4B5563]">
                      <Layers className="w-3.5 h-3.5 text-[#E53935]" />
                      {assignedPlan.exercises.length} Exercises ({totalSets} Sets)
                    </span>
                  </div>

                  <h2 className="text-[22px] sm:text-[26px] font-extrabold text-[#111827] tracking-tight">
                    {dayItem.isRestDay
                      ? 'Sunday Rest Day & Optional Full Body Stretch'
                      : `${assignedPlan.name} — ${dayItem.focusTitle}`}
                  </h2>

                  <p className="text-[13px] sm:text-[14px] font-medium text-[#4B5563]">
                    {assignedPlan.subtitle}
                  </p>

                  {/* Target Muscle Chips */}
                  <div className="flex flex-wrap items-center gap-1.5 pt-1">
                    <span className="text-[11px] font-bold uppercase text-[#6B7280] flex items-center gap-1 mr-1">
                      <Target className="w-3.5 h-3.5 text-[#E53935]" />
                      Muscles:
                    </span>
                    {assignedPlan.targetMuscleGroups.map((m) => (
                      <span
                        key={m}
                        className="px-2 py-0.5 rounded-[5px] bg-white border border-[#E5E7EB] text-[11px] font-bold text-[#111827]"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Start & View Buttons for This Day */}
                <div className="flex flex-wrap items-center gap-2.5 shrink-0">
                  <Button
                    variant="outline"
                    size="md"
                    onClick={() => navigate(`/workouts/${assignedPlan.id}`)}
                  >
                    Full Plan Details
                  </Button>
                  <Button
                    variant="primary"
                    size="md"
                    onClick={() =>
                      navigate(`/workout/active?plan=${assignedPlan.id}`)
                    }
                    leftIcon={<Play className="w-4 h-4 fill-current" />}
                  >
                    {dayItem.isRestDay
                      ? 'Start 15m Stretch'
                      : `Start ${dayItem.dayName} Workout`}
                  </Button>
                </div>
              </div>

              {/* Exercise Grid for This Day */}
              <div className="p-5 sm:p-6 bg-white">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[12px] font-bold uppercase tracking-wider text-[#6B7280]">
                    {dayItem.dayName} Exercise Lineup (In Order 1 –{' '}
                    {assignedPlan.exercises.length})
                  </span>
                  <span className="font-mono text-[12px] font-semibold text-[#6B7280] flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5 text-[#E53935]" />~
                    {assignedPlan.estimatedCalories} kcal •{' '}
                    {assignedPlan.estimatedRestBetweenSets}
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                  {assignedPlan.exercises.map((step) => (
                    <div
                      key={`${dayItem.dayShort}-step-${step.stepOrder}`}
                      onClick={() => navigate(`/exercises/${step.exerciseId}`)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) =>
                        e.key === 'Enter' &&
                        navigate(`/exercises/${step.exerciseId}`)
                      }
                      className="group rounded-[10px] border border-[#E5E7EB] hover:border-[#E53935] bg-[#F8FAFC] hover:bg-white p-3.5 transition-all flex items-start gap-3 cursor-pointer"
                    >
                      {/* Mini Exercise Illustration */}
                      <div className="w-20 h-16 rounded-[8px] border border-[#E5E7EB] bg-white overflow-hidden shrink-0 relative">
                        <ExerciseIllustration id={step.exerciseId} />
                        <span className="absolute top-1 left-1 w-5 h-5 rounded-[4px] bg-[#E53935] text-white font-mono text-[10px] font-extrabold flex items-center justify-center">
                          {step.stepOrder}
                        </span>
                      </div>

                      {/* Exercise Name, Sets × Reps, Equipment & Rest */}
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between gap-1">
                          <h3 className="text-[14px] font-extrabold text-[#111827] group-hover:text-[#E53935] truncate transition-colors">
                            {step.name}
                          </h3>
                        </div>

                        <p className="text-[11px] font-bold text-[#E53935] truncate mt-0.5">
                          {step.targetMuscle}
                        </p>

                        <div className="flex flex-wrap items-center gap-1.5 mt-2 font-mono tabular-nums">
                          <span className="px-2 py-0.5 rounded-[5px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] text-[11px] font-extrabold">
                            {step.sets} Sets × {step.repsOrDuration}
                          </span>
                          <span className="px-2 py-0.5 rounded-[5px] bg-white border border-[#E5E7EB] text-[#4B5563] text-[10px] font-bold">
                            {step.restSeconds}s Rest
                          </span>
                        </div>

                        <div className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold text-[#6B7280]">
                          <Dumbbell className="w-3 h-3 text-[#9CA3AF]" />
                          <span>
                            {step.equipment} ({step.recommendedLoad})
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </article>
          );
        })}
      </section>
    </div>
  );
};
