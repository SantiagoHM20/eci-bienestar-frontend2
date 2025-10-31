import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./common/dashboard";
import Layout from "./common/layout/layout";
import ForgotPassword from "./modules/auth/components/ForgotPassword";
import { GymRoutes } from "@modules/gym-management/routes";
import { useAuth } from "./common/context";
import { Role } from "./common/types";
import { ProtectedRoute, Root } from "@common/components";
import { useState } from 'react';
import { LogIn, UserPlus, Mail, Lock, User, Briefcase } from 'lucide-react';
import { login, register } from './services/authService';

const MODULE_MAPPING = {
  health: "turnos",
  recreation: "salas",
  extracurricular: "clases",
  sports: "prestamos",
  gym: "seguimiento",
  users: "usuarios",
  statistics: "estadisticas",
};

// Module Colors
const moduleColors = {
  health: "#0078B4", // Turnos de Salud
  recreation: "#0E7029", // Salas Recreativas
  extracurricular: "#362550", // Clases Extra
  sports: "#5B1F00", // Préstamos Deportivos
  gym: "#1A1A1A", // Gimnasio/Seguimiento
  users: "#990000", // Gestión Usuarios
  statistics: "#990000", // Estadísticas
  default: "#990000", // Color por defecto para dashboard
};

// Componentes de módulos
const ModuleTemplate: React.FC<{ title: string; color: string }> = ({
  title,
}) => (
  <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold text-gray-800 mb-6">{title}</h1>
    <div className="bg-white rounded-lg shadow p-6">
      <p className="text-gray-600">
        Contenido del módulo {title} - En desarrollo
      </p>
    </div>
  </div>
);

type AuthMode = 'login' | 'register';

