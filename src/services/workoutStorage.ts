import {
  WorkoutSession,
  ExerciseSession,
  SetSession,
  WorkoutProgress,
  CompletedWorkoutHistoryEntry,
  CompletedExerciseHistoryDetail,
  PersonalGoalsPreferences,
} from '../types/workoutSession';
import {
  WORKOUT_PLANS_DATA,
  WorkoutPlan,
  getTodaysScheduledPlan,
} from '../data/workoutLibraryData';
import { EXERCISE_LIBRARY_DATA } from '../data/exerciseLibraryData';
import { ExerciseId } from '../design-system/components/ExerciseVisuals';

export const STORAGE_KEYS = {
  ACTIVE_SESSION: 'homefit30_active_workout_session_v1',
  WORKOUT_HISTORY: 'homefit30_completed_workout_history_v1',
  PERSONAL_GOALS: 'homefit30_personal_goals_v1',
};

export const DEFAULT_PERSONAL_GOALS: PersonalGoalsPreferences = {
  weeklyWorkoutDaysGoal: 6,
  weeklyWorkoutMinutesGoal: 170,
  dailyReminderEnabled: true,
  dailyReminderTime: '07:30',
  preferredWeightUnit: 'KG',
  defaultBarbellWeight: 50,
  defaultDumbbellWeight: 15,
  autoStartRestTimer: true,
  restAudioChimeEnabled: true,
};

/**
 * Helper to parse numeric target reps or seconds from strings like "10 Reps", "12 Reps / Side", "45s Hold"
 */
export function parseRepsFromLabel(repsOrDuration: string): {
  numericValue: number;
  isTimedHold: boolean;
} {
  const lower = repsOrDuration.toLowerCase();
  const isTimedHold =
    lower.includes('hold') ||
    lower.includes('sprint') ||
    lower.includes('tempo') ||
    /\d+s\b/.test(lower);

  const match = repsOrDuration.match(/(\d+)/);
  const numericValue = match ? parseInt(match[1], 10) : 10;

  return { numericValue, isTimedHold };
}

/**
 * Resolve detailed instructions from the 24-Exercise Library for any exercise ID
 */
function findExerciseLibraryEntry(exerciseId: ExerciseId, name: string) {
  const idMap: Record<string, string> = {
    'barbell-squat': 'barbell-squats',
    'barbell-row': 'barbell-rows',
    'dumbbell-row': 'one-arm-dumbbell-rows',
    'dumbbell-bicep-curl': 'dumbbell-bicep-curls',
    'dumbbell-lateral-raise': 'dumbbell-lateral-raises',
    lunges: 'dumbbell-lunges',
  };
  const lookupId = idMap[exerciseId] || exerciseId;
  return (
    EXERCISE_LIBRARY_DATA.find((e) => e.id === lookupId) ||
    EXERCISE_LIBRARY_DATA.find(
      (e) => e.name.toLowerCase() === name.toLowerCase()
    )
  );
}

/**
 * Build a fresh WorkoutSession from a WorkoutPlan
 */
