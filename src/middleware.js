import { NextResponse } from "next/server";
import ROUTES from "@/constants/routes";

export function middleware(req) {
  const token = req.cookies.get("jwt");
  const url = req.nextUrl.clone();

  const publicRoutes = Object.values(ROUTES.PUBLIC);
  const protectedRoutes = Object.values(ROUTES.PROTECTED);

  if (token) {
    if (protectedRoutes.some((route) => url.pathname.startsWith(route))) {
      return NextResponse.next();
    }

    if (publicRoutes.some((route) => url.pathname.startsWith(route))) {
      url.pathname = ROUTES.PROTECTED.DASHBOARD;
      return NextResponse.redirect(url);
    }
  }

  // Si el usuario no está autenticado
  if (!token) {
    if (publicRoutes.some((route) => url.pathname.startsWith(route))) {
      return NextResponse.next();
    }

    if (protectedRoutes.some((route) => url.pathname.startsWith(route))) {
      url.pathname = ROUTES.PUBLIC.LOGIN;
      return NextResponse.redirect(url);
    }
  }

  // Permite continuar con la solicitud si no se cumplen las condiciones anteriores
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/:path*", // Rutas públicas
    "/dashboard/:path*", // Rutas protegidas
    "/profile/:path*", // Rutas protegidas
    "/settings/:path*", // Rutas protegidas
    "/orders/:path*", // Rutas protegidas
    "/admin/:path*", // Rutas protegidas
  ],
};
