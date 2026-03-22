import { useMemo, useState, type FormEvent } from "react";
import { apiUrl } from "../auth/session";
import type { Terminal, TerminalApiResponse } from "../components/SNSearch/types";

function nowLocalDateTime(): string {
  return new Date().toISOString().slice(0, 16);
}

function toInputDateTime(value?: string): string {
  if (!value) {
    return "";
  }

  return value.length >= 16 ? value.slice(0, 16) : value;
}

function toApiDateTime(value: string): string {
  if (!value) {
    return value;
  }

  return value.length === 16 ? `${value}:00` : value;
}

function createEmptyTerminal(): Terminal {
  const now = nowLocalDateTime();
  return {
    numeroSerie: "",
    modelo: "",
    marca: "",
    estado: "operativo",
    notas: "",
    fechaIngreso: now,
    fechaCreacion: now,
  };
}

function fromApiTerminal(terminal: Terminal): Terminal {
  return {
    id: terminal.id,
    numeroSerie: terminal.numeroSerie,
    modelo: terminal.modelo,
    marca: terminal.marca,
    estado: terminal.estado,
    notas: terminal.notas || "",
    fechaIngreso: toInputDateTime(terminal.fechaIngreso),
    fechaCreacion: toInputDateTime(terminal.fechaCreacion),
  };
}

function toApiPayload(terminal: Terminal): Terminal {
  return {
    id: terminal.id,
    numeroSerie: terminal.numeroSerie.trim(),
    modelo: terminal.modelo.trim(),
    marca: terminal.marca.trim(),
    estado: terminal.estado,
    notas: terminal.notas.trim(),
    fechaIngreso: toApiDateTime(terminal.fechaIngreso),
    fechaCreacion: toApiDateTime(terminal.fechaCreacion),
  };
}

type EditableTerminalField = Exclude<keyof Terminal, "id">;

