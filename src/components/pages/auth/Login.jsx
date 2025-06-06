"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // Importa useRouter
import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";
import ROUTES from "@/constants/routes";
import { signIn } from "next-auth/react";

export function Login(params) {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push(ROUTES.PROTECTED.DASHBOARD);
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
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
          onSubmit={handleLogin}
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
              </AnimatePresence> // Mostrar el error solo si existe
            )}
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
                <i onClick={togglePasswordVisiblity}>
                  {passwordShown ? (
                    <EyeIcon className="h-5 w-5" />
                  ) : (
                    <EyeSlashIcon className="h-5 w-5" />
                  )}
                </i>
              }
            />
          </div>
          <Button
            type="submit"
            color="gray"
            size="lg"
            className="mt-6"
            fullWidth
          >
            sign in
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
              onClick={() => router.push(ROUTES.PUBLIC.REGISTER)}
              as="button"
              href="#"
              className=" underline ml-1"
            >
              Register here.
            </Typography>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Login;
