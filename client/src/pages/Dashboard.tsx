import React from 'react';
import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import SummaryCards from '../components/dashboard/SummaryCards';
import BalanceTrendChart from '../components/dashboard/BalanceTrendChart';
import SpendingBreakdownChart from '../components/dashboard/SpendingBreakdownChart';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import { 
  ArrowRight, 
  Sparkles,
  Utensils, 
  Car, 
  ShoppingBag, 
  Tv, 
  HeartPulse, 
  Banknote, 
  Briefcase, 
  Zap, 
  Home, 
  GraduationCap 
} from 'lucide-react';
import { format } from 'date-fns';

const CATEGORY_ICONS = {
  Food: Utensils,
  Transport: Car,
  Shopping: ShoppingBag,
  Entertainment: Tv,
  Health: HeartPulse,
  Salary: Banknote,
  Freelance: Briefcase,
  Utilities: Zap,
  Rent: Home,
  Education: GraduationCap,
};

const RecentTransactions = () => {
  const { transactions } = useStore();
  const recent = transactions.slice(0, 5);

  return (
    <Card>
      <CardHeader className="flex items-center justify-between">
        <CardTitle>Recent Transactions</CardTitle>
        <Link 
          to="/transactions" 
          className="text-xs font-black text-indigo-600 dark:text-indigo-400 hover:text-indigo-700 dark:hover:text-indigo-300 uppercase tracking-widest flex items-center gap-1 group transition-all"
        >
          View All
          <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
        </Link>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-100 dark:divide-slate-800">
          {recent.map((t) => {
            const Icon = CATEGORY_ICONS[t.category] || Banknote;
            return (
              <div 
                key={t.id} 
                className="flex items-center justify-between p-4 hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center">
                    <Icon className="w-5 h-5 text-slate-500 dark:text-slate-400" />
                  </div>
                  <div className="space-y-0.5">
                    <p className="text-sm font-bold text-slate-900 dark:text-white leading-tight truncate max-w-[120px] sm:max-w-none">
                      {t.merchant}
                    </p>
                    <p className="text-[10px] font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {format(new Date(t.date), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`text-sm font-black ${
                    t.type === 'income' ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                  }`}>
                    {t.type === 'income' ? '+' : '-'}₹{t.amount.toLocaleString('en-IN')}
                  </p>
                  <Badge 
                    variant={t.type === 'income' ? 'success' : 'danger'} 
                    className="text-[10px] mt-1"
                  >
                    {t.category}
                  </Badge>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

const Dashboard = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 dark:text-white tracking-tighter">
            Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">Zorvyn</span>!
          </h1>
          <p className="text-sm font-bold text-slate-500 dark:text-slate-400 mt-1 uppercase tracking-widest">
            Here's what's happening with your money today.
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <SummaryCards />

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <BalanceTrendChart />
        <SpendingBreakdownChart />
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <RecentTransactions />
        
        {/* Quick Insight Card */}
        <Card className="bg-gradient-to-br from-indigo-600 to-purple-700 border-none shadow-xl shadow-indigo-200 dark:shadow-none overflow-hidden relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/20 rounded-full -ml-24 -mb-24 blur-3xl" />
          
          <CardContent className="h-full flex flex-col justify-between p-8 relative z-10">
            <div className="space-y-2">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-black text-white tracking-tighter pt-4">
                Unlock AI Financial Insights
              </h3>
              <p className="text-indigo-100 text-sm font-medium leading-relaxed max-w-[280px]">
                Our AI assistant can analyze your spending habits and suggest personalized ways to save more.
              </p>
            </div>
            
            <Link 
              to="/insights" 
              className="w-full sm:w-fit px-8 py-3 bg-white text-indigo-600 rounded-xl text-sm font-black shadow-lg hover:bg-indigo-50 transition-all active:scale-95 text-center mt-8 uppercase tracking-widest"
            >
              Generate Insights
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
