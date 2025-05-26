import { useState } from "react";

const mockUsers = [
  { id: "1", name: "Juan Pérez" },
  { id: "2", name: "María López" },
  { id: "3", name: "Carlos Gómez" },
];

const mockSessions = [
  { id: "101", label: "Sesión de Cardio" },
  { id: "102", label: "Sesión de Fuerza" },
  { id: "103", label: "Sesión de Yoga" },
];

export default function TrainerGenerateReportPage() {
  const [reportType, setReportType] = useState("");
  const [description, setDescription] = useState("");
  const [reportEntries, setReportEntries] = useState<
    { type: "user" | "session"; id: string; name: string }[]
  >([]);

  const [userQuery, setUserQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);
  const [sessionQuery, setSessionQuery] = useState("");
  const [filteredSessions, setFilteredSessions] = useState(mockSessions);

  const handleAddEntry = () => {
    setReportEntries([
      ...reportEntries,
      { type: reportEntries.length === 0 ? "user" : "session", id: "", name: "" },
    ]);
  };

  const handleRemoveEntry = (index: number) => {
    const updatedEntries = [...reportEntries];
    updatedEntries.splice(index, 1);
    setReportEntries(updatedEntries);
  };

  const handleTypeChange = (index: number, newType: "user" | "session") => {
    const updatedEntries = [...reportEntries];
    updatedEntries[index] = { ...updatedEntries[index], type: newType, id: "", name: "" };
    setReportEntries(updatedEntries);
  };

  const handleSearch = (query: string, type: "user" | "session") => {
    if (type === "user") {
      setUserQuery(query);
      setFilteredUsers(
        mockUsers.filter((user) =>
          user.name.toLowerCase().includes(query.toLowerCase())
        )
      );
    } else {
      setSessionQuery(query);
      setFilteredSessions(
        mockSessions.filter((session) =>
          session.label.toLowerCase().includes(query.toLowerCase())
        )
      );
    }
  };

  const handleSelect = (item: { id: string; name: string }, index: number) => {
    const updatedEntries = [...reportEntries];
    updatedEntries[index] = { ...updatedEntries[index], id: item.id, name: item.name };
    setReportEntries(updatedEntries);

    if (updatedEntries[index].type === "user") setUserQuery("");
    else setSessionQuery("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const reportData = {
      type: reportType,
      description,
      entries: reportEntries,
      generatedAt: new Date().toISOString(),
    };

    console.log("Datos del reporte:", reportData);
    alert("Reporte generado exitosamente (simulado)");
  };

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold text-gray-800">Generar Reporte</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Selección del tipo de reporte */}
        <div>
          <label htmlFor="reportType" className="block text-sm font-medium text-gray-700">
            Tipo de Reporte
          </label>
          <select
            id="reportType"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#990000] focus:border-[#990000]"
            required
          >
            <option value="" disabled>
              Selecciona un tipo de reporte
            </option>
            <option value="USO">Uso</option>
            <option value="ASSISTANCE">Asistencia</option>
            <option value="PHYSICAL_PROGRESS">Progreso físico</option>
            <option value="ACHIEVEMENT_OF_OBJECTIVES">Cumplimiento de objetivos</option>
          </select>
        </div>

        {/* Campo de descripción */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700">
            Descripción
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-[#990000] focus:border-[#990000]"
            rows={4}
            placeholder="Escribe una descripción para el reporte"
            required
          />
        </div>

        {/* Entradas del reporte */}
        <div>
          <h3 className="text-lg font-semibold">Entradas del Reporte</h3>
          {reportEntries.map((entry, index) => (
            <div key={entry.id || index} className="border p-4 rounded-md space-y-2">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium">
                  {entry.type === "user" ? "Usuario" : "Sesión"}
                </label>
                <select
                  value={entry.type}
                  onChange={(e) => handleTypeChange(index, e.target.value as "user" | "session")}
                  className="border p-1 rounded"
                >
                  <option value="user">Usuario</option>
                  <option value="session">Sesión</option>
                </select>
              </div>
              <input
                type="text"
                value={entry.type === "user" ? userQuery : sessionQuery}
                onChange={(e) => handleSearch(e.target.value, entry.type)}
                className="border p-2 w-full rounded"
                placeholder={`Buscar ${entry.type === "user" ? "usuario" : "sesión"}`}
              />
              {(entry.type === "user" ? userQuery : sessionQuery) && (
                <ul className="border rounded mt-2 bg-white max-h-40 overflow-y-auto">
                  {(entry.type === "user" ? filteredUsers : filteredSessions).map((item) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        onClick={() => {
                          const label = 'label' in item ? item.label : item.name;
                          handleSelect({ id: item.id, name: label }, index);
                        }}
                        className="w-full text-left p-2 hover:bg-gray-100 cursor-pointer focus:outline-none"
                      >
                        {'label' in item ? item.label : item.name}
                      </button>
                    </li>
                  ))}
                </ul>
              )}
              {entry.name && (
                <p className="text-sm text-gray-600">
                  Seleccionado: {entry.name} (ID: {entry.id})
                </p>
              )}
              <button
                type="button"
                onClick={() => handleRemoveEntry(index)}
                className="text-red-500 hover:underline"
              >
                Quitar etiqueta
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={handleAddEntry}
            className="mt-2 px-4 py-2 bg-[#990000] text-white font-semibold rounded-md hover:bg-red-700 transition"
          >
            Añadir Etiqueta
          </button>
        </div>

        {/* Botón de envío */}
        <button
          type="submit"
          className="px-4 py-2 bg-[#990000] text-white font-semibold rounded-md hover:bg-red-700 transition"
        >
          Generar Reporte
        </button>
      </form>
    </div>
  );
}