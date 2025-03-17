"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await fetch("/api/auth/me", {
        credentials: "include", // Asegura que las cookies se incluyan en la solicitud
      });

      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        router.push("/login"); // Redirige al login si no está autenticado
      }
    };

    fetchUser();
  }, [router]);

  return user ? (
    <div>
      <h1>Bienvenido {user.username}</h1>
      {/* Mostrar contenido protegido */}
    </div>
  ) : (
    <p>Cargando...</p>
  );
}
