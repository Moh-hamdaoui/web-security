"use client";

import { FormEvent, useState } from "react";
import { api } from "@/lib/api";
import type { Comment } from "@/lib/types";

export function CommentForm({ orderId, onCreated }: { orderId: number; onCreated: (comment: Comment) => void }) {
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  async function submit(event: FormEvent) {
    event.preventDefault();
    setError("");
    try {
      const comment = await api<Comment>(`/api/orders/${orderId}/comments`, {
        method: "POST",
        json: { content }
      });
      setContent("");
      onCreated(comment);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur d'envoi");
    }
  }

  return (
    <form onSubmit={submit} className="rounded border border-slate-200 bg-white p-4">
      <textarea className="min-h-28 w-full rounded border border-slate-300 px-3 py-2" value={content} onChange={(e) => setContent(e.target.value)} placeholder="Ajouter un commentaire" />
      <button className="mt-3 rounded bg-slate-900 px-4 py-2 font-medium text-white">Ajouter</button>
      {error && <p className="mt-3 text-sm text-red-700">{error}</p>}
    </form>
  );
}
