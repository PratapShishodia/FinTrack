import { initialIncomeTransactions } from "./incomeData";
import { initialExpenseTransactions } from "./expenseData";

export const initialTransactions = [
  ...initialIncomeTransactions.map((transaction) => ({
    ...transaction,
    type: "Income",
  })),

  ...initialExpenseTransactions.map((transaction) => ({
    ...transaction,
    type: "Expense",
  })),
].sort((a, b) => new Date(b.date) - new Date(a.date));

export const transactionCategories = [
  "Salary",
  "Freelance",
  "Investments",
  "Food & Dining",
  "Transportation",
  "Bills & Utilities",
  "Shopping",
  "Healthcare",
];
