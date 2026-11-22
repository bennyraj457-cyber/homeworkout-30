import { ExerciseId } from '../design-system/components/ExerciseVisuals';

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
    featuredExercises: [
      'push-ups',
      'dumbbell-floor-press',
      'wide-push-ups',
      'dumbbell-squeeze-press',
    ],
  },
  {
    slug: 'back',
    name: 'Back',
    subtitle: 'Barbell Deadlifts, Barbell Rows & Unilateral Dumbbell Rows',
    exerciseCount: 4,
    durationRange: '12–18 Min Block',
    equipmentSummary: 'Barbell & Dumbbells',
    featuredExercises: [
      'barbell-rows',
      'one-arm-dumbbell-rows',
      'dumbbell-reverse-fly',
      'barbell-deadlift',
    ],
  },
  {
    slug: 'shoulders',
    name: 'Shoulders',
    subtitle: 'Overhead Dumbbell Presses & Lateral Deltoid Raises',
    exerciseCount: 4,
    durationRange: '10–12 Min Block',
    equipmentSummary: 'Dumbbells & Barbell',
    featuredExercises: [
      'dumbbell-shoulder-press',
      'dumbbell-lateral-raises',
      'dumbbell-front-raises',
      'barbell-overhead-press',
    ],
  },
  {
    slug: 'arms',
    name: 'Arms',
    subtitle: 'Dumbbell Bicep Curls, Barbell Curls & Tricep Push Lockouts',
    exerciseCount: 4,
    durationRange: '8–12 Min Block',
    equipmentSummary: 'Dumbbells & Barbell',
    featuredExercises: [
      'dumbbell-bicep-curls',
      'barbell-curls',
      'close-grip-push-ups',
      'overhead-triceps-extension',
    ],
  },
  {
    slug: 'legs',
    name: 'Legs',
    subtitle: 'Barbell Back Squats, Romanian Deadlifts & Forward Lunges',
    exerciseCount: 4,
    durationRange: '15–20 Min Block',
    equipmentSummary: 'Barbell, Dumbbells & Bodyweight',
    featuredExercises: [
      'barbell-squats',
      'dumbbell-lunges',
      'dumbbell-romanian-deadlift',
      'calf-raises',
    ],
  },
  {
    slug: 'core',
    name: 'Core',
    subtitle: 'Isometric Plank Holds, Supine Leg Raises & Mountain Climbers',
    exerciseCount: 4,
    durationRange: '8–10 Min Block',
    equipmentSummary: 'Core & Floor Mat',
    featuredExercises: [
      'plank',
      'leg-raises',
      'bicycle-crunches',
      'mountain-climbers',
    ],
  },
];
