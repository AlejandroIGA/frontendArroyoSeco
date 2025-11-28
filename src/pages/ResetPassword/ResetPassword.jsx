import React, { useState } from 'react';
import { 
    IonModal, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, 
    IonButton, IonList, IonItem, IonInput, IonIcon, IonText, 
    IonLoading, useIonToast, 
    IonPage,
    IonGrid, IonRow, IonCol, IonBackButton
} from '@ionic/react';
import { mailOutline, lockClosedOutline, shieldCheckmarkOutline, closeCircleOutline } from 'ionicons/icons';
import authService from '../../services/authService';
import { useHistory } from 'react-router-dom';

const ResetPassword = () => {
    const history = useHistory();
    // --- ESTADO ---
    const [loading, setLoading] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({
        email: '',
        code: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({
        email: '',
        code: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [presentToast] = useIonToast();

    // --- MANEJO DEL FORMULARIO ---
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateForm = () => {
        const newErrors = { email: '', code: '', newPassword: '', confirmPassword: '' };
        let isValid = true;
        
        if (currentStep === 0) {
            if (!formData.email) {
                newErrors.email = 'Por favor ingresa tu correo';
                isValid = false;
            } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
                newErrors.email = 'Ingresa un correo válido';
                isValid = false;
            }
        } else if (currentStep === 1) {
            if (!formData.code) {
                newErrors.code = 'Por favor ingresa el código';
                isValid = false;
            } else if (formData.code.length !== 6) {
                newErrors.code = 'El código debe tener 6 dígitos';
                isValid = false;
            }
        } else if (currentStep === 2) {
            if (!formData.newPassword) {
                newErrors.newPassword = 'Por favor ingresa la nueva contraseña';
                isValid = false;
            } else if (formData.newPassword.length < 8) {
                newErrors.newPassword = 'Mínimo 8 caracteres';
                isValid = false;
            }
            if (!formData.confirmPassword) {
                newErrors.confirmPassword = 'Por favor confirma tu contraseña';
                isValid = false;
            } else if (formData.newPassword !== formData.confirmPassword) {
                newErrors.confirmPassword = 'Las contraseñas no coinciden';
                isValid = false;
            }
        }
        
        setErrors(newErrors);
        return isValid;
    };

    // --- MANEJO DE LÓGICA ---
    const handleResetProcess = () => {
        setFormData({ email: '', code: '', newPassword: '', confirmPassword: '' });
        setErrors({ email: '', code: '', newPassword: '', confirmPassword: '' });
        setCurrentStep(0);
        history.push('/login');
    };

    const handleNext = async () => {
        if (!validateForm()) return;
        setLoading(true);
        try {
            if (currentStep === 0) {
                await authService.reset(formData.email);
                presentToast({ message: 'Código enviado', duration: 2500, color: 'success' });
                setCurrentStep(1);
            } else if (currentStep === 1) {
                await authService.verifyResetCode(formData.email, formData.code);
                presentToast({ message: 'Código verificado', duration: 2500, color: 'success' });
                setCurrentStep(2);
            } else if (currentStep === 2) {
                await authService.resetPassword(formData.email, formData.code, formData.newPassword);
                presentToast({ message: 'Contraseña restablecida', duration: 2500, color: 'success' });
                handleResetProcess(); // Llama a la función para limpiar y navegar
            }
        } catch (error) {
            console.log(error);
            const errorMsg = error?.response?.data?.mensaje || error?.message || 'Ocurrió un error';
            presentToast({ message: errorMsg, duration: 3000, color: 'danger' });
        } finally {
            setLoading(false);
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
            setErrors({ email: '', code: '', newPassword: '', confirmPassword: '' });
        } else {
            //history.push('/login');
        }
    };

    // --- RENDERIZADO DE PASOS ---
    const renderStepContent = () => {
        if (currentStep === 0) {
            return (
                <div className="ion-padding">
                    <h2 className="form-title">Ingresa tu correo</h2>
                    <IonText color="medium">
                        <p className="ion-no-margin">Te enviaremos un código de verificación a tu correo registrado.</p>
                    </IonText>
                    <IonList className="ion-margin-top">
                        <IonItem>
                            <IonIcon icon={mailOutline} slot="start" />
                            <IonInput
                                label="Correo Electrónico"
                                labelPlacement="floating"
                                name="email"
                                type="email"
                                value={formData.email}
                                onIonInput={handleInputChange}
                                placeholder="ejemplo@gmail.com"
                            />
                        </IonItem>
                        {errors.email && <IonText color="danger" className="error-message">{errors.email}</IonText>}
                    </IonList>
                </div>
            );
        }
        if (currentStep === 1) {
            return (
                <div className="ion-padding">
                    <h2 className="form-title">Verifica tu identidad</h2>
                    <IonText color="medium">
                        <p className="ion-no-margin">Hemos enviado un código de 6 dígitos a <strong>{formData.email}</strong></p>
                    </IonText>
                    <IonList className="ion-margin-top">
                        <IonItem>
                            <IonIcon icon={shieldCheckmarkOutline} slot="start" />
                            <IonInput
                                label="Código de Verificación"
                                labelPlacement="floating"
                                name="code"
                                type="text"
                                inputmode="numeric"
                                value={formData.code}
                                onIonInput={handleInputChange}
                                placeholder="123456"
                                maxlength={6}
                            />
                        </IonItem>
                        {errors.code && <IonText color="danger" className="error-message">{errors.code}</IonText>}
                    </IonList>
                </div>
            );
        }
        if (currentStep === 2) {
            return (
                <div className="ion-padding">
                    <h2 className="form-title">Crea una nueva contraseña</h2>
                    <IonText color="medium">
                        <p className="ion-no-margin">Por seguridad, usa una contraseña fuerte y diferente a anteriores.</p>
                    </IonText>
                    <IonList className="ion-margin-top">
                        <IonItem>
                            <IonIcon icon={lockClosedOutline} slot="start" />
                            <IonInput
                                label="Nueva Contraseña"
                                labelPlacement="floating"
                                name="newPassword"
                                type="password"
                                value={formData.newPassword}
                                onIonInput={handleInputChange}
                            />
                        </IonItem>
                        {errors.newPassword && <IonText color="danger" className="error-message">{errors.newPassword}</IonText>}
                        <IonItem>
                            <IonIcon icon={lockClosedOutline} slot="start" />
                            <IonInput
                                label="Confirmar Contraseña"
                                labelPlacement="floating"
                                name="confirmPassword"
                                type="password"
                                value={formData.confirmPassword}
                                onIonInput={handleInputChange}
                            />
                        </IonItem>
                        {errors.confirmPassword && <IonText color="danger" className="error-message">{errors.confirmPassword}</IonText>}
                    </IonList>
                </div>
            );
        }
    };

    return (
        // 👇 Reemplaza IonModal por IonPage
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    {/* 👇 Añade un botón para regresar */}
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/login" text="Volver" />
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
           <IonContent>
                {/* Indicador de carga global */}
                <IonLoading isOpen={loading} message={'Por favor espera...'} />

                {/* 👇 ESTRUCTURA DE CENTRADO IGUAL A LOGIN/REGISTER 👇 */}
                <IonGrid className="login-grid"> {/* Reutiliza la clase CSS de centrado vertical */}
                    <IonRow className="ion-justify-content-center ion-align-items-center">
                        <IonCol size="12" size-md="8" size-lg="6">
                            
                            {/* 👇 CONTENEDOR VISUAL DEL FORMULARIO 👇 */}
                            <div className="form-container"> {/* Reutiliza la clase CSS para padding, sombra, etc. */}
                                
                                {/* Renderiza el contenido del paso actual */}
                                {renderStepContent()}

                                {/* 👇 BOTONES MOVIDOS AQUÍ DENTRO 👇 */}
                                <div className='ion-padding-top'> 
                                    <IonButton 
                                        expand="block" 
                                        onClick={handleNext} 
                                        className="ion-margin-bottom"
                                    >
                                        {currentStep === 2 ? 'Restablecer Contraseña' : 'Siguiente'}
                                    </IonButton>

                                    <IonButton 
                                        expand="block" 
                                        fill="clear" // Un estilo más sutil para "Atrás/Cancelar"
                                        onClick={handleBack}
                                    >
                                        {currentStep === 0 ? 'Cancelar' : 'Atrás'}
                                    </IonButton>
                                </div>

                            </div>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonContent>
        </IonPage>
    );
};

export default ResetPassword;