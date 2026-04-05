import React from 'react';
import { useStore } from '../../store/useStore';
import { X, CheckCircle2, AlertCircle, Info, AlertTriangle } from 'lucide-react';
import { cn } from '../../lib/utils';

const Toast = () => {
  const { toasts, removeToast } = useStore();

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
    error: <AlertCircle className="w-5 h-5 text-rose-500" />,
    warning: <AlertTriangle className="w-5 h-5 text-amber-500" />,
    info: <Info className="w-5 h-5 text-indigo-500" />,
  };

  const colors = {
    success: "border-emerald-100 dark:border-emerald-900/30 bg-emerald-50/80 dark:bg-emerald-950/40",
    error: "border-rose-100 dark:border-rose-900/30 bg-rose-50/80 dark:bg-rose-950/40",
    warning: "border-amber-100 dark:border-amber-900/30 bg-amber-50/80 dark:bg-amber-950/40",
    info: "border-indigo-100 dark:border-indigo-900/30 bg-indigo-50/80 dark:bg-indigo-950/40",
  };

  return (
    <div className="fixed top-6 right-6 z-[100] flex flex-col gap-3 w-full max-w-sm pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={cn(
            "flex items-center gap-4 p-4 rounded-xl border backdrop-blur-md shadow-xl pointer-events-auto transition-all duration-500 animate-in slide-in-from-right-full",
            colors[toast.type] || colors.info
          )}
        >
          <div className="flex-shrink-0">
            {icons[toast.type] || icons.info}
          </div>
          
          <p className="flex-1 text-sm font-bold text-slate-900 dark:text-slate-100 leading-tight">
            {toast.message}
          </p>
          
          <button
            onClick={() => removeToast(toast.id)}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      ))}
    </div>
  );
};

export default Toast;
