import { ArrowDownRight, ArrowUpRight, Wallet } from "lucide-react";

function SummaryCard({
  title,
  amount,
  change,
  description,
  icon: Icon = Wallet,
  variant = "purple",
}) {
  const variants = {
    purple: {
      iconBg: "bg-purple-100 dark:bg-purple-950",
      iconColor: "text-[#8211FA]",
    },
    green: {
      iconBg: "bg-green-100 dark:bg-green-950",
      iconColor: "text-green-600 dark:text-green-400",
    },
    red: {
      iconBg: "bg-red-100 dark:bg-red-950",
      iconColor: "text-red-600 dark:text-red-400",
    },
  };

  const style = variants[variant] || variants.purple;
  const isPositive = change >= 0;

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md sm:p-6 dark:border-white/10 dark:bg-[#17141C]">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
            {title}
          </p>

          <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            ₹{amount.toLocaleString("en-IN")}
          </h2>
        </div>

        <div
          className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${style.iconBg} ${style.iconColor}`}
        >
          <Icon size={23} />
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-2">
        <span
          className={`inline-flex items-center gap-1 rounded-full px-2 py-1 text-xs font-semibold ${
            isPositive
              ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
              : "bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-400"
          }`}
        >
          {isPositive ? (
            <ArrowUpRight size={14} />
          ) : (
            <ArrowDownRight size={14} />
          )}
          {Math.abs(change)}%
        </span>

        <span className="text-xs text-gray-500 dark:text-gray-400">
          {description}
        </span>
      </div>
    </div>
  );
}

export default SummaryCard;
