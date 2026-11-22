export type ExerciseLibraryCategory =
  | 'All'
  | 'Chest'
  | 'Back'
  | 'Shoulders'
  | 'Arms'
  | 'Legs & Glutes'
  | 'Core';

export type ExerciseMuscleGroup = Exclude<ExerciseLibraryCategory, 'All'>;

export type ExerciseDifficultyLevel = 'Beginner' | 'Intermediate' | 'Advanced';

export type ExerciseLibraryId =
  // Chest (1-4)
  | 'push-ups'
  | 'dumbbell-floor-press'
  | 'wide-push-ups'
  | 'dumbbell-squeeze-press'
  // Back (5-8)
  | 'barbell-rows'
  | 'one-arm-dumbbell-rows'
  | 'dumbbell-reverse-fly'
  | 'barbell-deadlift'
  // Shoulders (9-12)
  | 'dumbbell-shoulder-press'
  | 'dumbbell-lateral-raises'
  | 'dumbbell-front-raises'
  | 'barbell-overhead-press'
  // Arms (13-16)
  | 'dumbbell-bicep-curls'
  | 'barbell-curls'
  | 'close-grip-push-ups'
  | 'overhead-triceps-extension'
  // Legs & Glutes (17-20)
  | 'barbell-squats'
  | 'dumbbell-lunges'
  | 'dumbbell-romanian-deadlift'
  | 'calf-raises'
  // Core (21-24)
  | 'plank'
  | 'leg-raises'
  | 'bicycle-crunches'
  | 'mountain-climbers';

export interface ExerciseLibraryEntry {
  id: ExerciseLibraryId;
  number: number;
  name: string;
  category: ExerciseMuscleGroup;
  targetMuscleGroup: string;
  primaryMuscles: string[];
  secondaryMuscles: string[];
  equipmentRequired: string;
  difficulty: ExerciseDifficultyLevel;
  suggestedSetsAndReps: string;
  recommendedRest: string;
  shortSummary: string;
  startingPosition: string;
  stepByStepInstructions: string[];
  correctMovementTechnique: string;
  breathingInstructions: string;
  commonMistakesToAvoid: string[];
  beginnerFriendlyTips: string[];
}

export const EXERCISE_LIBRARY_CATEGORIES: ExerciseLibraryCategory[] = [
  'All',
  'Chest',
  'Back',
  'Shoulders',
  'Arms',
  'Legs & Glutes',
  'Core',
];

