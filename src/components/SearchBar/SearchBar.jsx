import { IonRow, IonCol, IonItem, IonIcon, IonInput, IonButton } from "@ionic/react";
import { peopleOutline, cashOutline, calendarOutline, searchOutline } from 'ionicons/icons';

import './SearchBar.css'

const validateGuests = (e, callback) => {
    let value = e.target.value;
    value = value.replace(/[^0-9]/g, "");
    let num = parseInt(value);
    if (!num || num < 1) num = "";
    if (num > 20) num = 20;
    e.target.value = num;
    callback(e);
};

const validatePrice = (e, callback) => {
    let value = e.target.value;
    value = value.replace(/[^0-9.]/g, "");
    let num = parseFloat(value);
    if (!num || num < 1) num = "";
    if (num > 100000) num = 100000;
    if (value.includes(".")) {
        value = value.replace(/(\.\d{2})\d+/, "$1");
        num = value;
    }
    e.target.value = num;
    callback(e);
};

const SearchBar = ({
    searchCriteria,
    handleInputChange,
    setShowStartDateModal,
    setShowEndDateModal,
    handleSearch }) => {
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
                        onIonInput={(e) => validateGuests(e, handleInputChange)}
                        min="1"
                        max="20"
                        onKeyDown={(e) => {
                            if (["-", "+", "e", "E"].includes(e.key)) {
                                e.preventDefault();
                            }
                        }}
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
                        onIonInput={(e) => validatePrice(e, handleInputChange)}
                        min="1.00"
                        max="999.00"
                        step="0.01"
                        onKeyDown={(e) => {
                            if (["-", "+", "e", "E"].includes(e.key)) {
                                e.preventDefault();
                            }
                        }}
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
                    <IonIcon slot="icon-only" icon={searchOutline} />
                </IonButton>
            </IonCol>
        </IonRow>
    );
};

export default SearchBar;