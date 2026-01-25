import type { ApiDetallesAlmacen } from "../../mocks/apiDetallesAlmacen";
import Slot from "./Slot";

interface EstanteriaAlmacenProps {
  estanteriaId: number;
  huecos: ApiDetallesAlmacen[];
  onHuecoClick?: (ubicacion: ApiDetallesAlmacen) => void;
}

export default function EstanteriaAlmacen({
  estanteriaId,
  huecos,
  onHuecoClick,
}: EstanteriaAlmacenProps) {
  if (huecos.length === 0) return null;

  const { descripcion } = huecos[0].estanteria;

  return (
    <div className="m-1">
      <div className="bg-secondary bg-opacity-75 p-1 d-flex flex-column justify-content-between gap-1 shadow-lg" style={{ width: "max-content" }}>
        <div className="d-flex flex-column gap-2 flex-wrap">

          {// [...huecos] --> clona el array para pintar, así no alterar los datos que te vienen de la API.
            [...huecos].sort((b, a) => Number(a.estanteria.nivel) - Number(b.estanteria.nivel)) // a-b -> ascendente (de menor a mayor) ; b-a -> descendente (de mayor a menos)
              .map((ubicacion) => (
                <Slot
                  key={ubicacion.idHueco}
                  ubicacion={ubicacion}
                  onClick={onHuecoClick} />
              )
              )
          }
        </div>
        <div className="fw-bold text-center" key={estanteriaId}>
          {descripcion}
        </div>
      </div>
    </div>
  );
}