import { Register } from "@/components/pages/auth/Register";
import { title } from "process";

export const metadata = {
  title: "Maker Marker | Registrate",
  description: "Ingresa tus datos para iniciar sesión en Maker Market",
};

export default function RegisterPage() {
  return (
    <Register
      title={registerData.title}
      description={registerData.description}
    />
  );
}

const registerData = {
  title: "Maker Marker | Regístrate",
  description: "Crea un nuevo Usuario de Maker Market",
};
