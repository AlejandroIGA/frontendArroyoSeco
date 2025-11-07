import React from 'react';
import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButton,
    IonButtons,
    IonIcon,
    IonImg,
    IonCard,
    IonCardContent,
    IonList,
    IonItem,
    IonLabel,
    IonNote,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle
} from '@ionic/react';
import { closeOutline, calendarOutline, peopleOutline, cashOutline, mapOutline, checkmarkCircleOutline, closeCircleOutline, timeOutline } from 'ionicons/icons';
import './ReservationDetailsModal.css';
const formatDate = (dateStr) => {
    if (!dateStr) return "N/A";
    return new Date(dateStr).toLocaleDateString("es-ES", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    });
};
const getStatusDetails = (status) => {
    switch (status?.toLowerCase()) {
        case 'aceptada':
            return { text: 'Aceptada', icon: checkmarkCircleOutline, color: 'success' };
        case 'rechazada':
            return { text: 'Rechazada', icon: closeCircleOutline, color: 'danger' };
        case 'pendiente':
        default:
            return { text: 'Pendiente', icon: timeOutline, color: 'warning' };
    }
};

const ReservationDetailsModal = ({ isOpen, onClose, reservation, property }) => {
    if (!isOpen || !reservation || !property) {
        return null;
    }
    const statusDetails = getStatusDetails(reservation.status);
    const propertyImageUrl = (property.imagen && property.imagen.length > 0)
        ? property.imagen[0]
        : "/img/placeholder.jpg";

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose} className="reservation-details-modal">
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Detalle de la Reservación</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={onClose}>
                            <IonIcon slot="icon-only" icon={closeOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent>
                <IonImg src={propertyImageUrl} alt={property.name} className="modal-property-image" />
                <IonCard className="details-card">
                    <IonCardHeader>
                        <IonCardTitle>{property.name}</IonCardTitle>
                        {property.location && (
                            <IonCardSubtitle>
                                <IonIcon icon={mapOutline} slot="start" />
                                {`${property.location.calle} ${property.location.numero}, ${property.location.colonia}`}
                            </IonCardSubtitle>
                        )}
                    </IonCardHeader>

                    <IonCardContent>
                        <IonList lines="none">
                            <IonItem>
                                <IonIcon icon={calendarOutline} slot="start" color="primary" />
                                <IonLabel>Fechas</IonLabel>
                                <IonNote slot="end" className="ion-text-wrap">
                                    {`${formatDate(reservation.startDate)} - ${formatDate(reservation.endDate)}`}
                                </IonNote>
                            </IonItem>

                            <IonItem>
                                <IonIcon icon={peopleOutline} slot="start" color="primary" />
                                <IonLabel>Huéspedes</IonLabel>
                                <IonNote slot="end">{property.numberOfGuests}</IonNote>
                            </IonItem>
                        </IonList>
                        <div className="ion-padding-vertical">
                            <hr />
                        </div>
                        <IonList lines="none">
                            <IonItem>
                                <IonIcon icon={statusDetails.icon} slot="start" color={statusDetails.color} />
                                <IonLabel>Estado</IonLabel>
                                <IonNote slot="end" color={statusDetails.color} className="status-badge">
                                    {statusDetails.text}
                                </IonNote>
                            </IonItem>
                        </IonList>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonModal>
    );
};

export default ReservationDetailsModal;