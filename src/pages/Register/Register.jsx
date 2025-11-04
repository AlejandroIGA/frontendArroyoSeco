import React, { useEffect, useState } from 'react';
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonBackButton, IonList, IonItem, IonInput, IonButton,
    IonIcon, IonGrid, IonRow, IonCol,
    IonRouterLink,
    IonLoading, useIonToast, IonSelect, IonSelectOption,
    useIonViewWillEnter,
    IonLabel
} from '@ionic/react';
import { personOutline, callOutline, earthOutline, mailOutline, lockClosedOutline, briefcaseOutline } from 'ionicons/icons';
import './Register.css'; // Usaremos un CSS idéntico al del login
import authService from '../../services/authService';

import { useHistory } from 'react-router-dom';

const RegisterPage = () => {
    const history = useHistory();
    const [isLoading, setIsLoading] = useState(false);
    const [presentToast] = useIonToast();

    // 1. Expandimos el estado para los nuevos campos
    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        cellphone: '',
        country: 'Mexico',
        email: '',
        password: '',
        role: ''
    });

    // 2. Expandimos el estado de errores
    const [errors, setErrors] = useState({
        name: '',
        lastName: '',
        cellphone: '',
        country: '',
        email: '',
        password: '',
        role: ''
    });

    const handleInputChange = (e) => {
        const name = e.target.name || e.detail.name;
        const value = e.detail.value !== undefined ? e.detail.value : e.target.value;

        if (name) {
            setFormData(prev => ({ ...prev, [name]: value }));
            if (errors[name]) {
                setErrors(prev => ({ ...prev, [name]: '' }));
            }
        }
    };

    // 3. Actualizamos la función de validación
    const validateForm = () => {
        const newErrors = { name: '', lastName: '', cellphone: '', country: '', email: '', password: '', role: '' };
        let isValid = true;
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{12,}$/;

        if (!formData.name) {
            newErrors.name = 'El nombre es obligatorio.';
            isValid = false;
        }
        if (!formData.lastName) {
            newErrors.lastName = 'Los apellidos son obligatorios.';
            isValid = false;
        }
        if (!formData.cellphone) {
            newErrors.cellphone = 'El número de teléfono es obligatorio.';
            isValid = false;
        } else if (formData.cellphone.length > 14) {
            newErrors.cellphone = 'El teléfono no debe exceder los 14 caracteres.';
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
        if (!formData.password) {
            newErrors.password = 'La contraseña es obligatoria.';
            isValid = false;
        } else if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'Debe tener min. 12 caracteres, incluir mayúscula, minúscula, número y caracter especial (@$!%*?&).';
            isValid = false;
        }
        if (!formData.role) {
            newErrors.role = 'El role es obligatorio';
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleRegister = async () => {
        setErrors(prev => ({ ...prev, api: '' }));
        if (validateForm()) {
            setIsLoading(true);
            try {
                await authService.register(formData)
                setIsLoading(false);
                setFormData({
                    name: '',
                    lastName: '',
                    cellphone: '',
                    country: '',
                    email: '',
                    password: '',
                    role: ''
                });
                presentToast({
                    message: '¡Registro exitoso! Serás redirigido al inicio de sesión.',
                    duration: 5000,
                    color: 'success',
                    position: 'top'
                });
                setTimeout(() => {
                    history.push('/login');
                }, 5500);
            } catch (error) {
                setIsLoading(false);
                if (error.code === "ERR_NETWORK") {
                    setErrors(prev => ({ ...prev, api: 'Error de conexión.' }));
                } else if (error.response?.status === 401) {
                    console.log(error);
                    setErrors(prev => ({ ...prev, api: error.response.data }));
                } else {
                    setErrors(prev => ({ ...prev, api: error.response.data || "Error al comunicar con el servidor" }));
                }
            }
        }
    };

    useIonViewWillEnter(() => {
        setFormData({
            name: '',
            lastName: '',
            cellphone: '',
            country: '',
            email: '',
            password: '',
            role: ''
        });
        setErrors({ name: '', lastName: '', cellphone: '', country: '', email: '', password: '', role: '' });
    })

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
                                        <IonInput maxlength={25} label="Nombre" labelPlacement="floating" name="name" type="text" value={formData.name} onIonInput={handleInputChange} />
                                    </IonItem>
                                    {errors.name && <p className="error-message">{errors.name}</p>}

                                    <IonItem>
                                        <IonIcon icon={personOutline} slot="start" />
                                        <IonInput maxlength={30} label="Apellidos" labelPlacement="floating" name="lastName" type="text" value={formData.lastName} onIonInput={handleInputChange} />
                                    </IonItem>
                                    {errors.lastName && <p className="error-message">{errors.lastName}</p>}

                                    <IonItem>
                                        <IonIcon icon={callOutline} slot="start" />
                                        <IonInput label="Número de teléfono" labelPlacement="floating" name="cellphone" type="tel" value={formData.cellphone} onIonInput={handleInputChange} maxlength={14} />
                                    </IonItem>
                                    {errors.cellphone && <p className="error-message">{errors.cellphone}</p>}

                                    <IonItem>
                                        <IonIcon icon={earthOutline} slot="start" />
                                        <IonSelect
                                            label="País"
                                            labelPlacement="floating"
                                            name="country"
                                            value={formData.country}
                                            onIonChange={handleInputChange}
                                        >
                                            <IonSelectOption value="Mexico">México</IonSelectOption>
                                        </IonSelect>
                                    </IonItem>
                                    {errors.country && <p className="error-message">{errors.country}</p>}
                                    <IonItem>
                                        <IonIcon icon={mailOutline} slot="start" />
                                        <IonInput maxlength={30} label="Correo Electrónico" labelPlacement="floating" name="email" type="email" value={formData.email} onIonInput={handleInputChange} />
                                    </IonItem>
                                    {errors.email && <p className="error-message">{errors.email}</p>}

                                    <IonItem>
                                        <IonIcon icon={lockClosedOutline} slot="start" />
                                        <IonInput label="Contraseña" labelPlacement="floating" name="password" type="password" value={formData.password} onIonInput={handleInputChange} />
                                    </IonItem>
                                    {errors.password && <p className="error-message">{errors.password}</p>}
                                </IonList>
                                <IonItem>
                                    <IonIcon icon={briefcaseOutline} slot="start" />
                                    <IonSelect
                                        label="Tipo de Cuenta"
                                        labelPlacement="floating"
                                        name="role"
                                        value={formData.role}
                                        onIonChange={handleInputChange}
                                    >
                                        <IonSelectOption value="visitante">
                                            <IonLabel>
                                                <h3>Visitante: </h3>
                                                <p>Buscaré y reservaré alojamientos.</p>
                                            </IonLabel>
                                        </IonSelectOption>
                                        <IonSelectOption value="propietario">
                                            <IonLabel>
                                                <h3>Propietario: </h3>
                                                <p>Quiero publicar y administrar mis alojamientos.</p>
                                            </IonLabel>
                                        </IonSelectOption>
                                    </IonSelect>
                                </IonItem>
                                {errors.role && <p className="error-message">{errors.role}</p>}
                                {errors.api && (
                                    <p className="error-message ion-text-center">
                                        {errors.api}
                                    </p>
                                )}
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
            <IonLoading
                isOpen={isLoading}
                onDidDismiss={() => setIsLoading(false)}
                message={'Registrando su información...'}
                duration={0}
            />
        </IonPage>
    );
};

export default RegisterPage;