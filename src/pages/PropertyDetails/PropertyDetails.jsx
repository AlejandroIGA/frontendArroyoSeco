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
    IonCardContent
} from '@ionic/react';

import { peopleOutline, pawOutline, accessibilityOutline, checkmarkCircleOutline, closeCircleOutline, homeOutline } from 'ionicons/icons';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import '@ionic/react/css/ionic-swiper.css';

import AppShell from "../../components/AppShell/AppShell";
import ReservationForm from "../../components/ReservationForm/ReservationForm";
import './PropertyDetails.css';
import propertyService from "../../services/propertyService";

const PropertyDetails = () => {
    const { id } = useParams();

    const [property, setProperty] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [detailKeys, setDetailKeys] = useState(null);

    const keyTranslations = {
        internet: "Servicio de Internet",
        lavado: "Cuarto de Lavado",
        camasIndividuales: "Camas Individuales",
        camasMatrimoniales: "Camas Matrimoniales",
    };

    const defineDetailKeys = (data) => {
        setDetailKeys(Object.keys(data.description).filter(key => key !== 'general'));
    }

    const findPropertyById = async (id) => {
        const response = await propertyService.getById(id);
        console.log(response);
        setProperty(response.data);
        defineDetailKeys(response.data);
        setIsLoading(false);
    };

    useEffect(() => {
        findPropertyById(id);
    }, [id]);

    return (
        <IonPage>
            <AppShell>
                {
                    isLoading == true ?
                        <p>Cargando propiedades</p>
                        :
                        <IonGrid fixed={true} className="content-grid ion-padding">

                            <IonRow className="ion-align-items-start ion-margin-bottom">
                                <IonCol size="12" size-md="9">
                                    <h1 className="property-title">{property.name}</h1>
                                </IonCol>
                                <IonCol size="12" size-md="3" className="ion-text-end">
                                    <h2 className="price-tag">
                                        ${property.pricePerNight} <small>/ noche</small>
                                    </h2>
                                </IonCol>
                            </IonRow>

                            <IonRow className="ion-margin-bottom">
                                <IonCol size="12">
                                    {property.imagen && property.imagen.length > 0 ? (

                                        <Swiper
                                            modules={[Autoplay, Pagination]} // Añade los módulos
                                            pagination={true} // Muestra los "puntitos"
                                            loop={true}
                                            autoplay={{ delay: 3000 }}
                                        >
                                            {property.imagen.map((imageUrl, index) => (
                                                <SwiperSlide key={index}>
                                                    <div className="main-image-container">
                                                        <IonImg
                                                            src={imageUrl}
                                                            alt={`${property.name} - Imagen ${index + 1}`}
                                                            className="main-property-image"
                                                        />
                                                    </div>
                                                </SwiperSlide>
                                            ))}
                                        </Swiper>

                                    ) : (
                                        <div className="main-image-container placeholder-image">
                                            <IonText color="medium">No hay imágenes disponibles</IonText>
                                        </div>
                                    )}
                                </IonCol>
                            </IonRow>

                            <IonRow>
                                <IonCol size="12" size-md="8">
                                    <IonCard>
                                        <IonCardContent>
                                            <h2 className="ion-padding-bottom">Descripción General</h2>
                                            <p className="description-text">
                                                {
                                                    property.description.general
                                                        ? JSON.parse(property.description.general)
                                                        : 'No hay descripción disponible.'
                                                }
                                            </p>

                                            <h2 className="ion-padding-top">Detalles de la Propiedad</h2>
                                            <IonList lines="none">
                                                {
                                                    detailKeys.map(key => {
                                                        const stringValue = property.description[key];
                                                        const parsedValue = JSON.parse(stringValue);

                                                        const label = keyTranslations[key] || key;

                                                        if (typeof parsedValue === 'boolean') {
                                                            return (
                                                                <IonItem key={key}>
                                                                    <IonIcon
                                                                        icon={parsedValue ? checkmarkCircleOutline : closeCircleOutline}
                                                                        slot="start"
                                                                        color={parsedValue ? "success" : "danger"}
                                                                    />
                                                                    <IonLabel>{label}</IonLabel>
                                                                    <IonText slot="end">{parsedValue ? 'Sí' : 'No'}</IonText>
                                                                </IonItem>
                                                            );
                                                        } else {
                                                            return (
                                                                <IonItem key={key}>
                                                                    <IonLabel>{label}</IonLabel>
                                                                    <IonText slot="end">{parsedValue}</IonText>
                                                                </IonItem>
                                                            );
                                                        }
                                                    })
                                                }
                                            </IonList>
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
                                {
                                    localStorage.getItem("userRole") == "propietario" ?
                                        <IonCol>
                                            <IonButton expand="block">
                                                Editar
                                            </IonButton>
                                            <IonButton expand="block" color="warning">
                                                Eliminar
                                            </IonButton>
                                        </IonCol>
                                        :
                                        <IonCol size="12" size-md="4">
                                            <ReservationForm
                                                propertyId={property.id}
                                                pricePerNight={parseFloat(property.pricePerNight)}
                                            />
                                        </IonCol>
                                }

                            </IonRow>

                        </IonGrid>
                }
            </AppShell>
        </IonPage>
    );
};

export default PropertyDetails;