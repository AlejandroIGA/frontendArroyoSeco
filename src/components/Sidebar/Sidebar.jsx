import React from 'react';
import {
    IonList,
    IonItem,
    IonLabel,
    IonIcon
} from '@ionic/react';
import { personCircleOutline, homeOutline, calendarOutline, cardOutline } from 'ionicons/icons';
import './Sidebar.css';

const Sidebar = ({ activePage }) => {
    const menuItems = [
        { title: 'Perfil', path: '/profile', icon: personCircleOutline, id: 'perfil' },
        { title: 'Propiedades', path: '/property', icon: homeOutline, id: 'propiedades' },
        { title: 'Reservaciones', path: '/reservation', icon: calendarOutline, id: 'reservaciones' },
        { title: 'Pagos', path: '/payment', icon: cardOutline, id: 'pagos' }
    ];
    return (
        <div className="sidebar-container">
            <IonList lines="none">
                {menuItems.map((item) => (
                    <IonItem
                        button
                        routerLink={item.path}
                        key={item.id}
                        color={activePage === item.id ? 'primary' : ''}
                    >
                        <IonIcon icon={item.icon} slot="start" />
                        <IonLabel>{item.title}</IonLabel>
                    </IonItem>
                ))}
            </IonList>
        </div>
    );
};

export default Sidebar;