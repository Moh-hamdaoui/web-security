"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/login");
  }, [router]);

  return (
    <main>
      <h1>Redirection vers la page de connexion...</h1>
      <p>Si la redirection ne fonctionne pas, <a href="/login">clique ici</a>.</p>
    </main>
  );
}
