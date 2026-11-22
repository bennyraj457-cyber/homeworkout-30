import { ExerciseId } from '../design-system/components/ExerciseVisuals';

export interface TodaysWorkoutData {
  id: string;
  title: string;
  durationMinutes: number;
  workoutType: string;
  exerciseCount: number;
  completionPercent: number;
  completedExercises: number;
  equipment: string[];
  estimatedCalories: number;
  exercisesPreview: {
    id: ExerciseId;
    name: string;
    setsReps: string;
    load: string;
  }[];
}

export const TODAYS_WORKOUT_SAMPLE: TodaysWorkoutData = {
  id: 'full-body-strength-30',
  title: "Today's Full Body Workout",
  durationMinutes: 30,
  workoutType: 'Strength',
  exerciseCount: 6,
  completionPercent: 33,
  completedExercises: 2,
  equipment: ['Barbell', 'Dumbbells', 'Push-Ups', 'Core Floor'],
  estimatedCalories: 325,
  exercisesPreview: [
    { id: 'barbell-squat', name: 'Barbell Squat', setsReps: '4 × 10', load: '60 KG' },
    { id: 'push-ups', name: 'Push-Ups', setsReps: '3 × 15', load: 'Bodyweight' },
    { id: 'barbell-row', name: 'Barbell Row', setsReps: '4 × 10', load: '45 KG' },
    { id: 'dumbbell-shoulder-press', name: 'Dumbbell Shoulder Press', setsReps: '3 × 10', load: '16 KG' },
    { id: 'lunges', name: 'Lunges', setsReps: '3 × 12', load: 'Bodyweight' },
    { id: 'plank', name: 'Plank', setsReps: '3 × 60s', load: 'Core Hold' },
  ],
};

export interface WeeklyDayStatus {
  dayShort: string;
  dayFull: string;
  dateNumber: number;
  status: 'completed' | 'today' | 'rest' | 'upcoming';
  minutesCompleted: number;
}

export interface WeeklyActivitySummary {
  completedDays: number;
  targetDays: number;
  totalMinutesCompleted: number;
  targetMinutes: number;
  days: WeeklyDayStatus[];
}

export const WEEKLY_ACTIVITY_SAMPLE: WeeklyActivitySummary = {
  completedDays: 3,
  targetDays: 5,
  totalMinutesCompleted: 90,
  targetMinutes: 150,
  days: [
    { dayShort: 'MON', dayFull: 'Monday', dateNumber: 16, status: 'completed', minutesCompleted: 30 },
    { dayShort: 'TUE', dayFull: 'Tuesday', dateNumber: 17, status: 'completed', minutesCompleted: 30 },
    { dayShort: 'WED', dayFull: 'Wednesday', dateNumber: 18, status: 'rest', minutesCompleted: 0 },
    { dayShort: 'THU', dayFull: 'Thursday', dateNumber: 19, status: 'completed', minutesCompleted: 30 },
    { dayShort: 'FRI', dayFull: 'Friday', dateNumber: 20, status: 'rest', minutesCompleted: 0 },
    { dayShort: 'SAT', dayFull: 'Saturday', dateNumber: 21, status: 'upcoming', minutesCompleted: 0 },
    { dayShort: 'SUN', dayFull: 'Sunday', dateNumber: 22, status: 'today', minutesCompleted: 10 },
  ],
};

export interface QuickStatItem {
  id: string;
  label: string;
  value: string;
  unit: string;
  trend: string;
  accentRed?: boolean;
}

export const QUICK_STATS_SAMPLE: QuickStatItem[] = [
  {
    id: 'workouts-completed',
    label: 'Workouts Completed',
    value: '24',
    unit: 'Sessions',
    trend: '+3 this week (Demo)',
    accentRed: true,
  },
  {
    id: 'total-minutes',
    label: 'Total Workout Minutes',
    value: '720',
    unit: 'Mins',
    trend: '24 × 30m logged (Demo)',
    accentRed: false,
  },
  {
    id: 'current-streak',
    label: 'Current Workout Streak',
    value: '5',
    unit: 'Days',
    trend: 'Personal Best: 12d (Demo)',
    accentRed: true,
  },
];

