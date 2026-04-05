import React, { useState } from 'react';
import { useStore } from '../store/useStore';
import TransactionFilters from '../components/transactions/TransactionFilters';
import TransactionTable from '../components/transactions/TransactionTable';
import AddTransactionModal from '../components/transactions/AddTransactionModal';
import { Plus, Download, FileJson, FileSpreadsheet, Trash2, AlertTriangle } from 'lucide-react';
import { exportToCSV, exportToJSON } from '../utils/exportUtils';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '../components/ui/dialog';
import { cn } from '../lib/utils';

const Transactions = () => {
  const { role, transactions, filters, deleteTransaction, addToast } = useStore();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [transactionToEdit, setTransactionToEdit] = useState(null);
  const [transactionToDelete, setTransactionToDelete] = useState(null);

  // Filter logic for export
  const getFilteredData = () => {
    return transactions.filter(t => {
      const matchesSearch = t.merchant.toLowerCase().includes(filters.search.toLowerCase()) || 
                            t.description.toLowerCase().includes(filters.search.toLowerCase());
      const matchesType = filters.type === 'All' || t.type.toLowerCase() === filters.type.toLowerCase();
      const matchesCategory = filters.category === 'All' || t.category === filters.category;
      
      let matchesDate = true;
      if (filters.dateFrom) matchesDate = matchesDate && new Date(t.date) >= new Date(filters.dateFrom);
      if (filters.dateTo) matchesDate = matchesDate && new Date(t.date) <= new Date(filters.dateTo);
      
      return matchesSearch && matchesType && matchesCategory && matchesDate;
    });
  };

  const handleExportCSV = () => {
    const data = getFilteredData();
    exportToCSV(data);
    addToast("CSV Exported successfully!", "info");
  };

  const handleExportJSON = () => {
    const data = getFilteredData();
    exportToJSON(data);
    addToast("JSON Exported successfully!", "info");
  };

  const handleEdit = (transaction) => {
    setTransactionToEdit(transaction);
    setIsAddModalOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (transactionToDelete) {
      deleteTransaction(transactionToDelete);
      setTransactionToDelete(null);
      addToast("Transaction deleted successfully", "success");
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
            Transactions
          </h1>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-widest">
            Manage and monitor your financial activity
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Export Buttons */}
          <div className="flex items-center p-1 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
            <button
              onClick={handleExportCSV}
              className="p-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all active:scale-95"
              title="Export CSV"
            >
              <FileSpreadsheet className="w-5 h-5" />
            </button>
            <div className="w-px h-6 bg-slate-100 dark:bg-slate-800 mx-1" />
            <button
              onClick={handleExportJSON}
              className="p-2.5 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all active:scale-95"
              title="Export JSON"
            >
              <FileJson className="w-5 h-5" />
            </button>
          </div>

          {/* Add Transaction (Admin only) */}
          {role === 'admin' && (
            <button
              onClick={() => {
                setTransactionToEdit(null);
                setIsAddModalOpen(true);
              }}
              className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-sm font-black shadow-lg shadow-indigo-200 dark:shadow-none transition-all active:scale-95 uppercase tracking-widest"
            >
              <Plus className="w-5 h-5" />
              Add Transaction
            </button>
          )}
        </div>
      </div>

      {/* Filters */}
      <TransactionFilters />

      {/* Table */}
      <TransactionTable 
        onEdit={handleEdit} 
        onDelete={(id) => setTransactionToDelete(id)} 
      />

      {/* Add/Edit Modal */}
      <AddTransactionModal 
        isOpen={isAddModalOpen} 
        onClose={() => {
          setIsAddModalOpen(false);
          setTransactionToEdit(null);
        }}
        transactionToEdit={transactionToEdit}
      />

      {/* Delete Confirmation Modal */}
      <Dialog open={!!transactionToDelete} onOpenChange={(open) => !open && setTransactionToDelete(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Transaction</DialogTitle>
            <DialogDescription>
              This action cannot be undone. This will permanently delete the transaction from your records.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="flex flex-col items-center text-center">
              <div className="w-16 h-16 rounded-full bg-rose-50 dark:bg-rose-900/20 flex items-center justify-center mb-4 ring-4 ring-rose-100/50 dark:ring-rose-900/10">
                <AlertTriangle className="w-8 h-8 text-rose-600 dark:text-rose-400" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Are you sure?</h3>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setTransactionToDelete(null)}
                className="flex-1 px-6 py-3 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-black text-xs uppercase tracking-widest hover:bg-slate-200 dark:hover:bg-slate-700 transition-all active:scale-95"
              >
                Cancel
              </button>
              <button
                onClick={handleDeleteConfirm}
                className="flex-1 px-6 py-3 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-rose-200 dark:shadow-none transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Delete
              </button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  );
};

export default Transactions;
