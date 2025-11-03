import React, { useState, useEffect } from "react";
import {
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonList,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
  IonCardContent,
  IonButton,
  IonLoading,
  IonSpinner,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Reservation.css";
import MainLayout from "../../layout/MainLayout";
import bookingService from "../../services/bookingService";
import propertyService from "../../services/propertyService";
import ReservationDetailsModal from "../../components/ReservationDetailsModal/ReservationDetailsModal";
const formatDate = (dateStr) => {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};
const Reservaciones = () => {
  const [allReservations, setAllReservations] = useState([]);
  const [propertiesMap, setPropertiesMap] = useState(new Map());
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [selectedReservationData, setSelectedReservationData] = useState(null);
  const [allProperties, setAllProperties] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState("pendiente");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadData = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const userId = localStorage.getItem("userId");
        if (!userId) {
          setError("No se pudo identificar al usuario. Por favor, inicie sesión de nuevo.");
          setIsLoading(false);
          return; 
        }
        const [bookingResponse, propertyResponse] = await Promise.all([
          bookingService.searchBookings({ userId: userId }),
          propertyService.getAll(),
        ]);

        setAllReservations(bookingResponse.data || []);

        setAllProperties(propertyResponse.data || []);
        const propMap = new Map();
        (propertyResponse.data || []).forEach((prop) => {
          propMap.set(prop.id, prop.name);
        });
        setPropertiesMap(propMap);
      } catch (err) {
        console.error("Error cargando datos:", err);
        setError("No se pudieron cargar los datos (reservaciones o propiedades).");
      } finally {
        setIsLoading(false);
      }
    };

  useIonViewWillEnter(() => { 
    loadData();
  });

  useEffect(() => {
    const filtered = allReservations.filter(
      (res) => res.status.toLowerCase() === selectedStatus
    );
    const transformed = filtered.map((res) => {
     const propertyName = propertiesMap.get(Number(res.propertyId)) || `Propiedad #${res.propertyId}`;
      return {
        id: res.id,
        property: propertyName,
        dates: `${formatDate(res.startDate)} - ${formatDate(res.endDate)}`,
        status: res.status.charAt(0).toUpperCase() + res.status.slice(1),
      };
    });
    setFilteredReservations(transformed);
  }, [selectedStatus, allReservations, propertiesMap]);

  const handleOpenDetails = (reservationId) => {
    const reservation = allReservations.find(res => res.id === reservationId);
    const property = allProperties.find(prop => prop.id === Number(reservation.propertyId));
    if (reservation && property) {
      setSelectedReservationData({ reservation, property });
    } else {
      console.error("No se pudieron encontrar los detalles de la reservación o la propiedad.");
    }
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="loading-container">
          <IonSpinner name="crescent" />
          <p>Cargando reservaciones...</p>
        </div>
      );
    }
    if (error) {
      return (
        <div className="error-message ion-padding">
          <p>{error}</p>
        </div>
      );
    }
    return (
      <div className="content-container ion-padding">
        <h2>Mis Reservaciones</h2>
        <IonSegment
          value={selectedStatus}
          onIonChange={(e) => setSelectedStatus(e.detail.value)}
        >
          {[
            { value: "rechazada", label: "Rechazada" },
            { value: "pendiente", label: "Pendiente" },
            { value: "aceptada", label: "Aceptada" },
          ].map((status) => (
            <IonSegmentButton key={status.value} value={status.value}>
              <IonLabel>{status.label}</IonLabel>
            </IonSegmentButton>
          ))}
        </IonSegment>
        <IonList>
          {filteredReservations.length > 0 ? (
            filteredReservations.map((res) => (
              <IonCard key={res.id} className="reservation-card">
                <IonCardHeader>
                  <IonCardTitle>{res.property}</IonCardTitle>
                  <IonCardSubtitle>{res.dates}</IonCardSubtitle>
                </IonCardHeader>
                <IonCardContent>
                  <p>
                    Estado:{" "}
                    <span className={`status-${res.status.toLowerCase()}`}>
                      {res.status}
                    </span>
                  </p>
                  <IonButton
                   onClick={() => handleOpenDetails(res.id)}
                        fill="clear"
                        size="small"
                        className="details-button"
                  >
                    Ver Detalles
                  </IonButton>
                </IonCardContent>
              </IonCard>
            ))
          ) : (
            <div className="no-reservations-message">
              <p>No tienes reservaciones en este estado.</p>
            </div>
          )}
        </IonList>
      </div>
    );
  };
  return (
    <MainLayout pageTitle="Mis Reservaciones" activePage="reservaciones">
      <IonLoading isOpen={isLoading} message={"Cargando..."} />
      {!isLoading && renderContent()}
      <ReservationDetailsModal 
        isOpen={!!selectedReservationData}
        onClose={() => setSelectedReservationData(null)}
        reservation={selectedReservationData?.reservation}
        property={selectedReservationData?.property}
      />
    </MainLayout>
  );
};
export default Reservaciones;