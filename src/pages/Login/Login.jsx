import React, { useState } from 'react';
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
    IonLabel,
    IonInput,
    IonButton,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol
} from '@ionic/react';

import { mailOutline, lockClosedOutline } from 'ionicons/icons';
import './Login.css';

const Login = () => {

    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });

    const [errors, setErrors] = useState({
        email: '',
        password: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = { email: '', password: '' };
        let isValid = true;

        // Validación del correo
        if (!formData.email) {
            newErrors.email = 'El correo electrónico es obligatorio.';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'El formato del correo no es válido.';
            isValid = false;
        }

        // Validación de la contraseña
        if (!formData.password) {
            newErrors.password = 'La contraseña es obligatoria.';
            isValid = false;
        } else if (formData.password.length < 6) {
            newErrors.password = 'La contraseña debe tener al menos 6 caracteres.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleLogin = () => {
        if (validateForm()) {
            console.log('Formulario válido, iniciando sesión con:', formData);
        } else {
            console.log('Formulario inválido, revisa los errores.');
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
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

                                <IonButton
                                    expand="block"
                                    onClick={handleLogin}
                                    className="ion-margin-top"
                                >
                                    Ingresar
                                </IonButton>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default Login;