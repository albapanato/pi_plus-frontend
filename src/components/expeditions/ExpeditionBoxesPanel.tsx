import type { BoxExpeditionDetail } from "../../types";
import { useState } from "react";
import {useBoxesExpedition} from "../../hooks/useBoxesExpedition";


type ExpeditionBoxesPanelProps = {
  boxes: BoxExpeditionDetail[];
  onAddBox: (box: BoxExpeditionDetail) => void;
  onRemoveBox: (boxId: number) => void;
};

function hasNonOperativeTerminals(box: BoxExpeditionDetail) {
  return box.terminales.some(
    (terminal) => terminal.estado !== "operativo",
  );
}


export default function ExpeditionBoxesPanel({ boxes, onAddBox, onRemoveBox }: ExpeditionBoxesPanelProps ) {

  const [boxLabel, setBoxLabel] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);

  const {loading, error, loadBoxExpeditionDetail} = useBoxesExpedition();


  async function handleAddBox() {
    const normalizedLabel = boxLabel.trim();

    if(!normalizedLabel){
      setLocalError("La etiqueta no puede estar vacía");
      return;
    }

    const alreadyExists = boxes.some(
      (box) => box.etiqueta.toLowerCase() === normalizedLabel.toLowerCase(),
    );

    if(alreadyExists){
      setLocalError("Ya has agregado una caja con esa etiqueta");
      return;
    }

    const foundBox = await loadBoxExpeditionDetail(normalizedLabel);

    if(!foundBox){
      setLocalError("No se encontró ninguna caja con esa etiqueta");
      return;
    }

    if(hasNonOperativeTerminals(foundBox)){
      setLocalError("La caja tiene terminales que no están operativas");
      return;
    }

    onAddBox(foundBox);
    setBoxLabel("");
    setLocalError(null);
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>){
    if(event.key === "Enter"){
      event.preventDefault();
      void handleAddBox();
    }
  }

  const totalTerminals = boxes.reduce(
    (total,box) => total + box.cantidadTerminales,
    0,
  );

  return (
    <section className="card border-0 shadow-sm">
      <div className="card-header bg-white py-3 d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-2">
        <div>
          <h2 className="h6 mb-1 fw-bold">Cajas vinculadas a la expedición</h2>
          <p className="text-muted small mb-0">
            Añade cajas completas mediante su etiqueta.
          </p>
        </div>

        <div className="d-flex gap-2">
          <span className="badge text-bg-light border">
            {boxes.length} caja{boxes.length === 1 ? "" : "s"}
          </span>
          <span className="badge text-bg-light border">
            {totalTerminals} terminal{totalTerminals === 1 ? "" : "es"}
          </span>
        </div>
      </div>

      <div className="card-body d-flex flex-column gap-4">
        <div>
          <label htmlFor="box-label-input" className="form-label fw-semibold">
            Agregar caja por etiqueta
          </label>

          <div className="d-flex flex-column flex-md-row gap-2">
            <input
              id="box-label-input"
              type="text"
              className="form-control"
              placeholder="Ejemplo: CAJA-A1"
              value={boxLabel}
              onChange={(event) => {
                setBoxLabel(event.target.value);
                setLocalError(null);
              }}
              onKeyDown={handleKeyDown}
              disabled={loading}
            />

            <button
              type="button"
              className="btn btn-primary px-4"
              onClick={() => void handleAddBox()}
              disabled={loading}
            >
              {loading ? "Buscando..." : "Agregar"}
            </button>
          </div>

          {(localError || error) && (
            <div className="alert alert-danger py-2 px-3 mt-3 mb-0">
              {localError || error}
            </div>
          )}
        </div>

        <div className="table-responsive">
          <table className="table align-middle mb-0">
            <thead className="table-light">
              <tr>
                <th>Etiqueta</th>
                <th>Modelo del producto</th>
                <th className="text-center">Estado caja</th>
                <th className="text-center">Terminales</th>
                
                <th className="text-end">Acción</th>
              </tr>
            </thead>

            <tbody>
              {boxes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-muted py-4">
                    Todavía no hay cajas añadidas.
                  </td>
                </tr>
              ) : (
                boxes.map((box) => {
                  

                  return (
                    <tr key={box.id}>
                      <td>
                        <div className="fw-semibold">{box.etiqueta}</div>
                        <div className="text-muted small">ID caja: {box.id}</div>
                      </td>

                      <td>{box.modeloProducto || "Sin modelo vinculado"}</td>

                      <td className="text-center">
                        <span
                          className={
                              "badge bg-success-subtle text-success-emphasis"
                          }
                        >
                          Operativa
                        </span>
                      </td>

                      <td className="text-center">
                        <span className="badge text-bg-light border">
                          {box.cantidadTerminales}
                        </span>
                      </td>

                      

                      <td className="text-end">
                        <button
                          type="button"
                          className="btn btn-sm btn-outline-danger"
                          title="Eliminar caja"
                          onClick={() => onRemoveBox(box.id)}
                        >
                          <span className="material-symbols-outlined">
                            delete
                          </span>
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
