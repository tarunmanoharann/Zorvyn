import React from 'react';
import { useStore } from '../../store/useStore';
import { 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ShieldCheck, 
  Eye,
  CalendarDays,
  UserCircle
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../lib/utils';

const Topbar = ({ isSidebarOpen, setSidebarOpen, isMobile }) => {
  const { role, setRole, darkMode, toggleDarkMode } = useStore();
  const currentDate = format(new Date(), 'EEEE, MMMM do');

  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
      <div className="flex items-center justify-between h-full px-4 lg:px-8">
        
        {/* Left Side: Menu Toggle + Page Title (Mobile) */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <div className="hidden sm:flex items-center gap-2 text-slate-500 dark:text-slate-400">
            <CalendarDays className="w-4 h-4" />
            <span className="text-sm font-medium">{currentDate}</span>
          </div>
        </div>

        {/* Right Side: Role Switcher + Dark Mode + User */}
        <div className="flex items-center gap-3 md:gap-6">
          
          {/* Role Switcher */}
          <div className="relative group">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 hover:bg-white dark:hover:bg-slate-800 transition-colors cursor-pointer">
              <div className={cn(
                "w-2 h-2 rounded-full",
                role === 'admin' ? "bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" : "bg-slate-400"
              )} />
              <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                {role}
              </span>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="absolute inset-0 opacity-0 cursor-pointer w-full"
              >
                <option value="admin">Admin</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>
          </div>

          <div className="h-8 w-px bg-slate-200 dark:bg-slate-800 hidden md:block" />

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-indigo-600 dark:hover:text-indigo-400 transition-all active:scale-95"
              aria-label="Toggle dark mode"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            
            <div className="hidden sm:flex items-center gap-3 pl-2">
              <div className="text-right">
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">Zorvyn</p>
                <p className="text-[10px] text-slate-500 dark:text-slate-400 font-medium uppercase tracking-tighter mt-1">
                  {role === 'admin' ? 'System Admin' : 'Read Only Access'}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 p-[2px] shadow-lg">
                <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center">
                  <UserCircle className="w-8 h-8 text-slate-400" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default Topbar;
