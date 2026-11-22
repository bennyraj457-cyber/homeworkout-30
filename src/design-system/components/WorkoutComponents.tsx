import React, { useState } from 'react';
import {
  Clock,
  Plus,
  Minus,
  Play,
  Pause,
  RotateCcw,
  Check,
  SkipForward,
  Trophy,
  Dumbbell,
  Share2,
  CheckCircle2,
} from 'lucide-react';
import { Button, IconButton } from './Buttons';

/* ==========================================================================
   1. WORKOUT DURATION INDICATOR
   ========================================================================== */
export interface WorkoutDurationIndicatorProps {
  elapsedMinutes?: number;
  totalMinutes?: number;
  currentPhase?: string;
}

export const WorkoutDurationIndicator: React.FC<WorkoutDurationIndicatorProps> = ({
  elapsedMinutes = 18,
  totalMinutes = 30,
  currentPhase = 'Compound Strength Block',
}) => {
  const remaining = Math.max(0, totalMinutes - elapsedMinutes);

  return (
    <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-4 shadow-hf-xs flex items-center justify-between gap-4">
      <div className="flex items-center gap-3.5">
        <div className="w-12 h-12 rounded-[10px] bg-[#FEF2F2] border border-[#FECACA] flex flex-col items-center justify-center text-[#E53935]">
          <Clock className="w-4 h-4 mb-0.5" strokeWidth={2.25} />
          <span className="font-mono tabular-nums text-[11px] font-extrabold leading-none">
            {totalMinutes}M
          </span>
        </div>
        <div>
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-[#E53935]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E53935] animate-pulse" />
              Fixed 30-Min Format
            </span>
          </div>
          <h4 className="text-[16px] font-bold text-[#111827] mt-0.5">
            {currentPhase}
          </h4>
          <p className="text-[12px] font-medium text-[#6B7280]">
            {elapsedMinutes} min elapsed • {remaining} min remaining
          </p>
        </div>
      </div>

      <div className="text-right">
        <span className="block text-[10px] font-semibold uppercase tracking-wider text-[#6B7280]">
          Session Clock
        </span>
        <span className="font-mono tabular-nums text-[22px] font-extrabold text-[#111827]">
          {String(elapsedMinutes).padStart(2, '0')}:00
          <span className="text-[14px] font-semibold text-[#6B7280]">
            /{totalMinutes}:00
          </span>
        </span>
      </div>
    </div>
  );
};

/* ==========================================================================
   2. EXERCISE REPETITION COUNTER
   ========================================================================== */
export interface ExerciseRepCounterProps {
  initialReps?: number;
  targetReps?: number;
  exerciseName?: string;
}

export const ExerciseRepCounter: React.FC<ExerciseRepCounterProps> = ({
  initialReps = 10,
  targetReps = 10,
  exerciseName = 'Barbell Squat',
}) => {
  const [reps, setReps] = useState(initialReps);

  const isTargetMet = reps >= targetReps;

  return (
    <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-5 shadow-hf-xs">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-[0.05em] text-[#6B7280] block">
            Repetition Logger
          </span>
          <h4 className="text-[16px] font-bold text-[#111827]">{exerciseName}</h4>
        </div>
        <span
          className={`px-2.5 py-1 rounded-[6px] text-[11px] font-bold uppercase tracking-wider ${
            isTargetMet
              ? 'bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]'
              : 'bg-[#FEF2F2] text-[#E53935] border border-[#FECACA]'
          }`}
        >
          Target: {targetReps} Reps
        </span>
      </div>

      <div className="flex items-center justify-between gap-4 py-3 px-4 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB]">
        <IconButton
          label="Decrease repetitions"
          variant="outline"
          size="lg"
          onClick={() => setReps((r) => Math.max(0, r - 1))}
          icon={<Minus className="w-5 h-5" strokeWidth={2.5} />}
        />

        <div className="text-center">
          <div className="font-mono tabular-nums text-[42px] leading-none font-extrabold text-[#111827]">
            {reps}
          </div>
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#6B7280] mt-1 block">
            Completed Reps
          </span>
        </div>

        <IconButton
          label="Increase repetitions"
          variant="primary"
          size="lg"
          onClick={() => setReps((r) => r + 1)}
          icon={<Plus className="w-5 h-5" strokeWidth={2.5} />}
        />
      </div>

      {/* Quick Preset Pills */}
      <div className="flex items-center justify-between gap-2 mt-3">
        {[8, 10, 12, 15].map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => setReps(preset)}
            className={`flex-1 py-1.5 rounded-[6px] font-mono tabular-nums text-[12px] font-bold border transition-colors ${
              reps === preset
                ? 'bg-[#FEF2F2] border-[#E53935] text-[#E53935]'
                : 'bg-white border-[#E5E7EB] text-[#4B5563] hover:bg-[#F8FAFC]'
            }`}
          >
            {preset} Reps
          </button>
        ))}
      </div>
    </div>
  );
};

