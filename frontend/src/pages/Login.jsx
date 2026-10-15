import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Wallet,
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  ArrowRight,
  CheckCircle2,
  ChartNoAxesCombined,
  ShieldCheck,
} from "lucide-react";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (event) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));
    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.email.trim() || !formData.password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError("Please enter a valid email address.");
      return;
    }

    // Frontend demo only — replace with backend authentication later.
    const user = {
      name: formData.email.split("@")[0],
      email: formData.email.trim(),
    };

    localStorage.removeItem("moneyManagerUser");
    sessionStorage.removeItem("moneyManagerUser");

    const storage = rememberMe ? localStorage : sessionStorage;

    storage.setItem("moneyManagerUser", JSON.stringify(user));

    navigate("/dashboard", { replace: true });
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#8211FA] focus:bg-white focus:ring-4 focus:ring-purple-100 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:focus:border-[#8211FA] dark:focus:bg-white/[0.06] dark:focus:ring-purple-500/10";

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-[#111014] dark:text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left branding panel */}
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-[#7410E8] via-[#8211FA] to-[#A855F7] p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/10" />
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-white/[0.06] blur-2xl" />

          <Link to="/login" className="relative z-10 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-[#8211FA] shadow-lg">
              <Wallet size={27} strokeWidth={2.5} />
            </div>
            <span className="text-2xl font-bold tracking-tight">
              MoneyManager
            </span>
          </Link>

          <div className="relative z-10 mx-auto my-12 w-full max-w-xl">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm backdrop-blur-sm">
              <ChartNoAxesCombined size={17} />
              <span>Take control of your finances</span>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
              Your money,
              <br />
              <span className="text-purple-200">your goals,</span>
              <br />
              your future.
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-purple-100 xl:text-lg">
              Understand your spending, track your income, and make smarter
              financial decisions—all in one place.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Track income and expenses effortlessly",
                "Understand your spending habits",
                "Keep your financial goals in focus",
              ].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <CheckCircle2
                    size={21}
                    className="shrink-0 text-purple-200"
                  />
                  <span className="text-sm text-white/95 xl:text-base">
                    {item}
                  </span>
                </div>
              ))}
            </div>

            {/* Decorative finance card */}
            <div className="mt-12 max-w-sm rounded-2xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-sm text-purple-100">
                  Financial overview
                </span>
                <ChartNoAxesCombined size={20} />
              </div>
              <p className="mt-4 text-sm text-purple-100">
                Manage your money with confidence
              </p>
              <div className="mt-5 flex h-12 items-end gap-2">
                {[35, 55, 42, 72, 52, 85, 65, 100, 78, 90, 68, 95].map(
                  (height, index) => (
                    <div
                      key={index}
                      className="flex-1 rounded-t-md bg-white/80"
                      style={{ height: `${height}%` }}
                    />
                  ),
                )}
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between gap-4 text-xs text-purple-100">
            <span>© 2026 MoneyManager</span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={15} />
              Your financial journey starts here
            </span>
          </div>
        </section>

        {/* Right login panel */}
        <section className="flex min-h-screen flex-col">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 px-6 pt-7 lg:hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8211FA] text-white">
              <Wallet size={24} />
            </div>
            <span className="text-xl font-bold">MoneyManager</span>
          </div>

          <div className="flex flex-1 items-center justify-center px-5 py-10 sm:px-10 lg:px-12 xl:px-20">
            <div className="w-full max-w-md">
              <div className="mb-9">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-[#8211FA] dark:bg-purple-500/15 dark:text-purple-300">
                  <LockKeyhole size={27} />
                </div>

                <p className="mb-2 text-sm font-semibold text-[#8211FA]">
                  WELCOME BACK
                </p>

                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Sign in to your account
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
                  Enter your details below to access your financial dashboard.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Email */}
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Email address
                  </label>

                  <div className="relative">
                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                {/* Password */}
                <div>
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <label htmlFor="password" className="text-sm font-semibold">
                      Password
                    </label>

                    <button
                      type="button"
                      onClick={() =>
                        setError(
                          "Password recovery requires backend integration.",
                        )
                      }
                      className="text-xs font-semibold text-[#8211FA] transition hover:text-[#6D0BD4]"
                    >
                      Forgot password?
                    </button>
                  </div>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="current-password"
                      placeholder="Enter your password"
                      value={formData.password}
                      onChange={handleChange}
                      className={inputClass}
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((previous) => !previous)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#8211FA]"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Remember me */}
                <label className="flex cursor-pointer items-center gap-3 py-1">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 accent-[#8211FA] focus:ring-[#8211FA]"
                  />
                  <span className="text-sm text-gray-600 dark:text-gray-300">
                    Remember me
                  </span>
                </label>

                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
                  >
                    {error}
                  </div>
                )}

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#8211FA] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:-translate-y-0.5 hover:bg-[#6D0BD4] hover:shadow-xl"
                >
                  Sign in
                  <ArrowRight size={18} />
                </button>

                <div className="relative py-2">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200 dark:border-white/10" />
                  </div>
                  <div className="relative flex justify-center">
                    <span className="bg-white px-4 text-xs text-gray-400 dark:bg-[#111014]">
                      SECURE ACCESS
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 rounded-xl bg-gray-50 p-4 dark:bg-white/[0.04]">
                  <ShieldCheck
                    size={20}
                    className="mt-0.5 shrink-0 text-[#8211FA]"
                  />
                  <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
                    Your account details should be protected by secure
                    authentication when backend integration is added.
                  </p>
                </div>
              </form>

              <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                Don&apos;t have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-[#8211FA] hover:text-[#6D0BD4]"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>

          <footer className="px-6 pb-6 text-center text-xs text-gray-400">
            Manage your money. Build your future.
          </footer>
        </section>
      </div>
    </div>
  );
}

export default Login;
