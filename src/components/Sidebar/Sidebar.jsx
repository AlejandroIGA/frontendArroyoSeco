import React from 'react';
import { useLocation } from 'react-router-dom';
import {
    IonList,
    IonItem,
    IonLabel,
    IonIcon
} from '@ionic/react';
import { menuController } from '@ionic/core/components';
import { personCircleOutline, homeOutline, calendarOutline, cardOutline } from 'ionicons/icons';
import './Sidebar.css';

const Sidebar = () => {
    const location = useLocation();

    const menuItems = [
        { title: 'Perfil', path: '/user-dashboard/profile', icon: personCircleOutline, id: 'perfil' },
        { title: 'Propiedades', path: '/property', icon: homeOutline, id: 'propiedades' },
        { title: 'Reservaciones', path: '/reservation', icon: calendarOutline, id: 'reservaciones' },
        { title: 'Pagos', path: '/payment', icon: cardOutline, id: 'pagos' }
    ];

    const handleMenuClick = async () => {
        await menuController.close();
    };

    return (
        <div className="sidebar-container">
            <IonList lines="none">
                {menuItems.map((item, index) => (
                    <IonItem
                        button
                        routerLink={item.path}
                        key={index}
                        color={location.pathname === item.path ? 'primary' : ''}
                        onClick={handleMenuClick}
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