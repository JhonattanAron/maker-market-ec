import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  console.log("Credenciales recibidas:", email, password);

  // Hacer petición al backend para autenticar
  const res = await fetch(`http://localhost:8080/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  // Capturar las cookies enviadas por el backend
  const setCookieHeader = res.headers.get("set-cookie");
  console.log("Cookie recibida del backend:", setCookieHeader);

  const data = await res.json();

  if (!res.ok) {
    return NextResponse.json(
      { message: "Login Fallido", email, password },
      { status: 401 }
    );
  }

  // Crear la respuesta para el cliente
  const response = NextResponse.json({
    message: "Login exitoso",
    data: data.access_token,
  });

  // Reenviar la cookie al cliente
  if (setCookieHeader) {
    response.headers.set("set-cookie", setCookieHeader);
  }

  return response;
}
