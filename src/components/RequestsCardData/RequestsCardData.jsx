import React, { useState, useEffect } from "react";
import { IonSegment, IonSegmentButton, IonLabel, IonList, IonCard, IonCardHeader, IonCardSubtitle, IonCardContent, IonButton, IonIcon, IonItem, IonSpinner, IonContent } from "@ionic/react";
import { checkmarkCircle, closeCircle } from 'ionicons/icons';
import bookingService from "../../services/bookingService";
import propertyService from "../../services/propertyService";
import "./RequestsCardData.css";
const RequestsCardData = () => {
    const [requests, setRequests] = useState([]);
    const [filter, setFilter] = useState('Pendiente');
    const [filteredRequests, setFilteredRequests] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isUpdating, setIsUpdating] = useState(null);

    useEffect(() => {
        const loadRequests = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const [bookingResponse, propertyResponse] = await Promise.all([
                    bookingService.getAll(), 
                    propertyService.getMyProperties() 
                ]);
                const allBookings = bookingResponse.data || [];
                const myProperties = propertyResponse.data || []; 
                const myPropertyIds = new Set();
                const propertyNameMap = new Map();
                myProperties.forEach(prop => {
                    myPropertyIds.add(prop.id);
                    propertyNameMap.set(prop.id, prop.name);
                });
                const myPropertyBookings = allBookings.filter(booking =>
                    myPropertyIds.has(booking.propertyId)
                );
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
                const mappedData = myPropertyBookings.map(dto => {
                    const user = dto.user;
                    let guestName = '';
                    const profile = user?.userProfile;
                    if (profile) {
                        const firstName = profile.name || '';
                        const lastName = profile.lastName || '';
                        guestName = `${firstName} ${lastName}`.trim();
                    }
                    if (!guestName) {
                        guestName = user?.email || `Usuario #${user?.id || 'Desconocido'}`;
                    }
                    return {
                        id: dto.id,
                        guestName: guestName,
                        property: propertyNameMap.get(dto.propertyId) || 'Propiedad Desconocida',
                        dates: `${formatDate(dto.startDate)} - ${formatDate(dto.endDate)}`,
                        status: normalizeStatus(dto.status),
                    };
                });
                setRequests(mappedData);
            } catch (err) {
                console.error("Error al cargar las reservas:", err);
            } finally {
                setIsLoading(false);
            }
        };
        loadRequests();
    }, []);

    useEffect(() => {
        setFilteredRequests(requests.filter(req => req.status === filter));
    }, [filter, requests]);
    const handleUpdateStatus = async (id, newStatus) => {
        const requestDTO = { status: newStatus };
        setIsUpdating(id);
        setError(null);
        try {
            await bookingService.updateBooking(id, requestDTO);
            setRequests(currentRequests =>
                currentRequests.map(req =>
                    req.id === id ? { ...req, status: newStatus } : req
                )
            );
        } catch (err) {
            console.error(`Error al actualizar el estado a "${newStatus}":`, err);
            setError("No se pudo actualizar la solicitud. Intenta de nuevo.");
        } finally {
            setIsUpdating(null);
        }
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
                    filteredRequests.map((request) => {
                        const isThisCardUpdating = isUpdating === request.id;
                        return (
                            <IonCard key={request.id} className="request-card">
                                <IonCardHeader>
                                    <IonItem lines="none" className="guest-item">
                                        <IonLabel>
                                            <h2>Solicitud de: <strong>{request.guestName}</strong></h2>
                                            <p>Propiedad: {request.property}</p>
                                        </IonLabel>
                                    </IonItem>
                                    <IonCardSubtitle className="ion-padding-start">{request.dates}</IonCardSubtitle>
                                </IonCardHeader>
                                {request.status === 'Pendiente' && (
                                    <IonCardContent className="actions-container">
                                        <IonButton fill="outline" color="danger" onClick={() => handleUpdateStatus(request.id, 'Rechazada')} disabled={isThisCardUpdating}>
                                            {isThisCardUpdating ? (
                                                <IonSpinner name="dots" />
                                            ) : (
                                                <IonIcon slot="start" icon={closeCircle} />
                                            )}
                                            Rechazar
                                        </IonButton>
                                        <IonButton color="success" onClick={() => handleUpdateStatus(request.id, 'Aceptada')} disabled={isThisCardUpdating}>
                                            {isThisCardUpdating ? (
                                                <IonSpinner name="dots" />
                                            ) : (
                                                <IonIcon slot="start" icon={checkmarkCircle} />
                                            )}
                                            Aceptar
                                        </IonButton>
                                    </IonCardContent>
                                )}
                            </IonCard>
                        )
                    })
                ) : (
                    <div className="no-requests-message"><p>No hay solicitudes en este estado.</p></div>
                )}
            </IonList>
        </>
    )
}
export default RequestsCardData;