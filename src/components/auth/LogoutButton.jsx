"use client";

import { Button } from "@material-tailwind/react";
import { signOut } from "next-auth/react";

export default function LogoutButton() {
  return <Button onClick={() => signOut()}>Cerrar Sesión</Button>;
}
