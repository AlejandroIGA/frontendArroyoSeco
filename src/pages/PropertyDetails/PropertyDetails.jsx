import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom'; 
import { 
    IonPage, 
    IonGrid, 
    IonRow, 
    IonCol, 
    IonImg, 
    IonList, 
    IonItem, 
    IonLabel, 
    IonIcon,
    IonButton,
    IonText,
    IonCard,
    IonCardContent,
    IonSpinner,
    IonInput,
    IonModal,
    IonDatetime,
    IonHeader, 
    IonToolbar, 
    IonTitle, 
    IonButtons,
    IonBackButton 
} from '@ionic/react';

import { cashOutline, peopleOutline, mapOutline, pawOutline, accessibilityOutline, checkmarkCircleOutline, closeCircleOutline, homeOutline } from 'ionicons/icons';

import AppShell from "../../components/AppShell/AppShell"; 
import ReservationForm from "../../components/ReservationForm/ReservationForm";
// import apiClient from '../../../axiosConfig'; 
import './PropertyDetails.css'; 

const DUMMY_PROPERTIES = [
    {
        id: 1, 
        name: "Cabaña Secreta del Bosque",
        pricePerNight: "180.00",
        numberOfGuests: 6,
        type: "Cabaña Rústica",
        kidsAllowed: true, 
        petsAllowed: true, 
        description: "Alojamiento tranquilo en medio de pinos, ideal para una desintoxicación digital. Gran jardín y hamacas. ¡Aceptamos a tu mejor amigo peludo!", 
        location: "Sierra Gorda, Pinal de Amoles",
        images: ['/assets/bosque_placeholder.jpg'], 
    },
    {
        id: 2, 
        name: "Cabaña Los Sueños del Cisne",
        pricePerNight: "250.00",
        numberOfGuests: 4,
        type: "Cabaña de Lujo",
        kidsAllowed: true, 
        petsAllowed: false, 
        description: "Una acogedora cabaña en el corazón del bosque, perfecta para una escapada romántica o familiar. Cuenta con chimenea, jacuzzi exterior y vistas panorámicas inigualables. ¡Tranquilidad garantizada!", 
        location: "Arroyo Seco, Querétaro (A 10km del centro)",
        images: ['/assets/cabana_placeholder.jpg'], 
    }
];

// FUNCIÓN DE BÚSQUEDA SIMULADA
const findPropertyById = (id) => {
    const numericId = parseInt(id, 10);
    return DUMMY_PROPERTIES.find(p => p.id === numericId) || null;
};

const PropertyDetails = () => {
    const { id } = useParams(); 
    
    const [property, setProperty] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        setIsLoading(true);
        setError(null);

        setTimeout(() => {
            if (id) {
                const foundProperty = findPropertyById(id); 
                
                if (foundProperty) {
                    setProperty(foundProperty);
                } else {
                    setError(`Propiedad con ID ${id} no encontrada. Asegúrate de que el ID sea '1' o '2' para la prueba.`);
                }
                setIsLoading(false);
            } else {
                setError("ID de propiedad no especificado en la URL.");
                setIsLoading(false);
            }
        }, 1000); 
    }, [id]); 
    if (isLoading) {
        return <AppShell><div className="ion-padding ion-text-center"><IonSpinner name="crescent"/> Cargando detalles...</div></AppShell>;
    }

    if (error || !property) {
        return <AppShell><div className="ion-padding ion-text-center"><p className="ion-text-danger">{error || `Propiedad no encontrada.`}</p></div></AppShell>;
    }

    const mainImage = property.images.length > 0 ? property.images[0] : '/assets/placeholder.jpg';
    
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar color="primary">
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/properties" />
                    </IonButtons>
                    <IonTitle>{property.name}</IonTitle>
                </IonToolbar>
            </IonHeader>

            <AppShell> 
                <IonGrid fixed={true} className="content-grid ion-padding">
                    
                    <IonRow className="ion-align-items-start ion-margin-bottom">
                        <IonCol size="12" size-md="9">
                            <h1 className="property-title">{property.name}</h1>
                            <IonText color="medium">
                                <IonIcon icon={mapOutline} /> {property.location}
                            </IonText>
                        </IonCol>
                        <IonCol size="12" size-md="3" className="ion-text-end">
                            <h2 className="price-tag">
                                ${property.pricePerNight} <small>/ noche</small>
                            </h2>
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-margin-bottom">
                        <IonCol size="12">
                            <div className="main-image-container">
                                <IonImg src={mainImage} alt={property.name} className="main-property-image" />
                            </div>
                        </IonCol>
                    </IonRow>
                    
                    <IonRow>
                        <IonCol size="12" size-md="8">
                            <IonCard>
                                <IonCardContent>
                                    <h2 className="ion-padding-bottom">Descripción General</h2>
                                    <p className="description-text">{property.description}</p>
                                    
                                    <h2 className="ion-padding-top">Detalles de la Propiedad</h2>
                                    <IonList lines="none">
                                        
                                        <IonItem>
                                            <IonIcon icon={homeOutline} slot="start" color="primary" />
                                            <IonLabel>Tipo de Alojamiento:</IonLabel>
                                            <IonText slot="end">{property.type}</IonText>
                                        </IonItem>
                                        
                                        <IonItem>
                                            <IonIcon icon={peopleOutline} slot="start" color="primary" />
                                            <IonLabel>Máximo de Huéspedes:</IonLabel>
                                            <IonText slot="end">{property.numberOfGuests}</IonText>
                                        </IonItem>

                                        <IonItem>
                                            <IonIcon icon={accessibilityOutline} slot="start" /> 
                                            <IonLabel>Niños Permitidos:</IonLabel>
                                            <IonText color={property.kidsAllowed ? "success" : "danger"} slot="end">
                                                <IonIcon icon={property.kidsAllowed ? checkmarkCircleOutline : closeCircleOutline} slot="start" />
                                                {property.kidsAllowed ? 'Sí' : 'No'}
                                            </IonText>
                                        </IonItem>

                                        <IonItem>
                                            <IonIcon icon={pawOutline} slot="start" />
                                            <IonLabel>Mascotas Permitidas:</IonLabel>
                                            <IonText color={property.petsAllowed ? "success" : "danger"} slot="end">
                                                <IonIcon icon={property.petsAllowed ? checkmarkCircleOutline : closeCircleOutline} slot="start" />
                                                {property.petsAllowed ? 'Sí' : 'No'}
                                            </IonText>
                                        </IonItem>
                                    </IonList>
                                </IonCardContent>
                            </IonCard>
                        </IonCol>

                        <IonCol size="12" size-md="4">
                          <ReservationForm 
                                propertyId={property.id} 
                                pricePerNight={parseFloat(property.pricePerNight)} 
                            />
                        </IonCol>
                    </IonRow>

                </IonGrid>
            </AppShell>
        </IonPage>
    );
};

export default PropertyDetails;