import { NavBarHome } from "@/components/navigation/NavBarHome";
import "./globals.css";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <NavBarHome />
        {children}
      </body>
    </html>
  );
}
