"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { api } from "@/lib/api";
import type { RepairOrder, User, Vehicle } from "@/lib/types";

export default function DashboardPage() {
  const [me, setMe] = useState<User | null>(null);
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [orders, setOrders] = useState<RepairOrder[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    Promise.all([
      api<User>("/api/auth/me"),
      api<Vehicle[]>("/api/vehicles"),
      api<RepairOrder[]>("/api/orders")
    ])
      .then(([profile, vehicleList, orderList]) => {
        setMe(profile);
        setVehicles(vehicleList);
        setOrders(orderList);
      })
      .catch((err) => setError(err instanceof Error ? err.message : "Erreur de chargement"));
  }, []);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-5 py-6">
        <h1 className="text-2xl font-bold">Tableau de bord</h1>
        {error && <p className="mt-4 rounded bg-red-50 p-3 text-red-700">{error}</p>}
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          <section className="rounded border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-500">Profil</p>
            <p className="mt-2 text-xl font-semibold">{me?.displayName || "-"}</p>
          </section>
          <section className="rounded border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-500">Véhicules</p>
            <p className="mt-2 text-3xl font-bold">{vehicles.length}</p>
          </section>
          <section className="rounded border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-500">Interventions</p>
            <p className="mt-2 text-3xl font-bold">{orders.length}</p>
          </section>
        </div>
      </main>
    </>
  );
}
