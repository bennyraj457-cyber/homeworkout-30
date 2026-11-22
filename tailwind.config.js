/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--hf-font-sans)', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['var(--hf-font-mono)', 'JetBrains Mono', 'monospace'],
      },
      colors: {
        brand: {
          DEFAULT: 'var(--hf-color-primary)',
          hover: 'var(--hf-color-primary-hover)',
          pressed: 'var(--hf-color-primary-pressed)',
          light: 'var(--hf-color-primary-light)',
          tint: 'var(--hf-color-primary-tint)',
          border: 'var(--hf-color-primary-border)',
        },
        surface: {
          base: 'var(--hf-bg-primary)',
          card: 'var(--hf-bg-card)',
          subtle: 'var(--hf-bg-subtle)',
          input: 'var(--hf-bg-input)',
          elevated: 'var(--hf-bg-elevated)',
        },
        content: {
          primary: 'var(--hf-text-primary)',
          secondary: 'var(--hf-text-secondary)',
          tertiary: 'var(--hf-text-tertiary)',
          disabled: 'var(--hf-text-disabled)',
          inverse: 'var(--hf-text-inverse)',
        },
        stroke: {
          subtle: 'var(--hf-border-subtle)',
          DEFAULT: 'var(--hf-border-default)',
          strong: 'var(--hf-border-strong)',
          focus: 'var(--hf-border-focus)',
        },
        status: {
          success: 'var(--hf-color-success)',
          'success-bg': 'var(--hf-color-success-bg)',
          'success-border': 'var(--hf-color-success-border)',
          warning: 'var(--hf-color-warning)',
          'warning-bg': 'var(--hf-color-warning-bg)',
          'warning-border': 'var(--hf-color-warning-border)',
          error: 'var(--hf-color-error)',
          'error-bg': 'var(--hf-color-error-bg)',
          'error-border': 'var(--hf-color-error-border)',
          info: 'var(--hf-color-info)',
          'info-bg': 'var(--hf-color-info-bg)',
        }
      },
      borderRadius: {
        'hf-xs': 'var(--hf-radius-xs)',
        'hf-sm': 'var(--hf-radius-sm)',
        'hf-md': 'var(--hf-radius-md)',
        'hf-lg': 'var(--hf-radius-lg)',
        'hf-xl': 'var(--hf-radius-xl)',
        'hf-full': 'var(--hf-radius-full)',
      },
      boxShadow: {
        'hf-xs': 'var(--hf-shadow-xs)',
        'hf-sm': 'var(--hf-shadow-sm)',
        'hf-md': 'var(--hf-shadow-md)',
        'hf-lg': 'var(--hf-shadow-lg)',
        'hf-red': 'var(--hf-shadow-brand)',
      }
    },
  },
  plugins: [],
};
