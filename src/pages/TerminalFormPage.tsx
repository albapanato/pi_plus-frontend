import TerminalFormHeader from "../components/terminal-form/TerminalFormHeader";
import TerminalReadonlyInfo from "../components/terminal-form/TerminalReadonlyInfo";
import TerminalEditableInfo from "../components/terminal-form/TerminalEditableForm";
import TerminalDelete from "../components/terminal-form/TerminalDelete";

function TerminalFormPage() {

  return (
     <div className="container py-4">
      <div className="card shadow-sm">
        {/* HEADER */}
        <TerminalFormHeader />
        <div className="card-body">
          {/* BLOQUE: NO EDITABLE */}
          <TerminalReadonlyInfo />
          <hr className="my-4" />
          {/* BLOQUE: EDITABLE */}
          <TerminalEditableInfo />
          <hr className="my-4" />
          {/* ELIMINAR */}
          <TerminalDelete />
        </div>
      </div>
    </div>
  )
}

export default TerminalFormPage