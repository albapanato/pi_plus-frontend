import "./BusquedaSNResult.css";

function BusquedaSNResult() {
  return (
    <section className="sn-result">
      <div className="header-result">
        <h3>Resultados de la búsqueda:</h3>
        <h4>Detalles para el SN: 123465466</h4>

        <button>Editar</button>
      </div>

      <fieldset>
        <label>Modelo:</label>
        <input type="text" value="Modelo X" readOnly />

        <label>Marca:</label>
        <input type="text" value="Marca Y" readOnly />

        <label>Estado:</label>
        <input type="text" value="En uso" readOnly />

        <label>Ubicación:</label>
        <input type="text" value="Oficina Central" readOnly />
      </fieldset>
    </section>
  );
}

export default BusquedaSNResult;
