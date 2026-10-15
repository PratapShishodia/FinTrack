import {
  ArrowDownRight,
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  CalendarDays,
  Laptop,
  Receipt,
  ShoppingCart,
  Wallet,
  Wifi,
  Zap,
} from "lucide-react";

import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import SummaryCard from "../components/common/SummaryCard";

import {
  dashboardSummary,
  financialOverview,
  recentTransactions,
  recentExpenses,
  recentIncome,
} from "../data/dashboardData";

const iconMap = {
  briefcase: BriefcaseBusiness,
  "shopping-cart": ShoppingCart,
  laptop: Laptop,
  zap: Zap,
  wifi: Wifi,
};

function formatCurrency(value) {
  return `₹${Number(value).toLocaleString("en-IN")}`;
}

function formatDate(date) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function SectionHeader({ title, subtitle, action }) {
  return (
    <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
      <div>
        <h2 className="text-lg font-bold text-gray-900 dark:text-white">
          {title}
        </h2>

        {subtitle && (
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {subtitle}
          </p>
        )}
      </div>

      {action}
    </div>
  );
}

function TransactionItem({ transaction }) {
  const Icon = iconMap[transaction.icon] || Receipt;
  const isIncome = transaction.type === "income";

  return (
    <div className="flex items-center gap-3 py-4">
      <div
        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
          isIncome
            ? "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400"
            : "bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400"
        }`}
      >
        <Icon size={20} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
          {transaction.title}
        </p>

        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {transaction.category} · {formatDate(transaction.date)}
        </p>
      </div>

      <p
        className={`shrink-0 text-sm font-bold ${
          isIncome
            ? "text-green-600 dark:text-green-400"
            : "text-red-600 dark:text-red-400"
        }`}
      >
        {isIncome ? "+" : "-"}
        {formatCurrency(transaction.amount)}
      </p>
    </div>
  );
}

function CompactTransaction({ transaction, type }) {
  const isIncome = type === "income";

  return (
    <div className="flex items-center justify-between gap-3 border-b border-gray-100 py-4 last:border-0 dark:border-white/10">
      <div className="min-w-0">
        <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
          {transaction.title}
        </p>

        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          {transaction.category} · {formatDate(transaction.date)}
        </p>
      </div>

      <p
        className={`shrink-0 text-sm font-bold ${
          isIncome
            ? "text-green-600 dark:text-green-400"
            : "text-red-600 dark:text-red-400"
        }`}
      >
        {isIncome ? "+" : "-"}
        {formatCurrency(transaction.amount)}
      </p>
    </div>
  );
}

function Dashboard() {
  return (
    <div className="space-y-7">
      {/* Page heading */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Here's what's happening with your finances.
          </p>
        </div>

        <div className="flex w-fit items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm text-gray-600 dark:border-white/10 dark:bg-[#17141C] dark:text-gray-300">
          <CalendarDays size={17} className="text-[#8211FA]" />
          October 2026
        </div>
      </section>

      {/* Financial summary */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <SummaryCard
          title="Total Balance"
          amount={dashboardSummary.totalBalance}
          change={dashboardSummary.balanceChange}
          description="vs. last month"
          icon={Wallet}
          variant="purple"
        />

        <SummaryCard
          title="Total Income"
          amount={dashboardSummary.totalIncome}
          change={dashboardSummary.incomeChange}
          description="vs. last month"
          icon={ArrowUpRight}
          variant="green"
        />

        <SummaryCard
          title="Total Expense"
          amount={dashboardSummary.totalExpense}
          change={dashboardSummary.expenseChange}
          description="vs. last month"
          icon={ArrowDownRight}
          variant="red"
        />
      </section>

      {/* Financial chart */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-[#17141C]">
        <SectionHeader
          title="Financial Overview"
          subtitle="Track your income and expenses over time."
          action={
            <span className="rounded-lg bg-purple-50 px-3 py-2 text-xs font-semibold text-[#8211FA] dark:bg-purple-950">
              Last 8 months
            </span>
          }
        />

        <div className="h-[300px] w-full sm:h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={financialOverview}
              margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
            >
              <CartesianGrid
                strokeDasharray="4 4"
                vertical={false}
                stroke="#E5E7EB"
              />

              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                dy={10}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#9CA3AF", fontSize: 12 }}
                tickFormatter={(value) =>
                  value >= 1000 ? `${value / 1000}k` : value
                }
                width={45}
              />

              <Tooltip
                formatter={(value, name) => [
                  formatCurrency(value),
                  name === "income" ? "Income" : "Expense",
                ]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #E5E7EB",
                  fontSize: "12px",
                }}
              />

              <Legend
                verticalAlign="top"
                align="right"
                iconType="circle"
                wrapperStyle={{ fontSize: "12px", paddingBottom: "20px" }}
              />

              <Line
                type="monotone"
                dataKey="income"
                name="Income"
                stroke="#8211FA"
                strokeWidth={3}
                dot={{ r: 3, fill: "#8211FA" }}
                activeDot={{ r: 6 }}
              />

              <Line
                type="monotone"
                dataKey="expense"
                name="Expense"
                stroke="#F97373"
                strokeWidth={3}
                dot={{ r: 3, fill: "#F97373" }}
                activeDot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Transactions */}
      <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
        <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-[#17141C]">
          <SectionHeader
            title="Recent Transactions"
            subtitle="Your latest financial activity."
            action={
              <button
                type="button"
                className="flex items-center gap-1 text-sm font-semibold text-[#8211FA] hover:text-purple-700"
              >
                View all <ArrowRight size={16} />
              </button>
            }
          />

          <div className="divide-y divide-gray-100 dark:divide-white/10">
            {recentTransactions.map((transaction) => (
              <TransactionItem key={transaction.id} transaction={transaction} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-[#17141C]">
            <SectionHeader
              title="Recent Expenses"
              subtitle="Your latest spending."
            />

            {recentExpenses.map((transaction) => (
              <CompactTransaction
                key={transaction.id}
                transaction={transaction}
                type="expense"
              />
            ))}
          </div>

          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-[#17141C]">
            <SectionHeader
              title="Recent Income"
              subtitle="Your latest earnings."
            />

            {recentIncome.map((transaction) => (
              <CompactTransaction
                key={transaction.id}
                transaction={transaction}
                type="income"
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
