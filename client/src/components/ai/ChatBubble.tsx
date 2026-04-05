import React from 'react';
import { User, Bot } from 'lucide-react';
import { cn } from '../../lib/utils';

const ChatBubble = ({ message }) => {
  const isAi = message.role === 'assistant';

  return (
    <div className={cn(
      "flex w-full mb-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
      isAi ? "justify-start" : "justify-end"
    )}>
      <div className={cn(
        "flex max-w-[85%] gap-3",
        isAi ? "flex-row" : "flex-row-reverse"
      )}>
        {/* Avatar */}
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 shadow-sm",
          isAi ? "bg-indigo-600 text-white" : "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400"
        )}>
          {isAi ? <Bot className="w-4 h-4" /> : <User className="w-4 h-4" />}
        </div>

        {/* Message Bubble */}
        <div className={cn(
          "p-3 rounded-2xl text-sm leading-relaxed",
          isAi 
            ? "bg-slate-100 dark:bg-slate-800 text-slate-800 dark:text-slate-200 rounded-tl-none" 
            : "bg-indigo-600 text-white rounded-tr-none shadow-lg shadow-indigo-200 dark:shadow-none"
        )}>
          <p className={cn(
            "font-medium",
            isAi ? "text-slate-800 dark:text-slate-200" : "text-white"
          )}>
            {message.content}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatBubble;
