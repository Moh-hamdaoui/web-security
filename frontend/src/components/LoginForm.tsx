"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api";
import { saveSession } from "@/lib/auth";
import type { User } from "@/lib/types";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("user1@test.local");
  const [password, setPassword] = useState("Password123!");
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    try {
      const data = await api<{ token: string; user: User }>("/api/auth/login", {
        method: "POST",
        json: { email, password }
      });
      saveSession(data.token, data.user);
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Login failed");
    }
  }

  return (
    <form onSubmit={submit} className="mx-auto mt-16 max-w-sm rounded border border-slate-200 bg-white p-6 shadow-sm">
      <h1 className="mb-6 text-2xl font-bold">Connexion GarageHub</h1>
      <label className="mb-3 block text-sm font-medium">
        Email
        <input className="mt-1 w-full rounded border border-slate-300 px-3 py-2" value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label className="mb-4 block text-sm font-medium">
        Mot de passe
        <input className="mt-1 w-full rounded border border-slate-300 px-3 py-2" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button className="w-full rounded bg-slate-900 px-4 py-2 font-semibold text-white">Se connecter</button>
      {error && <p className="mt-4 rounded bg-red-50 p-3 text-sm text-red-700">{error}</p>}
    </form>
  );
}
