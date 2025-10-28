import React, { useState, useEffect } from "react";
import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonPage, IonRow } from "@ionic/react"
import AppShell from "../../components/AppShell/AppShell"
import PropertyCardData from "../../components/PropertyCardData/PropertyCardData"
import apiClient from '../../../axiosConfig';

const Home = () => {
    const [properties, setProperties] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProperties = async () => {
            try {
                const response = await apiClient.get('/properties');
                const data = response.data;
                const normalizedData = data.map(p => ({
                    id: p.id,
                    name: p.name,
                    pricePerNight: p.pricePerNight ? p.pricePerNight.toFixed(2) : 'N/A',
                    numberOfGuests: p.numberOfGuests,
                    imageUrl: (p.imagen && p.imagen.length > 0) ? p.imagen[0] : 'placeholder.jpg',
                }));

                setProperties(normalizedData);

            } catch (error) {
                console.error("Error al obtener propiedades. Asegúrate que el Backend esté corriendo y CORS esté configurado.", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProperties();
    }, []);

    const handleSearchResults = (results) => {
        if (Array.isArray(results)) {
            const normalizedData = results.map((p) => ({
                id: p.id,
                name: p.name,
                pricePerNight: p.pricePerNight ? p.pricePerNight.toFixed(2) : "N/A",
                numberOfGuests: p.numberOfGuests,
                imageUrl: p.imagen && p.imagen.length > 0 ? p.imagen[0] : "placeholder.jpg",
            }));
            setProperties(normalizedData);
        }
    };
    return (
        <IonPage>
            <AppShell onSearchResults={handleSearchResults}>
                <IonGrid fixed={true} className="content-grid">

                    <IonRow>
                        <IonCol>
                            <IonCard><IonCardHeader><IonCardTitle>Info 1</IonCardTitle></IonCardHeader><IonCardContent>Contenido info 1</IonCardContent></IonCard>
                        </IonCol>
                        <IonCol>
                            <IonCard><IonCardHeader><IonCardTitle>Info2 </IonCardTitle></IonCardHeader><IonCardContent>Contenido info 2</IonCardContent></IonCard>
                        </IonCol>
                        <IonCol>
                            <IonCard><IonCardHeader><IonCardTitle>Info 3</IonCardTitle></IonCardHeader><IonCardContent>Contenido info 3</IonCardContent></IonCard>
                        </IonCol>
                    </IonRow>

                    <IonRow className="ion-align-items-stretch">

                        <IonCol size="9">

                            {isLoading && <p>Cargando propiedades de la base de datos...</p>}

                            {!isLoading && properties.length === 0 ? (
                                <p>No se encontraron propiedades. Asegúrate de que los INSERTs están correctos.</p>
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
        </IonPage>
    )
}

export default Home;