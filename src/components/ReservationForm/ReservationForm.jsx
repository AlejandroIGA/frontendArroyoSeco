import React, { useState, useEffect } from "react";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonItem,
  IonLabel,
  IonDatetime,
  IonDatetimeButton,
  IonModal,
  IonButton,
  IonIcon,
} from "@ionic/react";
import { calendarOutline } from "ionicons/icons";
import "./ReservationForm.css";
// Componente que recibe el precio por noche como ua propiedad (prop)
const ReservationForm = ({ pricePerNight = 0 }) => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [numberOfNights, setNumberOfNights] = useState(0);
  // useEffect para recalcular las noches cuando cambian las fechas
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      if (end > start) {
        const diffTime = end.getTime() - start.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setNumberOfNights(diffDays);
      } else {
        setNumberOfNights(0);
      }
    } else {
      setNumberOfNights(0);
    }
  }, [startDate, endDate]);
  const handleStartDateChange = (e) => {
    const newStartDate = e.detail.value;
    setStartDate(newStartDate);
    // Si la nueva fecha de inicio es posterior a la de fin, limpiar la de fin
    if (endDate && new Date(newStartDate) >= new Date(endDate)) {
      setEndDate(null);
    }
  };
  // Función para manejar el envío de la solicitud
  const handleReservationSubmit = () => {
    if (numberOfNights <= 0) {
      // En una app real, usarías un componente Toast o Alert de Ionic
      alert("Por favor, selecciona un rango de fechas válido.");
      return;
    }
    const reservationDetails = {
      startDate,
      endDate,
      numberOfNights,
      totalPrice: numberOfNights * pricePerNight,
    };
    console.log("Enviando solicitud de reserva:", reservationDetails);
    // Aquí iría la lógica para llamar a tu servicio/API y crear la reserva
  };
  // Obtiene la fecha de hoy para no permitir seleccionar fechas pasadas
  const today = new Date().toISOString();
  return (
    <>
      <IonCard className="reservation-form-card">
        <IonCardHeader>
          <IonCardTitle className="ion-text-center">
            Solicita tu Reserva
          </IonCardTitle>
        </IonCardHeader>
        <IonCardContent>
          <IonItem lines="full">
            <IonIcon icon={calendarOutline} slot="start" color="primary" />
            <IonLabel>Llegada</IonLabel>
            <IonDatetimeButton datetime="start-datetime"></IonDatetimeButton>
          </IonItem>
          <IonItem lines="full">
            <IonIcon icon={calendarOutline} slot="start" color="primary" />
            <IonLabel>Salida</IonLabel>
            {/* Se deshabilita hasta que se elija una fecha de inicio */}
            <IonDatetimeButton
              datetime="end-datetime"
              disabled={!startDate}
            ></IonDatetimeButton>
          </IonItem>
          {/* Resumen de la reserva si las fechas son válidas */}
          {numberOfNights > 0 && (
            <div className="reservation-summary ion-padding-top">
              <p className="ion-text-center">
                Total por <strong>{numberOfNights}</strong>{" "}
                {numberOfNights > 1 ? "noches" : "noche"}:
              </p>
              <h2 className="ion-text-center total-price">
                ${(numberOfNights * pricePerNight).toLocaleString("es-MX")} MXN
              </h2>
            </div>
          )}
          <IonButton
            expand="block"
            className="ion-margin-top"
            onClick={handleReservationSubmit}
            disabled={numberOfNights <= 0}
          >
            Solicitar Reserva
          </IonButton>
        </IonCardContent>
      </IonCard>
      {/* Modales ocultos que contienen los calendarios */}
      <IonModal keepContentsMounted={true}>
        <IonDatetime
          id="start-datetime"
          presentation="date"
          min={today}
          onIonChange={handleStartDateChange}
        ></IonDatetime>
      </IonModal>
      <IonModal keepContentsMounted={true}>
        <IonDatetime
          id="end-datetime"
          presentation="date"
          min={startDate} // La fecha de fin no puede ser anterior a la de inicio
          onIonChange={(e) => setEndDate(e.detail.value)}
        ></IonDatetime>
      </IonModal>
    </>
  );
};
export default ReservationForm;
