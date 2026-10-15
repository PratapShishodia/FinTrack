import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Wallet,
  ChartNoAxesCombined,
  ShieldCheck,
  Target,
  TrendingUp,
  CheckCircle2,
  CreditCard,
  CircleDollarSign,
} from "lucide-react";
import PublicNavbar from "../components/common/PublicNavbar";

const features = [
  {
    icon: ChartNoAxesCombined,
    title: "Understand your finances",
    description:
      "See your income, expenses, and financial trends in one clear overview.",
  },
  {
    icon: Target,
    title: "Stay on top of spending",
    description:
      "Organize transactions by category and understand your spending habits.",
  },
  {
    icon: ShieldCheck,
    title: "Build better money habits",
    description:
      "Keep your financial information organized and make more informed decisions.",
  },
];

const benefits = [
  "Simple income and expense tracking",
  "Clear transaction categories",
  "Financial summaries at a glance",
  "Flexible filtering and reporting",
];

function Home() {
  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-[#111014] dark:text-white">
      <PublicNavbar />

      <main>
        {/* Hero section */}
        <section className="relative isolate overflow-hidden">
          <div className="absolute inset-0 -z-10 bg-gradient-to-b from-purple-50/80 via-white to-white dark:from-purple-950/20 dark:via-[#111014] dark:to-[#111014]" />

          <div className="absolute -right-32 top-16 -z-10 h-96 w-96 rounded-full bg-purple-200/40 blur-3xl dark:bg-purple-700/10" />
          <div className="absolute -left-32 bottom-0 -z-10 h-72 w-72 rounded-full bg-violet-100/60 blur-3xl dark:bg-violet-800/10" />

          <div className="mx-auto grid min-h-[650px] max-w-[1500px] items-center gap-14 px-5 py-16 sm:px-8 sm:py-20 lg:grid-cols-2 lg:px-12 lg:py-24">
            {/* Hero copy */}
            <div className="mx-auto w-full max-w-2xl lg:mx-0">
              <div className="inline-flex items-center gap-2 rounded-full border border-purple-200 bg-white/80 px-4 py-2 text-xs font-semibold text-[#8211FA] shadow-sm dark:border-purple-500/20 dark:bg-white/5 dark:text-purple-300 sm:text-sm">
                <span className="h-2 w-2 rounded-full bg-[#8211FA]" />A simpler
                way to manage your money
              </div>

              <h1 className="mt-7 text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-6xl xl:text-7xl">
                Take control of
                <br />
                your money.
                <br />
                <span className="bg-gradient-to-r from-[#8211FA] to-[#B05CFF] bg-clip-text text-transparent">
                  Own your future.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-gray-600 dark:text-gray-400 sm:text-lg">
                One simple place to track income, manage expenses, and
                understand where your money goes. Make every financial decision
                with more confidence.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/signup"
                  className="text-white inline-flex items-center justify-center gap-2 rounded-xl bg-[#8211FA] px-7 py-4 text-sm font-semibold shadow-xl shadow-purple-500/25 transition hover:-translate-y-1 hover:bg-[#6D0BD4]"
                >
                  Get Started for Free
                  <ArrowRight size={18} />
                </Link>

                <Link
                  to="/login"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-7 py-4 text-sm font-semibold text-gray-800 transition hover:border-purple-200 hover:bg-purple-50 dark:border-white/10 dark:bg-white/[0.03] dark:text-white dark:hover:bg-purple-500/10"
                >
                  Login to your account
                </Link>
              </div>

              <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 text-xs text-gray-500 dark:text-gray-400 sm:text-sm">
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#8211FA]" />
                  Easy to use
                </span>
                <span className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-[#8211FA]" />
                  Clear financial insights
                </span>
              </div>
            </div>

            {/* Hero dashboard preview */}
            <div className="relative mx-auto w-full max-w-xl lg:ml-auto lg:mr-0">
              <div className="absolute -inset-5 rounded-[2.5rem] bg-gradient-to-br from-purple-200/50 to-violet-100/30 blur-2xl dark:from-purple-600/10 dark:to-violet-500/5" />

              <div className="relative rounded-3xl border border-gray-200/80 bg-white p-5 shadow-2xl shadow-purple-900/10 dark:border-white/10 dark:bg-[#19171d] sm:p-7">
                {/* Preview header */}
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-[#8211FA] dark:bg-purple-500/15 dark:text-purple-300">
                      <Wallet size={23} />
                    </div>
                    <div>
                      <p className="text-sm font-bold">Financial overview</p>
                      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Your money at a glance
                      </p>
                    </div>
                  </div>

                  <span className="rounded-lg bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700 dark:bg-green-500/10 dark:text-green-400">
                    Demo preview
                  </span>
                </div>

                {/* Balance card */}
                <div className="mt-7 rounded-2xl bg-gradient-to-br from-[#7410E8] via-[#8211FA] to-[#A855F7] p-6 text-white shadow-lg shadow-purple-500/20">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-purple-100">
                      Total balance
                    </span>
                    <CircleDollarSign size={21} className="text-purple-100" />
                  </div>

                  <p className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
                    ₹1,25,750
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-xs text-purple-100">
                    <TrendingUp size={15} />
                    <span>Your financial snapshot, all in one place</span>
                  </div>

                  <div className="mt-5 flex h-14 items-end gap-2">
                    {[35, 48, 40, 60, 50, 72, 58, 82, 67, 90, 75, 100].map(
                      (height, index) => (
                        <div
                          key={index}
                          className="flex-1 rounded-t-md bg-white/70"
                          style={{ height: `${height}%` }}
                        />
                      ),
                    )}
                  </div>
                </div>

                {/* Income and expense */}
                <div className="mt-5 grid grid-cols-2 gap-4">
                  <div className="rounded-2xl border border-gray-100 p-4 dark:border-white/10">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400">
                        <ArrowUpRight size={17} />
                      </span>
                      Total income
                    </div>
                    <p className="mt-4 text-xl font-bold">₹85,000</p>
                    <p className="mt-1 text-xs text-gray-400">Sample data</p>
                  </div>

                  <div className="rounded-2xl border border-gray-100 p-4 dark:border-white/10">
                    <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                      <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400">
                        <CreditCard size={17} />
                      </span>
                      Total expenses
                    </div>
                    <p className="mt-4 text-xl font-bold">₹42,500</p>
                    <p className="mt-1 text-xs text-gray-400">Sample data</p>
                  </div>
                </div>

                {/* Mini activity list */}
                <div className="mt-6">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-sm font-bold">Recent activity</h3>
                    <span className="text-xs text-[#8211FA]">Preview</span>
                  </div>

                  {[
                    {
                      title: "Monthly salary",
                      category: "Income",
                      amount: "+₹65,000",
                      positive: true,
                    },
                    {
                      title: "Grocery shopping",
                      category: "Food & Dining",
                      amount: "-₹2,450",
                      positive: false,
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center justify-between gap-3 border-t border-gray-100 py-3 dark:border-white/10"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                            item.positive
                              ? "bg-green-50 text-green-600 dark:bg-green-500/10 dark:text-green-400"
                              : "bg-red-50 text-red-500 dark:bg-red-500/10 dark:text-red-400"
                          }`}
                        >
                          {item.positive ? (
                            <TrendingUp size={17} />
                          ) : (
                            <CreditCard size={17} />
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-semibold">
                            {item.title}
                          </p>
                          <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                            {item.category}
                          </p>
                        </div>
                      </div>

                      <span
                        className={`shrink-0 text-sm font-bold ${
                          item.positive
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-500 dark:text-red-400"
                        }`}
                      >
                        {item.amount}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="absolute -bottom-5 -left-4 hidden items-center gap-3 rounded-2xl border border-gray-100 bg-white p-4 shadow-xl dark:border-white/10 dark:bg-[#211d27] sm:flex">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-purple-100 text-[#8211FA] dark:bg-purple-500/15 dark:text-purple-300">
                  <ChartNoAxesCombined size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Financial clarity
                  </p>
                  <p className="mt-1 text-sm font-bold">Everything organized</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features */}
        <section
          id="about"
          className="border-t border-gray-100 bg-gray-50/70 px-5 py-20 dark:border-white/10 dark:bg-white/[0.02] sm:px-8 lg:px-12 lg:py-24"
        >
          <div className="mx-auto max-w-[1300px]">
            <div className="mx-auto max-w-2xl text-center">
              <span className="text-sm font-semibold text-[#8211FA]">
                SIMPLE. CLEAR. ORGANIZED.
              </span>

              <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
                Everything you need to manage your money
              </h2>

              <p className="mt-4 text-sm leading-7 text-gray-500 dark:text-gray-400 sm:text-base">
                Spend less time figuring out your finances and more time making
                decisions that matter.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-3">
              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="rounded-2xl border border-gray-200/80 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-purple-200 hover:shadow-xl hover:shadow-purple-900/5 dark:border-white/10 dark:bg-[#19171d] dark:hover:border-purple-500/30"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100 text-[#8211FA] dark:bg-purple-500/15 dark:text-purple-300">
                      <Icon size={23} />
                    </div>

                    <h3 className="mt-6 text-lg font-bold">{feature.title}</h3>

                    <p className="mt-3 text-sm leading-7 text-gray-500 dark:text-gray-400">
                      {feature.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="px-5 py-20 sm:px-8 lg:px-12 lg:py-24">
          <div className="mx-auto grid max-w-[1300px] items-center gap-12 lg:grid-cols-2">
            <div>
              <span className="text-sm font-semibold text-[#8211FA]">
                YOUR MONEY, YOUR WAY
              </span>

              <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
                A clearer picture of your financial life.
              </h2>

              <p className="mt-5 max-w-xl text-sm leading-7 text-gray-500 dark:text-gray-400 sm:text-base">
                From everyday spending to monthly income, MoneyManager helps you
                keep the important details together so you can stay organized.
              </p>

              <div className="mt-7 space-y-4">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-center gap-3">
                    <CheckCircle2
                      size={20}
                      className="shrink-0 text-[#8211FA]"
                    />
                    <span className="text-sm font-medium sm:text-base">
                      {benefit}
                    </span>
                  </div>
                ))}
              </div>

              <Link
                to="/signup"
                className="mt-9 inline-flex items-center gap-2 rounded-xl bg-[#8211FA] px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:bg-[#6D0BD4]"
              >
                Start managing your money
                <ArrowRight size={17} />
              </Link>
            </div>

            <div className="rounded-3xl border border-purple-100 bg-gradient-to-br from-purple-50 to-white p-7 dark:border-purple-500/20 dark:from-purple-950/30 dark:to-[#19171d] sm:p-10">
              <div className="rounded-2xl border border-gray-200/80 bg-white p-6 shadow-sm dark:border-white/10 dark:bg-[#19171d]">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-100 text-[#8211FA] dark:bg-purple-500/15 dark:text-purple-300">
                    <Wallet size={23} />
                  </div>
                  <div>
                    <h3 className="font-bold">Your financial checklist</h3>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Build your money management routine
                    </p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  {[
                    "Record your income",
                    "Categorize your expenses",
                    "Review your spending",
                    "Plan for your goals",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className="flex items-center gap-3 rounded-xl border border-gray-100 p-3 dark:border-white/10"
                    >
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-purple-100 text-xs font-bold text-[#8211FA] dark:bg-purple-500/15 dark:text-purple-300">
                        {index + 1}
                      </span>
                      <span className="text-sm font-medium">{item}</span>
                    </div>
                  ))}
                </div>

                <p className="mt-4 text-xs leading-5 text-gray-400">
                  Example checklist for illustrative purposes.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact and CTA */}
        <section id="contact" className="px-5 pb-20 sm:px-8 lg:px-12 lg:pb-24">
          <div className="mx-auto max-w-[1300px] overflow-hidden rounded-3xl bg-gradient-to-r from-[#7410E8] via-[#8211FA] to-[#A855F7] px-6 py-12 text-center text-white sm:px-12 sm:py-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Ready to take control?
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-purple-100 sm:text-base">
              Start organizing your finances and take the first step toward
              better money habits.
            </p>

            <Link
              to="/signup"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-white px-7 py-4 text-sm font-bold text-[#8211FA] transition hover:-translate-y-0.5 hover:bg-purple-50"
            >
              Get Started for Free
              <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 px-5 py-8 dark:border-white/10 sm:px-8 lg:px-12">
        <div className="mx-auto flex max-w-[1500px] flex-col items-center justify-between gap-4 sm:flex-row">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#8211FA] text-white">
              <Wallet size={19} />
            </div>
            <span className="font-bold">
              Money<span className="text-[#8211FA]">Manager</span>
            </span>
          </Link>

          <p className="text-center text-xs text-gray-500 dark:text-gray-400">
            © 2026 MoneyManager. Manage your money. Build your future.
          </p>

          <Link
            to="/login"
            className="text-sm font-semibold text-[#8211FA] hover:text-[#6D0BD4]"
          >
            Login to your account
          </Link>
        </div>
      </footer>
    </div>
  );
}

export default Home;
