import Link from "next/link";
import type { Vehicle } from "@/lib/types";

export function VehicleCard({ vehicle }: { vehicle: Vehicle }) {
  return (
    <Link href={`/vehicles/${vehicle.id}`} className="block rounded border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold">{vehicle.brand} {vehicle.model}</h2>
          <p className="text-sm text-slate-500">{vehicle.plateNumber}</p>
        </div>
        <span className="rounded bg-slate-100 px-2 py-1 text-sm">{vehicle.mileage.toLocaleString("fr-FR")} km</span>
      </div>
      <p className="mt-3 text-sm text-slate-600">VIN {vehicle.vin}</p>
    </Link>
  );
}
