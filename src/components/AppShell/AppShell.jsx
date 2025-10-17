import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPopover, IonRow, useIonViewWillLeave } from "@ionic/react";
import { personOutline, logInOutline, person } from 'ionicons/icons';

import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";

const AppShell = () => {

    const [searchCriteria, setSearchCriteria] = useState({
        guests: '',
        price: '',
        startDate: '',
        endDate: ''
    });

    const [popoverState, setPopoverState] = useState({ showPopover: false, event: undefined });

    useIonViewWillLeave(() => {
        setPopoverState({ showPopover: false, event: undefined });
    });

    const handleLogOut = () => {
        localStorage.removeItem("isSessionActive");
        window.location.reload();
    }

    return (
        <>
            <IonHeader>
                <IonGrid >
                    <IonRow className="ion-align-items-center">
                        <IonCol size="2">
                            <IonImg />
                        </IonCol>
                        <IonCol>
                            <SearchBar
                                searchCriteria={searchCriteria}
                            />
                        </IonCol>
                        <IonCol size="2">
                            <IonButton 
                                fill="clear" 
                                arial_label="account"
                                onClick={(e) => {
                                    e.persist(); 
                                    setPopoverState({showPopover: true, event: e});
                                }
                            }
                            >
                                <IonIcon slot="icon-only" icon={ localStorage.getItem("isSessionActive") ? person : personOutline} color="primary" size="large" />
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonHeader>
            <IonContent>
                <IonGrid fixed={true}>
                    <IonRow className="ion-align-items-stretch">
                        <IonCol size="9">
                            <IonGrid>
                                <IonRow>
                                    <IonCol size="4">
                                        <IonCard className="cell">
                                            <IonCardHeader><IonCardTitle>Fila 1, Col 1</IonCardTitle></IonCardHeader>
                                            <IonCardContent>Contenido...</IonCardContent>
                                        </IonCard>
                                    </IonCol>
                                    <IonCol size="4">
                                        <IonCard className="cell">
                                            <IonCardHeader><IonCardTitle>Fila 1, Col 2</IonCardTitle></IonCardHeader>
                                            <IonCardContent>Contenido...</IonCardContent>
                                        </IonCard>
                                    </IonCol>
                                    <IonCol size="4">
                                        <IonCard className="cell">
                                            <IonCardHeader><IonCardTitle>Fila 1, Col 3</IonCardTitle></IonCardHeader>
                                            <IonCardContent>Contenido...</IonCardContent>
                                        </IonCard>
                                    </IonCol>
                                </IonRow>
                                <IonRow>
                                    <IonCol>
                                        <IonCard className="cell">
                                            <IonCardHeader><IonCardTitle>Fila 2, Col 1</IonCardTitle></IonCardHeader>
                                            <IonCardContent>Contenido...</IonCardContent>
                                        </IonCard>
                                    </IonCol>
                                </IonRow>
                            </IonGrid>
                        </IonCol>
                        <IonCol size="3">
                            <IonCard className="cell" style={{ height: '100%' }}>
                                <IonCardHeader><IonCardTitle>Columna Compartida</IonCardTitle></IonCardHeader>
                                <IonCardContent>
                                    Esta columna abarca la altura de las dos filas de la izquierda.
                                </IonCardContent>
                            </IonCard>
                        </IonCol>

                    </IonRow>
                </IonGrid>
            </IonContent>
            <IonFooter>
                <p style={{ textAlign: "center" }}>Todos los derechos reservados MPI 2025</p>
            </IonFooter>

            <IonPopover
                isOpen={popoverState.showPopover}
                event={popoverState.event}
                onDidDismiss={() => setPopoverState({ showPopover: false, event: undefined })}
                side="bottom"
                alignment="end"
            >
                <IonContent>
                    <IonList>
                        {
                            localStorage.getItem("isSessionActive") ? 
                            <IonItem button={true} detail={false} onClick={handleLogOut}>
                            <IonIcon slot="start" icon={logInOutline} />
                            <IonLabel>Cerrar Sesión</IonLabel>
                        </IonItem>
                            :
                            <IonItem button={true} detail={false} routerLink="/login">
                            <IonIcon slot="start" icon={logInOutline} />
                            <IonLabel>Iniciar Sesión</IonLabel>
                        </IonItem>
                        }
                        
                    </IonList>
                </IonContent>
            </IonPopover>
        </>
    )
}

export default AppShell;