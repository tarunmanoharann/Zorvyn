import React from 'react';
import { useStore } from '../../store/useStore';
import { Search, RotateCcw, Filter, ChevronDown } from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';
import { cn } from '../../lib/utils';

const TransactionFilters = () => {
  const { filters, setFilter, resetFilters } = useStore();

  const handleSearch = (e) => {
    setFilter('search', e.target.value);
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
      
      {/* Search and Type Filter */}
      <div className="flex flex-col lg:flex-row gap-4 items-center">
        <div className="relative w-full lg:flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-indigo-600 transition-colors" />
          <input
            type="text"
            placeholder="Search merchant or description..."
            value={filters.search}
            onChange={handleSearch}
            className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all text-sm font-medium"
          />
        </div>

        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl w-full lg:w-auto self-stretch">
          {['All', 'Income', 'Expense'].map((type) => (
            <button
              key={type}
              onClick={() => setFilter('type', type)}
              className={cn(
                "flex-1 lg:px-6 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-200",
                filters.type === type 
                  ? "bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-sm" 
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              )}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Dropdowns and Date Range */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Category Filter */}
        <div className="relative">
          <label className="text-[10px] font-black uppercase tracking-tighter text-slate-400 mb-1.5 block ml-1">Category</label>
          <div className="relative">
            <select
              value={filters.category}
              onChange={(e) => setFilter('category', e.target.value)}
              className="w-full appearance-none pl-4 pr-10 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-bold"
            >
              <option value="All">All Categories</option>
              {CATEGORIES.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Date From */}
        <div>
          <label className="text-[10px] font-black uppercase tracking-tighter text-slate-400 mb-1.5 block ml-1">From Date</label>
          <input
            type="date"
            value={filters.dateFrom}
            onChange={(e) => setFilter('dateFrom', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-bold"
          />
        </div>

        {/* Date To */}
        <div>
          <label className="text-[10px] font-black uppercase tracking-tighter text-slate-400 mb-1.5 block ml-1">To Date</label>
          <input
            type="date"
            value={filters.dateTo}
            onChange={(e) => setFilter('dateTo', e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 text-sm font-bold"
          />
        </div>

        {/* Reset Button */}
        <div className="flex items-end">
          <button
            onClick={resetFilters}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-900/20 dark:hover:text-rose-400 transition-all font-black text-xs uppercase tracking-widest active:scale-95"
          >
            <RotateCcw className="w-4 h-4" />
            Reset All
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionFilters;