export type MuscleCategorySlug =
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'arms'
  | 'legs'
  | 'core';

export interface MuscleCategoryItem {
  slug: MuscleCategorySlug;
  name: string;
  subtitle: string;
  exerciseCount: number;
  durationRange: string;
  equipmentSummary: string;
  featuredExercises: ExerciseId[];
}

export const EXERCISE_CATEGORIES_SAMPLE: MuscleCategoryItem[] = [
  {
    slug: 'chest',
    name: 'Chest',
    subtitle: 'Push-Ups, Tempo Floor Presses & Pectoral Strength',
    exerciseCount: 4,
    durationRange: '10–15 Min Block',
    equipmentSummary: 'Bodyweight & Dumbbells',
    featuredExercises: ['push-ups'],
  },
  {
    slug: 'back',
    name: 'Back',
    subtitle: 'Barbell Deadlifts, Barbell Rows & Unilateral Dumbbell Rows',
    exerciseCount: 5,
    durationRange: '12–18 Min Block',
    equipmentSummary: 'Barbell & Dumbbells',
    featuredExercises: ['barbell-deadlift', 'barbell-row', 'dumbbell-row'],
  },
  {
    slug: 'shoulders',
    name: 'Shoulders',
    subtitle: 'Overhead Dumbbell Presses & Lateral Deltoid Raises',
    exerciseCount: 4,
    durationRange: '10–12 Min Block',
    equipmentSummary: 'Dumbbells',
    featuredExercises: ['dumbbell-shoulder-press', 'dumbbell-lateral-raise'],
  },
  {
    slug: 'arms',
    name: 'Arms',
    subtitle: 'Dumbbell Bicep Curls, Forearm & Tricep Push Lockouts',
    exerciseCount: 4,
    durationRange: '8–12 Min Block',
    equipmentSummary: 'Dumbbells & Barbell',
    featuredExercises: ['dumbbell-bicep-curl', 'push-ups'],
  },
  {
    slug: 'legs',
    name: 'Legs',
    subtitle: 'Barbell Back Squats, Deadlifts & Dynamic Forward Lunges',
    exerciseCount: 6,
    durationRange: '15–20 Min Block',
    equipmentSummary: 'Barbell, Dumbbells & Bodyweight',
    featuredExercises: ['barbell-squat', 'barbell-deadlift', 'lunges'],
  },
  {
    slug: 'core',
    name: 'Core',
    subtitle: 'Isometric Plank Holds, Supine Leg Raises & Mountain Climbers',
    exerciseCount: 5,
    durationRange: '8–10 Min Block',
    equipmentSummary: 'Core & Floor Mat',
    featuredExercises: ['plank', 'leg-raises', 'mountain-climbers'],
  },
];

export interface RecentWorkoutItem {
  id: string;
  workoutName: string;
  focusTag: string;
  dateLabel: string;
  duration: string;
  setsCompleted: string;
  calories: number;
  status: 'Completed';
}

export const RECENT_ACTIVITY_SAMPLE: RecentWorkoutItem[] = [
  {
    id: 'rec-1',
    workoutName: 'Full-Body Barbell & Core Circuit',
    focusTag: 'Strength • Barbell & Floor',
    dateLabel: 'Thursday, Nov 19',
    duration: '30 min',
    setsCompleted: '18 / 18 Sets',
    calories: 342,
    status: 'Completed',
  },
  {
    id: 'rec-2',
    workoutName: 'Upper Body Dumbbell & Push-Up Power',
    focusTag: 'Hypertrophy • Dumbbells & Bodyweight',
    dateLabel: 'Tuesday, Nov 17',
    duration: '30 min',
    setsCompleted: '16 / 16 Sets',
    calories: 310,
    status: 'Completed',
  },
  {
    id: 'rec-3',
    workoutName: 'Lower Body Squat, Lunge & Plank Blast',
    focusTag: 'Strength • Legs & Core',
    dateLabel: 'Monday, Nov 16',
    duration: '30 min',
    setsCompleted: '18 / 18 Sets',
    calories: 355,
    status: 'Completed',
  },
];