export function createWorkoutSessionFromPlan(
  planId?: string | null,
  singleExerciseId?: string | null
): WorkoutSession {
  if (singleExerciseId) {
    const libEx = EXERCISE_LIBRARY_DATA.find((e) => e.id === singleExerciseId);
    if (libEx) {
      const { numericValue, isTimedHold } = parseRepsFromLabel(
        libEx.suggestedSetsAndReps.split('×')[1] || '12 Reps'
      );
      const sets: SetSession[] = Array.from({ length: 3 }).map((_, idx) => ({
        setNumber: idx + 1,
        targetReps: numericValue,
        actualReps: numericValue,
        repsLabel: libEx.suggestedSetsAndReps.split('×')[1]?.trim() || '12 Reps',
        isTimedHold,
        recommendedLoad: libEx.equipmentRequired,
        status: 'pending',
        completedAt: null,
      }));

      const exSession: ExerciseSession = {
        stepOrder: 1,
        exerciseId: libEx.id,
        name: libEx.name,
        targetMuscle: libEx.targetMuscleGroup,
        equipment: libEx.equipmentRequired,
        recommendedLoad: libEx.equipmentRequired,
        restSeconds: 60,
        estimatedMinutes: 8,
        coachingNote: libEx.correctMovementTechnique,
        startingPosition: libEx.startingPosition,
        stepByStepInstructions: libEx.stepByStepInstructions,
        breathingInstructions: libEx.breathingInstructions,
        sets,
        status: 'in_progress',
      };

      return {
        sessionId: `hf30-session-${Date.now()}`,
        planId: `single-${libEx.id}`,
        workoutName: `${libEx.name} Technique Session`,
        category: 'Full Body',
        difficulty: libEx.difficulty,
        estimatedDurationMinutes: 10,
        targetMuscleGroups: libEx.primaryMuscles,
        equipmentNeeded: [libEx.equipmentRequired],
        estimatedRestBetweenSets: '60s between sets',
        stage: 'overview',
        isPaused: false,
        startedAt: null,
        finishedAt: null,
        accumulatedElapsedSeconds: 0,
        lastResumedAtMs: null,
        currentExerciseIndex: 0,
        currentSetIndex: 0,
        exercises: [exSession],
        restTimer: {
          isActive: false,
          isPaused: false,
          totalDurationSeconds: 60,
          remainingSeconds: 60,
          targetEndTimeMs: null,
          justFinishedAlert: false,
          nextUpLabel: '',
        },
      };
    }
  }

  const plan: WorkoutPlan =
    WORKOUT_PLANS_DATA.find((p) => p.id === planId) ||
    getTodaysScheduledPlan().workoutPlan;

  const exercises: ExerciseSession[] = plan.exercises.map((step, exIdx) => {
    const libEntry = findExerciseLibraryEntry(step.exerciseId, step.name);
    const { numericValue, isTimedHold } = parseRepsFromLabel(step.repsOrDuration);

    const sets: SetSession[] = Array.from({ length: step.sets }).map(
      (_, setIdx) => ({
        setNumber: setIdx + 1,
        targetReps: numericValue,
        actualReps: numericValue,
        repsLabel: step.repsOrDuration,
        isTimedHold,
        recommendedLoad: step.recommendedLoad,
        status: 'pending',
        completedAt: null,
      })
    );

    return {
      stepOrder: step.stepOrder,
      exerciseId: step.exerciseId,
      name: step.name,
      targetMuscle: step.targetMuscle,
      equipment: step.equipment,
      recommendedLoad: step.recommendedLoad,
      restSeconds: step.restSeconds || 60,
      estimatedMinutes: step.estimatedMinutes,
      coachingNote: step.coachingNote,
      startingPosition:
        libEntry?.startingPosition ||
        'Stand or position yourself with a neutral spine, braced core, and stable footing.',
      stepByStepInstructions: libEntry?.stepByStepInstructions || [
        step.coachingNote,
        'Perform each repetition with a controlled 2-second lowering phase and crisp concentric drive.',
        'Maintain steady breathing and full core stability throughout the set.',
      ],
      breathingInstructions:
        libEntry?.breathingInstructions ||
        'Inhale during the eccentric lowering phase; exhale forcefully during the concentric effort.',
      sets,
      status: exIdx === 0 ? 'in_progress' : 'pending',
    };
  });

  return {
    sessionId: `hf30-session-${Date.now()}`,
    planId: plan.id,
    workoutName: plan.name,
    category: plan.primaryCategory,
    difficulty: plan.difficulty,
    estimatedDurationMinutes: plan.durationMinutes,
    targetMuscleGroups: plan.targetMuscleGroups,
    equipmentNeeded: plan.equipmentNeeded,
    estimatedRestBetweenSets: plan.estimatedRestBetweenSets,
    stage: 'overview',
    isPaused: false,
    startedAt: null,
    finishedAt: null,
    accumulatedElapsedSeconds: 0,
    lastResumedAtMs: null,
    currentExerciseIndex: 0,
    currentSetIndex: 0,
    exercises,
    restTimer: {
      isActive: false,
      isPaused: false,
      totalDurationSeconds: exercises[0]?.restSeconds || 60,
      remainingSeconds: exercises[0]?.restSeconds || 60,
      targetEndTimeMs: null,
      justFinishedAlert: false,
      nextUpLabel: '',
    },
  };
}

/**
 * Compute live WorkoutProgress metrics from a WorkoutSession.
 * Note: Skipped sets are NEVER counted as completed sets.
 */
