export default function Login() {
  return (
    <main className="w-100 d-flex justify-content-center">
      <div className="card shadow-lg w-25">
        <div className="card-body p-4 p-md-5">
          {/* Header */}
          <div className="text-center mb-4">
            <div
              className="d-inline-flex align-items-center justify-content-center rounded-circle bg-primary bg-opacity-25 mb-3"
              style={{ width: "64px", height: "64px" }}
            >
              <span className="material-symbols-outlined text-primary fs-2">
                inventory_2
              </span>
            </div>

            <h1 className="h4 fw-bold mb-1">Bienvenido de nuevo</h1>
            <p className="text-muted mb-0">
              Inicia sesión para gestionar tu inventario
            </p>
          </div>

          {/* Formulario */}
          <form className="d-flex flex-column gap-3">
            <div>
              <label className="form-label fw-semibold">Usuario o Email</label>
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Ingrese su usuario o email"
                />
                <span className="input-group-text">
                  <span className="material-symbols-outlined">person</span>
                </span>
              </div>
            </div>

            <div>
              <label className="form-label fw-semibold">Contraseña</label>
              <div className="input-group">
                <input
                  type="password"
                  className="form-control"
                  placeholder="Ingrese su contraseña"
                />
                <button
                  type="button"
                  className="input-group-text"
                  aria-label="Mostrar contraseña"
                >
                  <span className="material-symbols-outlined">visibility</span>
                </button>
              </div>
            </div>

            <div className="d-grid mt-3">
              <button type="submit" className="btn btn-primary fw-bold">
                Iniciar sesión
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
