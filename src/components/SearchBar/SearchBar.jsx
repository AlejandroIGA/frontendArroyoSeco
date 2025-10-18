import { IonRow, IonCol, IonItem, IonIcon, IonInput, IonButton } from "@ionic/react";
import { peopleOutline, cashOutline, calendarOutline, searchOutline } from 'ionicons/icons';

import './SearchBar.css'

const SearchBar = ({ 
    searchCriteria, 
    handleInputChange, 
    setShowStartDateModal, 
    setShowEndDateModal, 
    handleSearch }) => 
{
    return (
        <IonRow className="ion-align-items-center">
            <IonCol>
                <IonItem className="search-item">
                    <IonIcon icon={peopleOutline} slot="start" />
                    <IonInput 
                        name="guests" 
                        type="number" 
                        placeholder="Personas" 
                        value={searchCriteria.guests} 
                        onIonInput={handleInputChange} 
                    />
                </IonItem>
            </IonCol>
            <IonCol>
                <IonItem className="search-item">
                    <IonIcon icon={cashOutline} slot="start" />
                    <IonInput 
                        name="price" 
                        type="number" 
                        placeholder="Precio/noche" 
                        value={searchCriteria.price} 
                        onIonInput={handleInputChange} 
                    />
                </IonItem>
            </IonCol>
            <IonCol>
                <IonItem className="search-item" button onClick={() => setShowStartDateModal(true)}>
                    <IonIcon icon={calendarOutline} slot="start" />
                    <IonInput 
                        name="startDate" 
                        placeholder="Fecha inicio" 
                        readonly 
                        value={searchCriteria.startDate} 
                    />
                </IonItem>
            </IonCol>
            <IonCol>
                <IonItem className="search-item" button onClick={() => setShowEndDateModal(true)}>
                    <IonIcon icon={calendarOutline} slot="start" />
                    <IonInput 
                        name="endDate" 
                        placeholder="Fecha fin" 
                        readonly 
                        value={searchCriteria.endDate} 
                    />
                </IonItem>
            </IonCol>
            <IonCol size="auto">
                <IonButton onClick={handleSearch}>
                    <IonIcon slot="icon-only" icon={searchOutline}/>
                </IonButton>
            </IonCol>
        </IonRow>
    );
};

export default SearchBar;