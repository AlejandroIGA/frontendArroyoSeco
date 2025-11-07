import React, { useEffect, useState } from 'react';
import { Capacitor } from '@capacitor/core';
import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    IonBackButton,
    IonList,
    IonItem,
    IonInput,
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonRouterLink,
    IonLoading,
    useIonToast,
    useIonViewWillEnter
} from '@ionic/react';
import { mailOutline, lockClosedOutline } from 'ionicons/icons';
import './Login.css';
import authService from '../../services/authService';
import { useHistory } from 'react-router-dom';
import { AUTHORIZE, CLIENT_ID, REDIRECT_URI } from '../../../axiosConfig'; 

const Login = () => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: '',
        api: '' 
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = { email: '', password: '', api: '' };
        let isValid = true;

        if (!formData.email) {
            newErrors.email = 'El correo electrónico es obligatorio.';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'El formato del correo no es válido.';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'La contraseña es obligatoria.';
            isValid = false;
        } else if (formData.password.length < 4) { 
            newErrors.password = 'La contraseña debe tener al menos 4 caracteres.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleLogin = async () => {
        setErrors(prev => ({ ...prev, api: '' }));
        if (validateForm()) {
            setIsLoading(true);
            try {
                const response = await authService.login(formData); 
                const isNative = Capacitor.isNativePlatform();

                if (isNative) {
                    // --- FLUJO NATIVO ---
                    // La app nativa usa el JSON de la respuesta directamente.
                    const tokens = response.data;
                    
                    if (response.status === 200 && tokens.access_token) {
                        // Copiamos la lógica de tu Callback.jsx
                        sessionStorage.setItem('token', tokens.access_token);
                        sessionStorage.setItem('refresh_token', tokens.refresh_token);
                        sessionStorage.setItem('isSessionActive', true);
                        sessionStorage.setItem('userRole', tokens.user_role.toLowerCase());

                        const userRole = tokens.user_role;
                        let targetPath = '/'; 
                        if (userRole === 'VISITANTE') {
                            targetPath = '/user-dashboard/reservation';
                        } else if (userRole === 'PROPIETARIO') {
                            targetPath = '/user-dashboard/property';
                        }
                        
                        setIsLoading(false);
                        history.replace(targetPath); // Redirige DENTRO de la app
                        return;
                    } else {
                        // El login fue exitoso (status 200) pero no vinieron tokens
                        throw new Error("Respuesta de login inválida para nativo.");
                    }

                } else {
                    // --- FLUJO WEB ---
                    // La app web ignora el JSON y usa el flujo de redirección
                    // basado en la cookie que el backend acaba de establecer.
                    if (response.status === 200) {
                        const authUrl = `${AUTHORIZE}?` + new URLSearchParams({
                            response_type: 'code',
                            client_id: CLIENT_ID,
                            redirect_uri: REDIRECT_URI, // Usa el URI de la web
                            scope: 'read write',
                        });
                        
                        setIsLoading(false);
                        window.location.href = authUrl; // Redirige al navegador
                        return;
                    }
                }
            } catch (error) {
                setIsLoading(false);
                if (error.response) {
                    if (error.response.status === 401) {
                        setErrors(prev => ({ ...prev, api: 'Credenciales inválidas.' }));
                    } else {
                        setErrors(prev => ({ ...prev, api: error.response.data.message || 'Error de autenticación.' }));
                    }
                } else if (error.code === "ERR_NETWORK") {
                    setErrors(prev => ({ ...prev, api: 'Error de conexión.' }));
                } else {
                    setErrors(prev => ({ ...prev, api: 'Ocurrió un error inesperado.' }));
                }
            }
        }
    };

    useIonViewWillEnter(() => {
        setFormData({ email: '', password: '' });
        setErrors({ email: '', password: '', api: '' });
    }, []);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/" />
                    </IonButtons>
                    <IonTitle>Iniciar Sesión</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid className="login-grid">
                    <IonRow className="ion-justify-content-center ion-align-items-center">
                        <IonCol size="12" size-md="8" size-lg="6">
                            <div className="form-container">
                                <h2 className="form-title">Bienvenido</h2>
                                <IonList>
                                    <IonItem>
                                        <IonIcon icon={mailOutline} slot="start" />
                                        <IonInput
                                            label="Correo Electrónico"
                                            labelPlacement="floating"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onIonInput={handleInputChange}
                                        />
                                    </IonItem>
                                    {errors.email && <p className="error-message">{errors.email}</p>}

                                    <IonItem>
                                        <IonIcon icon={lockClosedOutline} slot="start" />
                                        <IonInput
                                            label="Contraseña"
                                            labelPlacement='floating'
                                            name="password"
                                            type="password"
                                            value={formData.password}
                                            onIonInput={handleInputChange}
                                        />
                                    </IonItem>
                                    {errors.password && <p className="error-message">{errors.password}</p>}
                                </IonList>
                                {errors.api && (
                                    <p className="error-message ion-text-center">
                                        {errors.api}
                                    </p>
                                )}
                                <IonButton
                                    expand="block"
                                    onClick={handleLogin}
                                    className="ion-margin-top"
                                >
                                    Ingresar
                                </IonButton>
                                <div className="ion-text-center ion-margin-top register-link-container">
                                    <span>¿No tienes una cuenta? </span>
                                    <IonRouterLink routerLink="/register" className="register-link">
                                        Regístrate aquí
                                    </IonRouterLink>
                                </div>
                                <div className="ion-text-center ion-margin-top register-link-container">
                                    <span>¿Olvidaste tu contraseña? </span>
                                    <IonRouterLink routerLink="/reset-password" className="register-link">
                                        Crea una nueva aquí
                                    </IonRouterLink>
                                </div>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
            <IonLoading
                isOpen={isLoading}
                onDidDismiss={() => setIsLoading(false)}
                message={'Ingresando...'}
                duration={0}
            />
        </IonPage>
    );
};

export default Login;
