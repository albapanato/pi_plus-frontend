interface AddBoxButtonProps {
  onClick: () => void;
}

function AddBoxButton({ onClick }: AddBoxButtonProps) {
  return (
    <div className="d-flex justify-content-end">
      <button
        onClick={onClick}
        className="btn btn-sm btn-outline-primary"
      >
        Agregar caja
        <span className="ms-1 material-symbols-outlined">box_add</span>
      </button>
    </div>
  );
}

export default AddBoxButton;