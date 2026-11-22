import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Clock,
  Dumbbell,
  Layers,
  ChevronRight,
  Flame,
  User,
  X,
  Activity,
  Sparkles,
} from 'lucide-react';
import { Button } from '../design-system/components/Buttons';
import { TextInput } from '../design-system/components/FormComponents';
import { EmptyState } from '../design-system/components/FeedbackComponents';
import { ExerciseIllustration } from '../design-system/components/ExerciseVisuals';
import {
  WORKOUT_PLANS_DATA,
  WORKOUT_CATEGORY_TABS,
  WorkoutCategoryFilter,
  WorkoutPlan,
} from '../data/workoutLibraryData';

export const WorkoutLibrary: React.FC = () => {
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] =
    useState<WorkoutCategoryFilter>('All');

  // Filter workouts by category tab and search query
  const filteredWorkouts = useMemo(() => {
    return WORKOUT_PLANS_DATA.filter((plan) => {
      const matchesCategory =
        selectedCategory === 'All' ||
        plan.filterTags.includes(selectedCategory);

      const trimmedQuery = searchQuery.trim().toLowerCase();
      if (!trimmedQuery) return matchesCategory;

      const matchesName = plan.name.toLowerCase().includes(trimmedQuery);
      const matchesPrimaryCategory = plan.primaryCategory
        .toLowerCase()
        .includes(trimmedQuery);
      const matchesMuscles = plan.targetMuscleGroups.some((m) =>
        m.toLowerCase().includes(trimmedQuery)
      );

      return (
        matchesCategory &&
        (matchesName || matchesPrimaryCategory || matchesMuscles)
      );
    });
  }, [selectedCategory, searchQuery]);

  // Count how many plans match each tab for helpful badge numbers
  const categoryCounts = useMemo(() => {
    const counts: Record<WorkoutCategoryFilter, number> = {
      All: WORKOUT_PLANS_DATA.length,
      'Full Body': 0,
      'Upper Body': 0,
      'Lower Body': 0,
      Core: 0,
      Strength: 0,
    };

    WORKOUT_PLANS_DATA.forEach((plan) => {
      plan.filterTags.forEach((tag) => {
        if (tag !== 'All') {
          counts[tag] = (counts[tag] || 0) + 1;
        }
      });
    });

    return counts;
  }, []);

  const handleResetFilters = () => {
    setSearchQuery('');
    setSelectedCategory('All');
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* =====================================================================
          1. PAGE HEADER
          Title: "Workout Library"
          Subtitle: "Choose your next workout"
          Search workouts input + Profile shortcut
          ===================================================================== */}
      <section className="bg-white rounded-[12px] border border-[#E5E7EB] p-5 sm:p-6 shadow-hf-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#F1F5F9]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.05em] text-[#E53935] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HomeFit 30 Training Plans</span>
            </div>
            <h1 className="text-[26px] sm:text-[30px] leading-[1.2] font-extrabold text-[#111827] tracking-[-0.025em]">
              Workout Library
            </h1>
            <p className="text-[14px] sm:text-[15px] font-medium text-[#4B5563] mt-0.5">
              Choose your next workout
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-center">
            <div className="px-3 py-1.5 rounded-[8px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] font-mono tabular-nums text-[12px] font-bold">
              {WORKOUT_PLANS_DATA.length} Structured Plans
            </div>
            <button
              type="button"
              onClick={() => navigate('/profile')}
              aria-label="Athlete Profile"
              title="Athlete Profile"
              className="w-10 h-10 rounded-[10px] border border-[#E5E7EB] bg-white hover:bg-[#FEF2F2] hover:border-[#FECACA] text-[#111827] hover:text-[#E53935] flex items-center justify-center transition-colors"
            >
              <User className="w-5 h-5" strokeWidth={2.25} />
            </button>
          </div>
        </div>

        {/* Search Input + Category Filter Tabs */}
        <div className="pt-5 space-y-4">
          <div className="relative max-w-xl">
            <TextInput
              label="Search Workouts"
              placeholder="Search workouts by name, category, or muscle group (e.g. Full Body Workout A, Leg Strength)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4 text-[#6B7280]" />}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search query"
                className="absolute right-3 top-[34px] w-7 h-7 rounded-[6px] bg-[#F1F5F9] hover:bg-[#FEE2E2] text-[#4B5563] hover:text-[#E53935] flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" strokeWidth={2.25} />
              </button>
            )}
          </div>

          {/* 2. WORKOUT CATEGORIES FILTER TABS */}
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.04em] text-[#6B7280] mb-2">
              Filter by Category
            </span>
            <div
              role="tablist"
              aria-label="Workout category filters"
              className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar"
            >
              {WORKOUT_CATEGORY_TABS.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => setSelectedCategory(category)}
                    className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-[8px] text-[13px] font-bold whitespace-nowrap transition-all border ${
                      isActive
                        ? 'bg-[#E53935] text-white border-[#E53935] shadow-hf-red'
                        : 'bg-[#F8FAFC] hover:bg-[#FEF2F2] text-[#4B5563] hover:text-[#E53935] border-[#E5E7EB] hover:border-[#FECACA]'
                    }`}
                  >
                    <span>{category}</span>
                    <span
                      className={`font-mono tabular-nums text-[11px] px-1.5 py-0.2 rounded-[4px] ${
                        isActive
                          ? 'bg-white/20 text-white'
                          : 'bg-white text-[#6B7280] border border-[#E5E7EB]'
                      }`}
                    >
                      {categoryCounts[category]}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          RESULTS COUNT BAR
          ===================================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h2 className="text-[18px] font-bold text-[#111827]">
            {selectedCategory === 'All'
              ? 'All Workout Plans'
              : `${selectedCategory} Workouts`}
          </h2>
          <span className="font-mono tabular-nums text-[12px] font-bold px-2 py-0.5 rounded-[5px] bg-[#F8FAFC] border border-[#E5E7EB] text-[#4B5563]">
            Showing {filteredWorkouts.length} of {WORKOUT_PLANS_DATA.length}
          </span>
        </div>

        {(selectedCategory !== 'All' || searchQuery.trim() !== '') && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="text-[12px] font-bold text-[#E53935] hover:text-[#C62828] underline underline-offset-4"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* =====================================================================
          3 & 4. WORKOUT PLAN CARDS GRID OR EMPTY STATE
          ===================================================================== */}
      {filteredWorkouts.length === 0 ? (
        <EmptyState
          title="No Matching Workout Plans Found"
          description={`We couldn't find any workouts matching "${searchQuery}" under the "${selectedCategory}" category. Try clearing your search or switching category tabs.`}
          ctaLabel="Show All 13 Workouts"
          onCtaClick={handleResetFilters}
        />
      ) : (
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredWorkouts.map((plan) => (
            <WorkoutLibraryCard
              key={plan.id}
              plan={plan}
              onViewWorkout={() => navigate(`/workouts/${plan.id}`)}
            />
          ))}
        </section>
      )}
    </div>
  );
};

