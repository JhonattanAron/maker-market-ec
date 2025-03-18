import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Logout exitoso" });

  response.cookies.set("jwt", "", {
    httpOnly: false,
    expires: new Date(0),
    path: "/",
  });

  return response;
}
