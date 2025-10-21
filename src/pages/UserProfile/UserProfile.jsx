import React, { useState, useEffect } from 'react';
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons,
    IonBackButton, IonList, IonItem, IonInput, IonButton,
    IonIcon, IonGrid, IonRow, IonCol, IonSpinner
} from '@ionic/react';
import { personOutline, callOutline, earthOutline, mailOutline, lockClosedOutline } from 'ionicons/icons';
import './UserProfile.css';
import userService from '../../services/userService';
import authService from '../../services/authService';
import MainLayout from '../../layout/MainLayout';

const UserProfile = () => {
    const [isLoading, setIsLoading] = useState(true);

    const [formData, setFormData] = useState({
        name: '',
        lastName: '',
        phone: '',
        country: '',
        email: '',
    });

    const [errors, setErrors] = useState({
        name: '',
        lastName: '',
        phone: '',
        country: '',
        email: '',
    });

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await userService.getProfile();
                //setFormData(userData);
                setIsLoading(false);
            } catch (error) {
                console.error("Error al cargar el perfil:", error);
                setIsLoading(false);
            }
        };

        fetchUserData();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = { name: '', lastName: '', phone: '', country: '', email: '' };
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
        setErrors(newErrors);
        return isValid;
    };

    const handleUpdateProfile = async () => {
        setErrors(prev => ({ ...prev, api: '' }));
        if (validateForm()) {
            try {
                await userService.update(formData);
                alert("Perfil actualizado con éxito");
            } catch (error) {
                setErrors(prev => ({ ...prev, api: 'Error al actualizar los datos.' }));
            }
        }
    };

    if (isLoading) {
        return (
            <IonPage>
                <IonContent fullscreen>
                    <IonSpinner name="crescent" />
                </IonContent>
            </IonPage>
        );
    }

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
                                        <IonInput label="Número de teléfono" labelPlacement="floating" name="phone" type="tel" value={formData.phone} onIonInput={handleInputChange} />
                                    </IonItem>
                                    {errors.phone && <p className="error-message">{errors.phone}</p>}

                                    <IonItem>
                                        <IonIcon icon={earthOutline} slot="start" />
                                        <IonInput label="País" labelPlacement="floating" name="country" type="text" value={formData.country} onIonInput={handleInputChange} />
                                    </IonItem>
                                    {errors.country && <p className="error-message">{errors.country}</p>}

                                    <IonItem>
                                        <IonIcon icon={mailOutline} slot="start" />
                                        <IonInput
                                            label="Correo Electrónico"
                                            labelPlacement="floating"
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            readonly={true}
                                        />
                                    </IonItem>
                                </IonList>
                                <div className="ion-text-center ion-padding-top">
                                    <IonButton onClick={handleUpdateProfile} className="ion-margin-top">
                                        Guardar Cambios
                                    </IonButton>
                                    <IonButton fill="outline" routerLink="/change-password" className="ion-margin-top ion-margin-start">
                                        Cambiar Contraseña
                                    </IonButton>
                                </div>
                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            }
        </MainLayout>
    );
};

export default UserProfile;