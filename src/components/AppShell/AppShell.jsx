import { IonButton, IonCol, IonContent, IonFooter, IonGrid, IonHeader, 
    IonIcon, IonImg, IonItem, IonLabel, IonList, IonPopover, IonRouterLink, 
    IonRow, useIonViewWillLeave, IonModal, IonDatetime } from "@ionic/react";
import { personOutline, logInOutline, person, searchOutline, personCircleOutline, personAddOutline } from 'ionicons/icons';

import './AppShell.css'
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import MobileSearchModal from "../MobileSearchModal/MobileSearchModal";

const AppShell = ({ children }) => {

    const [searchCriteria, setSearchCriteria] = useState({
        guests: '',
        price: '',
        startDate: '',
        endDate: ''
    });
    const [showStartDateModal, setShowStartDateModal] = useState(false);
    const [showEndDateModal, setShowEndDateModal] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);

    const handleDateChange = (e, field) => {
        const value = e.detail.value.split('T')[0]; // Formato YYYY-MM-DD
        setSearchCriteria(prev => ({ ...prev, [field]: value }));
        
        if (field === 'startDate') setShowStartDateModal(false);
        if (field === 'endDate') setShowEndDateModal(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSearchCriteria(prev => ({ ...prev, [name]: value }));
    };

    const handleSearch = () => {
        console.log("Buscando con:", searchCriteria);
        setShowSearchModal(false); // Cierra el modal si estaba abierto
    };

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
                        <IonCol className="ion-hide-lg-down">
                            <SearchBar
                                searchCriteria={searchCriteria}
                                setShowEndDateModal={() => setShowEndDateModal(true)}
                                setShowStartDateModal={() => setShowStartDateModal(true)}
                            />
                        </IonCol>
                        <IonCol className="ion-hide-lg-up ion-text-center">
                            <IonButton fill="outline" shape="round" onClick={() => setShowSearchModal(true)}>
                                Buscar estancias
                                <IonIcon slot="end" icon={searchOutline} />
                            </IonButton>
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

            <MobileSearchModal
                isOpen={showSearchModal}
                onClose={() => setShowSearchModal(false)}
                searchCriteria={searchCriteria}
                handleInputChange={handleInputChange}
                handleSearch={handleSearch}
                setShowStartDateModal={setShowStartDateModal}
                setShowEndDateModal={setShowEndDateModal}
            />

            <IonModal 
                isOpen={showStartDateModal} 
                onDidDismiss={() => setShowStartDateModal(false)}
                className="date-modal"
            >
                <IonDatetime 
                    onIonChange={(e) => handleDateChange(e, 'startDate')}
                    presentation="date"
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
                    showDefaultButtons={true}
                    doneText="Aceptar"
                    cancelText="Cancelar"
                />
            </IonModal>

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
                            <>
                                <IonItem button={true} detail={false} routerLink="/user-dashboard/profile">
                                    <IonIcon slot="start" icon={personCircleOutline} />
                                    <IonLabel>Panel de usuario</IonLabel>
                                </IonItem>
                                <IonItem button={true} detail={false} onClick={handleLogOut}>
                                    <IonIcon slot="start" icon={logInOutline} />
                                    <IonLabel>Cerrar Sesión</IonLabel>
                                </IonItem>
                                </>
                                :
                                <>
                                <IonItem button={true} detail={false} routerLink="/login">
                                    <IonIcon slot="start" icon={logInOutline} />
                                    <IonLabel>Iniciar Sesión</IonLabel>
                                </IonItem>
                                <IonItem button={true} detail={false} routerLink="/register">
                                    <IonIcon slot="start" icon={personAddOutline} />
                                    <IonLabel>Registrarse</IonLabel>
                                </IonItem>
                                </>
                        }
                    </IonList>
                </IonContent>
            </IonPopover>
        </>
    )
}

export default AppShell;