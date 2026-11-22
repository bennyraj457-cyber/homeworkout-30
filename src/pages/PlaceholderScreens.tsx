import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ChevronLeft,
  Play,
  User,
  RotateCcw,
  Bell,
  ShieldCheck,
  Smartphone,
  Target,
  Dumbbell,
} from 'lucide-react';
import { Button } from '../design-system/components/Buttons';
import {
  HOMEFIT_EXERCISES,
  ExerciseCard,
} from '../design-system/components/ExerciseVisuals';
import {
  WeightSelector,
  ToggleSwitch,
} from '../design-system/components/FormComponents';
import { EXERCISE_CATEGORIES_SAMPLE } from '../data/dashboardSampleData';
import {
  loadPersonalGoals,
  savePersonalGoals,
  loadCompletedWorkoutHistory,
  resetAllWorkoutDataAndCaches,
} from '../services/workoutStorage';
import { PersonalGoalsPreferences } from '../types/workoutSession';
import {
  SuccessMessage,
  ConfirmationDialog,
} from '../design-system/components/FeedbackComponents';
import { usePwa } from '../context/PwaContext';

/* ==========================================================================
   1. EXERCISE CATEGORY SCREEN (/category/:slug)
   ========================================================================== */
export const CategoryPlaceholder: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();

  const category =
    EXERCISE_CATEGORIES_SAMPLE.find((c) => c.slug === slug) ||
    EXERCISE_CATEGORIES_SAMPLE[0];

  const matchingExercises = HOMEFIT_EXERCISES.filter((ex) =>
    category.featuredExercises.includes(ex.id)
  );

  const displayExercises =
    matchingExercises.length > 0
      ? matchingExercises
      : HOMEFIT_EXERCISES.slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Category Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-5 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-3.5">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="w-10 h-10 rounded-[8px] border border-[#E5E7EB] bg-white hover:bg-[#FEF2F2] hover:border-[#FECACA] text-[#111827] hover:text-[#E53935] flex items-center justify-center transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E53935]"
            aria-label="Back to Home Dashboard"
          >
            <ChevronLeft className="w-5 h-5" strokeWidth={2.25} />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-[5px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] text-[11px] font-bold uppercase tracking-wider">
                Muscle Category • {category.name}
              </span>
              <span className="font-mono text-[12px] font-bold text-[#6B7280]">
                {category.durationRange}
              </span>
            </div>
            <h1 className="text-[24px] sm:text-[28px] font-extrabold text-[#111827] tracking-tight mt-0.5">
              {category.name} Exercises
            </h1>
            <p className="text-[14px] font-medium text-[#4B5563]">
              {category.subtitle} • Equipment: {category.equipmentSummary}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/exercises')}
          >
            All 24 Exercises
          </Button>
          <Button
            variant="primary"
            size="sm"
            onClick={() => navigate('/workout/active')}
            leftIcon={<Play className="w-4 h-4 fill-current" />}
          >
            Start {category.name} Block
          </Button>
        </div>
      </div>

      {/* Category Switcher Pills */}
      <div className="flex flex-wrap items-center gap-2">
        {EXERCISE_CATEGORIES_SAMPLE.map((cat) => {
          const active = cat.slug === category.slug;
          return (
            <button
              key={cat.slug}
              type="button"
              onClick={() => navigate(`/category/${cat.slug}`)}
              className={`px-3.5 py-1.5 rounded-[8px] text-[13px] font-bold transition-all ${
                active
                  ? 'bg-[#E53935] text-white shadow-hf-xs'
                  : 'bg-[#F8FAFC] text-[#4B5563] hover:text-[#111827] border border-[#E5E7EB]'
              }`}
            >
              {cat.name} ({cat.exerciseCount})
            </button>
          );
        })}
      </div>

      {/* Filtered Exercise Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {displayExercises.map((ex) => (
          <ExerciseCard
            key={ex.id}
            exercise={ex}
            onSelect={() => navigate(`/exercises/${ex.id}`)}
          />
        ))}
      </div>
    </div>
  );
};

/* ==========================================================================
   2. PROFILE TAB SCREEN (/profile) — Complete Athlete Profile, Goals, Data & App Info
   ========================================================================== */
export const ProfileTabPlaceholder: React.FC = () => {
  const navigate = useNavigate();
  const { isOnline, isInstalled, setShowManualInstructionsModal } = usePwa();

  const [prefs, setPrefs] = useState<PersonalGoalsPreferences>(() =>
    loadPersonalGoals()
  );
  const [savedNotice, setSavedNotice] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  const historyCount = loadCompletedWorkoutHistory().length;

  const handleUpdatePrefs = (partial: Partial<PersonalGoalsPreferences>) => {
    setPrefs((prev) => {
      const next = { ...prev, ...partial };
      savePersonalGoals(next);
      return next;
    });
    setSavedNotice(true);
    window.setTimeout(() => setSavedNotice(false), 1800);
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-[12px] bg-[#E53935] text-white flex items-center justify-center shadow-hf-red">
            <User className="w-6 h-6" strokeWidth={2.25} />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#E53935] block">
              Athlete Settings & Preferences
            </span>
            <h1 className="text-[24px] sm:text-[28px] font-extrabold text-[#111827] tracking-tight">
              Profile & App Settings
            </h1>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => navigate('/')}
          leftIcon={<ChevronLeft className="w-4 h-4" />}
        >
          Back to Home
        </Button>
      </div>

      {savedNotice && (
        <SuccessMessage
          title="Settings Saved Locally"
          description="Your workout goals, equipment loads, and reminder preferences have been updated in localStorage."
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left 6 Cols: Weekly Workout Goal, Reminder Preferences & Equipment Defaults */}
        <div className="lg:col-span-6 space-y-5">
          {/* Weekly Workout Goal Editor */}
          <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-5 shadow-hf-xs space-y-4">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#F1F5F9]">
              <div className="w-8 h-8 rounded-[7px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] flex items-center justify-center">
                <Target className="w-4 h-4" strokeWidth={2.25} />
              </div>
              <div>
                <h2 className="text-[16px] font-bold text-[#111827]">
                  Weekly Workout Goals
                </h2>
                <p className="text-[12px] text-[#6B7280]">
                  Repeating weekly targets for your 30-minute training schedule
                </p>
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-[13px] font-bold mb-2">
                <span className="text-[#111827]">Weekly Training Days Target</span>
                <span className="font-mono text-[#E53935]">
                  {prefs.weeklyWorkoutDaysGoal} Days / Week
                </span>
              </div>
              <div className="grid grid-cols-7 gap-1.5">
                {[1, 2, 3, 4, 5, 6, 7].map((d) => {
                  const active = prefs.weeklyWorkoutDaysGoal === d;
                  return (
                    <button
                      key={d}
                      type="button"
                      onClick={() =>
                        handleUpdatePrefs({ weeklyWorkoutDaysGoal: d })
                      }
                      className={`py-2 rounded-[7px] font-mono text-[12px] font-extrabold border transition-all ${
                        active
                          ? 'bg-[#E53935] text-white border-[#E53935] shadow-hf-xs'
                          : 'bg-[#F8FAFC] text-[#4B5563] border-[#E5E7EB] hover:border-[#E53935]'
                      }`}
                    >
                      {d}d
                    </button>
                  );
                })}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between text-[13px] font-bold mb-2">
                <span className="text-[#111827]">Weekly Workout Minutes Target</span>
                <span className="font-mono text-[#E53935]">
                  {prefs.weeklyWorkoutMinutesGoal} Mins / Week
                </span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {[90, 120, 150, 170, 180, 210].map((m) => {
                  const active = prefs.weeklyWorkoutMinutesGoal === m;
                  return (
                    <button
                      key={m}
                      type="button"
                      onClick={() =>
                        handleUpdatePrefs({ weeklyWorkoutMinutesGoal: m })
                      }
                      className={`flex-1 py-1.5 px-2.5 rounded-[7px] font-mono text-[12px] font-extrabold border transition-all ${
                        active
                          ? 'bg-[#E53935] text-white border-[#E53935]'
                          : 'bg-[#F8FAFC] text-[#4B5563] border-[#E5E7EB] hover:border-[#E53935]'
                      }`}
                    >
                      {m}m
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Equipment Resistance Defaults */}
          <WeightSelector
            initialWeight={prefs.defaultBarbellWeight ?? 50}
            initialUnit={prefs.preferredWeightUnit ?? 'KG'}
            equipmentType="Barbell"
            onWeightChange={(w, u) =>
              handleUpdatePrefs({
                defaultBarbellWeight: w,
                preferredWeightUnit: u,
              })
            }
          />
          <WeightSelector
            initialWeight={prefs.defaultDumbbellWeight ?? 15}
            initialUnit={prefs.preferredWeightUnit ?? 'KG'}
            equipmentType="Dumbbell"
            onWeightChange={(w, u) =>
              handleUpdatePrefs({
                defaultDumbbellWeight: w,
                preferredWeightUnit: u,
              })
            }
          />
        </div>

        {/* Right 6 Cols: Workout & Reminder Preferences, Data Management & App Info */}
        <div className="lg:col-span-6 space-y-5">
          {/* Workout & Reminder Preferences */}
          <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-5 shadow-hf-xs space-y-3.5">
            <div className="flex items-center gap-2.5 pb-3 border-b border-[#F1F5F9]">
              <div className="w-8 h-8 rounded-[7px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] flex items-center justify-center">
                <Dumbbell className="w-4 h-4" strokeWidth={2.25} />
              </div>
              <div>
                <h2 className="text-[16px] font-bold text-[#111827]">
                  Workout & Reminder Preferences
                </h2>
                <p className="text-[12px] text-[#6B7280]">
                  Customize active rest timers, audio cues, and daily reminders
                </p>
              </div>
            </div>

            <ToggleSwitch
              label="Auto-Start Rest Timer"
              description="Automatically start the recovery countdown after completing a working set"
              checked={prefs.autoStartRestTimer !== false}
              onChange={(val) => handleUpdatePrefs({ autoStartRestTimer: val })}
            />

            <ToggleSwitch
              label="Rest Finished Audio Chime"
              description="Play a two-tone athletic beep when your rest countdown reaches 00:00"
              checked={prefs.restAudioChimeEnabled !== false}
              onChange={(val) =>
                handleUpdatePrefs({ restAudioChimeEnabled: val })
              }
            />

            <ToggleSwitch
              label="Daily Workout Reminder"
              description="Save preferred training reminder time on this device"
              checked={prefs.dailyReminderEnabled}
              onChange={(val) =>
                handleUpdatePrefs({ dailyReminderEnabled: val })
              }
            />

            {prefs.dailyReminderEnabled && (
              <div className="flex items-center justify-between px-3.5 py-2.5 rounded-[8px] bg-[#FEF2F2]/60 border border-[#FECACA]">
                <span className="inline-flex items-center gap-2 text-[12px] font-bold text-[#111827]">
                  <Bell className="w-4 h-4 text-[#E53935]" />
                  Daily Reminder Time
                </span>
                <input
                  type="time"
                  aria-label="Daily reminder time"
                  value={prefs.dailyReminderTime}
                  onChange={(e) =>
                    handleUpdatePrefs({ dailyReminderTime: e.target.value })
                  }
                  className="h-8 px-2.5 rounded-[6px] bg-white border border-[#FECACA] font-mono text-[12px] font-bold text-[#E53935] focus:outline-none focus:border-[#E53935]"
                />
              </div>
            )}
          </div>

          {/* Local Data Management */}
          <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-5 shadow-hf-xs space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-[16px] font-bold text-[#111827]">
                  Local Data Management
                </h2>
                <p className="text-[12px] text-[#6B7280] mt-0.5">
                  {historyCount} completed workout session(s) stored in browser localStorage
                </p>
              </div>
              <span className="px-2.5 py-1 rounded-[5px] bg-[#F0FDF4] border border-[#BBF7D0] text-[#16A34A] text-[11px] font-bold uppercase">
                100% Private
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-2.5 pt-2 border-t border-[#F1F5F9]">
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/progress')}
              >
                View Workout History
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => setShowResetConfirm(true)}
                leftIcon={<RotateCcw className="w-4 h-4" />}
              >
                Reset All Workout Data
              </Button>
            </div>
          </div>

          {/* App Information & PWA Status */}
          <div className="bg-[#F8FAFC] rounded-[12px] border border-[#E5E7EB] p-5 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-[7px] bg-[#E53935] text-white font-extrabold text-[13px] flex items-center justify-center">
                  30
                </div>
                <div>
                  <h3 className="text-[15px] font-extrabold text-[#111827]">
                    HomeFit 30 PWA • v1.0.0
                  </h3>
                  <p className="text-[11px] font-medium text-[#6B7280]">
                    Offline-First 30-Minute Full-Body Home Fitness App
                  </p>
                </div>
              </div>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[5px] bg-white border border-[#E5E7EB] text-[11px] font-bold text-[#111827]">
                <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
                {isOnline ? 'Online' : 'Offline Mode'}
              </span>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-[#E5E7EB]">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowManualInstructionsModal(true)}
                leftIcon={<Smartphone className="w-3.5 h-3.5" />}
              >
                {isInstalled ? 'PWA Installed' : 'Install Instructions'}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => navigate('/design-system')}
              >
                Inspect UI Design System
              </Button>
            </div>
          </div>
        </div>
      </div>

      {showResetConfirm && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-[1px] flex items-center justify-center p-4">
          <ConfirmationDialog
            title="Reset All Workout Data?"
            description="This will permanently clear your completed workout history, active session progress, and restore default weekly goals."
            confirmLabel="Reset All Data"
            cancelLabel="Cancel"
            onConfirm={async () => {
              await resetAllWorkoutDataAndCaches();
              setShowResetConfirm(false);
              window.location.href = '/';
            }}
            onCancel={() => setShowResetConfirm(false)}
          />
        </div>
      )}
    </div>
  );
};
