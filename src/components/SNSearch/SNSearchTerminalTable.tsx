import SNSearchActionButton from "./bottons/SNSearchActionButton";
import type { Terminal } from "./types";

type SNSearchTerminalTableProps = {
  terminals: Terminal[];
  isLoading: boolean;
  isDeleting?: boolean;
  selectedSN?: string;
  onRefresh: () => void;
  onSelect: (terminal: Terminal) => void;
  onDelete: (terminal: Terminal) => void;
};

export default function SNSearchTerminalTable({
  terminals,
  isLoading,
  isDeleting = false,
  selectedSN,
  onRefresh,
  onSelect,
  onDelete,
}: SNSearchTerminalTableProps) {
  return (
    <div className="card border-0 bg-light mb-4">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h3 className="h6 mb-0">Listado de terminales</h3>
          <SNSearchActionButton
            type="button"
            size="sm"
            variant="outline-secondary"
            onClick={onRefresh}
            isLoading={isLoading}
            loadingLabel="Actualizando..."
            label="Actualizar"
          />
        </div>

        <div className="table-responsive">
          <table className="table table-sm table-hover align-middle mb-0">
            <thead>
              <tr>
                <th scope="col">SN</th>
                <th scope="col">Modelo</th>
                <th scope="col">Marca</th>
                <th scope="col">Estado</th>
                <th scope="col" className="text-end">
                  Acción
                </th>
              </tr>
            </thead>
            <tbody>
              {!isLoading && terminals.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-3">
                    No hay terminales para mostrar.
                  </td>
                </tr>
              )}

              {terminals.map((terminal) => (
                <tr key={terminal.id ?? terminal.numeroSerie} className={selectedSN === terminal.numeroSerie ? "table-active" : ""}>
                  <td className="fw-semibold">{terminal.numeroSerie}</td>
                  <td>{terminal.modelo}</td>
                  <td>{terminal.marca}</td>
                  <td>{terminal.estado}</td>
                  <td className="text-end">
                    <div className="d-inline-flex gap-2">
                      <SNSearchActionButton
                        type="button"
                        size="sm"
                        variant="outline-primary"
                        label={<i className="bi bi-eye" aria-hidden="true" />}
                        title="Ver"
                        aria-label="Ver"
                        onClick={() => onSelect(terminal)}
                        disabled={isDeleting}
                      />
                      <SNSearchActionButton
                        type="button"
                        size="sm"
                        variant="outline-danger"
                        label={<i className="bi bi-trash" aria-hidden="true" />}
                        title="Borrar"
                        aria-label="Borrar"
                        onClick={() => onDelete(terminal)}
                        disabled={isDeleting}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
