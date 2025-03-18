import { NextRequest, NextResponse } from "next/server";
import { JwtService } from "@nestjs/jwt";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("jwt")?.value;
  console.log("Token de Me:", token);

  if (!token) {
    return NextResponse.json({ message: "No autenticado" }, { status: 401 });
  }

  try {
    // Inicializa JwtService con la clave secreta
    const jwtService = new JwtService({
      secret: process.env.JWT_SECRET || "default_secret",
    });

    // Verifica el token
    const decoded = jwtService.verify(token);
    console.log("Token decodificado:", decoded);

    return NextResponse.json(decoded);
  } catch (error) {
    console.error("Error al validar el token:", error);
    return NextResponse.json({ message: "Token inválido" }, { status: 401 });
  }
}
