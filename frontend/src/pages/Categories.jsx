import { useMemo, useState } from "react";
import {
  Wallet,
  Laptop,
  TrendingUp,
  Utensils,
  Car,
  ShoppingBag,
  Zap,
  HeartPulse,
  Plus,
  Pencil,
  Trash2,
  Search,
  X,
  Check,
  ChevronDown,
  Tag,
  BriefcaseBusiness,
  Coffee,
  House,
  Plane,
  GraduationCap,
  Gift,
  Smartphone,
  CircleDollarSign,
  Receipt,
  Gamepad2,
  Dumbbell,
  CircleHelp,
} from "lucide-react";

import { initialCategories } from "../data/categoryData";
import EmojiPicker from "emoji-picker-react";

const iconOptions = [
  { name: "wallet", label: "Wallet", Icon: Wallet },
  { name: "laptop", label: "Laptop", Icon: Laptop },
  { name: "trending-up", label: "Investment", Icon: TrendingUp },
  { name: "utensils", label: "Food", Icon: Utensils },
  { name: "car", label: "Transport", Icon: Car },
  { name: "shopping-bag", label: "Shopping", Icon: ShoppingBag },
  { name: "zap", label: "Utilities", Icon: Zap },
  { name: "heart-pulse", label: "Healthcare", Icon: HeartPulse },
  { name: "briefcase", label: "Business", Icon: BriefcaseBusiness },
  { name: "coffee", label: "Coffee", Icon: Coffee },
  { name: "house", label: "Home", Icon: House },
  { name: "plane", label: "Travel", Icon: Plane },
  { name: "graduation-cap", label: "Education", Icon: GraduationCap },
  { name: "gift", label: "Gifts", Icon: Gift },
  { name: "smartphone", label: "Phone", Icon: Smartphone },
  { name: "circle-dollar", label: "Money", Icon: CircleDollarSign },
  { name: "receipt", label: "Bills", Icon: Receipt },
  { name: "gamepad", label: "Entertainment", Icon: Gamepad2 },
  { name: "dumbbell", label: "Fitness", Icon: Dumbbell },
  { name: "tag", label: "Other", Icon: Tag },
];

const colorOptions = [
  "#8211FA",
  "#16A34A",
  "#0891B2",
  "#EA580C",
  "#2563EB",
  "#DB2777",
  "#CA8A04",
  "#DC2626",
];

const iconMap = {
  wallet: Wallet,
  laptop: Laptop,
  "trending-up": TrendingUp,
  utensils: Utensils,
  car: Car,
  "shopping-bag": ShoppingBag,
  zap: Zap,
  "heart-pulse": HeartPulse,
  briefcase: BriefcaseBusiness,
  coffee: Coffee,
  house: House,
  plane: Plane,
  "graduation-cap": GraduationCap,
  gift: Gift,
  smartphone: Smartphone,
  "circle-dollar": CircleDollarSign,
  receipt: Receipt,
  gamepad: Gamepad2,
  dumbbell: Dumbbell,
  tag: Tag,
};

const emptyForm = {
  name: "",
  type: "Expense",
  icon: "tag",
  color: "#8211FA",
  description: "",
};

