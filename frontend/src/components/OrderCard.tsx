import Link from "next/link";
import type { RepairOrder } from "@/lib/types";

export function OrderCard({ order }: { order: RepairOrder }) {
  return (
    <Link href={`/orders/${order.id}`} className="block rounded border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="font-semibold">{order.title}</h2>
          <p className="text-sm text-slate-500">{order.vehicle?.plateNumber} - {order.status}</p>
        </div>
        <p className="font-semibold">{order.totalPrice.toFixed(2)} EUR</p>
      </div>
      <p className="mt-3 text-sm text-slate-600">{order.description}</p>
    </Link>
  );
}
