export type TerminalEstado =
  | "en_transito"
  | "pendiente_revision"
  | "operativo"
  | "pendiente_laboratorio"
  | "nivel_1";

export type Terminal = {
  id?: number;
  numeroSerie: string;
  modelo: string;
  marca: string;
  estado: TerminalEstado;
  notas: string;
  fechaIngreso: string;
  fechaCreacion: string;
};

export type TerminalApiResponse = {
  updatedterminal?: Terminal;
  insertterminal?: Terminal;
  error?: string;
  message?: string;
  mensaje?: string;
};

export const estadoOptions: Array<{ value: TerminalEstado; label: string }> = [
  { value: "en_transito", label: "En tránsito" },
  { value: "pendiente_revision", label: "Pendiente revisión" },
  { value: "operativo", label: "Operativo" },
  { value: "pendiente_laboratorio", label: "Pendiente laboratorio" },
  { value: "nivel_1", label: "Nivel 1" },
];

export function formatEstado(estado: TerminalEstado): string {
  return estadoOptions.find((option) => option.value === estado)?.label || estado;
}
