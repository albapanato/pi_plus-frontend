export function GridCard({
  title,
  value,
  icon,
}: {
  title: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="card h-100 shadow-sm">
      <div className="card-body">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <span className="material-symbols-outlined text-primary">
            {icon}
          </span>
        </div>
        <p className="card-text text-muted mb-1">{title}</p>
        <h3 className="fw-bold mb-0">{value}</h3>
      </div>
    </div>
  );
}