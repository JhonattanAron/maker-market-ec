import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;

  if (!token) {
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }

  try {
    // Valida el token con la clave secreta del servidor
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "default_secret"
    );
    console.log("Token decodificado:", decoded);

    return NextResponse.json({ isAuthenticated: true });
  } catch (error) {
    console.error("Error al validar el token:", error);
    return NextResponse.json({ isAuthenticated: false }, { status: 401 });
  }
}
