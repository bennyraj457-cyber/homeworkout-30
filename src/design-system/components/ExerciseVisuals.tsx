import React from 'react';
import { Clock, Dumbbell, Layers, Play, Flame } from 'lucide-react';
import { ExerciseLibraryId } from '../../data/exerciseLibraryData';

export type ExerciseId =
  | 'barbell-squat'
  | 'barbell-deadlift'
  | 'barbell-row'
  | 'dumbbell-row'
  | 'dumbbell-shoulder-press'
  | 'dumbbell-bicep-curl'
  | 'dumbbell-lateral-raise'
  | 'push-ups'
  | 'lunges'
  | 'plank'
  | 'leg-raises'
  | 'mountain-climbers'
  | ExerciseLibraryId;

export interface ExerciseItem {
  id: ExerciseId;
  name: string;
  equipment: 'Barbell' | 'Dumbbells' | 'Bodyweight' | 'Core & Floor';
  targetMuscle: string;
  secondaryMuscle: string;
  setsAndReps: string;
  duration: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  recommendedLoad: string;
  formCue: string;
}

export const HOMEFIT_EXERCISES: ExerciseItem[] = [
  {
    id: 'barbell-squat',
    name: 'Barbell Squat',
    equipment: 'Barbell',
    targetMuscle: 'Quadriceps & Glutes',
    secondaryMuscle: 'Core & Hamstrings',
    setsAndReps: '4 Sets × 10 Reps',
    duration: '5m 30s',
    difficulty: 'Intermediate',
    recommendedLoad: '50–70 KG',
    formCue: 'Chest up, knees tracking over toes, hip crease below parallel.',
  },
  {
    id: 'barbell-deadlift',
    name: 'Barbell Deadlift',
    equipment: 'Barbell',
    targetMuscle: 'Posterior Chain & Hamstrings',
    secondaryMuscle: 'Lower Back, Glutes & Traps',
    setsAndReps: '4 Sets × 8 Reps',
    duration: '6m 00s',
    difficulty: 'Advanced',
    recommendedLoad: '60–85 KG',
    formCue: 'Keep bar close to shins, neutral spine, drive hips forward at lockout.',
  },
  {
    id: 'barbell-row',
    name: 'Barbell Row',
    equipment: 'Barbell',
    targetMuscle: 'Latissimus Dorsi & Rhomboids',
    secondaryMuscle: 'Rear Delts & Biceps',
    setsAndReps: '4 Sets × 10 Reps',
    duration: '4m 45s',
    difficulty: 'Intermediate',
    recommendedLoad: '40–55 KG',
    formCue: 'Hinge torso to 45°, pull barbell toward lower sternum, squeeze shoulder blades.',
  },
  {
    id: 'dumbbell-row',
    name: 'Dumbbell Row',
    equipment: 'Dumbbells',
    targetMuscle: 'Unilateral Lats & Upper Back',
    secondaryMuscle: 'Biceps & Core Anti-Rotation',
    setsAndReps: '3 Sets × 12 Reps / Side',
    duration: '4m 15s',
    difficulty: 'Beginner',
    recommendedLoad: '16–24 KG',
    formCue: 'Drive elbow back toward hip pocket while keeping shoulders square.',
  },
  {
    id: 'dumbbell-shoulder-press',
    name: 'Dumbbell Shoulder Press',
    equipment: 'Dumbbells',
    targetMuscle: 'Anterior & Medial Deltoids',
    secondaryMuscle: 'Triceps & Upper Traps',
    setsAndReps: '3 Sets × 10 Reps',
    duration: '4m 00s',
    difficulty: 'Intermediate',
    recommendedLoad: '12–18 KG',
    formCue: 'Press vertically overhead without arching lower ribs; control eccentric descent.',
  },
  {
    id: 'dumbbell-bicep-curl',
    name: 'Dumbbell Bicep Curl',
    equipment: 'Dumbbells',
    targetMuscle: 'Biceps Brachii',
    secondaryMuscle: 'Brachialis & Forearms',
    setsAndReps: '3 Sets × 12 Reps',
    duration: '3m 30s',
    difficulty: 'Beginner',
    recommendedLoad: '10–15 KG',
    formCue: 'Pin elbows to ribs, supinate wrists at peak contraction, zero torso swing.',
  },
  {
    id: 'dumbbell-lateral-raise',
    name: 'Dumbbell Lateral Raise',
    equipment: 'Dumbbells',
    targetMuscle: 'Lateral Deltoid Heads',
    secondaryMuscle: 'Supraspinatus & Traps',
    setsAndReps: '3 Sets × 15 Reps',
    duration: '3m 30s',
    difficulty: 'Beginner',
    recommendedLoad: '6–10 KG',
    formCue: 'Lead with elbows slightly bent, raise to shoulder height with controlled pause.',
  },
  {
    id: 'push-ups',
    name: 'Push-Ups',
    equipment: 'Bodyweight',
    targetMuscle: 'Pectorals & Anterior Delts',
    secondaryMuscle: 'Triceps & Anterior Core',
    setsAndReps: '3 Sets × 15 Reps',
    duration: '3m 30s',
    difficulty: 'Beginner',
    recommendedLoad: 'Bodyweight',
    formCue: 'Elbows at 45° angle, rigid plank line from head to heels, full lockout.',
  },
  {
    id: 'lunges',
    name: 'Lunges',
    equipment: 'Bodyweight',
    targetMuscle: 'Quadriceps & Glute Medius',
    secondaryMuscle: 'Hamstrings & Balance Stabilizers',
    setsAndReps: '3 Sets × 12 Reps / Leg',
    duration: '4m 00s',
    difficulty: 'Beginner',
    recommendedLoad: 'Bodyweight / DB',
    formCue: 'Step forward into 90° angles at both knees; push explosively through front heel.',
  },
  {
    id: 'plank',
    name: 'Plank',
    equipment: 'Core & Floor',
    targetMuscle: 'Transverse Abdominis & Rectus',
    secondaryMuscle: 'Obliques & Shoulder Stabilizers',
    setsAndReps: '3 Sets × 60s Hold',
    duration: '3m 45s',
    difficulty: 'Beginner',
    recommendedLoad: 'Isometric Hold',
    formCue: 'Forearms parallel, tuck pelvis slightly into posterior tilt, breathe steadily.',
  },
  {
    id: 'leg-raises',
    name: 'Leg Raises',
    equipment: 'Core & Floor',
    targetMuscle: 'Lower Abdominals & Hip Flexors',
    secondaryMuscle: 'Obliques',
    setsAndReps: '3 Sets × 15 Reps',
    duration: '3m 15s',
    difficulty: 'Intermediate',
    recommendedLoad: 'Bodyweight',
    formCue: 'Press lower back flat into floor mat; lower straight legs slowly without touching.',
  },
  {
    id: 'mountain-climbers',
    name: 'Mountain Climbers',
    equipment: 'Core & Floor',
    targetMuscle: 'Dynamic Core & Conditioning',
    secondaryMuscle: 'Hip Flexors & Shoulders',
    setsAndReps: '3 Sets × 40s Sprint',
    duration: '3m 00s',
    difficulty: 'Intermediate',
    recommendedLoad: 'High Tempo',
    formCue: 'Shoulders stacked directly over wrists, drive knees rapidly toward chest.',
  },
];

