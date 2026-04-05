import React from 'react';
import { SearchX, FileQuestion } from 'lucide-react';
import { useStore } from '../../store/useStore';

const EmptyState = ({ 
  icon: Icon = FileQuestion, 
  title = "No results found", 
  message = "Try adjusting your filters or search terms to find what you're looking for.",
  showReset = true 
}) => {
  const { resetFilters } = useStore();

  return (
    <div className="flex flex-col items-center justify-center p-12 text-center bg-white dark:bg-slate-900 rounded-2xl border border-dashed border-slate-200 dark:border-slate-800 transition-all duration-300">
      <div className="w-20 h-20 rounded-full bg-slate-50 dark:bg-slate-800/50 flex items-center justify-center mb-6 ring-4 ring-slate-100/50 dark:ring-slate-800/20">
        <Icon className="w-10 h-10 text-slate-400 dark:text-slate-500" />
      </div>
      
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
        {title}
      </h3>
      
      <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed mb-8">
        {message}
      </p>

      {showReset && (
        <button
          onClick={resetFilters}
          className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95"
        >
          Reset Filters
        </button>
      )}
    </div>
  );
};

export default EmptyState;
