import React, { useState } from 'react';
import { Check, ChevronDown, Minus, Plus, Dumbbell, AlertCircle } from 'lucide-react';

/* ==========================================================================
   1. TEXT INPUT
   ========================================================================== */
export interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  errorText?: string;
  leftIcon?: React.ReactNode;
}

export const TextInput: React.FC<TextInputProps> = ({
  label,
  helperText,
  errorText,
  leftIcon,
  id,
  className = '',
  ...props
}) => {
  const inputId = id || `input-${label.toLowerCase().replace(/\s+/g, '-')}`;
  const hasError = Boolean(errorText);

  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-[#4B5563] mb-1.5"
      >
        {label}
      </label>
      <div className="relative">
        {leftIcon && (
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#6B7280]">
            {leftIcon}
          </div>
        )}
        <input
          id={inputId}
          className={`w-full h-11 rounded-[8px] px-3.5 text-[14px] font-medium text-[#111827] placeholder:text-[#9CA3AF] transition-all focus:outline-none ${
            leftIcon ? 'pl-10' : ''
          } ${
            hasError
              ? 'bg-[#FEF2F2] border border-[#DC2626] focus:ring-2 focus:ring-[#DC2626]/20'
              : 'bg-[#F9FAFB] focus:bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] focus:border-[#E53935] focus:ring-2 focus:ring-[#E53935]/15'
          } disabled:bg-[#F3F4F6] disabled:text-[#9CA3AF] disabled:cursor-not-allowed ${className}`}
          {...props}
        />
      </div>
      {hasError ? (
        <p className="mt-1.5 flex items-center gap-1 text-[12px] font-medium text-[#DC2626]">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{errorText}</span>
        </p>
      ) : helperText ? (
        <p className="mt-1.5 text-[12px] font-normal text-[#6B7280]">{helperText}</p>
      ) : null}
    </div>
  );
};

/* ==========================================================================
   2. NUMBER INPUT (With Tabular Numerals & Unit Suffix)
   ========================================================================== */
export interface NumberInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  unit?: string;
  helperText?: string;
}

export const NumberInput: React.FC<NumberInputProps> = ({
  label,
  unit = 'REPS',
  helperText,
  id,
  ...props
}) => {
  const inputId = id || `num-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="w-full">
      <label
        htmlFor={inputId}
        className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-[#4B5563] mb-1.5"
      >
        {label}
      </label>
      <div className="relative flex items-center">
        <input
          id={inputId}
          type="number"
          className="w-full h-11 rounded-[8px] pl-3.5 pr-16 bg-[#F9FAFB] focus:bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] focus:border-[#E53935] focus:ring-2 focus:ring-[#E53935]/15 font-mono tabular-nums text-[15px] font-bold text-[#111827] focus:outline-none transition-all"
          {...props}
        />
        {unit && (
          <span className="absolute right-3 px-2 py-0.5 rounded-[4px] bg-[#F1F5F9] text-[11px] font-mono font-bold uppercase text-[#4B5563] pointer-events-none">
            {unit}
          </span>
        )}
      </div>
      {helperText && (
        <p className="mt-1.5 text-[12px] text-[#6B7280]">{helperText}</p>
      )}
    </div>
  );
};

/* ==========================================================================
   3. SELECT DROPDOWN
   ========================================================================== */
export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectDropdownProps
  extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: SelectOption[];
  helperText?: string;
}

export const SelectDropdown: React.FC<SelectDropdownProps> = ({
  label,
  options,
  helperText,
  id,
  ...props
}) => {
  const selectId = id || `select-${label.toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="w-full">
      <label
        htmlFor={selectId}
        className="block text-[12px] font-semibold uppercase tracking-[0.04em] text-[#4B5563] mb-1.5"
      >
        {label}
      </label>
      <div className="relative">
        <select
          id={selectId}
          className="w-full h-11 appearance-none rounded-[8px] pl-3.5 pr-10 bg-[#F9FAFB] focus:bg-white border border-[#E5E7EB] hover:border-[#D1D5DB] focus:border-[#E53935] focus:ring-2 focus:ring-[#E53935]/15 text-[14px] font-semibold text-[#111827] focus:outline-none transition-all cursor-pointer"
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="w-4 h-4 text-[#6B7280] absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
          strokeWidth={2.25}
        />
      </div>
      {helperText && (
        <p className="mt-1.5 text-[12px] text-[#6B7280]">{helperText}</p>
      )}
    </div>
  );
};

/* ==========================================================================
   4. CHECKBOX
   ========================================================================== */
export interface CheckboxProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  label,
  description,
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <label
      className={`flex items-start gap-3 p-3 rounded-[8px] border transition-all select-none ${
        disabled
          ? 'bg-[#F3F4F6] border-[#E5E7EB] opacity-60 cursor-not-allowed'
          : checked
          ? 'bg-[#FEF2F2]/50 border-[#FECACA] cursor-pointer'
          : 'bg-white border-[#E5E7EB] hover:border-[#D1D5DB] cursor-pointer'
      }`}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`mt-0.5 w-5 h-5 rounded-[5px] flex items-center justify-center transition-colors shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E53935] ${
          checked
            ? 'bg-[#E53935] text-white border border-[#E53935]'
            : 'bg-[#F9FAFB] border border-[#D1D5DB] text-transparent'
        }`}
      >
        <Check className="w-3.5 h-3.5" strokeWidth={3} />
      </button>
      <div>
        <span className="text-[14px] font-semibold text-[#111827] block leading-snug">
          {label}
        </span>
        {description && (
          <span className="text-[12px] font-normal text-[#6B7280] block mt-0.5">
            {description}
          </span>
        )}
      </div>
    </label>
  );
};

