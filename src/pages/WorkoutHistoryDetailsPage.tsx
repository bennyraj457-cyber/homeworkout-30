import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ChevronLeft,
  Clock,
  Dumbbell,
  Calendar,
  CheckCircle2,
  Check,
  SkipForward,
  Play,
  Trophy,
} from 'lucide-react';
import { Button } from '../design-system/components/Buttons';
import { ExerciseIllustration } from '../design-system/components/ExerciseVisuals';
import { EmptyState } from '../design-system/components/FeedbackComponents';
import {
  loadCompletedWorkoutHistory,
  getExerciseDetailsForHistoryEntry,
  formatSecondsToMMSS,
} from '../services/workoutStorage';

export const WorkoutHistoryDetailsPage: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const navigate = useNavigate();

  const history = loadCompletedWorkoutHistory();
  const entry = history.find((item) => item.sessionId === sessionId);

  if (!entry) {
    return (
      <div className="py-8">
        <EmptyState
          title="Workout History Record Not Found"
          description="The selected workout record could not be found in your local workout history."
          ctaLabel="Back to Progress & History"
          onCtaClick={() => navigate('/progress')}
        />
      </div>
    );
  }

  const exerciseDetails = getExerciseDetailsForHistoryEntry(entry);

  const formattedStarted = new Intl.DateTimeFormat('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(entry.startedAt));

  const formattedFinished = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(entry.finishedAt));

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Top Breadcrumb Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={() => navigate('/progress')}
          className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] bg-white hover:bg-[#FEF2F2] border border-[#E5E7EB] hover:border-[#FECACA] text-[13px] font-bold text-[#111827] hover:text-[#E53935] transition-colors shadow-hf-xs"
        >
          <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
          <span>Back to Progress & History</span>
        </button>

        <Button
          variant="primary"
          size="sm"
          onClick={() => navigate(`/workout/active?plan=${entry.planId}`)}
          leftIcon={<Play className="w-4 h-4 fill-current" />}
        >
          Repeat This Workout
        </Button>
      </div>

      {/* =====================================================================
          WORKOUT SUMMARY HERO CARD
          Shows:
          - Workout summary (Title, Category, Difficulty, Timestamps)
          - Total duration
          - Session completion percentage
          - Completed & Skipped sets count
          - Actual repetitions count
          ===================================================================== */}
      <section className="bg-white rounded-[12px] border-2 border-[#E53935] p-5 sm:p-7 shadow-hf-sm space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#F1F5F9]">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-[12px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] flex items-center justify-center shrink-0">
              <Trophy className="w-6 h-6" strokeWidth={2.25} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="px-2.5 py-0.5 rounded-[5px] bg-[#E53935] text-white text-[11px] font-bold uppercase tracking-wider">
                  Completed Workout Record
                </span>
                <span className="px-2.5 py-0.5 rounded-[5px] bg-[#F8FAFC] border border-[#E5E7EB] text-[11px] font-bold text-[#4B5563]">
                  {entry.category} • {entry.difficulty}
                </span>
              </div>

              <h1 className="text-[24px] sm:text-[30px] font-extrabold text-[#111827] tracking-tight">
                {entry.workoutName}
              </h1>

              <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[13px] font-medium text-[#6B7280] mt-1">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="w-4 h-4 text-[#E53935]" />
                  {formattedStarted} – {formattedFinished}
                </span>
              </div>
            </div>
          </div>

          {/* Session Completion Percentage Ring / Badge */}
          <div className="flex items-center gap-3 self-start md:self-center px-4 py-2.5 rounded-[10px] bg-[#F0FDF4] border border-[#BBF7D0]">
            <CheckCircle2 className="w-6 h-6 text-[#16A34A]" strokeWidth={2.5} />
            <div>
              <span className="block text-[10px] font-bold uppercase tracking-wider text-[#16A34A]">
                Session Completion
              </span>
              <span className="font-mono tabular-nums text-[22px] font-extrabold text-[#16A34A] leading-none">
                {entry.completionPercentage}%
              </span>
            </div>
          </div>
        </div>

        {/* 5 Key Summary Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
          <div className="p-3.5 rounded-[10px] bg-[#FEF2F2] border border-[#FECACA]">
            <span className="flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-[#C62828]">
              <Clock className="w-3.5 h-3.5 text-[#E53935]" />
              Total Duration
            </span>
            <span className="font-mono tabular-nums text-[22px] font-extrabold text-[#E53935] mt-1 block">
              {formatSecondsToMMSS(entry.actualDurationSeconds)}
            </span>
            <span className="text-[11px] font-semibold text-[#C62828]">
              Est. {entry.estimatedDurationMinutes}m plan
            </span>
          </div>

          <div className="p-3.5 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block">
              Exercises
            </span>
            <span className="font-mono tabular-nums text-[22px] font-extrabold text-[#111827] mt-1 block">
              {entry.completedExercises} / {entry.totalExercises}
            </span>
            <span className="text-[11px] font-semibold text-[#4B5563]">
              {entry.skippedExercises} skipped
            </span>
          </div>

          <div className="p-3.5 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block">
              Completed Sets
            </span>
            <span className="font-mono tabular-nums text-[22px] font-extrabold text-[#16A34A] mt-1 block">
              {entry.completedSets} / {entry.totalSets}
            </span>
            <span className="text-[11px] font-semibold text-[#4B5563]">
              Logged working sets
            </span>
          </div>

          <div className="p-3.5 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block">
              Skipped Sets
            </span>
            <span className="font-mono tabular-nums text-[22px] font-extrabold text-[#6B7280] mt-1 block">
              {entry.skippedSets}
            </span>
            <span className="text-[11px] font-semibold text-[#6B7280]">
              Not counted as done
            </span>
          </div>

          <div className="col-span-2 sm:col-span-1 p-3.5 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB]">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block">
              Actual Repetitions
            </span>
            <span className="font-mono tabular-nums text-[22px] font-extrabold text-[#111827] mt-1 block">
              {entry.totalRepetitions}
            </span>
            <span className="text-[11px] font-semibold text-[#4B5563]">
              Total volume
            </span>
          </div>
        </div>
      </section>

      {/* =====================================================================
          EXERCISE-BY-EXERCISE BREAKDOWN WITH COMPLETED & SKIPPED SETS
          ===================================================================== */}
      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <h2 className="text-[20px] font-extrabold text-[#111827] tracking-tight">
              Exercise-by-Exercise Breakdown ({exerciseDetails.length})
            </h2>
            <p className="text-[13px] font-medium text-[#4B5563]">
              Detailed log of every completed and skipped set with actual repetitions performed
            </p>
          </div>
        </div>

        <div className="space-y-4">
          {exerciseDetails.map((ex, idx) => {
            const completedSetsInEx = ex.sets.filter(
              (s) => s.status === 'completed'
            ).length;
            const skippedSetsInEx = ex.sets.filter(
              (s) => s.status === 'skipped'
            ).length;
            const totalActualRepsInEx = ex.sets
              .filter((s) => s.status === 'completed')
              .reduce((sum, s) => sum + s.actualReps, 0);

            return (
              <div
                key={`${ex.exerciseId}-${idx}`}
                className="bg-white rounded-[12px] border border-[#E5E7EB] overflow-hidden shadow-hf-xs"
              >
                {/* Exercise Header Row */}
                <div className="p-4 sm:p-5 bg-[#F8FAFC] border-b border-[#F1F5F9] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-3.5">
                    <div className="w-9 h-9 rounded-[8px] bg-[#E53935] text-white font-mono tabular-nums text-[14px] font-extrabold flex items-center justify-center shrink-0">
                      {idx + 1}
                    </div>
                    <div className="hidden sm:block w-20 h-14 rounded-[8px] border border-[#E5E7EB] bg-white overflow-hidden shrink-0">
                      <ExerciseIllustration id={ex.exerciseId} />
                    </div>
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-[17px] font-bold text-[#111827]">
                          {ex.name}
                        </h3>
                        <span className="px-2 py-0.5 rounded-[5px] bg-white border border-[#E5E7EB] text-[11px] font-bold text-[#4B5563]">
                          {ex.equipment}
                        </span>
                      </div>
                      <p className="text-[12px] font-bold uppercase tracking-wider text-[#E53935] mt-0.5">
                        Target: {ex.targetMuscle}
                      </p>
                    </div>
                  </div>

                  {/* Exercise Set & Rep Summary Pills */}
                  <div className="flex flex-wrap items-center gap-2 font-mono tabular-nums">
                    <span className="px-2.5 py-1 rounded-[6px] bg-[#F0FDF4] border border-[#BBF7D0] text-[#16A34A] text-[12px] font-bold">
                      {completedSetsInEx}/{ex.sets.length} Sets Done
                    </span>
                    {skippedSetsInEx > 0 && (
                      <span className="px-2.5 py-1 rounded-[6px] bg-white border border-[#E5E7EB] text-[#6B7280] text-[12px] font-bold">
                        {skippedSetsInEx} Skipped
                      </span>
                    )}
                    <span className="px-2.5 py-1 rounded-[6px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] text-[12px] font-extrabold">
                      {totalActualRepsInEx}{' '}
                      {ex.sets[0]?.isTimedHold ? 'Total Sec' : 'Actual Reps'}
                    </span>
                  </div>
                </div>

                {/* Individual Sets Table/List */}
                <div className="p-4 sm:p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {ex.sets.map((s) => {
                    const isCompleted = s.status === 'completed';
                    const isSkipped = s.status === 'skipped';

                    return (
                      <div
                        key={s.setNumber}
                        className={`p-3 rounded-[9px] border flex items-center justify-between gap-2 ${
                          isCompleted
                            ? 'bg-[#F0FDF4]/60 border-[#BBF7D0]'
                            : isSkipped
                            ? 'bg-[#F8FAFC] border-[#E5E7EB] opacity-75'
                            : 'bg-white border-[#E5E7EB]'
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-6 h-6 rounded-[5px] font-mono text-[11px] font-extrabold flex items-center justify-center ${
                              isCompleted
                                ? 'bg-[#16A34A] text-white'
                                : 'bg-[#E5E7EB] text-[#6B7280]'
                            }`}
                          >
                            {isCompleted ? (
                              <Check className="w-3.5 h-3.5" strokeWidth={3} />
                            ) : isSkipped ? (
                              <SkipForward className="w-3 h-3" />
                            ) : (
                              `S${s.setNumber}`
                            )}
                          </span>
                          <div>
                            <span className="text-[13px] font-bold text-[#111827] block">
                              Set {s.setNumber}
                            </span>
                            <span
                              className={`text-[10px] font-bold uppercase ${
                                isCompleted
                                  ? 'text-[#16A34A]'
                                  : 'text-[#6B7280]'
                              }`}
                            >
                              {isCompleted
                                ? 'Completed'
                                : isSkipped
                                ? 'Skipped'
                                : 'Unfinished'}
                            </span>
                          </div>
                        </div>

                        <div className="text-right font-mono tabular-nums">
                          <span className="text-[14px] font-extrabold text-[#111827] block">
                            {isCompleted ? s.actualReps : 0}{' '}
                            {s.isTimedHold ? 'sec' : 'reps'}
                          </span>
                          <span className="text-[10px] font-semibold text-[#6B7280]">
                            Target: {s.targetReps}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom Actions */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
        <Button
          variant="outline"
          size="md"
          onClick={() => navigate('/progress')}
          leftIcon={<ChevronLeft className="w-4 h-4" />}
        >
          Back to Progress & History
        </Button>

        <Button
          variant="primary"
          size="md"
          onClick={() => navigate(`/workout/active?plan=${entry.planId}`)}
          leftIcon={<Dumbbell className="w-4 h-4" />}
        >
          Train {entry.workoutName} Again
        </Button>
      </div>
    </div>
  );
};
