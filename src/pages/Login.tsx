export default function Login() {
  return (
    <main className="w-full flex items-center justify-center">
      <div className="flex w-full max-w-xl flex-col items-center">
        <div className="w-full rounded-xl border border-border-light/50 bg-card-light p-8 shadow-lg md:p-10">
          {/* Header */}
          <div className="flex flex-col items-center gap-2 pb-6">
            <div className="mb-2 flex h-16 w-16 items-center justify-center rounded-full bg-primary/20">
              <span className="material-symbols-outlined text-primary text-4xl">
                inventory_2
              </span>
            </div>

            <h1 className="text-center text-[32px] font-bold leading-tight text-text-light">
              Bienvenido de Nuevo
            </h1>
            <p className="text-base text-slate-500">
              Inicia sesión para gestionar tu inventario.
            </p>
          </div>

          {/* Form */}
          <form className="flex flex-col gap-4">
            {/* Usuario */}
            <label className="flex flex-col">
              <span className="pb-2 text-base font-medium text-text-light">
                Usuario o Email
              </span>

              <div className="flex">
                <input
                  type="text"
                  placeholder="Ingrese su usuario o email"
                  className="h-14 w-full rounded-l-lg border border-border-light bg-background-light p-[15px] text-base outline-none focus:ring-2 focus:ring-primary/50"
                />
                <div className="flex items-center justify-center rounded-r-lg border border-l-0 border-border-light bg-background-light px-4 text-placeholder-light">
                  <span className="material-symbols-outlined text-2xl">
                    person
                  </span>
                </div>
              </div>
            </label>

            {/* Contraseña */}
            <label className="flex flex-col">
              <span className="pb-2 text-base font-medium text-text-light">
                Contraseña
              </span>

              <div className="flex">
                <input
                  type="password"
                  placeholder="Ingrese su contraseña"
                  className="h-14 w-full rounded-l-lg border border-border-light bg-background-light p-[15px] text-base outline-none focus:ring-2 focus:ring-primary/50"
                />
                <button
                  type="button"
                  aria-label="Mostrar contraseña"
                  className="flex items-center justify-center rounded-r-lg border border-l-0 border-border-light bg-background-light px-4 text-placeholder-light"
                >
                  <span className="material-symbols-outlined text-2xl">
                    visibility
                  </span>
                </button>
              </div>
            </label>

            {/* Botón */}
            <div className="pt-6">
              <button
                type="submit"
                className="h-12 w-full rounded-lg bg-primary text-base font-bold text-white transition-colors hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary"
              >
                Iniciar Sesión
              </button>
            </div>

            {/* Forgot */}
            <div className="text-center">
              <a
                href="#"
                className="text-sm font-medium text-primary hover:underline"
              >
                Olvidé mi contraseña
              </a>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className="mt-8 text-sm text-slate-500">
          © 2026 Datafonos Inc. Todos los derechos reservados.
        </p>
      </div>
    </main>
  );
}