import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Wallet,
  Eye,
  EyeOff,
  Mail,
  LockKeyhole,
  UserRound,
  ArrowRight,
  CheckCircle2,
  ChartNoAxesCombined,
  ShieldCheck,
  Check,
} from "lucide-react";

function Signup() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (event) => {
    setFormData((previous) => ({
      ...previous,
      [event.target.name]: event.target.value,
    }));

    setError("");
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = formData.name.trim();
    const email = formData.email.trim().toLowerCase();

    if (!name || !email || !formData.password || !formData.confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (formData.password.length < 8) {
      setError("Your password must contain at least 8 characters.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Your passwords do not match.");
      return;
    }

    if (!acceptedTerms) {
      setError("Please accept the Terms and Conditions to continue.");
      return;
    }

    // Frontend demo only. Replace with backend registration later.
    const demoUser = {
      name,
      email,
    };

    localStorage.removeItem("moneyManagerUser");
    sessionStorage.removeItem("moneyManagerUser");

    localStorage.setItem("moneyManagerUser", JSON.stringify(demoUser));

    navigate("/dashboard", { replace: true });
  };

  const inputClass =
    "w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-12 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#8211FA] focus:bg-white focus:ring-4 focus:ring-purple-100 dark:border-white/10 dark:bg-white/[0.04] dark:text-white dark:focus:border-[#8211FA] dark:focus:bg-white/[0.06] dark:focus:ring-purple-500/10";

  const passwordChecks = [
    {
      label: "At least 8 characters",
      valid: formData.password.length >= 8,
    },
    {
      label: "Passwords match",
      valid:
        formData.confirmPassword.length > 0 &&
        formData.password === formData.confirmPassword,
    },
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 dark:bg-[#111014] dark:text-white">
      <div className="grid min-h-screen lg:grid-cols-2">
        {/* Left branding panel */}
        <section className="relative hidden overflow-hidden bg-gradient-to-br from-[#7410E8] via-[#8211FA] to-[#A855F7] p-12 text-white lg:flex lg:flex-col lg:justify-between xl:p-16">
          <div className="absolute -right-32 -top-32 h-96 w-96 rounded-full border border-white/10" />
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full border border-white/10" />
          <div className="absolute -bottom-40 -left-24 h-96 w-96 rounded-full bg-white/[0.06] blur-2xl" />

          <Link to="/signup" className="relative z-10 flex items-center gap-3">
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
              <span>Your financial journey starts here</span>
            </div>

            <h1 className="text-4xl font-bold leading-tight tracking-tight xl:text-5xl">
              Make every
              <br />
              <span className="text-purple-200">rupee count.</span>
            </h1>

            <p className="mt-6 max-w-md text-base leading-7 text-purple-100 xl:text-lg">
              Create your account and bring your income, expenses, and financial
              goals together in one simple dashboard.
            </p>

            <div className="mt-10 space-y-5">
              {[
                "Organize all your transactions",
                "Understand where your money goes",
                "Build better financial habits",
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

            {/* Decorative overview card */}
            <div className="mt-12 max-w-sm rounded-2xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-md">
              <div className="flex items-center justify-between">
                <span className="text-sm text-purple-100">
                  Your money, organized
                </span>
                <Wallet size={20} />
              </div>

              <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl border border-white/10 bg-white/10 p-3">
                  <p className="text-xs text-purple-100">Income</p>
                  <div className="mt-3 h-2 w-3/4 rounded-full bg-white/90" />
                  <div className="mt-2 h-2 w-1/2 rounded-full bg-white/40" />
                </div>

                <div className="rounded-xl border border-white/10 bg-white/10 p-3">
                  <p className="text-xs text-purple-100">Expenses</p>
                  <div className="mt-3 h-2 w-2/3 rounded-full bg-white/90" />
                  <div className="mt-2 h-2 w-1/3 rounded-full bg-white/40" />
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between gap-4 text-xs text-purple-100">
            <span>© 2026 MoneyManager</span>
            <span className="flex items-center gap-2">
              <ShieldCheck size={15} />
              Built for better money habits
            </span>
          </div>
        </section>

        {/* Signup form panel */}
        <section className="flex min-h-screen flex-col">
          {/* Mobile logo */}
          <div className="flex items-center gap-3 px-6 pt-7 lg:hidden">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#8211FA] text-white">
              <Wallet size={24} />
            </div>

            <span className="text-xl font-bold">MoneyManager</span>
          </div>

          <div className="flex flex-1 items-center justify-center px-5 py-8 sm:px-10 lg:px-12 xl:px-20">
            <div className="w-full max-w-md">
              <div className="mb-7">
                <div className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-100 text-[#8211FA] dark:bg-purple-500/15 dark:text-purple-300">
                  <UserRound size={27} />
                </div>

                <p className="mb-2 text-sm font-semibold text-[#8211FA]">
                  GET STARTED FOR FREE
                </p>

                <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                  Create your account
                </h2>

                <p className="mt-3 text-sm leading-6 text-gray-500 dark:text-gray-400">
                  Enter your details below to get started with MoneyManager.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Full name */}
                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Full name
                  </label>

                  <div className="relative">
                    <UserRound
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Alex Morgan"
                      value={formData.name}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

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
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Create a password"
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

                {/* Confirm password */}
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Confirm password
                  </label>

                  <div className="relative">
                    <LockKeyhole
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                    />

                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      autoComplete="new-password"
                      placeholder="Re-enter your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className={inputClass}
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword((previous) => !previous)
                      }
                      aria-label={
                        showConfirmPassword
                          ? "Hide confirm password"
                          : "Show confirm password"
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-[#8211FA]"
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                </div>

                {/* Password requirements */}
                {(formData.password || formData.confirmPassword) && (
                  <div className="grid grid-cols-1 gap-2 rounded-xl bg-gray-50 p-3 dark:bg-white/[0.04] sm:grid-cols-2">
                    {passwordChecks.map((item) => (
                      <div
                        key={item.label}
                        className={`flex items-center gap-2 text-xs ${
                          item.valid
                            ? "text-green-600 dark:text-green-400"
                            : "text-gray-500 dark:text-gray-400"
                        }`}
                      >
                        <Check
                          size={14}
                          className={item.valid ? "opacity-100" : "opacity-40"}
                        />
                        {item.label}
                      </div>
                    ))}
                  </div>
                )}

                {/* Terms */}
                <label className="flex cursor-pointer items-start gap-3 py-1">
                  <input
                    type="checkbox"
                    checked={acceptedTerms}
                    onChange={(event) => {
                      setAcceptedTerms(event.target.checked);
                      setError("");
                    }}
                    className="mt-0.5 h-4 w-4 shrink-0 rounded border-gray-300 accent-[#8211FA] focus:ring-[#8211FA]"
                  />

                  <span className="text-xs leading-5 text-gray-500 dark:text-gray-400">
                    I agree to the{" "}
                    <a
                      href="#terms"
                      onClick={(event) => event.preventDefault()}
                      className="font-semibold text-[#8211FA] hover:underline"
                    >
                      Terms and Conditions
                    </a>{" "}
                    and{" "}
                    <a
                      href="#privacy"
                      onClick={(event) => event.preventDefault()}
                      className="font-semibold text-[#8211FA] hover:underline"
                    >
                      Privacy Policy
                    </a>
                    .
                  </span>
                </label>

                {/* Error */}
                {error && (
                  <div
                    role="alert"
                    className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/20 dark:bg-red-500/10 dark:text-red-400"
                  >
                    {error}
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#8211FA] px-5 py-3.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:-translate-y-0.5 hover:bg-[#6D0BD4] hover:shadow-xl"
                >
                  Create account
                  <ArrowRight size={18} />
                </button>

                <div className="flex items-start gap-3 rounded-xl bg-gray-50 p-4 dark:bg-white/[0.04]">
                  <ShieldCheck
                    size={20}
                    className="mt-0.5 shrink-0 text-[#8211FA]"
                  />

                  <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
                    This is a frontend demo. Secure account creation and
                    password storage require backend authentication.
                  </p>
                </div>
              </form>

              <p className="mt-6 text-center text-sm text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-[#8211FA] hover:text-[#6D0BD4]"
                >
                  Sign in
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

export default Signup;
