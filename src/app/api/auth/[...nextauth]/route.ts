import ROUTES from "@/constants/routes";
import NextAuth, { Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
  }
}

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await fetch(`http://localhost:8080/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          console.log("Estado de la respuesta:", res.status);

          if (!res.ok) {
            const errorData = await res.json();
            console.error("Error del backend:", errorData);
            throw new Error(errorData.message || "Credenciales inválidas");
          }

          // Extraer el token JWT de la cookie
          const setCookieHeader = res.headers.get("set-cookie");
          if (!setCookieHeader) {
            throw new Error("No se encontró el token en las cookies");
          }

          // Extraer el token de la cookie
          const tokenMatch = setCookieHeader.match(/jwt=([^;]+)/);
          if (!tokenMatch) {
            throw new Error("No se pudo extraer el token JWT de la cookie");
          }

          const token = tokenMatch[1];
          console.log("Token extraído:", token);

          return {
            id: "unique-id", // Provide a unique identifier for the user
            token, // Token JWT extraído de la cookie
            email: credentials?.email,
          };
        } catch (error) {
          console.error("Error en authorize:", error);
          throw new Error("Error al conectar con el servidor");
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      // Si el usuario inicia sesión, agrega el token JWT al token de NextAuth
      if (user) {
        token.accessToken = (user as User & { token: string }).token; // Almacena el token JWT del backend
      }
      return token;
    },
    async session({ session, token }) {
      // Agrega el token JWT a la sesión
      session.accessToken = token.accessToken as string;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: ROUTES.PUBLIC.LOGIN, // Página personalizada de inicio de sesión
    signOut: ROUTES.PUBLIC.LOGIN, // Página personalizada de cierre de sesión
  },
});

export { handler as GET, handler as POST };
