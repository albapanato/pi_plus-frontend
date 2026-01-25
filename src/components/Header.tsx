

export default function Header() {
  return (
    <header
      className="border-bottom bg-light d-flex align-items-center justify-content-start gap-2 ms-4"
      style={{ height: "50px" }}
    >
      <span className="material-symbols-outlined text-primary">
        flare
      </span>

      <h1 className="h6 m-0 fw-bold">PI-PLUS</h1>
    </header>
  );
}