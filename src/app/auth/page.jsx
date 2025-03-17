import Login from "@/components/pages/auth/Login";

export const metadata = {
  title: "Login",
  description: "Login page",
};

export default function loginPage() {
  return <Login title={LoginData.title} description={LoginData.description} />;
}

const LoginData = {
  title: "Maker Marker | Inicia Sesión",
  description: "Ingresa tus datos para iniciar sesión en Maker Market",
};
