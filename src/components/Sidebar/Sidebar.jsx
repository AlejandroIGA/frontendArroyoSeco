import React from 'react';
import { useLocation } from 'react-router-dom';
import {
    IonList,
    IonItem,
    IonLabel,
    IonIcon
} from '@ionic/react';
import { menuController } from '@ionic/core/components';
import { personCircleOutline, homeOutline, calendarOutline, cardOutline, logOutOutline } from 'ionicons/icons';
import './Sidebar.css';

const Sidebar = () => {
    const location = useLocation();
    const userRole = sessionStorage.getItem('userRole');

    const menuItems = [
        { title: 'Perfil', path: '/user-dashboard/profile', icon: personCircleOutline, id: 'perfil' },
        { title: 'Propiedades', path: '/user-dashboard/property', icon: homeOutline, id: 'propiedades' },
        { title: 'Reservaciones', path: '/user-dashboard/reservation', icon: calendarOutline, id: 'reservaciones' },
        //{ title: 'Pagos', path: '/user-dashboard/payment', icon: cardOutline, id: 'pagos' }
    ];

    const handleMenuClick = async () => {
        await menuController.close();
    };

    const handleLogOut = async () => {
        try {
            await apiClient.post('/auth/logout');
        } catch (error) {
            console.error("Error al cerrar sesión en el servidor:", error);
        } finally {
            sessionStorage.removeItem("isSessionActive");
            localStorage.removeItem("hasAcceptedTerms");
            sessionStorage.removeItem("token")
            sessionStorage.removeItem("refresh_token")
            sessionStorage.removeItem("userRole")
            window.location.href = '/'; // Redirige a la raíz de tu app, no al backend
        }
    }

    return (
        <div className="sidebar-container">
            <IonList lines="none">
                {menuItems.map((item, index) => {
                    if (item.id === 'reservaciones' && userRole === 'propietario') {
                        return null;
                    }
                    if (item.id === 'propiedades' && userRole === 'visitante') {
                        return null;
                    }
                    return (
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
                    );
                })}
                <IonItem
                    button
                    onClick={handleLogOut}
                >
                    <IonIcon icon={logOutOutline} slot="start" />
                    <IonLabel>Cerrar Sesión</IonLabel>
                </IonItem>
            </IonList>
        </div>
    );
};

export default Sidebar;