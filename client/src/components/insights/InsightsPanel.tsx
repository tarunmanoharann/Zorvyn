import React from 'react';
import { useStore } from '../../store/useStore';
import { 
  TrendingUp, 
  TrendingDown, 
  Target, 
  Calendar, 
  Calculator,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
import { format, differenceInDays } from 'date-fns';
import { cn } from '../../lib/utils';

const InsightStatCard = ({ title, value, subtext, icon: Icon, colorClass }) => (
  <Card className="relative overflow-hidden group">
    <div className={cn("absolute left-0 top-0 bottom-0 w-1", colorClass)} />
    <CardContent className="p-6">
      <div className="flex items-start justify-between">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <div className={cn("p-2 rounded-lg bg-opacity-10", colorClass.replace('bg-', 'text-'))}>
              <Icon className="w-4 h-4" />
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">
              {title}
            </p>
          </div>
          
          <div>
            <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter">
              {value}
            </h3>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-wider">
              {subtext}
            </p>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>
);

const InsightsPanel = () => {
  const { transactions } = useStore();

  const getInsights = () => {
    const expenses = transactions.filter((t: any) => t.type === 'expense');
    if (expenses.length === 0) return null;

    // Highest/Lowest spending category
    const categoryTotals = expenses.reduce((acc: any, t: any) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {});
    
    const sortedCategories = Object.entries(categoryTotals).sort(([, a]: [string, any], [, b]: [string, any]) => b - a);
    const highest = sortedCategories[0];
    const lowest = sortedCategories[sortedCategories.length - 1];
    
    const totalExpense = Object.values(categoryTotals).reduce((sum: any, val: any) => sum + val, 0) as number;

    // Biggest single expense
    const biggest = [...expenses].sort((a: any, b: any) => b.amount - a.amount)[0] as any;

    // Average daily spending
    const dates = expenses.map((t: any) => new Date(t.date));
    const minDate = new Date(Math.min(...dates.map(d => d.getTime())));
    const maxDate = new Date(Math.max(...dates.map(d => d.getTime())));
    const days = Math.max(1, differenceInDays(maxDate, minDate));
    const avgDaily = (totalExpense / days).toFixed(0);

    // Best saving month (Income - Expense)
    const monthlyStats = transactions.reduce((acc: any, t: any) => {
      const month = format(new Date(t.date), 'MMM yyyy');
      if (!acc[month]) acc[month] = { income: 0, expenses: 0 };
      if (t.type === 'income') acc[month].income += t.amount;
      else acc[month].expenses += t.amount;
      return acc;
    }, {});

    const bestSavingMonth = Object.entries(monthlyStats)
      .map(([month, stats]: [string, any]) => ({ month, savings: stats.income - stats.expenses }))
      .sort((a, b) => b.savings - a.savings)[0];

    return [
      {
        title: "Highest Spending Category",
        value: highest[0],
        subtext: `₹${highest[1].toLocaleString('en-IN')} (${((highest[1] / totalExpense) * 100).toFixed(1)}% of total)`,
        icon: TrendingUp,
        colorClass: "bg-rose-500"
      },
      {
        title: "Lowest Spending Category",
        value: lowest[0],
        subtext: `₹${lowest[1].toLocaleString('en-IN')} (${((lowest[1] / totalExpense) * 100).toFixed(1)}% of total)`,
        icon: TrendingDown,
        colorClass: "bg-emerald-500"
      },
      {
        title: "Biggest Single Expense",
        value: `₹${biggest.amount.toLocaleString('en-IN')}`,
        subtext: `${biggest.merchant} (${biggest.category})`,
        icon: Target,
        colorClass: "bg-indigo-500"
      },
      {
        title: "Average Daily Spending",
        value: `₹${parseInt(avgDaily).toLocaleString('en-IN')}`,
        subtext: "Calculated over last 6 months",
        icon: Calculator,
        colorClass: "bg-amber-500"
      },
      {
        title: "Best Saving Month",
        value: bestSavingMonth.month,
        subtext: `Saved ₹${bestSavingMonth.savings.toLocaleString('en-IN')}`,
        icon: Calendar,
        colorClass: "bg-violet-500"
      }
    ];
  };

  const insights = getInsights();

  if (!insights) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {insights.map((insight, index) => (
        <InsightStatCard key={index} {...insight} />
      ))}
    </div>
  );
};

export default InsightsPanel;
