import React, { useState } from 'react';
import {
  Dumbbell,
  Flame,
  Play,
  Clock,
  Check,
  Copy,
  Smartphone,
  Tablet,
  Monitor,
  Layers,
  Activity,
  Award,
  Timer,
  Search,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Sliders,
  Eye,
  Code2,
} from 'lucide-react';
import {
  COLOR_PALETTE,
  TYPOGRAPHY_SCALE,
  SPACING_SCALE,
  ColorToken,
} from './tokens';
import { Button, IconButton } from './components/Buttons';
import {
  MobileBottomNav,
  DesktopSidebarNav,
  TopNavigationBar,
  NavItemId,
} from './components/Navigation';
import {
  WorkoutCard,
  DailyProgressCard,
  StatisticsCard,
  WeeklyActivityCard,
  ExerciseCategoryCard,
} from './components/Cards';
import {
  WorkoutDurationIndicator,
  ExerciseRepCounter,
  WorkoutProgressBar,
  CircularCountdownTimer,
  RestTimer,
  SetIndicator,
  ExerciseCompletionIndicator,
  WorkoutSessionSummary,
} from './components/WorkoutComponents';
import {
  TextInput,
  NumberInput,
  SelectDropdown,
  Checkbox,
  ToggleSwitch,
  WeightSelector,
} from './components/FormComponents';
import {
  SuccessMessage,
  WarningMessage,
  EmptyState,
  ConfirmationDialog,
  ToastNotification,
} from './components/FeedbackComponents';
import {
  HOMEFIT_EXERCISES,
  ExerciseCard,
  ExerciseItem,
} from './components/ExerciseVisuals';

type SectionId =
  | 'all'
  | 'overview'
  | 'colors'
  | 'typography'
  | 'spacing'
  | 'navigation'
  | 'buttons'
  | 'cards'
  | 'workout'
  | 'exercises'
  | 'forms'
  | 'feedback'
  | 'icons-tokens';

const SECTIONS: { id: SectionId; label: string; badge?: string }[] = [
  { id: 'all', label: 'Complete System (All 12)' },
  { id: 'overview', label: '1. Direction & Mobile Preview' },
  { id: 'colors', label: '2. Color System (#E53935)' },
  { id: 'typography', label: '3. Typography Scale' },
  { id: 'spacing', label: '4. Spacing & Layout' },
  { id: 'navigation', label: '5. Navigation Library' },
  { id: 'buttons', label: '6. Button System' },
  { id: 'cards', label: '7. Card Library (6 Types)' },
  { id: 'workout', label: '8. Workout Components (8)' },
  { id: 'exercises', label: '9. Exercise Visuals (12)', badge: '12' },
  { id: 'forms', label: '10. Form & Weight Controls' },
  { id: 'feedback', label: '11. Feedback & States' },
  { id: 'icons-tokens', label: '12. Lucide Icons & CSS Tokens' },
];

