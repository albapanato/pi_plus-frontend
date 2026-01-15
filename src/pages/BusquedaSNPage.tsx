import BusquedaSNForm from "../components/busquedaSN/BusquedaSNForm"
import BusquedaSNHeader from "../components/busquedaSN/BusquedaSNHeader"
import BusquedaSNResult from "../components/busquedaSN/BusquedaSNResult"
import "../styles/BusquedaSNPage.css"

function BusquedaSNPage() {
  const onHandleAdd = () => {
    alert("Agregar equipo");
  };
  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <BusquedaSNHeader onAdd={onHandleAdd} />
          <BusquedaSNForm />
          <hr className="my-4" />
          <BusquedaSNResult />
        </div>
      </div>
    </div>
  );
}

export default BusquedaSNPage;
