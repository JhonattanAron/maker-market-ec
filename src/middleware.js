import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import ROUTES from "./constants/routes";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const url = req.nextUrl.clone();

  const hiddenForAuthenticated = [ROUTES.PUBLIC.LOGIN, ROUTES.PUBLIC.REGISTER];

  const protectedRoutes = Object.values(ROUTES.PROTECTED);

  if (
    token &&
    hiddenForAuthenticated.some((route) => url.pathname.startsWith(route))
  ) {
    url.pathname = ROUTES.PROTECTED.DASHBOARD;
    return NextResponse.redirect(url);
  }

  if (
    !token &&
    protectedRoutes.some((route) => url.pathname.startsWith(route))
  ) {
    url.pathname = ROUTES.PUBLIC.LOGIN;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/auth/login",
    "/auth/register",
    "/dashboard/:path*",
    "/profile/:path*",
    "/settings/:path*",
    "/orders/:path*",
    "/admin/:path*",
  ],
};
