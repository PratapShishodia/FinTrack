import { useMemo, useState } from "react";
import {
  ArrowDownRight,
  CalendarDays,
  Check,
  ChevronDown,
  Car,
  Coffee,
  Download,
  Plus,
  Search,
  ShoppingBag,
  Trash2,
  Utensils,
  Wallet,
  X,
  Zap,
  AlertTriangle,
  Receipt,
} from "lucide-react";

import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import {
  expenseOverview,
  initialExpenseSources,
  initialExpenseTransactions,
} from "../data/expenseData";

const iconMap = {
  utensils: Utensils,
  car: Car,
  zap: Zap,
  "shopping-bag": ShoppingBag,
  coffee: Coffee,
  wallet: Wallet,
};

const emptyForm = {
  title: "",
  category: "Food & Dining",
  amount: "",
  date: new Date().toISOString().slice(0, 10),
  description: "",
};

const formatCurrency = (amount) => `₹${Number(amount).toLocaleString("en-IN")}`;

const formatDate = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

function Expense() {
  const [transactions, setTransactions] = useState(initialExpenseTransactions);

  const [sources, setSources] = useState(initialExpenseSources);
  const [modalOpen, setModalOpen] = useState(false);
  const [deletingTransaction, setDeletingTransaction] = useState(null);
  const [search, setSearch] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  const [toast, setToast] = useState("");
  const [form, setForm] = useState(emptyForm);

  const totalExpense = transactions.reduce(
    (total, transaction) => total + Number(transaction.amount),
    0,
  );

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((transaction) => {
        const searchText = search.toLowerCase();

        const matchesSearch =
          transaction.title.toLowerCase().includes(searchText) ||
          transaction.category.toLowerCase().includes(searchText) ||
          transaction.description.toLowerCase().includes(searchText);

        const transactionDate = new Date(`${transaction.date}T00:00:00`);

        const now = new Date();
        let matchesDate = true;

        if (dateFilter === "month") {
          matchesDate =
            transactionDate.getMonth() === now.getMonth() &&
            transactionDate.getFullYear() === now.getFullYear();
        }

        if (dateFilter === "year") {
          matchesDate = transactionDate.getFullYear() === now.getFullYear();
        }

        return matchesSearch && matchesDate;
      })
      .sort((a, b) => b.date.localeCompare(a.date));
  }, [transactions, search, dateFilter]);

  const showToast = (message) => {
    setToast(message);

    window.setTimeout(() => {
      setToast("");
    }, 2500);
  };

  const handleAddExpense = (event) => {
    event.preventDefault();

    const amount = Number(form.amount);

    if (
      !form.title.trim() ||
      !Number.isFinite(amount) ||
      amount <= 0 ||
      !form.date
    ) {
      showToast("Please enter valid expense details.");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      ...form,
      title: form.title.trim(),
      amount,
      description: form.description.trim(),
    };

    setTransactions((previous) => [newTransaction, ...previous]);

    setSources((previous) => {
      const existing = previous.find((source) => source.name === form.category);

      if (existing) {
        return previous.map((source) =>
          source.name === form.category
            ? {
                ...source,
                total: source.total + amount,
                transactions: source.transactions + 1,
              }
            : source,
        );
      }

      return [
        ...previous,
        {
          id: Date.now(),
          name: form.category,
          icon: "wallet",
          color: "#8211FA",
          total: amount,
          transactions: 1,
        },
      ];
    });

    setForm(emptyForm);
    setModalOpen(false);

    showToast("Expense added successfully.");
  };

  // Delete an expense after confirmation.
  const handleDeleteExpense = () => {
    if (!deletingTransaction) return;

    const deletedTransaction = deletingTransaction;

    setTransactions((previous) =>
      previous.filter(
        (transaction) => transaction.id !== deletedTransaction.id,
      ),
    );

    // Update the associated expense category totals.
    setSources((previous) =>
      previous
        .map((source) => {
          if (source.name !== deletedTransaction.category) {
            return source;
          }

          return {
            ...source,
            total: Math.max(
              0,
              source.total - Number(deletedTransaction.amount),
            ),
            transactions: Math.max(0, source.transactions - 1),
          };
        })
        .filter((source) => source.transactions > 0),
    );

    setDeletingTransaction(null);

    showToast("Expense deleted successfully.");
  };

  const exportCSV = () => {
    const headers = ["Title", "Category", "Amount", "Date", "Description"];

    const rows = filteredTransactions.map((transaction) => [
      transaction.title,
      transaction.category,
      transaction.amount,
      transaction.date,
      transaction.description,
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row
          .map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`)
          .join(","),
      )
      .join("\n");

    const blob = new Blob(["\uFEFF" + csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = "expense-transactions.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-7">
      {/* Page header */}
      <section className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            Expenses
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Track your spending and manage your expenses.
          </p>
        </div>

        <button
          onClick={() => {
            setForm(emptyForm);
            setModalOpen(true);
          }}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#8211FA] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:bg-purple-700"
        >
          <Plus size={19} />
          Add Expense
        </button>
      </section>

      {/* Summary cards */}
      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <SummaryCard
          title="Total Expenses"
          amount={formatCurrency(totalExpense)}
          icon={Wallet}
          iconColor="text-red-600 dark:text-red-400"
          iconBg="bg-red-100 dark:bg-red-950"
          subtitle="Across all expense records"
        />

        <SummaryCard
          title="Expense Categories"
          amount={sources.length}
          icon={Receipt}
          iconColor="text-[#8211FA]"
          iconBg="bg-purple-100 dark:bg-purple-950"
          subtitle="Active expense categories"
        />

        <SummaryCard
          title="Transactions"
          amount={transactions.length}
          icon={ArrowDownRight}
          iconColor="text-orange-600 dark:text-orange-400"
          iconBg="bg-orange-100 dark:bg-orange-950"
          subtitle="Recorded expense entries"
        />
      </section>

      {/* Expense overview chart */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-[#17141C]">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Expense Overview
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Monitor your monthly spending trends.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start rounded-xl bg-purple-50 px-3 py-2 text-sm font-medium text-[#8211FA] dark:bg-purple-950">
            <CalendarDays size={17} />
            2026
            <ChevronDown size={15} />
          </div>
        </div>

        <div className="h-[300px] w-full sm:h-[340px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={expenseOverview}
              margin={{ top: 10, right: 12, left: 0, bottom: 0 }}
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
                formatter={(value) => [formatCurrency(value), "Expense"]}
                contentStyle={{
                  borderRadius: "12px",
                  border: "1px solid #E5E7EB",
                  fontSize: "12px",
                }}
              />

              <Line
                type="monotone"
                dataKey="expense"
                name="Expense"
                stroke="#F97373"
                strokeWidth={3}
                dot={{ r: 4, fill: "#F97373" }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Expense categories */}
      <section>
        <div className="mb-5">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            Expense Categories
          </h2>

          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            See how your spending is distributed.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-4">
          {sources.map((source) => {
            const Icon = iconMap[source.icon] || Wallet;

            return (
              <article
                key={source.id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-white/10 dark:bg-[#17141C]"
              >
                <div className="flex items-center justify-between">
                  <div
                    className="flex h-12 w-12 items-center justify-center rounded-xl"
                    style={{
                      color: source.color,
                      backgroundColor: `${source.color}18`,
                    }}
                  >
                    <Icon size={23} />
                  </div>

                  <span className="rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 dark:bg-red-950 dark:text-red-400">
                    Expense
                  </span>
                </div>

                <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">
                  {source.name}
                </h3>

                <p className="mt-2 text-2xl font-bold text-gray-900 dark:text-white">
                  {formatCurrency(source.total)}
                </p>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  {source.transactions} transactions
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* Expense transactions */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-[#17141C]">
        <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Expense Transactions
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Review, search, and manage your spending.
            </p>
          </div>

          <button
            onClick={exportCSV}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5"
          >
            <Download size={17} />
            Export CSV
          </button>
        </div>

        {/* Search and filters */}
        <div className="mt-5 flex flex-col gap-3 md:flex-row">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search expenses..."
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none focus:border-[#8211FA] focus:ring-4 focus:ring-purple-100 dark:border-white/10 dark:bg-[#211C29] dark:text-white dark:focus:ring-purple-950"
            />
          </div>

          <select
            value={dateFilter}
            onChange={(event) => setDateFilter(event.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-[#8211FA] dark:border-white/10 dark:bg-[#211C29] dark:text-gray-200"
          >
            <option value="all">All dates</option>
            <option value="month">This month</option>
            <option value="year">This year</option>
          </select>
        </div>

        {/* Table */}
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[760px] text-left">
            <thead>
              <tr className="border-b border-gray-100 text-xs uppercase tracking-wider text-gray-400 dark:border-white/10">
                <th className="px-3 py-4 font-semibold">Expense</th>
                <th className="px-3 py-4 font-semibold">Category</th>
                <th className="px-3 py-4 font-semibold">Date</th>
                <th className="px-3 py-4 text-right font-semibold">Amount</th>
                <th className="px-3 py-4 text-center font-semibold">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100 dark:divide-white/10">
              {filteredTransactions.map((transaction) => (
                <tr
                  key={transaction.id}
                  className="transition hover:bg-purple-50/50 dark:hover:bg-purple-950/20"
                >
                  <td className="px-3 py-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950 dark:text-red-400">
                        <ArrowDownRight size={20} />
                      </div>

                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">
                          {transaction.title}
                        </p>

                        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                          {transaction.description || "Expense recorded"}
                        </p>
                      </div>
                    </div>
                  </td>

                  <td className="px-3 py-4">
                    <span className="rounded-lg bg-purple-50 px-3 py-1.5 text-xs font-semibold text-[#8211FA] dark:bg-purple-950">
                      {transaction.category}
                    </span>
                  </td>

                  <td className="px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(transaction.date)}
                  </td>

                  <td className="px-3 py-4 text-right text-sm font-bold text-red-600 dark:text-red-400">
                    -{formatCurrency(transaction.amount)}
                  </td>

                  {/* Delete button */}
                  <td className="px-3 py-4 text-center">
                    <button
                      onClick={() => setDeletingTransaction(transaction)}
                      aria-label={`Delete ${transaction.title}`}
                      title="Delete expense"
                      className="inline-flex items-center justify-center rounded-xl border border-red-100 p-2.5 text-red-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-700 dark:border-red-900/50 dark:hover:bg-red-950/40"
                    >
                      <Trash2 size={17} />
                    </button>
                  </td>
                </tr>
              ))}

              {filteredTransactions.length === 0 && (
                <tr>
                  <td colSpan={5} className="px-3 py-12 text-center">
                    <p className="font-semibold text-gray-900 dark:text-white">
                      No expense records found
                    </p>

                    <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                      Try changing your search or date filter.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-4 border-t border-gray-100 pt-4 text-sm text-gray-500 dark:border-white/10 dark:text-gray-400">
          Showing {filteredTransactions.length} of {transactions.length} records
        </div>
      </section>

      {/* Add expense modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setModalOpen(false);
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="expense-modal-title"
            className="my-auto w-full max-w-lg rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#1B1721]"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5 sm:px-6 dark:border-white/10">
              <div>
                <h2
                  id="expense-modal-title"
                  className="text-xl font-bold text-gray-900 dark:text-white"
                >
                  Add Expense
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Record a new expense.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setModalOpen(false)}
                aria-label="Close modal"
                className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleAddExpense}>
              <div className="max-h-[65vh] space-y-5 overflow-y-auto px-5 py-5 sm:px-6">
                <div>
                  <label
                    htmlFor="expense-title"
                    className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Expense Title *
                  </label>

                  <input
                    id="expense-title"
                    required
                    maxLength={100}
                    value={form.title}
                    onChange={(event) =>
                      setForm({ ...form, title: event.target.value })
                    }
                    placeholder="e.g. Grocery Shopping"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#8211FA] focus:ring-4 focus:ring-purple-100 dark:border-white/10 dark:bg-[#211C29] dark:text-white dark:focus:ring-purple-950"
                  />
                </div>

                <div>
                  <label
                    htmlFor="expense-category"
                    className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Expense Category *
                  </label>

                  <select
                    id="expense-category"
                    value={form.category}
                    onChange={(event) =>
                      setForm({ ...form, category: event.target.value })
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#8211FA] dark:border-white/10 dark:bg-[#211C29] dark:text-white"
                  >
                    {sources.map((source) => (
                      <option key={source.id} value={source.name}>
                        {source.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="expense-amount"
                    className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Amount (₹) *
                  </label>

                  <input
                    id="expense-amount"
                    type="number"
                    min="0.01"
                    step="0.01"
                    required
                    value={form.amount}
                    onChange={(event) =>
                      setForm({ ...form, amount: event.target.value })
                    }
                    placeholder="Enter amount"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#8211FA] focus:ring-4 focus:ring-purple-100 dark:border-white/10 dark:bg-[#211C29] dark:text-white dark:focus:ring-purple-950"
                  />
                </div>

                <div>
                  <label
                    htmlFor="expense-date"
                    className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Date *
                  </label>

                  <input
                    id="expense-date"
                    type="date"
                    required
                    value={form.date}
                    onChange={(event) =>
                      setForm({ ...form, date: event.target.value })
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#8211FA] dark:border-white/10 dark:bg-[#211C29] dark:text-white"
                  />
                </div>

                <div>
                  <label
                    htmlFor="expense-description"
                    className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Description
                  </label>

                  <textarea
                    id="expense-description"
                    rows={3}
                    maxLength={200}
                    value={form.description}
                    onChange={(event) =>
                      setForm({ ...form, description: event.target.value })
                    }
                    placeholder="Add additional details..."
                    className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none focus:border-[#8211FA] dark:border-white/10 dark:bg-[#211C29] dark:text-white"
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:justify-end sm:px-6 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#8211FA] px-5 py-3 text-sm font-semibold text-white hover:bg-purple-700"
                >
                  <Plus size={17} />
                  Save Expense
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation modal */}
      {deletingTransaction && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-expense-title"
            className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#1B1721]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950">
              <AlertTriangle size={23} />
            </div>

            <h2
              id="delete-expense-title"
              className="mt-4 text-xl font-bold text-gray-900 dark:text-white"
            >
              Delete Expense?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Are you sure you want to delete{" "}
              <strong className="text-gray-900 dark:text-white">
                {deletingTransaction.title}
              </strong>{" "}
              worth{" "}
              <strong className="text-gray-900 dark:text-white">
                {formatCurrency(deletingTransaction.amount)}
              </strong>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                type="button"
                onClick={() => setDeletingTransaction(null)}
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleDeleteExpense}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700"
              >
                <Trash2 size={17} />
                Delete Expense
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-[100] flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-xl dark:border-white/10 dark:bg-[#211C29]"
        >
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400">
            <Check size={18} />
          </div>

          <p className="text-sm font-medium text-gray-800 dark:text-gray-100">
            {toast}
          </p>
        </div>
      )}
    </div>
  );
}

function SummaryCard({
  title,
  amount,
  icon: Icon,
  iconColor,
  iconBg,
  subtitle,
}) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6 dark:border-white/10 dark:bg-[#17141C]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>

          <p className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            {amount}
          </p>
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}
        >
          <Icon size={23} />
        </div>
      </div>

      <p className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        {subtitle}
      </p>
    </div>
  );
}

export default Expense;