function App() {
  const { user } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'STUDENT',
  });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      if (mode === 'login') {
        const res = await login(formData.email, formData.password, formData.role);
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setError('Credenciales inválidas');
        }
      } else {
        const res = await register(formData.name, formData.email, formData.password, formData.role);
        if (res.ok) {
          setIsAuthenticated(true);
        } else {
          setError('Error al registrar');
        }
      }
    } catch {
      setError('Error de red');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setFormData({ name: '', email: '', password: '', role: 'STUDENT' });
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    resetForm();
    setError(null);
  };

  const handleNotificationsClick = () => {
    console.log("Mostrando notificaciones...");
    // Aquí iría la lógica para mostrar notificaciones
  };

  if (isAuthenticated) {
    return (
      <Routes>
        {/* Ruta inicial - login */}
        <Route path="/" element={<Root />} />

        {/* Restaurar contrasena*/}
        <Route path="/forgot-password" element={<ForgotPassword />} />

        <Route element={<ProtectedRoute />}>
          {/* Ruta principal - Dashboard */}
          <Route
            path="/home"
            element={
              <Layout
                moduleColor={moduleColors.default}
                showSidebar={true}
                onNotificationsClick={handleNotificationsClick}
              >
                <Dashboard />
              </Layout>
            }
          />

          {/* Módulo de Salud/Turnos */}
          <Route
            path="/modules/health/*"
            element={
              <Layout
                moduleColor={moduleColors.health}
                activeModule={MODULE_MAPPING.health}
                onNotificationsClick={handleNotificationsClick}
                showSidebar={user?.role === Role.ADMINISTRATOR}
              >
                <ModuleTemplate
                  title="Gestión de Turnos"
                  color={moduleColors.health}
                />
              </Layout>
            }
          />

          {/* Módulo de Recreación/Salas */}
          <Route
            path="/modules/recreation/*"
            element={
              <Layout
                moduleColor={moduleColors.recreation}
                activeModule={MODULE_MAPPING.recreation}
                onNotificationsClick={handleNotificationsClick}
              >
                <ModuleTemplate
                  title="Gestión de Salas Recreativas"
                  color={moduleColors.recreation}
                />
              </Layout>
            }
          />

          {/* Módulo de Clases Extracurriculares */}
          <Route
            path="/modules/extracurricular/*"
            element={
              <Layout
                moduleColor={moduleColors.extracurricular}
                activeModule={MODULE_MAPPING.extracurricular}
                onNotificationsClick={handleNotificationsClick}
              >
                <ModuleTemplate
                  title="Clases Extracurriculares"
                  color={moduleColors.recreation}
                />
              </Layout>
            }
          />

          {/* Módulo de Préstamos Deportivos */}
          <Route
            path="/modules/sports/*"
            element={
              <Layout
                moduleColor={moduleColors.sports}
                activeModule={MODULE_MAPPING.sports}
                onNotificationsClick={handleNotificationsClick}
              >
                <ModuleTemplate
                  title="Préstamos Deportivos"
                  color={moduleColors.sports}
                />
              </Layout>
            }
          />

          {/* Módulo de Gimnasio/Seguimiento */}
          <Route
            path="/modules/gym/*"
            element={
              <Layout
                //Si el rol del usuario es administrador, se muestra el color del módulo en rojo
                moduleColor={user?.role === Role.ADMINISTRATOR ? "#990000" : moduleColors.gym}
                activeModule={MODULE_MAPPING.gym}
                onNotificationsClick={handleNotificationsClick}
                showSidebar={user?.role === Role.STUDENT}
              >
                <GymRoutes />
              </Layout>
            }
          />

          {/* Módulo de Estadísticas */}
          <Route
            path="/modules/statistics/*"
            element={
              <Layout
                moduleColor={moduleColors.statistics}
                activeModule={MODULE_MAPPING.statistics}
                onNotificationsClick={handleNotificationsClick}
              >
                <ModuleTemplate
                  title="Estadísticas y Reportes"
                  color={moduleColors.statistics}
                />
              </Layout>
            }
          />

          {/* Módulo de Usuarios */}
          <Route
            path="/modules/users/*"
            element={
              <Layout
                moduleColor={moduleColors.users}
                activeModule={MODULE_MAPPING.users}
                onNotificationsClick={handleNotificationsClick}
              >
                <ModuleTemplate
                  title="Gestión de Usuarios"
                  color={moduleColors.users}
                />
              </Layout>
            }
          />
        </Route>

        {/* Ruta de fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-[#850000] rounded-2xl mb-4 shadow-lg">
            <Briefcase className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">EciBienestar</h1>
          <p className="text-gray-600">Tu bienestar es nuestra prioridad</p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => switchMode('login')}
              className={`flex-1 py-4 text-center font-semibold transition-all ${
                mode === 'login'
                  ? 'text-[#850000] border-b-2 border-[#850000] bg-red-50'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <LogIn className="w-5 h-5 inline-block mr-2" />
              Iniciar Sesión
            </button>
            <button
              onClick={() => switchMode('register')}
              className={`flex-1 py-4 text-center font-semibold transition-all ${
                mode === 'register'
                  ? 'text-[#850000] border-b-2 border-[#850000] bg-red-50'
                  : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <UserPlus className="w-5 h-5 inline-block mr-2" />
              Registrarse
            </button>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {mode === 'register' && (
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre Completo
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#850000] focus:border-transparent transition-all outline-none"
                    placeholder="Juan Pérez"
                  />
                </div>
              </div>
            )}

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Correo Electrónico
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#850000] focus:border-transparent transition-all outline-none"
                  placeholder="tu@ejemplo.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full pl-11 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#850000] focus:border-transparent transition-all outline-none"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {/* Campo de rol para login y registro */}
            {(mode === 'register' || mode === 'login') && (
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-2">
                  Rol
                </label>
                <select
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#850000] focus:border-transparent transition-all outline-none bg-white"
                >
                  <option value="STUDENT">Estudiante</option>
                  <option value="TRAINER">Entrenador</option>
                </select>
              </div>
            )}

            <button
              type="submit"
              className="w-full bg-[#850000] text-white py-3 rounded-lg font-semibold hover:bg-[#6d0000] transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              {mode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </button>

            {error && (
              <div className="text-center text-red-600 text-sm">{error}</div>
            )}

            {mode === 'login' && (
              <div className="text-center">
                <a href="#" className="text-sm text-[#850000] hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            )}
          </form>
        </div>

        <p className="text-center text-sm text-gray-600 mt-6">
          Al continuar, aceptas nuestros términos y condiciones
        </p>
      </div>
    </div>
  );
}

export default App;
