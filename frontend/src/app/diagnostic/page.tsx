"use client";

import { FormEvent, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { api } from "@/lib/api";

type DiagnosticResult = {
  command: string;
  output: string;
  error: string;
  stderr: string;
};

export default function DiagnosticPage() {
  const [host, setHost] = useState("127.0.0.1");
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    try {
      const data = await api<DiagnosticResult>("/api/diagnostic/ping", {
        method: "POST",
        json: { host }
      });
      setResult(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur diagnostic");
    }
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-5 py-6">
        <h1 className="text-2xl font-bold">Diagnostic réseau</h1>
        <form onSubmit={submit} className="mt-6 flex gap-3">
          <input className="min-w-0 flex-1 rounded border border-slate-300 px-3 py-2" value={host} onChange={(e) => setHost(e.target.value)} placeholder="Hôte" />
          <button className="rounded bg-slate-900 px-4 py-2 font-medium text-white">Tester</button>
        </form>
        {error && <p className="mt-4 rounded bg-red-50 p-3 text-red-700">{error}</p>}
        {result && (
          <pre className="mt-6 overflow-auto rounded bg-slate-950 p-4 text-sm text-slate-100">
{result.command}

{result.output}
{result.stderr}
{result.error}
          </pre>
        )}
      </main>
    </>
  );
}
