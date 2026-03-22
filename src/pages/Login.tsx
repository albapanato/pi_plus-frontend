import { useEffect, useState, type FormEvent } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { apiUrl, getAuthenticatedUser } from "../auth/session";

type LoginLocationState = {
  skipSessionCheck?: boolean;
};

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingSession, setIsCheckingSession] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  const locationState = location.state as LoginLocationState | null;
  const skipSessionCheck = Boolean(locationState?.skipSessionCheck);

  useEffect(() => {
    if (skipSessionCheck) {
      setIsCheckingSession(false);
      return;
    }

    let isMounted = true;

    const checkExistingSession = async () => {
      const user = await getAuthenticatedUser();

      if (!isMounted) {
        return;
      }

      if (user) {
        navigate("/dashboard", { replace: true });
        return;
      }

      setIsCheckingSession(false);
    };

    void checkExistingSession();

    return () => {
      isMounted = false;
    };
  }, [navigate, skipSessionCheck]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");

    if (!username.trim() || !password.trim()) {
      setErrorMessage("Debes introducir usuario y contraseña.");
      return;
    }

    try {
      setIsLoading(true);

      const response = await fetch(apiUrl("/api/auth/login"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username: username.trim(), password }),
      });

      const data = (await response.json().catch(() => null)) as { message?: string; error?: string } | null;

      if (!response.ok) {
        throw new Error(data?.error || data?.message || "No se pudo iniciar sesión.");
      }

      navigate("/dashboard", { replace: true });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error inesperado al iniciar sesión.";
      setErrorMessage(message);
    } finally {
      setIsLoading(false);
    }
  };

  if (isCheckingSession) {
    return <main className="text-center p-4">Comprobando sesión...</main>;
  }

  return (
    <main className="d-flex justify-content-center">
      <div className="card shadow-lg">
        <div className="card-body p-4 p-md-5">
          <div className="text-center mb-4">
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-25 mb-3"
              style={{ width: "64px", height: "64px" }}
            >
              <span className="material-symbols-outlined text-primary fs-2">inventory_2</span>
            </div>

            <h1 className="h4 fw-bold mb-1">Bienvenido de nuevo</h1>
            <p className="text-muted mb-0">Inicia sesión para gestionar tu inventario</p>
          </div>

          <form className="d-flex flex-column gap-3" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="form-label fw-semibold">
                Usuario
              </label>
              <div className="input-group">
                <input
                  id="username"
                  type="text"
                  className="form-control"
                  placeholder="Ingrese su usuario"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  autoComplete="username"
                  disabled={isLoading}
                />
                <span className="input-group-text">
                  <span className="material-symbols-outlined">person</span>
                </span>
              </div>
            </div>

            <div>
              <label htmlFor="password" className="form-label fw-semibold">
                Contraseña
              </label>
              <div className="input-group">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  className="form-control"
                  placeholder="Ingrese su contraseña"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                  disabled={isLoading}
                />
                <button
                  type="button"
                  className="input-group-text"
                  aria-label="Mostrar contraseña"
                  onClick={() => setShowPassword((prev) => !prev)}
                  disabled={isLoading}
                >
                  <span className="material-symbols-outlined">
                    {showPassword ? "visibility_off" : "visibility"}
                  </span>
                </button>
              </div>
            </div>

            {errorMessage && (
              <div className="alert alert-danger py-2 mb-0" role="alert">
                {errorMessage}
              </div>
            )}

            <div className="d-grid mt-3">
              <button type="submit" className="btn btn-primary fw-bold" disabled={isLoading}>
                {isLoading ? "Iniciando..." : "Iniciar sesión"}
              </button>
            </div>

            <div className="text-center mt-3">
              <a href="#" className="link-primary small">
                Olvidé mi contraseña
              </a>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
