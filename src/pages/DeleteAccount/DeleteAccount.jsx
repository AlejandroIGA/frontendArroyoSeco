import React, { useState } from 'react';
import {
    IonContent,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardContent,
    IonButton,
    IonList,
    IonItem,
    IonLabel,
    IonCheckbox,
    IonAlert,
    IonLoading,
    IonText,
    IonIcon,
    IonNote
} from '@ionic/react';
import { warningOutline, trashOutline } from 'ionicons/icons';
import MainLayout from '../../layout/MainLayout';
import authService from '../../services/authService';
import { useHistory } from 'react-router-dom';


const DeleteAccount = () => {
    const history = useHistory();
    const [showConfirmAlert, setShowConfirmAlert] = useState(false);
    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showLoading, setShowLoading] = useState(false);
    const [acceptedTerms, setAcceptedTerms] = useState(false);
    const [dataToDelete, setDataToDelete] = useState({
        personalInfo: true,
        preferences: true,
        activityHistory: true,
        savedContent: true,
        allData: true
    });

    const handleCheckboxChange = (key) => {
        setDataToDelete(prev => ({
            ...prev,
            [key]: !prev[key]
        }));
    };

    const handleDeleteAccount = async () => {
        setShowConfirmAlert(false);
        setShowLoading(true);

        try {
            const response = await authService.delete();
            if (response.status === 200) {
                setShowLoading(false);
                setShowSuccessAlert(true);
                sessionStorage.removeItem("isSessionActive");
                localStorage.removeItem("hasAcceptedTerms");
                sessionStorage.removeItem("token")
                sessionStorage.removeItem("refresh_token")
                sessionStorage.removeItem("userRole")
                history.push('/');
            }

        } catch (error) {
            setShowLoading(false);
            console.error('Error al eliminar la cuenta:', error);
        }
    };

    return (
        <MainLayout pageTitle="Eliminar cuenta">
            <>
                <IonCard color="warning">
                    <IonCardHeader>
                        <IonCardTitle className="ion-text-center">
                            <IonIcon icon={warningOutline} size="large" />
                            <div>Acción Permanente</div>
                        </IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonText>
                            <p><strong>¡Atención!</strong> La eliminación de tu cuenta es permanente e irreversible.</p>
                        </IonText>
                    </IonCardContent>
                </IonCard>

                {/* Información sobre los datos */}
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>¿Qué sucederá con tus datos?</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonText>
                            <p>Al eliminar tu cuenta, se eliminarán permanentemente los siguientes datos:</p>
                        </IonText>

                        <IonList>
                            <IonItem lines="none">
                                <IonCheckbox
                                    checked={dataToDelete.personalInfo}
                                    onIonChange={() => handleCheckboxChange('personalInfo')}
                                    disabled={dataToDelete.allData}
                                    slot="start"
                                />
                                <IonLabel>
                                    <h3>Información Personal</h3>
                                    <IonNote>Nombre, email, teléfono y perfil</IonNote>
                                </IonLabel>
                            </IonItem>

                            <IonItem lines="none">
                                <IonCheckbox
                                    checked={dataToDelete.preferences}
                                    onIonChange={() => handleCheckboxChange('preferences')}
                                    disabled={dataToDelete.allData}
                                    slot="start"
                                />
                                <IonLabel>
                                    <h3>Preferencias y Configuración</h3>
                                    <IonNote>Ajustes personalizados de la app</IonNote>
                                </IonLabel>
                            </IonItem>

                            <IonItem lines="none">
                                <IonCheckbox
                                    checked={dataToDelete.activityHistory}
                                    onIonChange={() => handleCheckboxChange('activityHistory')}
                                    disabled={dataToDelete.allData}
                                    slot="start"
                                />
                                <IonLabel>
                                    <h3>Historial de Actividad</h3>
                                    <IonNote>Registro de acciones realizadas</IonNote>
                                </IonLabel>
                            </IonItem>

                            <IonItem lines="none">
                                <IonCheckbox
                                    checked={dataToDelete.savedContent}
                                    onIonChange={() => handleCheckboxChange('savedContent')}
                                    disabled={dataToDelete.allData}
                                    slot="start"
                                />
                                <IonLabel>
                                    <h3>Contenido Guardado</h3>
                                    <IonNote>Favoritos, listas y contenido guardado</IonNote>
                                </IonLabel>
                            </IonItem>
                        </IonList>
                    </IonCardContent>
                </IonCard>

                {/* Proceso de Eliminación */}
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Proceso de Eliminación</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonText>
                            <ul>
                                <li>La eliminación de datos se reliza de mnaera inmediata</li>
                                <li>Algunos datos pueden conservarse por obligaciones legales</li>
                                <li>No podrás recuperar tu cuenta después de confirmar</li>
                            </ul>
                        </IonText>
                    </IonCardContent>
                </IonCard>

                {/* Retención de Datos Legales */}
                <IonCard>
                    <IonCardHeader>
                        <IonCardTitle>Retención Legal de Datos</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                        <IonText>
                            <p>
                                Conforme a las políticas de Google Play y regulaciones aplicables (GDPR, CCPA),
                                algunos datos pueden retenerse por razones legales, de seguridad o para prevenir fraudes:
                            </p>
                            <ul>
                                <li>Registros de transacciones (obligación fiscal y contable)</li>
                                <li>Datos necesarios para resolver disputas legales</li>
                                <li>Información requerida para cumplir con autoridades</li>
                            </ul>
                            <p>
                                <strong>Plazo máximo de retención:</strong> Los datos se eliminarán completamente
                                de manera inmediata, excepto aquellos requeridos legalmente.
                            </p>
                        </IonText>
                    </IonCardContent>
                </IonCard>

                {/* Aceptación de Términos */}
                <IonCard>
                    <IonCardContent>
                        <IonItem lines="none">
                            <IonCheckbox
                                checked={acceptedTerms}
                                onIonChange={(e) => setAcceptedTerms(e.detail.checked)}
                                slot="start"
                            />
                            <IonLabel className="ion-text-wrap">
                                <IonText>
                                    Entiendo que esta acción es permanente y acepto la eliminación
                                    de mi cuenta y datos asociados según los términos descritos.
                                </IonText>
                            </IonLabel>
                        </IonItem>
                    </IonCardContent>
                </IonCard>

                {/* Botón de Eliminación */}
                <div className="ion-padding">
                    <IonButton
                        expand="block"
                        color="danger"
                        onClick={() => setShowConfirmAlert(true)}
                        disabled={!acceptedTerms}
                    >
                        <IonIcon slot="start" icon={trashOutline} />
                        Eliminar Mi Cuenta Permanentemente
                    </IonButton>

                    <IonButton
                        expand="block"
                        fill="clear"
                        routerLink="/profile"
                    >
                        Cancelar
                    </IonButton>
                </div>

                {/* Alert de Confirmación */}
                <IonAlert
                    isOpen={showConfirmAlert}
                    onDidDismiss={() => setShowConfirmAlert(false)}
                    header="Confirmación Final"
                    message="¿Estás completamente seguro de que deseas eliminar tu cuenta? Esta acción NO se puede deshacer."
                    buttons={[
                        {
                            text: 'Cancelar',
                            role: 'cancel',
                            cssClass: 'secondary'
                        },
                        {
                            text: 'Sí, Eliminar',
                            cssClass: 'danger',
                            handler: handleDeleteAccount
                        }
                    ]}
                />

                {/* Loading */}
                <IonLoading
                    isOpen={showLoading}
                    message="Procesando eliminación de cuenta..."
                />
            </>
        </MainLayout>
    );
};

export default DeleteAccount;