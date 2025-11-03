import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';
import { useHistory } from 'react-router-dom';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonGrid, IonHeader, IonLoading, 
IonModal, IonPage, IonRow, IonTitle, IonToolbar, useIonToast, useIonViewWillEnter, IonImg } from "@ionic/react"
import AppShell from "../../components/AppShell/AppShell"
import PropertyCardData from "../../components/PropertyCardData/PropertyCardData"
import propertyService from "../../services/propertyService";

import './Home.css';
import 'swiper/css';
import 'swiper/css/pagination';
import '@ionic/react/css/ionic-swiper.css';

const Home = () => {
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showTermsModal, setShowTermsModal] = useState(false);
    const history = useHistory();
    const [navigatingTo, setNavigatingTo] = useState(null);
    const [presentToast] = useIonToast();

    const carouselImages = [
        '/img/arroyoSeco1.jpg',
        '/img/arroyoSeco2.png',
        '/img/arroyoSeco3.jpg'
    ];

    const getProperties = async () => {
        try {
            const response = await propertyService.getAll();
            setIsLoading(false);
            const filteredProperties = response.data.filter(property => property.showProperty);
            setProperties(filteredProperties);
        } catch (error) {
            setIsLoading(false);
            if (error.response) {
                if (error.response.status === 401) {
                    console.log(error);
                    errorMsg = "Credenciales incorrectas.";
                } else {
                    errorMsg = "Error inesperado.";
                }
            } else if (error.code === "ERR_NETWORK") {
                errorMsg = 'Error de conexión.';
            } else {
                errorMsg = 'Ocurrió un error en la aplicación.';
            }
            presentToast({
                message: errorMsg,
                duration: 3000,
                color: 'danger',
                position: 'top'
            });
        }
    }

    useIonViewWillEnter(() => {
        const hasAccepted = localStorage.getItem('hasAcceptedTerms') === 'true';
        if (!hasAccepted) {
            setShowTermsModal(true);
        }

        if (localStorage.getItem('userRole') === "propietario"){
            history.push("/user-dashboard/profile")
        }

        getProperties();
    });

    const handleAcceptTerms = () => {
        localStorage.setItem('hasAcceptedTerms', 'true');
        setShowTermsModal(false);
    };

    const handleNavigate = (path) => {
        setNavigatingTo(path);
        setShowTermsModal(false);
    };

    const handleSearchResults = (results) => {
        if (Array.isArray(results)) {
            const normalizedData = results.map((p) => ({
                id: p.id,
                name: p.name,
                pricePerNight: p.pricePerNight ? p.pricePerNight.toFixed(2) : "N/A",
                numberOfGuests: p.numberOfGuests,
                imagen: p.imagen && p.imagen.length > 0 
                ? [ p.imagen[0] ]
                : [ "placeholder.jpg" ]
            }));
            setProperties(normalizedData);
            console.log("Datos de la busqueda:", normalizedData);
        }

    };

    return (
        <IonPage>
            <AppShell onSearchResults={handleSearchResults}>
                <IonGrid fixed={true} className="content-grid">

                    <IonRow className="ion-margin-bottom">
                        <IonCol size="12">
                            <Swiper
                                modules={[Autoplay, Pagination]}
                                pagination={{ clickable: true }}
                                loop={true}
                                autoplay={{
                                    delay: 3000,
                                    disableOnInteraction: false
                                }}
                                className="home-carousel"
                            >
                                {carouselImages.map((imageUrl, index) => (
                                    <SwiperSlide key={index}>
                                        <IonImg
                                            src={imageUrl}
                                            alt={`Imagen de carrusel ${index + 1}`}
                                            className="carousel-image"
                                        />
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-align-items-stretch">

                        <IonCol size="9">

                            {isLoading && <p>Cargando propiedades de la base de datos...</p>}

                            {!isLoading && properties.length === 0 ? (
                                <p>No se encontraron propiedades.</p>
                            ) : (
                                properties.map(data => (
                                    <PropertyCardData key={data.id} property={data} />
                                ))
                            )}
                        </IonCol>

                        <IonCol size="3" className="aside-container">
                            <aside className="full-height-aside">
                                <IonCard>
                                    <IonCardHeader><IonCardTitle>Arroyo Seco</IonCardTitle></IonCardHeader>
                                    <IonCardContent>
                                        Arroyo Seco es un municipio en Querétaro conocido por su rica historia y belleza natural.
                                        Se destaca por los sitios de arte rupestre prehispánico, como el de Arroyo Seco, y por sus paisajes naturales, que incluyen el río Ayutla y ruinas como los acueductos de "Los Arquitos".
                                        Su economía se apoya en actividades como el turismo, y la comunidad tiene tradiciones arraigadas como el Día de Muertos y la música huapango arribeño.
                                    </IonCardContent>
                                </IonCard>
                            </aside>
                        </IonCol>

                    </IonRow>
                </IonGrid>
            </AppShell>
            <IonLoading
                isOpen={isLoading}
                onDidDismiss={() => setIsLoading(false)}
                message={'Cargando...'}
                duration={0}
            />
            <IonModal
                isOpen={showTermsModal}
                backdropDismiss={false}
                onDidDismiss={() => {
                    if (navigatingTo) {
                        history.push(navigatingTo);
                        setNavigatingTo(null);
                    }
                }}
            >
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Bienvenido a SRAT</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent className="ion-padding">
                    <h2>Aviso Importante</h2>
                    <p>
                        Para usar nuestra aplicación, debes leer y aceptar
                        nuestros Términos y Condiciones y nuestra Política de Privacidad.
                    </p>

                    <div className="ion-margin-vertical">
                        <IonButton
                            fill="clear"
                            expand="block"
                            onClick={() => handleNavigate('/terms')}
                        >
                            <strong>Leer Términos y Condiciones</strong>
                        </IonButton>
                        <IonButton
                            fill="clear"
                            expand="block"
                            onClick={() => handleNavigate('/privacy-policy')}
                        >
                            <strong>Leer Política de Privacidad</strong>
                        </IonButton>
                    </div>
                    <IonButton expand="block" onClick={handleAcceptTerms}>
                        He leído y acepto los términos
                    </IonButton>
                </IonContent>
            </IonModal>
        </IonPage>
    )
}

export default Home;