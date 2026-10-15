import { useMemo, useState } from "react";
import {
  ArrowDownUp,
  ArrowDownLeft,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronDown,
  Download,
  Filter,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Wallet,
  X,
} from "lucide-react";
import {
  initialTransactions,
  transactionCategories,
} from "../data/transactionData";

const formatCurrency = (amount) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const formatDate = (date) =>
  new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const inputClass =
  "mt-2 w-full rounded-xl border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-[#8211FA] focus:ring-2 focus:ring-purple-100 dark:border-white/10 dark:bg-[#1b1920] dark:text-gray-200 dark:focus:ring-purple-900/40";

const initialFilters = {
  search: "",
  type: "All",
  category: "All",
  startDate: "",
  endDate: "",
  minAmount: "",
  maxAmount: "",
  sort: "newest",
};

function Filters() {
  const [transactions, setTransactions] = useState(initialTransactions);
  const [filters, setFilters] = useState(initialFilters);
  const [showFilters, setShowFilters] = useState(true);
  const [selectedTransaction, setSelectedTransaction] = useState(null);
  const [toast, setToast] = useState("");

  const updateFilter = (key, value) => {
    setFilters((previous) => ({ ...previous, [key]: value }));
  };

  const resetFilters = () => setFilters(initialFilters);

  const filteredTransactions = useMemo(() => {
    const result = transactions.filter((transaction) => {
      const searchTerm = filters.search.toLowerCase().trim();

      const matchesSearch =
        !searchTerm ||
        transaction.title.toLowerCase().includes(searchTerm) ||
        transaction.category.toLowerCase().includes(searchTerm) ||
        (transaction.description || "").toLowerCase().includes(searchTerm);

      const matchesType =
        filters.type === "All" || transaction.type === filters.type;

      const matchesCategory =
        filters.category === "All" || transaction.category === filters.category;

      const matchesStartDate =
        !filters.startDate || transaction.date >= filters.startDate;

      const matchesEndDate =
        !filters.endDate || transaction.date <= filters.endDate;

      const matchesMinAmount =
        filters.minAmount === "" ||
        transaction.amount >= Number(filters.minAmount);

      const matchesMaxAmount =
        filters.maxAmount === "" ||
        transaction.amount <= Number(filters.maxAmount);

      return (
        matchesSearch &&
        matchesType &&
        matchesCategory &&
        matchesStartDate &&
        matchesEndDate &&
        matchesMinAmount &&
        matchesMaxAmount
      );
    });

    return result.sort((a, b) => {
      switch (filters.sort) {
        case "oldest":
          return new Date(a.date) - new Date(b.date);
        case "highest":
          return b.amount - a.amount;
        case "lowest":
          return a.amount - b.amount;
        default:
          return new Date(b.date) - new Date(a.date);
      }
    });
  }, [transactions, filters]);

  const totalIncome = filteredTransactions
    .filter((item) => item.type === "Income")
    .reduce((sum, item) => sum + item.amount, 0);

  const totalExpense = filteredTransactions
    .filter((item) => item.type === "Expense")
    .reduce((sum, item) => sum + item.amount, 0);

  const activeFilterCount = [
    filters.type !== "All",
    filters.category !== "All",
    Boolean(filters.startDate),
    Boolean(filters.endDate),
    filters.minAmount !== "",
    filters.maxAmount !== "",
  ].filter(Boolean).length;

  const exportCSV = () => {
    const headers = [
      "Title",
      "Type",
      "Category",
      "Amount",
      "Date",
      "Description",
    ];

    const rows = filteredTransactions.map((transaction) => [
      transaction.title,
      transaction.type,
      transaction.category,
      transaction.amount,
      transaction.date,
      transaction.description || "",
    ]);

    const csv = [headers, ...rows]
      .map((row) =>
        row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(","),
      )
      .join("\n");

    const blob = new Blob([csv], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "filtered-transactions.csv";
    link.click();
    URL.revokeObjectURL(url);

    setToast("Transactions exported successfully");
    setTimeout(() => setToast(""), 2500);
  };

  const deleteTransaction = () => {
    setTransactions((previous) =>
      previous.filter((item) => item.id !== selectedTransaction.id),
    );
    setSelectedTransaction(null);
    setToast("Transaction deleted");
    setTimeout(() => setToast(""), 2500);
  };

  const summaryCards = [
    {
      label: "Matching transactions",
      value: filteredTransactions.length.toString(),
      helper: "Transactions found",
      icon: Wallet,
      iconClass:
        "bg-purple-100 text-[#8211FA] dark:bg-purple-500/15 dark:text-purple-300",
    },
    {
      label: "Total income",
      value: formatCurrency(totalIncome),
      helper: "For current filters",
      icon: ArrowDownLeft,
      iconClass:
        "bg-green-100 text-green-700 dark:bg-green-500/15 dark:text-green-400",
    },
    {
      label: "Total expenses",
      value: formatCurrency(totalExpense),
      helper: "For current filters",
      icon: ArrowUpRight,
      iconClass: "bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400",
    },
    {
      label: "Net amount",
      value: formatCurrency(totalIncome - totalExpense),
      helper: "Income minus expenses",
      icon: ArrowDownUp,
      iconClass:
        "bg-blue-100 text-blue-700 dark:bg-blue-500/15 dark:text-blue-400",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50/70 px-4 py-6 text-gray-900 dark:bg-[#111014] dark:text-gray-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1600px] space-y-6">
        {/* Page heading */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
              <span>Money Manager</span>
              <span>/</span>
              <span className="text-[#8211FA]">Filters</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Filter Transactions
            </h1>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Find and analyze your transactions with custom filters.
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={resetFilters}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold transition hover:bg-gray-50 dark:border-white/10 dark:bg-[#1b1920] dark:hover:bg-white/5"
            >
              <RotateCcw size={16} />
              Reset filters
            </button>

            <button
              onClick={exportCSV}
              disabled={filteredTransactions.length === 0}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#8211FA] px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:bg-[#6D0BD4]"
            >
              <Download size={16} />
              Export CSV
            </button>
          </div>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {summaryCards.map((card) => {
            const Icon = card.icon;

            return (
              <div
                key={card.label}
                className="rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#19171d]"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {card.label}
                    </p>
                    <p className="mt-3 break-words text-2xl font-bold tracking-tight">
                      {card.value}
                    </p>
                    <p className="mt-2 text-xs text-gray-400">{card.helper}</p>
                  </div>

                  <div className={`rounded-xl p-3 ${card.iconClass}`}>
                    <Icon size={21} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Filter panel */}
        <section className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm dark:border-white/10 dark:bg-[#19171d]">
          <div className="flex flex-col gap-4 border-b border-gray-100 p-5 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-purple-100 p-2.5 text-[#8211FA] dark:bg-purple-500/15 dark:text-purple-300">
                <SlidersHorizontal size={20} />
              </div>

              <div>
                <h2 className="font-semibold">Advanced filters</h2>
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Narrow down the transactions you want to see.
                </p>
              </div>

              {activeFilterCount > 0 && (
                <span className="rounded-full bg-purple-100 px-2.5 py-1 text-xs font-semibold text-[#8211FA] dark:bg-purple-500/15 dark:text-purple-300">
                  {activeFilterCount} active
                </span>
              )}
            </div>

            <button
              onClick={() => setShowFilters((previous) => !previous)}
              className="inline-flex items-center justify-center gap-2 self-start rounded-lg px-3 py-2 text-sm font-semibold text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5 sm:self-auto"
            >
              <Filter size={16} />
              {showFilters ? "Hide filters" : "Show filters"}
              <ChevronDown
                size={16}
                className={`transition-transform ${showFilters ? "rotate-180" : ""}`}
              />
            </button>
          </div>

          {showFilters && (
            <div className="space-y-5 p-5">
              <div className="relative">
                <Search
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="text"
                  value={filters.search}
                  onChange={(event) =>
                    updateFilter("search", event.target.value)
                  }
                  placeholder="Search by title, category, or description..."
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-10 text-sm outline-none transition focus:border-[#8211FA] focus:bg-white focus:ring-2 focus:ring-purple-100 dark:border-white/10 dark:bg-[#151319] dark:focus:bg-[#1b1920] dark:focus:ring-purple-900/40"
                />

                {filters.search && (
                  <button
                    onClick={() => updateFilter("search", "")}
                    className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-1 text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10"
                    aria-label="Clear search"
                  >
                    <X size={16} />
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <label className="text-sm font-medium">
                  Transaction type
                  <select
                    value={filters.type}
                    onChange={(event) =>
                      updateFilter("type", event.target.value)
                    }
                    className={inputClass}
                  >
                    <option>All</option>
                    <option>Income</option>
                    <option>Expense</option>
                  </select>
                </label>

                <label className="text-sm font-medium">
                  Category
                  <select
                    value={filters.category}
                    onChange={(event) =>
                      updateFilter("category", event.target.value)
                    }
                    className={inputClass}
                  >
                    <option value="All">All categories</option>
                    {transactionCategories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="text-sm font-medium">
                  Sort by
                  <select
                    value={filters.sort}
                    onChange={(event) =>
                      updateFilter("sort", event.target.value)
                    }
                    className={inputClass}
                  >
                    <option value="newest">Newest first</option>
                    <option value="oldest">Oldest first</option>
                    <option value="highest">Highest amount</option>
                    <option value="lowest">Lowest amount</option>
                  </select>
                </label>

                <div className="flex items-end">
                  <button
                    onClick={resetFilters}
                    className="flex w-full items-center justify-center gap-2 rounded-xl border border-purple-200 px-4 py-3 text-sm font-semibold text-[#8211FA] transition hover:bg-purple-50 dark:border-purple-500/30 dark:hover:bg-purple-500/10"
                  >
                    <RotateCcw size={16} />
                    Clear all filters
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <label className="text-sm font-medium">
                  <span className="flex items-center gap-2">
                    <CalendarDays size={15} className="text-gray-400" />
                    From date
                  </span>
                  <input
                    type="date"
                    value={filters.startDate}
                    max={filters.endDate || undefined}
                    onChange={(event) =>
                      updateFilter("startDate", event.target.value)
                    }
                    className={inputClass}
                  />
                </label>

                <label className="text-sm font-medium">
                  <span className="flex items-center gap-2">
                    <CalendarDays size={15} className="text-gray-400" />
                    To date
                  </span>
                  <input
                    type="date"
                    value={filters.endDate}
                    min={filters.startDate || undefined}
                    onChange={(event) =>
                      updateFilter("endDate", event.target.value)
                    }
                    className={inputClass}
                  />
                </label>

                <label className="text-sm font-medium">
                  Minimum amount (₹)
                  <input
                    type="number"
                    min="0"
                    value={filters.minAmount}
                    onChange={(event) =>
                      updateFilter("minAmount", event.target.value)
                    }
                    placeholder="e.g. 500"
                    className={inputClass}
                  />
                </label>

                <label className="text-sm font-medium">
                  Maximum amount (₹)
                  <input
                    type="number"
                    min="0"
                    value={filters.maxAmount}
                    onChange={(event) =>
                      updateFilter("maxAmount", event.target.value)
                    }
                    placeholder="e.g. 10000"
                    className={inputClass}
                  />
                </label>
              </div>
            </div>
          )}
        </section>

        {/* Transactions table */}
        <section className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm dark:border-white/10 dark:bg-[#19171d]">
          <div className="flex flex-col gap-3 border-b border-gray-100 p-5 dark:border-white/10 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Filtered transactions</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Showing {filteredTransactions.length} of {transactions.length}{" "}
                transactions
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-600 dark:bg-white/5 dark:text-gray-300">
              <Check size={14} className="text-[#8211FA]" />
              Filters applied instantly
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[850px] text-left">
              <thead>
                <tr className="bg-gray-50/80 text-xs uppercase tracking-wider text-gray-500 dark:bg-white/[0.03] dark:text-gray-400">
                  <th className="px-5 py-4 font-semibold">Transaction</th>
                  <th className="px-5 py-4 font-semibold">Category</th>
                  <th className="px-5 py-4 font-semibold">Type</th>
                  <th className="px-5 py-4 font-semibold">Date</th>
                  <th className="px-5 py-4 text-right font-semibold">Amount</th>
                  <th className="px-5 py-4 text-right font-semibold">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100 dark:divide-white/5">
                {filteredTransactions.map((transaction) => {
                  const isIncome = transaction.type === "Income";

                  return (
                    <tr
                      key={`${transaction.type}-${transaction.id}`}
                      className="transition hover:bg-gray-50/80 dark:hover:bg-white/[0.025]"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${
                              isIncome
                                ? "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                                : "bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400"
                            }`}
                          >
                            {isIncome ? (
                              <ArrowDownLeft size={19} />
                            ) : (
                              <ArrowUpRight size={19} />
                            )}
                          </div>

                          <div>
                            <p className="font-semibold">{transaction.title}</p>
                            <p className="mt-1 max-w-[220px] truncate text-xs text-gray-500 dark:text-gray-400">
                              {transaction.description || "No description"}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-5 py-4">
                        <span className="rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-700 dark:bg-white/5 dark:text-gray-300">
                          {transaction.category}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex items-center gap-1.5 text-sm font-medium ${
                            isIncome
                              ? "text-green-600 dark:text-green-400"
                              : "text-red-500 dark:text-red-400"
                          }`}
                        >
                          <span
                            className={`h-1.5 w-1.5 rounded-full ${
                              isIncome ? "bg-green-500" : "bg-red-500"
                            }`}
                          />
                          {transaction.type}
                        </span>
                      </td>

                      <td className="whitespace-nowrap px-5 py-4 text-sm text-gray-600 dark:text-gray-300">
                        {formatDate(transaction.date)}
                      </td>

                      <td
                        className={`whitespace-nowrap px-5 py-4 text-right font-semibold ${
                          isIncome
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-500 dark:text-red-400"
                        }`}
                      >
                        {isIncome ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </td>

                      <td className="px-5 py-4 text-right">
                        <button
                          onClick={() => setSelectedTransaction(transaction)}
                          className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-600 transition hover:bg-red-50 dark:border-red-500/20 dark:text-red-400 dark:hover:bg-red-500/10"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            {filteredTransactions.length === 0 && (
              <div className="flex flex-col items-center px-5 py-16 text-center">
                <div className="mb-4 rounded-2xl bg-purple-50 p-4 text-[#8211FA] dark:bg-purple-500/10 dark:text-purple-300">
                  <Search size={25} />
                </div>
                <h3 className="font-semibold">No transactions found</h3>
                <p className="mt-2 max-w-sm text-sm text-gray-500 dark:text-gray-400">
                  Try changing your search, category, date range, or amount
                  filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-4 rounded-xl bg-[#8211FA] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#6D0BD4]"
                >
                  Reset filters
                </button>
              </div>
            )}
          </div>

          {filteredTransactions.length > 0 && (
            <div className="flex flex-col gap-2 border-t border-gray-100 px-5 py-4 text-xs text-gray-500 dark:border-white/10 dark:text-gray-400 sm:flex-row sm:items-center sm:justify-between">
              <span>
                Total matching amount:{" "}
                <strong className="text-gray-800 dark:text-gray-100">
                  {formatCurrency(
                    filteredTransactions.reduce(
                      (sum, transaction) => sum + transaction.amount,
                      0,
                    ),
                  )}
                </strong>
              </span>
              <span>Amounts shown in Indian Rupees (INR)</span>
            </div>
          )}
        </section>
      </div>

      {/* Delete confirmation */}
      {selectedTransaction && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm"
          onClick={() => setSelectedTransaction(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            onClick={(event) => event.stopPropagation()}
            className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#1b1920]"
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-100 text-red-600 dark:bg-red-500/15 dark:text-red-400">
              <X size={22} />
            </div>

            <h2 id="delete-title" className="text-lg font-bold">
              Delete transaction?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Are you sure you want to delete{" "}
              <strong className="text-gray-800 dark:text-gray-100">
                {selectedTransaction.title}
              </strong>
              ? This will remove it from this page until it is refreshed.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => setSelectedTransaction(null)}
                className="rounded-xl border border-gray-200 px-4 py-2.5 text-sm font-semibold hover:bg-gray-50 dark:border-white/10 dark:hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                onClick={deleteTransaction}
                className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                Delete transaction
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-5 right-5 z-[110] flex items-center gap-3 rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white shadow-xl dark:bg-white dark:text-gray-900">
          <Check size={17} className="text-green-400 dark:text-green-600" />
          {toast}
        </div>
      )}
    </div>
  );
}

export default Filters;
