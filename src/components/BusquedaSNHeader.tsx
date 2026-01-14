type Props = {
  onAdd: () => void;
};

function BusquedaSNHeader({ onAdd }: Props) {
  return (
    <div className="d-flex align-items-center justify-content-between mb-4">
      <div>
        <h1 className="h4 mb-1">Búsqueda por Serie Numérica</h1>
        <p className="text-muted mb-0">
          Escanea o introduce el SN para localizar el equipo.
        </p>
      </div>
      <button type="button" className="btn btn-primary" onClick={onAdd}>
        + Agregar Equipo
      </button>
    </div>
  );
}

export default BusquedaSNHeader;
