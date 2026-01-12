import BusquedaSNForm from "../components/BusquedaSNForm"
import BusquedaSNHeader from "../components/BusquedaSNHeader"
import BusquedaSNResult from "../components/BusquedaSNResult"
import "./BusquedaSNPage.css"


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