export function calculateWorkoutProgress(
  session: WorkoutSession
): WorkoutProgress {
  let totalSets = 0;
  let completedSetsCount = 0;
  let skippedSetsCount = 0;
  let totalCompletedReps = 0;
  let completedExercisesCount = 0;
  let skippedExercisesCount = 0;

  session.exercises.forEach((ex) => {
    let exCompletedSets = 0;
    let exSkippedSets = 0;

    ex.sets.forEach((s) => {
      totalSets += 1;
      if (s.status === 'completed') {
        completedSetsCount += 1;
        exCompletedSets += 1;
        totalCompletedReps += s.actualReps;
      } else if (s.status === 'skipped') {
        skippedSetsCount += 1;
        exSkippedSets += 1;
      }
    });

    if (exCompletedSets > 0 && exCompletedSets + exSkippedSets === ex.sets.length) {
      completedExercisesCount += 1;
    } else if (ex.status === 'skipped' || exSkippedSets === ex.sets.length) {
      skippedExercisesCount += 1;
    }
  });

  const completionPercentage =
    totalSets > 0 ? Math.round((completedSetsCount / totalSets) * 100) : 0;

  return {
    totalExercises: session.exercises.length,
    completedExercisesCount,
    skippedExercisesCount,
    totalSets,
    completedSetsCount,
    skippedSetsCount,
    totalCompletedReps,
    completionPercentage,
  };
}

/**
 * Compute exact total elapsed workout seconds without drift across re-renders or page refreshes
 */
export function getLiveElapsedSeconds(
  session: WorkoutSession,
  nowMs: number = Date.now()
): number {
  if (session.stage === 'overview') return 0;
  if (session.isPaused || session.stage === 'completed' || !session.lastResumedAtMs) {
    return Math.max(0, Math.floor(session.accumulatedElapsedSeconds));
  }
  const activeRunSeconds = Math.max(
    0,
    (nowMs - session.lastResumedAtMs) / 1000
  );
  return Math.max(
    0,
    Math.floor(session.accumulatedElapsedSeconds + activeRunSeconds)
  );
}

/**
 * Format seconds into MM:SS
 */
export function formatSecondsToMMSS(totalSeconds: number): string {
  const safe = Math.max(0, Math.floor(totalSeconds));
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

/**
 * Format Date to local YYYY-MM-DD key
 */
export function toLocalDateKey(dateInput: Date | string): string {
  const d = typeof dateInput === 'string' ? new Date(dateInput) : dateInput;
  if (Number.isNaN(d.getTime())) return '';
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Load active session from localStorage safely
 */
export function loadActiveWorkoutSession(): WorkoutSession | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.ACTIVE_SESSION);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as WorkoutSession;
    if (!parsed || !parsed.sessionId || !Array.isArray(parsed.exercises)) {
      return null;
    }
    return parsed;
  } catch {
    return null;
  }
}

/**
 * Save active session to localStorage
 */
export function saveActiveWorkoutSession(session: WorkoutSession | null): void {
  try {
    if (!session) {
      localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
      return;
    }
    localStorage.setItem(STORAGE_KEYS.ACTIVE_SESSION, JSON.stringify(session));
  } catch {
    // Ignore storage quota errors in private mode
  }
}

/**
 * Clear active session from localStorage
 */
export function clearActiveWorkoutSession(): void {
  try {
    localStorage.removeItem(STORAGE_KEYS.ACTIVE_SESSION);
  } catch {
    // Ignore
  }
}

/**
 * Reconstruct exercise-by-exercise details if a legacy history entry lacks `exercises`
 */
export function getExerciseDetailsForHistoryEntry(
  entry: CompletedWorkoutHistoryEntry
): CompletedExerciseHistoryDetail[] {
  if (Array.isArray(entry.exercises) && entry.exercises.length > 0) {
    return entry.exercises;
  }

  // Fallback reconstruction from planId for older saved entries
  const plan =
    WORKOUT_PLANS_DATA.find((p) => p.id === entry.planId) ||
    WORKOUT_PLANS_DATA[0];

  let remainingCompletedSets = entry.completedSets;
  let remainingSkippedSets = entry.skippedSets;

  return plan.exercises.map((step) => {
    const { numericValue, isTimedHold } = parseRepsFromLabel(step.repsOrDuration);
    const sets: SetSession[] = Array.from({ length: step.sets }).map(
      (_, sIdx) => {
        let status: 'completed' | 'skipped' | 'pending' = 'pending';
        if (remainingCompletedSets > 0) {
          status = 'completed';
          remainingCompletedSets -= 1;
        } else if (remainingSkippedSets > 0) {
          status = 'skipped';
          remainingSkippedSets -= 1;
        }
        return {
          setNumber: sIdx + 1,
          targetReps: numericValue,
          actualReps: numericValue,
          repsLabel: step.repsOrDuration,
          isTimedHold,
          recommendedLoad: step.recommendedLoad,
          status,
          completedAt: status === 'completed' ? entry.finishedAt : null,
        };
      }
    );

    const anyCompleted = sets.some((s) => s.status === 'completed');
    return {
      stepOrder: step.stepOrder,
      exerciseId: step.exerciseId,
      name: step.name,
      targetMuscle: step.targetMuscle,
      equipment: step.equipment,
      recommendedLoad: step.recommendedLoad,
      status: anyCompleted ? 'completed' : 'skipped',
      sets,
    };
  });
}

