import React, { useState, useEffect } from "react";
import {
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonIcon,
  IonItem,
  IonAvatar
} from "@ionic/react";
import { checkmarkCircle, closeCircle } from 'ionicons/icons';
import"./RequestsCardData.css";
const RequestsCardData = () => {
    const [requests, setRequests] = useState([
        { id: 1, guestName: 'Ana García', property: 'Cabaña del Bosque', dates: '15 Nov, 2025 - 20 Nov, 2025', status: 'Pendiente', guestImage: 'https://i.pravatar.cc/150?u=anagarcia' },
        { id: 2, guestName: 'Carlos López', property: 'Departamento Moderno', dates: '22 Dic, 2025 - 28 Dic, 2025', status: 'Pendiente', guestImage: 'https://i.pravatar.cc/150?u=carloslopez' },
        { id: 3, guestName: 'Sofía Martínez', property: 'Cabaña del Bosque', dates: '05 Ene, 2026 - 10 Ene, 2026', status: 'Aceptada', guestImage: 'https://i.pravatar.cc/150?u=sofiamartinez' },
        { id: 4, guestName: 'Javier Rodríguez', property: 'Villa con Vista al Mar', dates: '01 Feb, 2026 - 07 Feb, 2026', status: 'Rechazada', guestImage: 'https://i.pravatar.cc/150?u=javierrodriguez' }
    ]);
    const [filter, setFilter] = useState('Pendiente');
    const [filteredRequests, setFilteredRequests] = useState([]);
   
    useEffect(() => {
        setFilteredRequests(requests.filter(req => req.status === filter));
    }, [filter, requests]);
    const handleAccept = (id) => {
        setRequests(currentRequests =>
            currentRequests.map(req => req.id === id ? { ...req, status: 'Aceptada' } : req)
        );
    };
    const handleReject = (id) => {
        setRequests(currentRequests =>
            currentRequests.map(req => req.id === id ? { ...req, status: 'Rechazada' } : req)
        );
    };
    return (
        <>
            <IonSegment value={filter} onIonChange={e => setFilter(e.detail.value)}>
                <IonSegmentButton value="Pendiente"><IonLabel>Pendientes</IonLabel></IonSegmentButton>
                <IonSegmentButton value="Aceptada"><IonLabel>Aceptadas</IonLabel></IonSegmentButton>
                <IonSegmentButton value="Rechazada"><IonLabel>Rechazadas</IonLabel></IonSegmentButton>
            </IonSegment>
            <IonList>
                {filteredRequests.length > 0 ? (
                    filteredRequests.map((request) => (
                        <IonCard key={request.id} className="request-card">
                            <IonCardHeader>
                                <IonItem lines="none" className="guest-item">
                                    <IonAvatar slot="start"><img src={request.guestImage} alt="Huésped" /></IonAvatar>
                                    <IonLabel>
                                        <h2>Solicitud de: <strong>{request.guestName}</strong></h2>
                                        <p>Propiedad: {request.property}</p>
                                    </IonLabel>
                                </IonItem>
                                <IonCardSubtitle className="ion-padding-start">{request.dates}</IonCardSubtitle>
                            </IonCardHeader>
                            {request.status === 'Pendiente' && (
                                <IonCardContent className="actions-container">
                                    <IonButton fill="outline" color="danger" onClick={() => handleReject(request.id)}><IonIcon slot="start" icon={closeCircle} />Rechazar</IonButton>
                                    <IonButton color="success" onClick={() => handleAccept(request.id)}><IonIcon slot="start" icon={checkmarkCircle} />Aceptar</IonButton>
                                </IonCardContent>
                            )}
                        </IonCard>
                    ))
                ) : (
                    <div className="no-requests-message"><p>No hay solicitudes en este estado.</p></div>
                )}
            </IonList>
        </>
    )
}
export default RequestsCardData