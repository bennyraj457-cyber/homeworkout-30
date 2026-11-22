import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ChevronLeft,
  Clock,
  Dumbbell,
  Flame,
  Layers,
  Play,
  Timer,
  Target,
  CheckCircle2,
  ShieldCheck,
} from 'lucide-react';
import { Button } from '../design-system/components/Buttons';
import { ExerciseIllustration } from '../design-system/components/ExerciseVisuals';
import { EmptyState } from '../design-system/components/FeedbackComponents';
import { WORKOUT_PLANS_DATA } from '../data/workoutLibraryData';

export const WorkoutDetails: React.FC = () => {
  const { workoutId } = useParams<{ workoutId: string }>();
  const navigate = useNavigate();

  const plan = WORKOUT_PLANS_DATA.find((w) => w.id === workoutId);

  if (!plan) {
    return (
      <div className="py-8">
        <EmptyState
          title="Workout Plan Not Found"
          description="The requested workout plan could not be found in the HomeFit 30 Workout Library."
          ctaLabel="Return to Workout Library"
          onCtaClick={() => navigate('/workouts')}
        />
      </div>
    );
  }

  const totalSets = plan.exercises.reduce((acc, ex) => acc + ex.sets, 0);
  const totalEstimatedDuration = plan.exercises.reduce(
    (acc, ex) => acc + ex.estimatedMinutes,
    0
  );

  const difficultyBadgeStyle = {
    Beginner: 'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]',
    Intermediate: 'bg-[#FEF2F2] text-[#E53935] border-[#FECACA]',
    Advanced: 'bg-[#1E293B] text-white border-[#1E293B]',
  }[plan.difficulty];

  const handleStartWorkout = () => {
    navigate(`/workout/active?plan=${plan.id}`);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* =====================================================================
          TOP NAVIGATION BREADCRUMB
          ===================================================================== */}
      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate('/workouts')}
          className="inline-flex items-center gap-2 px-3 py-2 rounded-[8px] bg-white hover:bg-[#FEF2F2] border border-[#E5E7EB] hover:border-[#FECACA] text-[13px] font-bold text-[#111827] hover:text-[#E53935] transition-colors"
        >
          <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
          <span>Back to Workout Library</span>
        </button>

        <span className="font-mono text-[12px] font-bold text-[#6B7280] uppercase">
          Plan ID: {plan.id}
        </span>
      </div>

      {/* =====================================================================
          WORKOUT HERO SUMMARY CARD
          Shows:
          - Workout title
          - Duration
          - Difficulty
          - Target muscle groups
          - Estimated rest time
          - Total estimated workout duration
          - Red "Start Workout" button
          ===================================================================== */}
      <section className="bg-white rounded-[12px] border-2 border-[#E53935] shadow-hf-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left 7 Cols: Title, Badges, Target Muscles & CTA */}
          <div className="lg:col-span-7 p-5 sm:p-7 flex flex-col justify-between">
            <div>
              {/* Category & Difficulty Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] text-[11px] font-bold uppercase tracking-wider">
                  <Dumbbell className="w-3.5 h-3.5" strokeWidth={2.25} />
                  {plan.primaryCategory}
                </span>

                <span
                  className={`px-2.5 py-1 rounded-[6px] border text-[11px] font-bold uppercase tracking-wider ${difficultyBadgeStyle}`}
                >
                  {plan.difficulty}
                </span>

                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[6px] bg-[#F8FAFC] border border-[#E5E7EB] font-mono tabular-nums text-[12px] font-bold text-[#111827]">
                  <Clock className="w-3.5 h-3.5 text-[#E53935]" strokeWidth={2.25} />
                  {plan.durationMinutes} Minutes
                </span>
              </div>

              {/* Workout Title & Description */}
              <h1 className="text-[26px] sm:text-[32px] font-extrabold text-[#111827] tracking-tight leading-tight">
                {plan.name}
              </h1>
              <p className="text-[14px] sm:text-[15px] font-medium text-[#4B5563] mt-2 leading-relaxed">
                {plan.subtitle}
              </p>

              {/* Target Muscle Groups & Equipment */}
              <div className="mt-5 pt-5 border-t border-[#F1F5F9] grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.04em] text-[#6B7280] mb-2">
                    <Target className="w-3.5 h-3.5 text-[#E53935]" />
                    Target Muscle Groups
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {plan.targetMuscleGroups.map((muscle) => (
                      <span
                        key={muscle}
                        className="px-2.5 py-1 rounded-[6px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] text-[12px] font-bold"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.04em] text-[#6B7280] mb-2">
                    <Dumbbell className="w-3.5 h-3.5 text-[#E53935]" />
                    Required Equipment
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {plan.equipmentNeeded.map((eq) => (
                      <span
                        key={eq}
                        className="px-2.5 py-1 rounded-[6px] bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827] text-[12px] font-semibold"
                      >
                        {eq}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Primary Red "Start Workout" CTA */}
            <div className="mt-6 pt-5 border-t border-[#F1F5F9] flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                onClick={handleStartWorkout}
                leftIcon={<Play className="w-5 h-5 fill-current" />}
              >
                Start Workout ({plan.durationMinutes} Min)
              </Button>
            </div>
          </div>

          {/* Right 5 Cols: Visual Illustration & Key Session Metrics */}
          <div className="lg:col-span-5 bg-[#F8FAFC] border-t lg:border-t-0 lg:border-l border-[#E5E7EB] p-5 sm:p-6 flex flex-col justify-between">
            <div className="rounded-[10px] border border-[#E5E7EB] bg-white overflow-hidden h-44 mb-4 shadow-hf-xs">
              <ExerciseIllustration id={plan.coverExerciseId} />
            </div>

            {/* 4 Key Workout Metrics Grid */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 rounded-[10px] bg-white border border-[#E5E7EB]">
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                  <Clock className="w-3 h-3 text-[#E53935]" />
                  Total Est. Duration
                </span>
                <span className="font-mono tabular-nums text-[20px] font-extrabold text-[#111827] mt-1 block">
                  {totalEstimatedDuration} Minutes
                </span>
              </div>

              <div className="p-3.5 rounded-[10px] bg-white border border-[#E5E7EB]">
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                  <Timer className="w-3 h-3 text-[#E53935]" />
                  Estimated Rest Time
                </span>
                <span className="font-mono tabular-nums text-[15px] font-extrabold text-[#E53935] mt-1.5 block">
                  {plan.estimatedRestBetweenSets}
                </span>
              </div>

              <div className="p-3.5 rounded-[10px] bg-white border border-[#E5E7EB]">
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                  <Layers className="w-3 h-3 text-[#E53935]" />
                  Exercises & Volume
                </span>
                <span className="font-mono tabular-nums text-[18px] font-extrabold text-[#111827] mt-1 block">
                  {plan.exercises.length} Moves • {totalSets} Sets
                </span>
              </div>

              <div className="p-3.5 rounded-[10px] bg-white border border-[#E5E7EB]">
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                  <Flame className="w-3 h-3 text-[#E53935]" />
                  Estimated Burn
                </span>
                <span className="font-mono tabular-nums text-[18px] font-extrabold text-[#111827] mt-1 block">
                  ~{plan.estimatedCalories} kcal
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          ORDERED EXERCISE LIST SECTION
          Shows:
          - Exercise list in workout order
          - Sets and repetitions for each exercise
          - Estimated rest time per exercise
          - Exercise duration & recommended load
          ===================================================================== */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-[20px] font-extrabold text-[#111827] tracking-tight">
              Workout Exercise Order ({plan.exercises.length} Exercises)
            </h2>
            <p className="text-[13px] font-medium text-[#4B5563]">
              Complete exercises in sequence from 1 to {plan.exercises.length}. Follow the prescribed sets, repetitions, and rest intervals.
            </p>
          </div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] bg-[#FEF2F2] border border-[#FECACA] font-mono tabular-nums text-[12px] font-bold text-[#E53935]">
            <ShieldCheck className="w-4 h-4" />
            Total Duration: {totalEstimatedDuration} Min
          </span>
        </div>

        <div className="space-y-3.5">
          {plan.exercises.map((step) => (
            <div
              key={`${plan.id}-step-${step.stepOrder}`}
              className="bg-white rounded-[12px] border border-[#E5E7EB] hover:border-[#D1D5DB] p-4 sm:p-5 shadow-hf-xs transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left: Step Order Number + Vector Illustration + Name & Coaching Cue */}
              <div className="flex items-start sm:items-center gap-4">
                {/* Step Number Badge */}
                <div className="w-9 h-9 rounded-[8px] bg-[#E53935] text-white font-mono tabular-nums text-[14px] font-extrabold flex items-center justify-center shrink-0 shadow-hf-red">
                  {String(step.stepOrder).padStart(2, '0')}
                </div>

                {/* Mini Illustration Thumbnail */}
                <div className="hidden sm:block w-28 h-20 rounded-[8px] border border-[#E5E7EB] bg-[#F8FAFC] overflow-hidden shrink-0">
                  <ExerciseIllustration id={step.exerciseId} />
                </div>

                {/* Exercise Details */}
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-[16px] sm:text-[17px] font-bold text-[#111827]">
                      {step.name}
                    </h3>
                    <span className="px-2 py-0.5 rounded-[5px] bg-[#F8FAFC] border border-[#E5E7EB] text-[11px] font-bold text-[#4B5563]">
                      {step.equipment}
                    </span>
                  </div>

                  <p className="text-[12px] font-bold uppercase tracking-wider text-[#E53935]">
                    Target: {step.targetMuscle}
                  </p>

                  <p className="text-[13px] font-normal text-[#4B5563] leading-snug">
                    {step.coachingNote}
                  </p>
                </div>
              </div>

              {/* Right: Sets & Reps, Rest Time, Est. Block Duration */}
              <div className="grid grid-cols-3 sm:flex sm:items-center gap-2 sm:gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-[#F1F5F9] shrink-0">
                {/* Sets × Reps Pill */}
                <div className="px-3 py-2 rounded-[8px] bg-[#FEF2F2] border border-[#FECACA] text-center">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-[#C62828]">
                    Sets × Reps
                  </span>
                  <span className="font-mono tabular-nums text-[13px] sm:text-[14px] font-extrabold text-[#E53935]">
                    {step.sets} × {step.repsOrDuration}
                  </span>
                </div>

                {/* Rest Time Pill */}
                <div className="px-3 py-2 rounded-[8px] bg-[#F8FAFC] border border-[#E5E7EB] text-center">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                    Rest Time
                  </span>
                  <span className="font-mono tabular-nums text-[13px] sm:text-[14px] font-bold text-[#111827]">
                    {step.restSeconds}s Rest
                  </span>
                </div>

                {/* Estimated Block Duration */}
                <div className="px-3 py-2 rounded-[8px] bg-[#F8FAFC] border border-[#E5E7EB] text-center">
                  <span className="block text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                    Est. Time
                  </span>
                  <span className="font-mono tabular-nums text-[13px] sm:text-[14px] font-bold text-[#111827]">
                    ~{step.estimatedMinutes} min
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          BOTTOM STICKY / SUMMARY ACTION BAR
          ===================================================================== */}
      <section className="bg-[#FEF2F2] rounded-[12px] border border-[#FECACA] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-[8px] bg-[#E53935] text-white flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" strokeWidth={2.25} />
          </div>
          <div>
            <h4 className="text-[15px] font-bold text-[#111827]">
              Ready to Start {plan.name}?
            </h4>
            <p className="text-[13px] font-medium text-[#4B5563]">
              {plan.exercises.length} exercises • {totalSets} total sets •{' '}
              {totalEstimatedDuration} minutes total estimated duration
            </p>
          </div>
        </div>

        <Button
          variant="primary"
          size="lg"
          onClick={handleStartWorkout}
          leftIcon={<Play className="w-5 h-5 fill-current" />}
          className="shrink-0"
        >
          Start Workout
        </Button>
      </section>
    </div>
  );
};
