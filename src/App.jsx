import { Route } from 'react-router-dom';
import React, {Suspense} from 'react';

//Ionic Imports
import { IonRouterOutlet, IonSpinner, setupIonicReact } from '@ionic/react';
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

import './theme/variables.css';
import UserProfile from './pages/UserProfile/UserProfile';
import ResetPassword from './pages/ResetPassword/ResetPassword';

// Carga lenta de componentes (se carga cuando se utilicen lo que mejora rendimiento)
const Home = React.lazy(() => import('./pages/Home/Home'));
const Login = React.lazy(() => import('./pages/Login/Login'));
const Register = React.lazy(() => import('./pages/Register/Register'));
const Reservation = React.lazy(() => import('./pages/Reservation/Reservation'));
const Property = React.lazy(() => import('./pages/Property/Property'));
setupIonicReact();

function App() {
  

  return (
    <IonApp>
      <IonReactRouter>
        <Suspense fallback={<IonSpinner name="crescent"/> }>
          <IonRouterOutlet>
          <Route path="/" exact component={Home}/>
          <Route path="/login" exact component={Login}/>
          <Route path="/register" exact component={Register}/>
          <Route path="/reservation" exact component={Reservation}/>
          <Route path="/property" exact component={Property}/>
          <Route path="/reset-password" exact component={ResetPassword}/>
        </IonRouterOutlet>
        </Suspense>
      </IonReactRouter>
    </IonApp>
  )
}

export default App
