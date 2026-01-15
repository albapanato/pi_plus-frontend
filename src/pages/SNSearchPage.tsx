import BusquedaSNForm from "../components/SNSearch/SNSearchForm"
import BusquedaSNHeader from "../components/SNSearch/SNSearchHeader"
import BusquedaSNResult from "../components/SNSearch/SNSearchResult"


function SNSearchPage() {
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

export default SNSearchPage;