/* ==========================================================================
   3. WORKOUT PROGRESS BAR (Segmented 30-Minute Timeline)
   ========================================================================== */
export interface WorkoutProgressBarProps {
  currentStep?: number;
  totalSteps?: number;
  elapsedTime?: string;
  remainingTime?: string;
}

export const WorkoutProgressBar: React.FC<WorkoutProgressBarProps> = ({
  currentStep = 7,
  totalSteps = 12,
  elapsedTime = '17:30',
  remainingTime = '12:30',
}) => {
  const percent = Math.round((currentStep / totalSteps) * 100);

  return (
    <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-5 shadow-hf-xs">
      <div className="flex items-center justify-between mb-2">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#E53935] block">
            30-Minute Workout Progress
          </span>
          <h4 className="text-[15px] font-bold text-[#111827]">
            Exercise {currentStep} of {totalSteps} • Dumbbell Shoulder Press
          </h4>
        </div>
        <span className="font-mono tabular-nums text-[18px] font-extrabold text-[#E53935]">
          {percent}%
        </span>
      </div>

      {/* Segmented Bar */}
      <div className="grid grid-cols-12 gap-1.5 my-3">
        {Array.from({ length: totalSteps }).map((_, idx) => {
          const stepNumber = idx + 1;
          const isDone = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;
          return (
            <div
              key={stepNumber}
              className={`h-2.5 rounded-[3px] transition-all ${
                isDone
                  ? 'bg-[#E53935]'
                  : isCurrent
                  ? 'bg-[#E53935] ring-2 ring-[#FECACA]'
                  : 'bg-[#F1F5F9]'
              }`}
              title={`Exercise ${stepNumber}`}
            />
          );
        })}
      </div>

      <div className="flex items-center justify-between text-[12px] font-mono tabular-nums font-semibold text-[#6B7280]">
        <span>ELAPSED: {elapsedTime}</span>
        <span>REMAINING: -{remainingTime}</span>
      </div>
    </div>
  );
};

/* ==========================================================================
   4. CIRCULAR COUNTDOWN TIMER
   ========================================================================== */
export interface CircularCountdownTimerProps {
  initialSeconds?: number;
  totalSeconds?: number;
  exerciseTitle?: string;
  subtitle?: string;
}

