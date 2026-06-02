"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { clearSession, getStoredUser } from "@/lib/auth";
import { api } from "@/lib/api";

export function Navbar() {
  const router = useRouter();
  const user = getStoredUser();

  async function logout() {
    await api("/api/auth/logout", { method: "POST" }).catch(() => undefined);
    clearSession();
    router.push("/login");
  }

  return (
    <nav className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-5 py-4">
        <Link href="/dashboard" className="text-xl font-bold">GarageHub</Link>
        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-700">
          <Link href="/dashboard">Dashboard</Link>
          <Link href="/profile">Profil</Link>
          <Link href="/vehicles">Véhicules</Link>
          <Link href="/orders">Interventions</Link>
          <Link href="/search">Recherche</Link>
          <Link href="/diagnostic">Diagnostic</Link>
          {user?.isAdmin && <Link href="/admin/users">Utilisateurs</Link>}
          <button onClick={logout} className="rounded bg-slate-900 px-3 py-2 text-white">Logout</button>
        </div>
      </div>
    </nav>
  );
}
