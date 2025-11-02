import React, { useEffect, useState } from "react";
import {
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonButton,
    useIonToast,
    IonLoading,
} from "@ionic/react";
import RequestsCardData from "../../components/RequestsCardData/RequestsCardData";
import MainLayout from "../../layout/MainLayout";
import "./Property.css";
import PropertyFormModal from "./PropertyFormModal";
import propertyService from "../../services/propertyService";
const Property = () => {
    const [mainView, setMainView] = useState('reservas');
    const [openModal, setOpenModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [presentToast] = useIonToast();

    const save = async (data) => {
        setIsLoading(true);
        try{
            await propertyService.save(data);
            setIsLoading(false);
            presentToast({
                    message: 'Se registro la información de la propiedad.',
                    duration: 3000,
                    color: 'success',
                    position: 'top'
                });
            setOpenModal(false);
        }
       catch(error){
        setIsLoading(false);
        if (error.response) {
                    if (error.response.status === 401) {
                        console.log(error);
                       errorMsg = "Credenciales incorrectas.";
                    } else {
                        errorMsg = "Error inesperado.";
                    }
                } else if (error.code === "ERR_NETWORK") {
                    errorMsg = 'Error de conexión.';
                } else {
                    errorMsg = 'Ocurrió un error en la aplicación.';
                }
                presentToast({
                message: errorMsg,
                duration: 3000,
                color: 'danger',
                position: 'top'
            });
       }
    }

    const getMyProperties = async() => {
        const response = await propertyService.getMyProperties();
        console.log(response);
    } 

    useEffect(()=>{
        getMyProperties();
    },[])

    return (
        <MainLayout pageTitle="Mis Propiedades" activePage="propiedades">
            <div className="ion-padding">
                <IonSegment value={mainView} onIonChange={e => setMainView(e.detail.value)} className="main-view-segment">
                    <IonSegmentButton value="reservas">
                        <IonLabel>Gestionar Reservas</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="propiedades">
                        <IonLabel>Mis Propiedades</IonLabel>
                    </IonSegmentButton>
                </IonSegment>
                {mainView === 'reservas' && (
                    <RequestsCardData />
                )}
                {/*'propiedades' */}
                {mainView === 'propiedades' && (
                    <div className="placeholder-message">
                        <IonButton onClick={() => setOpenModal(true)}> Agregar propiedad</IonButton>
                        <h2>Mis Propiedades</h2>
                        <p>Aquí se mostrará la lista de tus propiedades para que puedas gestionarlas.</p>
                    </div>
                )}
            </div>
            <PropertyFormModal
                isOpen={openModal}
                onClose={() => setOpenModal(false)}
                onSave={save}
            />
            <IonLoading
                            isOpen={isLoading}
                            onDidDismiss={() => setIsLoading(false)}
                            message={'Registrando la propiedad...'}
                            duration={0}
                        />
        </MainLayout>
    );
};
export default Property;