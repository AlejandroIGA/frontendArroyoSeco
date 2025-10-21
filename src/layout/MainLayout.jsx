import React from 'react';
import { IonPage, IonHeader, IonToolbar, IonContent, IonButtons, IonMenuButton, IonBackButton, IonMenu, IonGrid, IonRow, IonCol, IonTitle } from '@ionic/react';
import Sidebar from '../components/Sidebar/Sidebar';

// El componente recibe 'children', 'pageTitle' y 'activePage' como props.
const MainLayout = ({ children, activePage }) => {
  return (
    <>
      <IonMenu contentId="main-layout-content">
        <Sidebar activePage={activePage} />
      </IonMenu>

      <IonPage id="main-layout-content">
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start">
              <IonBackButton defaultHref="/" text="Regresar" />
            </IonButtons>

            <IonButtons slot="end" className="ion-hide-md-up">
              <IonMenuButton />
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent fullscreen={true} scrollY={false}>
          <IonGrid className="ion-h-100">
            <IonRow className="ion-h-100">
              <IonCol size="4" size-md="3" className="ion-hide-md-down sidebar-col">
                <Sidebar activePage={activePage} />
              </IonCol>
              <IonCol size="12" size-md="9" className="main-content-col">
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