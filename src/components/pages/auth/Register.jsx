"use client";
import { useState } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import ROUTES from "@/constants/routes";

export function Register(params) {
  const [passwordShown, setPasswordShown] = useState(false);
  const [confirmPasswordShown, setConfirmPasswordShown] = useState(false);
  const togglePasswordVisibility = () => setPasswordShown((cur) => !cur);
  const toggleConfirmPasswordVisibility = () =>
    setConfirmPasswordShown((cur) => !cur);

  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const router = useRouter(); // Inicializa el hook useRouterco
  const [registrado, setRegistrado] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    // Verificar si las contraseñas coinciden
    if (password !== confirmPassword) {
      setPasswordError("Las contraseñas no coinciden");
      return;
    }

    setPasswordError(""); // Limpia el error si las contraseñas coinciden

    try {
      // Aquí puedes realizar la lógica para registrar al usuario
      console.log("Datos enviados:", { name, email, password });

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          name: name,
          password: password,
        }),
      });
      const response = await res.json();

      console.log(response);
      if (response.status == 200) {
        setRegistrado(true);
        setTimeout(() => {
          router.push(ROUTES.PUBLIC.LOGIN);
        }, 3000);
      }
    } catch (error) {
      console.error("Error al registrar:", error);
      setError("Ocurrió un error inesperado. Inténtalo de nuevo.");
    }
  };

  const handleLoginGoogle = async () => {
    try {
      // Inicia sesión con Google
      await signIn("google");
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };
  return (
    <section className="grid text-center h-[90vh] items-center p-8">
      <div>
        <Typography variant="h3" color="blue-gray" className="mb-2">
          {params.title}
        </Typography>
        <Typography className="mb-16 text-gray-600 font-normal text-[18px]">
          {params.description}
        </Typography>
        <form
          onSubmit={handleRegister}
          className="mx-auto max-w-[24rem] text-left"
        >
          <div className="mb-6">
            {error && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  key="box"
                  className="bg-red-200 border-red-600 text-red-600 border-l-4 p-4"
                  role="alert"
                >
                  <p className="font-bold">Error</p>
                  <p>{error}</p>
                </motion.div>
              </AnimatePresence>
            )}
            {registrado && (
              <AnimatePresence>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0 }}
                  key="box"
                  className="bg-green-200 border-green-600 text-green-600 border-l-4 p-4"
                  role="alert"
                >
                  <p className="font-bold">Exito</p>
                  <p>Usuario Creado con Exito | Rediriguiendote al login...</p>
                </motion.div>
              </AnimatePresence>
            )}
            <label htmlFor="name">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Tu Nombre
              </Typography>
            </label>
            <Input
              required
              id="name"
              color="gray"
              size="lg"
              type="text"
              name="name"
              placeholder="Tu nombre completo"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Tu Email
              </Typography>
            </label>
            <Input
              required
              id="email"
              color="gray"
              size="lg"
              type="email"
              name="email"
              placeholder="name@mail.com"
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              labelProps={{
                className: "hidden",
              }}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Tu contraseña
              </Typography>
            </label>
            <Input
              required
              size="lg"
              placeholder="********"
              id="password"
              name="password"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={passwordShown ? "text" : "password"}
              icon={
                <i onClick={togglePasswordVisibility}>
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
            />
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Confirmar contraseña
              </Typography>
            </label>
            <Input
              required
              size="lg"
              placeholder="********"
              id="confirmPassword"
              name="confirmPassword"
              labelProps={{
                className: "hidden",
              }}
              className="w-full placeholder:opacity-100 focus:border-t-primary border-t-blue-gray-200"
              type={confirmPasswordShown ? "text" : "password"}
              icon={
                <i onClick={toggleConfirmPasswordVisibility}>
                  {confirmPasswordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
            />
          </div>
          {passwordError && (
            <p className="text-red-500 text-sm mb-4">{passwordError}</p>
          )}
          <Button
            type="submit"
            color="gray"
            size="lg"
            className="mt-6"
            fullWidth
          >
            Registrarse
          </Button>
          <Button
            variant="outlined"
            size="lg"
            className="mt-6 flex h-12 items-center justify-center gap-2"
            fullWidth
            onClick={handleLoginGoogle}
          >
            <img
              src={`https://www.material-tailwind.com/logos/logo-google.png`}
              alt="google"
              className="h-6 w-6"
            />{" "}
            sign in with google
          </Button>
          <div className="pt-12 pb-12 text-center flex">
            <p>Don&#x27;t have an account?</p>
            <Typography
              onClick={() => router.push(ROUTES.PUBLIC.LOGIN)}
              as="button"
              href="#"
              className=" underline ml-1"
            >
              Lon In here.
            </Typography>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Register;
