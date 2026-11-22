export interface ColorToken {
  name: string;
  cssVar: string;
  hex: string;
  role: string;
  usage: string;
  textContrast?: 'dark' | 'light';
}

export const COLOR_PALETTE: Record<string, ColorToken[]> = {
  brand: [
    {
      name: 'Primary Red',
      cssVar: '--hf-color-primary',
      hex: '#E53935',
      role: 'Primary Brand Accent',
      usage: 'Primary CTAs, active navigation state, workout timers, active sets, progress fills',
      textContrast: 'light',
    },
    {
      name: 'Primary Red Hover',
      cssVar: '--hf-color-primary-hover',
      hex: '#D32F2F',
      role: 'Interactive Hover',
      usage: 'Hover state for primary red buttons and interactive workout triggers',
      textContrast: 'light',
    },
    {
      name: 'Primary Red Pressed',
      cssVar: '--hf-color-primary-pressed',
      hex: '#C62828',
      role: 'Active / Pressed State',
      usage: 'Touch press feedback on mobile buttons and active toggles',
      textContrast: 'light',
    },
    {
      name: 'Light Red Background',
      cssVar: '--hf-color-primary-light',
      hex: '#FEF2F2',
      role: 'Subtle Brand Surface',
      usage: 'Active navigation pill background, selected card highlight, light badge fill',
      textContrast: 'dark',
    },
    {
      name: 'Red Tint Accent',
      cssVar: '--hf-color-primary-tint',
      hex: '#FEE2E2',
      role: 'Secondary Brand Tint',
      usage: 'Icon container fill, muscle group tag background, active set ring tint',
      textContrast: 'dark',
    },
    {
      name: 'Red Border Accent',
      cssVar: '--hf-color-primary-border',
      hex: '#FECACA',
      role: 'Brand Outline',
      usage: 'Selected exercise card border, active rest timer container border',
      textContrast: 'dark',
    },
  ],
  secondaryAndSurfaces: [
    {
      name: 'Primary White Surface',
      cssVar: '--hf-bg-primary',
      hex: '#FFFFFF',
      role: 'Primary App Background',
      usage: 'Main viewport background, card surfaces, modal surfaces (predominantly white UI)',
      textContrast: 'dark',
    },
    {
      name: 'Card Surface',
      cssVar: '--hf-bg-card',
      hex: '#FFFFFF',
      role: 'Card Container',
      usage: 'Workout cards, exercise cards, stat cards paired with 1px #E5E7EB border',
      textContrast: 'dark',
    },
    {
      name: 'Subtle Section Surface',
      cssVar: '--hf-bg-subtle',
      hex: '#F8FAFC',
      role: 'Secondary Grouping Background',
      usage: 'Exercise illustration backdrop, metric wells, subtle table/list striping',
      textContrast: 'dark',
    },
    {
      name: 'Input Background',
      cssVar: '--hf-bg-input',
      hex: '#F9FAFB',
      role: 'Form Control Fill',
      usage: 'Text inputs, number inputs, weight selectors, select dropdowns at rest',
      textContrast: 'dark',
    },
    {
      name: 'Secondary Athletic Slate',
      cssVar: '--hf-color-secondary',
      hex: '#1E293B',
      role: 'Secondary Action Color',
      usage: 'Secondary buttons, dark badges, equipment tags, strong contrast controls',
      textContrast: 'light',
    },
    {
      name: 'Secondary Slate Light',
      cssVar: '--hf-color-secondary-light',
      hex: '#F1F5F9',
      role: 'Neutral Pill / Tag Fill',
      usage: 'Inactive category chips, secondary icon buttons, rest state indicators',
      textContrast: 'dark',
    },
  ],
  typographyAndBorders: [
    {
      name: 'Primary Text',
      cssVar: '--hf-text-primary',
      hex: '#111827',
      role: 'High-Contrast Ink',
      usage: 'Headings, exercise titles, timer numbers, primary body copy (16.8:1 contrast on white)',
      textContrast: 'light',
    },
    {
      name: 'Secondary Text',
      cssVar: '--hf-text-secondary',
      hex: '#4B5563',
      role: 'Supporting Copy',
      usage: 'Exercise instructions, muscle group subtitles, form labels (7.5:1 contrast)',
      textContrast: 'light',
    },
    {
      name: 'Tertiary / Metadata Text',
      cssVar: '--hf-text-tertiary',
      hex: '#6B7280',
      role: 'Muted Metadata',
      usage: 'Timestamps, unit labels (KG, MIN, REPS), secondary captions (4.8:1 contrast)',
      textContrast: 'light',
    },
    {
      name: 'Disabled Text',
      cssVar: '--hf-text-disabled',
      hex: '#9CA3AF',
      role: 'Inactive / Locked State',
      usage: 'Disabled buttons, locked future sets, placeholder text',
      textContrast: 'dark',
    },
    {
      name: 'Default Border',
      cssVar: '--hf-border-default',
      hex: '#E5E7EB',
      role: 'Primary Card & Divider Hairline',
      usage: '1px solid structural borders on cards, top/bottom bars, and inputs',
      textContrast: 'dark',
    },
    {
      name: 'Strong Border',
      cssVar: '--hf-border-strong',
      hex: '#D1D5DB',
      role: 'Emphasized Control Outline',
      usage: 'Outline buttons, unchecked checkboxes, input hover borders',
      textContrast: 'dark',
    },
  ],
  semanticStatus: [
    {
      name: 'Success Green',
      cssVar: '--hf-color-success',
      hex: '#16A34A',
      role: 'Completed Exercise / Goal Met',
      usage: 'Completed set checkmarks, finished workout badge, streak milestone',
      textContrast: 'light',
    },
    {
      name: 'Success Surface',
      cssVar: '--hf-color-success-bg',
      hex: '#F0FDF4',
      role: 'Success Feedback Fill',
      usage: 'Completed set row tint, success banner background',
      textContrast: 'dark',
    },
    {
      name: 'Warning Amber',
      cssVar: '--hf-color-warning',
      hex: '#D97706',
      role: 'Caution / Form Alert',
      usage: 'High heart-rate alert, heavy weight warning, skipped rest notice',
      textContrast: 'light',
    },
    {
      name: 'Warning Surface',
      cssVar: '--hf-color-warning-bg',
      hex: '#FFFBEB',
      role: 'Warning Feedback Fill',
      usage: 'Warning message card background',
      textContrast: 'dark',
    },
    {
      name: 'Error Red',
      cssVar: '--hf-color-error',
      hex: '#DC2626',
      role: 'Validation Error / Destructive',
      usage: 'Form validation errors, end workout early confirmation, delete action',
      textContrast: 'light',
    },
    {
      name: 'Error Surface',
      cssVar: '--hf-color-error-bg',
      hex: '#FEF2F2',
      role: 'Error Feedback Fill',
      usage: 'Invalid input background tint, destructive alert surface',
      textContrast: 'dark',
    },
  ],
};

