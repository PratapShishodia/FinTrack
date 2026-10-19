import { useState } from "react";
import {
  UserRound,
  Wallet,
  Bell,
  Palette,
  ShieldCheck,
  Save,
  Check,
  Camera,
  Moon,
  Sun,
  CalendarDays,
  Globe,
  RotateCcw,
} from "lucide-react";
import { initialSettings, currencyOptions } from "../data/settingsData";

const inputClass =
  "mt-2 w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-[#8211FA] focus:ring-2 focus:ring-purple-100 dark:border-white/10 dark:bg-[#151319] dark:text-gray-100 dark:focus:ring-purple-900/40";

const sections = [
  { id: "profile", label: "Profile", icon: UserRound },
  { id: "preferences", label: "Preferences", icon: Palette },
  { id: "notifications", label: "Notifications", icon: Bell },
  { id: "security", label: "Security", icon: ShieldCheck },
];

function Settings() {
  const [settings, setSettings] = useState(initialSettings);
  const [activeSection, setActiveSection] = useState("profile");
  const [toast, setToast] = useState("");
  const [passwords, setPasswords] = useState({
    current: "",
    next: "",
    confirm: "",
  });

  const updateProfile = (key, value) => {
    setSettings((previous) => ({
      ...previous,
      profile: { ...previous.profile, [key]: value },
    }));
  };

  const updatePreference = (key, value) => {
    setSettings((previous) => ({
      ...previous,
      preferences: { ...previous.preferences, [key]: value },
    }));
  };

  const updateNotification = (key, value) => {
    setSettings((previous) => ({
      ...previous,
      notifications: { ...previous.notifications, [key]: value },
    }));
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(""), 2500);
  };

  const saveSettings = () => {
    localStorage.setItem("moneyManagerSettings", JSON.stringify(settings));
    localStorage.setItem("theme", settings.preferences.theme);

    if (settings.preferences.theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    showToast("Settings saved successfully");
  };

  const resetSettings = () => {
    setSettings({
      ...initialSettings,
      preferences: {
        ...initialSettings.preferences,
        theme: localStorage.getItem("theme") || "dark",
      },
    });
    showToast("Settings reset");
  };

  const changePassword = (event) => {
    event.preventDefault();

    if (!passwords.current || !passwords.next || !passwords.confirm) {
      showToast("Please complete all password fields");
      return;
    }

    if (passwords.next.length < 8) {
      showToast("New password must be at least 8 characters");
      return;
    }

    if (passwords.next !== passwords.confirm) {
      showToast("Passwords do not match");
      return;
    }

    setPasswords({ current: "", next: "", confirm: "" });
    showToast("Demo only: connect a backend to change your password");
  };

  const Toggle = ({ checked, onChange }) => (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-6 w-11 shrink-0 rounded-full transition ${
        checked ? "bg-[#8211FA]" : "bg-gray-300 dark:bg-gray-600"
      }`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${
          checked ? "left-[22px]" : "left-0.5"
        }`}
      />
    </button>
  );

  const SectionHeading = ({ title, description }) => (
    <div className="border-b border-gray-100 pb-5 dark:border-white/10">
      <h2 className="text-lg font-bold">{title}</h2>
      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
        {description}
      </p>
    </div>
  );

  const PreferenceRow = ({ title, description, checked, onChange }) => (
    <div className="flex items-center justify-between gap-4 py-4">
      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
          {description}
        </p>
      </div>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50/70 px-4 py-6 text-gray-900 dark:bg-[#111014] dark:text-gray-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-[1500px] space-y-6">
        {/* Header */}
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              Money Manager / <span className="text-[#8211FA]">Settings</span>
            </p>
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Settings
            </h1>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Manage your account and customize your experience.
            </p>
          </div>

          <div className="flex gap-3">
            <button
              onClick={resetSettings}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold hover:bg-gray-50 dark:border-white/10 dark:bg-[#19171d] dark:hover:bg-white/5"
            >
              <RotateCcw size={16} />
              Reset
            </button>
            <button
              onClick={saveSettings}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#8211FA] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:bg-[#6D0BD4]"
            >
              <Save size={16} />
              Save changes
            </button>
          </div>
        </div>

        {/* Profile overview */}
        <div className="overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm dark:border-white/10 dark:bg-[#19171d]">
          <div className="h-24 bg-gradient-to-r from-purple-700 via-[#8211FA] to-violet-400 sm:h-32" />

          <div className="flex flex-col gap-4 px-5 pb-6 sm:flex-row sm:items-end sm:px-8">
            <div className="-mt-12 flex h-24 w-24 items-center justify-center rounded-2xl border-4 border-white bg-purple-100 text-3xl font-bold text-[#8211FA] shadow-md dark:border-[#19171d] dark:bg-purple-500/15 dark:text-purple-300">
              {settings.profile.name
                .split(" ")
                .map((part) => part[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>

            <div className="flex-1 sm:pb-1">
              <h2 className="text-xl font-bold">
                {settings.profile.name || "Your name"}
              </h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                {settings.profile.email}
              </p>
            </div>

            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-green-50 px-3 py-2 text-xs font-semibold text-green-700 dark:bg-green-500/10 dark:text-green-400 sm:mb-1">
              <span className="h-2 w-2 rounded-full bg-green-500" />
              Personal account
            </span>
          </div>
        </div>

        {/* Settings layout */}
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[250px_minmax(0,1fr)]">
          {/* Sidebar navigation */}
          <aside className="rounded-2xl border border-gray-200/80 bg-white p-3 shadow-sm dark:border-white/10 dark:bg-[#19171d]">
            <p className="px-3 pb-3 pt-2 text-xs font-bold uppercase tracking-wider text-gray-400">
              Account settings
            </p>

            <nav className="grid grid-cols-2 gap-2 lg:grid-cols-1">
              {sections.map((section) => {
                const Icon = section.icon;
                const isActive = activeSection === section.id;

                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`flex items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold transition ${
                      isActive
                        ? "bg-[#8211FA] text-white shadow-md shadow-purple-500/20"
                        : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/5"
                    }`}
                  >
                    <Icon size={18} />
                    {section.label}
                  </button>
                );
              })}
            </nav>

            <div className="mt-5 rounded-xl bg-purple-50 p-4 dark:bg-purple-500/10">
              <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#8211FA] dark:bg-white/10 dark:text-purple-300">
                <ShieldCheck size={19} />
              </div>
              <p className="text-sm font-semibold">Your privacy matters</p>
              <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                Keep your account details up to date and protect your access.
              </p>
            </div>
          </aside>

          {/* Main settings panel */}
          <main className="min-w-0 rounded-2xl border border-gray-200/80 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#19171d] sm:p-7">
            {/* Profile */}
            {activeSection === "profile" && (
              <div className="space-y-6">
                <SectionHeading
                  title="Personal information"
                  description="Update the personal details associated with your account."
                />

                <div className="flex items-center gap-4 rounded-xl border border-dashed border-gray-200 p-4 dark:border-white/10">
                  <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-purple-100 text-[#8211FA] dark:bg-purple-500/15 dark:text-purple-300">
                    <UserRound size={25} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">Profile avatar</p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                      Your initials are generated from your name.
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-2 rounded-lg border border-gray-200 px-3 py-2 text-xs font-semibold text-gray-500 dark:border-white/10 dark:text-gray-400">
                    <Camera size={15} />
                    Demo
                  </span>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="text-sm font-semibold">
                    Full name
                    <input
                      value={settings.profile.name}
                      onChange={(event) =>
                        updateProfile("name", event.target.value)
                      }
                      placeholder="Enter your name"
                      className={inputClass}
                    />
                  </label>

                  <label className="text-sm font-semibold">
                    Email address
                    <input
                      type="email"
                      value={settings.profile.email}
                      onChange={(event) =>
                        updateProfile("email", event.target.value)
                      }
                      placeholder="you@example.com"
                      className={inputClass}
                    />
                  </label>

                  <label className="text-sm font-semibold sm:col-span-2">
                    Phone number
                    <input
                      type="tel"
                      value={settings.profile.phone}
                      onChange={(event) =>
                        updateProfile("phone", event.target.value)
                      }
                      placeholder="+91 98765 43210"
                      className={inputClass}
                    />
                  </label>
                </div>

                <div className="flex justify-end border-t border-gray-100 pt-5 dark:border-white/10">
                  <button
                    onClick={saveSettings}
                    className="rounded-xl bg-[#8211FA] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#6D0BD4]"
                  >
                    Save profile
                  </button>
                </div>
              </div>
            )}

            {/* Preferences */}
            {activeSection === "preferences" && (
              <div className="space-y-6">
                <SectionHeading
                  title="App preferences"
                  description="Customize currency, date formatting, and appearance."
                />

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <label className="text-sm font-semibold">
                    <span className="flex items-center gap-2">
                      <Wallet size={16} className="text-[#8211FA]" />
                      Default currency
                    </span>
                    <select
                      value={settings.preferences.currency}
                      onChange={(event) =>
                        updatePreference("currency", event.target.value)
                      }
                      className={inputClass}
                    >
                      {currencyOptions.map((currency) => (
                        <option key={currency.value} value={currency.value}>
                          {currency.label}
                        </option>
                      ))}
                    </select>
                  </label>

                  <label className="text-sm font-semibold">
                    <span className="flex items-center gap-2">
                      <CalendarDays size={16} className="text-[#8211FA]" />
                      Date format
                    </span>
                    <select
                      value={settings.preferences.dateFormat}
                      onChange={(event) =>
                        updatePreference("dateFormat", event.target.value)
                      }
                      className={inputClass}
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </label>

                  <label className="text-sm font-semibold">
                    <span className="flex items-center gap-2">
                      <Globe size={16} className="text-[#8211FA]" />
                      Start of week
                    </span>
                    <select
                      value={settings.preferences.startOfWeek}
                      onChange={(event) =>
                        updatePreference("startOfWeek", event.target.value)
                      }
                      className={inputClass}
                    >
                      <option>Monday</option>
                      <option>Sunday</option>
                      <option>Saturday</option>
                    </select>
                  </label>
                </div>

                <div className="border-t border-gray-100 pt-5 dark:border-white/10">
                  <h3 className="text-sm font-semibold">Appearance</h3>
                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Choose the theme used throughout the app.
                  </p>

                  <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {[
                      {
                        value: "light",
                        label: "Light mode",
                        description: "A clean, bright interface.",
                        icon: Sun,
                      },
                      {
                        value: "dark",
                        label: "Dark mode",
                        description: "Comfortable for low-light environments.",
                        icon: Moon,
                      },
                    ].map((theme) => {
                      const Icon = theme.icon;
                      const isSelected =
                        settings.preferences.theme === theme.value;

                      return (
                        <button
                          key={theme.value}
                          onClick={() => updatePreference("theme", theme.value)}
                          className={`flex items-center gap-4 rounded-xl border p-4 text-left transition ${
                            isSelected
                              ? "border-[#8211FA] bg-purple-50 ring-1 ring-[#8211FA] dark:bg-purple-500/10"
                              : "border-gray-200 hover:border-purple-200 dark:border-white/10 dark:hover:border-purple-500/40"
                          }`}
                        >
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-[#8211FA] shadow-sm dark:bg-white/5 dark:text-purple-300">
                            <Icon size={21} />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold">
                              {theme.label}
                            </p>
                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                              {theme.description}
                            </p>
                          </div>
                          {isSelected && (
                            <Check size={18} className="text-[#8211FA]" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="flex justify-end border-t border-gray-100 pt-5 dark:border-white/10">
                  <button
                    onClick={saveSettings}
                    className="rounded-xl bg-[#8211FA] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#6D0BD4]"
                  >
                    Save preferences
                  </button>
                </div>
              </div>
            )}

            {/* Notifications */}
            {activeSection === "notifications" && (
              <div className="space-y-6">
                <SectionHeading
                  title="Notification preferences"
                  description="Choose which reminders and updates you want to receive."
                />

                <div className="divide-y divide-gray-100 dark:divide-white/10">
                  <PreferenceRow
                    title="Budget alerts"
                    description="Get notified when your spending approaches a budget limit."
                    checked={settings.notifications.budgetAlerts}
                    onChange={(value) =>
                      updateNotification("budgetAlerts", value)
                    }
                  />

                  <PreferenceRow
                    title="Weekly summary"
                    description="Receive a weekly overview of your income and expenses."
                    checked={settings.notifications.weeklySummary}
                    onChange={(value) =>
                      updateNotification("weeklySummary", value)
                    }
                  />

                  <PreferenceRow
                    title="Transaction updates"
                    description="Receive alerts when transactions are added or changed."
                    checked={settings.notifications.transactionUpdates}
                    onChange={(value) =>
                      updateNotification("transactionUpdates", value)
                    }
                  />

                  <PreferenceRow
                    title="Product updates"
                    description="Hear about new Money Manager features and improvements."
                    checked={settings.notifications.productUpdates}
                    onChange={(value) =>
                      updateNotification("productUpdates", value)
                    }
                  />
                </div>

                <div className="flex justify-end border-t border-gray-100 pt-5 dark:border-white/10">
                  <button
                    onClick={saveSettings}
                    className="rounded-xl bg-[#8211FA] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#6D0BD4]"
                  >
                    Save notifications
                  </button>
                </div>
              </div>
            )}

            {/* Security */}
            {activeSection === "security" && (
              <div className="space-y-6">
                <SectionHeading
                  title="Security"
                  description="Manage your password and keep your account secure."
                />

                <div className="flex items-start gap-3 rounded-xl border border-purple-100 bg-purple-50 p-4 dark:border-purple-500/20 dark:bg-purple-500/10">
                  <ShieldCheck
                    size={21}
                    className="mt-0.5 shrink-0 text-[#8211FA]"
                  />
                  <div>
                    <p className="text-sm font-semibold">Account protection</p>
                    <p className="mt-1 text-xs leading-5 text-gray-600 dark:text-gray-400">
                      This is a frontend demo. Password changes and account
                      security must be connected to an authentication backend
                      before they can be applied.
                    </p>
                  </div>
                </div>

                <form onSubmit={changePassword} className="space-y-5">
                  <label className="block text-sm font-semibold">
                    Current password
                    <input
                      type="password"
                      autoComplete="current-password"
                      value={passwords.current}
                      onChange={(event) =>
                        setPasswords((previous) => ({
                          ...previous,
                          current: event.target.value,
                        }))
                      }
                      className={inputClass}
                      placeholder="Enter current password"
                    />
                  </label>

                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                    <label className="text-sm font-semibold">
                      New password
                      <input
                        type="password"
                        autoComplete="new-password"
                        value={passwords.next}
                        onChange={(event) =>
                          setPasswords((previous) => ({
                            ...previous,
                            next: event.target.value,
                          }))
                        }
                        className={inputClass}
                        placeholder="At least 8 characters"
                      />
                    </label>

                    <label className="text-sm font-semibold">
                      Confirm new password
                      <input
                        type="password"
                        autoComplete="new-password"
                        value={passwords.confirm}
                        onChange={(event) =>
                          setPasswords((previous) => ({
                            ...previous,
                            confirm: event.target.value,
                          }))
                        }
                        className={inputClass}
                        placeholder="Re-enter new password"
                      />
                    </label>
                  </div>

                  <div className="flex justify-end border-t border-gray-100 pt-5 dark:border-white/10">
                    <button
                      type="submit"
                      className="rounded-xl bg-[#8211FA] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#6D0BD4]"
                    >
                      Update password
                    </button>
                  </div>
                </form>
              </div>
            )}
          </main>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-5 right-5 z-[110] flex max-w-[calc(100vw-2.5rem)] items-center gap-3 rounded-xl bg-gray-900 px-4 py-3 text-sm font-medium text-white shadow-xl dark:bg-white dark:text-gray-900">
          <Check
            size={17}
            className="shrink-0 text-green-400 dark:text-green-600"
          />
          {toast}
        </div>
      )}
    </div>
  );
}

export default Settings;
