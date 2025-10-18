import React from 'react';
import {
    IonCard,
    IonCardContent,
    IonGrid,
    IonRow,
    IonCol,
    IonImg,
    IonList,
    IonItem,
    IonLabel,
    IonIcon
} from '@ionic/react';
import { cashOutline, peopleOutline, homeOutline } from 'ionicons/icons';
import './PropertyCardData.css';

const PropertyCardData = ({ property }) => {
    const { name, pricePerNight, numberOfGuests, imageUrl } = property;

    return (
        <IonCard className="property-card-horizontal">
            <IonGrid>
                <IonRow className="ion-align-items-center">
                    {/* Columna de la Imagen (Izquierda) */}
                    <IonCol size="4">
                        <IonImg src={imageUrl} alt={name} className="property-image" />
                    </IonCol>

                    {/* Columna de la Información (Derecha) */}
                    <IonCol size="8">
                        <IonCardContent>
                            <IonList lines="none">
                                <IonItem>
                                    <IonIcon icon={homeOutline} slot="start" color="primary" />
                                    <IonLabel>
                                        <h2>{name}</h2>
                                    </IonLabel>
                                </IonItem>

                                <IonItem>
                                    <IonIcon icon={cashOutline} slot="start" color="primary" />
                                    <IonLabel>
                                        <p>${pricePerNight} MXN / noche</p>
                                    </IonLabel>
                                </IonItem>

                                <IonItem>
                                    <IonIcon icon={peopleOutline} slot="start" color="primary" />
                                    <IonLabel>
                                        <p>Hasta {numberOfGuests} personas</p>
                                    </IonLabel>
                                </IonItem>
                            </IonList>
                        </IonCardContent>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonCard>
    );
};

export default PropertyCardData;