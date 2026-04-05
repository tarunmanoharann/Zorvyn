import React, { useState, useRef, useEffect } from 'react';
import { useStore } from '../../store/useStore';
import { useGroq } from './useGroq';
import { 
  Bot, 
  Send, 
  X, 
  Sparkles, 
  MessageSquare, 
  Trash2, 
  Loader2,
  ChevronDown
} from 'lucide-react';
import ChatBubble from './ChatBubble';
import { cn } from '../../lib/utils';

const SUGGESTED_QUESTIONS = [
  "Where am I overspending?",
  "How can I save more this month?",
  "What's my biggest expense category?",
  "Give me a budget plan"
];

const ChatWidget = () => {
  const { chatHistory, addChatMessage, clearChatHistory, addToast } = useStore();
  const { sendMessage, isConfigured } = useGroq();
  
  const [isOpen, setIsOpen] = useState(true);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const scrollRef = useRef(null);
  const inputRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [chatHistory, isLoading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  const handleSend = async (text) => {
    const messageText = text || input;
    if (!messageText.trim() || isLoading) return;

    if (!isConfigured) {
      addToast("Groq API Key is not configured. Please add VITE_GROQ_API_KEY to your .env file.", "error");
      return;
    }

    const userMessage = { role: 'user', content: messageText };
    addChatMessage(userMessage);
    setInput("");
    setIsLoading(true);

    try {
      const response = await sendMessage(messageText);
      addChatMessage({ role: 'assistant', content: response });
    } catch (error) {
      addChatMessage({ role: 'assistant', content: "Sorry, I encountered an error. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
      
      {/* Chat Panel */}
      {isOpen && (
        <div className="mb-4 w-[380px] h-[550px] bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col animate-in slide-in-from-bottom-10 fade-in duration-300">
          
          {/* Header */}
          <div className="p-5 bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-between shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
            
            <div className="flex items-center gap-3 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white tracking-widest uppercase flex items-center gap-2">
                  FinanceIQ Assistant
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h3>
                <p className="text-[10px] text-indigo-100 font-bold uppercase tracking-tighter opacity-80 mt-0.5">
                  Smart Financial Advisor
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 relative z-10">
              <button 
                onClick={clearChatHistory}
                className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
                title="Clear Chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-2 rounded-lg text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              >
                <ChevronDown className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Messages Container */}
          <div 
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-5 bg-slate-50/50 dark:bg-slate-950/50"
          >
            {chatHistory.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-6">
                <div className="w-20 h-20 rounded-full bg-white dark:bg-slate-900 shadow-xl flex items-center justify-center ring-8 ring-indigo-50 dark:ring-indigo-900/20">
                  <Sparkles className="w-10 h-10 text-indigo-500" />
                </div>
                <div className="space-y-2">
                  <h4 className="text-xl font-black text-slate-900 dark:text-white tracking-tighter">
                    How can I help you?
                  </h4>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-xs mx-auto leading-relaxed">
                    Ask me anything about your finances, budget, or spending habits.
                  </p>
                </div>
                
                <div className="grid grid-cols-1 gap-2 w-full pt-4">
                  {SUGGESTED_QUESTIONS.map((q) => (
                    <button
                      key={q}
                      onClick={() => handleSend(q)}
                      className="px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 hover:border-indigo-500 dark:hover:border-indigo-400 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all text-left shadow-sm active:scale-95"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              chatHistory.map((msg, i) => <ChatBubble key={i} message={msg} />)
            )}
            
            {isLoading && (
              <div className="flex justify-start mb-4">
                <div className="bg-slate-100 dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                  <div className="flex gap-1">
                    <div className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce" />
                    <div className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <div className="w-1.5 h-1.5 bg-slate-400 dark:bg-slate-500 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  </div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">FinanceIQ is thinking</span>
                </div>
              </div>
            )}
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
            <form 
              onSubmit={(e) => { e.preventDefault(); handleSend(); }}
              className="relative flex items-center"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="w-full pl-4 pr-12 py-3.5 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 text-sm font-bold transition-all"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 p-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-200 dark:shadow-none disabled:opacity-50 disabled:pointer-events-none transition-all active:scale-90"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Floating Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 active:scale-90 hover:scale-110 group",
          isOpen 
            ? "bg-rose-500 rotate-90" 
            : "bg-indigo-600 hover:bg-indigo-700"
        )}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <div className="relative">
            <MessageSquare className="w-6 h-6 text-white group-hover:scale-110 transition-transform" />
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 border-2 border-indigo-600 rounded-full" />
          </div>
        )}
      </button>

    </div>
  );
};

export default ChatWidget;
