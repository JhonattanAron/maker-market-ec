import { NavBarHome } from "@/components/navigation/NavBarHome";
import "./globals.css";
import ProviderSession from "@/provider/Providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ProviderSession>
          <NavBarHome />
          {children}
        </ProviderSession>
      </body>
    </html>
  );
}
