import { Wallet } from "lucide-react";

function Logo({ collapsed = false, light = false }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-[#8211FA] dark:bg-purple-950">
        <Wallet size={23} strokeWidth={2.5} />
      </div>

      {!collapsed && (
        <span
          className={`text-lg font-bold tracking-tight ${
            light ? "text-white" : "text-gray-900 dark:text-white"
          }`}
        >
          Money<span className="text-[#8211FA]">Manager</span>
        </span>
      )}
    </div>
  );
}

export default Logo;
