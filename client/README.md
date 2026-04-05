# FinanceIQ — Personal Finance Dashboard

A modern, full-featured personal finance dashboard built with React 18, Vite, and Tailwind CSS. Track your income, expenses, and savings with interactive charts, smart filtering, and role-based access.

---

## Features

- **Dashboard Overview**: Real-time summary of balance, income, expenses, and savings rate with trend analysis.
- **Interactive Charts**: Responsive charts for balance trends, spending breakdowns, and monthly comparisons via Recharts.
- **Transaction Management**: Full-featured transaction table with advanced filtering (search, type, category, date range), sorting, and pagination.
- **Role-Based Access Control**:
  - **Admin** — Full access to add, edit, and delete transactions.
  - **Viewer** — Read-only access to all dashboards and data.
- **Finance Assistant**: A floating chat widget that understands your financial data and answers questions about your spending, trends, and budget.
- **Insights**: One-click analysis of your last 3 months of data, surfacing 5 actionable, data-driven observations.
- **Auto Category Suggestion**: Categories are suggested automatically based on merchant names when entering transactions.
- **Dark Mode**: Fully persistent dark mode with a clean slate-based color palette.
- **Data Export**: Export filtered transactions to CSV or JSON in one click.
- **Local Persistence**: All data and preferences are saved in browser localStorage via Zustand.

---

## Tech Stack

| Layer | Library |
|---|---|
| Frontend | React 18, Vite |
| Styling | Tailwind CSS 4.0 |
| State | Zustand (with Persist middleware) |
| Routing | React Router DOM 7 |
| Charts | Recharts |
| Icons | Lucide React |
| Dates | date-fns |
| Assistant | Groq SDK — llama-3.3-70b-versatile |

---

## Getting Started

### Prerequisites

- Node.js v18 or higher
- A Groq API key — get one free at [console.groq.com](https://console.groq.com)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd finance-dashboard
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory:
   ```env
   VITE_GROQ_API_KEY=your_groq_api_key_here
   ```

4. Start the dev server:
   ```bash
   npm run dev
   ```

---

## Folder Structure

```
src/
├── components/
│   ├── layout/         # Sidebar, Topbar, Layout
│   ├── dashboard/      # SummaryCards, Charts, Recent Activity
│   ├── transactions/   # Table, Filters, Modals
│   ├── insights/       # Insights Card, Static Panels
│   ├── assistant/      # Chat Widget, Groq Hook
│   └── ui/             # Reusable UI primitives (Card, Badge, etc.)
├── store/              # Zustand state management
├── data/               # Mock data and constants
├── utils/              # Formatters, Export logic, Helpers
├── pages/              # Dashboard, Transactions, Insights
├── App.jsx             # Routing and Layout wrapper
└── main.tsx            # Entry point
```

---

## Roles


- **Admin** — Can add, edit, and delete transactions.
- **Viewer** — Read-only access across all views.

---

## Planned Improvements

- Support for multiple bank accounts and wallets
- Budget goal setting and progress tracking
- Receipt upload with automatic category parsing
- PDF report export
- Integration with real bank APIs (Plaid / Salt Edge)

---

## License

MIT