/**
 * Load completed workout history from localStorage safely (handles missing or corrupted records)
 */
export function loadCompletedWorkoutHistory(): CompletedWorkoutHistoryEntry[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.WORKOUT_HISTORY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];

    const validEntries: CompletedWorkoutHistoryEntry[] = parsed
      .filter(
        (item): item is CompletedWorkoutHistoryEntry =>
          Boolean(
            item &&
              typeof item === 'object' &&
              typeof item.sessionId === 'string' &&
              typeof item.workoutName === 'string' &&
              typeof item.finishedAt === 'string' &&
              !Number.isNaN(new Date(item.finishedAt).getTime())
          )
      )
      .map((item) => ({
        sessionId: item.sessionId,
        planId: item.planId || 'full-body-workout-a',
        workoutName: item.workoutName,
        category: item.category || 'Full Body',
        difficulty: item.difficulty || 'Beginner',
        startedAt: item.startedAt || item.finishedAt,
        finishedAt: item.finishedAt,
        actualDurationSeconds: Math.max(0, Number(item.actualDurationSeconds) || 0),
        estimatedDurationMinutes: Math.max(
          1,
          Number(item.estimatedDurationMinutes) || 30
        ),
        totalExercises: Math.max(0, Number(item.totalExercises) || 0),
        completedExercises: Math.max(0, Number(item.completedExercises) || 0),
        skippedExercises: Math.max(0, Number(item.skippedExercises) || 0),
        totalSets: Math.max(0, Number(item.totalSets) || 0),
        completedSets: Math.max(0, Number(item.completedSets) || 0),
        skippedSets: Math.max(0, Number(item.skippedSets) || 0),
        totalRepetitions: Math.max(0, Number(item.totalRepetitions) || 0),
        completionPercentage: Math.min(
          100,
          Math.max(0, Number(item.completionPercentage) || 0)
        ),
        exercises: Array.isArray(item.exercises) ? item.exercises : undefined,
      }));

    // Deduplicate by sessionId in case corrupted storage had duplicate entries
    const seenSessionIds = new Set<string>();
    const deduplicated = validEntries.filter((entry) => {
      if (seenSessionIds.has(entry.sessionId)) return false;
      seenSessionIds.add(entry.sessionId);
      return true;
    });

    // Sort newest to oldest by finishedAt timestamp
    return deduplicated.sort(
      (a, b) =>
        new Date(b.finishedAt).getTime() - new Date(a.finishedAt).getTime()
    );
  } catch {
    return [];
  }
}

/**
 * Append a finished WorkoutSession to localStorage history (idempotent by sessionId)
 */
export function saveCompletedWorkoutToHistory(
  session: WorkoutSession
): CompletedWorkoutHistoryEntry {
  const progress = calculateWorkoutProgress(session);
  const actualDurationSeconds = Math.max(1, getLiveElapsedSeconds(session));

  const exercisesSnapshot: CompletedExerciseHistoryDetail[] =
    session.exercises.map((ex) => ({
      stepOrder: ex.stepOrder,
      exerciseId: ex.exerciseId,
      name: ex.name,
      targetMuscle: ex.targetMuscle,
      equipment: ex.equipment,
      recommendedLoad: ex.recommendedLoad,
      status: ex.status,
      sets: ex.sets.map((s) => ({ ...s })),
    }));

  const entry: CompletedWorkoutHistoryEntry = {
    sessionId: session.sessionId,
    planId: session.planId,
    workoutName: session.workoutName,
    category: session.category,
    difficulty: session.difficulty,
    startedAt: session.startedAt || new Date().toISOString(),
    finishedAt: session.finishedAt || new Date().toISOString(),
    actualDurationSeconds,
    estimatedDurationMinutes: session.estimatedDurationMinutes,
    totalExercises: progress.totalExercises,
    completedExercises: progress.completedExercisesCount,
    skippedExercises: progress.skippedExercisesCount,
    totalSets: progress.totalSets,
    completedSets: progress.completedSetsCount,
    skippedSets: progress.skippedSetsCount,
    totalRepetitions: progress.totalCompletedReps,
    completionPercentage: progress.completionPercentage,
    exercises: exercisesSnapshot,
  };

  try {
    const existing = loadCompletedWorkoutHistory();
    const filtered = existing.filter((item) => item.sessionId !== entry.sessionId);
    const updated = [entry, ...filtered];
    localStorage.setItem(STORAGE_KEYS.WORKOUT_HISTORY, JSON.stringify(updated));
  } catch {
    // Ignore storage errors
  }

  return entry;
}

