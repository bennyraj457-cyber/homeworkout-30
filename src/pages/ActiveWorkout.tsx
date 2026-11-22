import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Play,
  Pause,
  ChevronLeft,
  ChevronRight,
  SkipForward,
  Check,
  CheckCircle2,
  Clock,
  Dumbbell,
  Flame,
  RotateCcw,
  Plus,
  Minus,
  Trophy,
  Target,
  Layers,
  BellRing,
  ListChecks,
  Wind,
  AlertCircle,
  History,
  Home,
} from 'lucide-react';
import { Button, IconButton } from '../design-system/components/Buttons';
import { ExerciseIllustration } from '../design-system/components/ExerciseVisuals';
import {
  ConfirmationDialog,
  ToastNotification,
} from '../design-system/components/FeedbackComponents';
import {
  WorkoutSession,
  ExerciseSession,
  WorkoutProgress,
} from '../types/workoutSession';
import {
  createWorkoutSessionFromPlan,
  loadActiveWorkoutSession,
  saveActiveWorkoutSession,
  clearActiveWorkoutSession,
  calculateWorkoutProgress,
  getLiveElapsedSeconds,
  formatSecondsToMMSS,
  saveCompletedWorkoutToHistory,
  playRestFinishedAudioCue,
  loadPersonalGoals,
} from '../services/workoutStorage';
import { WORKOUT_PLANS_DATA } from '../data/workoutLibraryData';

