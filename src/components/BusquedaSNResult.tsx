import "./BusquedaSNResult.css";

function BusquedaSNResult() {
  return (
    <div className="card border-0 bg-light">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-start gap-3">
          <div>
            <h3 className="h6 mb-1">Resultados de la búsqueda</h3>
            <div className="text-muted">
              Detalles para el SN:{" "}
              <span className="fw-semibold">123465466</span>
            </div>
          </div>

          <button type="button" className="btn btn-sm btn-outline-primary">
            Editar
          </button>
        </div>

        <hr className="my-3" />

        <div className="row g-3">
          <div className="col-12 col-md-6">
            <label className="form-label mb-1">Modelo</label>
            <input
              className="form-control"
              type="text"
              value="Modelo X"
              readOnly
            />
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label mb-1">Estado</label>

            <div className="d-flex align-items-center gap-2">
              <span className="badge bg-success bg-opacity-10 text-success px-3 py-2 rounded-pill d-flex align-items-center gap-2">
                <span className="status-dot bg-success"></span>
                En Bodega
              </span>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <label className="form-label mb-1">Marca</label>
            <input
              className="form-control"
              type="text"
              value="Marca Y"
              readOnly
            />
          </div>

          

          <div className="col-12 col-md-6">
            <label className="form-label mb-1">Ubicación</label>
            <input
              className="form-control"
              type="text"
              value="Oficina Central"
              readOnly
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BusquedaSNResult;