/* ==========================================================================
   PERSONAL GOALS & PREFERENCES PERSISTENCE
   ========================================================================== */
export function loadPersonalGoals(): PersonalGoalsPreferences {
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PERSONAL_GOALS);
    if (!raw) return DEFAULT_PERSONAL_GOALS;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== 'object') return DEFAULT_PERSONAL_GOALS;

    const days = Math.min(
      7,
      Math.max(1, Number(parsed.weeklyWorkoutDaysGoal) || 5)
    );
    const mins = Math.min(
      1000,
      Math.max(15, Number(parsed.weeklyWorkoutMinutesGoal) || 150)
    );
    const reminderEnabled =
      typeof parsed.dailyReminderEnabled === 'boolean'
        ? parsed.dailyReminderEnabled
        : true;
    const reminderTime =
      typeof parsed.dailyReminderTime === 'string' &&
      /^\d{2}:\d{2}$/.test(parsed.dailyReminderTime)
        ? parsed.dailyReminderTime
        : '07:30';

    const preferredWeightUnit =
      parsed.preferredWeightUnit === 'LB' ? 'LB' : 'KG';
    const defaultBarbellWeight = Math.min(
      500,
      Math.max(0, Number(parsed.defaultBarbellWeight) || 50)
    );
    const defaultDumbbellWeight = Math.min(
      200,
      Math.max(0, Number(parsed.defaultDumbbellWeight) || 15)
    );
    const autoStartRestTimer =
      typeof parsed.autoStartRestTimer === 'boolean'
        ? parsed.autoStartRestTimer
        : true;
    const restAudioChimeEnabled =
      typeof parsed.restAudioChimeEnabled === 'boolean'
        ? parsed.restAudioChimeEnabled
        : true;

    return {
      weeklyWorkoutDaysGoal: days,
      weeklyWorkoutMinutesGoal: mins,
      dailyReminderEnabled: reminderEnabled,
      dailyReminderTime: reminderTime,
      preferredWeightUnit,
      defaultBarbellWeight,
      defaultDumbbellWeight,
      autoStartRestTimer,
      restAudioChimeEnabled,
    };
  } catch {
    return DEFAULT_PERSONAL_GOALS;
  }
}

export function savePersonalGoals(goals: PersonalGoalsPreferences): void {
  try {
    localStorage.setItem(STORAGE_KEYS.PERSONAL_GOALS, JSON.stringify(goals));
  } catch {
    // Ignore
  }
}

/* ==========================================================================
   PROGRESS ANALYTICS & STREAK CALCULATIONS (100% Actual Local Records)
   ========================================================================== */
export interface OverallProgressStatistics {
  totalWorkoutsCompleted: number;
  totalWorkoutMinutes: number;
  totalWorkoutSeconds: number;
  totalExercisesCompleted: number;
  totalSetsCompleted: number;
  totalRepetitionsCompleted: number;
  currentStreakDays: number;
  longestStreakDays: number;
  averageWorkoutDurationMinutes: number;
  averageWorkoutDurationSeconds: number;
}

/**
 * Calculate Current Streak & Longest Streak (in consecutive calendar days)
 * from actual completed workout dates.
 */
