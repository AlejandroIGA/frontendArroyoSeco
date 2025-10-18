// src/components/MobileSearchModal/MobileSearchModal.jsx
import React from 'react';
import {
    IonModal, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton,
    IonIcon, IonContent, IonItem, IonInput, IonList
} from '@ionic/react';
import { 
    closeCircleOutline, 
    peopleOutline, 
    cashOutline, 
    calendarOutline 
} from 'ionicons/icons';

const MobileSearchModal = ({ 
    isOpen, 
    onClose, 
    searchCriteria, 
    handleInputChange, 
    handleSearch,
    setShowStartDateModal, // Prop para abrir el modal de fecha de inicio
    setShowEndDateModal    // Prop para abrir el modal de fecha de fin
}) => {

    return (
        <IonModal isOpen={isOpen} onDidDismiss={onClose}>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Filtrar Búsqueda</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={onClose}>
                            <IonIcon slot="icon-only" icon={closeCircleOutline} />
                        </IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>

            <IonContent className="ion-padding">
                <IonList lines="none">
                    {/* 👨‍👩‍👧‍👦 Personas */}
                    <IonItem>
                        <IonIcon icon={peopleOutline} slot="start" />
                        <IonInput
                            label="Número de personas"
                            labelPlacement="floating"
                            name="guests"
                            type="number"
                            value={searchCriteria.guests}
                            onIonInput={handleInputChange}
                        />
                    </IonItem>

                    {/* 💰 Precio */}
                    <IonItem>
                        <IonIcon icon={cashOutline} slot="start" />
                        <IonInput
                            label="Precio máximo por noche"
                            labelPlacement="floating"
                            name="price"
                            type="number"
                            value={searchCriteria.price}
                            onIonInput={handleInputChange}
                        />
                    </IonItem>

                    {/* 📅 Fecha Inicio */}
                    {/* Este 'IonItem' actúa como un botón que abre otro modal (el de fecha) */}
                    <IonItem button onClick={() => setShowStartDateModal(true)}>
                        <IonIcon icon={calendarOutline} slot="start" />
                        <IonInput
                            label="Fecha de inicio"
                            labelPlacement="floating"
                            name="startDate"
                            readonly
                            value={searchCriteria.startDate}
                        />
                    </IonItem>

                    {/* 📅 Fecha Fin */}
                    <IonItem button onClick={() => setShowEndDateModal(true)}>
                        <IonIcon icon={calendarOutline} slot="start" />
                        <IonInput
                            label="Fecha de fin"
                            labelPlacement="floating"
                            name="endDate"
                            readonly
                            value={searchCriteria.endDate}
                        />
                    </IonItem>
                </IonList>

                <IonButton 
                    expand="block" 
                    onClick={handleSearch} // handleSearch debe cerrar este modal
                    className="ion-margin-top"
                >
                    Buscar
                </IonButton>
            </IonContent>
        </IonModal>
    );
};

export default MobileSearchModal;