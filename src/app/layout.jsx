"use client";

import { NavBarHome } from "@/components/navigation/NavBarHome";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <NavBarHome />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
