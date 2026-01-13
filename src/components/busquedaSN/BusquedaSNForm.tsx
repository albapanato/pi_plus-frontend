import "../../styles/BusquedaSNForm.css";


function BusquedaSNForm() {
  return (
    <section className="sn-form">
      <form>
        <input type="text" placeholder="Buscar por serie numérica..." />
        <button type="submit">Buscar</button>
      </form>
    </section>
  );
}

export default BusquedaSNForm;
