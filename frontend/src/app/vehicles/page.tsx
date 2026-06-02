"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { VehicleCard } from "@/components/VehicleCard";
import { api } from "@/lib/api";
import type { Vehicle } from "@/lib/types";

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api<Vehicle[]>("/api/vehicles").then(setVehicles).catch((err) => setError(err instanceof Error ? err.message : "Erreur de chargement"));
  }, []);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-5 py-6">
        <h1 className="text-2xl font-bold">Véhicules</h1>
        {error && <p className="mt-4 rounded bg-red-50 p-3 text-red-700">{error}</p>}
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {vehicles.map((vehicle) => <VehicleCard key={vehicle.id} vehicle={vehicle} />)}
        </div>
      </main>
    </>
  );
}
