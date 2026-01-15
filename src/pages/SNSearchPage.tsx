import SNSearchForm from "../components/SNSearch/SNSearchForm"
import SNSearchHeader from "../components/SNSearch/SNSearchHeader"
import SNSearchResult from "../components/SNSearch/SNSearchResult"


function SNSearchPage() {
  const onHandleAdd = () => {
    alert("Agregar equipo");
  };
  return (
    <div className="container py-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <SNSearchHeader onAdd={onHandleAdd} />
          <SNSearchForm />
          <hr className="my-4" />
          <SNSearchResult />
        </div>
      </div>
    </div>
  );
}

export default SNSearchPage;
