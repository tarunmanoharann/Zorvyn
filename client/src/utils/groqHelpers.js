export const buildChatSystemPrompt = (summary) => {
  const { balance, totalIncome, totalExpenses, savingsRate, topCategories, monthlyData, last10Transactions } = summary;
  
  return `You are FinanceIQ, a smart personal finance assistant. 
The user's financial summary is as follows: 
- Total Balance: ₹${balance.toLocaleString('en-IN')} 
- Total Income: ₹${totalIncome.toLocaleString('en-IN')}  
- Total Expenses: ₹${totalExpenses.toLocaleString('en-IN')} 
- Savings Rate: ${savingsRate}% 
- Top spending categories: ${topCategories} 
- Monthly breakdown (last 3 months): ${monthlyData} 
- Recent transactions: ${last10Transactions} 

Answer the user's financial questions in a friendly, concise, helpful way. 
Give specific advice based on their actual data. 
Use Indian Rupee (₹) formatting. Keep responses under 150 words unless detail is needed.`;
};

export const buildInsightsPrompt = (transactionJSON) => {
  return `Analyze the following 3 months of personal finance transaction data and provide exactly 5 specific, actionable, data-driven insights. Format as a numbered list. Be specific with amounts and percentages. Use ₹ for currency. Data: ${transactionJSON}`;
};

export const buildCategorySuggestionPrompt = (merchantName) => {
  return `Given this merchant or transaction description: '${merchantName}', suggest the most appropriate single category from this exact list only: Food, Transport, Shopping, Entertainment, Health, Salary, Freelance, Utilities, Rent, Education. Reply with only the category name, nothing else.`;
};
