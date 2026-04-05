export const CATEGORIES = [
  'Food', 'Transport', 'Shopping', 'Entertainment', 'Health', 
  'Salary', 'Freelance', 'Utilities', 'Rent', 'Education'
];

export const MOCK_TRANSACTIONS = [
  // Last 6 months (approx Oct 2025 to Mar 2026)
  { id: '1', date: '2026-03-28', amount: 52000, category: 'Salary', type: 'income', merchant: 'TCS', description: 'Monthly salary' },
  { id: '2', date: '2026-03-25', amount: 1500, category: 'Food', type: 'expense', merchant: 'Zomato', description: 'Dinner with friends' },
  { id: '3', date: '2026-03-24', amount: 450, category: 'Transport', type: 'expense', merchant: 'Uber', description: 'Ride to office' },
  { id: '4', date: '2026-03-20', amount: 3200, category: 'Shopping', type: 'expense', merchant: 'Amazon', description: 'New headphones' },
  { id: '5', date: '2026-03-18', amount: 8000, category: 'Freelance', type: 'income', merchant: 'Upwork Client', description: 'Logo design project' },
  { id: '6', date: '2026-03-15', amount: 2500, category: 'Utilities', type: 'expense', merchant: 'Airtel', description: 'Internet bill' },
  { id: '7', date: '2026-03-10', amount: 15000, category: 'Rent', type: 'expense', merchant: 'Landlord', description: 'Monthly rent' },
  { id: '8', date: '2026-03-05', amount: 800, category: 'Entertainment', type: 'expense', merchant: 'Netflix', description: 'Subscription' },
  { id: '9', date: '2026-03-02', amount: 1200, category: 'Health', type: 'expense', merchant: 'Apollo Pharmacy', description: 'Medicines' },
  
  { id: '10', date: '2026-02-28', amount: 52000, category: 'Salary', type: 'income', merchant: 'TCS', description: 'Monthly salary' },
  { id: '11', date: '2026-02-25', amount: 2000, category: 'Food', type: 'expense', merchant: 'Swiggy', description: 'Groceries' },
  { id: '12', date: '2026-02-20', amount: 500, category: 'Transport', type: 'expense', merchant: 'Ola', description: 'Cab ride' },
  { id: '13', date: '2026-02-15', amount: 15000, category: 'Rent', type: 'expense', merchant: 'Landlord', description: 'Monthly rent' },
  { id: '14', date: '2026-02-10', amount: 4500, category: 'Education', type: 'expense', merchant: 'Coursera', description: 'React course' },
  { id: '15', date: '2026-02-05', amount: 12000, category: 'Freelance', type: 'income', merchant: 'Fiverr', description: 'Web development' },
  
  { id: '16', date: '2026-01-28', amount: 50000, category: 'Salary', type: 'income', merchant: 'TCS', description: 'Monthly salary' },
  { id: '17', date: '2026-01-22', amount: 3500, category: 'Shopping', type: 'expense', merchant: 'Myntra', description: 'Clothes' },
  { id: '18', date: '2026-01-15', amount: 15000, category: 'Rent', type: 'expense', merchant: 'Landlord', description: 'Monthly rent' },
  { id: '19', date: '2026-01-10', amount: 2500, category: 'Utilities', type: 'expense', merchant: 'BESCOM', description: 'Electricity bill' },
  { id: '20', date: '2026-01-05', amount: 1200, category: 'Food', type: 'expense', merchant: 'Starbucks', description: 'Coffee' },
  
  { id: '21', date: '2025-12-28', amount: 50000, category: 'Salary', type: 'income', merchant: 'TCS', description: 'Monthly salary' },
  { id: '22', date: '2025-12-24', amount: 5000, category: 'Shopping', type: 'expense', merchant: 'Amazon', description: 'Christmas gifts' },
  { id: '23', date: '2025-12-20', amount: 15000, category: 'Rent', type: 'expense', merchant: 'Landlord', description: 'Monthly rent' },
  { id: '24', date: '2025-12-15', amount: 3000, category: 'Entertainment', type: 'expense', merchant: 'PVR', description: 'Movie & Dinner' },
  { id: '25', date: '2025-12-10', amount: 7000, category: 'Freelance', type: 'income', merchant: 'Local Client', description: 'Consultation' },
  
  { id: '26', date: '2025-11-28', amount: 50000, category: 'Salary', type: 'income', merchant: 'TCS', description: 'Monthly salary' },
  { id: '27', date: '2025-11-22', amount: 1800, category: 'Food', type: 'expense', merchant: 'Blinkit', description: 'Groceries' },
  { id: '28', date: '2025-11-15', amount: 15000, category: 'Rent', type: 'expense', merchant: 'Landlord', description: 'Monthly rent' },
  { id: '29', date: '2025-11-10', amount: 2500, category: 'Health', type: 'expense', merchant: 'MedPlus', description: 'Health checkup' },
  { id: '30', date: '2025-11-05', amount: 1000, category: 'Transport', type: 'expense', merchant: 'Uber', description: 'Airport ride' },
  
  { id: '31', date: '2025-10-28', amount: 48000, category: 'Salary', type: 'income', merchant: 'TCS', description: 'Monthly salary' },
  { id: '32', date: '2025-10-22', amount: 4000, category: 'Shopping', type: 'expense', merchant: 'Flipkart', description: 'Festival sale' },
  { id: '33', date: '2025-10-15', amount: 14000, category: 'Rent', type: 'expense', merchant: 'Landlord', description: 'Monthly rent' },
  { id: '34', date: '2025-10-10', amount: 2000, category: 'Utilities', type: 'expense', merchant: 'BWSSB', description: 'Water bill' },
  { id: '35', date: '2025-10-05', amount: 5000, category: 'Freelance', type: 'income', merchant: 'Fiverr', description: 'Bug fix' },
  
  // Extra transactions to reach 40+
  { id: '36', date: '2026-03-27', amount: 1200, category: 'Food', type: 'expense', merchant: 'KFC', description: 'Lunch' },
  { id: '37', date: '2026-02-18', amount: 3500, category: 'Shopping', type: 'expense', merchant: 'H&M', description: 'Shirt' },
  { id: '38', date: '2026-01-12', amount: 600, category: 'Entertainment', type: 'expense', merchant: 'Spotify', description: 'Subscription' },
  { id: '39', date: '2025-12-05', amount: 250, category: 'Transport', type: 'expense', merchant: 'Namma Metro', description: 'Metro recharge' },
  { id: '40', date: '2025-11-12', amount: 1500, category: 'Health', type: 'expense', merchant: 'Cult.fit', description: 'Gym membership' },
  { id: '41', date: '2025-10-08', amount: 900, category: 'Food', type: 'expense', merchant: 'Pizza Hut', description: 'Dinner' },
  { id: '42', date: '2026-03-12', amount: 4500, category: 'Education', type: 'expense', merchant: 'Udemy', description: 'Fullstack course' },
];
