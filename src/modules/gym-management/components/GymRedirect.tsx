import { Role } from "@/common/types";
import { useEffect, useState } from "react";
import { useAuth } from "@common/context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apiClient from "@/common/services/apiClient";

function GymRedirect() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [checked, setChecked] = useState(false);

    useEffect(() => {
        const verifyUserRegistration = async () => {
            if (!user) {
                console.warn("No hay usuario autenticado.");
                return;
            }

            console.log("Usuario autenticado:", user);

            try {
                const encodedEmail = encodeURIComponent(user.email);
                console.log("Consultando usuario en backend (apiClient):", `/user/users/email?email=${encodedEmail}`);

                // Use central apiClient so the baseURL comes from env/config and matches other service calls
                const response = await apiClient.get(`/user/users/email`, { params: { email: user.email } });
                const userData = response.data?.data ?? null;

                if (userData && userData.email) {
                    sessionStorage.setItem("email", userData.email);
                } else {
                    console.warn("Respuesta del backend: user data vacía o no contiene email", response.data);
                }

                console.log("Respuesta del backend:", userData);

                // Redirección por rol
                if (user.role === Role.ADMINISTRATOR) {
                    console.log("Redirigiendo a administrador");
                    navigate("admin/index", { replace: true });
                    return;
                }else if (user.role === Role.TRAINER) {
                    console.log("Redirigiendo a entrenador");
                    navigate("trainer/index", { replace: true });
                    return;
                }else if (user.role === Role.STUDENT) {
                    if(!userData.registered){
                        console.warn("Usuario no registrado, redirigiendo a registro");
                        navigate("student/index", { replace: true });
                    }else{
                        console.log("Redirigiendo a estudiante");
                        navigate("student/home", { replace: true });
                    }
                }
            } catch (error) {
                if (axios.isAxiosError(error)) {
                    console.error("Error Axios al verificar el registro:", {
                        message: error.message,
                        status: error.response?.status,
                        data: error.response?.data,
                        url: error.config?.url,
                    });

                    // Si el backend responde 404 (usuario no encontrado), tratamos como usuario no registrado
                    if (error.response?.status === 404) {
                        console.warn("Usuario no encontrado en backend — redirigiendo a registro de estudiante");
                        navigate("student/index", { replace: true });
                        return;
                    }
                } else {
                    console.error("Error inesperado al verificar el registro del usuario:", error);
                }

                // Para otros errores mostramos not-found
                navigate("/not-found", { replace: true });
            } finally {
                setChecked(true);
            }
        };

        verifyUserRegistration();
    }, [user, navigate]);

    if (!checked) {
        return (
            <div className="flex items-center justify-center h-screen">
                <p className="text-lg">Verificando tu registro...</p>
            </div>
        );
    }

    return null;
}

export default GymRedirect;
