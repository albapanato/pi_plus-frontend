const activities = [
  {
    icon: "check",
    title: "Expedición enviada",
    description: "Destino: Madrid · 50 terminales",
    time: "Hace 12 minutos",
  },
  {
    icon: "input",
    title: "Recepción de mercancía",
    description: "Proveedor: TechPOS · 200 unidades",
    time: "Hace 2 horas",
  },
  {
    icon: "build",
    title: "Cambio de estado",
    description: "Terminal SN 88201-B → Reparación",
    time: "Hace 5 horas",
  },
];

export default function RecentActivity() {
  return (
    <div className="card shadow-sm">
      <div className="card-header bg-white">
        <h3 className="h6 mb-0 fw-bold">Actividad reciente</h3>
      </div>

      <div className="card-body d-flex flex-column gap-3">
        {activities.map((item, index) => (
          <div key={index} className="d-flex gap-3">
            <span className="material-symbols-outlined text-primary">
              {item.icon}
            </span>

            <div>
              <div className="fw-semibold">{item.title}</div>
              <div className="text-muted small">
                {item.description}
              </div>
              <div className="text-muted small">
                {item.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}