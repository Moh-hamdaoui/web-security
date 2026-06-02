"use client";

import { FormEvent, useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { api } from "@/lib/api";
import type { User } from "@/lib/types";

export default function ProfilePage() {
  const [profile, setProfile] = useState<User | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api<User>("/api/auth/me").then(setProfile).catch((err) => setError(err instanceof Error ? err.message : "Erreur de chargement"));
  }, []);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!profile) return;
    setMessage("");
    const data = await api<User>("/api/auth/me", {
      method: "PUT",
      json: {
        displayName: profile.displayName,
        phone: profile.phone
      }
    });
    setProfile(data);
    setMessage("Profil enregistré");
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-5 py-6">
        <h1 className="text-2xl font-bold">Profil</h1>
        {error && <p className="mt-4 rounded bg-red-50 p-3 text-red-700">{error}</p>}
        {profile && (
          <form onSubmit={submit} className="mt-6 rounded border border-slate-200 bg-white p-5">
            <label className="mb-4 block text-sm font-medium">
              Nom affiché
              <input className="mt-1 w-full rounded border border-slate-300 px-3 py-2" value={profile.displayName} onChange={(e) => setProfile({ ...profile, displayName: e.target.value })} />
            </label>
            <label className="mb-4 block text-sm font-medium">
              Téléphone
              <input className="mt-1 w-full rounded border border-slate-300 px-3 py-2" value={profile.phone || ""} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} />
            </label>
            <button className="rounded bg-slate-900 px-4 py-2 font-medium text-white">Enregistrer</button>
            {message && <p className="mt-4 text-sm text-emerald-700">{message}</p>}
          </form>
        )}
      </main>
    </>
  );
}
