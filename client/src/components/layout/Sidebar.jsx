import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ReceiptIndianRupee, 
  Sparkles, 
  ChevronLeft, 
  ChevronRight,
  TrendingUp
} from 'lucide-react';
import { cn } from '../../lib/utils';

const Sidebar = ({ isOpen, toggleSidebar, isMobile }) => {
  const navItems = [
    { to: '/', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/transactions', label: 'Transactions', icon: ReceiptIndianRupee },
    { to: '/insights', label: 'Insights', icon: Sparkles },
  ];

  const sidebarClasses = cn(
    "fixed left-0 top-0 h-full bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 transition-all duration-300 z-50",
    isMobile 
      ? (isOpen ? "w-64 translate-x-0" : "w-64 -translate-x-full")
      : (isOpen ? "w-64" : "w-20")
  );

  return (
    <aside className={sidebarClasses}>
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="h-16 flex items-center px-6 border-b border-slate-200 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-white" />
            </div>
            {(isOpen || isMobile) && (
              <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
                FinanceIQ
              </span>
            )}
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 py-6 px-3 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 group",
                  isActive 
                    ? "bg-indigo-50 dark:bg-indigo-900/20 text-indigo-600 dark:text-indigo-400 shadow-sm"
                    : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-200"
                )}
              >
                <Icon className={cn(
                  "w-5 h-5 flex-shrink-0 transition-colors",
                  "group-hover:scale-110 duration-200"
                )} />
                {(isOpen || isMobile) && (
                  <span className="truncate">{item.label}</span>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* Toggle Button (Desktop Only) */}
        {!isMobile && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <button
              onClick={toggleSidebar}
              className="w-full flex items-center justify-center p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              {isOpen ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
            </button>
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
