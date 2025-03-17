"use client";

export default function LogoutButton() {
  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login"; // Redirigir al login después de cerrar sesión
  };

  return <button onClick={handleLogout}>Cerrar Sesión</button>;
}