export const EXERCISE_LIBRARY_DATA: ExerciseLibraryEntry[] = [
  /* ==========================================================================
     CHEST (Exercises 1 – 4)
     ========================================================================== */
  {
    id: 'push-ups',
    number: 1,
    name: 'Push-ups',
    category: 'Chest',
    targetMuscleGroup: 'Mid Pectorals & Anterior Deltoids',
    primaryMuscles: ['Pectoralis Major', 'Anterior Deltoids'],
    secondaryMuscles: ['Triceps Brachii', 'Serratus Anterior', 'Transverse Abdominis'],
    equipmentRequired: 'Bodyweight (Floor Mat)',
    difficulty: 'Beginner',
    suggestedSetsAndReps: '3–4 Sets × 12–15 Reps',
    recommendedRest: '45–60 seconds between sets',
    shortSummary: 'Foundational horizontal pressing movement for chest thickness, tricep lockout strength, and rigid core stability.',
    startingPosition:
      'Assume a high plank position with your hands placed slightly wider than shoulder-width apart, fingers spread for grip, wrists stacked under shoulders, and feet together with toes anchored on the floor.',
    stepByStepInstructions: [
      'Brace your abdominals and squeeze your glutes so your body forms a straight line from the crown of your head to your heels.',
      'Tuck your elbows to roughly a 45-degree angle relative to your torso as you begin bending your arms.',
      'Lower your chest smoothly toward the floor until your sternum hovers 2–3 cm above the mat.',
      'Pause briefly at the bottom without letting your hips sag, then press forcefully through your palms to return to full arm extension.',
    ],
    correctMovementTechnique:
      'Move your shoulders, hips, and knees as a single rigid plank unit. Keep your neck neutral by looking at a spot on the floor about 30 cm ahead of your fingers rather than tucking your chin or craning upward.',
    breathingInstructions:
      'Inhale steadily through your nose for 2 seconds as you lower your chest toward the floor; exhale forcefully through your mouth as you push back up to the starting lockout.',
    commonMistakesToAvoid: [
      'Flaring the elbows out to 90 degrees, which places excessive shear stress on the shoulder capsule.',
      'Allowing the lower back and hips to sag toward the floor due to an unbraced core.',
      'Performing half-repetitions without lowering the chest to elbow height.',
    ],
    beginnerFriendlyTips: [
      'If full floor push-ups break form before 8 reps, elevate your hands on a sturdy bench or perform controlled knee push-ups while maintaining a straight hip-to-shoulder line.',
      'Focus on squeezing the floor together with your palms to increase pectoral engagement.',
    ],
  },
  {
    id: 'dumbbell-floor-press',
    number: 2,
    name: 'Dumbbell Floor Press',
    category: 'Chest',
    targetMuscleGroup: 'Pectorals & Triceps Lockout',
    primaryMuscles: ['Pectoralis Major (Sternal Head)', 'Triceps Brachii'],
    secondaryMuscles: ['Anterior Deltoids', 'Core Stabilizers'],
    equipmentRequired: 'Dumbbells & Floor Mat',
    difficulty: 'Beginner',
    suggestedSetsAndReps: '4 Sets × 10–12 Reps',
    recommendedRest: '60 seconds between sets',
    shortSummary: 'Shoulder-friendly supine dumbbell chest press performed on the floor to build raw pressing power at home without a bench.',
    startingPosition:
      'Lie flat on your back on an exercise mat with knees bent and feet planted firmly on the floor. Hold a pair of dumbbells pressed straight up over your mid-chest with palms facing forward or angled slightly inward at 45 degrees.',
    stepByStepInstructions: [
      'Retract and depress your shoulder blades firmly against the floor mat to create a stable pressing base.',
      'Lower both dumbbells simultaneously under control until the backs of your upper arms (triceps) gently touch the floor.',
      'Pause for 1 full second on the floor to eliminate momentum while keeping your wrists stacked vertically over your elbows.',
      'Drive the dumbbells straight back up over your chest until your elbows are locked out without clanging the weights together.',
    ],
    correctMovementTechnique:
      'Keep your forearms strictly perpendicular to the floor throughout the entire press. The floor naturally limits excessive shoulder extension, making this ideal for joint-safe progressive overload at home.',
    breathingInstructions:
      'Inhale deeply as you lower the dumbbells until your triceps rest gently on the floor; exhale powerfully as you press the weights back to the top.',
    commonMistakesToAvoid: [
      'Bouncing the elbows aggressively off the floor to rebound the weights upward.',
      'Letting the wrists bend backward under the load instead of keeping knuckles pointed toward the ceiling.',
      'Lifting the hips or lower back excessively off the mat during the press.',
    ],
    beginnerFriendlyTips: [
      'Sit up with the dumbbells resting on your thighs first, then rock back smoothly onto the floor with the weights close to your chest before pressing them up.',
      'Use a neutral grip (palms facing each other) if you experience any front-shoulder discomfort.',
    ],
  },
  {
    id: 'wide-push-ups',
    number: 3,
    name: 'Wide Push-ups',
    category: 'Chest',
    targetMuscleGroup: 'Outer Pectorals & Chest Width',
    primaryMuscles: ['Pectoralis Major (Sternal & Outer Fibers)'],
    secondaryMuscles: ['Anterior Deltoids', 'Triceps Brachii', 'Core Stabilizers'],
    equipmentRequired: 'Bodyweight (Floor Mat)',
    difficulty: 'Intermediate',
    suggestedSetsAndReps: '3 Sets × 12–15 Reps',
    recommendedRest: '45–60 seconds between sets',
    shortSummary: 'Wide-stance bodyweight push-up variation that increases horizontal adduction leverage to emphasize outer pectoral development.',
    startingPosition:
      'Start in a high plank position with your hands placed 1.5 times shoulder-width apart and fingers turned slightly outward at 15 degrees. Brace your core and align your head, spine, and heels.',
    stepByStepInstructions: [
      'Engage your lats and abs, keeping your hips level with your shoulders.',
      'Lower your torso between your hands by bending your elbows outward at roughly a 60-degree angle.',
      'Descend until your chest reaches the level of your elbows and you feel a deep stretch across your outer pectorals.',
      'Contract your chest muscles inward as you press through the heels of your palms to return to the top position.',
    ],
    correctMovementTechnique:
      'Visualize bringing your biceps toward the midline of your chest as you push up, even though your hands remain fixed wide on the floor. Avoid shrugging your shoulders toward your ears.',
    breathingInstructions:
      'Inhale smoothly through your nose during the wide descent; exhale sharply through your mouth as you drive back up.',
    commonMistakesToAvoid: [
      'Placing hands too far forward in line with the face instead of in line with the mid-chest.',
      'Rushing the bottom stretch phase where outer chest recruitment is highest.',
      'Letting the head droop forward to fake depth.',
    ],
    beginnerFriendlyTips: [
      'Start with your hands just 8–10 cm wider than your standard push-up grip and gradually widen as your shoulder mobility improves.',
      'Use a 2-second lowering tempo to maximize chest muscle tension.',
    ],
  },
  {
    id: 'dumbbell-squeeze-press',
    number: 4,
    name: 'Dumbbell Squeeze Press',
    category: 'Chest',
    targetMuscleGroup: 'Inner Pectorals & Upper Chest',
    primaryMuscles: ['Pectoralis Major (Inner & Clavicular Fibers)'],
    secondaryMuscles: ['Triceps Brachii', 'Anterior Deltoids'],
    equipmentRequired: 'Dumbbells & Floor Mat',
    difficulty: 'Intermediate',
    suggestedSetsAndReps: '3–4 Sets × 10–12 Reps',
    recommendedRest: '60 seconds between sets',
    shortSummary: 'Continuous isometric-press hybrid where two dumbbells are crushed together throughout the entire range of motion for maximum chest contraction.',
    startingPosition:
      'Lie supine on the floor mat with knees bent. Hold two hex or round dumbbells with a neutral grip (palms facing each other) and press the flat sides of the dumbbells firmly together directly above your sternum.',
    stepByStepInstructions: [
      'Actively crush the two dumbbells inward against each other to pre-activate your pectorals before moving.',
      'Maintain constant inward pressure between the dumbbells as you lower them slowly down to touch your mid-chest.',
      'Once the dumbbells touch your chest or your triceps touch the floor, hold the inward squeeze for 1 count.',
      'Press the locked dumbbells straight up to full arm extension while maintaining the inward crush from bottom to top.',
    ],
    correctMovementTechnique:
      'The effectiveness of the Squeeze Press comes from the continuous isometric adduction force. Never relax the inward push between the two dumbbells, even at the bottom or top of the rep.',
    breathingInstructions:
      'Inhale under tension as the locked dumbbells travel down toward your sternum; exhale and squeeze harder at peak lockout.',
    commonMistakesToAvoid: [
      'Using overly heavy dumbbells that pull apart mid-rep instead of allowing a constant inward crush.',
      'Lowering the weights toward the throat or neck instead of the mid-to-lower sternum.',
      'Locking out with loose shoulders that roll forward off the mat.',
    ],
    beginnerFriendlyTips: [
      'Choose dumbbells that are 20–30% lighter than your standard Dumbbell Floor Press weight so you can sustain intense inward pressure.',
      'Hexagonal dumbbells work best because their flat edges lock together cleanly.',
    ],
  },

  /* ==========================================================================
     BACK (Exercises 5 – 8)
     ========================================================================== */
  {
    id: 'barbell-rows',
    number: 5,
    name: 'Barbell Rows',
    category: 'Back',
    targetMuscleGroup: 'Latissimus Dorsi & Mid-Back Thickness',
    primaryMuscles: ['Latissimus Dorsi', 'Rhomboids', 'Middle Trapezius'],
    secondaryMuscles: ['Posterior Deltoids', 'Biceps Brachii', 'Spinal Erectors'],
    equipmentRequired: 'Barbell',
    difficulty: 'Intermediate',
    suggestedSetsAndReps: '4 Sets × 8–10 Reps',
    recommendedRest: '60–75 seconds between sets',
    shortSummary: 'Heavy bilateral bent-over pulling compound that builds dense upper-back thickness, wide lats, and posterior trunk endurance.',
    startingPosition:
      'Stand with feet hip-width apart holding a barbell with an overhand grip just outside your knees. Hinge forward at the hips until your torso is angled at roughly 45 degrees above parallel, knees slightly bent, and spine completely flat.',
    stepByStepInstructions: [
      'Brace your core 360 degrees and let the barbell hang vertically below your shoulders with arms straight.',
      'Drive your elbows back and up behind your torso, pulling the barbell toward your lower sternum / upper abdomen.',
      'Touch the barbell lightly to your torso and squeeze your shoulder blades together for 1 full second.',
      'Lower the barbell slowly along the same path until your arms are extended without letting your torso rise or round.',
    ],
    correctMovementTechnique:
      'Keep your torso angle stationary throughout the entire set. Initiate every pull by retracting your shoulder blades and driving with your elbows rather than curling the bar with your wrists.',
    breathingInstructions:
      'Take a bracing breath before initiating the pull, exhale as the barbell touches your lower ribs, and inhale as you control the bar back to full hang.',
    commonMistakesToAvoid: [
      'Jerking the torso upright on every rep to heave the barbell up with momentum.',
      'Rounding the lumbar spine instead of maintaining an athletic hip hinge.',
      'Pulling the bar too high toward the throat, which shifts tension onto the upper traps.',
    ],
    beginnerFriendlyTips: [
      'Practice holding the 45-degree hip-hinge position with an empty barbell for 20 seconds to master spinal alignment.',
      'Keep your gaze fixed on the floor about 1.5 meters in front of your feet to preserve a neutral cervical spine.',
    ],
  },
  {
    id: 'one-arm-dumbbell-rows',
    number: 6,
    name: 'One-arm Dumbbell Rows',
    category: 'Back',
    targetMuscleGroup: 'Unilateral Lats & Upper Back',
    primaryMuscles: ['Latissimus Dorsi', 'Teres Major', 'Rhomboids'],
    secondaryMuscles: ['Posterior Deltoids', 'Biceps Brachii', 'Obliques (Anti-Rotation)'],
    equipmentRequired: 'Dumbbells',
    difficulty: 'Beginner',
    suggestedSetsAndReps: '3–4 Sets × 10–12 Reps / Side',
    recommendedRest: '45–60 seconds between sets',
    shortSummary: 'Unilateral back builder that eliminates left-to-right strength imbalances and allows a deep, supported lat stretch and contraction.',
    startingPosition:
      'Take a split stagger stance and place your non-working hand firmly on a sturdy chair, low table, or your front thigh for support. Hinge your torso nearly parallel to the floor and hold a dumbbell in your working hand at full arm extension.',
    stepByStepInstructions: [
      'Square your shoulders and hips to the floor and brace your core against rotation.',
      'Pull the dumbbell back in a smooth sweeping arc toward your hip pocket, keeping your elbow close to your ribs.',
      'Pause at the top when your upper arm travels slightly past your torso and contract your lat hard.',
      'Lower the dumbbell slowly for 2 seconds back to the bottom stretch position before repeating.',
    ],
    correctMovementTechnique:
      'Think of your hand and forearm as simple hooks attached to the dumbbell while your elbow drives backward toward your hip crease. Do not twist your spine open to lift the weight higher.',
    breathingInstructions:
      'Exhale as you drive your elbow back toward your hip; inhale deeply as you lower the dumbbell into a controlled lat stretch.',
    commonMistakesToAvoid: [
      'Pulling the dumbbell straight up toward the shoulder joint (like a bicep curl) instead of back toward the hip.',
      'Rotating the torso wildly to swing heavy weights.',
      'Collapsing the supporting shoulder instead of pushing actively through the support hand.',
    ],
    beginnerFriendlyTips: [
      'Always train your weaker side first and match the exact same number of clean repetitions on your stronger side.',
      'Imagine sawing wood in a diagonal backward path rather than lifting vertically.',
    ],
  },
  {
    id: 'dumbbell-reverse-fly',
    number: 7,
    name: 'Dumbbell Reverse Fly',
    category: 'Back',
    targetMuscleGroup: 'Rear Deltoids, Rhomboids & Upper Back Posture',
    primaryMuscles: ['Posterior Deltoids', 'Rhomboids', 'Middle Trapezius'],
    secondaryMuscles: ['Infraspinatus', 'Teres Minor', 'Spinal Erectors'],
    equipmentRequired: 'Dumbbells',
    difficulty: 'Beginner',
    suggestedSetsAndReps: '3 Sets × 12–15 Reps',
    recommendedRest: '45 seconds between sets',
    shortSummary: 'Targeted upper-back and posterior deltoid isolation movement essential for shoulder posture and balanced pulling symmetry.',
    startingPosition:
      'Stand with feet hip-width apart holding a pair of light dumbbells. Hinge forward at the hips until your torso is nearly parallel to the floor (75–80°), let the dumbbells hang beneath your chest with palms facing each other, and keep a soft 15-degree bend in your elbows.',
    stepByStepInstructions: [
      'Fix the slight bend in your elbows and brace your core so your spine stays completely flat.',
      'Raise both dumbbells out to the sides in a wide sweeping arc until your upper arms are in line with your back.',
      'Squeeze your rear deltoids and shoulder blades together at the top for a 1-second hold.',
      'Lower the dumbbells slowly along the same wide arc without letting them swing together at the bottom.',
    ],
    correctMovementTechnique:
      'Maintain the exact same soft elbow angle from start to finish so the movement stays a pure horizontal abduction fly rather than turning into a bent-arm press or shrug.',
    breathingInstructions:
      'Exhale as you sweep your arms out wide to shoulder level; inhale slowly as you lower the dumbbells back under your chest.',
    commonMistakesToAvoid: [
      'Using excessive weight that forces you to bounce your torso or swing the dumbbells.',
      'Shrugging the upper traps toward the neck instead of keeping shoulders depressed.',
      'Bending and straightening the elbows mid-rep.',
    ],
    beginnerFriendlyTips: [
      'Start with very light dumbbells (3–6 KG) to truly feel the small rear deltoid and rhomboid muscles working.',
      'Lead the movement with the backs of your wrists and pinkies.',
    ],
  },
  {
    id: 'barbell-deadlift',
    number: 8,
    name: 'Barbell Deadlift',
    category: 'Back',
    targetMuscleGroup: 'Posterior Chain, Lower Back & Traps',
    primaryMuscles: ['Erector Spinae', 'Gluteus Maximus', 'Hamstrings', 'Latissimus Dorsi'],
    secondaryMuscles: ['Trapezius', 'Quadriceps', 'Forearm Flexors', 'Core Stabilizers'],
    equipmentRequired: 'Barbell',
    difficulty: 'Advanced',
    suggestedSetsAndReps: '4 Sets × 6–8 Reps',
    recommendedRest: '75–90 seconds between sets',
    shortSummary: 'The premier full-body posterior chain strength lift for building total back resilience, hip drive, and grip power.',
    startingPosition:
      'Stand with your mid-foot directly beneath the barbell, feet hip-width apart. Hinge at the hips and bend your knees to grip the bar just outside your shins. Drop your hips until your shins touch the bar, lift your chest to flatten your back, and pull the slack out of the bar.',
    stepByStepInstructions: [
      'Engage your lats by imagining squeezing oranges in your armpits and brace your abs with a full breath.',
      'Push the floor away with your legs while keeping the barbell dragging lightly up your shins.',
      'Once the bar passes your knees, drive your hips forward decisively to meet the bar into a tall standing lockout.',
      'Return the barbell to the floor by hinging your hips backward first, then bending your knees once the bar clears your kneecaps.',
    ],
    correctMovementTechnique:
      'The barbell must travel in a strictly vertical straight line over your mid-foot. Your hips and shoulders should rise at the exact same speed off the floor.',
    breathingInstructions:
      'Take a deep diaphragmatic breath at the bottom to pressurize your abdomen, hold the brace through the sticking point, exhale at the standing lockout, and reset each rep.',
    commonMistakesToAvoid: [
      'Allowing the barbell to drift forward away from the shins, which multiplies shear stress on the lumbar spine.',
      'Rounding the lower or middle back off the floor.',
      'Hyperextending or leaning backward excessively at the top lockout.',
    ],
    beginnerFriendlyTips: [
      'Perform 1–2 warm-up sets focusing purely on keeping the bar touching your shins and thighs.',
      'Reset cleanly on the floor between repetitions rather than bouncing the plates.',
    ],
  },

  /* ==========================================================================
     SHOULDERS (Exercises 9 – 12)
     ========================================================================== */
  {
    id: 'dumbbell-shoulder-press',
    number: 9,
    name: 'Dumbbell Shoulder Press',
    category: 'Shoulders',
    targetMuscleGroup: 'Anterior & Medial Deltoids',
    primaryMuscles: ['Anterior Deltoids', 'Medial Deltoids'],
    secondaryMuscles: ['Triceps Brachii', 'Upper Trapezius', 'Serratus Anterior'],
    equipmentRequired: 'Dumbbells',
    difficulty: 'Intermediate',
    suggestedSetsAndReps: '3–4 Sets × 10 Reps',
    recommendedRest: '60 seconds between sets',
    shortSummary: 'Primary overhead dumbbell compound lift for building well-rounded deltoid mass and independent left/right pressing stability.',
    startingPosition:
      'Stand tall with feet shoulder-width apart (or sit upright) holding two dumbbells at ear height. Position your elbows slightly forward of your torso (about a 30-degree scapular plane angle) with palms facing forward.',
    stepByStepInstructions: [
      'Squeeze your glutes and brace your abs so your lower ribcage stays stacked directly over your pelvis.',
      'Press both dumbbells vertically overhead in a slight inward arc until your arms are fully extended above your shoulders.',
      'Hold the overhead lockout for a split second with biceps aligned near your ears.',
      'Lower the dumbbells smoothly for 2 seconds back to ear height before initiating the next press.',
    ],
    correctMovementTechnique:
      'Pressing in the natural 30-degree scapular plane (elbows slightly forward rather than pinned 90 degrees straight out to the sides) maximizes shoulder joint comfort and force output.',
    breathingInstructions:
      'Exhale steadily as you press the dumbbells past your forehead to overhead lockout; inhale as you control the weights back down to shoulder level.',
    commonMistakesToAvoid: [
      'Arching the lower back excessively to turn the overhead press into a standing incline chest press.',
      'Clanging the dumbbells together at the top, which can destabilize the wrist and shoulder.',
      'Stopping the descent at forehead level instead of lowering to chin/ear height.',
    ],
    beginnerFriendlyTips: [
      'Stagger one foot slightly behind the other if you tend to lean backward when standing.',
      'Keep your glutes squeezed tightly throughout the entire set to protect your lumbar spine.',
    ],
  },
  {
    id: 'dumbbell-lateral-raises',
    number: 10,
    name: 'Dumbbell Lateral Raises',
    category: 'Shoulders',
    targetMuscleGroup: 'Medial (Side) Deltoids',
    primaryMuscles: ['Medial Deltoids'],
    secondaryMuscles: ['Anterior Deltoids', 'Supraspinatus', 'Upper Trapezius'],
    equipmentRequired: 'Dumbbells',
    difficulty: 'Beginner',
    suggestedSetsAndReps: '3–4 Sets × 12–15 Reps',
    recommendedRest: '45 seconds between sets',
    shortSummary: 'The essential isolation exercise for targeting the lateral deltoid head to create athletic V-taper shoulder width.',
    startingPosition:
      'Stand tall with feet hip-width apart, holding a pair of dumbbells at your sides or slightly in front of your outer thighs with palms facing inward and a soft 15-degree bend in your elbows.',
    stepByStepInstructions: [
      'Depress your shoulder blades down away from your ears and incline your torso forward just 5 degrees.',
      'Raise both arms out to the sides in a wide arc, leading with your elbows until the dumbbells reach shoulder height.',
      'Pause for 1 second at the top when your arms are parallel to the floor.',
      'Lower the dumbbells slowly for 2–3 seconds back to your sides, stopping just before they rest against your thighs to keep tension on the delts.',
    ],
    correctMovementTechnique:
      'Think about pushing the dumbbells away toward the side walls rather than lifting them straight up toward your ears. This keeps the upper traps quiet and places 100% of the load on the medial deltoids.',
    breathingInstructions:
      'Exhale as you lift the dumbbells up to shoulder level; inhale slowly during the controlled lowering phase.',
    commonMistakesToAvoid: [
      'Swinging the hips and knees to heave heavy dumbbells upward.',
      'Shrugging the shoulders high toward the ears at the start of the raise.',
      'Bending the elbows to 90 degrees, which shortens the lever arm and reduces side-delt tension.',
    ],
    beginnerFriendlyTips: [
      'Strict form with lighter dumbbells (4–8 KG) builds far better shoulder width than swinging heavy weights.',
      'Keep your wrists straight and neutral rather than twisting your thumbs high upward.',
    ],
  },
  {
    id: 'dumbbell-front-raises',
    number: 11,
    name: 'Dumbbell Front Raises',
    category: 'Shoulders',
    targetMuscleGroup: 'Anterior (Front) Deltoids',
    primaryMuscles: ['Anterior Deltoids'],
    secondaryMuscles: ['Pectoralis Major (Clavicular Upper Chest)', 'Medial Deltoids', 'Serratus Anterior'],
    equipmentRequired: 'Dumbbells',
    difficulty: 'Beginner',
    suggestedSetsAndReps: '3 Sets × 12 Reps',
    recommendedRest: '45 seconds between sets',
    shortSummary: 'Controlled anterior shoulder isolation exercise that sculpts the front deltoid tie-in and upper-chest separation.',
    startingPosition:
      'Stand upright with feet shoulder-width apart, holding a pair of dumbbells in front of your thighs with an overhand (pronated) or neutral hammer grip and a slight soft bend in your elbows.',
    stepByStepInstructions: [
      'Brace your core and lock your torso upright so you cannot rock forward or backward.',
      'Raise the dumbbells smoothly in front of your body until your hands reach eye/shoulder height (parallel to the floor).',
      'Hold the peak contraction at shoulder height for 1 full second.',
      'Lower the dumbbells under strict 2-second control back to the starting position just in front of your thighs.',
    ],
    correctMovementTechnique:
      'Stop the upward travel once your arms are parallel to the floor; lifting higher than eye level shifts work from the anterior deltoids onto the traps and can impinge the shoulder.',
    breathingInstructions:
      'Exhale smoothly as you raise the dumbbells to eye level; inhale as you resist gravity on the way down.',
    commonMistakesToAvoid: [
      'Rocking the upper body backward to swing the weights up.',
      'Dropping the dumbbells rapidly from the top instead of controlling the eccentric phase.',
      'Raising the weights far above head level.',
    ],
    beginnerFriendlyTips: [
      'If you feel your lower back swaying, alternate one arm at a time (Alternating Front Raises) for superior trunk stability.',
      'A neutral hammer grip (thumbs pointing up) is gentler on the shoulder joint for beginners.',
    ],
  },
  {
    id: 'barbell-overhead-press',
    number: 12,
    name: 'Barbell Overhead Press',
    category: 'Shoulders',
    targetMuscleGroup: 'Full Deltoid Girdle, Triceps & Upper Chest',
    primaryMuscles: ['Anterior Deltoids', 'Medial Deltoids'],
    secondaryMuscles: ['Triceps Brachii', 'Upper Pectorals', 'Upper Trapezius', 'Core & Glutes'],
    equipmentRequired: 'Barbell',
    difficulty: 'Advanced',
    suggestedSetsAndReps: '4 Sets × 8 Reps',
    recommendedRest: '75 seconds between sets',
    shortSummary: 'Classic standing barbell military press for building raw overhead pushing strength and full-body core rigidity.',
    startingPosition:
      'Stand with feet hip-width apart holding a barbell across your upper chest/collarbone with a grip slightly wider than shoulder-width. Point your elbows slightly forward in front of the bar and stack your wrists vertically.',
    stepByStepInstructions: [
      'Squeeze your quads, glutes, and abdominals tightly to turn your lower body into a solid pillar.',
      'Tuck your chin back slightly so the barbell can press straight up past your face in a vertical line.',
      'Once the barbell clears your forehead, push your head slightly forward ("through the window") and lock your elbows out overhead.',
      'Lower the barbell under control along the exact same vertical path back to your upper chest/clavicle.',
    ],
    correctMovementTechnique:
      'Keep the bar path as close to your face as safely possible so the load remains balanced directly over your mid-foot and shoulder joints.',
    breathingInstructions:
      'Inhale and brace your core while the bar rests on your collarbone; exhale near the top of the overhead lockout, and inhale again as you lower the bar.',
    commonMistakesToAvoid: [
      'Pressing the barbell forward in a wide loop around the face instead of tucking the chin back.',
      'Using knee bend (push-pressing) when performing strict overhead presses.',
      'Flaring the ribs and overarching the lower spine.',
    ],
    beginnerFriendlyTips: [
      'Master the vertical bar path and chin-tuck timing with an empty barbell before adding weight plates.',
      'Grip the bar tightly in the heel of your palm to prevent your wrists from bending backward.',
    ],
  },

  /* ==========================================================================
     ARMS (Exercises 13 – 16)
     ========================================================================== */
  {
    id: 'dumbbell-bicep-curls',
    number: 13,
    name: 'Dumbbell Bicep Curls',
    category: 'Arms',
    targetMuscleGroup: 'Biceps Brachii & Forearms',
    primaryMuscles: ['Biceps Brachii (Long & Short Heads)'],
    secondaryMuscles: ['Brachialis', 'Brachioradialis', 'Forearm Flexors'],
    equipmentRequired: 'Dumbbells',
    difficulty: 'Beginner',
    suggestedSetsAndReps: '3–4 Sets × 12 Reps',
    recommendedRest: '45 seconds between sets',
    shortSummary: 'Supinated dumbbell curl that develops bicep peak contraction and balanced arm strength.',
    startingPosition:
      'Stand tall with feet hip-width apart holding a dumbbell in each hand at arm’s length by your sides. Pin your elbows gently against your ribcage with palms facing forward (or neutral at the start before supinating).',
    stepByStepInstructions: [
      'Keep your upper arms completely stationary and perpendicular to the floor.',
      'Curl the dumbbells upward by flexing at the elbows while rotating (supinating) your palms so your pinkies turn slightly upward.',
      'Squeeze your biceps hard at shoulder height for 1 full second without letting your elbows drift forward.',
      'Lower the dumbbells slowly for 2–3 seconds until your arms are fully extended at the bottom.',
    ],
    correctMovementTechnique:
      'Only your forearms should move. Keeping your elbows glued to your sides prevents the front deltoids from taking over the load.',
    breathingInstructions:
      'Exhale as you curl the dumbbells up to peak contraction; inhale steadily as you lower them to full extension.',
    commonMistakesToAvoid: [
      'Swinging the lower back and hips to launch the dumbbells upward.',
      'Driving the elbows forward in front of the ribs to rest the weight at the top.',
      'Cutting repetitions short at the bottom instead of extending the elbow fully.',
    ],
    beginnerFriendlyTips: [
      'Stand with your upper back and glutes lightly touching a wall to eliminate all body swing.',
      'Focus on turning your pinky finger slightly higher than your thumb at the top for maximum bicep supination.',
    ],
  },
  {
    id: 'barbell-curls',
    number: 14,
    name: 'Barbell Curls',
    category: 'Arms',
    targetMuscleGroup: 'Biceps Mass & Overall Arm Flexors',
    primaryMuscles: ['Biceps Brachii'],
    secondaryMuscles: ['Brachialis', 'Forearm Flexors', 'Anterior Deltoid (Stabilizer)'],
    equipmentRequired: 'Barbell',
    difficulty: 'Beginner',
    suggestedSetsAndReps: '3–4 Sets × 10–12 Reps',
    recommendedRest: '60 seconds between sets',
    shortSummary: 'Classic bilateral barbell arm builder that allows progressive overload across both biceps simultaneously.',
    startingPosition:
      'Stand upright with feet shoulder-width apart holding a barbell with an underhand (supinated) grip at shoulder width. Let the bar rest against your upper thighs with arms extended and elbows tucked against your sides.',
    stepByStepInstructions: [
      'Brace your abs and glutes, pull your shoulders back into good posture, and lock your elbows at your sides.',
      'Curl the barbell upward in a smooth semicircular arc toward your upper chest by contracting your biceps.',
      'Hold the peak contraction at the top for 1 second while keeping your wrists straight and firm.',
      'Lower the barbell slowly for 2–3 seconds back down to your thighs until your elbows are extended.',
    ],
    correctMovementTechnique:
      'Keep your wrists neutral or slightly flexed rather than letting them bend backward under the barbell. Maintain constant tension on the biceps from bottom to top.',
    breathingInstructions:
      'Exhale through the sticking point as the bar passes 90 degrees; inhale smoothly during the controlled descent.',
    commonMistakesToAvoid: [
      'Leaning backward at the waist to heave a heavy barbell past the midpoint.',
      'Shrugging the shoulders up as the barbell reaches the top.',
      'Letting the barbell free-fall on the eccentric lowering phase.',
    ],
    beginnerFriendlyTips: [
      'A slightly narrower grip emphasizes the outer (long) head of the biceps, while a slightly wider grip targets the inner (short) head.',
      'Control the lowering phase for 3 full seconds to stimulate rapid arm growth.',
    ],
  },
  {
    id: 'close-grip-push-ups',
    number: 15,
    name: 'Close-grip Push-ups',
    category: 'Arms',
    targetMuscleGroup: 'Triceps Brachii & Inner Chest',
    primaryMuscles: ['Triceps Brachii (Lateral, Medial & Long Heads)'],
    secondaryMuscles: ['Pectoralis Major (Inner Fibers)', 'Anterior Deltoids', 'Core'],
    equipmentRequired: 'Bodyweight (Floor Mat)',
    difficulty: 'Intermediate',
    suggestedSetsAndReps: '3 Sets × 10–15 Reps',
    recommendedRest: '45–60 seconds between sets',
    shortSummary: 'High-tension bodyweight tricep compound exercise that builds horseshoe arm thickness and pressing lockout power.',
    startingPosition:
      'Assume a high plank position with your hands placed narrower than shoulder-width apart (roughly 15–20 cm between thumbs) directly beneath your lower sternum. Brace your glutes and abs.',
    stepByStepInstructions: [
      'Keep your elbows tucked tightly so they brush right past your ribcage as you descend.',
      'Lower your body in a rigid straight line until your lower chest lightly touches the backs of your hands.',
      'Pause briefly at the bottom without letting your elbows flare outward.',
      'Extend your elbows forcefully through the heels of your palms to lock out your triceps at the top.',
    ],
    correctMovementTechnique:
      'Instead of forming a rigid triangle that twists your wrists inward, keep your index fingers pointing straight ahead in a narrow parallel grip—this protects your wrists while keeping 100% of the focus on your triceps.',
    breathingInstructions:
      'Inhale as you lower your chest down onto your hands with elbows grazing your ribs; exhale strongly as you extend your triceps to lockout.',
    commonMistakesToAvoid: [
      'Letting the elbows flare out wide to the sides, which turns the move back into a regular chest push-up.',
      'Placing the hands too high under the face or throat, which strains the wrists and elbows.',
      'Dropping the hips first instead of lowering as a rigid plank.',
    ],
    beginnerFriendlyTips: [
      'If floor close-grip push-ups are too challenging initially, perform them from your knees or with your hands elevated on a low bench while keeping your elbows glued to your ribs.',
      'Squeeze the backs of your arms deliberately for 1 second at every top lockout.',
    ],
  },
  {
    id: 'overhead-triceps-extension',
    number: 16,
    name: 'Overhead Triceps Extension',
    category: 'Arms',
    targetMuscleGroup: 'Triceps Long Head & Arm Thickness',
    primaryMuscles: ['Triceps Brachii (Long Head Emphasis)'],
    secondaryMuscles: ['Anconeus', 'Core & Shoulder Stabilizers'],
    equipmentRequired: 'Dumbbells',
    difficulty: 'Beginner',
    suggestedSetsAndReps: '3 Sets × 12–15 Reps',
    recommendedRest: '45 seconds between sets',
    shortSummary: 'Overhead elbow-extension isolation lift that places the long head of the triceps under a deep, growth-inducing stretch.',
    startingPosition:
      'Stand tall (or sit upright) and hold a single dumbbell vertically overhead with both hands cupped in a diamond shape under the top weight plate. Point your elbows forward near your temples and brace your abs.',
    stepByStepInstructions: [
      'Keep your upper arms vertical and stationary beside your ears.',
      'Lower the dumbbell slowly behind your head by bending only at your elbows until your forearms move past 90 degrees and you feel a deep stretch along your triceps.',
      'Pause for 1 second in the bottom stretched position without flaring your ribs.',
      'Contract your triceps to press the dumbbell straight back overhead to full elbow extension.',
    ],
    correctMovementTechnique:
      'Keep your elbows pointing forward at a 30–45 degree angle rather than letting them splay wide out to the sides. Your upper arms act as fixed hinges while your forearms do all the moving.',
    breathingInstructions:
      'Inhale deeply as you lower the dumbbell behind your head; exhale as you extend your elbows back to the overhead lockout.',
    commonMistakesToAvoid: [
      'Flaring the elbows wide apart during the upward press.',
      'Arching the lower back and jutting the head forward as the weight gets heavy.',
      'Shortening the range of motion by only lowering the weight halfway behind the head.',
    ],
    beginnerFriendlyTips: [
      'Use a staggered foot stance when standing to help prevent your lower back from arching.',
      'Ensure your thumbs wrap securely around the dumbbell handle inside your diamond grip.',
    ],
  },

  /* ==========================================================================
     LEGS & GLUTES (Exercises 17 – 20)
     ========================================================================== */
  {
    id: 'barbell-squats',
    number: 17,
    name: 'Barbell Squats',
    category: 'Legs & Glutes',
    targetMuscleGroup: 'Quadriceps, Glutes & Core',
    primaryMuscles: ['Quadriceps (Vastus Lateralis, Medialis, Rectus Femoris)', 'Gluteus Maximus'],
    secondaryMuscles: ['Hamstrings', 'Adductors', 'Erector Spinae', 'Abdominals'],
    equipmentRequired: 'Barbell',
    difficulty: 'Intermediate',
    suggestedSetsAndReps: '4 Sets × 8–10 Reps',
    recommendedRest: '60–75 seconds between sets',
    shortSummary: 'The cornerstone lower-body compound movement for building powerful quadriceps, strong glutes, and total athletic athleticism.',
    startingPosition:
      'Rest a barbell securely across your upper trapezius shelf (never on the bony neck vertebrae), grip the bar firmly to tighten your upper back, and stand with feet shoulder-width apart and toes turned out 15–30 degrees.',
    stepByStepInstructions: [
      'Take a deep bracing breath into your abdomen, keep your chest proud, and unlock your hips and knees simultaneously.',
      'Sit down between your hips while actively pushing your knees outward in line with your middle toes.',
      'Descend under control until your hip crease reaches parallel (or slightly below) the top of your knees.',
      'Drive evenly through your entire foot (tripod foot contact) to stand tall and squeeze your glutes at the top.',
    ],
    correctMovementTechnique:
      'Maintain balanced mid-foot pressure from top to bottom—never let your heels lift off the floor or let your knees cave inward (knee valgus) as you drive out of the bottom.',
    breathingInstructions:
      'Inhale deeply and brace your trunk before descending; hold your abdominal brace through the bottom turnaround, and exhale forcefully as you pass the sticking point on the way up.',
    commonMistakesToAvoid: [
      'Letting the knees collapse inward toward each other during the upward drive.',
      'Shifting weight onto the toes and allowing the heels to lift off the floor.',
      'Folding the chest forward before the hips rise ("good-morning squat").',
    ],
    beginnerFriendlyTips: [
      'Warm up with 10 bodyweight squats holding the bottom position for 3 seconds to open up your ankles and hips.',
      'If ankle mobility limits your depth, placing thin 1.25 kg weight plates under your heels can immediately improve your torso uprightness.',
    ],
  },
  {
    id: 'dumbbell-lunges',
    number: 18,
    name: 'Dumbbell Lunges',
    category: 'Legs & Glutes',
    targetMuscleGroup: 'Unilateral Quadriceps, Glutes & Balance',
    primaryMuscles: ['Quadriceps', 'Gluteus Maximus', 'Gluteus Medius'],
    secondaryMuscles: ['Hamstrings', 'Calves', 'Core & Hip Stabilizers'],
    equipmentRequired: 'Dumbbells (or Bodyweight)',
    difficulty: 'Beginner',
    suggestedSetsAndReps: '3 Sets × 10–12 Reps / Leg',
    recommendedRest: '60 seconds between sets',
    shortSummary: 'Dynamic single-leg compound exercise that builds balanced leg strength, hip stability, and athletic coordination.',
    startingPosition:
      'Stand tall with feet hip-width apart holding a dumbbell in each hand at arm’s length by your sides. Pull your shoulder blades back, keep your chest upright, and look straight ahead.',
    stepByStepInstructions: [
      'Step forward (or backward) with one leg about 60–75 cm while keeping your feet on hip-width "railroad tracks" rather than a tightrope.',
      'Lower your hips straight down until both your front and rear knees form roughly 90-degree angles, with your back knee hovering 2–3 cm above the floor.',
      'Ensure your front shin remains nearly vertical and your front knee tracks directly over your middle toes.',
      'Push forcefully through the heel and mid-foot of your front leg to return to the standing starting position.',
    ],
    correctMovementTechnique:
      'Think of lunges as an elevator going straight down and straight up once your foot lands, rather than an escalator sliding forward over your toes.',
    breathingInstructions:
      'Inhale as you step and lower your hips into the bottom lunge; exhale powerfully as you drive through your front heel to stand back up.',
    commonMistakesToAvoid: [
      'Stepping on a narrow tightrope line, which causes wobbling and loss of balance.',
      'Banging the back knee hard against the floor on every repetition.',
      'Allowing the torso to slump forward over the front thigh.',
    ],
    beginnerFriendlyTips: [
      'Reverse lunges (stepping backward instead of forward) are much gentler on the knees and easier to balance when learning the movement.',
      'Master 12 clean bodyweight lunges per leg before holding dumbbells.',
    ],
  },
  {
    id: 'dumbbell-romanian-deadlift',
    number: 19,
    name: 'Dumbbell Romanian Deadlift',
    category: 'Legs & Glutes',
    targetMuscleGroup: 'Hamstrings, Glutes & Hip Hinge',
    primaryMuscles: ['Hamstrings (Biceps Femoris, Semitendinosus)', 'Gluteus Maximus'],
    secondaryMuscles: ['Erector Spinae', 'Adductor Magnus', 'Forearms & Upper Back'],
    equipmentRequired: 'Dumbbells',
    difficulty: 'Intermediate',
    suggestedSetsAndReps: '3–4 Sets × 10–12 Reps',
    recommendedRest: '60 seconds between sets',
    shortSummary: 'Pure hip-hinge posterior chain movement that isolates the hamstrings and glutes under an intense loaded stretch.',
    startingPosition:
      'Stand tall with feet hip-width apart holding a pair of dumbbells in front of your thighs with an overhand grip. Unlock your knees into a soft 15-degree bend and retract your shoulder blades.',
    stepByStepInstructions: [
      'Keep your soft knee bend fixed and push your hips straight backward as if trying to close a car door behind you with your glutes.',
      'Slide the dumbbells closely down the front of your thighs and shins while keeping your back flat and lats engaged.',
      'Stop lowering as soon as your hips can no longer travel backward (typically mid-shin level) and you feel a deep hamstring stretch.',
      'Drive your hips forward and squeeze your glutes to return to the tall standing position.',
    ],
    correctMovementTechnique:
      'An RDL is a horizontal hip movement, not a vertical squat. The moment your hips stop moving backward, your range of motion is complete—lowering any further only rounds your lower back.',
    breathingInstructions:
      'Inhale deeply as you push your hips back and slide the dumbbells down your legs; exhale as you drive your hips forward to stand tall.',
    commonMistakesToAvoid: [
      'Bending the knees progressively deeper and turning the hinge into a squat.',
      'Letting the dumbbells drift out away from the legs instead of shaving the thighs and shins.',
      'Rounding the lower back to force the dumbbells all the way to the floor.',
    ],
    beginnerFriendlyTips: [
      'Stand 25 cm in front of a wall and practice pushing your glutes straight back until they tap the wall with a flat spine.',
      'Keep the dumbbells touching or within 2 cm of your legs at all times.',
    ],
  },
  {
    id: 'calf-raises',
    number: 20,
    name: 'Calf Raises',
    category: 'Legs & Glutes',
    targetMuscleGroup: 'Gastrocnemius, Soleus & Ankle Stability',
    primaryMuscles: ['Gastrocnemius', 'Soleus'],
    secondaryMuscles: ['Tibialis Posterior', 'Foot & Ankle Stabilizers'],
    equipmentRequired: 'Bodyweight or Dumbbells',
    difficulty: 'Beginner',
    suggestedSetsAndReps: '3–4 Sets × 15–20 Reps',
    recommendedRest: '30–45 seconds between sets',
    shortSummary: 'Targeted lower-leg and ankle plantarflexion exercise for calf muscle definition, Achilles resilience, and lower-limb stability.',
    startingPosition:
      'Stand tall with feet hip-width apart on a flat floor (or with the balls of your feet on a low threshold/plate), holding dumbbells at your sides or placing one hand lightly against a wall for balance.',
    stepByStepInstructions: [
      'Keep your knees straight (but not hyperextended) and distribute weight evenly across the ball of your big toe and second toe.',
      'Press powerfully through the balls of your feet to raise your heels as high off the floor as possible.',
      'Hold the peak tiptoe contraction at the top for a strict 2-second count, squeezing your calves hard.',
      'Lower your heels slowly for 2 seconds back to the floor and immediately begin the next repetition.',
    ],
    correctMovementTechnique:
      'The Achilles tendon is extremely elastic and will bounce the weight for you if you move quickly. A deliberate 2-second pause at the top and a slow lowering phase are mandatory to force the calf muscles to do the work.',
    breathingInstructions:
      'Exhale as you rise onto the balls of your feet and hold the peak squeeze; inhale as you lower your heels slowly.',
    commonMistakesToAvoid: [
      'Bouncing rapidly up and down with zero pause at the top.',
      'Rolling outward onto the pinky toes at the top of the raise, which risks ankle sprains.',
      'Bending the knees to bounce the body upward.',
    ],
    beginnerFriendlyTips: [
      'Once 20 two-legged bodyweight reps feel easy, hold a dumbbell or perform Single-Leg Calf Raises to double the resistance on each calf.',
      'Focus on pushing straight through your big-toe joint at peak height.',
    ],
  },

  /* ==========================================================================
     CORE (Exercises 21 – 24)
     ========================================================================== */
  {
    id: 'plank',
    number: 21,
    name: 'Plank',
    category: 'Core',
    targetMuscleGroup: 'Deep Core, Transverse Abdominis & Obliques',
    primaryMuscles: ['Transverse Abdominis', 'Rectus Abdominis'],
    secondaryMuscles: ['Internal & External Obliques', 'Glutes', 'Quadriceps', 'Serratus Anterior'],
    equipmentRequired: 'Floor Mat',
    difficulty: 'Beginner',
    suggestedSetsAndReps: '3 Sets × 45–60s Hold',
    recommendedRest: '30–45 seconds between sets',
    shortSummary: 'The gold-standard isometric anti-extension core exercise for building 360-degree trunk rigidity and spinal protection.',
    startingPosition:
      'Lie face down on an exercise mat and prop yourself up on your forearms and toes. Stack your elbows directly beneath your shoulders with forearms parallel, and keep your feet hip-width apart.',
    stepByStepInstructions: [
      'Push your forearms actively into the mat to spread your shoulder blades apart.',
      'Tuck your tailbone slightly under (posterior pelvic tilt) by squeezing your glutes and tightening your quadriceps.',
      'Draw your lower ribs toward your hips to engage your entire abdominal wall.',
      'Hold this rock-solid straight line from head to heels for the prescribed time while breathing smoothly.',
    ],
    correctMovementTechnique:
      'An effective plank is an active full-body contraction, not a passive waiting game. Actively try to pull your elbows backward toward your toes (without actually moving them) to double abdominal activation.',
    breathingInstructions:
      'Never hold your breath during a plank; take controlled, shallow breaths in through your nose and out through pursed lips while keeping your abs braced.',
    commonMistakesToAvoid: [
      'Allowing the hips and lower back to sag toward the mat as fatigue sets in.',
      'Piking the hips high into the air like a tent to take tension off the abs.',
      'Looking up forward and straining the neck instead of gazing down between the forearms.',
    ],
    beginnerFriendlyTips: [
      'Three high-tension 30-second planks with perfect posterior pelvic tilt are far more effective than a sloppy 2-minute plank with a sagging lower back.',
      'Widen your feet slightly to shoulder-width for extra stability while building core endurance.',
    ],
  },
  {
    id: 'leg-raises',
    number: 22,
    name: 'Leg Raises',
    category: 'Core',
    targetMuscleGroup: 'Lower Abdominals & Hip Flexor Control',
    primaryMuscles: ['Rectus Abdominis (Lower Fibers)', 'Transverse Abdominis'],
    secondaryMuscles: ['Iliopsoas (Hip Flexors)', 'Obliques', 'Rectus Femoris'],
    equipmentRequired: 'Floor Mat',
    difficulty: 'Intermediate',
    suggestedSetsAndReps: '3 Sets × 12–15 Reps',
    recommendedRest: '30–45 seconds between sets',
    shortSummary: 'Supine floor core exercise that strengthens the lower abdominal wall and teaches strict pelvic-lumbar control.',
    startingPosition:
      'Lie flat on your back on a floor mat with your legs extended together. Place your hands palms-down alongside your hips (or lightly under the outer edges of your glutes) and press your lower back firmly into the mat.',
    stepByStepInstructions: [
      'Flatten your lumbar spine against the mat so there is zero gap between your lower back and the floor.',
      'Keep your legs straight (or with a slight knee micro-bend) and lift them together until your soles point toward the ceiling at 90 degrees.',
      'Curl your tailbone up just 2 cm at the top to fully contract your lower abdominals.',
      'Lower your legs slowly for 3 seconds down toward the floor, stopping 5–10 cm above the mat before your lower back can arch.',
    ],
    correctMovementTechnique:
      'Your lower back must remain glued to the floor mat throughout the entire lowering phase. The moment you feel your lower back starting to peel up off the mat, stop lowering and raise your legs back up.',
    breathingInstructions:
      'Exhale forcefully as you raise your legs and curl your pelvis at the top; inhale slowly while maintaining abdominal bracing as your legs descend.',
    commonMistakesToAvoid: [
      'Letting the lower back arch high off the mat as the legs approach the floor, which shifts strain to the lumbar spine.',
      'Swinging the legs up and down with momentum.',
      'Dropping the heels onto the floor to rest between every repetition.',
    ],
    beginnerFriendlyTips: [
      'If straight legs cause your lower back to arch off the floor, bend your knees to 45 degrees (Bent-Knee Reverse Crunches) to shorten the lever arm while mastering pelvic control.',
      'Lift your head and shoulders 2 cm off the mat to help keep your lower back pressed flat.',
    ],
  },
  {
    id: 'bicycle-crunches',
    number: 23,
    name: 'Bicycle Crunches',
    category: 'Core',
    targetMuscleGroup: 'Obliques & Rectus Abdominis Rotation',
    primaryMuscles: ['Internal & External Obliques', 'Rectus Abdominis'],
    secondaryMuscles: ['Transverse Abdominis', 'Hip Flexors'],
    equipmentRequired: 'Floor Mat',
    difficulty: 'Beginner',
    suggestedSetsAndReps: '3 Sets × 20 Reps (10 / Side)',
    recommendedRest: '30–45 seconds between sets',
    shortSummary: 'Rotational abdominal exercise that simultaneously targets the upper abs, lower abs, and internal/external obliques.',
    startingPosition:
      'Lie flat on your back on a floor mat. Press your lower back into the floor, lift your knees to a 90-degree tabletop angle, and touch your fingertips lightly behind your ears with elbows wide.',
    stepByStepInstructions: [
      'Lift your shoulder blades off the mat and extend your right leg straight out at a 45-degree angle above the floor.',
      'Simultaneously rotate your upper torso to bring your right shoulder and elbow across toward your bent left knee.',
      'Pause for a 1-second oblique squeeze at the point of rotation without yanking on your neck.',
      'Switch sides smoothly in a pedaling motion, extending your left leg while rotating your left shoulder toward your right knee.',
    ],
    correctMovementTechnique:
      'Think "shoulder-to-knee" rather than "elbow-to-knee." Rotating your ribcage and shoulder blade off the mat activates the obliques, whereas pulling your elbows inward only strains your neck.',
    breathingInstructions:
      'Exhale sharply at each rotational crunch contraction; inhale briefly during the transition across the midline.',
    commonMistakesToAvoid: [
      'Interlacing the fingers behind the head and pulling forcefully on the neck.',
      'Pedaling the legs frantically without rotating the shoulders and ribcage.',
      'Keeping both shoulder blades resting flat on the floor while just waving the elbows.',
    ],
    beginnerFriendlyTips: [
      'Slow the tempo down to a deliberate 1-second pause on each side—slow bicycle crunches burn the obliques far more effectively than fast pedaling.',
      'Extend your straight leg higher toward the ceiling (60 degrees) if your lower back starts to lift off the mat.',
    ],
  },
  {
    id: 'mountain-climbers',
    number: 24,
    name: 'Mountain Climbers',
    category: 'Core',
    targetMuscleGroup: 'Dynamic Core, Hip Flexors & Conditioning',
    primaryMuscles: ['Rectus Abdominis', 'Obliques', 'Hip Flexors'],
    secondaryMuscles: ['Anterior Deltoids', 'Triceps', 'Serratus Anterior', 'Cardiovascular System'],
    equipmentRequired: 'Floor Mat',
    difficulty: 'Intermediate',
    suggestedSetsAndReps: '3 Sets × 40s Timed Effort',
    recommendedRest: '30–45 seconds between sets',
    shortSummary: 'High-energy dynamic plank variation that combines anti-extension core stability with athletic conditioning.',
    startingPosition:
      'Start in a strong high plank position with your hands stacked directly beneath your shoulders, arms straight, abs braced, and feet hip-width apart on the floor.',
    stepByStepInstructions: [
      'Lock your shoulders directly over your wrists and flatten your back from head to heels.',
      'Drive one knee rapidly forward under your chest while keeping your other leg extended and toes anchored.',
      'Return the front foot back to the plank starting position while simultaneously driving the opposite knee forward.',
      'Continue alternating knees in a crisp, rhythmic running motion while keeping your hips level and low.',
    ],
    correctMovementTechnique:
      'Keep your shoulders stacked vertically over your wrists at all times; do not let your upper body drift backward behind your hands as your knees drive forward.',
    breathingInstructions:
      'Maintain a steady, rhythmic athletic breathing pattern (inhale for 2 knee drives, exhale for 2 knee drives) without holding your breath.',
    commonMistakesToAvoid: [
      'Bouncing the hips high up and down in the air on every step.',
      'Letting the shoulders drift backward toward a downward-dog angle.',
      'Tapping the front toes heavily on the floor under the chest instead of floating the knee with core control.',
    ],
    beginnerFriendlyTips: [
      'Start with a controlled "Slow Tempo March" (pausing 1 second with each knee tucked under your chest) before building up to a fast running cadence.',
      'Elevate your hands on a sturdy bench if wrist comfort or core endurance is still developing.',
    ],
  },
];
