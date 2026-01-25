export type MaterialPale = "plastico" | "madera";
export type TipoPale = "americano" | "europeo";

export interface ApiPale {
  id: number;
  descripcion: string;
  material: MaterialPale;
  tipo: TipoPale;
  capacidadMaxCajas: number;
}

export const apiPalesMock: ApiPale[] = [
  {
    id: 1,
    descripcion: "Palé europeo plástico",
    material: "plastico",
    tipo: "europeo",
    capacidadMaxCajas: 8,
  },
  {
    id: 2,
    descripcion: "Palé europeo madera",
    material: "madera",
    tipo: "europeo",
    capacidadMaxCajas: 8,
  },
  {
    id: 3,
    descripcion: "Palé americano madera",
    material: "madera",
    tipo: "americano",
    capacidadMaxCajas: 8,
  },
];