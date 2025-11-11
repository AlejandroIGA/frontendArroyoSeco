import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import {
  IonCard, IonCardContent, IonList, IonItem, IonLabel,
  IonText, IonButton, IonModal, IonDatetime, IonSpinner, IonToast,
  IonInput
} from '@ionic/react';

import bookingService from '../../services/bookingService';

const getTodayAndTomorrow = () => {
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);
  const formatDate = (date) => date.toISOString().split('T')[0];
  return {
    today: formatDate(today),
    tomorrow: formatDate(tomorrow)
  };
};

const { today, tomorrow } = getTodayAndTomorrow();

const formatForDisplay = (isoDate) => {
  if (!isoDate) return '';
  const [year, month, day] = isoDate.split('-');
  return `${day}/${month}/${year}`;
};

const ReservationForm = ({ propertyId, pricePerNight }) => {
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  const [bookingDetails, setBookingDetails] = useState({
    startDate: tomorrow,
    endDate: tomorrow,
  });

  useEffect(() => {
    const nextDay = new Date(bookingDetails.startDate);
    nextDay.setDate(nextDay.getDate() + 1);
    const nextDayStr = nextDay.toISOString().split('T')[0];

    if (bookingDetails.endDate <= bookingDetails.startDate) {
      setBookingDetails(prev => ({ ...prev, endDate: nextDayStr }));
    }
  }, [bookingDetails.startDate]);

  const [showStartDateModal, setShowStartDateModal] = useState(false);
  const [showEndDateModal, setShowEndDateModal] = useState(false);

  const handleDateChange = (e, field) => {
    const value = e.detail.value ? e.detail.value.split('T')[0] : '';
    setBookingDetails(prev => ({ ...prev, [field]: value }));

    if (field === 'startDate') setShowStartDateModal(false);
    if (field === 'endDate') setShowEndDateModal(false);
  };
  const start = new Date(bookingDetails.startDate);
  const end = new Date(bookingDetails.endDate);
  let numberOfNights = 1; // Mínimo 1 noche
  if (end > start) {
    const diffTime = Math.abs(end - start);
    numberOfNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }
  const totalPrice = (pricePerNight * numberOfNights).toFixed(2);
  const handleBookingSubmit = async () => {
    setIsLoading(true);
    setError(null);
    const bookingData = {
      propertyId: propertyId,
      startDate: bookingDetails.startDate,
      endDate: bookingDetails.endDate,
      status: "Pendiente"
    };
    try {
      if (!sessionStorage.getItem("token")) {
        setError("Debe iniciar sesión")
        return;
      }
      await bookingService.registerBooking(bookingData);
      setToastMessage("¡Reserva solicitada con éxito! Recibirás una confirmación.");
      setTimeout(() => {
        history.push('/user-dashboard/reservation');
      }, 2000);

    } catch (err) {
      console.error("Error al crear la reserva:", err);
      setError("No se pudo procesar la solicitud. Intente más tarde.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <IonCard className="sticky-card">
        <IonCardContent>
          <h3 className="ion-text-center ion-margin-bottom">Calcular Estancia y Reservar</h3>
          <IonList lines="full" className="ion-no-padding ion-margin-bottom">
            <IonItem button detail={false} className="date-input-group" onClick={() => setShowStartDateModal(true)}>
              <IonLabel position="stacked">Llegada</IonLabel>
              <IonInput
                readonly
                value={formatForDisplay(bookingDetails.startDate)}
                className="widget-date-input"
              />
            </IonItem>

            <IonItem button detail={false} className="date-input-group ion-margin-top" onClick={() => setShowEndDateModal(true)}>
              <IonLabel position="stacked">Salida</IonLabel>
              <IonInput
                readonly
                value={formatForDisplay(bookingDetails.endDate)}
                className="widget-date-input"
              />
            </IonItem>
          </IonList>

          <IonText color="dark" className="ion-text-center ion-padding-vertical" style={{ display: 'block', borderTop: '1px solid #eee' }}>
            <p className="ion-text-left ion-margin-vertical">
              ${Number(pricePerNight).toFixed(2)} x {numberOfNights} noches:
              <span style={{ fontWeight: 700, float: 'right' }}>${totalPrice}</span>
            </p>
          </IonText>
          {error && (
            <IonText color="danger" className="ion-text-center">
              <p>
                {error === "Debe iniciar sesión" ? (
                  <span
                    onClick={() => history.push('/login')}
                    style={{ cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    {error}
                  </span>
                ) : (
                  error
                )}
              </p>
            </IonText>
          )}
          <IonButton
            color="primary"
            expand="block"
            className="ion-margin-top"
            onClick={handleBookingSubmit}
            disabled={isLoading}
          >
            {isLoading ? <IonSpinner name="dots" /> : `Confirmar Reserva (Total: ${totalPrice})`}
          </IonButton>
        </IonCardContent>
      </IonCard>
      <IonModal
        isOpen={showStartDateModal}
        onDidDismiss={() => setShowStartDateModal(false)}
        className="date-modal"
      >
        <IonDatetime
          onIonChange={(e) => handleDateChange(e, 'startDate')}
          presentation="date"
          value={bookingDetails.startDate}
          min={today}
          showDefaultButtons={true}
          doneText="Aceptar"
          cancelText="Cancelar"
        />
      </IonModal>

      <IonModal
        isOpen={showEndDateModal}
        onDidDismiss={() => setShowEndDateModal(false)}
        className="date-modal"
      >
        <IonDatetime
          onIonChange={(e) => handleDateChange(e, 'endDate')}
          presentation="date"
          value={bookingDetails.endDate}
          min={bookingDetails.startDate}
          showDefaultButtons={true}
          doneText="Aceptar"
          cancelText="Cancelar"
        />
      </IonModal>
      <IonToast
        isOpen={!!toastMessage}
        message={toastMessage}
        onDidDismiss={() => setToastMessage(null)}
        duration={2000}
        color="success"
      />
    </>
  );
};

export default ReservationForm;