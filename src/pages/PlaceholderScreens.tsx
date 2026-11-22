import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Play, User } from 'lucide-react';
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
} from '../services/workoutStorage';
import { PersonalGoalsPreferences } from '../types/workoutSession';
import { SuccessMessage } from '../design-system/components/FeedbackComponents';

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
   2. PROFILE TAB SCREEN (/profile) — Persisted Equipment & PWA Preferences
   ========================================================================== */
export const ProfileTabPlaceholder: React.FC = () => {
  const navigate = useNavigate();
  const [prefs, setPrefs] = React.useState<PersonalGoalsPreferences>(() =>
    loadPersonalGoals()
  );
  const [savedNotice, setSavedNotice] = React.useState(false);

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
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB]">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-[12px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] flex items-center justify-center">
            <User className="w-6 h-6" strokeWidth={2.25} />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#E53935] block">
              HomeFit 30 Athlete Profile & PWA Settings
            </span>
            <h1 className="text-[24px] font-extrabold text-[#111827] tracking-tight">
              Equipment, Preferences & Offline App
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
          title="Athlete Preferences Saved"
          description="Your equipment defaults and workout timer preferences have been saved to localStorage."
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-4">
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

        <div className="space-y-4">
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
          <div className="p-5 rounded-[12px] bg-white border border-[#E5E7EB] shadow-hf-xs flex items-center justify-between gap-3">
            <div>
              <h4 className="text-[15px] font-bold text-[#111827]">
                Personal Weekly Workout Goals
              </h4>
              <p className="text-[13px] text-[#4B5563] mt-0.5">
                Current targets: {prefs.weeklyWorkoutDaysGoal} days/week •{' '}
                {prefs.weeklyWorkoutMinutesGoal} mins/week
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/progress')}
            >
              Edit Goals
            </Button>
          </div>
          <div className="p-5 rounded-[12px] bg-white border border-[#E5E7EB] shadow-hf-xs flex items-center justify-between gap-3">
            <div>
              <h4 className="text-[15px] font-bold text-[#111827]">
                Inspect Complete UI Design System
              </h4>
              <p className="text-[13px] text-[#4B5563] mt-0.5">
                View all tokens, typography, buttons, cards, and 24 exercise vectors
              </p>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate('/design-system')}
            >
              Open System
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
