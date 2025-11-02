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
    IonIcon,
    IonButton,
    IonRouterLink
} from '@ionic/react';
import { cashOutline, peopleOutline, homeOutline } from 'ionicons/icons';
import './PropertyCardData.css';

const PropertyCardData = ({ property }) => {
    const { id, name, pricePerNight, numberOfGuests} = property;

    return (
        <IonCard className="property-card-horizontal">
            <IonGrid>
                <IonRow className="ion-align-items-center">
                    
                    <IonCol size="12" size-md="4">
                        <IonImg 
                            src={property.imagen[0]}
                            alt={name} 
                            className="property-image" 
                        />
                    </IonCol>

                    <IonCol size="12" size-md="8">
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

                            <div className="ion-text-end ion-padding-top">
                                <IonRouterLink routerLink={`/propiedad/${id}`}>
                                    <IonButton fill="outline" size="small">
                                        Más detalles
                                    </IonButton>
                                </IonRouterLink>
                            </div>
                            
                        </IonCardContent>
                    </IonCol>
                </IonRow>
            </IonGrid>
        </IonCard>
    );
};

export default PropertyCardData;