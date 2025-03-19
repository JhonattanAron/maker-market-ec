import ROUTES from "@/constants/routes";
import NextAuth, { Session, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import jwt from "jsonwebtoken";

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

            // Propaga el mensaje de error específico del backend
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

          // Decodificar el token JWT para extraer los datos del usuario
          const decodedToken = jwt.decode(token) as jwt.JwtPayload;
          console.log("Datos decodificados del token:", decodedToken);

          return {
            id: String(decodedToken.sub), // ID único del usuario convertido a string
            token, // Token JWT
            name: decodedToken.name as string,
            email: decodedToken.email,
            image: decodedToken.image,
          };
        } catch (error) {
          console.error("Error en authorize:", error);
          throw new Error(error.message || "Error al conectar con el servidor");
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
  events: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/auth/google-login`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                email: user.email,
                name: user.name,
                image: user.image,
                googleId: user.id,
              }),
            }
          );

          const data = await response.json();
          if (!response.ok)
            throw new Error(data.message || "Error en el login");
        } catch (error) {
          console.error("Error en Google SignIn:", error);
        }
      }
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: ROUTES.PUBLIC.LOGIN, // Página personalizada de inicio de sesión
    signOut: ROUTES.PUBLIC.LOGIN, // Página personalizada de cierre de sesión
  },
});

export { handler as GET, handler as POST };
