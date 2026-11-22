import React from 'react';
import {
  CheckCircle2,
  AlertTriangle,
  Dumbbell,
  X,
  AlertOctagon,
  Flame,
  Plus,
} from 'lucide-react';
import { Button } from './Buttons';

/* ==========================================================================
   1. SUCCESS MESSAGE
   ========================================================================== */
export interface FeedbackMessageProps {
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const SuccessMessage: React.FC<FeedbackMessageProps> = ({
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div
      role="status"
      className="bg-[#F0FDF4] border border-[#BBF7D0] rounded-[10px] p-4 flex items-start justify-between gap-3"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-[7px] bg-[#16A34A] text-white flex items-center justify-center shrink-0 mt-0.5">
          <CheckCircle2 className="w-4 h-4" strokeWidth={2.5} />
        </div>
        <div>
          <h5 className="text-[14px] font-bold text-[#111827]">{title}</h5>
          <p className="text-[13px] font-medium text-[#4B5563] mt-0.5">
            {description}
          </p>
        </div>
      </div>

      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="px-3 py-1.5 rounded-[6px] bg-white border border-[#BBF7D0] text-[12px] font-bold text-[#16A34A] hover:bg-[#DCFCE7] transition-colors shrink-0"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

/* ==========================================================================
   2. WARNING MESSAGE
   ========================================================================== */
export const WarningMessage: React.FC<FeedbackMessageProps> = ({
  title,
  description,
  actionLabel,
  onAction,
}) => {
  return (
    <div
      role="alert"
      className="bg-[#FFFBEB] border border-[#FDE68A] rounded-[10px] p-4 flex items-start justify-between gap-3"
    >
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-[7px] bg-[#D97706] text-white flex items-center justify-center shrink-0 mt-0.5">
          <AlertTriangle className="w-4 h-4" strokeWidth={2.5} />
        </div>
        <div>
          <h5 className="text-[14px] font-bold text-[#111827]">{title}</h5>
          <p className="text-[13px] font-medium text-[#4B5563] mt-0.5">
            {description}
          </p>
        </div>
      </div>

      {actionLabel && (
        <button
          type="button"
          onClick={onAction}
          className="px-3 py-1.5 rounded-[6px] bg-white border border-[#FDE68A] text-[12px] font-bold text-[#D97706] hover:bg-[#FEF3C7] transition-colors shrink-0"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

/* ==========================================================================
   3. EMPTY STATE
   ========================================================================== */
export interface EmptyStateProps {
  title?: string;
  description?: string;
  ctaLabel?: string;
  onCtaClick?: () => void;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  title = 'No Custom 30-Min Routine Saved Yet',
  description = 'Combine Barbell, Dumbbell, Push-Up, and Core blocks to build your personalized 30-minute home circuit.',
  ctaLabel = 'Create 30-Min Workout',
  onCtaClick,
}) => {
  return (
    <div className="bg-white rounded-[12px] border border-dashed border-[#D1D5DB] p-8 text-center flex flex-col items-center justify-center">
      <div className="w-14 h-14 rounded-[12px] bg-[#FEF2F2] border border-[#FECACA] text-[#E53935] flex items-center justify-center mb-4">
        <Dumbbell className="w-6 h-6" strokeWidth={2} />
      </div>
      <h4 className="text-[17px] font-bold text-[#111827] mb-1">{title}</h4>
      <p className="text-[14px] text-[#4B5563] max-w-sm mb-5 leading-relaxed">
        {description}
      </p>
      <Button
        variant="primary"
        size="md"
        onClick={onCtaClick}
        leftIcon={<Plus className="w-4 h-4" strokeWidth={2.5} />}
      >
        {ctaLabel}
      </Button>
    </div>
  );
};

/* ==========================================================================
   4. CONFIRMATION DIALOG
   ========================================================================== */
export interface ConfirmationDialogProps {
  title?: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  title = 'End 30-Min Workout Early?',
  description = 'You have completed 18 minutes (60%) of Today’s Full-Body Circuit. Ending now will save your completed sets so far.',
  confirmLabel = 'End & Save Partial',
  cancelLabel = 'Keep Training',
  onConfirm,
  onCancel,
}) => {
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && onCancel) {
        onCancel();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onCancel]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="dialog-title"
      aria-describedby="dialog-description"
      className="bg-white rounded-[12px] border border-[#E5E7EB] p-5 shadow-hf-md max-w-md w-full"
    >
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[8px] bg-[#FEF2F2] border border-[#FECACA] text-[#DC2626] flex items-center justify-center shrink-0">
            <AlertOctagon className="w-5 h-5" strokeWidth={2.25} />
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#E53935] block">
              Session Guard
            </span>
            <h4 id="dialog-title" className="text-[16px] font-bold text-[#111827]">
              {title}
            </h4>
          </div>
        </div>
      </div>

      <p
        id="dialog-description"
        className="text-[13px] font-medium text-[#4B5563] leading-relaxed mb-5"
      >
        {description}
      </p>

      <div className="flex items-center justify-end gap-2.5 pt-3 border-t border-[#F1F5F9]">
        <Button variant="outline" size="sm" onClick={onCancel}>
          {cancelLabel}
        </Button>
        <Button variant="primary" size="sm" onClick={onConfirm}>
          {confirmLabel}
        </Button>
      </div>
    </div>
  );
};

/* ==========================================================================
   5. TOAST NOTIFICATION
   ========================================================================== */
export interface ToastNotificationProps {
  title?: string;
  subtitle?: string;
  badgeText?: string;
  onDismiss?: () => void;
}

export const ToastNotification: React.FC<ToastNotificationProps> = ({
  title = 'New Personal Record • Barbell Squat',
  subtitle = 'Set 3 logged at 65 KG × 10 Reps (+5 KG improvement)',
  badgeText = 'PR',
  onDismiss,
}) => {
  return (
    <div
      role="status"
      className="bg-white rounded-[10px] border-l-4 border-l-[#E53935] border border-[#E5E7EB] p-3.5 shadow-hf-md flex items-center justify-between gap-3 max-w-md w-full"
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-[8px] bg-[#FEF2F2] text-[#E53935] flex items-center justify-center shrink-0 font-mono text-[12px] font-extrabold">
          <Flame className="w-4 h-4 fill-[#E53935]" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h5 className="text-[13px] font-bold text-[#111827]">{title}</h5>
            {badgeText && (
              <span className="px-1.5 py-0.5 rounded-[4px] bg-[#E53935] text-white font-mono text-[10px] font-bold">
                {badgeText}
              </span>
            )}
          </div>
          <p className="text-[12px] font-medium text-[#4B5563] mt-0.5">
            {subtitle}
          </p>
        </div>
      </div>

      <button
        type="button"
        onClick={onDismiss}
        aria-label="Dismiss notification"
        className="w-7 h-7 rounded-[6px] text-[#9CA3AF] hover:text-[#111827] hover:bg-[#F8FAFC] flex items-center justify-center shrink-0"
      >
        <X className="w-4 h-4" strokeWidth={2} />
      </button>
    </div>
  );
};
