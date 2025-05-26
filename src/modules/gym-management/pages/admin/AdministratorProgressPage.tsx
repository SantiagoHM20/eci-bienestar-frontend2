import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis
} from 'recharts';

interface User {
  id: string;
  name: string;
  email: string;
}

interface ProgressData {
  goal: string;
  weight: number;
  height: number;
  waists: number;
  chest: number;
  rightarm: number;
  leftarm: number;
  rightleg: number;
  leftleg: number;
  routine: {
    name: string;
    difficulty: string;
  };
}

const AdministratorProgressPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  const [progress, setProgress] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(false);

  // Obtener usuarios
  useEffect(() => {
    axios.get('https://ecibienestar-age6hsb9g4dmegea.canadacentral-01.azurewebsites.net/api/trainer/users')
      .then(res => setUsers(res.data.data))
      .catch(err => console.error('Error al cargar usuarios:', err));
  }, []);

  // Obtener progreso del usuario seleccionado
  useEffect(() => {
    if (!selectedUserId) return;

    setLoading(true);
    axios.get(`https://ecibienestar-age6hsb9g4dmegea.canadacentral-01.azurewebsites.net/api/user/progress/${selectedUserId}`)
      .then(res => setProgress(res.data.data))
      .catch(err => {
        console.error('Error al cargar progreso físico:', err);
        setProgress(null);
      })
      .finally(() => setLoading(false));
  }, [selectedUserId]);

  // Preparar datos para las gráficas
  const chartData = progress ? [
    { name: 'Peso', value: progress.weight },
    { name: 'Cintura', value: progress.waists },
    { name: 'Pecho', value: progress.chest },
    { name: 'Brazo Der.', value: progress.rightarm },
    { name: 'Brazo Izq.', value: progress.leftarm },
    { name: 'Pierna Der.', value: progress.rightleg },
    { name: 'Pierna Izq.', value: progress.leftleg },
  ] : [];

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Progreso Físico de Usuarios</h1>

      <div className="mb-4">
        <label className="font-semibold mr-2">Selecciona un usuario:</label>
        <select
          onChange={(e) => setSelectedUserId(e.target.value)}
          className="border p-2 rounded"
        >
          <option value="">-- Selecciona --</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name} ({user.email})
            </option>
          ))}
        </select>
      </div>

      {loading && <p>Cargando progreso físico...</p>}

      {progress && (
        <div className="bg-gray-100 p-4 rounded shadow-md">
          <h2 className="text-xl font-semibold mb-4">Meta: {progress.goal}</h2>
          <p className="mb-2"><strong>Rutina:</strong> {progress.routine?.name} ({progress.routine?.difficulty})</p>

          {/* Tabla */}
          <table className="table-auto w-full mb-6 border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 border">Medida</th>
                <th className="p-2 border">Valor</th>
              </tr>
            </thead>
            <tbody>
              <tr><td className="p-2 border">Peso</td><td className="p-2 border">{progress.weight} kg</td></tr>
              <tr><td className="p-2 border">Altura</td><td className="p-2 border">{progress.height} m</td></tr>
              <tr><td className="p-2 border">Cintura</td><td className="p-2 border">{progress.waists} cm</td></tr>
              <tr><td className="p-2 border">Pecho</td><td className="p-2 border">{progress.chest} cm</td></tr>
              <tr><td className="p-2 border">Brazo Derecho</td><td className="p-2 border">{progress.rightarm} cm</td></tr>
              <tr><td className="p-2 border">Brazo Izquierdo</td><td className="p-2 border">{progress.leftarm} cm</td></tr>
              <tr><td className="p-2 border">Pierna Derecha</td><td className="p-2 border">{progress.rightleg} cm</td></tr>
              <tr><td className="p-2 border">Pierna Izquierda</td><td className="p-2 border">{progress.leftleg} cm</td></tr>
            </tbody>
          </table>

          {/* Gráfica de Barras */}
          <h3 className="text-lg font-semibold mb-2">Gráfica de Comparación</h3>
          <div className="w-full h-64 mb-8">
            <ResponsiveContainer>
              <BarChart data={chartData}>
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdministratorProgressPage;