export const CircularCountdownTimer: React.FC<CircularCountdownTimerProps> = ({
  initialSeconds = 38,
  totalSeconds = 45,
  exerciseTitle = 'Plank Core Hold',
  subtitle = 'Set 3 of 4 • Brace Core & Glutes',
}) => {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  const radius = 82;
  const circumference = 2 * Math.PI * radius;
  const progressRatio = Math.max(0, Math.min(1, secondsLeft / totalSeconds));
  const strokeDashoffset = circumference * (1 - progressRatio);

  const mins = Math.floor(secondsLeft / 60);
  const secs = secondsLeft % 60;

  return (
    <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-6 shadow-hf-xs flex flex-col items-center text-center">
      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] text-[11px] font-bold uppercase tracking-wider mb-2">
        <span className="w-2 h-2 rounded-full bg-[#E53935]" />
        Active Exercise Timer
      </span>
      <h4 className="text-[18px] font-bold text-[#111827]">{exerciseTitle}</h4>
      <p className="text-[13px] font-medium text-[#4B5563] mb-5">{subtitle}</p>

      {/* SVG Ring */}
      <div className="relative w-52 h-52 flex items-center justify-center mb-5">
        <svg className="w-full h-full -rotate-90" viewBox="0 0 200 200">
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#F1F5F9"
            strokeWidth="12"
          />
          <circle
            cx="100"
            cy="100"
            r={radius}
            fill="none"
            stroke="#E53935"
            strokeWidth="12"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            className="transition-all duration-300"
          />
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-[11px] font-bold uppercase tracking-widest text-[#6B7280] mb-1">
            Remaining
          </span>
          <span className="font-mono tabular-nums text-[44px] leading-none font-extrabold text-[#111827] tracking-tight">
            {String(mins).padStart(2, '0')}:{String(secs).padStart(2, '0')}
          </span>
          <span className="font-mono tabular-nums text-[12px] font-bold text-[#E53935] mt-1.5">
            Target {totalSeconds}s
          </span>
        </div>
      </div>

      {/* Timer Controls */}
      <div className="flex items-center gap-2.5 w-full justify-center">
        <IconButton
          label="Reset Timer"
          variant="outline"
          onClick={() => {
            setIsRunning(false);
            setSecondsLeft(totalSeconds);
          }}
          icon={<RotateCcw className="w-4 h-4" strokeWidth={2.25} />}
        />
        <Button
          variant="primary"
          onClick={() => {
            if (secondsLeft > 0) {
              setIsRunning(!isRunning);
              if (!isRunning) {
                setSecondsLeft((s) => (s > 1 ? s - 1 : totalSeconds));
              }
            }
          }}
          leftIcon={
            isRunning ? (
              <Pause className="w-4 h-4 fill-current" />
            ) : (
              <Play className="w-4 h-4 fill-current" />
            )
          }
          className="min-w-[140px]"
        >
          {isRunning ? 'Pause' : 'Start Timer'}
        </Button>
        <IconButton
          label="Subtract 5 seconds preview"
          variant="subtle"
          onClick={() => setSecondsLeft((s) => Math.max(0, s - 5))}
          icon={<span className="font-mono text-[11px] font-bold">-5s</span>}
        />
      </div>
    </div>
  );
};

/* ==========================================================================
   5. REST TIMER
   ========================================================================== */
export interface RestTimerProps {
  initialRestSeconds?: number;
  nextExerciseName?: string;
  nextExerciseLoad?: string;
}

