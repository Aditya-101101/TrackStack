export const isTokenExpired = (token) => {
  try {
    if (!token) return true;

    const payload = JSON.parse(atob(token.split(".")[1]));

    if (!payload.exp) return true;

    return payload.exp < Date.now() / 1000;
  } catch (error) {
    return true;
  }
};

export const clearAuthStorage = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};