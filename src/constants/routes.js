const ROUTES = {
  PUBLIC: {
    LOGIN: "/auth/login",
    REGISTER: "/auth/register",
    HOME: "/",
    HELP: "/help",
  },
  PROTECTED: {
    DASHBOARD: "/dashboard", //dashboard y perfil
    SETTINGS: "/settings", //aun no existe
    ORDERS: "/orders", //aun no existe
    ADMIN: "/admin", //aun no existe
  },
};

export default ROUTES;