export const RestTimer: React.FC<RestTimerProps> = ({
  initialRestSeconds = 45,
  nextExerciseName = 'Barbell Deadlift • Set 3',
  nextExerciseLoad = '60 KG • 8 Reps',
}) => {
  const [restSeconds, setRestSeconds] = useState(initialRestSeconds);

  return (
    <div className="bg-[#FEF2F2] rounded-[12px] border border-[#FECACA] p-5 shadow-hf-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-[6px] bg-white border border-[#FECACA] text-[#E53935] text-[11px] font-bold uppercase tracking-wider">
            Recovery Interval
          </span>
          <span className="font-mono tabular-nums text-[12px] font-bold text-[#C62828]">
            HR Zone: 132 BPM
          </span>
        </div>

        <div className="bg-white rounded-[10px] border border-[#FECACA] p-4 text-center my-2">
          <span className="block text-[11px] font-bold uppercase tracking-widest text-[#6B7280] mb-1">
            Rest Countdown
          </span>
          <div className="font-mono tabular-nums text-[44px] leading-none font-extrabold text-[#E53935]">
            00:{String(restSeconds).padStart(2, '0')}
          </div>

          <div className="flex items-center justify-center gap-2 mt-4">
            <button
              type="button"
              onClick={() => setRestSeconds((s) => Math.max(5, s - 15))}
              className="px-3 py-1.5 rounded-[6px] bg-[#F8FAFC] hover:bg-[#F1F5F9] border border-[#E5E7EB] font-mono tabular-nums text-[12px] font-bold text-[#111827] transition-colors"
            >
              -15s
            </button>
            <button
              type="button"
              onClick={() => setRestSeconds((s) => s + 15)}
              className="px-3 py-1.5 rounded-[6px] bg-[#FEF2F2] hover:bg-[#FEE2E2] border border-[#FECACA] font-mono tabular-nums text-[12px] font-bold text-[#E53935] transition-colors"
            >
              +15s Rest
            </button>
          </div>
        </div>
      </div>

      {/* Up Next Preview + Skip CTA */}
      <div className="mt-3 pt-3 border-t border-[#FECACA] flex items-center justify-between gap-3">
        <div>
          <span className="block text-[10px] font-bold uppercase tracking-wider text-[#C62828]">
            Up Next
          </span>
          <p className="text-[14px] font-bold text-[#111827] leading-tight">
            {nextExerciseName}
          </p>
          <span className="font-mono tabular-nums text-[12px] font-semibold text-[#4B5563]">
            {nextExerciseLoad}
          </span>
        </div>

        <Button
          variant="primary"
          size="sm"
          onClick={() => setRestSeconds(0)}
          rightIcon={<SkipForward className="w-3.5 h-3.5" />}
        >
          Skip Rest
        </Button>
      </div>
    </div>
  );
};

/* ==========================================================================
   6. SET INDICATOR
   ========================================================================== */
export interface SetData {
  setNumber: number;
  weightKg: number;
  reps: number;
  status: 'completed' | 'active' | 'upcoming';
}

