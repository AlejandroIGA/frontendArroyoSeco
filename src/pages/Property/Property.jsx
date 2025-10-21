import React, { useState } from "react";
import {
    IonSegment,
    IonSegmentButton,
    IonLabel,
} from "@ionic/react";
import RequestsCardData from "../../components/RequestsCardData/RequestsCardData";
import MainLayout from "../../layout/MainLayout";
import "./Property.css";
const Property = () => {
    const [mainView, setMainView] = useState('reservas');
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
                        <h2>Mis Propiedades</h2>
                        <p>Aquí se mostrará la lista de tus propiedades para que puedas gestionarlas.</p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
};
export default Property;