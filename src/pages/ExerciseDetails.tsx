import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ChevronLeft,
  ChevronRight,
  Dumbbell,
  Target,
  Layers,
  CheckCircle2,
  AlertTriangle,
  Sparkles,
  Wind,
  Compass,
  ShieldCheck,
  ListChecks,
  Play,
} from 'lucide-react';
import { Button } from '../design-system/components/Buttons';
import { ExerciseIllustration } from '../design-system/components/ExerciseVisuals';
import { EmptyState } from '../design-system/components/FeedbackComponents';
import { EXERCISE_LIBRARY_DATA } from '../data/exerciseLibraryData';

export const ExerciseDetails: React.FC = () => {
  const { exerciseId } = useParams<{ exerciseId: string }>();
  const navigate = useNavigate();

  const currentIndex = EXERCISE_LIBRARY_DATA.findIndex(
    (ex) => ex.id === exerciseId
  );
  const exercise =
    currentIndex !== -1 ? EXERCISE_LIBRARY_DATA[currentIndex] : undefined;

  if (!exercise) {
    return (
      <div className="py-8">
        <EmptyState
          title="Exercise Not Found"
          description="The requested exercise could not be found in the HomeFit 30 Exercise Library."
          ctaLabel="Back to Exercises"
          onCtaClick={() => navigate('/exercises')}
        />
      </div>
    );
  }

  const prevExercise =
    currentIndex > 0 ? EXERCISE_LIBRARY_DATA[currentIndex - 1] : null;
  const nextExercise =
    currentIndex < EXERCISE_LIBRARY_DATA.length - 1
      ? EXERCISE_LIBRARY_DATA[currentIndex + 1]
      : null;

  const relatedExercises = EXERCISE_LIBRARY_DATA.filter(
    (ex) => ex.category === exercise.category && ex.id !== exercise.id
  );

  const difficultyBadgeStyle = {
    Beginner: 'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]',
    Intermediate: 'bg-[#FEF2F2] text-[#E53935] border-[#FECACA]',
    Advanced: 'bg-[#1E293B] text-white border-[#1E293B]',
  }[exercise.difficulty];

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* =====================================================================
          TOP NAVIGATION BAR WITH "Back to Exercises" ACTION
          ===================================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate('/exercises')}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] bg-white hover:bg-[#FEF2F2] border border-[#E5E7EB] hover:border-[#FECACA] text-[13px] font-bold text-[#111827] hover:text-[#E53935] transition-colors shadow-hf-xs"
        >
          <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
          <span>Back to Exercises</span>
        </button>

        {/* Previous / Next Exercise Quick Switcher */}
        <div className="flex items-center gap-2">
          {prevExercise && (
            <button
              type="button"
              onClick={() => navigate(`/exercises/${prevExercise.id}`)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-[7px] bg-[#F8FAFC] hover:bg-[#FEF2F2] border border-[#E5E7EB] hover:border-[#FECACA] text-[12px] font-semibold text-[#4B5563] hover:text-[#E53935] transition-colors"
              title={`Previous: ${prevExercise.name}`}
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">{prevExercise.name}</span>
              <span className="sm:hidden">Prev</span>
            </button>
          )}
          <span className="font-mono tabular-nums text-[12px] font-bold px-2.5 py-1.5 rounded-[7px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935]">
            #{String(exercise.number).padStart(2, '0')} / {EXERCISE_LIBRARY_DATA.length}
          </span>
          {nextExercise && (
            <button
              type="button"
              onClick={() => navigate(`/exercises/${nextExercise.id}`)}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-[7px] bg-[#F8FAFC] hover:bg-[#FEF2F2] border border-[#E5E7EB] hover:border-[#FECACA] text-[12px] font-semibold text-[#4B5563] hover:text-[#E53935] transition-colors"
              title={`Next: ${nextExercise.name}`}
            >
              <span className="hidden sm:inline">{nextExercise.name}</span>
              <span className="sm:hidden">Next</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* =====================================================================
          HERO CARD: LARGE ILLUSTRATION + CORE EXERCISE METADATA
          Displays:
          - Large exercise illustration
          - Exercise name
          - Primary muscles targeted
          - Secondary muscles targeted
          - Required equipment
          - Difficulty level
          - Suggested sets and repetitions
          ===================================================================== */}
      <section className="bg-white rounded-[12px] border-2 border-[#E53935] shadow-hf-sm overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Left 5 Cols: Large Exercise Vector Illustration */}
          <div className="lg:col-span-5 bg-[#F8FAFC] border-b lg:border-b-0 lg:border-r border-[#E5E7EB] p-5 sm:p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-1 rounded-[6px] bg-[#E53935] text-white font-mono tabular-nums text-[11px] font-extrabold uppercase">
                Exercise #{String(exercise.number).padStart(2, '0')} • {exercise.category}
              </span>
              <span
                className={`px-2.5 py-1 rounded-[6px] border text-[11px] font-bold uppercase tracking-wider ${difficultyBadgeStyle}`}
              >
                {exercise.difficulty}
              </span>
            </div>

            {/* Large High-Clarity Illustration Canvas */}
            <div className="w-full h-56 sm:h-64 rounded-[10px] border border-[#E5E7EB] bg-white overflow-hidden shadow-hf-xs flex items-center justify-center">
              <ExerciseIllustration id={exercise.id} />
            </div>

            {/* Suggested Sets & Reps + Rest Interval Callout */}
            <div className="mt-4 grid grid-cols-2 gap-3">
              <div className="p-3 rounded-[10px] bg-[#FEF2F2] border border-[#FECACA]">
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#C62828]">
                  <Layers className="w-3.5 h-3.5 text-[#E53935]" />
                  Suggested Sets & Reps
                </span>
                <span className="font-mono tabular-nums text-[15px] font-extrabold text-[#E53935] mt-1 block">
                  {exercise.suggestedSetsAndReps}
                </span>
              </div>

              <div className="p-3 rounded-[10px] bg-white border border-[#E5E7EB]">
                <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#6B7280]">
                  <Dumbbell className="w-3.5 h-3.5 text-[#E53935]" />
                  Required Equipment
                </span>
                <span className="text-[14px] font-bold text-[#111827] mt-1 block">
                  {exercise.equipmentRequired}
                </span>
              </div>
            </div>
          </div>

          {/* Right 7 Cols: Title, Summary, Primary & Secondary Muscles */}
          <div className="lg:col-span-7 p-5 sm:p-7 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.05em] text-[#E53935] mb-1">
                <Target className="w-3.5 h-3.5" />
                <span>{exercise.targetMuscleGroup}</span>
              </div>

              <h1 className="text-[28px] sm:text-[34px] font-extrabold text-[#111827] tracking-tight leading-tight">
                {exercise.name}
              </h1>

              <p className="text-[15px] font-medium text-[#4B5563] mt-2 leading-relaxed">
                {exercise.shortSummary}
              </p>

              {/* Primary & Secondary Muscles Targeted */}
              <div className="mt-6 pt-5 border-t border-[#F1F5F9] grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Primary Muscles Targeted */}
                <div className="p-4 rounded-[10px] bg-[#FEF2F2]/60 border border-[#FECACA]">
                  <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.04em] text-[#C62828] mb-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#E53935]" />
                    Primary Muscles Targeted
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {exercise.primaryMuscles.map((muscle) => (
                      <span
                        key={muscle}
                        className="px-2.5 py-1 rounded-[6px] bg-white border border-[#FECACA] text-[#E53935] text-[12px] font-bold shadow-hf-xs"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Secondary Muscles Targeted */}
                <div className="p-4 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB]">
                  <span className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.04em] text-[#4B5563] mb-2.5">
                    <span className="w-2 h-2 rounded-full bg-[#1E293B]" />
                    Secondary Muscles Targeted
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {exercise.secondaryMuscles.map((muscle) => (
                      <span
                        key={muscle}
                        className="px-2.5 py-1 rounded-[6px] bg-white border border-[#E5E7EB] text-[#111827] text-[12px] font-semibold"
                      >
                        {muscle}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Starting Position Box */}
              <div className="mt-5 p-4 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB]">
                <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#111827] mb-1.5">
                  <Compass className="w-4 h-4 text-[#E53935]" strokeWidth={2.25} />
                  <span>Starting Position</span>
                </div>
                <p className="text-[14px] font-normal text-[#4B5563] leading-relaxed">
                  {exercise.startingPosition}
                </p>
              </div>
            </div>

            {/* Quick Action Footer */}
            <div className="mt-6 pt-4 border-t border-[#F1F5F9] flex flex-wrap items-center justify-between gap-3">
              <div className="text-[12px] font-semibold text-[#6B7280]">
                Recommended Rest:{' '}
                <span className="font-mono font-bold text-[#111827]">
                  {exercise.recommendedRest}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/exercises')}
                  leftIcon={<ChevronLeft className="w-4 h-4" />}
                >
                  Back to Exercises
                </Button>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => navigate(`/workout/active?exercise=${exercise.id}`)}
                  leftIcon={<Play className="w-4 h-4 fill-current" />}
                >
                  Practice Exercise
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          TECHNIQUE & EXECUTION BREAKDOWN GRID
          1. Step-by-Step Instructions
          2. Correct Movement Technique & Breathing Instructions
          ===================================================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left 7 Cols: Step-by-Step Instructions */}
        <div className="lg:col-span-7 bg-white rounded-[12px] border border-[#E5E7EB] p-5 sm:p-6 shadow-hf-xs">
          <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-[#F1F5F9]">
            <div className="w-9 h-9 rounded-[8px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] flex items-center justify-center">
              <ListChecks className="w-5 h-5" strokeWidth={2.25} />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#E53935] block">
                Execution Sequence
              </span>
              <h2 className="text-[18px] font-extrabold text-[#111827]">
                Step-by-Step Instructions
              </h2>
            </div>
          </div>

          <ol className="space-y-3.5">
            {exercise.stepByStepInstructions.map((stepText, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3.5 p-3.5 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB]"
              >
                <span className="w-7 h-7 rounded-[6px] bg-[#E53935] text-white font-mono tabular-nums text-[12px] font-extrabold flex items-center justify-center shrink-0 mt-0.5 shadow-hf-red">
                  {idx + 1}
                </span>
                <p className="text-[14px] font-medium text-[#111827] leading-relaxed">
                  {stepText}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {/* Right 5 Cols: Correct Movement Technique + Breathing Instructions */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Correct Movement Technique */}
          <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-5 sm:p-6 shadow-hf-xs flex-1">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-[8px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] flex items-center justify-center">
                <ShieldCheck className="w-5 h-5" strokeWidth={2.25} />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#E53935] block">
                  Biomechanical Cue
                </span>
                <h2 className="text-[17px] font-extrabold text-[#111827]">
                  Correct Movement Technique
                </h2>
              </div>
            </div>
            <p className="text-[14px] font-normal text-[#4B5563] leading-relaxed">
              {exercise.correctMovementTechnique}
            </p>
          </div>

          {/* Breathing Instructions */}
          <div className="bg-[#FEF2F2] rounded-[12px] border border-[#FECACA] p-5 sm:p-6 shadow-hf-xs">
            <div className="flex items-center gap-2.5 mb-3">
              <div className="w-9 h-9 rounded-[8px] bg-[#E53935] text-white flex items-center justify-center">
                <Wind className="w-5 h-5" strokeWidth={2.25} />
              </div>
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C62828] block">
                  Respiratory Rhythm
                </span>
                <h2 className="text-[17px] font-extrabold text-[#111827]">
                  Breathing Instructions
                </h2>
              </div>
            </div>
            <p className="text-[14px] font-medium text-[#111827] leading-relaxed">
              {exercise.breathingInstructions}
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          COACHING GUARDRAILS: COMMON MISTAKES TO AVOID & BEGINNER-FRIENDLY TIPS
          ===================================================================== */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Common Mistakes to Avoid */}
        <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-5 sm:p-6 shadow-hf-xs">
          <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-[#F1F5F9]">
            <div className="w-9 h-9 rounded-[8px] bg-[#FFFBEB] border border-[#FDE68A] text-[#D97706] flex items-center justify-center">
              <AlertTriangle className="w-5 h-5" strokeWidth={2.25} />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#D97706] block">
                Form Safety Checklist
              </span>
              <h2 className="text-[17px] font-extrabold text-[#111827]">
                Common Mistakes to Avoid
              </h2>
            </div>
          </div>

          <ul className="space-y-3">
            {exercise.commonMistakesToAvoid.map((mistake, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 p-3 rounded-[8px] bg-[#FFFBEB]/60 border border-[#FDE68A]"
              >
                <span className="w-5 h-5 rounded-full bg-[#D97706] text-white font-mono text-[11px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                  !
                </span>
                <span className="text-[13px] sm:text-[14px] font-medium text-[#111827] leading-snug">
                  {mistake}
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Beginner-Friendly Tips */}
        <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-5 sm:p-6 shadow-hf-xs">
          <div className="flex items-center gap-2.5 mb-4 pb-3 border-b border-[#F1F5F9]">
            <div className="w-9 h-9 rounded-[8px] bg-[#F0FDF4] border border-[#BBF7D0] text-[#16A34A] flex items-center justify-center">
              <Sparkles className="w-5 h-5" strokeWidth={2.25} />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-[#16A34A] block">
                Coaching Progression
              </span>
              <h2 className="text-[17px] font-extrabold text-[#111827]">
                Beginner-Friendly Tips
              </h2>
            </div>
          </div>

          <ul className="space-y-3">
            {exercise.beginnerFriendlyTips.map((tip, idx) => (
              <li
                key={idx}
                className="flex items-start gap-3 p-3 rounded-[8px] bg-[#F0FDF4]/60 border border-[#BBF7D0]"
              >
                <CheckCircle2
                  className="w-5 h-5 text-[#16A34A] shrink-0 mt-0.5"
                  strokeWidth={2.5}
                />
                <span className="text-[13px] sm:text-[14px] font-medium text-[#111827] leading-snug">
                  {tip}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* =====================================================================
          MORE EXERCISES IN THIS MUSCLE CATEGORY + BACK TO EXERCISES FOOTER
          ===================================================================== */}
      <section className="bg-white rounded-[12px] border border-[#E5E7EB] p-5 sm:p-6 shadow-hf-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#E53935] block">
              Same Muscle Category
            </span>
            <h3 className="text-[17px] font-extrabold text-[#111827]">
              More {exercise.category} Exercises
            </h3>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/exercises')}
            leftIcon={<ChevronLeft className="w-4 h-4" />}
          >
            Back to Exercises
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
          {relatedExercises.map((rel) => (
            <button
              key={rel.id}
              type="button"
              onClick={() => navigate(`/exercises/${rel.id}`)}
              className="p-3.5 rounded-[10px] border border-[#E5E7EB] hover:border-[#E53935] bg-[#F8FAFC] hover:bg-[#FEF2F2]/40 text-left transition-all flex items-center justify-between gap-3 group"
            >
              <div className="min-w-0">
                <span className="font-mono text-[10px] font-bold uppercase text-[#E53935] block">
                  #{String(rel.number).padStart(2, '0')} • {rel.difficulty}
                </span>
                <span className="text-[14px] font-bold text-[#111827] group-hover:text-[#E53935] truncate block mt-0.5">
                  {rel.name}
                </span>
                <span className="text-[11px] font-medium text-[#6B7280] truncate block">
                  {rel.suggestedSetsAndReps}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-[#9CA3AF] group-hover:text-[#E53935] shrink-0" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
};
