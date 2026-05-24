export const applyTheme = (theme) => {

  const root = window.document.documentElement;

  root.classList.remove("light", "dark");

  if (theme === "dark") {
    root.classList.add("dark");
  } else {
    root.classList.add("light");
  }

  localStorage.setItem("theme", theme);
};

export const getStoredTheme = () => {
  return localStorage.getItem("theme") || "light";
};