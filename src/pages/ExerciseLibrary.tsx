import React, { useState, useMemo, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Search,
  Dumbbell,
  ChevronRight,
  Flame,
  X,
  Sparkles,
  Target,
  Layers,
} from 'lucide-react';
import { Button } from '../design-system/components/Buttons';
import { TextInput } from '../design-system/components/FormComponents';
import { EmptyState } from '../design-system/components/FeedbackComponents';
import { ExerciseIllustration } from '../design-system/components/ExerciseVisuals';
import {
  EXERCISE_LIBRARY_DATA,
  EXERCISE_LIBRARY_CATEGORIES,
  ExerciseLibraryCategory,
  ExerciseLibraryEntry,
} from '../data/exerciseLibraryData';

export const ExerciseLibrary: React.FC = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const initialCategoryParam = searchParams.get('category');
  const resolveCategory = (param: string | null): ExerciseLibraryCategory => {
    if (!param) return 'All';
    const match = EXERCISE_LIBRARY_CATEGORIES.find(
      (cat) => cat.toLowerCase() === param.toLowerCase()
    );
    if (match) return match;
    if (param.toLowerCase() === 'legs') return 'Legs & Glutes';
    return 'All';
  };

  const [selectedCategory, setSelectedCategory] =
    useState<ExerciseLibraryCategory>(() => resolveCategory(initialCategoryParam));
  const [searchQuery, setSearchQuery] = useState<string>('');

  useEffect(() => {
    const param = searchParams.get('category');
    if (param) {
      setSelectedCategory(resolveCategory(param));
    }
  }, [searchParams]);

  const handleSelectCategory = (category: ExerciseLibraryCategory) => {
    setSelectedCategory(category);
    if (category === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams, { replace: true });
    } else {
      setSearchParams({ category }, { replace: true });
    }
  };

  // Combined search + muscle category filtering
  const filteredExercises = useMemo(() => {
    return EXERCISE_LIBRARY_DATA.filter((exercise) => {
      const matchesCategory =
        selectedCategory === 'All' || exercise.category === selectedCategory;

      const trimmed = searchQuery.trim().toLowerCase();
      if (!trimmed) return matchesCategory;

      const matchesName = exercise.name.toLowerCase().includes(trimmed);
      const matchesTarget = exercise.targetMuscleGroup
        .toLowerCase()
        .includes(trimmed);
      const matchesEquipment = exercise.equipmentRequired
        .toLowerCase()
        .includes(trimmed);
      const matchesPrimary = exercise.primaryMuscles.some((m) =>
        m.toLowerCase().includes(trimmed)
      );

      return (
        matchesCategory &&
        (matchesName || matchesTarget || matchesEquipment || matchesPrimary)
      );
    });
  }, [selectedCategory, searchQuery]);

  // Precompute category counts
  const categoryCounts = useMemo(() => {
    const counts: Record<ExerciseLibraryCategory, number> = {
      All: EXERCISE_LIBRARY_DATA.length,
      Chest: 0,
      Back: 0,
      Shoulders: 0,
      Arms: 0,
      'Legs & Glutes': 0,
      Core: 0,
    };

    EXERCISE_LIBRARY_DATA.forEach((ex) => {
      counts[ex.category] = (counts[ex.category] || 0) + 1;
    });

    return counts;
  }, []);

  const handleResetFilters = () => {
    setSearchQuery('');
    handleSelectCategory('All');
  };

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* =====================================================================
          1. EXERCISE LIBRARY HEADER
          - Page title: "Exercise Library"
          - Subtitle: "Learn, explore and improve your technique"
          - Search exercise input
          - Total exercise count
          ===================================================================== */}
      <section className="bg-white rounded-[12px] border border-[#E5E7EB] p-5 sm:p-6 shadow-hf-xs">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-[#F1F5F9]">
          <div>
            <div className="inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.05em] text-[#E53935] mb-1">
              <Sparkles className="w-3.5 h-3.5" />
              <span>HomeFit 30 Technique Guide</span>
            </div>
            <h1 className="text-[26px] sm:text-[30px] leading-[1.2] font-extrabold text-[#111827] tracking-[-0.025em]">
              Exercise Library
            </h1>
            <p className="text-[14px] sm:text-[15px] font-medium text-[#4B5563] mt-0.5">
              Learn, explore and improve your technique
            </p>
          </div>

          {/* Total Exercise Count Badge */}
          <div className="flex items-center gap-3 self-start md:self-center">
            <div className="px-3.5 py-2 rounded-[8px] bg-[#FEF2F2] border border-[#FECACA] flex items-center gap-2">
              <Dumbbell className="w-4 h-4 text-[#E53935]" strokeWidth={2.25} />
              <span className="font-mono tabular-nums text-[13px] font-extrabold text-[#E53935]">
                {EXERCISE_LIBRARY_DATA.length} Total Exercises
              </span>
            </div>
          </div>
        </div>

        {/* Search Input + 2. Exercise Categories Filter Tabs */}
        <div className="pt-5 space-y-4">
          <div className="relative max-w-xl">
            <TextInput
              label="Search Exercises"
              placeholder="Search by exercise name, muscle group, or equipment (e.g. Barbell Squats, Dumbbell Floor Press)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-4 h-4 text-[#6B7280]" />}
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear exercise search"
                className="absolute right-3 top-[34px] w-7 h-7 rounded-[6px] bg-[#F1F5F9] hover:bg-[#FEE2E2] text-[#4B5563] hover:text-[#E53935] flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4" strokeWidth={2.25} />
              </button>
            )}
          </div>

          {/* 2. EXERCISE CATEGORIES FILTER TABS */}
          <div>
            <span className="block text-[11px] font-semibold uppercase tracking-[0.04em] text-[#6B7280] mb-2">
              Filter by Muscle Category
            </span>
            <div
              role="tablist"
              aria-label="Exercise muscle category filters"
              className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar"
            >
              {EXERCISE_LIBRARY_CATEGORIES.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    onClick={() => handleSelectCategory(category)}
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
          RESULTS SUMMARY BAR
          ===================================================================== */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <h2 className="text-[18px] font-bold text-[#111827]">
            {selectedCategory === 'All'
              ? 'All 24 HomeFit 30 Exercises'
              : `${selectedCategory} Exercises`}
          </h2>
          <span className="font-mono tabular-nums text-[12px] font-bold px-2.5 py-0.5 rounded-[5px] bg-[#F8FAFC] border border-[#E5E7EB] text-[#4B5563]">
            Showing {filteredExercises.length} of {EXERCISE_LIBRARY_DATA.length}
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
          4. EXERCISE CARDS GRID OR FRIENDLY EMPTY STATE
          ===================================================================== */}
      {filteredExercises.length === 0 ? (
        <EmptyState
          title="No Matching Exercises Found"
          description={`No exercises matched "${searchQuery}" under the "${selectedCategory}" filter. Try clearing your search query or viewing all 24 exercises.`}
          ctaLabel="Show All 24 Exercises"
          onCtaClick={handleResetFilters}
        />
      ) : (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredExercises.map((exercise) => (
            <ExerciseLibraryCard
              key={exercise.id}
              exercise={exercise}
              onViewExercise={() => navigate(`/exercises/${exercise.id}`)}
            />
          ))}
        </section>
      )}
    </div>
  );
};