/* ==========================================================================
   REUSABLE WORKOUT LIBRARY CARD (Follows HomeFit 30 Card Design System)
   Displays:
   - Workout name
   - Workout category
   - Duration
   - Difficulty level
   - Number of exercises
   - Suitable workout illustration or icon
   - "View Workout" action
   ========================================================================== */
interface WorkoutLibraryCardProps {
  plan: WorkoutPlan;
  onViewWorkout: () => void;
}

const WorkoutLibraryCard: React.FC<WorkoutLibraryCardProps> = ({
  plan,
  onViewWorkout,
}) => {
  const difficultyBadgeStyle = {
    Beginner: 'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]',
    Intermediate: 'bg-[#FEF2F2] text-[#E53935] border-[#FECACA]',
    Advanced: 'bg-[#1E293B] text-white border-[#1E293B]',
  }[plan.difficulty];

  const isStrengthTagged = plan.filterTags.includes('Strength');

  return (
    <article
      onClick={onViewWorkout}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onViewWorkout()}
      className="group bg-white rounded-[12px] border border-[#E5E7EB] hover:border-[#E53935] shadow-hf-xs hover:shadow-hf-sm transition-all overflow-hidden flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Top Illustration Header Frame */}
        <div className="relative h-36 w-full bg-[#F8FAFC] border-b border-[#F1F5F9] overflow-hidden">
          <ExerciseIllustration id={plan.coverExerciseId} />

          {/* Top Left Category Pill */}
          <div className="absolute top-3 left-3 flex items-center gap-1.5">
            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-[6px] bg-white/95 border border-[#E5E7EB] text-[11px] font-bold uppercase tracking-wider text-[#111827] shadow-hf-xs">
              <Dumbbell className="w-3 h-3 text-[#E53935]" strokeWidth={2.25} />
              {plan.primaryCategory}
            </span>
            {isStrengthTagged && plan.primaryCategory !== 'Full Body' && (
              <span className="hidden sm:inline-flex items-center px-2 py-1 rounded-[6px] bg-[#FEF2F2]/95 border border-[#FECACA] text-[10px] font-bold uppercase tracking-wider text-[#E53935]">
                Strength
              </span>
            )}
          </div>

          {/* Top Right Difficulty Badge */}
          <span
            className={`absolute top-3 right-3 px-2.5 py-1 rounded-[6px] border text-[11px] font-bold uppercase tracking-wider shadow-hf-xs ${difficultyBadgeStyle}`}
          >
            {plan.difficulty}
          </span>

          {/* Bottom Right Duration Badge */}
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-[6px] bg-[#E53935] text-white font-mono tabular-nums text-[12px] font-bold shadow-hf-red">
            <Clock className="w-3.5 h-3.5" strokeWidth={2.25} />
            {plan.durationMinutes} min
          </span>
        </div>

        {/* Card Content Body */}
        <div className="p-5">
          {/* Workout Name */}
          <h3 className="text-[18px] font-bold text-[#111827] tracking-[-0.01em] group-hover:text-[#E53935] transition-colors">
            {plan.name}
          </h3>

          {/* Subtitle */}
          <p className="text-[13px] font-medium text-[#4B5563] mt-1 line-clamp-2 leading-relaxed">
            {plan.subtitle}
          </p>

          {/* Target Muscle Group Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3.5">
            {plan.targetMuscleGroups.slice(0, 3).map((muscle) => (
              <span
                key={muscle}
                className="inline-flex items-center gap-1 px-2 py-0.5 rounded-[5px] bg-[#F8FAFC] border border-[#E5E7EB] text-[11px] font-semibold text-[#4B5563]"
              >
                <Activity className="w-3 h-3 text-[#E53935]" strokeWidth={2} />
                {muscle}
              </span>
            ))}
            {plan.targetMuscleGroups.length > 3 && (
              <span className="inline-flex items-center px-2 py-0.5 rounded-[5px] bg-[#F8FAFC] border border-[#E5E7EB] font-mono text-[11px] font-semibold text-[#6B7280]">
                +{plan.targetMuscleGroups.length - 3}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Card Footer: Metadata Bar + "View Workout" Action */}
      <div className="px-5 pb-5 pt-3 border-t border-[#F1F5F9] space-y-3.5">
        <div className="flex items-center justify-between text-[12px] font-semibold text-[#4B5563]">
          <span className="inline-flex items-center gap-1.5 font-mono tabular-nums font-bold text-[#111827]">
            <Layers className="w-3.5 h-3.5 text-[#E53935]" strokeWidth={2.25} />
            {plan.exercises.length} Exercises
          </span>
          <span className="inline-flex items-center gap-1 font-mono tabular-nums text-[#6B7280]">
            <Flame className="w-3.5 h-3.5 text-[#E53935]" strokeWidth={2} />
            ~{plan.estimatedCalories} kcal
          </span>
        </div>

        <Button
          variant="outline"
          size="md"
          fullWidth
          onClick={(e) => {
            e.stopPropagation();
            onViewWorkout();
          }}
          rightIcon={<ChevronRight className="w-4 h-4" strokeWidth={2.25} />}
          className="group-hover:bg-[#E53935] group-hover:text-white group-hover:border-[#E53935]"
        >
          View Workout
        </Button>
      </div>
    </article>
  );
};