export function calculateWorkoutStreaks(
  history: CompletedWorkoutHistoryEntry[]
): { currentStreakDays: number; longestStreakDays: number } {
  if (history.length === 0) {
    return { currentStreakDays: 0, longestStreakDays: 0 };
  }

  // Unique local calendar date keys sorted ascending (YYYY-MM-DD)
  const uniqueDates = Array.from(
    new Set(
      history
        .map((h) => toLocalDateKey(h.finishedAt))
        .filter((k) => k.length === 10)
    )
  ).sort();

  if (uniqueDates.length === 0) {
    return { currentStreakDays: 0, longestStreakDays: 0 };
  }

  const parseDateKeyToMidnightMs = (key: string): number => {
    const [y, m, d] = key.split('-').map(Number);
    return new Date(y, m - 1, d).getTime();
  };

  const ONE_DAY_MS = 24 * 60 * 60 * 1000;

  // 1. Longest streak calculation
  let longest = 1;
  let running = 1;
  for (let i = 1; i < uniqueDates.length; i++) {
    const prevMs = parseDateKeyToMidnightMs(uniqueDates[i - 1]);
    const currMs = parseDateKeyToMidnightMs(uniqueDates[i]);
    const diffDays = Math.round((currMs - prevMs) / ONE_DAY_MS);

    if (diffDays === 1) {
      running += 1;
      if (running > longest) longest = running;
    } else if (diffDays > 1) {
      running = 1;
    }
  }

  // 2. Current streak calculation (anchored to Today or Yesterday)
  const todayKey = toLocalDateKey(new Date());
  const todayMs = parseDateKeyToMidnightMs(todayKey);
  const lastWorkoutKey = uniqueDates[uniqueDates.length - 1];
  const lastWorkoutMs = parseDateKeyToMidnightMs(lastWorkoutKey);
  const daysSinceLastWorkout = Math.round((todayMs - lastWorkoutMs) / ONE_DAY_MS);

  // If the most recent workout was Today (0) or Yesterday (1) or even a future test date (<= 1), count backwards
  let currentStreak = 0;
  if (daysSinceLastWorkout <= 1) {
    currentStreak = 1;
    for (let i = uniqueDates.length - 1; i > 0; i--) {
      const currMs = parseDateKeyToMidnightMs(uniqueDates[i]);
      const prevMs = parseDateKeyToMidnightMs(uniqueDates[i - 1]);
      const diffDays = Math.round((currMs - prevMs) / ONE_DAY_MS);
      if (diffDays === 1) {
        currentStreak += 1;
      } else {
        break;
      }
    }
  }

  return {
    currentStreakDays: currentStreak,
    longestStreakDays: Math.max(longest, currentStreak),
  };
}

/**
 * Compute all 6 required Progress Dashboard statistics from actual saved workout data
 */
export function calculateOverallProgressStatistics(
  history: CompletedWorkoutHistoryEntry[]
): OverallProgressStatistics {
  const totalWorkoutsCompleted = history.length;

  const totalWorkoutSeconds = history.reduce(
    (sum, item) => sum + item.actualDurationSeconds,
    0
  );
  // Convert actual seconds to total minutes (rounded to 1 decimal if < 1 min, or nearest integer)
  const totalWorkoutMinutes =
    totalWorkoutSeconds === 0
      ? 0
      : Math.max(1, Math.round(totalWorkoutSeconds / 60));

  const totalExercisesCompleted = history.reduce(
    (sum, item) => sum + item.completedExercises,
    0
  );

  const totalSetsCompleted = history.reduce(
    (sum, item) => sum + item.completedSets,
    0
  );

  const totalRepetitionsCompleted = history.reduce(
    (sum, item) => sum + item.totalRepetitions,
    0
  );

  const averageWorkoutDurationSeconds =
    totalWorkoutsCompleted > 0
      ? Math.round(totalWorkoutSeconds / totalWorkoutsCompleted)
      : 0;

  const averageWorkoutDurationMinutes =
    totalWorkoutsCompleted > 0
      ? Math.max(1, Math.round(averageWorkoutDurationSeconds / 60))
      : 0;

  const { currentStreakDays, longestStreakDays } =
    calculateWorkoutStreaks(history);

  return {
    totalWorkoutsCompleted,
    totalWorkoutMinutes,
    totalWorkoutSeconds,
    totalExercisesCompleted,
    totalSetsCompleted,
    totalRepetitionsCompleted,
    currentStreakDays,
    longestStreakDays,
    averageWorkoutDurationMinutes,
    averageWorkoutDurationSeconds,
  };
}

/* ==========================================================================
   WEEKLY ACTIVITY AGGREGATION (Monday to Sunday with Week Offset Navigation)
   ========================================================================== */
