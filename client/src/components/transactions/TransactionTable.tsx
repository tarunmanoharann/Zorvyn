import React from 'react';
import { useStore } from '../../store/useStore';
import { 
  ChevronUp, 
  ChevronDown, 
  Edit2, 
  Trash2, 
  ArrowLeft, 
  ArrowRight,
  MoreVertical
} from 'lucide-react';
import { format } from 'date-fns';
import { Badge } from '../ui/badge';
import { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyMedia } from '../ui/empty';
import { cn } from '../../lib/utils';

const TransactionTable = ({ onEdit, onDelete }) => {
  const { transactions, filters, setFilter, role } = useStore();

  // Apply filters
  const filteredTransactions = transactions.filter(t => {
    const matchesSearch = t.merchant.toLowerCase().includes(filters.search.toLowerCase()) || 
                          t.description.toLowerCase().includes(filters.search.toLowerCase());
    const matchesType = filters.type === 'All' || t.type.toLowerCase() === filters.type.toLowerCase();
    const matchesCategory = filters.category === 'All' || t.category === filters.category;
    
    let matchesDate = true;
    if (filters.dateFrom) matchesDate = matchesDate && new Date(t.date) >= new Date(filters.dateFrom);
    if (filters.dateTo) matchesDate = matchesDate && new Date(t.date) <= new Date(filters.dateTo);
    
    return matchesSearch && matchesType && matchesCategory && matchesDate;
  });

  // Apply sorting
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    const { sortBy, sortOrder } = filters;
    let comparison = 0;
    
    if (sortBy === 'date') comparison = new Date(a.date) - new Date(b.date);
    else if (sortBy === 'amount') comparison = a.amount - b.amount;
    else if (sortBy === 'category') comparison = a.category.localeCompare(b.category);
    
    return sortOrder === 'asc' ? comparison : -comparison;
  });

  // Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(sortedTransactions.length / itemsPerPage);
  const startIndex = (filters.currentPage - 1) * itemsPerPage;
  const paginatedTransactions = sortedTransactions.slice(startIndex, startIndex + itemsPerPage);

  const handleSort = (column) => {
    if (filters.sortBy === column) {
      setFilter('sortOrder', filters.sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setFilter('sortBy', column);
      setFilter('sortOrder', 'desc');
    }
  };

  if (filteredTransactions.length === 0) {
    return (
      <Empty>
        <EmptyHeader>
          <EmptyTitle>No results found</EmptyTitle>
          <EmptyDescription>Try adjusting your filters or search terms to find what you're looking for.</EmptyDescription>
        </EmptyHeader>
      </Empty>
    );
  }

  const SortIcon = ({ column }) => {
    if (filters.sortBy !== column) return null;
    return filters.sortOrder === 'asc' ? <ChevronUp className="w-3 h-3 ml-1" /> : <ChevronDown className="w-3 h-3 ml-1" />;
  };

  return (
    <div className="space-y-6">
      <div className="overflow-x-auto bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 dark:bg-slate-800/50 border-b border-slate-100 dark:border-slate-800">
              <th 
                className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 cursor-pointer hover:text-indigo-600 transition-colors"
                onClick={() => handleSort('date')}
              >
                <div className="flex items-center">Date <SortIcon column="date" /></div>
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                Merchant / Description
              </th>
              <th 
                className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 cursor-pointer hover:text-indigo-600 transition-colors"
                onClick={() => handleSort('category')}
              >
                <div className="flex items-center">Category <SortIcon column="category" /></div>
              </th>
              <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                Type
              </th>
              <th 
                className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 cursor-pointer hover:text-indigo-600 transition-colors"
                onClick={() => handleSort('amount')}
              >
                <div className="flex items-center justify-end">Amount <SortIcon column="amount" /></div>
              </th>
              {role === 'admin' && (
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-right">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {paginatedTransactions.map((t) => (
              <tr key={t.id} className="group hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-slate-600 dark:text-slate-400">
                  {format(new Date(t.date), 'MMM d, yyyy')}
                </td>
                <td className="px-6 py-4">
                  <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight">{t.merchant}</p>
                  <p className="text-xs font-medium text-slate-400 dark:text-slate-500 mt-1 truncate max-w-[200px]">{t.description}</p>
                </td>
                <td className="px-6 py-4">
                  <Badge variant="violet" className="text-[10px] tracking-widest uppercase">
                    {t.category}
                  </Badge>
                </td>
                <td className="px-6 py-4">
                  <Badge variant={t.type === 'income' ? 'success' : 'danger'} className="text-[10px] tracking-widest uppercase">
                    {t.type}
                  </Badge>
                </td>
                <td className={`px-6 py-4 text-sm font-black text-right ${
                  t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}>
                  {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString('en-IN')}
                </td>
                {role === 'admin' && (
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => onEdit(t)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => onDelete(t.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-900/20 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <button className="p-1.5 rounded-lg text-slate-400 lg:hidden">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white dark:bg-slate-900 p-4 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
        <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
          Showing <span className="text-slate-900 dark:text-white">{startIndex + 1}</span> to <span className="text-slate-900 dark:text-white">{Math.min(startIndex + itemsPerPage, sortedTransactions.length)}</span> of <span className="text-slate-900 dark:text-white">{sortedTransactions.length}</span>
        </p>

        <div className="flex items-center gap-2">
          <button
            disabled={filters.currentPage === 1}
            onClick={() => setFilter('currentPage', filters.currentPage - 1)}
            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-50 disabled:pointer-events-none transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-1">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setFilter('currentPage', i + 1)}
                className={cn(
                  "w-8 h-8 rounded-lg text-xs font-black transition-all duration-200",
                  filters.currentPage === i + 1
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-200 dark:shadow-none"
                    : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                )}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            disabled={filters.currentPage === totalPages || totalPages === 0}
            onClick={() => setFilter('currentPage', filters.currentPage + 1)}
            className="p-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 hover:text-indigo-600 dark:hover:text-indigo-400 disabled:opacity-50 disabled:pointer-events-none transition-all"
          >
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionTable;
