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
    IonAvatar,
    IonSpinner,
    IonContent 
} from "@ionic/react";
import { checkmarkCircle, closeCircle } from 'ionicons/icons';
import bookingService from "../../services/bookingService";
import "./RequestsCardData.css";

const mapApiToView = (dto) => {
    console.log(dto);
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleDateString('es-ES', {
            day: '2-digit', month: 'short', year: 'numeric'
        });
    };

    const normalizeStatus = (status) => {
        if (!status) return 'Pendiente';
        const lowerStatus = status.toLowerCase();
        return lowerStatus.charAt(0).toUpperCase() + lowerStatus.slice(1);
    };

    return {
        id: dto.id,
        guestName: dto.user_id?.name || 'Huésped Anónimo',
        property: dto.property_id?.name || 'Propiedad Desconocida',
        dates: `${formatDate(dto.startDate)} - ${formatDate(dto.endDate)}`,
        status: normalizeStatus(dto.status),
        guestImage: dto.user?.profileImage || `https://i.pravatar.cc/150?u=${dto.user?.id || dto.id}`
    };
};
const RequestsCardData = () => {
    const [requests, setRequests] = useState([]);
    const [filter, setFilter] = useState('Pendiente');
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    useEffect(() => {
        const loadRequests = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const response = await bookingService.getAll();
                const mappedData = response.data.map(mapApiToView);
                setRequests(mappedData);
                console.log(mappedData);
            } catch (err) {
                console.error("Error al cargar las reservas:", err);
                setError("No se pudieron cargar las solicitudes. Intenta de nuevo.");
            } finally {
                setIsLoading(false);
            }
        };
        loadRequests();
    }, []);
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
    if (isLoading) {
        return (
            <IonContent className="ion-padding ion-text-center">
                <IonSpinner name="crescent" />
                <p>Cargando solicitudes...</p>
            </IonContent>
        );
    }
    if (error) {
        return (
            <IonContent className="ion-padding ion-text-center">
                <IonLabel color="danger">{error}</IonLabel>
            </IonContent>
        );
    }
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
export default RequestsCardData;