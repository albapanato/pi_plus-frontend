import "../../styles/BusquedaSNHeader.css";


 type Props = {
    onAdd: () => void;
 };

function BusquedaSNHeader({onAdd}: Props) {

  return (
    <section className="sn-header">
        <h1>Búsqueda por Serie Numérica</h1>
        <button type="button" onClick={onAdd}>+ Agregar Equipo</button>
    </section>
  )
}

export default BusquedaSNHeader