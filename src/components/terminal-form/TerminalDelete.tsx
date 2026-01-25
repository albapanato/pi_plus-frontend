function TerminalDelete() {
  return (
    <div className="d-flex flex-column flex-md-row align-items-start align-items-md-center justify-content-between gap-2">
      <div className="text-muted">
        <small>
          Eliminar el equipo es una acción irreversible. Asegúrate antes de
          continuar.
        </small>
      </div>
      <button type="button" className="btn btn-outline-danger">
        Eliminar
      </button>
    </div>
  );
}

export default TerminalDelete;
