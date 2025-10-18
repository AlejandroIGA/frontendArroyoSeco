import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonGrid, IonPage, IonRow } from "@ionic/react"
import AppShell from "../../components/AppShell/AppShell"
import PropertyCardData from "../../components/PropertyCardData/PropertyCardData"

const Home = () => {
   const testData = [
      {
         name: "Casa bonita",
         pricePerNight: "250",
         numberOfGuests: "3",
         imageUrl: ""
      },
      {
         name: "Casa más bonita",
         pricePerNight: "450",
         numberOfGuests: "4",
         imageUrl: ""
      },
      {
         name: "Casa no tan bonita",
         pricePerNight: "150",
         numberOfGuests: "2",
         imageUrl: ""
      },
      {
         name: "Casa más o menos",
         pricePerNight: "380",
         numberOfGuests: "3",
         imageUrl: ""
      }
   ]

   return(
     <IonPage>
        <AppShell>
         <IonGrid fixed={true} className="content-grid">
            <IonRow>
               <IonCol>
                  <IonCard>
                            <IonCardHeader><IonCardTitle>Info 1</IonCardTitle></IonCardHeader>
                            <IonCardContent>Contenido info 1</IonCardContent>
                        </IonCard>
               </IonCol>
               <IonCol>
                  <IonCard>
                            <IonCardHeader><IonCardTitle>Info2 </IonCardTitle></IonCardHeader>
                            <IonCardContent>Contenido info 2</IonCardContent>
                        </IonCard>
               </IonCol>
               <IonCol>
                  <IonCard>
                            <IonCardHeader><IonCardTitle>Info 3</IonCardTitle></IonCardHeader>
                            <IonCardContent>Contenido info 3</IonCardContent>
                        </IonCard>
               </IonCol>
            </IonRow>
            <IonRow className="ion-align-items-stretch">
                
                <IonCol size="9">
                    {testData.map(data => (
                        <PropertyCardData key={data.name} property={data} />
                    ))}
                </IonCol>
                <IonCol size="3" className="aside-container">
                    <aside className="full-height-aside">
                        <IonCard>
                            <IonCardHeader><IonCardTitle>Arroyo Seco</IonCardTitle></IonCardHeader>
                            <IonCardContent>
                              Arroyo Seco es un municipio en Querétaro conocido por su rica historia y belleza natural. 
                              Se destaca por los sitios de arte rupestre prehispánico, como el de Arroyo Seco, y por sus paisajes naturales, que incluyen el río Ayutla y ruinas como los acueductos de "Los Arquitos". 
                              Su economía se apoya en actividades como el turismo, y la comunidad tiene tradiciones arraigadas como el Día de Muertos y la música huapango arribeño. 
                            </IonCardContent>
                        </IonCard>
                    </aside>
                </IonCol>

            </IonRow>
         </IonGrid>
        </AppShell>
    </IonPage>
   )
}

export default Home;