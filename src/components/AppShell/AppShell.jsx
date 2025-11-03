import { IonButton, IonCol, IonContent, IonFooter, IonGrid, IonHeader, 
    IonIcon, IonImg, IonItem, IonLabel, IonList, IonPopover, IonRouterLink, 
    IonRow, useIonViewWillLeave, IonModal, IonDatetime } from "@ionic/react";
import { personOutline, logInOutline, person, searchOutline, personCircleOutline, personAddOutline } from 'ionicons/icons';

import './AppShell.css'
import SearchBar from "../SearchBar/SearchBar";
import { useState } from "react";
import MobileSearchModal from "../MobileSearchModal/MobileSearchModal";
import propertyService from "../../services/propertyService";
import bookingService from "../../services/bookingService";
const AppShell = ({ children, onSearchResults }) => {

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
    const handleSearch = async () => {
        try {
            const propertyParams = {
                numberOfGuests: searchCriteria.guests || undefined,
                maxPrice: searchCriteria.price || undefined,
            };
            const propertyResponse = await propertyService.searchProperties(propertyParams);
            let allMatchingProperties = propertyResponse.data;
            if (searchCriteria.startDate && searchCriteria.endDate) {
                const bookingParams = {
                    startDate: searchCriteria.startDate,
                    endDate: searchCriteria.endDate,
                };
                const bookingResponse = await bookingService.searchBookings(bookingParams);
                const conflictingBookings = bookingResponse.data; // Array de reservas
                const conflictingPropertyIds = new Set();
                conflictingBookings.forEach(booking => {
                    if (booking.propertyId) {
                        conflictingPropertyIds.add(booking.propertyId);
                    } else if (booking.property && booking.property.id) {
                        conflictingPropertyIds.add(booking.property.id);
                    }
                });
                allMatchingProperties = allMatchingProperties.filter(property =>
                    !conflictingPropertyIds.has(property.id)
                );
            }
            if (onSearchResults) {
                onSearchResults(allMatchingProperties);
            }
            setShowSearchModal(false);
        } catch (error) {
            console.error("Error al buscar propiedades:", error);
        }
    };
    const [popoverState, setPopoverState] = useState({ showPopover: false, event: undefined });
    useIonViewWillLeave(() => {
        setPopoverState({ showPopover: false, event: undefined });
    });

    const handleLogOut = () => {
        localStorage.removeItem("isSessionActive");
        localStorage.removeItem("userId");
        localStorage.removeItem("userRole");
        localStorage.removeItem("hasAcceptedTerms");
        window.location.reload();
    }

    return (
        <>
            <IonHeader>
                <IonGrid >
                    <IonRow className="ion-align-items-center">
                        <IonCol size="2" class="ion-justify-content-end">
                            <IonRouterLink routerLink={localStorage.getItem("userRole") !== "visitante" ? "/user-dashboard/property"  : "/" }>
                                <IonImg
                                    src="/logo.png"
                                    alt="Arroyo Seco"
                                    className="header-logo"
                                />
                            </IonRouterLink>
                        </IonCol>
                        <IonCol className="ion-hide-lg-down">
                            {
                                localStorage.getItem("userRole") == "propietario" ? 
                                <></>
                                :
                                <SearchBar
                                searchCriteria={searchCriteria}
                                handleInputChange={handleInputChange}
                                setShowEndDateModal={() => setShowEndDateModal(true)}
                                setShowStartDateModal={() => setShowStartDateModal(true)}
                                handleSearch={handleSearch}
                            />
                            }
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
                <div className="ion-text-center ion-padding-vertical" style={{ fontSize: '0.9em', color: 'var(--ion-color-medium)' }}>
                    <div>
                        <IonRouterLink routerLink="/terms" color="medium" style={{ padding: '0 8px' }}>
                            Términos y Condiciones
                        </IonRouterLink>
                        <span>|</span>
                        <IonRouterLink routerLink="/privacy-policy" color="medium" style={{ padding: '0 8px' }}>
                            Política de Privacidad
                        </IonRouterLink>
                    </div>
                    <p style={{ margin: '8px 0 0 0' }}>
                        Todos los derechos reservados 2025
                    </p>
                </div>
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