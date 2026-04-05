import Groq from "groq-sdk";
import { useStore } from "../../store/useStore";
import { buildChatSystemPrompt, buildInsightsPrompt, buildCategorySuggestionPrompt } from "../../utils/groqHelpers";
import { useMemo } from "react";

const apiKey = import.meta.env.VITE_GROQ_API_KEY;

export const useGroq = () => {
  const { transactions, chatHistory, addChatMessage, setAIInsights } = useStore();

  const groq = useMemo(() => {
    if (!apiKey) return null;
    return new Groq({
      apiKey,
      dangerouslyAllowBrowser: true,
    });
  }, []);

  const getFinancialSummary = () => {
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
    const balance = totalIncome - totalExpenses;
    const savingsRate = totalIncome > 0 ? (((totalIncome - totalExpenses) / totalIncome) * 100).toFixed(1) : 0;

    const categoryTotals = transactions
      .filter((t) => t.type === "expense")
      .reduce((acc, t) => {
        acc[t.category] = (acc[t.category] || 0) + t.amount;
        return acc;
      }, {});

    const topCategories = Object.entries(categoryTotals)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 3)
      .map(([cat, amt]) => `${cat} (₹${amt.toLocaleString("en-IN")})`)
      .join(", ");

    const last10Transactions = transactions
      .slice(0, 10)
      .map((t) => `${t.date}: ${t.merchant} - ₹${t.amount.toLocaleString("en-IN")} (${t.type})`)
      .join("; ");

    // Get last 3 months data for insights
    const monthlyData = transactions.slice(0, 30); // simplified for prompt

    return {
      balance,
      totalIncome,
      totalExpenses,
      savingsRate,
      topCategories,
      monthlyData: JSON.stringify(monthlyData),
      last10Transactions,
    };
  };

  const sendMessage = async (userMessage) => {
    if (!groq) return "Groq API key missing. Please add VITE_GROQ_API_KEY to your .env file.";

    const summary = getFinancialSummary();
    const systemPrompt = buildChatSystemPrompt(summary);

    const messages = [
      { role: "system", content: systemPrompt },
      ...chatHistory,
      { role: "user", content: userMessage },
    ];

    try {
      const response = await groq.chat.completions.create({
        messages,
        model: "llama-3.3-70b-versatile",
      });

      const aiResponse = response.choices[0]?.message?.content || "Sorry, I couldn't process that.";
      return aiResponse;
    } catch (error) {
      console.error("Groq Chat Error:", error);
      return "I encountered an error while processing your request.";
    }
  };

  const generateInsights = async () => {
    if (!groq) return;

    const last3Months = transactions.slice(0, 50); // Get enough recent data
    const prompt = buildInsightsPrompt(JSON.stringify(last3Months));

    try {
      const response = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile",
      });

      const insights = response.choices[0]?.message?.content || "";
      setAIInsights(insights);
      return insights;
    } catch (error) {
      console.error("Groq Insights Error:", error);
      return null;
    }
  };

  const suggestCategory = async (merchant) => {
    if (!groq || merchant.length < 3) return null;

    const prompt = buildCategorySuggestionPrompt(merchant);

    try {
      const response = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.3-70b-versatile",
      });

      return response.choices[0]?.message?.content?.trim() || null;
    } catch (error) {
      console.error("Groq Category Suggestion Error:", error);
      return null;
    }
  };

  return { sendMessage, generateInsights, suggestCategory, isConfigured: !!groq };
};