export const ActiveWorkout: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const requestedPlanId = searchParams.get('plan');
  const requestedExerciseId = searchParams.get('exercise');

  // Prompt shown when an unfinished session exists in localStorage AND user opened a different plan
  const [pendingPlanSwitchId, setPendingPlanSwitchId] = useState<string | null>(
    null
  );

  // Initialize workout session from localStorage (resume support) or create from plan
  const [session, setSession] = useState<WorkoutSession>(() => {
    const saved = loadActiveWorkoutSession();
    if (saved && saved.stage !== 'completed') {
      return saved;
    }
    const fresh = createWorkoutSessionFromPlan(
      requestedPlanId,
      requestedExerciseId
    );
    saveActiveWorkoutSession(fresh);
    return fresh;
  });

  // Check if user requested a specific plan or exercise in URL that differs from a saved session
  useEffect(() => {
    if (
      requestedExerciseId &&
      session.planId !== `single-${requestedExerciseId}`
    ) {
      if (session.stage === 'active') {
        setPendingPlanSwitchId(`exercise:${requestedExerciseId}`);
      } else {
        const switched = createWorkoutSessionFromPlan(
          null,
          requestedExerciseId
        );
        setSession(switched);
        saveActiveWorkoutSession(switched);
      }
      return;
    }

    if (
      requestedPlanId &&
      session.planId !== requestedPlanId &&
      session.stage === 'active'
    ) {
      setPendingPlanSwitchId(requestedPlanId);
    } else if (
      requestedPlanId &&
      session.planId !== requestedPlanId &&
      session.stage === 'overview'
    ) {
      const switched = createWorkoutSessionFromPlan(requestedPlanId, null);
      setSession(switched);
      saveActiveWorkoutSession(switched);
    }
  }, [
    requestedPlanId,
    requestedExerciseId,
    session.planId,
    session.stage,
  ]);

  // Persist every session update to localStorage immediately
  useEffect(() => {
    saveActiveWorkoutSession(session);
  }, [session]);

  // Modal confirmations
  const [showEndEarlyModal, setShowEndEarlyModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  // Live 250ms ticker that computes elapsed workout seconds and rest countdown from timestamps
  const [nowMs, setNowMs] = useState<number>(() => Date.now());

  useEffect(() => {
    const interval = window.setInterval(() => {
      const currentNow = Date.now();
      setNowMs(currentNow);

      setSession((prev) => {
        if (
          prev.stage !== 'active' ||
          prev.isPaused ||
          !prev.restTimer.isActive ||
          prev.restTimer.isPaused ||
          !prev.restTimer.targetEndTimeMs
        ) {
          return prev;
        }

        const remaining = Math.max(
          0,
          Math.ceil((prev.restTimer.targetEndTimeMs - currentNow) / 1000)
        );

        if (remaining === 0) {
          const prefs = loadPersonalGoals();
          if (prefs.restAudioChimeEnabled !== false) {
            playRestFinishedAudioCue();
          }
          return {
            ...prev,
            restTimer: {
              ...prev.restTimer,
              isActive: false,
              isPaused: false,
              remainingSeconds: 0,
              targetEndTimeMs: null,
              justFinishedAlert: true,
            },
          };
        }

        if (remaining !== prev.restTimer.remainingSeconds) {
          return {
            ...prev,
            restTimer: {
              ...prev.restTimer,
              remainingSeconds: remaining,
            },
          };
        }

        return prev;
      });
    }, 250);

    return () => window.clearInterval(interval);
  }, []);

  const liveElapsedSeconds = getLiveElapsedSeconds(session, nowMs);
  const progress: WorkoutProgress = calculateWorkoutProgress(session);

  const currentExercise: ExerciseSession =
    session.exercises[session.currentExerciseIndex] || session.exercises[0];
  const currentSet =
    currentExercise?.sets[session.currentSetIndex] || currentExercise?.sets[0];

  /* ==========================================================================
     SESSION LIFECYCLE HANDLERS
     ========================================================================== */

  // 1. Start Workout from Overview
  const handleStartWorkout = useCallback(() => {
    const now = Date.now();
    setSession((prev) => ({
      ...prev,
      stage: 'active',
      isPaused: false,
      startedAt: prev.startedAt || new Date(now).toISOString(),
      lastResumedAtMs: now,
    }));
  }, []);

  // 2. Pause / Resume Entire Workout
  const handleTogglePauseWorkout = useCallback(() => {
    const now = Date.now();
    setSession((prev) => {
      if (prev.stage !== 'active') return prev;

      if (!prev.isPaused) {
        // Pausing workout: bank elapsed seconds and pause rest timer if running
        const accrued = prev.lastResumedAtMs
          ? prev.accumulatedElapsedSeconds +
            Math.max(0, (now - prev.lastResumedAtMs) / 1000)
          : prev.accumulatedElapsedSeconds;

        const restRemaining =
          prev.restTimer.isActive &&
          !prev.restTimer.isPaused &&
          prev.restTimer.targetEndTimeMs
            ? Math.max(
                0,
                Math.ceil((prev.restTimer.targetEndTimeMs - now) / 1000)
              )
            : prev.restTimer.remainingSeconds;

        return {
          ...prev,
          isPaused: true,
          accumulatedElapsedSeconds: accrued,
          lastResumedAtMs: null,
          restTimer: {
            ...prev.restTimer,
            isPaused: prev.restTimer.isActive ? true : prev.restTimer.isPaused,
            remainingSeconds: restRemaining,
            targetEndTimeMs: null,
          },
        };
      } else {
        // Resuming workout
        const shouldResumeRest =
          prev.restTimer.isActive && prev.restTimer.isPaused;
        return {
          ...prev,
          isPaused: false,
          lastResumedAtMs: now,
          restTimer: {
            ...prev.restTimer,
            isPaused: false,
            targetEndTimeMs: shouldResumeRest
              ? now + prev.restTimer.remainingSeconds * 1000
              : prev.restTimer.targetEndTimeMs,
          },
        };
      }
    });
  }, []);

  // 3. Edit Repetitions for a Set
  const handleAdjustSetReps = (setIdx: number, delta: number) => {
    setSession((prev) => {
      const updatedExercises = prev.exercises.map((ex, eIdx) => {
        if (eIdx !== prev.currentExerciseIndex) return ex;
        const updatedSets = ex.sets.map((s, sIdx) => {
          if (sIdx !== setIdx) return s;
          return {
            ...s,
            actualReps: Math.max(1, s.actualReps + delta),
          };
        });
        return { ...ex, sets: updatedSets };
      });
      return { ...prev, exercises: updatedExercises };
    });
  };

  // Helper to determine next pending exercise/set or trigger completion
  const resolveNextTargetAfterSet = (
    exercises: ExerciseSession[],
    exIdx: number,
    setIdx: number
  ): {
    nextExIdx: number;
    nextSetIdx: number;
    allDone: boolean;
    nextUpLabel: string;
    restDuration: number;
  } => {
    const currentEx = exercises[exIdx];

    // Check if there is another pending set in the current exercise
    const nextPendingSetInCurrent = currentEx.sets.findIndex(
      (s, idx) => idx > setIdx && s.status === 'pending'
    );
    const anyPendingSetInCurrent = currentEx.sets.findIndex(
      (s) => s.status === 'pending'
    );

    const targetSetInCurrent =
      nextPendingSetInCurrent !== -1
        ? nextPendingSetInCurrent
        : anyPendingSetInCurrent;

    if (targetSetInCurrent !== -1) {
      return {
        nextExIdx: exIdx,
        nextSetIdx: targetSetInCurrent,
        allDone: false,
        nextUpLabel: `${currentEx.name} • Set ${targetSetInCurrent + 1} of ${
          currentEx.sets.length
        }`,
        restDuration: currentEx.restSeconds || 60,
      };
    }

    // All sets in current exercise are finished (completed or skipped) -> find next exercise with pending sets
    for (let offset = 1; offset < exercises.length; offset++) {
      const candidateExIdx = (exIdx + offset) % exercises.length;
      const candidateEx = exercises[candidateExIdx];
      const firstPendingSet = candidateEx.sets.findIndex(
        (s) => s.status === 'pending'
      );
      if (firstPendingSet !== -1) {
        return {
          nextExIdx: candidateExIdx,
          nextSetIdx: firstPendingSet,
          allDone: false,
          nextUpLabel: `Next Exercise: ${candidateEx.name} • Set ${
            firstPendingSet + 1
          }`,
          restDuration: currentEx.restSeconds || 60,
        };
      }
    }

    return {
      nextExIdx: exIdx,
      nextSetIdx: setIdx,
      allDone: true,
      nextUpLabel: 'All Sets Finished!',
      restDuration: 0,
    };
  };

  // 4. Complete Set (Prevents duplicate completion, triggers Rest Timer automatically, advances exercise when all sets done)
  const handleCompleteSet = (targetSetIndex: number = session.currentSetIndex) => {
    const now = Date.now();
    setSession((prev) => {
      const ex = prev.exercises[prev.currentExerciseIndex];
      const targetSet = ex?.sets[targetSetIndex];

      // Prevent duplicate set completion
      if (!ex || !targetSet || targetSet.status === 'completed') {
        return prev;
      }

      // If workout was paused, resume clock when user logs a set
      const lastResumedAtMs = prev.isPaused ? now : prev.lastResumedAtMs || now;

      const updatedExercises: ExerciseSession[] = prev.exercises.map(
        (item, eIdx) => {
          if (eIdx !== prev.currentExerciseIndex) return item;
          const updatedSets = item.sets.map((s, sIdx) =>
            sIdx === targetSetIndex
              ? {
                  ...s,
                  status: 'completed' as const,
                  completedAt: new Date(now).toISOString(),
                }
              : s
          );

          const allSetsResolved = updatedSets.every(
            (s) => s.status === 'completed' || s.status === 'skipped'
          );

          return {
            ...item,
            sets: updatedSets,
            status: allSetsResolved ? 'completed' : 'in_progress',
          };
        }
      );

      const nextInfo = resolveNextTargetAfterSet(
        updatedExercises,
        prev.currentExerciseIndex,
        targetSetIndex
      );

      if (nextInfo.allDone) {
        // Every set of every exercise is resolved -> finish workout automatically
        const totalElapsed = prev.lastResumedAtMs
          ? prev.accumulatedElapsedSeconds +
            Math.max(0, (now - prev.lastResumedAtMs) / 1000)
          : prev.accumulatedElapsedSeconds;

        const finishedSession: WorkoutSession = {
          ...prev,
          stage: 'completed',
          isPaused: false,
          finishedAt: new Date(now).toISOString(),
          accumulatedElapsedSeconds: Math.max(1, totalElapsed),
          lastResumedAtMs: null,
          exercises: updatedExercises,
          restTimer: {
            ...prev.restTimer,
            isActive: false,
            isPaused: false,
            targetEndTimeMs: null,
            justFinishedAlert: false,
          },
        };
        saveCompletedWorkoutToHistory(finishedSession);
        return finishedSession;
      }

      // Otherwise start the automatic Rest Timer (if autoStartRestTimer preference is enabled)
      const restSecs = nextInfo.restDuration || 60;
      const prefs = loadPersonalGoals();
      const shouldAutoStartRest = prefs.autoStartRestTimer !== false;

      return {
        ...prev,
        isPaused: false,
        lastResumedAtMs,
        currentExerciseIndex: nextInfo.nextExIdx,
        currentSetIndex: nextInfo.nextSetIdx,
        exercises: updatedExercises,
        restTimer: {
          isActive: shouldAutoStartRest,
          isPaused: false,
          totalDurationSeconds: restSecs,
          remainingSeconds: restSecs,
          targetEndTimeMs: shouldAutoStartRest ? now + restSecs * 1000 : null,
          justFinishedAlert: false,
          nextUpLabel: nextInfo.nextUpLabel,
        },
      };
    });
  };

  // 5. Skip Set (Does NOT mark set as completed!)
  const handleSkipSet = (targetSetIndex: number = session.currentSetIndex) => {
    setSession((prev) => {
      const ex = prev.exercises[prev.currentExerciseIndex];
      const targetSet = ex?.sets[targetSetIndex];
      if (!ex || !targetSet || targetSet.status === 'completed') {
        return prev;
      }

      const updatedExercises: ExerciseSession[] = prev.exercises.map(
        (item, eIdx) => {
          if (eIdx !== prev.currentExerciseIndex) return item;
          const updatedSets = item.sets.map((s, sIdx) =>
            sIdx === targetSetIndex ? { ...s, status: 'skipped' as const } : s
          );

          const allSkipped = updatedSets.every((s) => s.status === 'skipped');
          const allResolved = updatedSets.every(
            (s) => s.status === 'completed' || s.status === 'skipped'
          );

          return {
            ...item,
            sets: updatedSets,
            status: allSkipped
              ? 'skipped'
              : allResolved
              ? 'completed'
              : 'in_progress',
          };
        }
      );

      const nextInfo = resolveNextTargetAfterSet(
        updatedExercises,
        prev.currentExerciseIndex,
        targetSetIndex
      );

      return {
        ...prev,
        currentExerciseIndex: nextInfo.nextExIdx,
        currentSetIndex: nextInfo.nextSetIdx,
        exercises: updatedExercises,
      };
    });
  };

  /* ==========================================================================
     REST TIMER CONTROLS (+15s, -15s, Pause/Resume, Skip Rest)
     ========================================================================== */
  const handleAdjustRestSeconds = (deltaSeconds: number) => {
    const now = Date.now();
    setSession((prev) => {
      if (!prev.restTimer.isActive) return prev;
      const newRemaining = Math.max(
        5,
        prev.restTimer.remainingSeconds + deltaSeconds
      );
      const newTotal = Math.max(prev.restTimer.totalDurationSeconds, newRemaining);

      return {
        ...prev,
        restTimer: {
          ...prev.restTimer,
          totalDurationSeconds: newTotal,
          remainingSeconds: newRemaining,
          targetEndTimeMs: prev.restTimer.isPaused
            ? null
            : now + newRemaining * 1000,
        },
      };
    });
  };

  const handleTogglePauseRestTimer = () => {
    const now = Date.now();
    setSession((prev) => {
      if (!prev.restTimer.isActive) return prev;
      if (!prev.restTimer.isPaused) {
        const remaining = prev.restTimer.targetEndTimeMs
          ? Math.max(
              0,
              Math.ceil((prev.restTimer.targetEndTimeMs - now) / 1000)
            )
          : prev.restTimer.remainingSeconds;
        return {
          ...prev,
          restTimer: {
            ...prev.restTimer,
            isPaused: true,
            remainingSeconds: remaining,
            targetEndTimeMs: null,
          },
        };
      } else {
        return {
          ...prev,
          restTimer: {
            ...prev.restTimer,
            isPaused: false,
            targetEndTimeMs: now + prev.restTimer.remainingSeconds * 1000,
          },
        };
      }
    });
  };

  const handleSkipRestTimer = () => {
    setSession((prev) => ({
      ...prev,
      restTimer: {
        ...prev.restTimer,
        isActive: false,
        isPaused: false,
        remainingSeconds: 0,
        targetEndTimeMs: null,
        justFinishedAlert: false,
      },
    }));
  };

  /* ==========================================================================
     EXERCISE NAVIGATION & WORKOUT CONTROLS
     (Previous Exercise, Next Exercise, Skip Exercise, Finish Workout, Reset)
     ========================================================================== */
  const handleGoToExercise = (targetIndex: number) => {
    setSession((prev) => {
      if (targetIndex < 0 || targetIndex >= prev.exercises.length) return prev;
      const targetEx = prev.exercises[targetIndex];
      const firstPending = targetEx.sets.findIndex(
        (s) => s.status === 'pending'
      );
      return {
        ...prev,
        currentExerciseIndex: targetIndex,
        currentSetIndex: firstPending !== -1 ? firstPending : 0,
      };
    });
  };

  const handleSkipCurrentExercise = () => {
    setSession((prev) => {
      const exIdx = prev.currentExerciseIndex;
      const updatedExercises: ExerciseSession[] = prev.exercises.map(
        (ex, idx) => {
          if (idx !== exIdx) return ex;
          // Mark all remaining pending sets as skipped (never completed)
          const updatedSets = ex.sets.map((s) =>
            s.status === 'pending' ? { ...s, status: 'skipped' as const } : s
          );
          const hasAnyCompleted = updatedSets.some(
            (s) => s.status === 'completed'
          );
          return {
            ...ex,
            sets: updatedSets,
            status: hasAnyCompleted ? 'completed' : 'skipped',
          };
        }
      );

      // Advance to next exercise
      const nextIdx =
        exIdx < updatedExercises.length - 1 ? exIdx + 1 : exIdx;
      const nextEx = updatedExercises[nextIdx];
      const firstPending = nextEx.sets.findIndex((s) => s.status === 'pending');

      return {
        ...prev,
        currentExerciseIndex: nextIdx,
        currentSetIndex: firstPending !== -1 ? firstPending : 0,
        exercises: updatedExercises,
      };
    });
  };

  const finalizeWorkoutSession = () => {
    const now = Date.now();
    setSession((prev) => {
      const totalElapsed = prev.lastResumedAtMs
        ? prev.accumulatedElapsedSeconds +
          Math.max(0, (now - prev.lastResumedAtMs) / 1000)
        : prev.accumulatedElapsedSeconds;

      const completedSession: WorkoutSession = {
        ...prev,
        stage: 'completed',
        isPaused: false,
        finishedAt: new Date(now).toISOString(),
        accumulatedElapsedSeconds: Math.max(1, totalElapsed),
        lastResumedAtMs: null,
        restTimer: {
          ...prev.restTimer,
          isActive: false,
          isPaused: false,
          targetEndTimeMs: null,
          justFinishedAlert: false,
        },
      };

      saveCompletedWorkoutToHistory(completedSession);
      return completedSession;
    });
    setShowEndEarlyModal(false);
  };

  const handleRequestFinishWorkout = () => {
    if (progress.completedSetsCount < progress.totalSets) {
      setShowEndEarlyModal(true);
    } else {
      finalizeWorkoutSession();
    }
  };

  const handleResetWorkout = () => {
    const fresh = createWorkoutSessionFromPlan(session.planId, null);
    setSession(fresh);
    saveActiveWorkoutSession(fresh);
    setShowResetModal(false);
  };

  const handleConfirmSwitchPlan = (newPlanOrExerciseKey: string) => {
    const fresh = newPlanOrExerciseKey.startsWith('exercise:')
      ? createWorkoutSessionFromPlan(
          null,
          newPlanOrExerciseKey.replace('exercise:', '')
        )
      : createWorkoutSessionFromPlan(newPlanOrExerciseKey, null);
    setSession(fresh);
    saveActiveWorkoutSession(fresh);
    setPendingPlanSwitchId(null);
  };

  const handleSelectPlanInOverview = (planId: string) => {
    const fresh = createWorkoutSessionFromPlan(planId, null);
    setSession(fresh);
    saveActiveWorkoutSession(fresh);
    setSearchParams({ plan: planId }, { replace: true });
  };

  /* ==========================================================================
     RENDER STAGE 1: WORKOUT OVERVIEW (Before Starting Workout)
     ========================================================================== */
  if (session.stage === 'overview') {
    return (
      <div className="space-y-6 sm:space-y-8">
        {/* Top Navigation Bar */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <button
            type="button"
            onClick={() => navigate('/workouts')}
            className="inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] bg-white hover:bg-[#FEF2F2] border border-[#E5E7EB] hover:border-[#FECACA] text-[13px] font-bold text-[#111827] hover:text-[#E53935] transition-colors shadow-hf-xs"
          >
            <ChevronLeft className="w-4 h-4" strokeWidth={2.5} />
            <span>Workout Library</span>
          </button>

          {/* Quick Plan Selector Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-[12px] font-semibold text-[#6B7280] hidden sm:inline">
              Switch Plan:
            </span>
            <select
              aria-label="Select Workout Plan"
              value={session.planId}
              onChange={(e) => handleSelectPlanInOverview(e.target.value)}
              className="h-9 rounded-[8px] px-3 bg-[#F8FAFC] border border-[#E5E7EB] text-[12px] font-bold text-[#111827] focus:outline-none focus:border-[#E53935]"
            >
              {WORKOUT_PLANS_DATA.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.durationMinutes}m • {p.difficulty})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Workout Overview Hero Card */}
        <section className="bg-white rounded-[12px] border-2 border-[#E53935] p-5 sm:p-7 shadow-hf-sm">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-[#F1F5F9]">
            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded-[6px] bg-[#E53935] text-white text-[11px] font-bold uppercase tracking-wider">
                  Workout Overview
                </span>
                <span className="px-2.5 py-1 rounded-[6px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] text-[11px] font-bold uppercase tracking-wider">
                  {session.category} • {session.difficulty}
                </span>
              </div>

              <h1 className="text-[28px] sm:text-[34px] font-extrabold text-[#111827] tracking-tight leading-tight">
                {session.workoutName}
              </h1>

              {/* Target Muscle Groups */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[12px] font-bold text-[#6B7280] mr-1 flex items-center gap-1">
                  <Target className="w-3.5 h-3.5 text-[#E53935]" />
                  Target Muscles:
                </span>
                {session.targetMuscleGroups.map((muscle) => (
                  <span
                    key={muscle}
                    className="px-2.5 py-0.5 rounded-[5px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] text-[12px] font-bold"
                  >
                    {muscle}
                  </span>
                ))}
              </div>
            </div>

            {/* Prominent Red "Start Workout" Button */}
            <div className="shrink-0">
              <Button
                variant="primary"
                size="lg"
                onClick={handleStartWorkout}
                leftIcon={<Play className="w-5 h-5 fill-current" />}
                className="w-full sm:w-auto min-w-[220px]"
              >
                Start Workout
              </Button>
            </div>
          </div>

          {/* 4 Overview Summary KPIs: Duration, Exercises, Total Sets, Estimated Rest */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 pt-6">
            <div className="p-3.5 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB]">
              <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#6B7280]">
                <Clock className="w-3.5 h-3.5 text-[#E53935]" />
                Est. Duration
              </span>
              <span className="font-mono tabular-nums text-[22px] font-extrabold text-[#111827] mt-1 block">
                {session.estimatedDurationMinutes} Min
              </span>
            </div>

            <div className="p-3.5 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB]">
              <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#6B7280]">
                <Dumbbell className="w-3.5 h-3.5 text-[#E53935]" />
                Exercises
              </span>
              <span className="font-mono tabular-nums text-[22px] font-extrabold text-[#111827] mt-1 block">
                {session.exercises.length} Exercises
              </span>
            </div>

            <div className="p-3.5 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB]">
              <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#6B7280]">
                <Layers className="w-3.5 h-3.5 text-[#E53935]" />
                Total Working Sets
              </span>
              <span className="font-mono tabular-nums text-[22px] font-extrabold text-[#111827] mt-1 block">
                {progress.totalSets} Sets
              </span>
            </div>

            <div className="p-3.5 rounded-[10px] bg-[#FEF2F2] border border-[#FECACA]">
              <span className="flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#C62828]">
                <Flame className="w-3.5 h-3.5 text-[#E53935]" />
                Estimated Rest
              </span>
              <span className="font-mono tabular-nums text-[16px] font-extrabold text-[#E53935] mt-1.5 block">
                {session.estimatedRestBetweenSets}
              </span>
            </div>
          </div>
        </section>

        {/* Ordered Exercise List Before Starting */}
        <section className="space-y-3.5">
          <div className="flex items-center justify-between">
            <h2 className="text-[18px] sm:text-[20px] font-extrabold text-[#111827]">
              Workout Exercise Lineup ({session.exercises.length})
            </h2>
            <span className="text-[12px] font-semibold text-[#6B7280]">
              Review sets, repetitions & rest intervals
            </span>
          </div>

          <div className="space-y-3">
            {session.exercises.map((ex, idx) => (
              <div
                key={`${ex.exerciseId}-${idx}`}
                className="bg-white rounded-[12px] border border-[#E5E7EB] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-hf-xs"
              >
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-[8px] bg-[#E53935] text-white font-mono tabular-nums text-[14px] font-extrabold flex items-center justify-center shrink-0">
                    {idx + 1}
                  </div>
                  <div className="w-20 h-14 rounded-[8px] border border-[#E5E7EB] bg-[#F8FAFC] overflow-hidden shrink-0 hidden sm:block">
                    <ExerciseIllustration id={ex.exerciseId} />
                  </div>
                  <div>
                    <h3 className="text-[16px] font-bold text-[#111827]">
                      {ex.name}
                    </h3>
                    <p className="text-[12px] font-semibold text-[#E53935]">
                      {ex.targetMuscle} • {ex.equipment}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 font-mono tabular-nums">
                  <span className="px-3 py-1.5 rounded-[7px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] text-[13px] font-extrabold">
                    {ex.sets.length} Sets × {ex.sets[0]?.repsLabel}
                  </span>
                  <span className="px-3 py-1.5 rounded-[7px] bg-[#F8FAFC] border border-[#E5E7EB] text-[#4B5563] text-[12px] font-bold">
                    {ex.restSeconds}s Rest
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              size="lg"
              fullWidth
              onClick={handleStartWorkout}
              leftIcon={<Play className="w-5 h-5 fill-current" />}
            >
              Start Workout Now
            </Button>
          </div>
        </section>
      </div>
    );
  }

  /* ==========================================================================
     RENDER STAGE 3: WORKOUT COMPLETION SCREEN
     ========================================================================== */
  if (session.stage === 'completed') {
    const finalDurationFormatted = formatSecondsToMMSS(
      session.accumulatedElapsedSeconds
    );

    return (
      <div className="max-w-3xl mx-auto space-y-6 sm:space-y-8 py-2">
        {/* Celebration Banner Card */}
        <section className="bg-white rounded-[12px] border-2 border-[#E53935] p-6 sm:p-8 shadow-hf-md text-center space-y-5">
          <div className="w-16 h-16 rounded-[14px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] flex items-center justify-center mx-auto shadow-hf-red">
            <Trophy className="w-8 h-8" strokeWidth={2.25} />
          </div>

          <div className="space-y-1.5">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-[6px] bg-[#F0FDF4] border border-[#BBF7D0] text-[#16A34A] text-[12px] font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} />
              Workout Session Saved Locally
            </span>
            <h1 className="text-[28px] sm:text-[36px] font-extrabold text-[#111827] tracking-tight">
              Congratulations! Workout Complete
            </h1>
            <p className="text-[15px] sm:text-[16px] font-semibold text-[#4B5563]">
              {session.workoutName} ({session.category})
            </p>
          </div>

          {/* 5 Core Completion Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 text-left">
            <div className="p-3.5 rounded-[10px] bg-[#FEF2F2] border border-[#FECACA]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#C62828] block">
                Total Duration
              </span>
              <span className="font-mono tabular-nums text-[22px] font-extrabold text-[#E53935] mt-1 block">
                {finalDurationFormatted}
              </span>
            </div>

            <div className="p-3.5 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block">
                Exercises Done
              </span>
              <span className="font-mono tabular-nums text-[22px] font-extrabold text-[#111827] mt-1 block">
                {progress.completedExercisesCount}/{progress.totalExercises}
              </span>
            </div>

            <div className="p-3.5 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block">
                Completed Sets
              </span>
              <span className="font-mono tabular-nums text-[22px] font-extrabold text-[#111827] mt-1 block">
                {progress.completedSetsCount}/{progress.totalSets}
              </span>
            </div>

            <div className="p-3.5 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#6B7280] block">
                Total Reps
              </span>
              <span className="font-mono tabular-nums text-[22px] font-extrabold text-[#111827] mt-1 block">
                {progress.totalCompletedReps}
              </span>
            </div>

            <div className="col-span-2 sm:col-span-1 p-3.5 rounded-[10px] bg-[#F0FDF4] border border-[#BBF7D0]">
              <span className="text-[10px] font-bold uppercase tracking-wider text-[#16A34A] block">
                Completion
              </span>
              <span className="font-mono tabular-nums text-[22px] font-extrabold text-[#16A34A] mt-1 block">
                {progress.completionPercentage}%
              </span>
            </div>
          </div>

          {/* Exercise-by-Exercise Breakdown */}
          <div className="text-left pt-4 border-t border-[#F1F5F9] space-y-2.5">
            <h3 className="text-[13px] font-bold uppercase tracking-wider text-[#6B7280]">
              Session Exercise Breakdown
            </h3>
            <div className="divide-y divide-[#F1F5F9] rounded-[10px] border border-[#E5E7EB] overflow-hidden">
              {session.exercises.map((ex, idx) => {
                const doneSets = ex.sets.filter(
                  (s) => s.status === 'completed'
                ).length;
                const doneReps = ex.sets
                  .filter((s) => s.status === 'completed')
                  .reduce((sum, s) => sum + s.actualReps, 0);

                return (
                  <div
                    key={`${ex.exerciseId}-${idx}`}
                    className="p-3.5 bg-white flex items-center justify-between gap-3"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold ${
                          doneSets > 0
                            ? 'bg-[#16A34A] text-white'
                            : 'bg-[#F1F5F9] text-[#9CA3AF]'
                        }`}
                      >
                        {doneSets > 0 ? (
                          <Check className="w-3.5 h-3.5" strokeWidth={3} />
                        ) : (
                          idx + 1
                        )}
                      </span>
                      <div>
                        <span className="text-[14px] font-bold text-[#111827] block">
                          {ex.name}
                        </span>
                        <span className="text-[11px] font-medium text-[#6B7280]">
                          {ex.targetMuscle}
                        </span>
                      </div>
                    </div>

                    <div className="font-mono tabular-nums text-[12px] font-bold text-right">
                      <span className="text-[#111827]">
                        {doneSets}/{ex.sets.length} Sets
                      </span>
                      <span className="text-[#6B7280] ml-2">
                        ({doneReps} {ex.sets[0]?.isTimedHold ? 'sec' : 'reps'})
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Primary Actions: Back to Dashboard, View Workout History, Train Again */}
          <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            <Button
              variant="primary"
              size="lg"
              onClick={() => {
                clearActiveWorkoutSession();
                navigate('/');
              }}
              leftIcon={<Home className="w-4 h-4" />}
            >
              Back to Dashboard
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={() => {
                clearActiveWorkoutSession();
                navigate('/progress');
              }}
              leftIcon={<History className="w-4 h-4" />}
            >
              View Workout History
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleResetWorkout}
              leftIcon={<RotateCcw className="w-4 h-4" />}
            >
              Start New Session
            </Button>
          </div>
        </section>
      </div>
    );
  }

  /* ==========================================================================
     RENDER STAGE 2: ACTIVE WORKOUT SCREEN
     ========================================================================== */
  const completedSetsInCurrentExercise = currentExercise.sets.filter(
    (s) => s.status === 'completed'
  ).length;

  return (
    <div className="space-y-5 sm:space-y-6">
      {/* Unfinished Session Plan Switch Banner (if user navigated here with a different ?plan= ID) */}
      {pendingPlanSwitchId && (
        <div className="bg-[#FFFBEB] border border-[#FDE68A] rounded-[12px] p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <AlertCircle className="w-5 h-5 text-[#D97706] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-[14px] font-bold text-[#111827]">
                Unfinished Session In Progress: {session.workoutName}
              </h4>
              <p className="text-[12px] font-medium text-[#4B5563]">
                You have an active workout saved. Would you like to keep training or switch to the new workout plan?
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPendingPlanSwitchId(null)}
            >
              Keep Current
            </Button>
            <Button
              variant="primary"
              size="sm"
              onClick={() => handleConfirmSwitchPlan(pendingPlanSwitchId)}
            >
              Switch Plan
            </Button>
          </div>
        </div>
      )}

      {/* Rest Finished Visual Alert Toast */}
      {session.restTimer.justFinishedAlert && (
        <ToastNotification
          title="Rest Complete! Time for Your Next Set"
          subtitle={`Ready for ${currentExercise.name} • Set ${
            session.currentSetIndex + 1
          } of ${currentExercise.sets.length}`}
          badgeText="GO"
          onDismiss={() =>
            setSession((prev) => ({
              ...prev,
              restTimer: { ...prev.restTimer, justFinishedAlert: false },
            }))
          }
        />
      )}

      {/* =====================================================================
          TOP SESSION STATUS HEADER & OVERALL WORKOUT PROGRESS BAR
          ===================================================================== */}
      <section className="bg-white rounded-[12px] border border-[#E5E7EB] p-4 sm:p-5 shadow-hf-xs space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          {/* Workout Title & Current Exercise Counter */}
          <div>
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-[5px] text-[11px] font-bold uppercase tracking-wider ${
                  session.isPaused
                    ? 'bg-[#FFFBEB] border border-[#FDE68A] text-[#D97706]'
                    : 'bg-[#FEF2F2] border border-[#FECACA] text-[#E53935]'
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    session.isPaused
                      ? 'bg-[#D97706]'
                      : 'bg-[#E53935] animate-pulse'
                  }`}
                />
                {session.isPaused ? 'Workout Paused' : 'Live Workout'}
              </span>
              <span className="font-mono tabular-nums text-[12px] font-extrabold text-[#111827]">
                Exercise {session.currentExerciseIndex + 1} of{' '}
                {session.exercises.length}
              </span>
            </div>

            <h1 className="text-[20px] sm:text-[24px] font-extrabold text-[#111827] tracking-tight mt-1">
              {session.workoutName}
            </h1>
          </div>

          {/* Live Elapsed Clock + Pause/Resume + Reset + Finish Controls */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Live Elapsed Timer Pill */}
            <div className="px-3.5 py-2 rounded-[8px] bg-[#F8FAFC] border border-[#E5E7EB] flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#E53935]" strokeWidth={2.25} />
              <div>
                <span className="block text-[9px] font-bold uppercase tracking-wider text-[#6B7280] leading-none">
                  Elapsed
                </span>
                <span className="font-mono tabular-nums text-[18px] font-extrabold text-[#111827] leading-tight">
                  {formatSecondsToMMSS(liveElapsedSeconds)}
                </span>
              </div>
            </div>

            {/* Pause / Resume Workout Button */}
            <Button
              variant={session.isPaused ? 'primary' : 'outline'}
              size="md"
              onClick={handleTogglePauseWorkout}
              leftIcon={
                session.isPaused ? (
                  <Play className="w-4 h-4 fill-current" />
                ) : (
                  <Pause className="w-4 h-4" />
                )
              }
            >
              {session.isPaused ? 'Resume Workout' : 'Pause'}
            </Button>

            {/* Reset Workout Button */}
            <IconButton
              label="Reset Workout Session"
              variant="subtle"
              size="md"
              onClick={() => setShowResetModal(true)}
              icon={<RotateCcw className="w-4 h-4" strokeWidth={2.25} />}
            />

            {/* Finish Workout Button */}
            <Button
              variant="secondary"
              size="md"
              onClick={handleRequestFinishWorkout}
            >
              Finish Workout
            </Button>
          </div>
        </div>

        {/* Overall Workout Progress Bar */}
        <div>
          <div className="flex items-center justify-between text-[12px] font-bold mb-1.5">
            <span className="text-[#4B5563]">
              Overall Workout Progress ({progress.completedSetsCount} of{' '}
              {progress.totalSets} sets completed)
            </span>
            <span className="font-mono tabular-nums text-[#E53935]">
              {progress.completionPercentage}%
            </span>
          </div>

          {/* Segmented Exercise Timeline Bar */}
          <div
            role="progressbar"
            aria-label="Overall workout progress"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress.completionPercentage}
            className="w-full h-2.5 bg-[#F1F5F9] rounded-full overflow-hidden"
          >
            <div
              className="h-full bg-[#E53935] rounded-full transition-all duration-300"
              style={{ width: `${progress.completionPercentage}%` }}
            />
          </div>

          {/* Step Pills for Fast Exercise Inspection */}
          <div className="flex items-center gap-1.5 overflow-x-auto pt-3 pb-1 no-scrollbar">
            {session.exercises.map((ex, idx) => {
              const isCurrent = idx === session.currentExerciseIndex;
              const doneSets = ex.sets.filter(
                (s) => s.status === 'completed'
              ).length;
              const isAllDone = doneSets === ex.sets.length;

              return (
                <button
                  key={`${ex.exerciseId}-${idx}`}
                  type="button"
                  onClick={() => handleGoToExercise(idx)}
                  className={`px-2.5 py-1.5 rounded-[7px] text-[11px] font-bold whitespace-nowrap border transition-all flex items-center gap-1.5 ${
                    isCurrent
                      ? 'bg-[#E53935] text-white border-[#E53935] shadow-hf-xs'
                      : isAllDone
                      ? 'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]'
                      : 'bg-[#F8FAFC] text-[#4B5563] border-[#E5E7EB] hover:border-[#D1D5DB]'
                  }`}
                >
                  <span className="font-mono">
                    {idx + 1}. {ex.name}
                  </span>
                  <span className="font-mono text-[10px] opacity-85">
                    ({doneSets}/{ex.sets.length})
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          AUTOMATIC REST TIMER PANEL (Shown automatically when restTimer.isActive)
          ===================================================================== */}
      {session.restTimer.isActive && (
        <section
          role="region"
          aria-label="Recovery Rest Timer"
          className="bg-[#FEF2F2] rounded-[12px] border-2 border-[#E53935] p-5 sm:p-6 shadow-hf-sm"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            {/* Left 4 Cols: Circular SVG Rest Countdown */}
            <div className="lg:col-span-4 flex flex-col items-center text-center">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-white border border-[#FECACA] text-[#E53935] text-[11px] font-bold uppercase tracking-wider mb-3">
                <BellRing className="w-3.5 h-3.5" />
                {session.restTimer.isPaused
                  ? 'Rest Timer Paused'
                  : 'Recovery Rest Timer'}
              </span>

              <div className="relative w-40 h-40 flex items-center justify-center bg-white rounded-full border border-[#FECACA] shadow-hf-xs">
                <svg className="w-full h-full -rotate-90" viewBox="0 0 160 160">
                  <circle
                    cx="80"
                    cy="80"
                    r="68"
                    fill="none"
                    stroke="#FEE2E2"
                    strokeWidth="10"
                  />
                  <circle
                    cx="80"
                    cy="80"
                    r="68"
                    fill="none"
                    stroke="#E53935"
                    strokeWidth="10"
                    strokeLinecap="round"
                    strokeDasharray={2 * Math.PI * 68}
                    strokeDashoffset={
                      2 *
                      Math.PI *
                      68 *
                      (1 -
                        Math.min(
                          1,
                          session.restTimer.remainingSeconds /
                            Math.max(1, session.restTimer.totalDurationSeconds)
                        ))
                    }
                    className="transition-all duration-200"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[10px] font-bold uppercase tracking-widest text-[#6B7280]">
                    Rest Left
                  </span>
                  <span className="font-mono tabular-nums text-[36px] leading-none font-extrabold text-[#E53935] mt-0.5">
                    {formatSecondsToMMSS(session.restTimer.remainingSeconds)}
                  </span>
                </div>
              </div>
            </div>

            {/* Right 8 Cols: Rest Controls (-15s, +15s, Pause/Resume, Skip Rest) */}
            <div className="lg:col-span-8 space-y-4">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#C62828] block">
                  Set Logged • Catch Your Breath
                </span>
                <h3 className="text-[20px] font-extrabold text-[#111827] mt-0.5">
                  Up Next: {session.restTimer.nextUpLabel}
                </h3>
                <p className="text-[13px] font-medium text-[#4B5563]">
                  Default rest for this exercise is {currentExercise.restSeconds}{' '}
                  seconds. Adjust time or skip straight to your next set.
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handleAdjustRestSeconds(-15)}
                  className="h-11 px-4 rounded-[8px] bg-white hover:bg-[#F8FAFC] border border-[#D1D5DB] font-mono tabular-nums text-[14px] font-extrabold text-[#111827] transition-colors active:scale-95"
                >
                  -15s
                </button>

                <button
                  type="button"
                  onClick={() => handleAdjustRestSeconds(15)}
                  className="h-11 px-4 rounded-[8px] bg-white hover:bg-[#FEE2E2] border border-[#FECACA] font-mono tabular-nums text-[14px] font-extrabold text-[#E53935] transition-colors active:scale-95"
                >
                  +15s
                </button>

                <Button
                  variant="outline"
                  size="md"
                  onClick={handleTogglePauseRestTimer}
                  leftIcon={
                    session.restTimer.isPaused ? (
                      <Play className="w-4 h-4 fill-current" />
                    ) : (
                      <Pause className="w-4 h-4" />
                    )
                  }
                >
                  {session.restTimer.isPaused ? 'Resume Rest' : 'Pause Rest'}
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  onClick={handleSkipRestTimer}
                  rightIcon={<SkipForward className="w-4 h-4" />}
                >
                  Skip Rest
                </Button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* =====================================================================
          MAIN ACTIVE EXERCISE & SET TRACKING WORKSPACE
          ===================================================================== */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 6 Cols: Current Exercise Visual, Format Header & Instructions */}
        <div className="lg:col-span-6 bg-white rounded-[12px] border border-[#E5E7EB] overflow-hidden shadow-hf-xs">
          {/* Required Header Format:
              Exercise 1 of 6
              Barbell Squats
              Set 1 of 2
              10 repetitions
          */}
          <div className="p-5 sm:p-6 border-b border-[#F1F5F9] bg-[#F8FAFC]">
            <div className="flex items-center justify-between gap-2 mb-1.5">
              <span className="font-mono tabular-nums text-[12px] font-extrabold uppercase tracking-wider px-2.5 py-1 rounded-[5px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935]">
                Exercise {session.currentExerciseIndex + 1} of{' '}
                {session.exercises.length}
              </span>
              <span className="text-[12px] font-bold text-[#4B5563]">
                {currentExercise.equipment} • Rest {currentExercise.restSeconds}s
              </span>
            </div>

            <h2 className="text-[24px] sm:text-[28px] font-extrabold text-[#111827] tracking-tight">
              {currentExercise.name}
            </h2>

            <div className="flex flex-wrap items-center gap-2 mt-2">
              <span className="font-mono tabular-nums text-[14px] font-extrabold text-[#E53935]">
                Set {session.currentSetIndex + 1} of{' '}
                {currentExercise.sets.length}
              </span>
              <span className="text-[#D1D5DB]">•</span>
              <span className="font-mono tabular-nums text-[14px] font-bold text-[#111827]">
                {currentSet?.actualReps}{' '}
                {currentSet?.isTimedHold ? 'seconds' : 'repetitions'}
              </span>
              <span className="text-[#D1D5DB]">•</span>
              <span className="text-[13px] font-semibold text-[#4B5563]">
                Target: {currentExercise.targetMuscle}
              </span>
            </div>
          </div>

          {/* Large Exercise Illustration */}
          <div className="h-52 sm:h-60 w-full bg-[#F8FAFC] border-b border-[#F1F5F9] flex items-center justify-center">
            <ExerciseIllustration id={currentExercise.exerciseId} />
          </div>

          {/* Exercise Instructions & Breathing Cues */}
          <div className="p-5 sm:p-6 space-y-4">
            <div>
              <div className="flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#111827] mb-2">
                <ListChecks className="w-4 h-4 text-[#E53935]" />
                <span>Exercise Instructions</span>
              </div>
              <ol className="space-y-2">
                {currentExercise.stepByStepInstructions.map((inst, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-2.5 text-[13px] font-medium text-[#4B5563] leading-relaxed"
                  >
                    <span className="w-5 h-5 rounded-[5px] bg-[#FEF2F2] text-[#E53935] font-mono text-[11px] font-extrabold flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{inst}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div className="p-3.5 rounded-[10px] bg-[#FEF2F2]/60 border border-[#FECACA] flex items-start gap-2.5">
              <Wind className="w-4 h-4 text-[#E53935] shrink-0 mt-0.5" />
              <p className="text-[12px] font-medium text-[#111827] leading-snug">
                <strong className="text-[#E53935]">Breathing: </strong>
                {currentExercise.breathingInstructions}
              </p>
            </div>
          </div>
        </div>

        {/* Right 6 Cols: Set Tracking, Repetition Editor, Complete Set & Exercise Navigation */}
        <div className="lg:col-span-6 space-y-5">
          {/* Active Set Repetition Editor + Complete Set CTA Card */}
          <div className="bg-white rounded-[12px] border-2 border-[#E53935] p-5 sm:p-6 shadow-hf-sm space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#E53935] block">
                  Active Set Logger
                </span>
                <h3 className="text-[20px] font-extrabold text-[#111827]">
                  Set {session.currentSetIndex + 1} of{' '}
                  {currentExercise.sets.length}
                </h3>
              </div>

              <span className="font-mono tabular-nums text-[12px] font-bold px-2.5 py-1 rounded-[6px] bg-[#F8FAFC] border border-[#E5E7EB] text-[#111827]">
                {completedSetsInCurrentExercise} / {currentExercise.sets.length}{' '}
                Sets Completed
              </span>
            </div>

            {/* Interactive Repetition Counter */}
            {currentSet && (
              <div className="p-4 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB] flex items-center justify-between gap-4">
                <IconButton
                  label="Decrease repetitions"
                  variant="outline"
                  size="lg"
                  onClick={() =>
                    handleAdjustSetReps(session.currentSetIndex, -1)
                  }
                  icon={<Minus className="w-5 h-5" strokeWidth={2.5} />}
                />

                <div className="text-center">
                  <div className="font-mono tabular-nums text-[42px] leading-none font-extrabold text-[#111827]">
                    {currentSet.actualReps}
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-widest text-[#6B7280] mt-1 block">
                    {currentSet.isTimedHold
                      ? 'Seconds Hold (Target ' + currentSet.targetReps + 's)'
                      : 'Repetitions (Target ' + currentSet.targetReps + ')'}
                  </span>
                </div>

                <IconButton
                  label="Increase repetitions"
                  variant="outline"
                  size="lg"
                  onClick={() =>
                    handleAdjustSetReps(session.currentSetIndex, 1)
                  }
                  icon={<Plus className="w-5 h-5" strokeWidth={2.5} />}
                />
              </div>
            )}

            {/* Primary Complete Set & Skip Set Actions */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="sm:col-span-2">
                <Button
                  variant="primary"
                  size="lg"
                  fullWidth
                  disabled={currentSet?.status === 'completed'}
                  onClick={() => handleCompleteSet(session.currentSetIndex)}
                  leftIcon={<Check className="w-5 h-5" strokeWidth={2.75} />}
                >
                  {currentSet?.status === 'completed'
                    ? `Set ${session.currentSetIndex + 1} Completed`
                    : `Complete Set ${session.currentSetIndex + 1}`}
                </Button>
              </div>

              <Button
                variant="outline"
                size="lg"
                fullWidth
                disabled={currentSet?.status === 'completed'}
                onClick={() => handleSkipSet(session.currentSetIndex)}
              >
                Skip Set
              </Button>
            </div>
          </div>

          {/* All Sets List for Current Exercise */}
          <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-5 shadow-hf-xs space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="text-[15px] font-bold text-[#111827]">
                Set Completion Indicators
              </h4>
              <span className="text-[11px] font-medium text-[#6B7280]">
                Tap any set row to select it
              </span>
            </div>

            <div className="space-y-2">
              {currentExercise.sets.map((s, sIdx) => {
                const isSelected = sIdx === session.currentSetIndex;
                const isCompleted = s.status === 'completed';
                const isSkipped = s.status === 'skipped';

                return (
                  <div
                    key={s.setNumber}
                    onClick={() =>
                      setSession((prev) => ({ ...prev, currentSetIndex: sIdx }))
                    }
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) =>
                      e.key === 'Enter' &&
                      setSession((prev) => ({ ...prev, currentSetIndex: sIdx }))
                    }
                    className={`p-3.5 rounded-[10px] border transition-all flex items-center justify-between gap-3 cursor-pointer ${
                      isSelected
                        ? 'bg-[#FEF2F2] border-[#E53935] ring-1 ring-[#E53935]/20'
                        : isCompleted
                        ? 'bg-[#F0FDF4]/70 border-[#BBF7D0]'
                        : isSkipped
                        ? 'bg-[#F8FAFC] border-[#E5E7EB] opacity-70'
                        : 'bg-white border-[#E5E7EB] hover:border-[#D1D5DB]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-7 h-7 rounded-[6px] font-mono tabular-nums text-[12px] font-extrabold flex items-center justify-center ${
                          isCompleted
                            ? 'bg-[#16A34A] text-white'
                            : isSkipped
                            ? 'bg-[#9CA3AF] text-white'
                            : isSelected
                            ? 'bg-[#E53935] text-white'
                            : 'bg-[#F8FAFC] border border-[#D1D5DB] text-[#4B5563]'
                        }`}
                      >
                        {isCompleted ? (
                          <Check className="w-4 h-4" strokeWidth={2.75} />
                        ) : (
                          `S${s.setNumber}`
                        )}
                      </span>
                      <div>
                        <span className="text-[14px] font-bold text-[#111827] block">
                          Set {s.setNumber} of {currentExercise.sets.length}
                        </span>
                        <span className="text-[11px] font-medium text-[#6B7280]">
                          {isCompleted
                            ? 'Completed'
                            : isSkipped
                            ? 'Skipped (not counted as completed)'
                            : isSelected
                            ? 'Active Set'
                            : 'Pending'}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-mono tabular-nums text-[13px] font-extrabold text-[#111827] px-2.5 py-1 rounded-[6px] bg-white border border-[#E5E7EB]">
                        {s.actualReps} {s.isTimedHold ? 'SEC' : 'REPS'}
                      </span>

                      {!isCompleted && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleCompleteSet(sIdx);
                          }}
                          className="px-2.5 py-1 rounded-[6px] bg-[#E53935] hover:bg-[#D32F2F] text-white text-[11px] font-bold transition-colors"
                        >
                          Done
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Exercise Navigation Controls: Previous Exercise, Skip Exercise, Next Exercise */}
          <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-4 shadow-hf-xs flex flex-wrap items-center justify-between gap-2.5">
            <Button
              variant="outline"
              size="md"
              disabled={session.currentExerciseIndex === 0}
              onClick={() =>
                handleGoToExercise(session.currentExerciseIndex - 1)
              }
              leftIcon={<ChevronLeft className="w-4 h-4" />}
            >
              Previous Exercise
            </Button>

            <Button
              variant="ghost"
              size="md"
              onClick={handleSkipCurrentExercise}
              rightIcon={<SkipForward className="w-4 h-4" />}
            >
              Skip Exercise
            </Button>

            <Button
              variant="secondary"
              size="md"
              disabled={
                session.currentExerciseIndex >= session.exercises.length - 1
              }
              onClick={() =>
                handleGoToExercise(session.currentExerciseIndex + 1)
              }
              rightIcon={<ChevronRight className="w-4 h-4" />}
            >
              Next Exercise
            </Button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          MODAL 1: CONFIRM ENDING WORKOUT EARLY
          ===================================================================== */}
      {showEndEarlyModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px] flex items-center justify-center p-4">
          <ConfirmationDialog
            title="Finish Workout Early?"
            description={`You have completed ${progress.completedSetsCount} of ${progress.totalSets} sets (${progress.completionPercentage}%). Finishing now will save your completed sets and actual workout duration (${formatSecondsToMMSS(liveElapsedSeconds)}) to your history.`}
            confirmLabel="Finish & Save Workout"
            cancelLabel="Keep Training"
            onConfirm={finalizeWorkoutSession}
            onCancel={() => setShowEndEarlyModal(false)}
          />
        </div>
      )}

      {/* =====================================================================
          MODAL 2: CONFIRM RESETTING WORKOUT SESSION
          ===================================================================== */}
      {showResetModal && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px] flex items-center justify-center p-4">
          <ConfirmationDialog
            title="Reset Current Workout?"
            description="This will clear all completed sets and reset the workout timer for this session back to 00:00."
            confirmLabel="Reset Session"
            cancelLabel="Cancel"
            onConfirm={handleResetWorkout}
            onCancel={() => setShowResetModal(false)}
          />
        </div>
      )}
    </div>
  );
};
