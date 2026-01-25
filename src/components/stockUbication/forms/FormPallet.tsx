import { useState } from "react";
import {apiPalesMock} from "../../../mocks/apiDetallesPale";
import type {ApiPale,MaterialPale,TipoPale} from "../../../mocks/apiDetallesPale"

interface NuevoPalePayload {
  idPale: number;
  material: MaterialPale;
  tipo: TipoPale;
  capacidadMaxCajas: number;
}

interface FormPalletProps {
  idHueco: number;
  onSubmit: (data: NuevoPalePayload) => void;
  onCancel: () => void;
}

export default function FormPallet({
  idHueco,
  onSubmit,
  onCancel,
}: FormPalletProps) {
  const [paleSeleccionado, setPaleSeleccionado] =
    useState<ApiPale | null>(null);

  const handlePaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const paleId = Number(e.target.value);
    const pale = apiPalesMock.find((p) => p.id === paleId) || null;
    setPaleSeleccionado(pale);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!paleSeleccionado) return;

    onSubmit({
      idPale: paleSeleccionado.id,
      material: paleSeleccionado.material,
      tipo: paleSeleccionado.tipo,
      capacidadMaxCajas: paleSeleccionado.capacidadMaxCajas,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h4 className="mb-3">Añadir palé al hueco</h4>

      {/* Palé */}
      <div key={`idUbicacionAlmacen-${idHueco}`} className="mb-3">
        <label className="form-label">Palé</label>
        <select
          className="form-select"
          onChange={handlePaleChange}
          required
        >
          <option value="">Selecciona un palé</option>
          {apiPalesMock.map((pale) => (
            <option key={pale.id} value={pale.id}>
              {pale.descripcion}
            </option>
          ))}
        </select>
      </div>

      {/* Material */}
      <div className="mb-3">
        <label className="form-label">Material</label>
        <input
          className="form-control"
          value={paleSeleccionado?.material ?? ""}
          disabled
        />
      </div>

      {/* Tipo */}
      <div className="mb-3">
        <label className="form-label">Tipo</label>
        <input
          className="form-control"
          value={paleSeleccionado?.tipo ?? ""}
          disabled
        />
      </div>

      {/* Capacidad */}
      <div className="mb-3">
        <label className="form-label">Capacidad máxima de cajas</label>
        <input
          className="form-control"
          value={paleSeleccionado?.capacidadMaxCajas ?? ""}
          disabled
        />
      </div>

      <div className="d-flex gap-2">
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
        <button
          type="button"
          className="btn btn-secondary"
          onClick={onCancel}
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}