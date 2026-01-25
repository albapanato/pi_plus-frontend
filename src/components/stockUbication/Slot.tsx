import type { ApiDetallesAlmacen } from "../../mocks/apiDetallesAlmacen";

interface HuecoAlmacenProps {
  ubicacion: ApiDetallesAlmacen;
  onClick?: (ubicacion: ApiDetallesAlmacen) => void;
}

export default function HuecoAlmacen({
  ubicacion,
  onClick,
}: HuecoAlmacenProps) {
  const { ocupacionActual, estanteria, referencia } = ubicacion;
  
  const ratio = ocupacionActual / estanteria.capacidadMaxCajas;

  const getBgClass = () => {
    if (ratio === 0) return "bg-success";
    if (ratio < 1) return "bg-warning";
    return "bg-danger";
  };

  

  return (
    <div
      className={`d-flex flex-column align-items-center justify-content-center text-white fw-bold rounded ${getBgClass()}`}
      style={{
        width: "60px",
        height: "60px",
        cursor: "pointer",
      }}
      title={`Ubicación ${referencia} (${ocupacionActual}/${estanteria.capacidadMaxCajas})`}
      onClick={() => onClick?.(ubicacion)}
    >
      {ocupacionActual}/{estanteria.capacidadMaxCajas}
      {(ubicacion.pale!==null&&ubicacion.ocupacionActual===0)?(
        <div className="w-75 d-flex justify-content-center p-1 bg-warning bg-opacity-75">

        </div>
      ):(null)}
      <div>
      </div>
    </div>
  );
}