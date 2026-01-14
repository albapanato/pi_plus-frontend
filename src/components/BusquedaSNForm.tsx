function BusquedaSNForm() {
  return (
    //

    <form className="mb-3">
      <div className="row g-5 align-items-center">
        {/* INPUT ocupa todo */}
        <div className="col-12 col-md">
          <div className="input-group w-100">
            <span className="input-group-text">
              <span className="material-symbols-outlined">qr_code_scanner</span>
            </span>

            <input
              type="text"
              className="form-control"
              placeholder="Buscar por serie numérica..."
            />

            <button className="btn btn-outline-secondary" type="button">
              Limpiar
            </button>
          </div>
        </div>

        {/* BOTÓN buscar */}
        <div className="col-12 col-md-auto">
          <button type="submit" className="btn btn-primary w-100">
            Buscar
          </button>
        </div>
      </div>
    </form>
  );
}

export default BusquedaSNForm;
