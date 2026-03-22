import { useEffect, useState } from "react";
import type { ApiDetallesAlmacen } from "../mocks/apiDetallesAlmacen";
import { apiDetallesAlmacenMock } from "../mocks/apiDetallesAlmacen";
import Aisle from "../components/stockUbication/Aisle";
import AddPalletButton from "../components/stockUbication/AddPalletButton";
import AddBoxButton from "../components/stockUbication/AddBoxButton";
import FormBox from "../components/stockUbication/forms/FormBox";
import FormPallet from "../components/stockUbication/forms/FormPallet";

export default function StockUbicationPage() {
  const [detalles, setDetalles] = useState<ApiDetallesAlmacen[]>([]);
  const [huecoSeleccionado, setHuecoSeleccionado] = useState<ApiDetallesAlmacen | null>();
  const [mostrarFormCaja, setMostrarFormCaja] = useState(false);
  const [huecoActivo, setHuecoActivo] = useState<ApiDetallesAlmacen | null>(null);
 const [mostrarFormPallet, setMostrarFormPallet] = useState(false);


  const abrirFormCaja = (hueco: ApiDetallesAlmacen) => {
    setHuecoActivo(hueco);
    setMostrarFormCaja(true);
  };

  const cerrarFormCaja = () => {
    setMostrarFormCaja(false);
  };

  const abrirFormPallet = (hueco: ApiDetallesAlmacen) => {
    setHuecoActivo(hueco);
    setMostrarFormPallet(true);
  };

  const cerrarFormPallet = () => {
    setMostrarFormPallet(false);
  };

  useEffect(() => {
    // 🔹 MOCK ahora
    setDetalles(apiDetallesAlmacenMock);

    // 🔹 API real mañana:
    /*
    fetch("/api/detallesAlmacen")
      .then((res) => res.json())
      .then(setDetalles);
    */
  }, []);

  const pasillosMap = new Map<number, ApiDetallesAlmacen[]>();

  detalles.forEach((datoAlmacen) => {
    const pasilloId = datoAlmacen.pasillo.id;

    if (!pasillosMap.has(pasilloId)) {
      pasillosMap.set(pasilloId, []);
    }

    pasillosMap.get(pasilloId)!.push(datoAlmacen);
  });

  const handleHuecoClick = (ubicacion: ApiDetallesAlmacen) => {
    console.log("Hueco seleccionado:", ubicacion);
    setHuecoSeleccionado(ubicacion);
  };

  return (
    <div className="container py-4">
      {huecoSeleccionado && (
        <div className="modal fade show d-block">
          <div className="modal-dialog modal-dialog-scrollable">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Detalle habitaculo</h5>
                <button
                  className="btn-close"
                  onClick={() => setHuecoSeleccionado(null)}
                />
              </div>

              <div className="modal-body">
                <ul className="list-unstyled p-2">
                  <li
                    key={`idUbiAlmacen-${huecoSeleccionado.idHueco}`}
                    className="fw-bold"
                  >
                    idHueco:{" "}
                    <span className="ms-1 fst-italic fw-lighter">
                      {huecoSeleccionado.idHueco}
                    </span>
                  </li>

                  <li
                    key={huecoSeleccionado.almacen.nombre}
                    className="fw-bold"
                  >
                    Nombre almacén:{" "}
                    <span className="ms-1 fst-italic fw-lighter">
                      {huecoSeleccionado.almacen.nombre}
                    </span>{" "}
                  </li>

                  <li
                    key={huecoSeleccionado.pasillo.numero}
                    className="fw-bold"
                  >
                    Pasillo:{" "}
                    <span className="ms-1 fst-italic fw-lighter">
                      {huecoSeleccionado.pasillo.numero}
                    </span>
                  </li>

                  <li
                    key={`nivel-${huecoSeleccionado.estanteria.nivel}`}
                    className="fw-bold"
                  >
                    Nivel estantería:{" "}
                    <span className="ms-1 fst-italic fw-lighter">
                      {huecoSeleccionado.estanteria.nivel}
                    </span>{" "}
                  </li>

                  {huecoSeleccionado.cajas.length > 0 ? (
                    <li
                      key={huecoSeleccionado.pale?.descripcion}
                      className="fw-bold"
                    >
                      Palé referencia:{" "}
                      <span className="ms-1 fst-italic fw-lighter">
                        {huecoSeleccionado.pale?.descripcion}
                      </span>{" "}
                    </li>
                  ) : (
                    ""
                  )}

                  <li
                    key={huecoSeleccionado.ocupacionActual}
                    className="fw-bold"
                  >
                    Numero cajas:{" "}
                    <span className="ms-1 fst-italic fw-lighter">
                      {huecoSeleccionado.ocupacionActual}
                    </span>{" "}
                  </li>

                  <li
                    key={huecoSeleccionado.estanteria.capacidadMaxCajas}
                    className="fw-bold"
                  >
                    Capacidad máxima de cajas por palé:{" "}
                    <span className="ms-1 fst-italic fw-lighter">
                      {huecoSeleccionado.estanteria.capacidadMaxCajas}
                    </span>{" "}
                  </li>

                  {huecoSeleccionado.pale !== null ? (
                    <ul className="fw-bold p-0">
                      Informacion palé:
                      <li
                        className="mx-4"
                        key={`idPale-${huecoSeleccionado.pale.id}`}
                      >
                        {" "}
                        Id:
                        <span className="ms-1 fst-italic fw-lighter">
                          {huecoSeleccionado.pale.id}{" "}
                        </span>
                      </li>
                      <li
                        className="mx-4"
                        key={`${huecoSeleccionado.pale.id}-${huecoSeleccionado.pale.descripcion}`}
                      >
                        {" "}
                        Descripción:
                        <span className="ms-1 fst-italic fw-lighter">
                          {huecoSeleccionado.pale.descripcion}{" "}
                        </span>
                      </li>
                      <li
                        className="mx-4"
                        key={`material-${huecoSeleccionado.pale.material}-${huecoSeleccionado.pale.id}`}
                      >
                        {" "}
                        Material:
                        <span className="ms-1 fst-italic fw-lighter">
                          {huecoSeleccionado.pale.material}{" "}
                        </span>
                      </li>
                      <li
                        className="mx-4"
                        key={`tipo-${huecoSeleccionado.pale.tipo}-${huecoSeleccionado.pale.id}`}
                      >
                        {" "}
                        Tipo:
                        <span className="ms-1 fst-italic fw-lighter">
                          {huecoSeleccionado.pale.tipo}{" "}
                        </span>
                      </li>
                    </ul>
                  ) : (
                    <AddPalletButton onClick={() => abrirFormPallet(huecoSeleccionado)} />)
                  }

                  {huecoSeleccionado.cajas.length > 0 ? (
                    <ul className="fw-bold p-0">
                      Etiquetas caja:
                      {huecoSeleccionado.cajas.map((datos) => (
                        <li className="mx-4" key={datos.etiqueta}>
                          <span className="ms-1 fst-italic fw-lighter">
                            {datos.etiqueta}{" "}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    ""
                  )}

                  {huecoSeleccionado.cajas.length < 8 &&
                    huecoSeleccionado.pale !== null ? (
                    <AddBoxButton onClick={() => abrirFormCaja(huecoSeleccionado)} />
                  ) : (
                    ""
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
      {mostrarFormCaja && huecoActivo && (
        <div className="modal fade show d-block">
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <h5 className="mb-3">Nueva caja</h5>

              <FormBox
                hueco={huecoActivo}
                onSubmit={(data) => {
                  console.log("Nueva caja creada:", data);
                  setMostrarFormCaja(false);
                }}
                onCancel={cerrarFormCaja}
              />
            </div>
          </div>
        </div>
      )}
      {mostrarFormPallet && huecoActivo && (
        <div className="modal fade show d-block">
          <div className="modal-dialog">
            <div className="modal-content p-3">
              <h5 className="mb-3">Nueva caja</h5>

              <FormPallet
                idHueco={huecoActivo.idHueco}
                onSubmit={(data) => {
                  console.log("Nuevo pale creado:", data);
                  setMostrarFormPallet(false);
                }}
                onCancel={cerrarFormPallet}
              />
            </div>
          </div>
        </div>
      )}
      {!huecoSeleccionado && (
        <>
          <h1 className="mb-4">Mapa de Almacén</h1>
          <div className="d-flex flex-column gap-1">
            {Array.from(pasillosMap.entries()).map(
              ([pasilloId, detallesPasillo]) => (
                <Aisle
                  key={pasilloId}
                  pasilloId={pasilloId}
                  numero={detallesPasillo[0].pasillo.numero}
                  ubicaciones={detallesPasillo}
                  onHuecoClick={handleHuecoClick}
                />
              ),
            )}
          </div>
        </>
      )}
    </div>
  );
}