export interface TypographySpec {
  role: string;
  token: string;
  fontFamily: 'Inter' | 'JetBrains Mono';
  sizePx: string;
  sizeRem: string;
  lineHeight: string;
  weight: string;
  letterSpacing: string;
  sampleText: string;
  className: string;
}

export const TYPOGRAPHY_SCALE: TypographySpec[] = [
  {
    role: 'Display Typography',
    token: '--hf-text-display-size',
    fontFamily: 'Inter',
    sizePx: '40px',
    sizeRem: '2.5rem',
    lineHeight: '1.1 (44px)',
    weight: '800 (ExtraBold)',
    letterSpacing: '-0.03em',
    sampleText: '30-MIN FULL BODY',
    className: 'text-[40px] leading-[1.1] font-extrabold tracking-[-0.03em] text-[#111827]',
  },
  {
    role: 'Page Heading (H1)',
    token: '--hf-text-h1-size',
    fontFamily: 'Inter',
    sizePx: '30px',
    sizeRem: '1.875rem',
    lineHeight: '1.2 (36px)',
    weight: '700 (Bold)',
    letterSpacing: '-0.025em',
    sampleText: 'Today’s Strength Circuit',
    className: 'text-[30px] leading-[1.2] font-bold tracking-[-0.025em] text-[#111827]',
  },
  {
    role: 'Section Heading (H2)',
    token: '--hf-text-h2-size',
    fontFamily: 'Inter',
    sizePx: '22px',
    sizeRem: '1.375rem',
    lineHeight: '1.3 (28.6px)',
    weight: '700 (Bold)',
    letterSpacing: '-0.015em',
    sampleText: 'Compound Barbell Block',
    className: 'text-[22px] leading-[1.3] font-bold tracking-[-0.015em] text-[#111827]',
  },
  {
    role: 'Card Title (H3)',
    token: '--hf-text-h3-size',
    fontFamily: 'Inter',
    sizePx: '18px',
    sizeRem: '1.125rem',
    lineHeight: '1.4 (25.2px)',
    weight: '600 (SemiBold)',
    letterSpacing: '-0.01em',
    sampleText: 'Barbell Squat • 4 Sets × 10 Reps',
    className: 'text-[18px] leading-[1.4] font-semibold tracking-[-0.01em] text-[#111827]',
  },
  {
    role: 'Body Text',
    token: '--hf-text-body-size',
    fontFamily: 'Inter',
    sizePx: '16px',
    sizeRem: '1rem',
    lineHeight: '1.5 (24px)',
    weight: '400 (Regular)',
    letterSpacing: '0em',
    sampleText: 'Keep your chest upright, brace your core, and drive evenly through mid-foot.',
    className: 'text-[16px] leading-[1.5] font-normal text-[#4B5563]',
  },
  {
    role: 'Supporting Text',
    token: '--hf-text-support-size',
    fontFamily: 'Inter',
    sizePx: '14px',
    sizeRem: '0.875rem',
    lineHeight: '1.45 (20.3px)',
    weight: '500 (Medium)',
    letterSpacing: '0em',
    sampleText: 'Primary Target: Quadriceps, Glutes, Core Stabilizers • Rest 60s between sets',
    className: 'text-[14px] leading-[1.45] font-medium text-[#4B5563]',
  },
  {
    role: 'UI Label',
    token: '--hf-text-label-size',
    fontFamily: 'Inter',
    sizePx: '12px',
    sizeRem: '0.75rem',
    lineHeight: '1.35 (16px)',
    weight: '600 (SemiBold)',
    letterSpacing: '0.04em',
    sampleText: 'TARGET LOAD & REPETITIONS',
    className: 'text-[12px] leading-[1.35] font-semibold uppercase tracking-[0.04em] text-[#4B5563]',
  },
  {
    role: 'Small Metadata',
    token: '--hf-text-meta-size',
    fontFamily: 'Inter',
    sizePx: '11px',
    sizeRem: '0.6875rem',
    lineHeight: '1.25 (13.75px)',
    weight: '600 (SemiBold)',
    letterSpacing: '0.05em',
    sampleText: 'EQUIPMENT: BARBELL • LEVEL: INTERMEDIATE • EST. 6.5 MIN',
    className: 'text-[11px] leading-[1.25] font-semibold uppercase tracking-[0.05em] text-[#6B7280]',
  },
  {
    role: 'Timer & Workout Number (XL)',
    token: '--hf-text-timer-xl',
    fontFamily: 'JetBrains Mono',
    sizePx: '48px',
    sizeRem: '3rem',
    lineHeight: '1.0 (48px)',
    weight: '800 (ExtraBold)',
    letterSpacing: '-0.03em',
    sampleText: '18:45 / 30:00',
    className: 'font-mono tabular-nums text-[44px] sm:text-[48px] leading-none font-extrabold tracking-[-0.03em] text-[#E53935]',
  },
];

