"use client";
import { useState } from "react";

import { Typography, Input, Button } from "@material-tailwind/react";
import { EyeSlashIcon, EyeIcon } from "@heroicons/react/24/solid";

export function Login(params) {
  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => setPasswordShown((cur) => !cur);

  const handleLogin = async (e) => {
    e.preventDefault();

    console.log(JSON.stringify({ email, password }));

    //const res = await fetch("/api/auth/login", {
    //  method: "POST",
    //  headers: {
    //    "Content-Type": "application/json",
    //  },
    //  body: JSON.stringify({ email, password }),
    //});
    //
    //if (res.ok) {
    //  alert("Login exitoso");
    //} else {
    //  setError("Login fallido. Verifica tus credenciales");
    //}
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
            <label htmlFor="email">
              <Typography
                variant="small"
                className="mb-2 block font-medium text-gray-900"
              >
                Tu Email
              </Typography>
            </label>
            <Input
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
          <div className="!mt-4 flex justify-end">
            <Typography
              as="a"
              href="#"
              color="blue-gray"
              variant="small"
              className="font-medium"
            >
              Forgot password
            </Typography>
          </div>
          <Button
            variant="outlined"
            size="lg"
            className="mt-6 flex h-12 items-center justify-center gap-2"
            fullWidth
          >
            <img
              src={`https://www.material-tailwind.com/logos/logo-google.png`}
              alt="google"
              className="h-6 w-6"
            />{" "}
            sign in with google
          </Button>
          <Typography
            variant="small"
            color="gray"
            className="!mt-4 text-center font-normal"
          >
            Not registered?{" "}
            <a href="#" className="font-medium text-gray-900">
              Create account
            </a>
          </Typography>
        </form>
      </div>
    </section>
  );
}

export default Login;
