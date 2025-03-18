import { createContext, useContext, useState, useEffect } from "react";

// Contexto de autenticación
const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [errorLogin, setErrorLogin] = useState("");
  useEffect(() => {
    // Validar la cookie "token" con el endpoint
    const checkAuth = async () => {
      try {
        const res = await fetch("/api/auth/validate", {
          method: "GET",
          credentials: "include", // Incluir cookies en la solicitud
        });

        if (res.ok) {
          const data = await res.json();
          setIsAuthenticated(data.isAuthenticated);
          setUser(data.user || null); // Almacena los datos del usuario si están disponibles
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error("Error al validar la autenticación:", error);
        setIsAuthenticated(false);
        setUser(null);
      }
    };

    checkAuth();
  }, []);

  const logout = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  const logIn = async (email, password) => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        setErrorLogin("Login fallido. Verifica tus credenciales.");
        return false;
      }

      const validateRes = await fetch("/api/auth/validate", {
        method: "GET",
        credentials: "include",
      });

      if (validateRes.ok) {
        const data = await validateRes.json();
        if (data.isAuthenticated) {
          setIsAuthenticated(true);
          setUser(data.user || null);
          setErrorLogin("");
          return true;
        }
      }

      setErrorLogin(
        "Error al validar el token ( Error de Servidor) <a href= >notificalo aqui</a>"
      );
      return false;
    } catch (err) {
      console.error("Error durante el login:", err);
      setErrorLogin("Ocurrió un error inesperado.");
      return false;
    }
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, logIn, logout, errorLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
}
