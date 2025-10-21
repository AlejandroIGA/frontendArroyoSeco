import React from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonContent,
  IonButtons,
  IonMenuButton,
  IonMenu,
  IonGrid,
  IonRow,
  IonCol,
  IonButton,
  IonIcon
} from '@ionic/react';
import { arrowBack } from 'ionicons/icons';
import Sidebar from '../components/Sidebar/Sidebar';
const MainLayout = ({ children }) => {
  return (
    <>
      <IonMenu contentId="main-layout-content">
        <Sidebar />
      </IonMenu>
      <IonPage id="main-layout-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonButton routerLink="/">
                <IonIcon slot="start" icon={arrowBack} />
                <span className="ion-hide-sm-down">Regresar</span>
              </IonButton>
            </IonButtons>
            <IonButtons slot="end" className="ion-hide-md-up">
              <IonMenuButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true}>
          <IonGrid>
            <IonRow>
              <IonCol size="4" size-md="3" className="ion-hide-md-down">
                <Sidebar />
              </IonCol>
              <IonCol size="12" size-md="9">
                {children}
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    </>
  );
};
export default MainLayout;