/* ==========================================================================
   4. EXERCISE LIBRARY CARD COMPONENT
   Displays:
   - Exercise image or clear exercise illustration
   - Exercise name
   - Target muscle group
   - Equipment required
   - Difficulty level
   - "View Exercise" action
   ========================================================================== */
interface ExerciseLibraryCardProps {
  exercise: ExerciseLibraryEntry;
  onViewExercise: () => void;
}

const ExerciseLibraryCard: React.FC<ExerciseLibraryCardProps> = ({
  exercise,
  onViewExercise,
}) => {
  const difficultyBadgeStyle = {
    Beginner: 'bg-[#F0FDF4] text-[#16A34A] border-[#BBF7D0]',
    Intermediate: 'bg-[#FEF2F2] text-[#E53935] border-[#FECACA]',
    Advanced: 'bg-[#1E293B] text-white border-[#1E293B]',
  }[exercise.difficulty];

  return (
    <article
      onClick={onViewExercise}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onViewExercise()}
      className="group bg-white rounded-[12px] border border-[#E5E7EB] hover:border-[#E53935] shadow-hf-xs hover:shadow-hf-sm transition-all overflow-hidden flex flex-col justify-between cursor-pointer"
    >
      <div>
        {/* Uniform 152px Illustration Viewport */}
        <div className="relative h-[152px] w-full bg-[#F8FAFC] border-b border-[#F1F5F9] overflow-hidden">
          <ExerciseIllustration id={exercise.id} />

          {/* Top Left Exercise Number & Category Badge */}
          <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
            <span className="px-2 py-0.5 rounded-[5px] bg-[#E53935] text-white font-mono tabular-nums text-[10px] font-extrabold">
              #{String(exercise.number).padStart(2, '0')}
            </span>
            <span className="px-2 py-0.5 rounded-[5px] bg-white/95 border border-[#E5E7EB] text-[10px] font-bold uppercase tracking-wider text-[#111827] shadow-hf-xs">
              {exercise.category}
            </span>
          </div>

          {/* Top Right Difficulty Level Badge */}
          <span
            className={`absolute top-2.5 right-2.5 px-2 py-0.5 rounded-[5px] border text-[10px] font-bold uppercase tracking-wider shadow-hf-xs ${difficultyBadgeStyle}`}
          >
            {exercise.difficulty}
          </span>

          {/* Bottom Left Equipment Pill */}
          <span className="absolute bottom-2.5 left-2.5 inline-flex items-center gap-1 px-2 py-0.5 rounded-[5px] bg-white/95 border border-[#E5E7EB] text-[10px] font-bold text-[#4B5563] shadow-hf-xs">
            <Dumbbell className="w-3 h-3 text-[#E53935]" strokeWidth={2.25} />
            {exercise.equipmentRequired}
          </span>
        </div>

        {/* Card Content Body */}
        <div className="p-4">
          {/* Target Muscle Group */}
          <div className="flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-[0.04em] text-[#E53935] mb-1">
            <Target className="w-3.5 h-3.5 shrink-0" strokeWidth={2.25} />
            <span className="truncate">{exercise.targetMuscleGroup}</span>
          </div>

          {/* Exercise Name */}
          <h3 className="text-[17px] font-bold text-[#111827] tracking-tight group-hover:text-[#E53935] transition-colors">
            {exercise.name}
          </h3>

          {/* Short Technique Summary */}
          <p className="text-[12px] font-normal text-[#4B5563] mt-1 line-clamp-2 leading-relaxed">
            {exercise.shortSummary}
          </p>
        </div>
      </div>

      {/* Card Footer: Sets/Reps Preview + "View Exercise" Button */}
      <div className="px-4 pb-4 pt-2.5 border-t border-[#F8FAFC] space-y-3">
        <div className="flex items-center justify-between text-[11px] font-semibold text-[#6B7280]">
          <span className="inline-flex items-center gap-1 font-mono tabular-nums font-bold text-[#111827]">
            <Layers className="w-3.5 h-3.5 text-[#E53935]" />
            {exercise.suggestedSetsAndReps}
          </span>
          <span className="inline-flex items-center gap-1 text-[#E53935] font-bold">
            <Flame className="w-3 h-3 fill-[#E53935]" />
            Form Guide
          </span>
        </div>

        <Button
          variant="outline"
          size="sm"
          fullWidth
          onClick={(e) => {
            e.stopPropagation();
            onViewExercise();
          }}
          rightIcon={<ChevronRight className="w-4 h-4" strokeWidth={2.25} />}
          className="group-hover:bg-[#E53935] group-hover:text-white group-hover:border-[#E53935]"
        >
          View Exercise
        </Button>
      </div>
    </article>
  );
};
