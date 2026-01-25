import type { ApiDetallesAlmacen } from "../../mocks/apiDetallesAlmacen";
import Shelf from "./Shelf";

interface PasilloAlmacenProps {
  pasilloId: number;
  numero: number;
  ubicaciones: ApiDetallesAlmacen[];
  onHuecoClick?: (ubicacion: ApiDetallesAlmacen) => void;
}

export default function PasilloAlmacen({
  pasilloId,
  numero,
  ubicaciones,
  onHuecoClick,
}: PasilloAlmacenProps) {
  if (ubicaciones.length === 0) return null;

  const estanteriasMap = new Map<number, ApiDetallesAlmacen[]>();

  ubicaciones.forEach((ubicacion) => {
    const estanteriaId = ubicacion.estanteria.id;

    if (!estanteriasMap.has(estanteriaId)) {
      estanteriasMap.set(estanteriaId, []);
    }

    estanteriasMap.get(estanteriaId)!.push(ubicacion);
  });

  return (
    <div className="mt-3">
      <div className="bg-white px-3 rounded-1 d-flex justify-content-start gap-4 align-items-end">
        {Array.from(estanteriasMap.entries())
          .sort(([, huecosX], [, huecosY]) => huecosX[0].estanteria.descripcion.localeCompare(huecosY[0].estanteria.descripcion)) // compara dos datos, si el valor de "huecoX".localeCompare("huecoY") → da negativo → entonces el huecoX va antes que huecoY, y así compara todos los valores hasta que los ordena alfabeticamente de A-Z
          .map(([estanteriaId, huecos]) => (
            <Shelf
            key={estanteriaId}
            estanteriaId={estanteriaId}
            huecos={huecos}
            onHuecoClick={onHuecoClick}
            />
          )
        )}
      </div>
        <h4 key={pasilloId} className="fw-lighter px-2">Pasillo {numero}</h4>
    </div>
  );
}