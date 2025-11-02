import React, { useState } from "react";
import {
    IonSegment,
    IonSegmentButton,
    IonLabel,
    IonButton,
} from "@ionic/react";
import RequestsCardData from "../../components/RequestsCardData/RequestsCardData";
import MainLayout from "../../layout/MainLayout";
import "./Property.css";
import PropertyFormModal from "./PropertyFormModal";
const Property = () => {
    const [mainView, setMainView] = useState('reservas');
    const [openModal, setOpenModal] = useState(false);
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
                
            />
        </MainLayout>
    );
};
export default Property;