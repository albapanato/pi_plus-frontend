import { NavLink } from "react-router-dom";

export default function Sidebar() {
  return (
    <aside className="border-end bg-light p-3" style={{ width: "400px" }}>
      <div className="d-flex flex-column gap-4 h-100">
        {/* Usuario */}
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
            <div className="fw-semibold">Nombre usuario logeado</div>
            <div className="text-muted small">Rol usuario</div>
          </div>
        </div>

        {/* Navegación */}
        <nav className="nav nav-pills flex-column gap-1">
          <NavItem to="/dashboard" icon="search" label="Búsqueda por SN" />
          <NavItem to="/equipos" icon="inventory_2" label="Ficha Equipo" />
          <NavItem to="/almacen" icon="map" label="Mapa Almacén" />
          <NavItem to="/ordenes" icon="list_alt" label="Listado Órdenes" />
        </nav>
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
        [
          "nav-link d-flex align-items-center gap-2",
          isActive ? "active fw-semibold" : "text-dark",
        ].join(" ")
      }
    >
      <span className="material-symbols-outlined">{icon}</span>
      {label}
    </NavLink>
  );
}