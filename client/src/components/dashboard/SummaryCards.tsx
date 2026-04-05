import { useStore } from '../../store/useStore';
import { 
  Wallet, 
  TrendingUp, 
  TrendingDown, 
  PiggyBank, 
  ArrowUpRight, 
  ArrowDownRight,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '../../lib/utils';

interface SummaryCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend: number | string;
  bgColorClass: string;
  iconColorClass: string;
}

const SummaryCard = ({ title, value, icon: Icon, trend, bgColorClass, iconColorClass }: SummaryCardProps) => (
  <div className={cn(
    "p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group",
  )}>
    <div className="flex items-start justify-between">
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <div className={cn("p-2 rounded-lg", bgColorClass)}>
            <Icon className={cn("w-5 h-5", iconColorClass)} />
          </div>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 tracking-tight uppercase">
            {title}
          </p>
        </div>
        
        <div>
          <h3 className="text-3xl font-black text-slate-900 dark:text-white tracking-tighter">
            {typeof value === 'number' ? `₹${value.toLocaleString('en-IN')}` : value}
          </h3>
          
          <div className="flex items-center gap-2 mt-2">
            <span className={cn(
              "flex items-center gap-1 text-xs font-bold px-2 py-1 rounded-full",
              Number(trend) >= 0 
                ? "bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400" 
                : "bg-rose-50 dark:bg-rose-900/30 text-rose-600 dark:text-rose-400"
            )}>
              {Number(trend) >= 0 ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              {Math.abs(Number(trend))}%
            </span>
            <span className="text-[10px] font-medium text-slate-400 dark:text-slate-500 uppercase tracking-wider">
              vs last month
            </span>
          </div>
        </div>
      </div>
    </div>
    
    {/* Subtle Decorative Gradient */}
    <div className={cn(
      "absolute bottom-0 right-0 w-24 h-24 opacity-[0.03] rounded-full -mr-8 -mb-8 blur-3xl",
      bgColorClass
    )} />
  </div>
);

const SummaryCards = () => {
  const { transactions } = useStore();

  const calculateStats = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const prevMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const prevYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    const getMonthStats = (month: number, year: number) => {
      const monthTransactions = transactions.filter((t: { date: string; type: string; amount: number }) => {
        const d = new Date(t.date);
        return d.getMonth() === month && d.getFullYear() === year;
      });
      
      const income = monthTransactions
        .filter((t: { type: string }) => t.type === 'income')
        .reduce((sum: number, t: { amount: number }) => sum + t.amount, 0);
      const expenses = monthTransactions
        .filter((t: { type: string }) => t.type === 'expense')
        .reduce((sum: number, t: { amount: number }) => sum + t.amount, 0);
      
      return { income, expenses, balance: income - expenses };
    };

    const current = getMonthStats(currentMonth, currentYear);
    const prev = getMonthStats(prevMonth, prevYear);

    const totalIncome = transactions
      .filter((t: { type: string }) => t.type === 'income')
      .reduce((sum: number, t: { amount: number }) => sum + t.amount, 0);
    const totalExpenses = transactions
      .filter((t: { type: string }) => t.type === 'expense')
      .reduce((sum: number, t: { amount: number }) => sum + t.amount, 0);
    const totalBalance = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? ((totalBalance / totalIncome) * 100).toFixed(1) : 0;

    const getTrend = (curr: number, prev: number) => {
      if (prev === 0) return 0;
      return (((curr - prev) / prev) * 100).toFixed(1);
    };

    return [
      {
        title: "Total Balance",
        value: totalBalance,
        icon: Wallet,
        trend: getTrend(current.balance, prev.balance),
        colorClass: "border-blue-500",
        bgColorClass: "bg-blue-50 dark:bg-blue-900/30",
        iconColorClass: "text-blue-600 dark:text-blue-400"
      },
      {
        title: "Total Income",
        value: totalIncome,
        icon: TrendingUp,
        trend: getTrend(current.income, prev.income),
        colorClass: "border-emerald-500",
        bgColorClass: "bg-emerald-50 dark:bg-emerald-900/30",
        iconColorClass: "text-emerald-600 dark:text-emerald-400"
      },
      {
        title: "Total Expenses",
        value: totalExpenses,
        icon: TrendingDown,
        trend: getTrend(current.expenses, prev.expenses),
        colorClass: "border-rose-500",
        bgColorClass: "bg-rose-50 dark:bg-rose-900/30",
        iconColorClass: "text-rose-600 dark:text-rose-400"
      },
      {
        title: "Savings Rate",
        value: `${savingsRate}%`,
        icon: PiggyBank,
        trend: 2.5,
        colorClass: "border-violet-500",
        bgColorClass: "bg-violet-50 dark:bg-violet-900/30",
        iconColorClass: "text-violet-600 dark:text-violet-400"
      }
    ];
  };

  const stats = calculateStats();

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <SummaryCard key={index} {...stat} />
      ))}
    </div>
  );
};

export default SummaryCards;