export interface SpacingSpec {
  token: string;
  name: string;
  px: number;
  rem: string;
  usage: string;
}

export const SPACING_SCALE: SpacingSpec[] = [
  { token: '--hf-space-1', name: 'space-1', px: 4, rem: '0.25rem', usage: 'Tight icon-to-badge gap, micro progress ticks' },
  { token: '--hf-space-2', name: 'space-2', px: 8, rem: '0.5rem', usage: 'Inline pill gap, label-to-input spacing, compact stack' },
  { token: '--hf-space-3', name: 'space-3', px: 12, rem: '0.75rem', usage: 'Mobile grid gap, compact card padding, form row gap' },
  { token: '--hf-space-4', name: 'space-4', px: 16, rem: '1rem', usage: 'Mobile page margin (16px), standard card padding, list gap' },
  { token: '--hf-space-5', name: 'space-5', px: 20, rem: '1.25rem', usage: 'Medium card padding (20px), workout control spacing' },
  { token: '--hf-space-6', name: 'space-6', px: 24, rem: '1.5rem', usage: 'Tablet page margin (24px), desktop card padding, grid gap' },
  { token: '--hf-space-8', name: 'space-8', px: 32, rem: '2rem', usage: 'Desktop page margin (32px), section vertical spacing' },
  { token: '--hf-space-10', name: 'space-10', px: 40, rem: '2.5rem', usage: 'Major block separation, timer showcase breathing room' },
  { token: '--hf-space-12', name: 'space-12', px: 48, rem: '3rem', usage: 'Hero header separation, page footer clearance' },
];
