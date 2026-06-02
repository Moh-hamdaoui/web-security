"use client";

import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { UserTable } from "@/components/UserTable";
import { api } from "@/lib/api";
import type { User } from "@/lib/types";

export default function AdminUsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    api<User[]>("/api/users").then(setUsers).catch((err) => setError(err instanceof Error ? err.message : "Erreur de chargement"));
  }, []);

  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-5 py-6">
        <h1 className="text-2xl font-bold">Utilisateurs</h1>
        {error && <p className="mt-4 rounded bg-red-50 p-3 text-red-700">{error}</p>}
        <div className="mt-6">
          <UserTable users={users} />
        </div>
      </main>
    </>
  );
}
