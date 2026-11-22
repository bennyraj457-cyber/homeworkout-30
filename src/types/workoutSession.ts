import { ExerciseId } from '../design-system/components/ExerciseVisuals';
import { WorkoutDifficulty, WorkoutPrimaryCategory } from '../data/workoutLibraryData';

export type SetStatus = 'pending' | 'completed' | 'skipped';

export interface SetSession {
  setNumber: number;
  targetReps: number;
  actualReps: number;
  repsLabel: string; // e.g., "10 Reps" or "60s Hold"
  isTimedHold: boolean;
  recommendedLoad: string;
  status: SetStatus;
  completedAt: string | null;
}

export type ExerciseSessionStatus = 'pending' | 'in_progress' | 'completed' | 'skipped';

export interface ExerciseSession {
  stepOrder: number;
  exerciseId: ExerciseId;
  name: string;
  targetMuscle: string;
  equipment: string;
  recommendedLoad: string;
  restSeconds: number;
  estimatedMinutes: number;
  coachingNote: string;
  startingPosition: string;
  stepByStepInstructions: string[];
  breathingInstructions: string;
  sets: SetSession[];
  status: ExerciseSessionStatus;
}

export interface WorkoutProgress {
  totalExercises: number;
  completedExercisesCount: number;
  skippedExercisesCount: number;
  totalSets: number;
  completedSetsCount: number;
  skippedSetsCount: number;
  totalCompletedReps: number;
  completionPercentage: number;
}

export interface RestTimerState {
  isActive: boolean;
  isPaused: boolean;
  totalDurationSeconds: number;
  remainingSeconds: number;
  targetEndTimeMs: number | null;
  justFinishedAlert: boolean;
  nextUpLabel: string;
}

export type WorkoutSessionStage = 'overview' | 'active' | 'completed';

export interface WorkoutSession {
  sessionId: string;
  planId: string;
  workoutName: string;
  category: WorkoutPrimaryCategory;
  difficulty: WorkoutDifficulty;
  estimatedDurationMinutes: number;
  targetMuscleGroups: string[];
  equipmentNeeded: string[];
  estimatedRestBetweenSets: string;
  stage: WorkoutSessionStage;
  isPaused: boolean;
  startedAt: string | null;
  finishedAt: string | null;
  /**
   * Accurate elapsed time tracking across pauses and page reloads:
   * - accumulatedElapsedSeconds holds seconds accrued prior to current active run
   * - lastResumedAtMs holds timestamp when current active run started (or null if paused)
   */
  accumulatedElapsedSeconds: number;
  lastResumedAtMs: number | null;
  currentExerciseIndex: number;
  currentSetIndex: number;
  exercises: ExerciseSession[];
  restTimer: RestTimerState;
}

export interface CompletedExerciseHistoryDetail {
  stepOrder: number;
  exerciseId: ExerciseId;
  name: string;
  targetMuscle: string;
  equipment: string;
  recommendedLoad: string;
  status: ExerciseSessionStatus;
  sets: SetSession[];
}

export interface CompletedWorkoutHistoryEntry {
  sessionId: string;
  planId: string;
  workoutName: string;
  category: WorkoutPrimaryCategory;
  difficulty: WorkoutDifficulty;
  startedAt: string;
  finishedAt: string;
  actualDurationSeconds: number;
  estimatedDurationMinutes: number;
  totalExercises: number;
  completedExercises: number;
  skippedExercises: number;
  totalSets: number;
  completedSets: number;
  skippedSets: number;
  totalRepetitions: number;
  completionPercentage: number;
  exercises?: CompletedExerciseHistoryDetail[];
}

export interface PersonalGoalsPreferences {
  weeklyWorkoutDaysGoal: number;      // Default: 5 days
  weeklyWorkoutMinutesGoal: number;   // Default: 150 minutes
  dailyReminderEnabled: boolean;      // Preparation for notifications
  dailyReminderTime: string;          // e.g. "07:30"
  preferredWeightUnit?: 'KG' | 'LB';  // Default: 'KG'
  defaultBarbellWeight?: number;      // Default: 50
  defaultDumbbellWeight?: number;     // Default: 15
  autoStartRestTimer?: boolean;       // Default: true
  restAudioChimeEnabled?: boolean;    // Default: true
}