/* ==========================================================================
   5. TOGGLE SWITCH
   ========================================================================== */
export interface ToggleSwitchProps {
  label: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
}

export const ToggleSwitch: React.FC<ToggleSwitchProps> = ({
  label,
  description,
  checked,
  onChange,
  disabled = false,
}) => {
  return (
    <div
      className={`flex items-center justify-between gap-4 p-3.5 rounded-[8px] border bg-white ${
        checked ? 'border-[#FECACA]' : 'border-[#E5E7EB]'
      }`}
    >
      <div>
        <span className="text-[14px] font-semibold text-[#111827] block">
          {label}
        </span>
        {description && (
          <span className="text-[12px] text-[#6B7280] block mt-0.5">
            {description}
          </span>
        )}
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => !disabled && onChange(!checked)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-[#E53935] focus-visible:ring-offset-2 ${
          checked ? 'bg-[#E53935]' : 'bg-[#D1D5DB]'
        } ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
            checked ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
};

/* ==========================================================================
   6. WEIGHT SELECTOR (Barbell & Dumbbell Load Component with KG / LB Toggle)
   ========================================================================== */
export interface WeightSelectorProps {
  initialWeight?: number;
  initialUnit?: 'KG' | 'LB';
  equipmentType?: 'Barbell' | 'Dumbbell';
  onWeightChange?: (weight: number, unit: 'KG' | 'LB') => void;
}

export const WeightSelector: React.FC<WeightSelectorProps> = ({
  initialWeight = 42.5,
  initialUnit = 'KG',
  equipmentType = 'Barbell',
  onWeightChange,
}) => {
  const [weight, setWeight] = useState(initialWeight);
  const [unit, setUnit] = useState<'KG' | 'LB'>(initialUnit);
  const [step, setStep] = useState<number>(2.5);

  const adjustWeight = (delta: number) => {
    setWeight((prev) => {
      const next = Math.max(0, Number((prev + delta).toFixed(1)));
      onWeightChange?.(next, unit);
      return next;
    });
  };

  const handleSelectUnit = (newUnit: 'KG' | 'LB') => {
    setUnit(newUnit);
    onWeightChange?.(weight, newUnit);
  };

  return (
    <div className="bg-white rounded-[12px] border border-[#E5E7EB] p-5 shadow-hf-xs">
      {/* Header & Unit Switcher */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-[7px] bg-[#FEF2F2] border border-[#FECACA] flex items-center justify-center text-[#E53935]">
            <Dumbbell className="w-4 h-4" strokeWidth={2.25} />
          </div>
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-[#6B7280] block">
              {equipmentType} Load Selector
            </span>
            <h4 className="text-[15px] font-bold text-[#111827]">
              Working Set Resistance
            </h4>
          </div>
        </div>

        {/* KG / LB Segmented Control */}
        <div className="inline-flex p-0.5 rounded-[7px] bg-[#F1F5F9] border border-[#E5E7EB]">
          {(['KG', 'LB'] as const).map((u) => (
            <button
              key={u}
              type="button"
              onClick={() => handleSelectUnit(u)}
              className={`px-2.5 py-1 rounded-[5px] font-mono text-[11px] font-bold transition-all ${
                unit === u
                  ? 'bg-[#E53935] text-white shadow-hf-xs'
                  : 'text-[#4B5563] hover:text-[#111827]'
              }`}
            >
              {u}
            </button>
          ))}
        </div>
      </div>

      {/* Main Stepper Display */}
      <div className="flex items-center justify-between gap-3 p-3.5 rounded-[10px] bg-[#F9FAFB] border border-[#E5E7EB]">
        <button
          type="button"
          onClick={() => adjustWeight(-step)}
          aria-label="Decrease weight"
          className="w-12 h-12 rounded-[8px] bg-white hover:bg-[#FEF2F2] border border-[#D1D5DB] hover:border-[#E53935] text-[#111827] hover:text-[#E53935] flex items-center justify-center transition-colors active:scale-95"
        >
          <Minus className="w-5 h-5" strokeWidth={2.5} />
        </button>

        <div className="text-center">
          <div className="flex items-baseline justify-center gap-1">
            <span className="font-mono tabular-nums text-[36px] leading-none font-extrabold text-[#111827]">
              {weight.toFixed(weight % 1 === 0 ? 0 : 1)}
            </span>
            <span className="font-mono text-[14px] font-bold text-[#E53935]">
              {unit}
            </span>
          </div>
          <span className="text-[11px] font-medium text-[#6B7280] mt-1 block">
            Increment step: ±{step} {unit}
          </span>
        </div>

        <button
          type="button"
          onClick={() => adjustWeight(step)}
          aria-label="Increase weight"
          className="w-12 h-12 rounded-[8px] bg-[#E53935] hover:bg-[#D32F2F] active:bg-[#C62828] text-white shadow-hf-red flex items-center justify-center transition-colors active:scale-95"
        >
          <Plus className="w-5 h-5" strokeWidth={2.5} />
        </button>
      </div>

      {/* Micro Plate Increment Selector */}
      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="text-[11px] font-semibold uppercase tracking-wider text-[#6B7280]">
          Plate Step:
        </span>
        <div className="flex items-center gap-1.5">
          {[1.25, 2.5, 5, 10].map((inc) => (
            <button
              key={inc}
              type="button"
              onClick={() => setStep(inc)}
              className={`px-2.5 py-1 rounded-[6px] font-mono tabular-nums text-[11px] font-bold border transition-colors ${
                step === inc
                  ? 'bg-[#FEF2F2] border-[#E53935] text-[#E53935]'
                  : 'bg-white border-[#E5E7EB] text-[#4B5563] hover:bg-[#F8FAFC]'
              }`}
            >
              +{inc}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
