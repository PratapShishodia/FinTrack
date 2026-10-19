export const incomeOverview = [
  { month: "Jan", income: 42000 },
  { month: "Feb", income: 48000 },
  { month: "Mar", income: 39000 },
  { month: "Apr", income: 55000 },
  { month: "May", income: 51000 },
  { month: "Jun", income: 65000 },
  { month: "Jul", income: 58000 },
  { month: "Aug", income: 72000 },
  { month: "Sep", income: 68000 },
  { month: "Oct", income: 85000 },
];

export const initialIncomeSources = [
  {
    id: 1,
    name: "Salary",
    icon: "briefcase",
    color: "#8211FA",
    total: 65000,
    transactions: 1,
  },
  {
    id: 2,
    name: "Freelance",
    icon: "laptop",
    color: "#0891B2",
    total: 12000,
    transactions: 2,
  },
  {
    id: 3,
    name: "Investments",
    icon: "trending-up",
    color: "#16A34A",
    total: 8000,
    transactions: 1,
  },
];

export const initialIncomeTransactions = [
  {
    id: 101,
    title: "October Salary",
    category: "Salary",
    amount: 65000,
    date: "2026-10-05",
    description: "Monthly salary",
  },
  {
    id: 102,
    title: "Website Development",
    category: "Freelance",
    amount: 8000,
    date: "2026-10-08",
    description: "Client project payment",
  },
  {
    id: 103,
    title: "Investment Return",
    category: "Investments",
    amount: 8000,
    date: "2026-10-12",
    description: "Monthly investment return",
  },
  {
    id: 104,
    title: "Design Consultation",
    category: "Freelance",
    amount: 4000,
    date: "2026-10-14",
    description: "Consulting payment",
  },
];
