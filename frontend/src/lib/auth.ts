import type { User } from "./types";

const tokenKey = "garagehub_token";
const userKey = "garagehub_user";

export function getToken() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem(tokenKey) || "";
}

export function saveSession(token: string, user: User) {
  localStorage.setItem(tokenKey, token);
  localStorage.setItem(userKey, JSON.stringify(user));
}

export function getStoredUser(): User | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(userKey);
  return raw ? (JSON.parse(raw) as User) : null;
}

export function clearSession() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(userKey);
}
