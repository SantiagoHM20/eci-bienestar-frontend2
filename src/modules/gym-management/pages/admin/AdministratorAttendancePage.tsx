import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from 'recharts';

const AdministratorAttendancePage: React.FC = () => {
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get('https://ecibienestar-age6hsb9g4dmegea.canadacentral-01.azurewebsites.net/api/trainer/students-by-session')
      .then((res) => setStats(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando estadísticas...</p>;

  // Convertimos los datos en un arreglo si no lo están
  const data = Object.entries(stats || {}).map(([session, count]) => ({
    session,
    count,
  }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Asistencia por Sesión</h1>

      <div className="w-full h-[400px] bg-white p-4 rounded shadow">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="session" angle={-20} textAnchor="end" interval={0} height={70} />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="count" fill="#2563eb" name="Estudiantes" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AdministratorAttendancePage;
