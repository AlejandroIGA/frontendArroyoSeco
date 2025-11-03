import React, { useState, useEffect } from 'react';
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonBackButton, IonList, IonItem, IonInput, IonButton,
    IonIcon, IonGrid, IonRow, IonCol, IonSpinner,
    useIonToast,
    IonLoading,
    useIonViewWillEnter
} from '@ionic/react';
import { personOutline, callOutline, earthOutline, mailOutline, lockClosedOutline } from 'ionicons/icons';
import './UserProfile.css';
import userService from '../../services/userService';
import authService from '../../services/authService';
import MainLayout from '../../layout/MainLayout';

const UserProfile = () => {
    let errorMsg = 'Ocurrió un error inesperado.';
    
    const [isLoading, setIsLoading] = useState(true);
    const [presentToast] = useIonToast();

    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        cellphone: '',
        country: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        lastName: '',
        cellphone: '',
        country: '',
    });

    const fetchUserData = async () => {
        setIsLoading(true);
        try {
            const userData = await userService.getProfile();
            setFormData(userData.data);
            setIsLoading(false);
        } catch (error) {
            setIsLoading(false);
            if (error.response) {
                    errorMsg = error.response.data?.message || error.response.data || 'Error del servidor.';
                } else if (error.code === "ERR_NETWORK") {
                    errorMsg = 'Error de conexión.';
                } else if (error.message) {
                    errorMsg = error.message;
                }
                presentToast({
                message: errorMsg,
                duration: 3000,
                color: 'danger',
                position: 'top'
            });
        }
    };

    useIonViewWillEnter(() => {
        fetchUserData();
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = { name: '', lastName: '', cellphone: '', country: '' };
        let isValid = true;

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
        }
        if (!formData.country) {
            newErrors.country = 'El país es obligatorio.';
            isValid = false;
        }
        setErrors(newErrors);
        return isValid;
    };

    const handleUpdateProfile = async () => {
        setErrors(prev => ({ ...prev, api: '' }));
        if (validateForm()) {
            setIsLoading(true);
            try {
                await userService.update(formData);
                presentToast({
                    message: 'Su información ha sido actualizada',
                    duration: 3000,
                    color: 'success',
                    position: 'top'
                });
                setIsLoading(false);
            } catch (error) {
                setIsLoading(false);
                if (error.response) {
                    errorMsg = error.response.data?.message || error.response.data || 'Error del servidor.';
                } else if (error.code === "ERR_NETWORK") {
                    errorMsg = 'Error de conexión.';
                } else if (error.message) {
                    errorMsg = error.message;
                }
                presentToast({
                message: errorMsg,
                duration: 3000,
                color: 'danger',
                position: 'top'
            });
            }
        }
    };

    return (
        <MainLayout pageTitle="Perfil" activePage="perfil">
            {
                <IonGrid className="login-grid">
                    <IonRow>
                        <IonCol size="12">
                            <div>
                                <h2 className="form-title">Editar Perfil</h2>
                                <IonList>
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
                                        <IonInput label="Número de teléfono" labelPlacement="floating" name="cellphone" type="tel" value={formData.cellphone} onIonInput={handleInputChange} />
                                    </IonItem>
                                    {errors.cellphone && <p className="error-message">{errors.cellphone}</p>}

                                    <IonItem>
                                        <IonIcon icon={earthOutline} slot="start" />
                                        <IonInput label="País" labelPlacement="floating" name="country" type="text" value={formData.country} onIonInput={handleInputChange} />
                                    </IonItem>
                                    {errors.country && <p className="error-message">{errors.country}</p>}
                                </IonList>
                                <div className="ion-text-center ion-padding-top">
                                    <IonButton onClick={handleUpdateProfile} className="ion-margin-top">
                                        Guardar Cambios
                                    </IonButton>
                                    <IonButton fill="outline" routerLink="/reset-password" className="ion-margin-top ion-margin-start">
                                        Cambiar Contraseña
                                    </IonButton>
                                </div>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            }
            <IonLoading
                isOpen={isLoading}
                onDidDismiss={() => setIsLoading(false)}
                message={'Cargando...'}
                duration={0}
            />
        </MainLayout>
    );
};

export default UserProfile;