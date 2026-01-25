interface AddPalletButtonProps {
  onClick: () => void;
}

function AddPalletButton({ onClick }: AddPalletButtonProps) {
  return (
    <div className="d-flex justify-content-end mt-3">
      <button
        type="button"
        onClick={onClick}
        className="btn btn-sm btn-outline-success"
      >
        <span className="me-1 material-symbols-outlined">pallet</span>
        Asignar palé
      </button>
    </div>
  );
}

export default AddPalletButton;