/* ==========================================================================
   BESPOKE ATHLETIC VECTOR ILLUSTRATION ENGINE FOR ALL 24 EXERCISES
   Consistent visual language:
   - Clean off-white athletic frame (#F8FAFC) with technical grid lines
   - Charcoal body silhouette (#1E293B)
   - Strategic Red (#E53935) target muscle emphasis & equipment plates/weights
   ========================================================================== */
export const ExerciseIllustration: React.FC<{ id: ExerciseId }> = ({ id }) => {
  // Normalize legacy singular/plural aliases so both 12-item design system and 24-item library render cleanly
  const normalizedId = (() => {
    switch (id) {
      case 'barbell-squat':
        return 'barbell-squats';
      case 'barbell-row':
        return 'barbell-rows';
      case 'dumbbell-row':
        return 'one-arm-dumbbell-rows';
      case 'dumbbell-bicep-curl':
        return 'dumbbell-bicep-curls';
      case 'dumbbell-lateral-raise':
        return 'dumbbell-lateral-raises';
      case 'lunges':
        return 'dumbbell-lunges';
      default:
        return id;
    }
  })();

  return (
    <svg
      viewBox="0 0 240 140"
      className="w-full h-full"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${id} illustration`}
    >
      {/* Subtle Technical Grid Backdrop */}
      <rect width="240" height="140" fill="#F8FAFC" />
      <line x1="0" y1="118" x2="240" y2="118" stroke="#E5E7EB" strokeWidth="1.5" />
      <line x1="40" y1="0" x2="40" y2="140" stroke="#F1F5F9" strokeWidth="1" />
      <line x1="120" y1="0" x2="120" y2="140" stroke="#F1F5F9" strokeWidth="1" />
      <line x1="200" y1="0" x2="200" y2="140" stroke="#F1F5F9" strokeWidth="1" />

      {/* 1. PUSH-UPS */}
      {normalizedId === 'push-ups' && (
        <g>
          <circle cx="136" cy="84" r="22" fill="#FEE2E2" />
          <circle cx="168" cy="72" r="8" fill="#1E293B" />
          <path d="M158 76 L76 106" stroke="#1E293B" strokeWidth="8.5" strokeLinecap="round" />
          <path d="M148 80 L138 96 L148 116" stroke="#E53935" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M76 106 L74 116" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
        </g>
      )}

      {/* 2. DUMBBELL FLOOR PRESS */}
      {normalizedId === 'dumbbell-floor-press' && (
        <g>
          <circle cx="112" cy="86" r="23" fill="#FEE2E2" />
          <rect x="48" y="114" width="144" height="4" rx="2" fill="#CBD5E1" />
          {/* Supine Athlete */}
          <circle cx="80" cy="105" r="7.5" fill="#1E293B" />
          <path d="M90 108 L135 108" stroke="#1E293B" strokeWidth="8.5" strokeLinecap="round" />
          {/* Bent Knees */}
          <path d="M135 108 L154 88 L170 114" stroke="#1E293B" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Vertical Pressing Arms in Red */}
          <path d="M106 106 L106 66" stroke="#E53935" strokeWidth="6.5" strokeLinecap="round" />
          {/* Dumbbell Overhead */}
          <rect x="94" y="58" width="24" height="7" rx="2" fill="#111827" />
          <rect x="94" y="55" width="5" height="13" rx="1.5" fill="#E53935" />
          <rect x="113" y="55" width="5" height="13" rx="1.5" fill="#E53935" />
        </g>
      )}

      {/* 3. WIDE PUSH-UPS */}
      {normalizedId === 'wide-push-ups' && (
        <g>
          <circle cx="120" cy="76" r="25" fill="#FEE2E2" />
          {/* Front-angle wide push-up view */}
          <circle cx="120" cy="58" r="9" fill="#1E293B" />
          {/* Wide Chest Span in Red */}
          <path d="M92 72 L148 72" stroke="#E53935" strokeWidth="9" strokeLinecap="round" />
          {/* Wide Elbows to Floor */}
          <path d="M92 72 L72 90 L76 116" stroke="#E53935" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M148 72 L168 90 L164 116" stroke="#E53935" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Core & Legs behind */}
          <path d="M120 74 L120 106" stroke="#1E293B" strokeWidth="8" strokeLinecap="round" />
        </g>
      )}

      {/* 4. DUMBBELL SQUEEZE PRESS */}
      {normalizedId === 'dumbbell-squeeze-press' && (
        <g>
          <circle cx="114" cy="82" r="24" fill="#FEE2E2" />
          <rect x="48" y="114" width="144" height="4" rx="2" fill="#CBD5E1" />
          <circle cx="78" cy="105" r="7.5" fill="#1E293B" />
          <path d="M88 108 L134 108" stroke="#1E293B" strokeWidth="8.5" strokeLinecap="round" />
          <path d="M134 108 L154 88 L170 114" stroke="#1E293B" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Converging Squeeze Arms in Red */}
          <path d="M102 106 L110 64 M118 106 L110 64" stroke="#E53935" strokeWidth="5.5" strokeLinecap="round" />
          {/* Twin Dumbbells Pressed Tightly Together */}
          <rect x="98" y="52" width="11" height="12" rx="2" fill="#E53935" />
          <rect x="111" y="52" width="11" height="12" rx="2" fill="#111827" />
        </g>
      )}

      {/* 5. BARBELL ROWS */}
      {normalizedId === 'barbell-rows' && (
        <g>
          <circle cx="118" cy="62" r="24" fill="#FEE2E2" />
          <circle cx="142" cy="44" r="8.5" fill="#1E293B" />
          <path d="M134 50 L100 68" stroke="#E53935" strokeWidth="9" strokeLinecap="round" />
          <path d="M100 68 L114 92 L110 116" stroke="#1E293B" strokeWidth="7" strokeLinecap="round" />
          <path d="M126 54 L112 44 L124 76" stroke="#1E293B" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
          <line x1="68" y1="78" x2="174" y2="78" stroke="#111827" strokeWidth="3.5" />
          <rect x="74" y="64" width="7" height="28" rx="2" fill="#E53935" />
          <rect x="159" y="64" width="7" height="28" rx="2" fill="#E53935" />
        </g>
      )}

      {/* 6. ONE-ARM DUMBBELL ROWS */}
      {normalizedId === 'one-arm-dumbbell-rows' && (
        <g>
          <circle cx="122" cy="60" r="22" fill="#FEE2E2" />
          <rect x="92" y="88" width="68" height="7" rx="3" fill="#CBD5E1" />
          <line x1="102" y1="95" x2="102" y2="117" stroke="#94A3B8" strokeWidth="4" />
          <line x1="148" y1="95" x2="148" y2="117" stroke="#94A3B8" strokeWidth="4" />
          <circle cx="148" cy="52" r="8" fill="#1E293B" />
          <path d="M138 56 L102 62" stroke="#E53935" strokeWidth="8.5" strokeLinecap="round" />
          <path d="M102 62 L86 115" stroke="#1E293B" strokeWidth="6.5" strokeLinecap="round" />
          <path d="M135 58 L138 88" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
          <path d="M122 58 L112 45 L120 74" stroke="#1E293B" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="111" y="71" width="18" height="6" rx="2" fill="#E53935" />
        </g>
      )}

      {/* 7. DUMBBELL REVERSE FLY */}
      {normalizedId === 'dumbbell-reverse-fly' && (
        <g>
          <circle cx="120" cy="58" r="25" fill="#FEE2E2" />
          <circle cx="120" cy="46" r="8.5" fill="#1E293B" />
          {/* Hinged Torso */}
          <path d="M120 56 L120 84" stroke="#1E293B" strokeWidth="9" strokeLinecap="round" />
          <path d="M120 84 L106 116 M120 84 L134 116" stroke="#1E293B" strokeWidth="6.5" strokeLinecap="round" />
          {/* Wide Sweeping Rear-Delt Fly Arms in Red */}
          <path d="M120 58 L76 46" stroke="#E53935" strokeWidth="6" strokeLinecap="round" />
          <path d="M120 58 L164 46" stroke="#E53935" strokeWidth="6" strokeLinecap="round" />
          <rect x="64" y="41" width="14" height="7" rx="2" fill="#111827" />
          <rect x="162" y="41" width="14" height="7" rx="2" fill="#111827" />
          {/* Motion Arcs */}
          <path d="M74 62 A 30 30 0 0 1 74 48" stroke="#E53935" strokeWidth="1.5" strokeDasharray="2 2" />
          <path d="M166 62 A 30 30 0 0 0 166 48" stroke="#E53935" strokeWidth="1.5" strokeDasharray="2 2" />
        </g>
      )}

      {/* 8. BARBELL DEADLIFT */}
      {normalizedId === 'barbell-deadlift' && (
        <g>
          <circle cx="116" cy="72" r="25" fill="#FEE2E2" />
          <circle cx="132" cy="40" r="8.5" fill="#1E293B" />
          <path d="M128 50 L104 74" stroke="#E53935" strokeWidth="9" strokeLinecap="round" />
          <path d="M104 74 L118 94 L118 116" stroke="#1E293B" strokeWidth="7" strokeLinecap="round" />
          <path d="M125 54 L125 94" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
          <line x1="58" y1="95" x2="182" y2="95" stroke="#111827" strokeWidth="3.5" />
          <rect x="65" y="77" width="8" height="36" rx="2" fill="#E53935" />
          <rect x="75" y="81" width="5" height="28" rx="1.5" fill="#1E293B" />
          <rect x="167" y="77" width="8" height="36" rx="2" fill="#E53935" />
          <rect x="160" y="81" width="5" height="28" rx="1.5" fill="#1E293B" />
        </g>
      )}

      {/* 9. DUMBBELL SHOULDER PRESS */}
      {normalizedId === 'dumbbell-shoulder-press' && (
        <g>
          <circle cx="120" cy="54" r="25" fill="#FEE2E2" />
          <circle cx="120" cy="48" r="8.5" fill="#1E293B" />
          <path d="M120 60 L120 92" stroke="#1E293B" strokeWidth="9" strokeLinecap="round" />
          <path d="M120 92 L106 116 M120 92 L134 116" stroke="#1E293B" strokeWidth="6.5" strokeLinecap="round" />
          <path d="M120 62 L94 60 L94 34" stroke="#E53935" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M120 62 L146 60 L146 34" stroke="#E53935" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="83" y="28" width="22" height="7" rx="2" fill="#111827" />
          <rect x="83" y="26" width="5" height="11" rx="1.5" fill="#E53935" />
          <rect x="100" y="26" width="5" height="11" rx="1.5" fill="#E53935" />
          <rect x="135" y="28" width="22" height="7" rx="2" fill="#111827" />
          <rect x="135" y="26" width="5" height="11" rx="1.5" fill="#E53935" />
          <rect x="152" y="26" width="5" height="11" rx="1.5" fill="#E53935" />
        </g>
      )}

      {/* 10. DUMBBELL LATERAL RAISES */}
      {normalizedId === 'dumbbell-lateral-raises' && (
        <g>
          <circle cx="120" cy="56" r="24" fill="#FEE2E2" />
          <circle cx="120" cy="36" r="8.5" fill="#1E293B" />
          <path d="M120 48 L120 84" stroke="#1E293B" strokeWidth="9" strokeLinecap="round" />
          <path d="M120 84 L108 116 M120 84 L132 116" stroke="#1E293B" strokeWidth="6.5" strokeLinecap="round" />
          <path d="M120 54 L78 50" stroke="#E53935" strokeWidth="6" strokeLinecap="round" />
          <path d="M120 54 L162 50" stroke="#E53935" strokeWidth="6" strokeLinecap="round" />
          <rect x="68" y="45" width="14" height="7" rx="2" fill="#111827" />
          <rect x="158" y="45" width="14" height="7" rx="2" fill="#111827" />
        </g>
      )}

      {/* 11. DUMBBELL FRONT RAISES */}
      {normalizedId === 'dumbbell-front-raises' && (
        <g>
          <circle cx="124" cy="54" r="23" fill="#FEE2E2" />
          <circle cx="106" cy="36" r="8.5" fill="#1E293B" />
          <path d="M106 48 L106 84" stroke="#1E293B" strokeWidth="9" strokeLinecap="round" />
          <path d="M106 84 L98 116 M106 84 L116 116" stroke="#1E293B" strokeWidth="6.5" strokeLinecap="round" />
          {/* Side profile: Anterior Delt & Straight Arm Raised Forward in Red */}
          <path d="M106 52 L152 50" stroke="#E53935" strokeWidth="6.5" strokeLinecap="round" />
          {/* Dumbbell at eye height */}
          <rect x="148" y="43" width="16" height="14" rx="2" fill="#E53935" />
          <rect x="152" y="40" width="8" height="20" rx="1.5" fill="#111827" />
          <path d="M148 76 A 32 32 0 0 0 154 56" stroke="#E53935" strokeWidth="1.75" strokeDasharray="3 3" />
        </g>
      )}

      {/* 12. BARBELL OVERHEAD PRESS */}
      {normalizedId === 'barbell-overhead-press' && (
        <g>
          <circle cx="120" cy="52" r="24" fill="#FEE2E2" />
          <circle cx="120" cy="50" r="8.5" fill="#1E293B" />
          <path d="M120 62 L120 92" stroke="#1E293B" strokeWidth="9" strokeLinecap="round" />
          <path d="M120 92 L108 116 M120 92 L132 116" stroke="#1E293B" strokeWidth="6.5" strokeLinecap="round" />
          {/* Overhead Locked Arms in Red */}
          <path d="M120 62 L98 56 L96 28" stroke="#E53935" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M120 62 L142 56 L144 28" stroke="#E53935" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          {/* Barbell Overhead */}
          <line x1="56" y1="26" x2="184" y2="26" stroke="#111827" strokeWidth="3.5" strokeLinecap="round" />
          <rect x="64" y="14" width="7" height="24" rx="2" fill="#E53935" />
          <rect x="73" y="17" width="4" height="18" rx="1" fill="#1E293B" />
          <rect x="169" y="14" width="7" height="24" rx="2" fill="#E53935" />
          <rect x="163" y="17" width="4" height="18" rx="1" fill="#1E293B" />
        </g>
      )}

      {/* 13. DUMBBELL BICEP CURLS */}
      {normalizedId === 'dumbbell-bicep-curls' && (
        <g>
          <circle cx="126" cy="64" r="22" fill="#FEE2E2" />
          <circle cx="118" cy="36" r="8.5" fill="#1E293B" />
          <path d="M118 48 L118 84" stroke="#1E293B" strokeWidth="9" strokeLinecap="round" />
          <path d="M118 84 L108 116 M118 84 L128 116" stroke="#1E293B" strokeWidth="6.5" strokeLinecap="round" />
          <path d="M118 52 L122 72 L140 54" stroke="#E53935" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
          <rect x="134" y="46" width="16" height="7" rx="2" fill="#111827" />
          <rect x="133" y="44" width="4" height="11" rx="1" fill="#E53935" />
          <rect x="147" y="44" width="4" height="11" rx="1" fill="#E53935" />
        </g>
      )}

      {/* 14. BARBELL CURLS */}
      {normalizedId === 'barbell-curls' && (
        <g>
          <circle cx="120" cy="64" r="24" fill="#FEE2E2" />
          <circle cx="120" cy="36" r="8.5" fill="#1E293B" />
          <path d="M120 48 L120 84" stroke="#1E293B" strokeWidth="9" strokeLinecap="round" />
          <path d="M120 84 L108 116 M120 84 L132 116" stroke="#1E293B" strokeWidth="6.5" strokeLinecap="round" />
          {/* Both Biceps Flexed in Red */}
          <path d="M114 52 L100 68 L98 56" stroke="#E53935" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M126 52 L140 68 L142 56" stroke="#E53935" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
          {/* Barbell Across Mid-Chest */}
          <line x1="62" y1="58" x2="178" y2="58" stroke="#111827" strokeWidth="3.5" strokeLinecap="round" />
          <rect x="68" y="47" width="6" height="22" rx="1.5" fill="#E53935" />
          <rect x="166" y="47" width="6" height="22" rx="1.5" fill="#E53935" />
        </g>
      )}

      {/* 15. CLOSE-GRIP PUSH-UPS */}
      {normalizedId === 'close-grip-push-ups' && (
        <g>
          <circle cx="136" cy="86" r="22" fill="#FEE2E2" />
          <circle cx="168" cy="70" r="8" fill="#1E293B" />
          <path d="M158 75 L76 106" stroke="#1E293B" strokeWidth="8.5" strokeLinecap="round" />
          {/* Tucked Tricep Arm pinned against ribs in Red */}
          <path d="M148 79 L126 92 L142 116" stroke="#E53935" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          {/* Diamond / Close Hand Placement Marker */}
          <polygon points="142,112 135,117 149,117" fill="#E53935" />
          <path d="M76 106 L74 116" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
        </g>
      )}

      {/* 16. OVERHEAD TRICEPS EXTENSION */}
      {normalizedId === 'overhead-triceps-extension' && (
        <g>
          <circle cx="120" cy="44" r="23" fill="#FEE2E2" />
          <circle cx="120" cy="52" r="8.5" fill="#1E293B" />
          <path d="M120 64 L120 94" stroke="#1E293B" strokeWidth="9" strokeLinecap="round" />
          <path d="M120 94 L108 116 M120 94 L132 116" stroke="#1E293B" strokeWidth="6.5" strokeLinecap="round" />
          {/* Vertical Upper Arms & Bent Forearms Behind Head in Red */}
          <path d="M114 60 L106 30 L120 22" stroke="#E53935" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M126 60 L134 30 L120 22" stroke="#E53935" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Vertical Dumbbell Cupped Overhead */}
          <rect x="114" y="14" width="12" height="6" rx="1.5" fill="#E53935" />
          <rect x="117" y="20" width="6" height="10" rx="1" fill="#111827" />
          <rect x="114" y="30" width="12" height="6" rx="1.5" fill="#E53935" />
        </g>
      )}

      {/* 17. BARBELL SQUATS */}
      {normalizedId === 'barbell-squats' && (
        <g>
          <circle cx="120" cy="82" r="24" fill="#FEE2E2" />
          <circle cx="120" cy="34" r="9" fill="#1E293B" />
          <path d="M120 45 L112 76" stroke="#1E293B" strokeWidth="9" strokeLinecap="round" />
          <path d="M112 76 L92 84 M112 76 L134 84" stroke="#E53935" strokeWidth="8" strokeLinecap="round" />
          <path d="M92 84 L96 116 M134 84 L138 116" stroke="#1E293B" strokeWidth="6.5" strokeLinecap="round" />
          <line x1="62" y1="46" x2="178" y2="46" stroke="#111827" strokeWidth="3.5" strokeLinecap="round" />
          <rect x="68" y="32" width="7" height="28" rx="2" fill="#E53935" />
          <rect x="77" y="35" width="5" height="22" rx="1.5" fill="#1E293B" />
          <rect x="165" y="32" width="7" height="28" rx="2" fill="#E53935" />
          <rect x="158" y="35" width="5" height="22" rx="1.5" fill="#1E293B" />
        </g>
      )}

      {/* 18. DUMBBELL LUNGES */}
      {normalizedId === 'dumbbell-lunges' && (
        <g>
          <circle cx="120" cy="84" r="24" fill="#FEE2E2" />
          <circle cx="120" cy="34" r="8.5" fill="#1E293B" />
          <path d="M120 46 L120 78" stroke="#1E293B" strokeWidth="9" strokeLinecap="round" />
          {/* Front Lunge Leg (90 deg) in Red */}
          <path d="M120 78 L146 84 L146 116" stroke="#E53935" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          {/* Rear Knee Drop Leg */}
          <path d="M120 78 L100 104 L78 114" stroke="#1E293B" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Arm Holding Dumbbell at Side */}
          <path d="M120 50 L120 78" stroke="#1E293B" strokeWidth="5" strokeLinecap="round" />
          <rect x="111" y="76" width="18" height="7" rx="2" fill="#E53935" />
        </g>
      )}

      {/* 19. DUMBBELL ROMANIAN DEADLIFT */}
      {normalizedId === 'dumbbell-romanian-deadlift' && (
        <g>
          <circle cx="106" cy="76" r="24" fill="#FEE2E2" />
          <circle cx="144" cy="48" r="8.5" fill="#1E293B" />
          {/* Flat Hip-Hinged Torso */}
          <path d="M134 52 L96 68" stroke="#1E293B" strokeWidth="9" strokeLinecap="round" />
          {/* Stretched Hamstrings & Glutes in Red */}
          <path d="M96 68 L104 92 L106 116" stroke="#E53935" strokeWidth="7.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Vertical Arm Shaving the Shin */}
          <path d="M128 56 L124 90" stroke="#1E293B" strokeWidth="5.5" strokeLinecap="round" />
          <rect x="115" y="88" width="18" height="7" rx="2" fill="#E53935" />
        </g>
      )}

      {/* 20. CALF RAISES */}
      {normalizedId === 'calf-raises' && (
        <g>
          <circle cx="120" cy="96" r="22" fill="#FEE2E2" />
          <circle cx="120" cy="30" r="8" fill="#1E293B" />
          <path d="M120 42 L120 76" stroke="#1E293B" strokeWidth="9" strokeLinecap="round" />
          <path d="M120 76 L112 94 M120 76 L128 94" stroke="#1E293B" strokeWidth="6.5" strokeLinecap="round" />
          {/* Active Calves & Tiptoe Plantarflexion in Red */}
          <path d="M112 94 L112 114 M128 94 L128 114" stroke="#E53935" strokeWidth="7" strokeLinecap="round" />
          {/* Upward Elevation Arrows */}
          <path d="M94 108 L94 92 M90 96 L94 92 L98 96" stroke="#E53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M146 108 L146 92 M142 96 L146 92 L150 96" stroke="#E53935" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}

      {/* 21. PLANK */}
      {normalizedId === 'plank' && (
        <g>
          <circle cx="122" cy="92" r="22" fill="#FEE2E2" />
          <rect x="56" y="115" width="128" height="4" rx="2" fill="#E53935" />
          <circle cx="166" cy="84" r="8" fill="#1E293B" />
          <path d="M156 88 L116 94" stroke="#E53935" strokeWidth="9" strokeLinecap="round" />
          <path d="M116 94 L76 106" stroke="#1E293B" strokeWidth="7.5" strokeLinecap="round" />
          <path d="M150 90 L146 114 L162 114" stroke="#1E293B" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
        </g>
      )}

      {/* 22. LEG RAISES */}
      {normalizedId === 'leg-raises' && (
        <g>
          <circle cx="116" cy="92" r="22" fill="#FEE2E2" />
          <rect x="56" y="115" width="128" height="4" rx="2" fill="#CBD5E1" />
          <circle cx="78" cy="105" r="7.5" fill="#1E293B" />
          <path d="M88 108 L124 108" stroke="#1E293B" strokeWidth="8.5" strokeLinecap="round" />
          <path d="M124 108 L156 54" stroke="#E53935" strokeWidth="7.5" strokeLinecap="round" />
          <path d="M162 62 A 45 45 0 0 1 170 104" stroke="#E53935" strokeWidth="1.75" strokeDasharray="3 3" />
        </g>
      )}

      {/* 23. BICYCLE CRUNCHES */}
      {normalizedId === 'bicycle-crunches' && (
        <g>
          <circle cx="116" cy="90" r="24" fill="#FEE2E2" />
          <rect x="56" y="115" width="128" height="4" rx="2" fill="#CBD5E1" />
          {/* Lifted Head & Rotating Upper Torso in Red */}
          <circle cx="84" cy="84" r="7.5" fill="#1E293B" />
          <path d="M92 92 L124 108" stroke="#E53935" strokeWidth="8.5" strokeLinecap="round" />
          {/* Elbow to Opposite Bent Knee */}
          <path d="M94 90 L114 82" stroke="#E53935" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M124 108 L116 80 L134 84" stroke="#E53935" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
          {/* Extended Straight Leg */}
          <path d="M124 108 L168 92" stroke="#1E293B" strokeWidth="6.5" strokeLinecap="round" />
        </g>
      )}

      {/* 24. MOUNTAIN CLIMBERS */}
      {normalizedId === 'mountain-climbers' && (
        <g>
          <circle cx="126" cy="88" r="23" fill="#FEE2E2" />
          <circle cx="166" cy="68" r="8" fill="#1E293B" />
          <path d="M156 73 L112 88" stroke="#1E293B" strokeWidth="8.5" strokeLinecap="round" />
          <path d="M152 75 L154 116" stroke="#1E293B" strokeWidth="5.5" strokeLinecap="round" />
          <path d="M112 88 L136 92 L122 110" stroke="#E53935" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M112 88 L74 114" stroke="#1E293B" strokeWidth="6" strokeLinecap="round" />
        </g>
      )}
    </svg>
  );
};

/* ==========================================================================
   EXERCISE CARD COMPONENT
   ========================================================================== */
export interface ExerciseCardProps {
  exercise: ExerciseItem;
  selected?: boolean;
  onSelect?: (exercise: ExerciseItem) => void;
}

export const ExerciseCard: React.FC<ExerciseCardProps> = ({
  exercise,
  selected = false,
  onSelect,
}) => {
  const difficultyBadgeStyle = {
    Beginner: 'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]',
    Intermediate: 'bg-[#FEF2F2] text-[#E53935] border-[#FECACA]',
    Advanced: 'bg-[#1E293B] text-white border-[#1E293B]',
  }[exercise.difficulty];

  return (
    <div
      onClick={() => onSelect && onSelect(exercise)}
      role={onSelect ? 'button' : undefined}
      tabIndex={onSelect ? 0 : undefined}
      className={`group bg-white rounded-[12px] border overflow-hidden transition-all flex flex-col justify-between ${
        selected
          ? 'border-[#E53935] ring-1 ring-[#E53935]/20 shadow-hf-sm'
          : 'border-[#E5E7EB] hover:border-[#E53935]/60 shadow-hf-xs'
      } ${onSelect ? 'cursor-pointer' : ''}`}
    >
      <div>
        {/* Illustration Viewport */}
        <div className="relative h-36 w-full bg-[#F8FAFC] border-b border-[#F1F5F9] overflow-hidden">
          <ExerciseIllustration id={exercise.id} />

          {/* Top Left Equipment Tag */}
          <span className="absolute top-2.5 left-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-[5px] bg-white/95 border border-[#E5E7EB] text-[10px] font-bold uppercase tracking-wider text-[#111827] shadow-hf-xs">
            <Dumbbell className="w-3 h-3 text-[#E53935]" strokeWidth={2.25} />
            {exercise.equipment}
          </span>

          {/* Top Right Difficulty Pill */}
          <span
            className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-[5px] border text-[10px] font-bold uppercase tracking-wider ${difficultyBadgeStyle}`}
          >
            {exercise.difficulty}
          </span>

          {/* Bottom Right Duration Badge */}
          <span className="absolute bottom-2.5 right-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-[5px] bg-white/95 border border-[#E5E7EB] font-mono tabular-nums text-[11px] font-bold text-[#111827]">
            <Clock className="w-3 h-3 text-[#E53935]" strokeWidth={2.25} />
            {exercise.duration}
          </span>
        </div>

        {/* Content Body */}
        <div className="p-4">
          {/* Target Muscle Label */}
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.04em] text-[#E53935] mb-1">
            <Flame className="w-3.5 h-3.5 fill-[#E53935]" />
            <span>{exercise.targetMuscle}</span>
          </div>

          {/* Exercise Name */}
          <h4 className="text-[17px] font-bold text-[#111827] tracking-tight group-hover:text-[#E53935] transition-colors">
            {exercise.name}
          </h4>

          {/* Form Cue */}
          <p className="text-[12px] font-normal text-[#4B5563] mt-1 line-clamp-2 leading-relaxed">
            {exercise.formCue}
          </p>
        </div>
      </div>

      {/* Footer Metadata Bar: Sets & Reps + Recommended Load */}
      <div className="px-4 pb-4 pt-2 border-t border-[#F8FAFC] flex items-center justify-between gap-2">
        <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] font-mono tabular-nums text-[12px] font-bold">
          <Layers className="w-3.5 h-3.5" strokeWidth={2.25} />
          <span>{exercise.setsAndReps}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <span className="font-mono tabular-nums text-[11px] font-bold text-[#6B7280] bg-[#F8FAFC] border border-[#E5E7EB] px-2 py-1 rounded-[6px]">
            {exercise.recommendedLoad}
          </span>
          <span
            aria-hidden="true"
            className="w-7 h-7 rounded-[6px] bg-[#F8FAFC] group-hover:bg-[#E53935] text-[#4B5563] group-hover:text-white border border-[#E5E7EB] group-hover:border-[#E53935] flex items-center justify-center transition-colors"
          >
            <Play className="w-3.5 h-3.5 fill-current" />
          </span>
        </div>
      </div>
    </div>
  );
};
