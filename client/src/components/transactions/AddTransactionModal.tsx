import React, { useState, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { useGroq } from '../ai/useGroq';
import Modal from '../ui/Modal';
import { CATEGORIES } from '../../data/mockData';
import { Sparkles, Loader2, AlertCircle } from 'lucide-react';
import { cn } from '../../lib/utils';

const AddTransactionModal = ({ isOpen, onClose, transactionToEdit }) => {
  const { addTransaction, editTransaction, addToast } = useStore();
  const { suggestCategory } = useGroq();
  
  const [formData, setFormData] = useState({
    date: new Date().toISOString().split('T')[0],
    amount: '',
    type: 'expense',
    category: CATEGORIES[0],
    merchant: '',
    description: '',
  });

  const [isSuggesting, setIsSuggesting] = useState(false);
  const [isAiSuggested, setIsAiSuggested] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (transactionToEdit) {
      setFormData({
        ...transactionToEdit,
        date: new Date(transactionToEdit.date).toISOString().split('T')[0],
      });
    } else {
      setFormData({
        date: new Date().toISOString().split('T')[0],
        amount: '',
        type: 'expense',
        category: CATEGORIES[0],
        merchant: '',
        description: '',
      });
    }
    setErrors({});
    setIsAiSuggested(false);
  }, [transactionToEdit, isOpen]);

  const handleMerchantBlur = async () => {
    if (formData.merchant.length >= 3 && !transactionToEdit) {
      setIsSuggesting(true);
      const suggestion = await suggestCategory(formData.merchant);
      if (suggestion && CATEGORIES.includes(suggestion)) {
        setFormData(prev => ({ ...prev, category: suggestion }));
        setIsAiSuggested(true);
      }
      setIsSuggesting(false);
    }
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.amount || formData.amount <= 0) newErrors.amount = "Amount must be positive";
    if (!formData.merchant) newErrors.merchant = "Merchant is required";
    if (!formData.category) newErrors.category = "Category is required";
    if (!formData.date) newErrors.date = "Date is required";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    const data = {
      ...formData,
      amount: parseFloat(formData.amount),
    };

    if (transactionToEdit) {
      editTransaction(transactionToEdit.id, data);
      addToast("Transaction updated successfully!", "success");
    } else {
      addTransaction(data);
      addToast("Transaction added successfully!", "success");
    }
    onClose();
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={transactionToEdit ? "Edit Transaction" : "Add Transaction"}
      size="md"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Type Toggle */}
        <div className="flex p-1 bg-slate-100 dark:bg-slate-800 rounded-xl">
          {['expense', 'income'].map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setFormData({ ...formData, type })}
              className={cn(
                "flex-1 py-2 rounded-lg text-xs font-black uppercase tracking-widest transition-all duration-200",
                formData.type === type 
                  ? (type === 'income' ? "bg-emerald-500 text-white shadow-lg" : "bg-rose-500 text-white shadow-lg")
                  : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
              )}
            >
              {type}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4">
          {/* Amount */}
          <div className="col-span-2 sm:col-span-1">
            <label className="text-[10px] font-black uppercase tracking-tighter text-slate-400 mb-1.5 block ml-1">Amount (₹)</label>
            <input
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
              className={cn(
                "w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border transition-all text-sm font-bold focus:outline-none focus:ring-2",
                errors.amount ? "border-rose-500 ring-rose-500/20" : "border-slate-200 dark:border-slate-700 focus:ring-indigo-500/20 focus:border-indigo-500"
              )}
              placeholder="0.00"
            />
            {errors.amount && <p className="text-[10px] font-bold text-rose-500 mt-1 ml-1">{errors.amount}</p>}
          </div>

          {/* Date */}
          <div className="col-span-2 sm:col-span-1">
            <label className="text-[10px] font-black uppercase tracking-tighter text-slate-400 mb-1.5 block ml-1">Date</label>
            <input
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-bold transition-all"
            />
          </div>
        </div>

        {/* Merchant */}
        <div>
          <label className="text-[10px] font-black uppercase tracking-tighter text-slate-400 mb-1.5 block ml-1">Merchant / Payee</label>
          <input
            type="text"
            value={formData.merchant}
            onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
            onBlur={handleMerchantBlur}
            className={cn(
              "w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border transition-all text-sm font-bold focus:outline-none focus:ring-2",
              errors.merchant ? "border-rose-500 ring-rose-500/20" : "border-slate-200 dark:border-slate-700 focus:ring-indigo-500/20 focus:border-indigo-500"
            )}
            placeholder="e.g. Amazon, Starbucks, TCS"
          />
          {errors.merchant && <p className="text-[10px] font-bold text-rose-500 mt-1 ml-1">{errors.merchant}</p>}
        </div>

        {/* Category */}
        <div className="relative">
          <div className="flex items-center justify-between mb-1.5 ml-1">
            <label className="text-[10px] font-black uppercase tracking-tighter text-slate-400">Category</label>
            {isSuggesting && (
              <span className="flex items-center gap-1 text-[10px] font-black text-indigo-600 dark:text-indigo-400 uppercase tracking-widest animate-pulse">
                <Loader2 className="w-3 h-3 animate-spin" />
                AI Suggesting...
              </span>
            )}
            {isAiSuggested && !isSuggesting && (
              <span className="flex items-center gap-1 text-[10px] font-black text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                <Sparkles className="w-3 h-3" />
                AI Suggested
              </span>
            )}
          </div>
          <select
            value={formData.category}
            onChange={(e) => {
              setFormData({ ...formData, category: e.target.value });
              setIsAiSuggested(false);
            }}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-bold transition-all"
          >
            {CATEGORIES.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="text-[10px] font-black uppercase tracking-tighter text-slate-400 mb-1.5 block ml-1">Description (Optional)</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full px-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-bold transition-all resize-none h-20"
            placeholder="What was this for?"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={cn(
            "w-full py-4 rounded-xl text-sm font-black uppercase tracking-widest shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2",
            formData.type === 'income' 
              ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-200 dark:shadow-none" 
              : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 dark:shadow-none"
          )}
        >
          {transactionToEdit ? "Update Transaction" : "Save Transaction"}
        </button>
      </form>
    </Modal>
  );
};

export default AddTransactionModal;
