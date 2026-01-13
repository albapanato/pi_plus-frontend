import BusquedaSNForm from "../components/busquedaSN/BusquedaSNForm"
import BusquedaSNHeader from "../components/busquedaSN/BusquedaSNHeader"
import BusquedaSNResult from "../components/busquedaSN/BusquedaSNResult"
import "../styles/BusquedaSNPage.css"


function BusquedaSNPage() {

  const onHandleAdd = () => {
    alert("Agregar equipo")
  }
  return (
    <div className="sn-page">
      <BusquedaSNHeader onAdd={onHandleAdd} />
      <BusquedaSNForm />
      <BusquedaSNResult />

    </div>
  )
}

export default BusquedaSNPage