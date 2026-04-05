import React from 'react';
import { cn } from '../../lib/utils';

export const Card = ({ children, className, ...props }) => {
  return (
    <div 
      className={cn(
        "bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm overflow-hidden transition-all duration-300 hover:shadow-md",
        className
      )} 
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className }) => (
  <div className={cn("px-6 py-4 border-b border-slate-100 dark:border-slate-800", className)}>
    {children}
  </div>
);

export const CardTitle = ({ children, className }) => (
  <h3 className={cn("text-lg font-bold text-slate-900 dark:text-white", className)}>
    {children}
  </h3>
);

export const CardContent = ({ children, className }) => (
  <div className={cn("p-6", className)}>
    {children}
  </div>
);

export const CardFooter = ({ children, className }) => (
  <div className={cn("px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30", className)}>
    {children}
  </div>
);
