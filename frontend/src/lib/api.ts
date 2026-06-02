import { getToken } from "./auth";

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:4000";

type ApiOptions = RequestInit & {
  json?: unknown;
};

export async function api<T>(path: string, options: ApiOptions = {}): Promise<T> {
  const token = getToken();
  const headers = new Headers(options.headers);
  if (token) headers.set("Authorization", `Bearer ${token}`);
  if (options.json !== undefined) headers.set("Content-Type", "application/json");

  const response = await fetch(`${apiUrl}${path}`, {
    ...options,
    headers,
    body: options.json !== undefined ? JSON.stringify(options.json) : options.body
  });

  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.message || "Request failed");
  }
  return data as T;
}
