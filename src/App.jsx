import { Route } from 'react-router-dom';

//Ionic Imports
import { IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonApp } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

import AppShell from './components/AppShell/AppShell';
import Home from './pages/Home/Home';

setupIonicReact();

function App() {
  

  return (
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route path="/" exact component={Home}/>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  )
}

export default App
