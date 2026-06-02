"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { CommentForm } from "@/components/CommentForm";
import { CommentList } from "@/components/CommentList";
import { api } from "@/lib/api";
import type { Comment, RepairOrder } from "@/lib/types";

export default function OrderDetailPage({ params }: { params: { id: string } }) {
  const [order, setOrder] = useState<RepairOrder | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<RepairOrder>(`/api/orders/${params.id}`).then(setOrder).catch((err) => setError(err instanceof Error ? err.message : "Erreur de chargement"));
  }, [params.id]);

  function addComment(comment: Comment) {
    if (!order) return;
    setOrder({ ...order, comments: [...(order.comments || []), comment] });
  }

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-5 py-6">
        <h1 className="text-2xl font-bold">Détail intervention</h1>
        {error && <p className="mt-4 rounded bg-red-50 p-3 text-red-700">{error}</p>}
        {order && (
          <section className="mt-6 space-y-6">
            <div className="rounded border border-slate-200 bg-white p-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold">{order.title}</h2>
                  <p className="mt-2 text-slate-600">{order.description}</p>
                  <p className="mt-2 text-sm text-slate-500">{order.vehicle?.brand} {order.vehicle?.model} - {order.vehicle?.plateNumber}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{order.totalPrice.toFixed(2)} EUR</p>
                  <p className="text-sm text-slate-500">{order.status}</p>
                </div>
              </div>
            </div>
            <CommentForm orderId={order.id} onCreated={addComment} />
            <CommentList comments={order.comments || []} />
          </section>
        )}
      </main>
    </>
  );
}
