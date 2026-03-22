import SNSearchActionButton from "../components/SNSearch/bottons/SNSearchActionButton";
import SNSearchTerminalTable from "../components/SNSearch/SNSearchTerminalTable";
import { estadoOptions, formatEstado } from "../components/SNSearch/types";
import { useSNSearch } from "../hooks/useSNSearch";

export default function SNSearchPage() {
  const {
    searchSN,
    setSearchSN,
    terminal,
    formData,
    mode,
    isSearching,
    isSaving,
    isDeleting,
    isLoadingAll,
    showAllTerminals,
    terminals,
    feedback,
    errorMessage,
    isReadOnly,
    canSave,
    loadAllTerminals,
    handleToggleAllTerminals,
    handleSelectTerminalFromTable,
    handleSearch,
    handleClearSearch,
    handleStartCreate,
    handleStartEdit,
    handleCancelEditOrCreate,
    handleCloseDetails,
    handleFieldChange,
    handleDeleteBySn,
    handleDeleteFromTable,
    handleSave,
  } = useSNSearch();

  return (
    <div className="container w-75 sn-search-page">
      <div className="card shadow-sm rounded-0 border-0">
        <div className="card-body">
          <div className="d-flex align-items-center justify-content-between mb-4">
            <div>
              <h1 className="h4 mb-1">Búsqueda por Serie Numérica</h1>
              <p className="text-muted mb-0">Escanea o introduce el SN para localizar el equipo.</p>
            </div>
            <div className="d-flex gap-2">
              <SNSearchActionButton
                type="button"
                variant="outline-primary"
                onClick={handleToggleAllTerminals}
                label={showAllTerminals ? "Ocultar terminales" : "Ver todas las terminales"}
              />
              <SNSearchActionButton type="button" onClick={handleStartCreate} label="+ Agregar Equipo" />
            </div>
          </div>

          <form className="mb-3" onSubmit={handleSearch}>
            <div className="row g-3 align-items-center">
              <div className="col-12 col-md">
                <div className="input-group w-100">
                  <span className="input-group-text">
                    <span className="material-symbols-outlined">qr_code_scanner</span>
                  </span>

                  <input
                    type="text"
                    className="form-control"
                    placeholder="Buscar por serie numérica..."
                    value={searchSN}
                    onChange={(event) => setSearchSN(event.target.value)}
                  />

                  <SNSearchActionButton
                    type="button"
                    variant="outline-secondary"
                    onClick={handleClearSearch}
                    label="Limpiar"
                  />
                </div>
              </div>

              <div className="col-12 col-md-auto">
                <SNSearchActionButton
                  type="submit"
                  className="w-100"
                  isLoading={isSearching}
                  loadingLabel="Buscando..."
                  label="Buscar"
                />
              </div>
            </div>
          </form>

          {feedback && <div className="alert alert-success py-2">{feedback}</div>}
          {errorMessage && <div className="alert alert-danger py-2">{errorMessage}</div>}

          {showAllTerminals && (
            <SNSearchTerminalTable
              terminals={terminals}
              isLoading={isLoadingAll}
              isDeleting={isDeleting}
              selectedSN={terminal?.numeroSerie}
              onRefresh={loadAllTerminals}
              onSelect={handleSelectTerminalFromTable}
              onDelete={handleDeleteFromTable}
            />
          )}

          {(mode !== "view" || terminal) && (
            <>
              <hr className="m-0" />

              <div className="card border-0">
                <div className="card-body">
                  <div className="d-flex justify-content-between align-items-start gap-3">
                    <div>
                      <h3 className="h6 mb-1">{mode === "create" ? "Nuevo equipo" : "Resultados de la búsqueda"}</h3>
                      <div className="text-muted">
                        {mode === "create" ? (
                          "Completa el formulario para registrar una terminal nueva"
                        ) : (
                          <>
                            Detalles para el SN: <span className="fw-semibold">{formData.numeroSerie}</span>
                          </>
                        )}
                      </div>
                    </div>

                    <div className="d-flex gap-2">

                      {mode === "view" && terminal && (
                        <>
                          <SNSearchActionButton
                            type="button"
                            size="sm"
                            variant="outline-danger"
                            onClick={handleDeleteBySn}
                            isLoading={isDeleting}
                            loadingLabel="Eliminando..."
                            label="Eliminar"
                          />
                          <SNSearchActionButton
                            type="button"
                            size="sm"
                            variant="outline-primary"
                            onClick={handleStartEdit}
                            disabled={isDeleting}
                            label="Editar"
                          />
                        </>
                      )}

                      {(mode === "edit" || mode === "create") && (
                        <>
                          <SNSearchActionButton
                            type="button"
                            size="sm"
                            variant="success"
                            onClick={handleSave}
                            disabled={!canSave}
                            isLoading={isSaving}
                            loadingLabel="Guardando..."
                            label={mode === "create" ? "Guardar Equipo" : "Guardar cambios"}
                          />
                          <SNSearchActionButton
                            type="button"
                            size="sm"
                            variant="outline-secondary"
                            onClick={handleCancelEditOrCreate}
                            disabled={isSaving}
                            label="Cancelar"
                          />
                        </>
                      )}
                      <SNSearchActionButton
                        type="button"
                        size="sm"
                        variant="outline-secondary"
                        label={<i className="bi bi-x-lg" aria-hidden="true" />}
                        title="Cerrar"
                        aria-label="Cerrar"
                        onClick={handleCloseDetails}
                        disabled={isSaving || isDeleting}
                      />
                    </div>
                  </div>

                  <hr className="my-2" />

                  <div className="row g-2 p-1 rounded-1">
                    <div className="col-12 col-md-6">
                      <label className="form-label mb-1">Número de Serie</label>
                      <input
                        className="form-control"
                        type="text"
                        value={formData.numeroSerie}
                        onChange={(event) => handleFieldChange("numeroSerie", event.target.value.toUpperCase())}
                        readOnly={isReadOnly || mode === "edit"}
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label mb-1">Estado</label>
                      {isReadOnly ? (
                        <div className="form-control bg-white">{formatEstado(formData.estado)}</div>
                      ) : (
                        <select
                          className="form-select"
                          value={formData.estado}
                          onChange={(event) => handleFieldChange("estado", event.target.value)}
                        >
                          {estadoOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label mb-1">Modelo</label>
                      <input
                        className="form-control"
                        type="text"
                        value={formData.modelo}
                        onChange={(event) => handleFieldChange("modelo", event.target.value)}
                        readOnly={isReadOnly}
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label mb-1">Marca</label>
                      <input
                        className="form-control"
                        type="text"
                        value={formData.marca}
                        onChange={(event) => handleFieldChange("marca", event.target.value)}
                        readOnly={isReadOnly}
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label mb-1">Fecha Ingreso</label>
                      <input
                        className="form-control"
                        type="datetime-local"
                        value={formData.fechaIngreso}
                        onChange={(event) => handleFieldChange("fechaIngreso", event.target.value)}
                        readOnly={isReadOnly}
                      />
                    </div>

                    <div className="col-12 col-md-6">
                      <label className="form-label mb-1">Fecha Creación</label>
                      <input
                        className="form-control"
                        type="datetime-local"
                        value={formData.fechaCreacion}
                        onChange={(event) => handleFieldChange("fechaCreacion", event.target.value)}
                        readOnly={isReadOnly}
                      />
                    </div>

                    <div className="col-12 p-2">
                      <label className="form-label mb-1">Notas</label>
                      <textarea
                        className="form-control"
                        rows={3}
                        value={formData.notas}
                        onChange={(event) => handleFieldChange("notas", event.target.value)}
                        readOnly={isReadOnly}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
