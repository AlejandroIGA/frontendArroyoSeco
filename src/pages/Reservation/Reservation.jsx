import React, { useState, useEffect } from "react";
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonBackButton,
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
  IonMenu,
  IonGrid,
  IonRow,
  IonCol,
} from "@ionic/react";

// Componentes
import Sidebar from "../../components/Sidebar/Sidebar";
import "./Reservation.css";
import MainLayout from "../../layout/MainLayout";
const Reservaciones = () => {
  const [reservations] = useState([
    {
      id: 1,
      property: "Casa Buena",
      dates: "15 de Dic, 2023 - 22 de Dic, 2023",
      status: "Confirmada",
    },
    {
      id: 2,
      property: "Cabaña",
      dates: "10 de Ene, 2024 - 15 de Ene, 2024",
      status: "Pendiente",
    },
    {
      id: 3,
      property: "Departamento Moderno",
      dates: "01 de Feb, 2024 - 05 de Feb, 2024",
      status: "Rechazada",
    },
  ]);
  const [selectedStatus, setSelectedStatus] = useState("Pendiente");
  const [filteredReservations, setFilteredReservations] = useState([]);

  useEffect(() => {
    setFilteredReservations(
      reservations.filter((res) => res.status === selectedStatus)
    );
  }, [selectedStatus, reservations]);

  const renderContent = () => (
    <div className="content-container ion-padding">
      <h2>Mis Reservaciones</h2>
      <IonSegment
        value={selectedStatus}
        onIonChange={(e) => setSelectedStatus(e.detail.value)}
      >
        {["Rechazada", "Pendiente", "Confirmada"].map((status) => (
          <IonSegmentButton key={status} value={status}>
            <IonLabel>{status}</IonLabel>
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
                  routerLink={`/reservacion/${res.id}`}
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

  return (
<MainLayout pageTitle="Mis Reservaciones" activePage="reservaciones">
   {renderContent()}
</MainLayout>
  );
};
export default Reservaciones;