import Link from "next/link";
import type { User } from "@/lib/types";

export function UserTable({ users }: { users: User[] }) {
  return (
    <div className="overflow-hidden rounded border border-slate-200 bg-white">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-3">Nom</th>
            <th className="p-3">Email</th>
            <th className="p-3">Téléphone</th>
            <th className="p-3">Détail</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} className="border-t border-slate-100">
              <td className="p-3">{user.displayName}</td>
              <td className="p-3">{user.email}</td>
              <td className="p-3">{user.phone}</td>
              <td className="p-3"><Link className="font-medium text-slate-900" href={`/admin/users/${user.id}`}>Ouvrir</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
