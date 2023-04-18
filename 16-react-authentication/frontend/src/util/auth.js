import { redirect } from "react-router-dom";

// Remaining time until logout
export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime;

  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");

  // Ako nije uopste storean token returna null
  if (!token) {
    return null;
  }

  // Ako jeste provjeri jel expired
  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  // Ako nije expired returna ga
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth");
  }

  return null; // Loader mora uvijek nesto returnati ili ce nastati error
}
