import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { MOCK_TRANSACTIONS } from '../data/mockData';

export const useStore = create(
  persist(
    (set, get) => ({
      // State
      transactions: MOCK_TRANSACTIONS,
      role: 'admin', // Default to admin for development, can be 'viewer'
      darkMode: false,
      filters: {
        search: '',
        type: 'All',
        category: 'All',
        dateFrom: '',
        dateTo: '',
        sortBy: 'date',
        sortOrder: 'desc',
        currentPage: 1,
      },
      toasts: [],
      aiInsights: {
        content: null,
        generatedAt: null,
      },
      chatHistory: [],

      // Actions
      addTransaction: (transaction) => set((state) => ({
        transactions: [
          { ...transaction, id: crypto.randomUUID() },
          ...state.transactions
        ]
      })),

      editTransaction: (id, updatedData) => set((state) => ({
        transactions: state.transactions.map((t) => 
          t.id === id ? { ...t, ...updatedData } : t
        )
      })),

      deleteTransaction: (id) => set((state) => ({
        transactions: state.transactions.filter((t) => t.id !== id)
      })),

      setRole: (role) => set({ role }),

      toggleDarkMode: () => set((state) => {
        const newDarkMode = !state.darkMode;
        if (newDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
        return { darkMode: newDarkMode };
      }),

      setFilter: (key, value) => set((state) => ({
        filters: { ...state.filters, [key]: value, currentPage: 1 }
      })),

      resetFilters: () => set((state) => ({
        filters: {
          ...state.filters,
          search: '',
          type: 'All',
          category: 'All',
          dateFrom: '',
          dateTo: '',
          sortBy: 'date',
          sortOrder: 'desc',
          currentPage: 1,
        }
      })),

      addToast: (message, type = 'success') => {
        const id = crypto.randomUUID();
        set((state) => ({
          toasts: [...state.toasts, { id, message, type }]
        }));
        setTimeout(() => get().removeToast(id), 3000);
      },

      removeToast: (id) => set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id)
      })),

      setAIInsights: (content) => set({
        aiInsights: {
          content,
          generatedAt: new Date().toISOString(),
        }
      }),

      addChatMessage: (message) => set((state) => ({
        chatHistory: [...state.chatHistory, message]
      })),

      clearChatHistory: () => set({ chatHistory: [] }),
    }),
    {
      name: 'finance-dashboard-storage',
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({
        transactions: state.transactions,
        role: state.role,
        darkMode: state.darkMode,
        aiInsights: state.aiInsights,
      }),
    }
  )
);