export interface WeeklyDayBucket {
  dateKey: string;
  dayShort: string; // MON..SUN
  dayFull: string;
  dateNumber: number;
  monthShort: string;
  isToday: boolean;
  workoutsCount: number;
  totalMinutes: number;
  totalSeconds: number;
}

export interface WeeklyActivityReport {
  weekRangeLabel: string;
  days: WeeklyDayBucket[];
  totalWorkoutsInWeek: number;
  activeDaysInWeek: number;
  totalMinutesInWeek: number;
}

export function getMondayOfWeek(referenceDate: Date, weekOffset: number = 0): Date {
  const d = new Date(
    referenceDate.getFullYear(),
    referenceDate.getMonth(),
    referenceDate.getDate()
  );
  const dayOfWeek = d.getDay(); // 0 = Sun, 1 = Mon ... 6 = Sat
  const diffToMonday = dayOfWeek === 0 ? -6 : 1 - dayOfWeek;
  d.setDate(d.getDate() + diffToMonday + weekOffset * 7);
  return d;
}

export function calculateWeeklyActivity(
  history: CompletedWorkoutHistoryEntry[],
  weekOffset: number = 0
): WeeklyActivityReport {
  const monday = getMondayOfWeek(new Date(), weekOffset);
  const todayKey = toLocalDateKey(new Date());

  const dayNamesShort = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];
  const dayNamesFull = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday',
  ];

  const days: WeeklyDayBucket[] = Array.from({ length: 7 }).map((_, idx) => {
    const d = new Date(
      monday.getFullYear(),
      monday.getMonth(),
      monday.getDate() + idx
    );
    const dateKey = toLocalDateKey(d);
    const matching = history.filter(
      (h) => toLocalDateKey(h.finishedAt) === dateKey
    );

    const totalSeconds = matching.reduce(
      (sum, h) => sum + h.actualDurationSeconds,
      0
    );
    const totalMinutes =
      totalSeconds === 0 ? 0 : Math.max(1, Math.round(totalSeconds / 60));

    return {
      dateKey,
      dayShort: dayNamesShort[idx],
      dayFull: dayNamesFull[idx],
      dateNumber: d.getDate(),
      monthShort: d.toLocaleDateString('en-US', { month: 'short' }),
      isToday: dateKey === todayKey,
      workoutsCount: matching.length,
      totalMinutes,
      totalSeconds,
    };
  });

  const sunday = new Date(
    monday.getFullYear(),
    monday.getMonth(),
    monday.getDate() + 6
  );

  const fmt = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
  });
  const weekRangeLabel = `${fmt.format(monday)} – ${fmt.format(
    sunday
  )}, ${sunday.getFullYear()}`;

  const totalWorkoutsInWeek = days.reduce((s, d) => s + d.workoutsCount, 0);
  const activeDaysInWeek = days.filter((d) => d.workoutsCount > 0).length;
  const totalMinutesInWeek = days.reduce((s, d) => s + d.totalMinutes, 0);

  return {
    weekRangeLabel,
    days,
    totalWorkoutsInWeek,
    activeDaysInWeek,
    totalMinutesInWeek,
  };
}

/* ==========================================================================
   MONTHLY PROGRESS & CALENDAR AGGREGATION
   ========================================================================== */
export interface CalendarDayCell {
  dateKey: string;
  dayOfMonth: number;
  isCurrentMonth: boolean;
  isToday: boolean;
  workoutsCount: number;
  totalMinutes: number;
  sessions: CompletedWorkoutHistoryEntry[];
}

export interface MonthlyProgressReport {
  monthTitle: string;
  year: number;
  monthIndex: number;
  monthlyCompletedWorkouts: number;
  monthlyActiveDays: number;
  totalWorkoutMinutes: number;
  totalWorkoutSeconds: number;
  averageWorkoutsPerWeek: number;
  calendarCells: CalendarDayCell[];
}

