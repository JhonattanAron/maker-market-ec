"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@material-tailwind/react";

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

  const profileImg = "https://www.tailwind-kit.com/images/person/1.jpg";
  const landScapeImg = "https://www.tailwind-kit.com/images/landscape/1.jpg";
  const Zona = "Ecuador - Quito - Pifo";

  return user ? (
    <div className="w-full h-full flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-2xl w-80 dark:bg-gray-800 mt-[10%] sm:mt-[5%]">
        <img
          alt="profil"
          src={landScapeImg}
          className="w-full mb-4 rounded-t-lg h-28"
        />
        <div className="flex flex-col items-center justify-center p-4 -mt-16">
          <a href="#" className="relative block">
            <img
              alt="profil"
              src={profileImg}
              className="mx-auto object-cover rounded-full h-16 w-16  border-2 border-white dark:border-gray-800"
            />
          </a>
          <p className="mt-2 text-xl font-medium text-gray-800 dark:text-white">
            {user.username}
          </p>
          <p className="mb-4 text-xs text-gray-400">{Zona}</p>
          <Button className="p-2 px-4 text-xs text-white bg-pink-500 rounded-full">
            Editar Perfil
          </Button>
          <div className="w-full p-2 mt-4 rounded-lg">
            <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-200">
              <p className="flex flex-col">
                Pedidos
                <span className="font-bold text-black dark:text-white">34</span>
              </p>
              <p className="flex flex-col">
                Recibidos
                <span className="font-bold text-black dark:text-white">
                  455
                </span>
              </p>
              <p className="flex flex-col">
                Calificacion
                <span className="font-bold text-black dark:text-white">
                  9.3
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p>Cargando...</p>
  );
}