function Categories() {
  const [emoji, setEmoji] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [categories, setCategories] = useState(initialCategories);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [toast, setToast] = useState("");

  const filteredCategories = useMemo(() => {
    return categories.filter((category) => {
      const matchesTab = activeTab === "All" || category.type === activeTab;

      const matchesSearch =
        category.name.toLowerCase().includes(search.toLowerCase()) ||
        category.description.toLowerCase().includes(search.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [categories, activeTab, search]);

  const incomeCount = categories.filter(
    (category) => category.type === "Income",
  ).length;

  const expenseCount = categories.filter(
    (category) => category.type === "Expense",
  ).length;

  const showToast = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2500);
  };

  const openAddModal = () => {
    setEditingCategory(null);
    setForm(emptyForm);
    setModalOpen(true);
  };

  const openEditModal = (category) => {
    setEditingCategory(category);
    setForm({
      name: category.name,
      type: category.type,
      icon: category.icon,
      color: category.color,
      description: category.description,
    });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingCategory(null);
    setForm(emptyForm);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = form.name.trim();

    if (!name) return;

    const duplicate = categories.some(
      (category) =>
        category.name.toLowerCase() === name.toLowerCase() &&
        category.type === form.type &&
        category.id !== editingCategory?.id,
    );

    if (duplicate) {
      showToast("This category already exists.");
      return;
    }

    if (editingCategory) {
      setCategories((previous) =>
        previous.map((category) =>
          category.id === editingCategory.id
            ? { ...category, ...form, name }
            : category,
        ),
      );

      showToast("Category updated successfully.");
    } else {
      setCategories((previous) => [
        ...previous,
        {
          id: Date.now(),
          ...form,
          name,
        },
      ]);

      showToast("Category added successfully.");
    }

    closeModal();
  };

  const confirmDelete = () => {
    if (!deletingCategory) return;

    setCategories((previous) =>
      previous.filter((category) => category.id !== deletingCategory.id),
    );

    setDeletingCategory(null);
    showToast("Category deleted successfully.");
  };

  return (
    <div className="space-y-7">
      {/* Page header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">
            Categories
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Organize your income and expenses into categories.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#8211FA] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-purple-500/20 transition hover:bg-purple-700"
        >
          <Plus size={19} />
          Add Category
        </button>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <SummaryBox
          title="Total Categories"
          count={categories.length}
          icon={Tag}
          color="purple"
        />

        <SummaryBox
          title="Income Categories"
          count={incomeCount}
          icon={TrendingUp}
          color="green"
        />

        <SummaryBox
          title="Expense Categories"
          count={expenseCount}
          icon={Receipt}
          color="orange"
        />
      </div>

      {/* Category listing */}
      <section className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-[#17141C]">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Your Categories
            </h2>

            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage your financial categories.
            </p>
          </div>

          <div className="relative w-full lg:max-w-xs">
            <Search
              size={18}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search categories..."
              className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-10 pr-4 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#8211FA] focus:ring-4 focus:ring-purple-100 dark:border-white/10 dark:bg-[#211C29] dark:text-white dark:focus:ring-purple-950"
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex gap-2 overflow-x-auto border-b border-gray-100 pb-3 dark:border-white/10">
          {[
            { label: "All", count: categories.length },
            { label: "Income", count: incomeCount },
            { label: "Expense", count: expenseCount },
          ].map((tab) => (
            <button
              key={tab.label}
              onClick={() => setActiveTab(tab.label)}
              className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition ${
                activeTab === tab.label
                  ? "bg-[#8211FA] !text-white"
                  : "text-gray-500 hover:bg-purple-50 hover:text-[#8211FA] dark:text-gray-400 dark:hover:bg-purple-950/50"
              }`}
            >
              {tab.label}

              <span
                className={`rounded-full px-2 py-0.5 text-xs ${
                  activeTab === tab.label
                    ? "bg-white/20 text-white"
                    : "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300"
                }`}
              >
                {tab.count}
              </span>
            </button>
          ))}
        </div>

        {/* Category cards */}
        {filteredCategories.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
            {filteredCategories.map((category) => {
              const Icon = iconMap[category.icon] || CircleHelp;

              return (
                <article
                  key={category.id}
                  className="group rounded-2xl border border-gray-200 p-4 transition hover:border-purple-200 hover:shadow-md dark:border-white/10 dark:hover:border-purple-800"
                >
                  <div className="flex items-start gap-3">
                    <div
                      className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl"
                      style={{
                        color: category.color,
                        backgroundColor: `${category.color}18`,
                      }}
                    >
                      <Icon size={23} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <h3 className="truncate font-semibold text-gray-900 dark:text-white">
                        {category.name}
                      </h3>

                      <span
                        className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          category.type === "Income"
                            ? "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-400"
                            : "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-400"
                        }`}
                      >
                        {category.type}
                      </span>
                    </div>

                    <div className="flex gap-1 opacity-100 transition sm:opacity-0 sm:group-hover:opacity-100 sm:group-focus-within:opacity-100">
                      <button
                        onClick={() => openEditModal(category)}
                        aria-label={`Edit ${category.name}`}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-purple-50 hover:text-[#8211FA] dark:hover:bg-purple-950"
                      >
                        <Pencil size={16} />
                      </button>

                      <button
                        onClick={() => setDeletingCategory(category)}
                        aria-label={`Delete ${category.name}`}
                        className="rounded-lg p-2 text-gray-500 transition hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-950/40"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  <p className="mt-4 min-h-10 text-sm leading-5 text-gray-500 dark:text-gray-400">
                    {category.description || "No description provided."}
                  </p>

                  <div className="mt-4 flex items-center justify-between border-t border-gray-100 pt-3 dark:border-white/10">
                    <span className="text-xs text-gray-400">
                      Category #{category.id}
                    </span>

                    <span
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: category.color }}
                    />
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center py-16 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-purple-50 text-[#8211FA] dark:bg-purple-950">
              <Search size={24} />
            </div>

            <h3 className="mt-4 font-semibold text-gray-900 dark:text-white">
              No categories found
            </h3>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Try a different search or create a new category.
            </p>

            <button
              onClick={openAddModal}
              className="mt-4 font-semibold text-[#8211FA] hover:underline"
            >
              Add a category
            </button>
          </div>
        )}

        <div className="mt-6 border-t border-gray-100 pt-4 text-sm text-gray-500 dark:border-white/10 dark:text-gray-400">
          Showing {filteredCategories.length} of {categories.length} categories
        </div>
      </section>

      {/* Add/Edit modal */}
      {modalOpen && (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center overflow-y-auto bg-black/50 p-4 backdrop-blur-sm"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeModal();
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="category-modal-title"
            className="my-auto w-full max-w-xl rounded-2xl border border-gray-200 bg-white shadow-2xl dark:border-white/10 dark:bg-[#1B1721]"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-5 py-5 sm:px-6 dark:border-white/10">
              <div>
                <h2
                  id="category-modal-title"
                  className="text-xl font-bold text-gray-900 dark:text-white"
                >
                  {editingCategory ? "Edit Category" : "Add Category"}
                </h2>

                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  {editingCategory
                    ? "Update your category details."
                    : "Create a category to organize your finances."}
                </p>
              </div>

              <button
                onClick={closeModal}
                aria-label="Close modal"
                className="rounded-xl p-2 text-gray-500 hover:bg-gray-100 dark:hover:bg-white/10"
              >
                <X size={21} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="max-h-[65vh] space-y-5 overflow-y-auto px-5 py-5 sm:px-6">
                <div>
                  <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Choose Icon
                  </label>
                  <div>
                    <span size={20}> {emoji}</span>
                    <button onClick={() => setShowPicker(!showPicker)}>
                      Select Emoji
                    </button>

                    {showPicker && (
                      <EmojiPicker
                        onEmojiClick={(emojiData) => {
                          setEmoji(emojiData.emoji);
                          setShowPicker(false);
                        }}
                      />
                    )}
                  </div>
                  <br />
                  <label
                    htmlFor="category-name"
                    className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Category Name <span className="text-red-500">*</span>
                  </label>

                  <input
                    id="category-name"
                    autoFocus
                    required
                    maxLength={50}
                    value={form.name}
                    onChange={(event) =>
                      setForm({ ...form, name: event.target.value })
                    }
                    placeholder="e.g. Groceries"
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#8211FA] focus:ring-4 focus:ring-purple-100 dark:border-white/10 dark:bg-[#211C29] dark:text-white dark:focus:ring-purple-950"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Category Type
                  </label>

                  <div className="grid grid-cols-2 gap-3">
                    {["Income", "Expense"].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setForm({ ...form, type })}
                        className={`rounded-xl border px-4 py-3 text-sm font-semibold transition ${
                          form.type === type
                            ? type === "Income"
                              ? "border-green-500 bg-green-50 text-green-700 ring-2 ring-green-100 dark:bg-green-950"
                              : "border-orange-500 bg-orange-50 text-orange-700 ring-2 ring-orange-100 dark:bg-orange-950"
                            : "border-gray-200 text-gray-600 hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5"
                        }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* <div>
                  <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Choose Icon
                  </label>

                  <div className="grid grid-cols-5 gap-2 sm:grid-cols-10">
                    {iconOptions.map(({ name, label, Icon }) => (
                      <button
                        key={name}
                        type="button"
                        title={label}
                        aria-label={`Choose ${label} icon`}
                        aria-pressed={form.icon === name}
                        onClick={() => setForm({ ...form, icon: name })}
                        className={`flex aspect-square items-center justify-center rounded-xl border transition ${
                          form.icon === name
                            ? "border-[#8211FA] bg-purple-50 text-[#8211FA] ring-2 ring-purple-200 dark:bg-purple-950"
                            : "border-gray-200 text-gray-500 hover:border-purple-300 hover:text-[#8211FA] dark:border-white/10 dark:text-gray-400"
                        }`}
                      >
                        <Icon size={20} />
                      </button>
                    ))}
                  </div>
                </div> */}

                {/* <div>
                  <label className="mb-3 block text-sm font-semibold text-gray-700 dark:text-gray-200">
                    Choose Color
                  </label>

                  <div className="flex flex-wrap gap-3">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        type="button"
                        aria-label={`Choose color ${color}`}
                        aria-pressed={form.color === color}
                        onClick={() => setForm({ ...form, color })}
                        className={`flex h-9 w-9 items-center justify-center rounded-full transition ${
                          form.color === color
                            ? "ring-2 ring-offset-2 ring-[#8211FA] dark:ring-offset-[#1B1721]"
                            : ""
                        }`}
                        style={{ backgroundColor: color }}
                      >
                        {form.color === color && (
                          <Check size={17} className="text-white" />
                        )}
                      </button>
                    ))}
                  </div>
                </div> */}

                <div>
                  <label
                    htmlFor="category-description"
                    className="mb-2 block text-sm font-semibold text-gray-700 dark:text-gray-200"
                  >
                    Description
                    <span className="ml-2 font-normal text-gray-400">
                      (Optional)
                    </span>
                  </label>

                  <textarea
                    id="category-description"
                    rows={3}
                    maxLength={160}
                    value={form.description}
                    onChange={(event) =>
                      setForm({ ...form, description: event.target.value })
                    }
                    placeholder="What is this category used for?"
                    className="w-full resize-none rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-[#8211FA] focus:ring-4 focus:ring-purple-100 dark:border-white/10 dark:bg-[#211C29] dark:text-white dark:focus:ring-purple-950"
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-gray-100 px-5 py-4 sm:flex-row sm:justify-end sm:px-6 dark:border-white/10">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-xl border border-gray-200 px-5 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#8211FA] px-5 py-3 text-sm font-semibold text-white transition hover:bg-purple-700"
                >
                  <Check size={17} />
                  {editingCategory ? "Save Changes" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirmation */}
      {deletingCategory && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm">
          <div
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="delete-title"
            className="w-full max-w-md rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl dark:border-white/10 dark:bg-[#1B1721]"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600 dark:bg-red-950">
              <Trash2 size={23} />
            </div>

            <h2
              id="delete-title"
              className="mt-4 text-xl font-bold text-gray-900 dark:text-white"
            >
              Delete Category?
            </h2>

            <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
              Are you sure you want to delete{" "}
              <strong className="text-gray-900 dark:text-white">
                {deletingCategory.name}
              </strong>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                onClick={() => setDeletingCategory(null)}
                className="rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                onClick={confirmDelete}
                className="rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700"
              >
                Delete Category
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast notification */}
      {toast && (
        <div
          role="status"
          className="fixed bottom-5 right-5 z-[100] flex max-w-sm items-center gap-3 rounded-xl border border-gray-200 bg-white px-5 py-4 shadow-xl dark:border-white/10 dark:bg-[#211C29]"
        >
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-400">
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

function SummaryBox({ title, count, icon: Icon, color }) {
  const styles = {
    purple: "bg-purple-50 text-[#8211FA] dark:bg-purple-950",
    green: "bg-green-50 text-green-600 dark:bg-green-950 dark:text-green-400",
    orange:
      "bg-orange-50 text-orange-600 dark:bg-orange-950 dark:text-orange-400",
  };

  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#17141C]">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </p>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${styles[color]}`}
        >
          <Icon size={20} />
        </div>
      </div>

      <p className="mt-4 text-3xl font-bold text-gray-900 dark:text-white">
        {count}
      </p>

      <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
        Categories available
      </p>
    </div>
  );
}

export default Categories;