export function calculateMonthlyProgress(
  history: CompletedWorkoutHistoryEntry[],
  year: number,
  monthIndex: number
): MonthlyProgressReport {
  const firstDayOfMonth = new Date(year, monthIndex, 1);
  const lastDayOfMonth = new Date(year, monthIndex + 1, 0);
  const daysInMonth = lastDayOfMonth.getDate();
  const todayKey = toLocalDateKey(new Date());

  const monthTitle = firstDayOfMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric',
  });

  // Filter history entries belonging to this year + monthIndex
  const monthEntries = history.filter((entry) => {
    const d = new Date(entry.finishedAt);
    return d.getFullYear() === year && d.getMonth() === monthIndex;
  });

  const monthlyCompletedWorkouts = monthEntries.length;
  const totalWorkoutSeconds = monthEntries.reduce(
    (s, h) => s + h.actualDurationSeconds,
    0
  );
  const totalWorkoutMinutes =
    totalWorkoutSeconds === 0
      ? 0
      : Math.max(1, Math.round(totalWorkoutSeconds / 60));

  const uniqueActiveDaysSet = new Set(
    monthEntries.map((h) => toLocalDateKey(h.finishedAt))
  );
  const monthlyActiveDays = uniqueActiveDaysSet.size;

  const weeksInMonth = daysInMonth / 7;
  const averageWorkoutsPerWeek =
    monthlyCompletedWorkouts > 0
      ? Number((monthlyCompletedWorkouts / weeksInMonth).toFixed(1))
      : 0;

  // Build Monday-first calendar grid (leading padding days + month days + trailing padding days)
  const firstDayWeekday = firstDayOfMonth.getDay(); // 0=Sun..6=Sat
  const leadingEmptyCount = firstDayWeekday === 0 ? 6 : firstDayWeekday - 1;

  const calendarCells: CalendarDayCell[] = [];

  // Leading days from previous month
  for (let i = leadingEmptyCount; i > 0; i--) {
    const d = new Date(year, monthIndex, 1 - i);
    const key = toLocalDateKey(d);
    const matching = history.filter((h) => toLocalDateKey(h.finishedAt) === key);
    const secs = matching.reduce((s, h) => s + h.actualDurationSeconds, 0);
    calendarCells.push({
      dateKey: key,
      dayOfMonth: d.getDate(),
      isCurrentMonth: false,
      isToday: key === todayKey,
      workoutsCount: matching.length,
      totalMinutes: secs === 0 ? 0 : Math.max(1, Math.round(secs / 60)),
      sessions: matching,
    });
  }

  // Current month days
  for (let day = 1; day <= daysInMonth; day++) {
    const d = new Date(year, monthIndex, day);
    const key = toLocalDateKey(d);
    const matching = monthEntries.filter(
      (h) => toLocalDateKey(h.finishedAt) === key
    );
    const secs = matching.reduce((s, h) => s + h.actualDurationSeconds, 0);
    calendarCells.push({
      dateKey: key,
      dayOfMonth: day,
      isCurrentMonth: true,
      isToday: key === todayKey,
      workoutsCount: matching.length,
      totalMinutes: secs === 0 ? 0 : Math.max(1, Math.round(secs / 60)),
      sessions: matching,
    });
  }

  // Trailing days to complete 7-column rows
  const remainder = calendarCells.length % 7;
  const trailingCount = remainder === 0 ? 0 : 7 - remainder;
  for (let i = 1; i <= trailingCount; i++) {
    const d = new Date(year, monthIndex + 1, i);
    const key = toLocalDateKey(d);
    const matching = history.filter((h) => toLocalDateKey(h.finishedAt) === key);
    const secs = matching.reduce((s, h) => s + h.actualDurationSeconds, 0);
    calendarCells.push({
      dateKey: key,
      dayOfMonth: d.getDate(),
      isCurrentMonth: false,
      isToday: key === todayKey,
      workoutsCount: matching.length,
      totalMinutes: secs === 0 ? 0 : Math.max(1, Math.round(secs / 60)),
      sessions: matching,
    });
  }

  return {
    monthTitle,
    year,
    monthIndex,
    monthlyCompletedWorkouts,
    monthlyActiveDays,
    totalWorkoutMinutes,
    totalWorkoutSeconds,
    averageWorkoutsPerWeek,
    calendarCells,
  };
}

/**
 * Play a short, clean Web Audio API chime when the Rest Timer finishes
 */
export function playRestFinishedAudioCue(): void {
  try {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;
    if (!AudioCtx) return;

    const ctx = new AudioCtx();
    const now = ctx.currentTime;

    [880, 1174.66].forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.16);
      gain.gain.setValueAtTime(0.15, now + idx * 0.16);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.16 + 0.14);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now + idx * 0.16);
      osc.stop(now + idx * 0.16 + 0.15);
    });
  } catch {
    // AudioContext blocked or unsupported
  }
}
