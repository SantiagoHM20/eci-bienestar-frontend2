import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AdministratorSessionsPage: React.FC = () => {
  const [extraInfo, setExtraInfo] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://ecibienestar-age6hsb9g4dmegea.canadacentral-01.azurewebsites.net/api/trainer/session-statistics')

      .then(res => setExtraInfo(res.data.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Cargando información adicional...</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Información Adicional</h1>
      <div className="bg-gray-100 p-4 rounded">
        <pre>{JSON.stringify(extraInfo, null, 2)}</pre>
      </div>
    </div>
  );
};

export default AdministratorSessionsPage;
