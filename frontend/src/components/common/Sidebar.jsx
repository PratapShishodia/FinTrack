import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Tags,
  Wallet,
  Receipt,
  SlidersHorizontal,
  X,
  Settings,
} from "lucide-react";
import Logo from "./Logo";

const navigation = [
  {
    name: "Dashboard",
    path: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "Categories",
    path: "/categories",
    icon: Tags,
  },
  {
    name: "Income",
    path: "/income",
    icon: Wallet,
  },
  {
    name: "Expenses",
    path: "/expenses",
    icon: Receipt,
  },
  {
    name: "Filters",
    path: "/filters",
    icon: SlidersHorizontal,
  },
  {
    name: "Settings",
    path: "/settings",
    icon: Settings,
  },
];

function Sidebar({ mobileOpen, onClose }) {
  return (
    <>
      {mobileOpen && (
        <button
          aria-label="Close navigation overlay"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-[270px] flex-col border-r border-gray-200 bg-white transition-transform duration-300 lg:sticky lg:top-[76px] lg:z-20 lg:h-[calc(100vh-76px)] lg:translate-x-0 dark:border-white/10 dark:bg-[#17141C] ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-[76px] items-center justify-between border-b border-gray-100 px-6 lg:hidden dark:border-white/10">
          <Logo />

          <button
            onClick={onClose}
            aria-label="Close sidebar"
            className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10"
          >
            <X size={21} />
          </button>
        </div>

        <div className="flex flex-col items-center px-5 pb-7 pt-8">
          <div className="flex h-[76px] w-[76px] items-center justify-center rounded-full bg-purple-100 ring-4 ring-purple-50 dark:bg-purple-950 dark:ring-purple-950/50">
            <span className="text-2xl font-bold text-[#8211FA]">AM</span>
          </div>

          <h3 className="mt-3 font-semibold text-gray-900 dark:text-white">
            Alex Morgan
          </h3>

          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
            Personal Account
          </p>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto px-4">
          <p className="mb-4 px-3 text-xs font-semibold uppercase tracking-wider text-gray-400">
            Workspace
          </p>

          {navigation.map(({ name, path, icon: Icon }) => (
            <NavLink
              key={path}
              to={path}
              onClick={onClose}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-xl px-4 py-3.5 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-[#8211FA] !text-white shadow-lg shadow-purple-500/20"
                    : "text-gray-600 hover:bg-purple-50 hover:text-[#8211FA] dark:text-gray-300 dark:hover:bg-purple-950/50"
                }`
              }
            >
              <Icon size={20} strokeWidth={2} />
              <span>{name}</span>
            </NavLink>
          ))}
        </nav>

        <div className="border-t border-gray-100 p-5 dark:border-white/10">
          <div className="rounded-2xl bg-purple-50 p-4 dark:bg-purple-950/40">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              Stay on track 💜
            </p>
            <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
              Keep your finances organized and work toward your goals.
            </p>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;