export const SetIndicator: React.FC = () => {
  const [sets, setSets] = useState<SetData[]>([
    { setNumber: 1, weightKg: 40, reps: 10, status: 'completed' },
    { setNumber: 2, weightKg: 45, reps: 10, status: 'completed' },
    { setNumber: 3, weightKg: 45, reps: 10, status: 'active' },
    { setNumber: 4, weightKg: 45, reps: 8, status: 'upcoming' },
  ]);

  const toggleSet = (num: number) => {
    setSets((prev) =>
      prev.map((s) => {
        if (s.setNumber !== num) return s;
        const nextStatus =
          s.status === 'completed'
            ? 'active'
            : s.status === 'active'
            ? 'completed'
            : 'active';
        return { ...s, status: nextStatus };
      })
    );
  };

  return (
    <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-5 shadow-hf-xs">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] block">
            Set Progression Tracker
          </span>
          <h4 className="text-[16px] font-bold text-[#111827]">
            Barbell Row • 4 Working Sets
          </h4>
        </div>
        <span className="font-mono tabular-nums text-[12px] font-bold text-[#E53935] bg-[#FEF2F2] border border-[#FECACA] px-2.5 py-1 rounded-[6px]">
          {sets.filter((s) => s.status === 'completed').length} / {sets.length} Done
        </span>
      </div>

      <div className="space-y-2">
        {sets.map((s) => {
          const isCompleted = s.status === 'completed';
          const isActive = s.status === 'active';

          return (
            <button
              key={s.setNumber}
              type="button"
              onClick={() => toggleSet(s.setNumber)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-[8px] border text-left transition-all ${
                isActive
                  ? 'bg-[#FEF2F2] border-[#E53935] ring-1 ring-[#E53935]/20'
                  : isCompleted
                  ? 'bg-[#F0FDF4]/60 border-[#BBF7D0]'
                  : 'bg-[#F8FAFC] border-[#E5E7EB]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span
                  className={`w-7 h-7 rounded-[6px] font-mono tabular-nums text-[12px] font-extrabold flex items-center justify-center ${
                    isActive
                      ? 'bg-[#E53935] text-white'
                      : isCompleted
                      ? 'bg-[#16A34A] text-white'
                      : 'bg-white border border-[#D1D5DB] text-[#6B7280]'
                  }`}
                >
                  {isCompleted ? <Check className="w-4 h-4" strokeWidth={2.5} /> : `S${s.setNumber}`}
                </span>
                <div>
                  <span className="text-[13px] font-bold text-[#111827] block">
                    Set {s.setNumber}
                  </span>
                  <span className="text-[11px] font-medium text-[#6B7280]">
                    {isActive
                      ? 'Current Active Set — Tap to complete'
                      : isCompleted
                      ? 'Completed'
                      : 'Upcoming target'}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 font-mono tabular-nums">
                <span className="text-[13px] font-bold text-[#111827] bg-white px-2.5 py-1 rounded-[6px] border border-[#E5E7EB]">
                  {s.weightKg} KG
                </span>
                <span className="text-[13px] font-bold text-[#111827] bg-white px-2.5 py-1 rounded-[6px] border border-[#E5E7EB]">
                  {s.reps} REPS
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

/* ==========================================================================
   7. EXERCISE COMPLETION INDICATOR
   ========================================================================== */
export const ExerciseCompletionIndicator: React.FC = () => {
  const [items, setItems] = useState([
    { id: 1, name: 'Barbell Squat', detail: '4 Sets × 10 Reps • 50 KG', completed: true },
    { id: 2, name: 'Push-Ups', detail: '3 Sets × 15 Reps • Bodyweight', completed: true },
    { id: 3, name: 'Dumbbell Row', detail: '3 Sets × 12 Reps • 18 KG', completed: false },
  ]);

  const toggleItem = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  return (
    <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-5 shadow-hf-xs">
      <div className="flex items-center justify-between mb-3">
        <div>
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] block">
            Checklist States
          </span>
          <h4 className="text-[16px] font-bold text-[#111827]">
            Exercise Completion Indicator
          </h4>
        </div>
      </div>

      <div className="space-y-2.5">
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => toggleItem(item.id)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => e.key === 'Enter' && toggleItem(item.id)}
            className={`flex items-center justify-between p-3.5 rounded-[10px] border cursor-pointer transition-all ${
              item.completed
                ? 'bg-[#F8FAFC] border-[#E5E7EB]'
                : 'bg-white border-[#E53935] shadow-hf-xs'
            }`}
          >
            <div className="flex items-center gap-3">
              <div
                className={`w-6 h-6 rounded-full flex items-center justify-center transition-colors ${
                  item.completed
                    ? 'bg-[#16A34A] text-white'
                    : 'border-2 border-[#E53935] bg-[#FEF2F2] text-transparent'
                }`}
              >
                <Check className="w-3.5 h-3.5" strokeWidth={3} />
              </div>
              <div>
                <h5
                  className={`text-[14px] font-bold ${
                    item.completed
                      ? 'text-[#6B7280] line-through'
                      : 'text-[#111827]'
                  }`}
                >
                  {item.name}
                </h5>
                <p className="text-[12px] font-mono tabular-nums font-medium text-[#6B7280]">
                  {item.detail}
                </p>
              </div>
            </div>

            <span
              className={`text-[11px] font-bold uppercase px-2 py-0.5 rounded-[4px] ${
                item.completed
                  ? 'bg-[#F0FDF4] text-[#16A34A] border border-[#BBF7D0]'
                  : 'bg-[#FEF2F2] text-[#E53935] border border-[#FECACA]'
              }`}
            >
              {item.completed ? 'Done' : 'In Progress'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ==========================================================================
   8. WORKOUT SESSION SUMMARY
   ========================================================================== */
export const WorkoutSessionSummary: React.FC = () => {
  return (
    <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-6 shadow-hf-sm">
      {/* Top Celebration Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#F1F5F9]">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-[10px] bg-[#FEF2F2] border border-[#FECACA] flex items-center justify-center text-[#E53935] shrink-0">
            <Trophy className="w-6 h-6" strokeWidth={2.25} />
          </div>
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#16A34A] mb-0.5">
              <CheckCircle2 className="w-3.5 h-3.5" strokeWidth={2.5} />
              30-Minute Session Complete
            </div>
            <h3 className="text-[20px] font-extrabold text-[#111827] tracking-tight">
              Full-Body Strength & Core
            </h3>
            <p className="text-[13px] font-medium text-[#4B5563]">
              Completed Today • Barbell, Dumbbells & Bodyweight
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            leftIcon={<Share2 className="w-4 h-4" />}
          >
            Share Log
          </Button>
          <Button variant="primary" size="sm">
            Save Session
          </Button>
        </div>
      </div>

      {/* 4 Key KPI Blocks */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-5">
        <div className="p-3.5 rounded-[10px] bg-[#FEF2F2] border border-[#FECACA]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#C62828] block">
            Total Time
          </span>
          <span className="font-mono tabular-nums text-[24px] font-extrabold text-[#E53935]">
            30:00
          </span>
          <span className="text-[11px] font-semibold text-[#C62828] block">
            100% Target Hit
          </span>
        </div>

        <div className="p-3.5 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] block">
            Total Volume
          </span>
          <span className="font-mono tabular-nums text-[24px] font-extrabold text-[#111827]">
            4,280{' '}
            <span className="text-[13px] font-bold text-[#6B7280]">KG</span>
          </span>
          <span className="text-[11px] font-semibold text-[#16A34A] block">
            +320 kg vs last
          </span>
        </div>

        <div className="p-3.5 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] block">
            Sets Completed
          </span>
          <span className="font-mono tabular-nums text-[24px] font-extrabold text-[#111827]">
            18 / 18
          </span>
          <span className="text-[11px] font-semibold text-[#4B5563] block">
            6 Exercises
          </span>
        </div>

        <div className="p-3.5 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB]">
          <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] block">
            Active Burn
          </span>
          <span className="font-mono tabular-nums text-[24px] font-extrabold text-[#111827]">
            342{' '}
            <span className="text-[13px] font-bold text-[#6B7280]">KCAL</span>
          </span>
          <span className="text-[11px] font-semibold text-[#4B5563] block">
            High Intensity
          </span>
        </div>
      </div>

      {/* Muscle Group Breakdown Bar */}
      <div className="p-4 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB]">
        <div className="flex items-center justify-between text-[12px] font-bold text-[#111827] mb-2">
          <span className="flex items-center gap-1.5">
            <Dumbbell className="w-4 h-4 text-[#E53935]" />
            Session Muscle Distribution
          </span>
          <span className="font-mono tabular-nums text-[#6B7280]">
            Balanced Full-Body Split
          </span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-[#E5E7EB] overflow-hidden flex">
          <div className="bg-[#E53935] h-full w-[40%]" title="Lower Body 40%" />
          <div className="bg-[#1E293B] h-full w-[35%]" title="Upper Push/Pull 35%" />
          <div className="bg-[#9CA3AF] h-full w-[25%]" title="Core & Floor 25%" />
        </div>
        <div className="flex flex-wrap items-center gap-4 mt-2.5 text-[11px] font-semibold text-[#4B5563]">
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-[3px] bg-[#E53935]" /> Lower Body (40%)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-[3px] bg-[#1E293B]" /> Upper Body (35%)
          </span>
          <span className="inline-flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-[3px] bg-[#9CA3AF]" /> Core & Floor (25%)
          </span>
        </div>
      </div>
    </div>
  );
};
