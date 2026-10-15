export const isAuthenticated = () => {
  const hasUser = Boolean(
    localStorage.getItem("moneyManagerUser") ||
    sessionStorage.getItem("moneyManagerUser"),
  );

  return hasUser;
};

export const getCurrentUser = () => {
  const user =
    localStorage.getItem("moneyManagerUser") ||
    sessionStorage.getItem("moneyManagerUser");

  if (!user) return null;

  try {
    return JSON.parse(user);
  } catch {
    return null;
  }
};

export const logoutUser = () => {
  localStorage.removeItem("moneyManagerUser");
  sessionStorage.removeItem("moneyManagerUser");
};
