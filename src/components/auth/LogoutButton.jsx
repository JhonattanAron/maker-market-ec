"use client";

import ROUTES from "@/constants/routes";
import { Button } from "@material-tailwind/react";

export default function LogoutButton() {
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = ROUTES.PUBLIC.LOGIN; // Redirigir al login después de cerrar sesión
  };

  return <Button onClick={handleLogout}>Cerrar Sesión</Button>;
}
