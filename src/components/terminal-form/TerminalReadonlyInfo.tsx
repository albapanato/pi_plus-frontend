function TerminalReadonlyInfo() {
  const isInExpedition = true;
  return (
    <div className="mb-4">
      <div className="d-flex align-items-center justify-content-between mb-2">
        <h2 className="h6 mb-0">Información del equipo</h2>

        {/* Indicador expedición */}
        <span
          className={`badge rounded-pill px-3 py-2 d-inline-flex align-items-center gap-2 ${
            isInExpedition
              ? "bg-warning bg-opacity-25 text-warning-emphasis"
              : "bg-success bg-opacity-10 text-success"
          }`}
          title={
            isInExpedition
              ? "Este equipo está asociado a una expedición"
              : "Este equipo no está en ninguna expedición"
          }
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: 999,
              display: "inline-block",
              background: isInExpedition
                ? "var(--bs-warning)"
                : "var(--bs-success)",
            }}
          />
          {isInExpedition ? "En expedición" : "Libre"}
        </span>
      </div>

      <div className="row g-3">
        <div className="col-12 col-md-6">
          <label className="form-label mb-1">Marca</label>
          <input
            type="text"
            className="form-control"
            value="Ingenico"
            readOnly
          />
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label mb-1">Modelo</label>
          <input
            type="text"
            className="form-control"
            value="Move/5000"
            readOnly
          />
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label mb-1">Número de serie (SN)</label>
          <input
            type="text"
            className="form-control"
            value="123465466"
            readOnly
          />
        </div>

        <div className="col-12 col-md-6">
          <label className="form-label mb-1">Entidad bancaria</label>
          <input type="text" className="form-control" value="BBVA" readOnly />
        </div>
      </div>
    </div>
  );
}

export default TerminalReadonlyInfo;
