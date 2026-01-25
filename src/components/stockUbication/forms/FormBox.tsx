import { useMemo, useState } from "react";
import type { ApiDetallesAlmacen } from "../../../mocks/apiDetallesAlmacen";
import { apiDatafonosMock } from "../../../mocks/apiDatafonos";

type CapacidadCaja = 80 | 90 | 100 | 150;

interface NuevaCajaPayload {
  etiqueta: string;
  modelo: string;
  marca: string;
  tecnologia: string;
  unidades: number;
  capacidadTotal: CapacidadCaja;
  idPale: number | null;
}

interface FormBoxProps {
  hueco: ApiDetallesAlmacen;
  onSubmit: (data: NuevaCajaPayload) => void;
  onCancel: () => void;
}

type FormState = {
  etiqueta: string;
  marca: string;
  modelo: string;
  tecnologia: string;
  unidades: number;
  capacidadTotal: CapacidadCaja | null;
  idPale: number | null;
};

function FormBox({ hueco, onSubmit, onCancel }: FormBoxProps) {
  const [form, setForm] = useState<FormState>({
    etiqueta: hueco.referencia,
    marca: "",
    modelo: "",
    tecnologia: "",
    unidades: 0,
    capacidadTotal: null,
    idPale: hueco.pale?.id ?? null,
  });

  // ✅ Opciones dinámicas (desde “API”)
  const marcas = useMemo(() => {
    return Array.from(new Set(apiDatafonosMock.map((d) => d.marca))).sort((a, b) =>
      a.localeCompare(b)
    );
  }, []);

  const modelosPorMarca = useMemo(() => {
    if (!form.marca) return [];
    return Array.from(
      new Set(apiDatafonosMock.filter((d) => d.marca === form.marca).map((d) => d.modelo))
    ).sort((a, b) => a.localeCompare(b));
  }, [form.marca]);

  const tecnologiasPorMarcaYModelo = useMemo(() => {
    if (!form.marca || !form.modelo) return [];
    return Array.from(
      new Set(
        apiDatafonosMock
          .filter((d) => d.marca === form.marca && d.modelo === form.modelo)
          .map((d) => d.tecnologia)
      )
    ).sort((a, b) => a.localeCompare(b));
  }, [form.marca, form.modelo]);

  // ✅ Handlers
  const handleEtiquetaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, etiqueta: e.target.value }));
  };

  const handleMarcaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const marca = e.target.value;

    // Al cambiar marca, reseteamos modelo/tecnologia/capacidad
    setForm((prev) => ({
      ...prev,
      marca,
      modelo: "",
      tecnologia: "",
      capacidadTotal: null,
    }));
  };

  const handleModeloChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const modelo = e.target.value;

    // Al cambiar modelo, reseteamos tecnologia/capacidad
    setForm((prev) => ({
      ...prev,
      modelo,
      tecnologia: "",
      capacidadTotal: null,
    }));
  };

  const handleTecnologiaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const tecnologia = e.target.value;

    // Al elegir tecnologia, ya podemos calcular capacidad
    const match = apiDatafonosMock.find(
      (d) => d.marca === form.marca && d.modelo === form.modelo && d.tecnologia === tecnologia
    );

    setForm((prev) => ({
      ...prev,
      tecnologia,
      capacidadTotal: match?.capacidadCaja ?? null,
      // opcional: resetear unidades si quieres
      // unidades: 0,
    }));
  };

  const handleUnidadesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    setForm((prev) => ({
      ...prev,
      unidades: Number.isFinite(value) ? value : 0,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.marca || !form.modelo || !form.tecnologia) return;
    if (!form.capacidadTotal) return;

    // Validación básica
    if (form.unidades < 0) return;
    if (form.unidades > form.capacidadTotal) return;

    onSubmit({
      etiqueta: form.etiqueta,
      modelo: form.modelo,
      marca: form.marca,
      tecnologia: form.tecnologia,
      unidades: form.unidades,
      capacidadTotal: form.capacidadTotal,
      idPale: form.idPale,
    });
  };

  const unidadesInvalidas =
    form.capacidadTotal !== null && form.unidades > form.capacidadTotal;

  return (
    <form onSubmit={handleSubmit}>
      {/* Etiqueta */}
      <div className="mb-3">
        <label className="form-label">Etiqueta</label>
        <input
          className="form-control"
          value={form.etiqueta}
          onChange={handleEtiquetaChange}
          required
        />
        <div className="form-text">
          Sugerencia: usa la referencia del hueco (ej: {hueco.referencia})
        </div>
      </div>

      {/* Marca */}
      <div className="mb-3">
        <label className="form-label">Marca</label>
        <select
          className="form-select"
          value={form.marca}
          onChange={handleMarcaChange}
          required
        >
          <option value="">Selecciona una marca</option>
          {marcas.map((m) => (
            <option key={m} value={m}>
              {m}
            </option>
          ))}
        </select>
      </div>

      {/* Modelo (depende de Marca) */}
      <div className="mb-3">
        <label className="form-label">Modelo</label>
        <select
          className="form-select"
          value={form.modelo}
          onChange={handleModeloChange}
          required
          disabled={!form.marca}
        >
          <option value="">
            {form.marca ? "Selecciona un modelo" : "Selecciona una marca primero"}
          </option>
          {modelosPorMarca.map((modelo) => (
            <option key={modelo} value={modelo}>
              {modelo}
            </option>
          ))}
        </select>
      </div>

      {/* Tecnología (depende de Marca + Modelo) */}
      <div className="mb-3">
        <label className="form-label">Tecnología</label>
        <select
          className="form-select"
          value={form.tecnologia}
          onChange={handleTecnologiaChange}
          required
          disabled={!form.marca || !form.modelo}
        >
          <option value="">
            {form.modelo
              ? "Selecciona una tecnología"
              : "Selecciona marca y modelo primero"}
          </option>
          {tecnologiasPorMarcaYModelo.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      {/* Unidades */}
      <div className="mb-3">
        <label className="form-label">Unidades</label>
        <input
          type="number"
          className={`form-control ${unidadesInvalidas ? "is-invalid" : ""}`}
          value={form.unidades}
          onChange={handleUnidadesChange}
          min={0}
          max={form.capacidadTotal ?? undefined}
        />
        {unidadesInvalidas && (
          <div className="invalid-feedback">
            No puede superar la capacidad máxima ({form.capacidadTotal})
          </div>
        )}
      </div>

      {/* Capacidad (readonly) */}
      <div className="mb-3">
        <label className="form-label">Capacidad máxima</label>
        <input
          className="form-control"
          value={form.capacidadTotal ?? ""}
          readOnly
          placeholder="Se calcula al elegir tecnología"
        />
      </div>

      <div className="d-flex gap-2">
        <button className="btn btn-primary" type="submit">
          Guardar
        </button>
        <button type="button" className="btn btn-secondary" onClick={onCancel}>
          Cancelar
        </button>
      </div>
    </form>
  );
}

export default FormBox;