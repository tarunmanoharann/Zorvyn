import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { useGroq } from '../ai/useGroq';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/Card';
import { Sparkles, Loader2, RefreshCw, Calendar, CheckCircle2 } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '../../lib/utils';

const AIInsightsCard = () => {
  const { aiInsights, setAIInsights, addToast } = useStore();
  const { generateInsights, isConfigured } = useGroq();
  const [isLoading, setIsLoading] = useState(false);

  const handleGenerate = async () => {
    if (!isConfigured) {
      addToast("Groq API Key is not configured. Please add VITE_GROQ_API_KEY to your .env file.", "error");
      return;
    }
    
    setIsLoading(true);
    try {
      await generateInsights();
      addToast("AI Insights generated successfully!", "success");
    } catch (error) {
      addToast("Failed to generate AI insights.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  const parseInsights = (content) => {
    if (!content) return [];
    // Simple parsing for numbered list
    return content.split(/\d+\.\s+/).filter(Boolean).map(s => s.trim());
  };

  const insightsList = parseInsights(aiInsights.content);

  return (
    <Card className="relative overflow-hidden border-2 border-indigo-500/20 shadow-xl shadow-indigo-100 dark:shadow-none">
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full -mr-32 -mt-32 blur-3xl pointer-events-none" />
      
      <CardHeader className="flex flex-row items-center justify-between border-b-0 pb-2">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center shadow-lg shadow-indigo-200 dark:shadow-none">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
          <div>
            <CardTitle className="text-xl">AI-Powered Insights</CardTitle>
            {aiInsights.generatedAt && (
              <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1 flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                Last updated: {format(new Date(aiInsights.generatedAt), 'MMM d, h:mm a')}
              </p>
            )}
          </div>
        </div>

        <button
          onClick={handleGenerate}
          disabled={isLoading}
          className={cn(
            "flex items-center gap-2 px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none shadow-md",
            aiInsights.content 
              ? "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-indigo-50 hover:text-indigo-600" 
              : "bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200 dark:shadow-none"
          )}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              {aiInsights.content ? <RefreshCw className="w-4 h-4" /> : <Sparkles className="w-4 h-4" />}
              {aiInsights.content ? "Regenerate" : "Generate Insights"}
            </>
          )}
        </button>
      </CardHeader>

      <CardContent className="pt-4">
        {!aiInsights.content ? (
          <div className="flex flex-col items-center justify-center py-12 text-center bg-slate-50 dark:bg-slate-800/30 rounded-2xl border-2 border-dashed border-slate-200 dark:border-slate-800">
            <div className="w-16 h-16 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center mb-4 shadow-sm">
              <Sparkles className="w-8 h-8 text-indigo-400" />
            </div>
            <h4 className="text-lg font-black text-slate-900 dark:text-white mb-2 tracking-tight">
              Ready to analyze your finances?
            </h4>
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
              Our AI will analyze your last 3 months of data to provide 5 specific, actionable, and data-driven insights.
            </p>
          </div>
        ) : (
          <div className="space-y-4 animate-in fade-in duration-700">
            {insightsList.map((insight, index) => (
              <div 
                key={index} 
                className="group flex gap-4 p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-900/40 hover:shadow-lg transition-all duration-300"
              >
                <div className="flex-shrink-0 mt-1">
                  <div className={cn(
                    "w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black text-white shadow-sm",
                    index % 3 === 0 ? "bg-indigo-500" : index % 3 === 1 ? "bg-violet-500" : "bg-purple-500"
                  )}>
                    {index + 1}
                  </div>
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-bold text-slate-700 dark:text-slate-300 leading-relaxed">
                    {insight}
                  </p>
                  <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                    <span className="text-[10px] font-black uppercase tracking-tighter text-emerald-600 dark:text-emerald-400">Actionable Advice</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default AIInsightsCard;
