export const initialSettings = {
  profile: {
    name: "Alex Morgan",
    email: "alex.morgan@example.com",
    phone: "+91 98765 43210",
  },
  preferences: {
    currency: "INR",
    dateFormat: "DD/MM/YYYY",
    startOfWeek: "Monday",
    theme: localStorage.getItem("theme") || "dark",
  },
  notifications: {
    budgetAlerts: true,
    weeklySummary: true,
    transactionUpdates: false,
    productUpdates: false,
  },
};

export const currencyOptions = [
  { value: "INR", label: "Indian Rupee (₹)" },
  { value: "USD", label: "US Dollar ($)" },
  { value: "EUR", label: "Euro (€)" },
  { value: "GBP", label: "British Pound (£)" },
  { value: "AED", label: "UAE Dirham (د.إ)" },
];