export const DesignSystemShowcase: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('all');
  const [copiedToken, setCopiedToken] = useState<string | null>(null);

  // Interactive states for showcase demonstrations
  const [demoMobileTab, setDemoMobileTab] = useState<NavItemId>('workouts');
  const [demoSidebarTab, setDemoSidebarTab] = useState<NavItemId>('today');
  const [equipmentFilter, setEquipmentFilter] = useState<string>('All');
  const [selectedExercise, setSelectedExercise] = useState<ExerciseItem>(
    HOMEFIT_EXERCISES[0]
  );

  // Form states
  const [routineName, setRoutineName] = useState('30-Min Full-Body Barbell & Core');
  const [targetDuration, setTargetDuration] = useState(30);
  const [equipmentMode, setEquipmentMode] = useState('full-home');
  const [autoStartRest, setAutoStartRest] = useState(true);
  const [audioBeeps, setAudioBeeps] = useState(true);
  const [includeWarmup, setIncludeWarmup] = useState(true);
  const [includeCooldown, setIncludeCooldown] = useState(false);

  // Responsive layout tab
  const [viewportTab, setViewportTab] = useState<'mobile' | 'tablet' | 'desktop'>(
    'mobile'
  );

  const handleCopy = (text: string) => {
    navigator.clipboard?.writeText(text);
    setCopiedToken(text);
    setTimeout(() => setCopiedToken(null), 1800);
  };

  const shouldShow = (section: SectionId) =>
    activeSection === 'all' || activeSection === section;

  const filteredExercises =
    equipmentFilter === 'All'
      ? HOMEFIT_EXERCISES
      : HOMEFIT_EXERCISES.filter((ex) => ex.equipment === equipmentFilter);

  return (
    <div className="min-h-screen bg-white text-[#111827] flex flex-col">
      {/* =====================================================================
          STICKY DESIGN SYSTEM TOP HEADER
          ===================================================================== */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-[#E5E7EB]">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-[10px] bg-[#E53935] text-white flex items-center justify-center font-extrabold text-[17px] tracking-tighter shadow-hf-red">
              30
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-[17px] font-extrabold tracking-tight text-[#111827]">
                  HomeFit 30
                </h1>
                <span className="px-2 py-0.5 rounded-[5px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] text-[11px] font-bold uppercase tracking-wider">
                  UI Design System v1.0
                </span>
              </div>
              <p className="text-[12px] font-medium text-[#6B7280] hidden sm:block">
                Mobile-First 30-Minute Home Workout PWA • White (#FFFFFF) & Athletic Red (#E53935)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2.5">
            {copiedToken && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] bg-[#111827] text-white text-[12px] font-mono font-semibold animate-fade-in">
                <Check className="w-3.5 h-3.5 text-[#16A34A]" />
                Copied {copiedToken}
              </span>
            )}
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-[8px] bg-[#F8FAFC] border border-[#E5E7EB] text-[12px] font-semibold text-[#4B5563]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#E53935]" />
              <span>Primary: #E53935</span>
              <span className="text-[#D1D5DB]">•</span>
              <span className="w-2.5 h-2.5 rounded-full bg-white border border-[#D1D5DB]" />
              <span>Surface: #FFFFFF</span>
            </div>
          </div>
        </div>

        {/* Horizontal Filter Bar for Fast Inspection */}
        <div className="border-t border-[#F1F5F9] bg-[#F8FAFC]">
          <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 py-2 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
            {SECTIONS.map((sec) => {
              const active = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => setActiveSection(sec.id)}
                  className={`px-3 py-1.5 rounded-[7px] text-[12px] font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    active
                      ? 'bg-[#E53935] text-white shadow-hf-xs'
                      : 'bg-white text-[#4B5563] hover:text-[#111827] border border-[#E5E7EB]'
                  }`}
                >
                  <span>{sec.label}</span>
                  {sec.badge && (
                    <span
                      className={`px-1.5 py-0.2 rounded-[4px] font-mono text-[10px] font-bold ${
                        active
                          ? 'bg-white/20 text-white'
                          : 'bg-[#FEF2F2] text-[#E53935]'
                      }`}
                    >
                      {sec.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* =====================================================================
          MAIN SHOWCASE BODY
          ===================================================================== */}
      <main className="flex-1 max-w-[1360px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        {/* -------------------------------------------------------------------
            SECTION 1: PRODUCT OVERVIEW, VISUAL DIRECTION & MOBILE PWA PREVIEW
            ------------------------------------------------------------------- */}
        {shouldShow('overview') && (
          <section className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              {/* Left 7 Cols: Visual Direction & Principles */}
              <div className="lg:col-span-7 space-y-6">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[6px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] text-[12px] font-bold uppercase tracking-wider">
                  <Sparkles className="w-3.5 h-3.5" />
                  Senior UI/UX Design System Specification
                </div>

                <h2 className="text-[32px] sm:text-[40px] leading-[1.1] font-extrabold tracking-[-0.03em] text-[#111827]">
                  HomeFit 30 — Mobile-First Athletic Design System
                </h2>

                <p className="text-[16px] leading-[1.6] text-[#4B5563]">
                  Engineered for structured <strong>30-minute full-body home workouts</strong>{' '}
                  combining Barbell, Dumbbells, Push-Ups, Bodyweight, and Core exercises.
                  Built with a crisp <strong>#FFFFFF white surface architecture</strong>,
                  high-contrast charcoal typography, and strategic athletic{' '}
                  <strong>#E53935 red</strong> accents for immediate readability during
                  high-heart-rate training sessions.
                </p>

                {/* Equipment Modality Pill Row */}
                <div className="flex flex-wrap gap-2">
                  {[
                    'Barbell Compounds',
                    'Dumbbell Strength',
                    'Push-Up Variations',
                    'Bodyweight Legs',
                    'Core & Floor Holds',
                  ].map((item) => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[8px] bg-[#F8FAFC] border border-[#E5E7EB] text-[12px] font-bold text-[#111827]"
                    >
                      <Dumbbell className="w-3.5 h-3.5 text-[#E53935]" />
                      {item}
                    </span>
                  ))}
                </div>

                {/* Do / Avoid Design Guardrails */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 rounded-[12px] bg-white border border-[#E5E7EB] shadow-hf-xs">
                    <div className="flex items-center gap-2 text-[13px] font-bold text-[#16A34A] uppercase tracking-wider mb-2.5">
                      <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} />
                      Visual Characteristics
                    </div>
                    <ul className="space-y-2 text-[13px] font-medium text-[#4B5563]">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                        Predominantly crisp white (#FFFFFF) canvas
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                        Strategic #E53935 Red for CTAs, timers & progress
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                        Tabular monospace numbers for zero timer jitter
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A]" />
                        44px–52px touch targets for sweaty hands
                      </li>
                    </ul>
                  </div>

                  <div className="p-4 rounded-[12px] bg-white border border-[#E5E7EB] shadow-hf-xs">
                    <div className="flex items-center gap-2 text-[13px] font-bold text-[#E53935] uppercase tracking-wider mb-2.5">
                      <ShieldCheck className="w-4 h-4" strokeWidth={2.5} />
                      Strict Anti-Patterns Avoided
                    </div>
                    <ul className="space-y-2 text-[13px] font-medium text-[#4B5563]">
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E53935]" />
                        No dark mode / heavy dark backgrounds
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E53935]" />
                        No muddy gradients or excessive drop shadows
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E53935]" />
                        No cartoon 32px pill-rounded cards (max 8px–12px)
                      </li>
                      <li className="flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#E53935]" />
                        No decorative clutter competing with workout metrics
                      </li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Right 5 Cols: Live Mobile Viewport Reference Frame (375px PWA Shell) */}
              <div className="lg:col-span-5 flex flex-col items-center">
                <div className="w-full max-w-[380px] rounded-[20px] border-2 border-[#E5E7EB] bg-white shadow-hf-lg overflow-hidden">
                  {/* Simulated Mobile Status Bar */}
                  <div className="px-4 py-2 bg-white border-b border-[#F1F5F9] flex items-center justify-between text-[11px] font-mono font-bold text-[#111827]">
                    <span>09:41</span>
                    <span className="text-[10px] font-sans font-bold uppercase tracking-widest text-[#E53935]">
                      HomeFit 30 PWA • 375px
                    </span>
                    <span>100%</span>
                  </div>

                  {/* Top Navigation Bar inside Mobile Frame */}
                  <TopNavigationBar
                    title="HomeFit 30"
                    subtitle="Full-Body Strength"
                    streakCount={14}
                  />

                  {/* Scrollable Interior Preview */}
                  <div className="p-4 space-y-3.5 bg-white">
                    {/* Compact Daily Progress Summary */}
                    <div className="p-3.5 rounded-[10px] bg-[#FEF2F2] border border-[#FECACA] flex items-center justify-between">
                      <div>
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#E53935] block">
                          Active 30-Min Session
                        </span>
                        <h4 className="text-[15px] font-extrabold text-[#111827]">
                          Barbell & Core Circuit
                        </h4>
                        <span className="font-mono tabular-nums text-[12px] font-bold text-[#C62828]">
                          18:45 / 30:00 Elapsed
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="font-mono tabular-nums text-[22px] font-extrabold text-[#E53935] block leading-none">
                          62%
                        </span>
                        <span className="text-[10px] font-bold uppercase text-[#6B7280]">
                          Set 11 of 18
                        </span>
                      </div>
                    </div>

                    {/* Active Exercise Mini Preview */}
                    <div className="p-3.5 rounded-[10px] bg-white border border-[#E5E7EB]">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[11px] font-bold uppercase text-[#6B7280]">
                          Current Exercise
                        </span>
                        <span className="font-mono text-[11px] font-bold text-[#E53935] bg-[#FEF2F2] px-2 py-0.5 rounded-[4px]">
                          Set 3 of 4
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <h5 className="text-[15px] font-bold text-[#111827]">
                            {selectedExercise.name}
                          </h5>
                          <p className="text-[12px] text-[#4B5563]">
                            {selectedExercise.setsAndReps} • {selectedExercise.recommendedLoad}
                          </p>
                        </div>
                        <Button variant="primary" size="sm">
                          Log Set
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Mobile Bottom Navigation */}
                  <MobileBottomNav
                    activeTab={demoMobileTab}
                    onSelect={setDemoMobileTab}
                  />
                </div>
                <span className="mt-2 text-[11px] font-semibold text-[#6B7280]">
                  Interactive Mobile PWA Shell Preview (Tap Bottom Tabs)
                </span>
              </div>
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------------
            SECTION 2: COMPLETE COLOR SYSTEM
            ------------------------------------------------------------------- */}
        {shouldShow('colors') && (
          <section className="space-y-6 pt-4 border-t border-[#E5E7EB]">
            <SectionHeader
              number="01"
              title="Color System & Brand Palette"
              subtitle="Anchored on a clean White (#FFFFFF) primary surface and high-energy Athletic Red (#E53935). Click any swatch to copy its CSS variable."
            />

            <ColorGroupGrid
              title="Primary Brand Red Palette (#E53935)"
              description="Used strategically for primary CTAs, active navigation states, workout progress rings, countdown timers, and active set indicators."
              tokens={COLOR_PALETTE.brand}
              onCopy={handleCopy}
            />

            <ColorGroupGrid
              title="Primary White Surfaces & Secondary Slate Accents"
              description="Predominantly white interface backgrounds paired with subtle cool off-white grouping wells (#F8FAFC) and structured 1px borders."
              tokens={COLOR_PALETTE.secondaryAndSurfaces}
              onCopy={handleCopy}
            />

            <ColorGroupGrid
              title="Typography Hierarchy & Border Tokens"
              description="High-contrast charcoal ink (#111827) ensures effortless legibility at arm's length on the gym floor."
              tokens={COLOR_PALETTE.typographyAndBorders}
              onCopy={handleCopy}
            />

            <ColorGroupGrid
              title="Semantic Status & Feedback Colors"
              description="Clear status cues for completed sets, form/load warnings, and destructive actions."
              tokens={COLOR_PALETTE.semanticStatus}
              onCopy={handleCopy}
            />
          </section>
        )}

        {/* -------------------------------------------------------------------
            SECTION 3: TYPOGRAPHY SYSTEM
            ------------------------------------------------------------------- */}
        {shouldShow('typography') && (
          <section className="space-y-6 pt-4 border-t border-[#E5E7EB]">
            <SectionHeader
              number="02"
              title="Typography Scale & Numeric Precision"
              subtitle="Inter for crisp UI hierarchy paired with JetBrains Mono (tabular-nums) for countdown timers, rep counters, and weight selectors."
            />

            <div className="bg-white rounded-[12px] border border-[#E5E7EB] divide-y divide-[#F1F5F9] overflow-hidden shadow-hf-xs">
              {TYPOGRAPHY_SCALE.map((spec) => (
                <div
                  key={spec.role}
                  className="p-5 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center hover:bg-[#F8FAFC]/60 transition-colors"
                >
                  <div className="lg:col-span-4 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[14px] font-bold text-[#111827]">
                        {spec.role}
                      </span>
                      <span className="px-2 py-0.5 rounded-[4px] bg-[#FEF2F2] text-[#E53935] font-mono text-[11px] font-bold">
                        {spec.sizePx}
                      </span>
                    </div>
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] font-mono text-[#6B7280]">
                      <span>{spec.fontFamily}</span>
                      <span>•</span>
                      <span>{spec.weight}</span>
                      <span>•</span>
                      <span>LH: {spec.lineHeight}</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleCopy(spec.token)}
                      className="inline-flex items-center gap-1 text-[11px] font-mono font-semibold text-[#4B5563] hover:text-[#E53935]"
                    >
                      <Copy className="w-3 h-3" /> {spec.token}
                    </button>
                  </div>

                  <div className="lg:col-span-8">
                    <div className={spec.className}>{spec.sampleText}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------------
            SECTION 4: SPACING SCALE & RESPONSIVE LAYOUT GUIDELINES
            ------------------------------------------------------------------- */}
        {shouldShow('spacing') && (
          <section className="space-y-8 pt-4 border-t border-[#E5E7EB]">
            <SectionHeader
              number="03"
              title="Spacing Scale & Mobile-First Responsive Layout"
              subtitle="4px base spatial grid with dedicated tokens for page margins, section spacing, card padding, and responsive breakpoints."
            />

            {/* Visual Spacing Scale Table */}
            <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-5 shadow-hf-xs">
              <h3 className="text-[16px] font-bold text-[#111827] mb-4">
                Spatial Scale Tokens (4px Base Unit)
              </h3>
              <div className="space-y-3">
                {SPACING_SCALE.map((sp) => (
                  <div
                    key={sp.token}
                    className="grid grid-cols-1 sm:grid-cols-12 gap-3 items-center py-2 border-b border-[#F8FAFC] last:border-0"
                  >
                    <div className="sm:col-span-3 flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleCopy(sp.token)}
                        className="font-mono text-[12px] font-bold text-[#111827] hover:text-[#E53935] flex items-center gap-1"
                      >
                        <Copy className="w-3 h-3 text-[#6B7280]" />
                        {sp.token}
                      </button>
                    </div>
                    <div className="sm:col-span-2 font-mono tabular-nums text-[12px] font-semibold text-[#4B5563]">
                      {sp.px}px ({sp.rem})
                    </div>
                    <div className="sm:col-span-3 flex items-center">
                      <div
                        className="h-4 bg-[#E53935] rounded-[3px]"
                        style={{ width: `${Math.min(sp.px * 3.5, 220)}px` }}
                      />
                    </div>
                    <div className="sm:col-span-4 text-[12px] font-medium text-[#4B5563]">
                      {sp.usage}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Responsive Architecture Guidelines (Mobile / Tablet / Desktop) */}
            <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-6 shadow-hf-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="text-[18px] font-bold text-[#111827]">
                    Responsive Breakpoint & Layout Architecture
                  </h3>
                  <p className="text-[13px] font-medium text-[#4B5563]">
                    Inspect how page margins, navigation patterns, and card grids adapt across devices.
                  </p>
                </div>

                <div className="inline-flex p-1 rounded-[8px] bg-[#F8FAFC] border border-[#E5E7EB]">
                  {[
                    { id: 'mobile', label: 'Mobile (375px)', icon: Smartphone },
                    { id: 'tablet', label: 'Tablet (768px)', icon: Tablet },
                    { id: 'desktop', label: 'Desktop (1024px+)', icon: Monitor },
                  ].map((bp) => {
                    const Icon = bp.icon;
                    const active = viewportTab === bp.id;
                    return (
                      <button
                        key={bp.id}
                        type="button"
                        onClick={() =>
                          setViewportTab(bp.id as 'mobile' | 'tablet' | 'desktop')
                        }
                        className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-[6px] text-[12px] font-bold transition-all ${
                          active
                            ? 'bg-[#E53935] text-white shadow-hf-xs'
                            : 'text-[#4B5563] hover:text-[#111827]'
                        }`}
                      >
                        <Icon className="w-3.5 h-3.5" />
                        <span>{bp.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div
                  className={`p-5 rounded-[10px] border transition-all ${
                    viewportTab === 'mobile'
                      ? 'border-[#E53935] bg-[#FEF2F2]/30 ring-1 ring-[#E53935]/20'
                      : 'border-[#E5E7EB] bg-[#F8FAFC]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[12px] font-bold uppercase tracking-wider text-[#E53935]">
                      Mobile Layout (Default)
                    </span>
                    <Smartphone className="w-4 h-4 text-[#E53935]" />
                  </div>
                  <h4 className="text-[16px] font-bold text-[#111827] mb-2">
                    320px – 767px Viewport
                  </h4>
                  <ul className="space-y-2 text-[13px] font-medium text-[#4B5563]">
                    <li>• <strong>Page Margin:</strong> 16px (`--hf-page-margin-mobile`)</li>
                    <li>• <strong>Card Padding:</strong> 16px (`--hf-card-padding-sm`)</li>
                    <li>• <strong>Grid System:</strong> 1-column stack (2-col for compact KPI stats)</li>
                    <li>• <strong>Grid Gap:</strong> 12px (`--hf-grid-gap-sm`)</li>
                    <li>• <strong>Navigation:</strong> Fixed 64px Mobile Bottom Navigation Bar + 60px Top Bar</li>
                  </ul>
                </div>

                <div
                  className={`p-5 rounded-[10px] border transition-all ${
                    viewportTab === 'tablet'
                      ? 'border-[#E53935] bg-[#FEF2F2]/30 ring-1 ring-[#E53935]/20'
                      : 'border-[#E5E7EB] bg-[#F8FAFC]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[12px] font-bold uppercase tracking-wider text-[#E53935]">
                      Tablet Layout
                    </span>
                    <Tablet className="w-4 h-4 text-[#E53935]" />
                  </div>
                  <h4 className="text-[16px] font-bold text-[#111827] mb-2">
                    768px – 1023px Viewport
                  </h4>
                  <ul className="space-y-2 text-[13px] font-medium text-[#4B5563]">
                    <li>• <strong>Page Margin:</strong> 24px (`--hf-page-margin-tablet`)</li>
                    <li>• <strong>Card Padding:</strong> 20px (`--hf-card-padding-md`)</li>
                    <li>• <strong>Grid System:</strong> 2-column exercise & workout card grids</li>
                    <li>• <strong>Grid Gap:</strong> 16px (`--hf-grid-gap-md`)</li>
                    <li>• <strong>Workout Mode:</strong> Split view (Timer left + Active Sets right)</li>
                  </ul>
                </div>

                <div
                  className={`p-5 rounded-[10px] border transition-all ${
                    viewportTab === 'desktop'
                      ? 'border-[#E53935] bg-[#FEF2F2]/30 ring-1 ring-[#E53935]/20'
                      : 'border-[#E5E7EB] bg-[#F8FAFC]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[12px] font-bold uppercase tracking-wider text-[#E53935]">
                      Desktop Layout
                    </span>
                    <Monitor className="w-4 h-4 text-[#E53935]" />
                  </div>
                  <h4 className="text-[16px] font-bold text-[#111827] mb-2">
                    1024px – 1360px+ Viewport
                  </h4>
                  <ul className="space-y-2 text-[13px] font-medium text-[#4B5563]">
                    <li>• <strong>Page Margin:</strong> 32px (`--hf-page-margin-desktop`)</li>
                    <li>• <strong>Card Padding:</strong> 24px (`--hf-card-padding-lg`)</li>
                    <li>• <strong>Grid System:</strong> 12-column grid (3–4 exercise cards per row)</li>
                    <li>• <strong>Grid Gap:</strong> 24px (`--hf-grid-gap-lg`)</li>
                    <li>• <strong>Navigation:</strong> Persistent 256px Left Sidebar Navigation</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------------
            SECTION 5: NAVIGATION COMPONENTS
            ------------------------------------------------------------------- */}
        {shouldShow('navigation') && (
          <section className="space-y-6 pt-4 border-t border-[#E5E7EB]">
            <SectionHeader
              number="04"
              title="Navigation Components"
              subtitle="Reusable navigation patterns for mobile bottom bar, top context headers, and desktop sidebar with distinct active (#E53935) and inactive states."
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Desktop Sidebar Component Preview */}
              <div className="lg:col-span-4 bg-[#F8FAFC] p-4 rounded-[12px] border border-[#E5E7EB] flex flex-col items-center">
                <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] mb-3 self-start">
                  Desktop Sidebar Navigation (256px)
                </span>
                <div className="rounded-[12px] overflow-hidden border border-[#E5E7EB] shadow-hf-xs w-full flex justify-center bg-white">
                  <DesktopSidebarNav
                    activeTab={demoSidebarTab}
                    onSelect={setDemoSidebarTab}
                  />
                </div>
              </div>

              {/* Top Navigation Bars & Mobile Bottom Bar */}
              <div className="lg:col-span-8 space-y-6">
                {/* Top Navigation Bar - Dashboard Mode */}
                <div className="bg-[#F8FAFC] p-4 rounded-[12px] border border-[#E5E7EB] space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] block">
                    Top Navigation Bar — Dashboard Variant
                  </span>
                  <div className="rounded-[10px] overflow-hidden border border-[#E5E7EB] shadow-hf-xs">
                    <TopNavigationBar
                      title="HomeFit 30"
                      subtitle="Monday • Upper & Lower Strength"
                      variant="dashboard"
                      streakCount={12}
                    />
                  </div>
                </div>

                {/* Top Navigation Bar - Active Workout Mode */}
                <div className="bg-[#F8FAFC] p-4 rounded-[12px] border border-[#E5E7EB] space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] block">
                    Top Navigation Bar — Active 30-Min Session Variant
                  </span>
                  <div className="rounded-[10px] overflow-hidden border border-[#E5E7EB] shadow-hf-xs">
                    <TopNavigationBar
                      title="30-Min Full Body Circuit"
                      variant="workout-session"
                      sessionProgressText="Exercise 5 of 10 • 14:20 Remaining"
                    />
                  </div>
                </div>

                {/* Mobile Bottom Navigation */}
                <div className="bg-[#F8FAFC] p-4 rounded-[12px] border border-[#E5E7EB] space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280]">
                      Mobile Bottom Navigation (Interactive Active / Inactive States)
                    </span>
                    <span className="text-[11px] font-mono font-semibold text-[#E53935]">
                      Active: {demoMobileTab}
                    </span>
                  </div>
                  <div className="rounded-[10px] overflow-hidden border border-[#E5E7EB] shadow-hf-xs max-w-md mx-auto">
                    <MobileBottomNav
                      activeTab={demoMobileTab}
                      onSelect={setDemoMobileTab}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------------
            SECTION 6: BUTTON SYSTEM
            ------------------------------------------------------------------- */}
        {shouldShow('buttons') && (
          <section className="space-y-6 pt-4 border-t border-[#E5E7EB]">
            <SectionHeader
              number="05"
              title="Button Component Library"
              subtitle="Primary Red (#E53935), Secondary Athletic Slate (#1E293B), Outline, Icon, Disabled, and Loading button states across 3 ergonomic sizes."
            />

            <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-6 shadow-hf-xs space-y-8">
              {/* Row 1: Core Variants */}
              <div>
                <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#6B7280] mb-4">
                  Button Variants (Primary, Secondary, Outline, Disabled, Loading)
                </h4>
                <div className="flex flex-wrap items-center gap-3.5">
                  <Button
                    variant="primary"
                    leftIcon={<Play className="w-4 h-4 fill-current" />}
                  >
                    Start 30-Min Workout
                  </Button>

                  <Button
                    variant="secondary"
                    leftIcon={<Dumbbell className="w-4 h-4" />}
                  >
                    Log Working Set
                  </Button>

                  <Button variant="outline">Customize Equipment</Button>

                  <Button variant="danger">End Session</Button>

                  <Button variant="primary" disabled>
                    Disabled Button
                  </Button>

                  <Button variant="primary" loading>
                    Syncing Session...
                  </Button>
                </div>
              </div>

              {/* Row 2: Size Scale & Icon Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[#F1F5F9]">
                <div>
                  <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#6B7280] mb-4">
                    Size Scale (Small 36px • Medium 44px • Large 52px Mobile CTA)
                  </h4>
                  <div className="flex flex-wrap items-center gap-3">
                    <Button variant="primary" size="sm">
                      Small (36px)
                    </Button>
                    <Button variant="primary" size="md">
                      Medium (44px)
                    </Button>
                    <Button
                      variant="primary"
                      size="lg"
                      leftIcon={<Flame className="w-5 h-5 fill-current" />}
                    >
                      Large Workout CTA (52px)
                    </Button>
                  </div>
                </div>

                <div>
                  <h4 className="text-[13px] font-bold uppercase tracking-wider text-[#6B7280] mb-4">
                    Icon Buttons (Primary, Secondary, Outline, Subtle, Disabled)
                  </h4>
                  <div className="flex flex-wrap items-center gap-3">
                    <IconButton
                      variant="primary"
                      label="Play Workout"
                      icon={<Play className="w-4 h-4 fill-current" />}
                    />
                    <IconButton
                      variant="secondary"
                      label="Equipment"
                      icon={<Dumbbell className="w-4 h-4" />}
                    />
                    <IconButton
                      variant="outline"
                      label="Timer"
                      icon={<Timer className="w-4 h-4" />}
                    />
                    <IconButton
                      variant="subtle"
                      label="Filter"
                      icon={<Sliders className="w-4 h-4" />}
                    />
                    <IconButton
                      variant="outline"
                      disabled
                      label="Disabled Icon"
                      icon={<Play className="w-4 h-4" />}
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------------
            SECTION 7: CARD COMPONENT LIBRARY
            ------------------------------------------------------------------- */}
        {shouldShow('cards') && (
          <section className="space-y-6 pt-4 border-t border-[#E5E7EB]">
            <SectionHeader
              number="06"
              title="Card Component Library"
              subtitle="Clean white card containers (#FFFFFF) with 1px structural borders (#E5E7EB) for workouts, daily progress, statistics, weekly consistency, and equipment categories."
            />

            {/* Row 1: Workout Cards & Daily Progress Card */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <WorkoutCard
                title="30-Min Barbell & Bodyweight Power"
                focusArea="Full-Body Compound Strength & Hypertrophy"
                durationMin={30}
                exerciseCount={6}
                estimatedCalories={340}
                difficulty="Intermediate"
                equipmentList={['Barbell', 'Push-Ups', 'Core Floor']}
                completionPercent={65}
                featured
              />

              <WorkoutCard
                title="30-Min Dumbbell & Core Sculpt"
                focusArea="Upper Push/Pull, Lunges & Abdominal Circuit"
                durationMin={30}
                exerciseCount={8}
                estimatedCalories={310}
                difficulty="Beginner"
                equipmentList={['Dumbbells', 'Bodyweight', 'Plank']}
                completionPercent={0}
              />

              <DailyProgressCard
                workoutTitle="Today’s 30-Min Goal"
                completedMinutes={20}
                targetMinutes={30}
                completedSets={12}
                targetSets={18}
                caloriesBurned={235}
              />
            </div>

            {/* Row 2: Statistics Cards (4-col grid) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <StatisticsCard
                label="Monthly 30m Sessions"
                value="18"
                unit="Workouts"
                trend="+22%"
                trendPositive
                accentRed
                icon={<Flame className="w-4 h-4" strokeWidth={2.25} />}
              />
              <StatisticsCard
                label="Total Training Time"
                value="540"
                unit="Minutes"
                trend="+90 min"
                trendPositive
                icon={<Clock className="w-4 h-4" strokeWidth={2.25} />}
              />
              <StatisticsCard
                label="Barbell & DB Volume"
                value="42.8"
                unit="Tons"
                trend="+8.4%"
                trendPositive
                icon={<Dumbbell className="w-4 h-4" strokeWidth={2.25} />}
              />
              <StatisticsCard
                label="Completion Rate"
                value="96"
                unit="%"
                trend="Top Streak"
                trendPositive
                accentRed
                icon={<Award className="w-4 h-4" strokeWidth={2.25} />}
              />
            </div>

            {/* Row 3: Weekly Activity Card + Exercise Category Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-6">
                <WeeklyActivityCard />
              </div>

              <div className="lg:col-span-6 space-y-3">
                <ExerciseCategoryCard
                  title="Barbell Compound Lifts"
                  subtitle="Squat, Deadlift & Bent-Over Barbell Row"
                  exerciseCount={3}
                  durationRange="12–15 Min Block"
                  active
                  icon={<Dumbbell className="w-5 h-5" strokeWidth={2.25} />}
                />
                <ExerciseCategoryCard
                  title="Dumbbell Hypertrophy"
                  subtitle="Row, Shoulder Press, Bicep Curl & Lateral Raise"
                  exerciseCount={4}
                  durationRange="10–12 Min Block"
                  icon={<Layers className="w-5 h-5" strokeWidth={2.25} />}
                />
                <ExerciseCategoryCard
                  title="Bodyweight, Push-Ups & Core Floor"
                  subtitle="Push-Ups, Lunges, Plank, Leg Raises & Mountain Climbers"
                  exerciseCount={5}
                  durationRange="8–10 Min Finisher"
                  icon={<Activity className="w-5 h-5" strokeWidth={2.25} />}
                />
              </div>
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------------
            SECTION 8: WORKOUT-SPECIFIC COMPONENTS
            ------------------------------------------------------------------- */}
        {shouldShow('workout') && (
          <section className="space-y-6 pt-4 border-t border-[#E5E7EB]">
            <SectionHeader
              number="07"
              title="Workout-Specific Components"
              subtitle="Interactive training controls built for real-time 30-minute workout execution: timers, rep counters, segmented progress, rest recovery, set trackers, and session summary."
            />

            {/* Top pair: Duration Indicator + Segmented Progress Bar */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <WorkoutDurationIndicator
                elapsedMinutes={18}
                totalMinutes={30}
                currentPhase="Block 2: Barbell & Dumbbell Strength"
              />
              <WorkoutProgressBar
                currentStep={7}
                totalSteps={12}
                elapsedTime="18:00"
                remainingTime="12:00"
              />
            </div>

            {/* Middle 3-col: Circular Timer, Rest Timer, Rep Counter */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <CircularCountdownTimer />
              <RestTimer />
              <ExerciseRepCounter />
            </div>

            {/* Set Indicator & Exercise Completion Checklist */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <SetIndicator />
              <ExerciseCompletionIndicator />
            </div>

            {/* Full-Width Workout Session Summary */}
            <WorkoutSessionSummary />
          </section>
        )}

        {/* -------------------------------------------------------------------
            SECTION 9: EXERCISE VISUAL STYLE & ALL 12 EXERCISE CARDS
            ------------------------------------------------------------------- */}
        {shouldShow('exercises') && (
          <section className="space-y-6 pt-4 border-t border-[#E5E7EB]">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
              <SectionHeader
                number="08"
                title="Exercise Visual Style & 12-Exercise Library"
                subtitle="Consistent athletic vector illustrations highlighting target muscle groups and equipment in #E53935 red across all 12 core HomeFit 30 movements."
              />

              {/* Equipment Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-1.5">
                {['All', 'Barbell', 'Dumbbells', 'Bodyweight', 'Core & Floor'].map(
                  (cat) => {
                    const active = equipmentFilter === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setEquipmentFilter(cat)}
                        className={`px-3 py-1.5 rounded-[7px] text-[12px] font-bold transition-all ${
                          active
                            ? 'bg-[#E53935] text-white shadow-hf-xs'
                            : 'bg-[#F8FAFC] text-[#4B5563] hover:text-[#111827] border border-[#E5E7EB]'
                        }`}
                      >
                        {cat}
                      </button>
                    );
                  }
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
              {filteredExercises.map((exercise) => (
                <ExerciseCard
                  key={exercise.id}
                  exercise={exercise}
                  selected={selectedExercise.id === exercise.id}
                  onSelect={setSelectedExercise}
                />
              ))}
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------------
            SECTION 10: FORM COMPONENTS & WEIGHT SELECTOR
            ------------------------------------------------------------------- */}
        {shouldShow('forms') && (
          <section className="space-y-6 pt-4 border-t border-[#E5E7EB]">
            <SectionHeader
              number="09"
              title="Form Components & Weight Selector"
              subtitle="Clean #F9FAFB input surfaces that transition to crisp #FFFFFF with a 2px #E53935 focus ring, plus a tactile barbell/dumbbell weight selector."
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Left 7 Cols: Standard Inputs, Dropdown, Checkboxes, Toggles */}
              <div className="lg:col-span-7 bg-white rounded-[12px] border border-[#E5E7EB] p-6 shadow-hf-xs space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <TextInput
                    label="Workout Session Name"
                    value={routineName}
                    onChange={(e) => setRoutineName(e.target.value)}
                    helperText="Displayed on your daily 30-min schedule"
                    leftIcon={<Search className="w-4 h-4" />}
                  />

                  <NumberInput
                    label="Session Target Duration"
                    unit="MIN"
                    value={targetDuration}
                    min={15}
                    max={60}
                    onChange={(e) => setTargetDuration(Number(e.target.value))}
                    helperText="Standard HomeFit 30 format is 30 mins"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <SelectDropdown
                    label="Available Home Equipment"
                    value={equipmentMode}
                    onChange={(e) => setEquipmentMode(e.target.value)}
                    options={[
                      {
                        value: 'full-home',
                        label: 'Barbell + Dumbbells + Bodyweight (Full)',
                      },
                      {
                        value: 'dumbbells-only',
                        label: 'Dumbbells + Bodyweight & Core',
                      },
                      {
                        value: 'bodyweight-only',
                        label: 'Bodyweight, Push-Ups & Core Only',
                      },
                    ]}
                    helperText="Filters exercises automatically"
                  />

                  <TextInput
                    label="Validation Error State Example"
                    defaultValue="0 KG"
                    errorText="Barbell weight must be at least 20 KG (empty bar)"
                  />
                </div>

                {/* Checkboxes */}
                <div className="pt-2">
                  <span className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-[#4B5563] mb-2">
                    Session Structure Options (Checkbox)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Checkbox
                      label="Include 3-Min Dynamic Warm-Up"
                      description="Mobility prep before barbell squats"
                      checked={includeWarmup}
                      onChange={setIncludeWarmup}
                    />
                    <Checkbox
                      label="Include Post-Workout Core Finisher"
                      description="Plank, Leg Raises & Mountain Climbers"
                      checked={includeCooldown}
                      onChange={setIncludeCooldown}
                    />
                  </div>
                </div>

                {/* Toggle Switches */}
                <div className="pt-2">
                  <span className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-[#4B5563] mb-2">
                    Workout Automation Preferences (Toggle Switch)
                  </span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <ToggleSwitch
                      label="Auto-Start 45s Rest Timer"
                      description="Triggers immediately when a set is checked"
                      checked={autoStartRest}
                      onChange={setAutoStartRest}
                    />
                    <ToggleSwitch
                      label="Countdown Audio Beeps"
                      description="3-2-1 cue during Plank & Mountain Climbers"
                      checked={audioBeeps}
                      onChange={setAudioBeeps}
                    />
                  </div>
                </div>
              </div>

              {/* Right 5 Cols: Weight Selector */}
              <div className="lg:col-span-5 space-y-4">
                <WeightSelector
                  initialWeight={52.5}
                  initialUnit="KG"
                  equipmentType="Barbell"
                />
                <WeightSelector
                  initialWeight={16}
                  initialUnit="KG"
                  equipmentType="Dumbbell"
                />
              </div>
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------------
            SECTION 11: FEEDBACK COMPONENTS
            ------------------------------------------------------------------- */}
        {shouldShow('feedback') && (
          <section className="space-y-6 pt-4 border-t border-[#E5E7EB]">
            <SectionHeader
              number="10"
              title="Feedback & State Components"
              subtitle="High-clarity feedback states for completed milestones, load warnings, empty routines, session confirmation dialogs, and PR toast notifications."
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              <div className="lg:col-span-6 space-y-4">
                <SuccessMessage
                  title="30-Minute Full-Body Workout Logged!"
                  description="All 18 working sets saved. You extended your active home training streak to 14 days."
                  actionLabel="View Log"
                />

                <WarningMessage
                  title="Heavy Load Jump Detected (+15 KG)"
                  description="You increased Barbell Deadlift from 60 KG to 75 KG. Verify your warm-up sets and lower-back bracing."
                  actionLabel="Adjust KG"
                />

                <div className="pt-2">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] block mb-2">
                    Toast Notification Component
                  </span>
                  <ToastNotification />
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] block mb-2">
                    Confirmation Dialog Component
                  </span>
                  <ConfirmationDialog />
                </div>
              </div>
            </div>

            {/* Empty State Component */}
            <div className="pt-2">
              <EmptyState />
            </div>
          </section>
        )}

        {/* -------------------------------------------------------------------
            SECTION 12: LUCIDE ICON SYSTEM & REUSABLE CSS DESIGN TOKENS
            ------------------------------------------------------------------- */}
        {shouldShow('icons-tokens') && (
          <section className="space-y-6 pt-4 border-t border-[#E5E7EB]">
            <SectionHeader
              number="11"
              title="Lucide Icon Standards & CSS Design Tokens"
              subtitle="Standardized Lucide icon sizing, stroke weights, alignment, and copy-ready CSS Custom Properties (:root) for seamless React + Tailwind integration."
            />

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              {/* Left 5 Cols: Lucide Icon Sizing & Active/Inactive Rules */}
              <div className="lg:col-span-5 bg-white rounded-[12px] border border-[#E5E7EB] p-6 shadow-hf-xs space-y-6">
                <div>
                  <h4 className="text-[16px] font-bold text-[#111827] mb-1">
                    Lucide React Icon System
                  </h4>
                  <p className="text-[13px] text-[#4B5563]">
                    Consistent stroke weights (`1.75px` inactive, `2.25px` active) and
                    optical alignment across navigation, timers, and equipment badges.
                  </p>
                </div>

                {/* Icon Size Scale */}
                <div className="space-y-3">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] block">
                    Standard Icon Sizes
                  </span>
                  <div className="grid grid-cols-4 gap-2 text-center">
                    {[
                      { size: '16px', cls: 'w-4 h-4', use: 'Badges / Meta' },
                      { size: '20px', cls: 'w-5 h-5', use: 'Buttons / Nav' },
                      { size: '24px', cls: 'w-6 h-6', use: 'Card Headers' },
                      { size: '32px', cls: 'w-8 h-8', use: 'Empty / Hero' },
                    ].map((ic) => (
                      <div
                        key={ic.size}
                        className="p-3 rounded-[8px] bg-[#F8FAFC] border border-[#E5E7EB] flex flex-col items-center justify-center"
                      >
                        <Dumbbell
                          className={`${ic.cls} text-[#E53935] mb-2`}
                          strokeWidth={2}
                        />
                        <span className="font-mono text-[12px] font-bold text-[#111827]">
                          {ic.size}
                        </span>
                        <span className="text-[10px] font-medium text-[#6B7280]">
                          {ic.use}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active vs Inactive Icon States */}
                <div className="space-y-2.5 pt-2 border-t border-[#F1F5F9]">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] block">
                    Active vs. Inactive States
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-3.5 rounded-[10px] bg-[#FEF2F2] border border-[#FECACA] flex items-center gap-3">
                      <div className="w-10 h-10 rounded-[8px] bg-[#E53935] text-white flex items-center justify-center shrink-0">
                        <Flame className="w-5 h-5" strokeWidth={2.25} />
                      </div>
                      <div>
                        <span className="text-[13px] font-bold text-[#E53935] block">
                          Active State
                        </span>
                        <span className="text-[11px] font-mono text-[#C62828]">
                          #E53935 • 2.25px
                        </span>
                      </div>
                    </div>

                    <div className="p-3.5 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB] flex items-center gap-3">
                      <div className="w-10 h-10 rounded-[8px] bg-white border border-[#E5E7EB] text-[#6B7280] flex items-center justify-center shrink-0">
                        <Flame className="w-5 h-5" strokeWidth={1.75} />
                      </div>
                      <div>
                        <span className="text-[13px] font-bold text-[#4B5563] block">
                          Inactive State
                        </span>
                        <span className="text-[11px] font-mono text-[#6B7280]">
                          #6B7280 • 1.75px
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 7 Cols: Reusable CSS Custom Properties Reference */}
              <div className="lg:col-span-7 bg-white rounded-[12px] border border-[#E5E7EB] p-6 shadow-hf-xs flex flex-col justify-between">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-5 h-5 text-[#E53935]" />
                    <div>
                      <h4 className="text-[16px] font-bold text-[#111827]">
                        Reusable CSS Variables (`src/index.css`)
                      </h4>
                      <p className="text-[12px] text-[#4B5563]">
                        Complete design tokens mapped to Tailwind utilities and React components.
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleCopy(':root { --hf-color-primary: #E53935; --hf-bg-primary: #FFFFFF; }')}
                    leftIcon={<Copy className="w-3.5 h-3.5" />}
                  >
                    Copy Tokens
                  </Button>
                </div>

                <pre className="p-4 rounded-[10px] bg-[#F8FAFC] border border-[#E5E7EB] font-mono text-[12px] text-[#111827] overflow-x-auto leading-relaxed">
{`:root {
  /* Colors: White Surface + Primary Red */
  --hf-bg-primary: #FFFFFF;
  --hf-bg-card: #FFFFFF;
  --hf-bg-subtle: #F8FAFC;
  --hf-bg-input: #F9FAFB;
  --hf-color-primary: #E53935;
  --hf-color-primary-hover: #D32F2F;
  --hf-color-primary-pressed: #C62828;
  --hf-color-primary-light: #FEF2F2;

  /* Text & Borders */
  --hf-text-primary: #111827;
  --hf-text-secondary: #4B5563;
  --hf-text-disabled: #9CA3AF;
  --hf-border-default: #E5E7EB;

  /* Radius, Shadows & Component Heights */
  --hf-radius-md: 0.5rem;          /* 8px buttons/inputs */
  --hf-radius-lg: 0.75rem;         /* 12px cards */
  --hf-control-height-md: 2.75rem; /* 44px touch baseline */
  --hf-control-height-lg: 3.25rem; /* 52px primary workout CTA */
  --hf-bp-mobile: 375px;
  --hf-bp-tablet: 768px;
  --hf-bp-desktop: 1024px;
}`}
                </pre>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* =====================================================================
          SHOWCASE FOOTER
          ===================================================================== */}
      <footer className="bg-[#F8FAFC] border-t border-[#E5E7EB] py-8 mt-16">
        <div className="max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] font-medium text-[#6B7280]">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-[6px] bg-[#E53935] text-white flex items-center justify-center font-extrabold text-[12px]">
              30
            </div>
            <span className="font-bold text-[#111827]">
              HomeFit 30 UI Design System
            </span>
            <span>•</span>
            <span>React + TypeScript + Tailwind CSS + Lucide React</span>
          </div>
          <div className="flex items-center gap-2">
            <Eye className="w-4 h-4 text-[#E53935]" />
            <span>Design System Only — Ready for PWA Workout Implementation</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

/* ==========================================================================
   HELPER SUB-COMPONENTS FOR SHOWCASE
   ========================================================================== */
const SectionHeader: React.FC<{
  number: string;
  title: string;
  subtitle: string;
}> = ({ number, title, subtitle }) => (
  <div className="space-y-1.5">
    <div className="inline-flex items-center gap-2">
      <span className="font-mono text-[12px] font-extrabold px-2 py-0.5 rounded-[5px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935]">
        {number}
      </span>
      <span className="text-[11px] font-bold uppercase tracking-[0.06em] text-[#6B7280]">
        Design System Specification
      </span>
    </div>
    <h2 className="text-[24px] sm:text-[28px] font-extrabold text-[#111827] tracking-tight">
      {title}
    </h2>
    <p className="text-[14px] sm:text-[15px] text-[#4B5563] max-w-3xl">
      {subtitle}
    </p>
  </div>
);

const ColorGroupGrid: React.FC<{
  title: string;
  description: string;
  tokens: ColorToken[];
  onCopy: (text: string) => void;
}> = ({ title, description, tokens, onCopy }) => (
  <div className="space-y-3">
    <div>
      <h3 className="text-[16px] font-bold text-[#111827]">{title}</h3>
      <p className="text-[13px] text-[#4B5563]">{description}</p>
    </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3.5">
      {tokens.map((token) => (
        <button
          key={token.cssVar}
          type="button"
          onClick={() => onCopy(token.cssVar)}
          className="group text-left bg-white rounded-[10px] border border-[#E5E7EB] hover:border-[#E53935] overflow-hidden shadow-hf-xs transition-all flex flex-col justify-between"
        >
          <div>
            <div
              className="h-20 w-full border-b border-[#E5E7EB] p-3 flex items-end justify-between"
              style={{ backgroundColor: token.hex }}
            >
              <span
                className={`font-mono text-[12px] font-bold px-1.5 py-0.5 rounded-[4px] ${
                  token.textContrast === 'light'
                    ? 'bg-black/25 text-white'
                    : 'bg-white/90 text-[#111827] border border-[#E5E7EB]'
                }`}
              >
                {token.hex}
              </span>
            </div>
            <div className="p-3">
              <div className="flex items-center justify-between gap-1">
                <h4 className="text-[13px] font-bold text-[#111827] group-hover:text-[#E53935] transition-colors">
                  {token.name}
                </h4>
                <Copy className="w-3 h-3 text-[#9CA3AF] group-hover:text-[#E53935] shrink-0" />
              </div>
              <p className="font-mono text-[11px] font-semibold text-[#E53935] mt-0.5 truncate">
                {token.cssVar}
              </p>
              <p className="text-[11px] text-[#6B7280] mt-1.5 leading-snug line-clamp-2">
                {token.usage}
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  </div>
);
