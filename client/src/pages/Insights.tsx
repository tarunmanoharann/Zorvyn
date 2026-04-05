import React from 'react';
import { useStore } from '../store/useStore';
import InsightsPanel from '../components/insights/InsightsPanel';
import AIInsightsCard from '../components/insights/AIInsightsCard';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend, 
  LineChart, 
  Line, 
  ReferenceLine, 
  Area, 
  AreaChart 
} from 'recharts';
import { format, subMonths, startOfMonth, endOfMonth, isWithinInterval } from 'date-fns';

const MonthlyComparisonChart = () => {
  const { transactions } = useStore();

  const getChartData = () => {
    const data = [];
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const monthDate = subMonths(now, i);
      const monthStart = startOfMonth(monthDate);
      const monthEnd = endOfMonth(monthDate);
      const monthName = format(monthDate, 'MMM');

      const monthTransactions = transactions.filter(t => 
        isWithinInterval(new Date(t.date), { start: monthStart, end: monthEnd })
      );

      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      const expenses = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      data.push({
        name: monthName,
        income,
        expenses,
      });
    }
    return data;
  };

  const chartData = getChartData();

  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Income vs Expenses</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke="#e2e8f0" 
                className="dark:stroke-slate-800" 
              />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                tickFormatter={(value) => `₹${value / 1000}k`}
                dx={-10}
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl">
                        <p className="text-xs font-black text-slate-500 uppercase mb-2">{label}</p>
                        <div className="space-y-1">
                          <p className="text-sm font-bold text-emerald-600 flex items-center justify-between gap-4">
                            Income: <span>₹{payload[0].value.toLocaleString('en-IN')}</span>
                          </p>
                          <p className="text-sm font-bold text-rose-600 flex items-center justify-between gap-4">
                            Expenses: <span>₹{payload[1].value.toLocaleString('en-IN')}</span>
                          </p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend verticalAlign="top" align="right" height={36}/>
              <Bar 
                dataKey="income" 
                name="Income" 
                fill="#10b981" 
                radius={[4, 4, 0, 0]} 
                barSize={32}
                animationDuration={1500}
              />
              <Bar 
                dataKey="expenses" 
                name="Expenses" 
                fill="#f43f5e" 
                radius={[4, 4, 0, 0]} 
                barSize={32}
                animationDuration={1500}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

const SavingsTrendChart = () => {
  const { transactions } = useStore();

  const getChartData = () => {
    const data = [];
    const now = new Date();

    for (let i = 5; i >= 0; i--) {
      const monthDate = subMonths(now, i);
      const monthStart = startOfMonth(monthDate);
      const monthEnd = endOfMonth(monthDate);
      const monthName = format(monthDate, 'MMM');

      const monthTransactions = transactions.filter(t => 
        isWithinInterval(new Date(t.date), { start: monthStart, end: monthEnd })
      );

      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0);
      const expenses = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0);

      data.push({
        name: monthName,
        savings: income - expenses,
      });
    }
    return data;
  };

  const chartData = getChartData();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Savings Trend</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-[350px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorSavings" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="3 3" 
                vertical={false} 
                stroke="#e2e8f0" 
                className="dark:stroke-slate-800" 
              />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                dy={10}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#64748b', fontSize: 12, fontWeight: 500 }}
                tickFormatter={(value) => `₹${value / 1000}k`}
                dx={-10}
              />
              <Tooltip 
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bg-white dark:bg-slate-900 p-4 border border-slate-200 dark:border-slate-800 rounded-xl shadow-xl">
                        <p className="text-xs font-black text-slate-500 uppercase mb-1">{label}</p>
                        <p className="text-lg font-black text-violet-600 dark:text-violet-400">
                          ₹{payload[0].value.toLocaleString('en-IN')}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <ReferenceLine y={0} stroke="#94a3b8" strokeWidth={2} strokeDasharray="5 5" />
              <Area 
                type="monotone" 
                dataKey="savings" 
                stroke="#8b5cf6" 
                strokeWidth={3} 
                fillOpacity={1} 
                fill="url(#colorSavings)" 
                animationDuration={1500}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

const Insights = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Header */}
      <div>
        <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
          Financial Insights
        </h1>
        <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-widest">
          Actionable analysis of your spending habits
        </p>
      </div>

      {/* AI Insights Section */}
      <AIInsightsCard />

      {/* Static Insight Cards */}
      <InsightsPanel />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8">
        <MonthlyComparisonChart />
        <SavingsTrendChart />
      </div>

    </div>
  );
};

export default Insights;
