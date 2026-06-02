"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { OrderCard } from "@/components/OrderCard";
import { api } from "@/lib/api";
import type { Vehicle } from "@/lib/types";

export default function VehicleDetailPage({ params }: { params: { id: string } }) {
  const [vehicle, setVehicle] = useState<Vehicle | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    api<Vehicle>(`/api/vehicles/${params.id}`).then(setVehicle).catch((err) => setError(err instanceof Error ? err.message : "Erreur de chargement"));
  }, [params.id]);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-5xl px-5 py-6">
        <h1 className="text-2xl font-bold">Détail véhicule</h1>
        {error && <p className="mt-4 rounded bg-red-50 p-3 text-red-700">{error}</p>}
        {vehicle && (
          <section className="mt-6 space-y-6">
            <div className="rounded border border-slate-200 bg-white p-5">
              <h2 className="text-xl font-semibold">{vehicle.brand} {vehicle.model}</h2>
              <p className="mt-2 text-slate-600">{vehicle.plateNumber} - {vehicle.vin}</p>
              <p className="mt-1 text-slate-600">{vehicle.mileage.toLocaleString("fr-FR")} km</p>
            </div>
            <div className="grid gap-4">
              {vehicle.orders?.map((order) => <OrderCard key={order.id} order={{ ...order, vehicle }} />)}
            </div>
          </section>
        )}
      </main>
    </>
  );
}
