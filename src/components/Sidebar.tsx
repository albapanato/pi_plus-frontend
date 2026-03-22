import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { getAuthenticatedUser, getAuthUserFromCookie, logoutUser, type AuthUser } from "../auth/session";

function formatRoles(roles: string): string {
  const cleaned = roles.replace(/[\[\]]/g, "").replace(/ROLE_/g, "").trim();
  return cleaned || "Sin rol";
}

export default function Sidebar() {
  const navigate = useNavigate();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [authUser, setAuthUser] = useState<AuthUser | null>(() => getAuthUserFromCookie());

  useEffect(() => {
    if (authUser) {
      return;
    }

    let isMounted = true;

    const loadUser = async () => {
      const user = await getAuthenticatedUser();
      if (isMounted && user) {
        setAuthUser(user);
      }
    };

    void loadUser();

    return () => {
      isMounted = false;
    };
  }, [authUser]);

  const handleLogout = async () => {
    setIsLoggingOut(true);

    try {
      await logoutUser();
    } finally {
      setAuthUser(null);
      navigate("/login", { replace: true, state: { skipSessionCheck: true } });
    }
  };

  return (
    <aside className="border-end bg-light p-3" style={{ width: "300px" }}>
      <div className="d-flex flex-column gap-4 h-100">
        <div className="d-flex align-items-center gap-3">
          <div
            className="rounded-circle bg-secondary bg-opacity-25"
            style={{
              width: "40px",
              height: "40px",
              backgroundImage:
                'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDGvzODOK5xKVwU8nh2iU1rLd6FjL0UNuYyteMcdY7NqGvGAf7sU7gHUu-A54_95e7ghnwaCRNEP5fCrQFKg978KpJETA_OYVkRFXdz-3Okue7RXnGngYWH6ps2jynrOaZ6A9ErdV3k-Fpci4VbCdNTQVHCvVxUUyVANZMhR0Gm_-f863yE2W211wZaFJhWTpkAWWUq1c40x5JqXpuZpW9dT1k4kOAZbWSTM3_JaupuFFljOhbX9vf5Ek60XMUTTsLVkxcJTZYJE-4")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div>
            <div className="fw-semibold">{authUser?.username || "Nombre usuario logeado"}</div>
            <div className="text-muted small">{authUser ? formatRoles(authUser.roles) : "Rol usuario"}</div>
          </div>
        </div>

        <nav className="nav nav-pills flex-column gap-1">
          <NavItem to="/dashboard" icon="dashboard" label="Inicio" />
          <NavItem to="/search" icon="search" label="Búsqueda por SN" />
          <NavItem to="/terminal-form" icon="inventory_2" label="Ficha Equipo" />
          <NavItem to="/stock" icon="map" label="Mapa Almacén" />
          <NavItem to="/#" icon="list_alt" label="Listado Órdenes" />
        </nav>

        <div className="mt-auto d-grid gap-2">
          <button
            type="button"
            className="btn btn-outline-danger d-flex align-items-center justify-content-center gap-2"
            onClick={handleLogout}
            disabled={isLoggingOut}
          >
            <span className="material-symbols-outlined">logout</span>
            {isLoggingOut ? "Cerrando sesión..." : "Cerrar sesión"}
          </button>
        </div>
      </div>
    </aside>
  );
}

type NavItemProps = {
  to: string;
  icon: string;
  label: string;
};

function NavItem({ to, icon, label }: NavItemProps) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        ["nav-link d-flex align-items-center gap-2", isActive ? "active fw-semibold" : "text-dark"].join(" ")
      }
    >
      <span className="material-symbols-outlined">{icon}</span>
      {label}
    </NavLink>
  );
}
