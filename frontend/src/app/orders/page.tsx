"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { OrderCard } from "@/components/OrderCard";
import { api } from "@/lib/api";
import type { RepairOrder } from "@/lib/types";

export default function OrdersPage() {
  const [orders, setOrders] = useState<RepairOrder[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api<RepairOrder[]>("/api/orders").then(setOrders).catch((err) => setError(err instanceof Error ? err.message : "Erreur de chargement"));
  }, []);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-5 py-6">
        <h1 className="text-2xl font-bold">Interventions</h1>
        {error && <p className="mt-4 rounded bg-red-50 p-3 text-red-700">{error}</p>}
        <div className="mt-6 grid gap-4">
          {orders.map((order) => <OrderCard key={order.id} order={order} />)}
        </div>
      </main>
    </>
  );
}