export function useSNSearch() {
  const [searchSN, setSearchSN] = useState("");
  const [terminal, setTerminal] = useState<Terminal | null>(null);
  const [formData, setFormData] = useState<Terminal>(createEmptyTerminal());
  const [mode, setMode] = useState<"view" | "edit" | "create">("view");
  const [isSearching, setIsSearching] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isLoadingAll, setIsLoadingAll] = useState(false);
  const [showAllTerminals, setShowAllTerminals] = useState(false);
  const [terminals, setTerminals] = useState<Terminal[]>([]);
  const [feedback, setFeedback] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const isReadOnly = mode === "view";

  const canSave = useMemo(() => {
    return Boolean(
      formData.numeroSerie.trim() &&
      formData.modelo.trim() &&
      formData.marca.trim() &&
      formData.estado &&
      formData.fechaIngreso &&
      formData.fechaCreacion
    );
  }, [formData]);

  const toFriendlyApiError = (raw?: string) => {
    if (!raw) {
      return "Se produjo un error al guardar el equipo.";
    }

    const normalized = raw.toLowerCase();
    const isDuplicateSn =
      normalized.includes("unique") ||
      normalized.includes("constraint") ||
      normalized.includes("duplicate") ||
      normalized.includes("numero_serie");

    if (isDuplicateSn) {
      return "El número de serie ya existe.";
    }

    return raw;
  };

  const resetResult = () => {
    setTerminal(null);
    setMode("view");
  };

  const loadAllTerminals = async () => {
    try {
      setIsLoadingAll(true);
      const response = await fetch(apiUrl("/api/terminales"), {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) {
        throw new Error("No se pudieron cargar las terminales.");
      }

      const data = (await response.json()) as Terminal[];
      const parsed = data.map((item) => fromApiTerminal(item));
      setTerminals(parsed);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error inesperado al cargar terminales.";
      setErrorMessage(message);
    } finally {
      setIsLoadingAll(false);
    }
  };

  const handleToggleAllTerminals = async () => {
    const nextValue = !showAllTerminals;
    setShowAllTerminals(nextValue);

    if (nextValue) {
      setErrorMessage("");
      await loadAllTerminals();
    }
  };

  const handleSelectTerminalFromTable = (selected: { numeroSerie: string }) => {
    const existing = terminals.find((item) => item.numeroSerie === selected.numeroSerie);
    if (!existing) {
      return;
    }

    setTerminal(existing);
    setFormData(existing);
    setSearchSN(existing.numeroSerie);
    setMode("view");
    setFeedback("");
    setErrorMessage("");
  };

  const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setFeedback("");

    const sn = searchSN.trim().toUpperCase();
    setSearchSN(sn);

    if (!sn) {
      setErrorMessage("Introduce un SN para buscar.");
      return;
    }

    try {
      setIsSearching(true);
      const response = await fetch(apiUrl(`/api/terminales/sn/${encodeURIComponent(sn)}`), {
        method: "GET",
        credentials: "include",
      });

      if (response.status === 404) {
        resetResult();
        setErrorMessage(`No se encontró ningún equipo con el numero de serie: ${sn}.`);
        return;
      }

      if (!response.ok) {
        throw new Error("No se pudo completar la búsqueda.");
      }

      const data = (await response.json()) as Terminal;
      const parsed = fromApiTerminal(data);

      setTerminal(parsed);
      setFormData(parsed);
      setMode("view");
      setFeedback(`Equipo encontrado para SN ${parsed.numeroSerie}.`);
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error inesperado en la búsqueda.";
      setErrorMessage(message);
    } finally {
      setIsSearching(false);
    }
  };

  const handleClearSearch = () => {
    setSearchSN("");
    setFeedback("");
    setErrorMessage("");
    resetResult();
  };

  const handleStartCreate = () => {
    setFeedback("");
    setErrorMessage("");
    setTerminal(null);
    setFormData(createEmptyTerminal());
    setMode("create");
  };

  const handleStartEdit = () => {
    if (!terminal) {
      return;
    }

    setFeedback("");
    setErrorMessage("");
    setFormData(terminal);
    setMode("edit");
  };

  const handleCancelEditOrCreate = () => {
    setErrorMessage("");

    if (terminal) {
      setFormData(terminal);
      setMode("view");
      return;
    }

    resetResult();
  };

  const handleCloseDetails = () => {
    setMode("view");
    setTerminal(null);
    setFormData(createEmptyTerminal());
    setFeedback("");
    setErrorMessage("");
  };

  const handleFieldChange = (field: EditableTerminalField, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value } as Terminal));
  };

  const handleDeleteBySn = async () => {
    const sn = terminal?.numeroSerie?.trim();

    if (!sn) {
      setErrorMessage("No hay un número de serie válido para eliminar.");
      return;
    }

    const confirmed = window.confirm(`¿Seguro que quieres eliminar la terminal ${sn}?`);
    if (!confirmed) {
      return;
    }

    try {
      setIsDeleting(true);
      setErrorMessage("");
      setFeedback("");

      const response = await fetch(apiUrl(`/api/terminales/sn/${encodeURIComponent(sn)}`), {
        method: "DELETE",
        credentials: "include",
      });

      const data = (await response.json().catch(() => null)) as TerminalApiResponse | null;

      if (!response.ok) {
        throw new Error(data?.message || data?.error || "No se pudo eliminar el equipo.");
      }

      resetResult();
      setFormData(createEmptyTerminal());
      setSearchSN("");
      setFeedback(`Equipo ${sn} eliminado correctamente.`);

      if (showAllTerminals) {
        await loadAllTerminals();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error inesperado al eliminar el equipo.";
      setErrorMessage(message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDeleteFromTable = async (selected: Pick<Terminal, "numeroSerie">) => {
    const sn = selected.numeroSerie?.trim();

    if (!sn) {
      setErrorMessage("No hay un número de serie válido para eliminar.");
      return;
    }

    const confirmed = window.confirm(`¿Seguro que quieres eliminar la terminal ${sn}?`);
    if (!confirmed) {
      return;
    }

    try {
      setIsDeleting(true);
      setErrorMessage("");
      setFeedback("");

      const response = await fetch(apiUrl(`/api/terminales/sn/${encodeURIComponent(sn)}`), {
        method: "DELETE",
        credentials: "include",
      });

      const data = (await response.json().catch(() => null)) as TerminalApiResponse | null;

      if (!response.ok) {
        throw new Error(data?.message || data?.error || "No se pudo eliminar el equipo.");
      }

      if (terminal?.numeroSerie === sn) {
        resetResult();
        setFormData(createEmptyTerminal());
        setSearchSN("");
      }

      setFeedback(`Equipo ${sn} eliminado correctamente.`);
      await loadAllTerminals();
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error inesperado al eliminar el equipo.";
      setErrorMessage(message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleSaveCreate = async () => {
    if (!canSave) {
      setErrorMessage("Completa los campos obligatorios antes de guardar.");
      return;
    }

    try {
      setIsSaving(true);
      setErrorMessage("");

      const response = await fetch(apiUrl("/api/terminales"), {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(toApiPayload(formData)),
      });

      const data = (await response.json().catch(() => null)) as TerminalApiResponse | null;

      if (!response.ok) {
        throw new Error(toFriendlyApiError(data?.message || data?.error || "No se pudo crear el equipo."));
      }

      const created = data?.insertterminal ? fromApiTerminal(data.insertterminal) : fromApiTerminal(formData);
      setTerminal(created);
      setFormData(created);
      setSearchSN(created.numeroSerie);
      setMode("view");
      setFeedback(`Equipo ${created.numeroSerie} creado correctamente.`);

      if (showAllTerminals) {
        await loadAllTerminals();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error inesperado al crear el equipo.";
      setErrorMessage(toFriendlyApiError(message));
    } finally {
      setIsSaving(false);
    }
  };

  const handleSaveEdit = async () => {
    if (!formData.numeroSerie.trim()) {
      setErrorMessage("No hay un número de serie válido para editar.");
      return;
    }

    if (!canSave) {
      setErrorMessage("Completa los campos obligatorios antes de guardar.");
      return;
    }

    try {
      setIsSaving(true);
      setErrorMessage("");

      const response = await fetch(apiUrl("/api/terminales/sn/" + encodeURIComponent(formData.numeroSerie.trim())), {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(toApiPayload(formData)),
      });

      const data = (await response.json().catch(() => null)) as TerminalApiResponse | null;

      if (!response.ok) {
        throw new Error(toFriendlyApiError(data?.message || data?.error || "No se pudo actualizar el equipo."));
      }

      const updated = data?.updatedterminal ? fromApiTerminal(data.updatedterminal) : fromApiTerminal(formData);
      setSearchSN(updated.numeroSerie);
      setTerminal(null);
      setFormData(createEmptyTerminal());
      setMode("view");
      setFeedback(`Equipo ${updated.numeroSerie} actualizado correctamente.`);

      if (showAllTerminals) {
        await loadAllTerminals();
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Error inesperado al actualizar el equipo.";
      setErrorMessage(toFriendlyApiError(message));
    } finally {
      setIsSaving(false);
    }
  };

  const handleSave = async () => {
    if (mode === "create") {
      await handleSaveCreate();
      return;
    }

    if (mode === "edit") {
      await handleSaveEdit();
    }
  };

  return {
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
  };
}
