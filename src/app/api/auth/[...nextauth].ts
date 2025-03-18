import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        // Enviar usuario al backend para registrarlo
        //const res = await fetch(
        //  `${process.env.NEXT_PUBLIC_API_URL}/auth/google`,
        //  {
        //    method: "POST",
        //    headers: { "Content-Type": "application/json" },
        //    body: JSON.stringify({
        //      email: user.email,
        //      name: user.name,
        //      avatar: user.image,
        //    }),
        //  }
        //);
        //if (!res.ok) return false;
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) token.user = user;
      return token;
    },
    async session({ session, token }) {
      session.user = token.user as any;
      return session;
    },
  },
});
