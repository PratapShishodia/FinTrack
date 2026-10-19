import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Wallet, Menu, X, ArrowRight } from "lucide-react";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/#about" },
  { label: "Contact Us", href: "/#contact" },
];

function PublicNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/90 backdrop-blur-xl dark:border-white/10 dark:bg-[#111014]/90">
      <nav className="mx-auto flex h-[76px] max-w-[1500px] items-center justify-between gap-6 px-5 sm:px-8 lg:px-12">
        {/* Logo */}
        <Link
          to="/"
          className="flex shrink-0 items-center gap-3"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8211FA] text-white shadow-lg shadow-purple-500/20">
            <Wallet size={24} strokeWidth={2.5} />
          </div>

          <span className="text-xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-2xl">
            Fin<span className="text-[#8211FA]">Track</span>
          </span>
        </Link>

        {/* Desktop navigation */}
        <div className="hidden flex-1 items-center justify-center gap-9 md:flex">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm font-medium text-gray-600 transition hover:text-[#8211FA] dark:text-gray-300 dark:hover:text-purple-300"
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden shrink-0 items-center gap-3 md:flex">
          <Link
            to="/login"
            className="rounded-xl px-4 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-white/5"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="inline-flex items-center gap-2 rounded-xl bg-[#8211FA] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:-translate-y-0.5 hover:bg-[#6D0BD4]"
          >
            Get Started
            <ArrowRight size={16} />
          </Link>
        </div>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen((previous) => !previous)}
          aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileMenuOpen}
          className="rounded-xl border border-gray-200 p-2.5 text-gray-700 dark:border-white/10 dark:text-white md:hidden"
        >
          {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </nav>

      {/* Mobile navigation */}
      {mobileMenuOpen && (
        <div className="border-t border-gray-100 bg-white px-5 pb-5 pt-3 dark:border-white/10 dark:bg-[#111014] md:hidden">
          <div className="mx-auto flex max-w-[1500px] flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="rounded-xl px-4 py-3 text-sm font-medium text-gray-700 transition hover:bg-purple-50 hover:text-[#8211FA] dark:text-gray-300 dark:hover:bg-purple-500/10"
              >
                {link.label}
              </a>
            ))}

            <div className="mt-3 grid grid-cols-2 gap-3 border-t border-gray-100 pt-4 dark:border-white/10">
              <Link
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold dark:border-white/10"
              >
                Login
              </Link>

              <Link
                to="/signup"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-xl bg-[#8211FA] px-4 py-3 text-sm font-semibold text-white"
              >
                Get Started
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

export default PublicNavbar;
