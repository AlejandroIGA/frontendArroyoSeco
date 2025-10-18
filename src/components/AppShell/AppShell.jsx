import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonContent, IonFooter, IonGrid, IonHeader, IonIcon, IonImg, IonItem, IonLabel, IonList, IonPopover, IonRouterLink, IonRow, useIonViewWillLeave } from "@ionic/react";
import { personOutline, logInOutline, person } from 'ionicons/icons';

import './AppShell.css'
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";

const AppShell = ({ children }) => {

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
                        <IonCol size="2" class="ion-justify-content-end">
                            <IonRouterLink routerLink="/">
                                <IonImg
                                    src="/logo.png"
                                    alt="Arroyo Seco"
                                    className="header-logo"
                                />
                            </IonRouterLink>
                        </IonCol>
                        <IonCol>
                            <SearchBar
                                searchCriteria={searchCriteria}
                            />
                        </IonCol>
                        <IonCol size="2" className="ion-text-center">
                            <IonButton
                                fill="clear"
                                arial_label="account"
                                onClick={(e) => {
                                    e.persist();
                                    setPopoverState({ showPopover: true, event: e });
                                }
                                }
                            >
                                <IonIcon slot="icon-only" icon={localStorage.getItem("isSessionActive") ? person : personOutline} color="primary" size="large" />
                            </IonButton>
                        </IonCol>
                    </IonRow>
                </IonGrid>
            </IonHeader>
            <IonContent>
                {children}
            </IonContent>
            <IonFooter>
                <p style={{ textAlign: "center" }}>Todos los derechos reservados 2025</p>
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