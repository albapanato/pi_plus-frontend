import { GridCard } from "./GridCard";

export default function GridBoard() {
  return (
    <div className="row g-4">
      <div className="col-12 col-sm-6 col-lg-3">
        <GridCard
          title="Terminales en Stock"
          value="1.240"
          icon="warehouse"
        />
      </div>

      <div className="col-12 col-sm-6 col-lg-3">
        <GridCard
          title="En Tránsito"
          value="350"
          icon="delivery_truck_speed"
        />
      </div>

      <div className="col-12 col-sm-6 col-lg-3">
        <GridCard
          title="Órdenes Pendientes"
          value="42"
          icon="pending_actions"
        />
      </div>

      <div className="col-12 col-sm-6 col-lg-3">
        <GridCard
          title="Expediciones Hoy"
          value="185"
          icon="forklift"
        />
      </div>
    </div>
  );
}