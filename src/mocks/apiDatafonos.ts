export interface ApiDatafonoModel {
  modelo: string;
  marca: string;
  tecnologia: string;
  capacidadCaja: 80 | 90 | 100 | 150;
}

export const apiDatafonosMock: ApiDatafonoModel[] = [
  // VERIFONE
  {
    modelo: "Verifone V200",
    marca: "Verifone",
    tecnologia: "contactless",
    capacidadCaja: 80,
  },
  {
    modelo: "Verifone V200",
    marca: "Verifone",
    tecnologia: "chip",
    capacidadCaja: 90,
  },
  {
    modelo: "Verifone P400",
    marca: "Verifone",
    tecnologia: "contactless",
    capacidadCaja: 100,
  },
  {
    modelo: "Verifone P400",
    marca: "Verifone",
    tecnologia: "chip",
    capacidadCaja: 90,
  },

  // INGENICO
  {
    modelo: "Ingenico Desk 3500",
    marca: "Ingenico",
    tecnologia: "chip",
    capacidadCaja: 90,
  },
  {
    modelo: "Ingenico Desk 3500",
    marca: "Ingenico",
    tecnologia: "contactless",
    capacidadCaja: 100,
  },
  {
    modelo: "Ingenico Move 5000",
    marca: "Ingenico",
    tecnologia: "contactless",
    capacidadCaja: 100,
  },
  {
    modelo: "Ingenico Move 5000",
    marca: "Ingenico",
    tecnologia: "chip",
    capacidadCaja: 90,
  },

  // PAX
  {
    modelo: "PAX A920",
    marca: "PAX",
    tecnologia: "android",
    capacidadCaja: 150,
  },
  {
    modelo: "PAX A920",
    marca: "PAX",
    tecnologia: "contactless",
    capacidadCaja: 100,
  },
  {
    modelo: "PAX A80",
    marca: "PAX",
    tecnologia: "android",
    capacidadCaja: 150,
  },
  {
    modelo: "PAX A80",
    marca: "PAX",
    tecnologia: "chip",
    capacidadCaja: 90,
  },

  // CASTLES
  {
    modelo: "Castles Saturn 1000",
    marca: "Castles",
    tecnologia: "android",
    capacidadCaja: 150,
  },
  {
    modelo: "Castles Vega 300",
    marca: "Castles",
    tecnologia: "contactless",
    capacidadCaja: 100,
  },
];