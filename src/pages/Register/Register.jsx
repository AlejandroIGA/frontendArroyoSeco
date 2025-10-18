import React, { useState } from 'react';
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonBackButton, IonList, IonItem, IonInput, IonButton,
    IonIcon, IonGrid, IonRow, IonCol,
    IonRouterLink
} from '@ionic/react';
import { personOutline, callOutline, earthOutline, mailOutline, lockClosedOutline } from 'ionicons/icons';
import './Register.css'; // Usaremos un CSS idéntico al del login
import authService from '../../services/authService';

import { useHistory } from 'react-router-dom';

const RegisterPage = () => {
    const history = useHistory();

    // 1. Expandimos el estado para los nuevos campos
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        phone: '',
        country: '',
        email: '',
        psw: ''
    });

    // 2. Expandimos el estado de errores
    const [errors, setErrors] = useState({
        name: '',
        lastName: '',
        phone: '',
        country: '',
        email: '',
        psw: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // 3. Actualizamos la función de validación
    const validateForm = () => {
        const newErrors = { name: '', lastName: '', phone: '', country: '', email: '', psw: '' };
        let isValid = true;

        if (!formData.name) {
            newErrors.name = 'El nombre es obligatorio.';
            isValid = false;
        }
        if (!formData.lastName) {
            newErrors.lastName = 'Los apellidos son obligatorios.';
            isValid = false;
        }
        if (!formData.phone) {
            newErrors.phone = 'El número de teléfono es obligatorio.';
            isValid = false;
        }
        if (!formData.country) {
            newErrors.country = 'El país es obligatorio.';
            isValid = false;
        }
        if (!formData.email) {
            newErrors.email = 'El correo es obligatorio.';
            isValid = false;
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'El formato del correo no es válido.';
            isValid = false;
        }
        if (!formData.psw) {
            newErrors.psw = 'La contraseña es obligatoria.';
            isValid = false;
        } else if (formData.psw.length < 4) {
            newErrors.psw = 'La contraseña debe tener al menos 6 caracteres.';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleRegister = async () => {
        setErrors(prev => ({ ...prev, api: '' }));
        if (validateForm()) {
            await authService.register(formData)
            setFormData({
        name: '',
        lastName: '',
        phone: '',
        country: '',
        email: '',
        psw: ''
    });
            history.push('/login')
        } else {
            setErrors(prev => ({ ...prev, api: 'Ocurrio un error al registrar los datos' }));
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/login" />
                    </IonButtons>
                    <IonTitle>Crear Cuenta</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonGrid className="login-grid">
                    <IonRow className="ion-justify-content-center ion-align-items-center">
                        <IonCol size="12" size-md="8" size-lg="6">
                            <div className="form-container">
                                <h2 className="form-title">Regístrate</h2>
                                <IonList>
                                    {/* --- NUEVOS CAMPOS --- */}
                                    <IonItem>
                                        <IonIcon icon={personOutline} slot="start" />
                                        <IonInput label="Nombre" labelPlacement="floating" name="name" type="text" value={formData.name} onIonInput={handleInputChange} />
                                    </IonItem>
                                    {errors.name && <p className="error-message">{errors.name}</p>}

                                    <IonItem>
                                        <IonIcon icon={personOutline} slot="start" />
                                        <IonInput label="Apellidos" labelPlacement="floating" name="lastName" type="text" value={formData.lastName} onIonInput={handleInputChange} />
                                    </IonItem>
                                    {errors.lastName && <p className="error-message">{errors.lastName}</p>}

                                    <IonItem>
                                        <IonIcon icon={callOutline} slot="start" />
                                        <IonInput label="Número de teléfono" labelPlacement="floating" name="phone" type="tel" value={formData.phone} onIonInput={handleInputChange} />
                                    </IonItem>
                                    {errors.phone && <p className="error-message">{errors.phone}</p>}

                                    <IonItem>
                                        <IonIcon icon={earthOutline} slot="start" />
                                        <IonInput label="País" labelPlacement="floating" name="country" type="text" value={formData.country} onIonInput={handleInputChange} />
                                    </IonItem>
                                    {errors.country && <p className="error-message">{errors.country}</p>}
                                    
                                    {/* --- CAMPOS EXISTENTES --- */}
                                    <IonItem>
                                        <IonIcon icon={mailOutline} slot="start" />
                                        <IonInput label="Correo Electrónico" labelPlacement="floating" name="email" type="email" value={formData.email} onIonInput={handleInputChange} />
                                    </IonItem>
                                    {errors.email && <p className="error-message">{errors.email}</p>}

                                    <IonItem>
                                        <IonIcon icon={lockClosedOutline} slot="start" />
                                        <IonInput label="Contraseña" labelPlacement="floating" name="psw" type="password" value={formData.psw} onIonInput={handleInputChange} />
                                    </IonItem>
                                    {errors.psw && <p className="error-message">{errors.psw}</p>}
                                </IonList>

                                <IonButton expand="block" onClick={handleRegister} className="ion-margin-top">
                                    Registrar Cuenta
                                </IonButton>

                                <div className="ion-text-center ion-margin-top register-link-container">
                                    <span>¿Ya tienes una cuenta? </span>
                                    <IonRouterLink routerLink="/login" className="register-link">
                                        Inicia sesión
                                    </IonRouterLink>
                                </div>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default RegisterPage;