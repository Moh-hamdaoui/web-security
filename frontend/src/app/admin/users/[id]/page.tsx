"use client";

import { FormEvent, useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { api } from "@/lib/api";
import type { User } from "@/lib/types";

export default function AdminUserDetailPage({ params }: { params: { id: string } }) {
  const [user, setUser] = useState<User | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    api<User>(`/api/users/${params.id}`).then(setUser).catch((err) => setError(err instanceof Error ? err.message : "Erreur de chargement"));
  }, [params.id]);

  async function submit(event: FormEvent) {
    event.preventDefault();
    if (!user) return;
    const updated = await api<User>(`/api/users/${params.id}`, {
      method: "PUT",
      json: {
        displayName: user.displayName,
        phone: user.phone,
        internalNote: user.internalNote
      }
    });
    setUser(updated);
    setMessage("Utilisateur enregistré");
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-3xl px-5 py-6">
        <h1 className="text-2xl font-bold">Détail utilisateur</h1>
        {error && <p className="mt-4 rounded bg-red-50 p-3 text-red-700">{error}</p>}
        {user && (
          <form onSubmit={submit} className="mt-6 rounded border border-slate-200 bg-white p-5">
            <label className="mb-4 block text-sm font-medium">
              Nom affiché
              <input className="mt-1 w-full rounded border border-slate-300 px-3 py-2" value={user.displayName} onChange={(e) => setUser({ ...user, displayName: e.target.value })} />
            </label>
            <label className="mb-4 block text-sm font-medium">
              Téléphone
              <input className="mt-1 w-full rounded border border-slate-300 px-3 py-2" value={user.phone || ""} onChange={(e) => setUser({ ...user, phone: e.target.value })} />
            </label>
            <label className="mb-4 block text-sm font-medium">
              Note interne
              <textarea className="mt-1 min-h-24 w-full rounded border border-slate-300 px-3 py-2" value={user.internalNote || ""} onChange={(e) => setUser({ ...user, internalNote: e.target.value })} />
            </label>
            <button className="rounded bg-slate-900 px-4 py-2 font-medium text-white">Enregistrer</button>
            {message && <p className="mt-4 text-sm text-emerald-700">{message}</p>}
          </form>
        )}
      </main>
    </>
  );
}
