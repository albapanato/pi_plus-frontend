
// src/mocks/apiUbicacionesAlmacen.ts

export interface ApiDetallesAlmacen {
  idHueco: number;
 
  referencia: string;          // ej: "A-1-2"
  
  almacen: {
    id: number;
    nombre: string;
  };
  
  pasillo: {
    id: number;
    numero: number;
  };
  
  estanteria: {
    id: number;
    descripcion: string;       // ej: "A"
    nivel: number;
    capacidadMaxCajas: number;
  };
  
  pale: {
    id: number;
    descripcion: string;
    material: "plastico" | "madera";
    tipo: "americano" | "europeo";
    capacidadMaxCajas: number;
  } | null;
  
  ocupacionActual: number;     // nº de cajas ocupadas
  
  cajas: {
    id: number;
    etiqueta: string;
  }[];
}

/**
 * Mock de respuesta de la API:
 * GET /api/ubicaciones-almacen
 */
export const apiDetallesAlmacenMock: ApiDetallesAlmacen[] = [
  {
    idHueco: 1,
    referencia: "A-1-1",
    almacen: {
      id: 1,
      nombre: "ALM-01",
    },
    pasillo: {
      id: 1,
      numero: 1,
    },
    estanteria: {
      id: 1,
      descripcion: "A",
      nivel: 1,
      capacidadMaxCajas: 8,
    },
    pale: null,
    ocupacionActual: 0,
    cajas: [],
  },

  {
    idHueco: 2,
    referencia: "A-1-2",
    almacen: {
      id: 1,
      nombre: "ALM-01",
    },
    pasillo: {
      id: 1,
      numero: 1,
    },
    estanteria: {
      id: 1,
      descripcion: "A",
      nivel: 2,
      capacidadMaxCajas: 8,
    },
    pale: {
      id: 10,
      descripcion: "Pale PAX A920",
      material: "plastico",
      tipo: "europeo",
      capacidadMaxCajas: 8,
    },
    ocupacionActual: 4,
    cajas: [
      { id: 101, etiqueta: "A-1-2-01" },
      { id: 102, etiqueta: "A-1-2-02" },
      { id: 103, etiqueta: "A-1-2-03" },
      { id: 104, etiqueta: "A-1-2-04" },
    ],
  },
{
    idHueco: 2,
    referencia: "A-1-2",
    almacen: {
      id: 1,
      nombre: "ALM-01",
    },
    pasillo: {
      id: 1,
      numero: 1,
    },
    estanteria: {
      id: 1,
      descripcion: "A",
      nivel: 3,
      capacidadMaxCajas: 8,
    },
    pale: {
      id: 10,
      descripcion: "Pale PAX A920",
      material: "plastico",
      tipo: "europeo",
      capacidadMaxCajas: 8,
    },
    ocupacionActual: 6,
    cajas: [
      { id: 101, etiqueta: "A-1-2-01" },
      { id: 102, etiqueta: "A-1-2-02" },
      { id: 103, etiqueta: "A-1-2-03" },
      { id: 104, etiqueta: "A-1-2-04" },
    ],
  },




  {
    idHueco: 3,
    referencia: "B-2-1",
    almacen: {
      id: 1,
      nombre: "ALM-01",
    },
    pasillo: {
      id: 2,
      numero: 2,
    },
    estanteria: {
      id: 2,
      descripcion: "B",
      nivel: 1,
      capacidadMaxCajas: 8,
    },
    pale: {
      id: 11,
      descripcion: "Pale Verifone",
      material: "madera",
      tipo: "americano",
     capacidadMaxCajas: 8,
    },
    ocupacionActual: 8,
    cajas: [
      { id: 201, etiqueta: "B-2-1-01" },
      { id: 202, etiqueta: "B-2-1-02" },
      { id: 203, etiqueta: "B-2-1-03" },
      { id: 204, etiqueta: "B-2-1-04" },
      { id: 205, etiqueta: "B-2-1-05" },
      { id: 206, etiqueta: "B-2-1-06" },
      { id: 207, etiqueta: "B-2-1-07" },
      { id: 208, etiqueta: "B-2-1-08" },
      { id: 209, etiqueta: "B-2-1-09" },
      { id: 210, etiqueta: "B-2-1-10" },
    ],
  },


  {
    idHueco: 4,
    referencia: "A-2-1",
    almacen: {
      id: 1,
      nombre: "ALM-01",
    },
    pasillo: {
      id: 2,
      numero: 2,
    },
    estanteria: {
      id: 1,
      descripcion: "A",
      nivel: 2,
      capacidadMaxCajas: 8,
    },
    pale: {
      id: 11,
      descripcion: "Pale Verifone",
      material: "madera",
      tipo: "americano",
     capacidadMaxCajas: 8,
    },
    ocupacionActual: 0,
    cajas: [],},
  {
    idHueco: 4,
    referencia: "B-2-1",
    almacen: {
      id: 1,
      nombre: "ALM-01",
    },
    pasillo: {
      id: 2,
      numero: 2,
    },
    estanteria: {
      id: 2,
      descripcion: "B",
      nivel: 2,
      capacidadMaxCajas: 8,
    },
    pale: {
      id: 11,
      descripcion: "Pale Verifone",
      material: "madera",
      tipo: "americano",
     capacidadMaxCajas: 8,
    },
    ocupacionActual: 0,
    cajas: [],},

];