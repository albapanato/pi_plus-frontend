import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { getAuthenticatedUser } from "../auth/session";

export default function RequireAuth() {
  const [isChecking, setIsChecking] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const checkSession = async () => {
      const user = await getAuthenticatedUser();
      if (!isMounted) {
        return;
      }

      setIsAuthenticated(Boolean(user));
      setIsChecking(false);
    };

    void checkSession();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isChecking) {
    return <main className="text-center p-4">Comprobando sesión...</main>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
