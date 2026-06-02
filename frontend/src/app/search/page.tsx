"use client";

import { FormEvent, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { api } from "@/lib/api";

type SearchRow = {
  id: number;
  title: string;
  description: string;
  status: string;
  totalPrice: number;
  plateNumber: string;
};

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [rows, setRows] = useState<SearchRow[]>([]);
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    try {
      const data = await api<SearchRow[]>(`/api/search?q=${encodeURIComponent(q)}`);
      setRows(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur de recherche");
    }
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-5 py-6">
        <h1 className="text-2xl font-bold">Recherche</h1>
        <form onSubmit={submit} className="mt-6 flex gap-3">
          <input className="min-w-0 flex-1 rounded border border-slate-300 px-3 py-2" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Titre ou description" />
          <button className="rounded bg-slate-900 px-4 py-2 font-medium text-white">Rechercher</button>
        </form>
        {error && <p className="mt-4 rounded bg-red-50 p-3 text-red-700">{error}</p>}
        <div className="mt-6 grid gap-3">
          {rows.map((row) => (
            <article key={row.id} className="rounded border border-slate-200 bg-white p-4">
              <div className="flex justify-between gap-4">
                <h2 className="font-semibold">{row.title}</h2>
                <span>{row.totalPrice?.toFixed?.(2) || row.totalPrice} EUR</span>
              </div>
              <p className="text-sm text-slate-600">{row.description}</p>
              <p className="mt-2 text-xs text-slate-500">{row.plateNumber} - {row.status}</p>
            </article>
          ))}
        </div>
      </main>
    </>
  );
}
