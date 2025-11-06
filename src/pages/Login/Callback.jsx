import React, { useEffect, useState, useRef } from 'react';
import { useHistory } from 'react-router-dom';
import { IonContent, IonPage, IonSpinner } from '@ionic/react';
import authService from '../../services/authService'; 

const Callback = () => {
    const history = useHistory();
    const [message, setMessage] = useState('Procesando autenticación...');
    const hasProcessed = useRef(false); 

    const handleExchange = async (code) => {
        try {
            setMessage('Canjeando código por tokens...');
            const tokens = await authService.exchangeCode(code);
            
            sessionStorage.setItem('token', tokens.access_token);
            sessionStorage.setItem('refresh_token', tokens.refresh_token);
            sessionStorage.setItem('isSessionActive', true);
            sessionStorage.setImte('userRole', tokens.user_role);

            const userRole = tokens.user_role;
            let targetPath = '/login'; 

            if (userRole === 'VISITANTE') {
                targetPath = '/user-dashboard/reservation';
            } else if (userRole === 'ANFITRION') {
                targetPath = '/user-dashboard/property';
            } else {
                console.warn(`Rol desconocido: ${userRole}. Redirigiendo a home.`);
                targetPath = '/'; 
            }

            setMessage('Autenticación exitosa, redirigiendo...');
            
            setTimeout(() => {
                history.replace(targetPath); 
            }, 1000);
            
        } catch (error) {
            console.error('Error durante el canje:', error.response?.data || error.message);
        
            setMessage('Error de autorización, por favor, intente de nuevo.');
            
            setTimeout(() => {
                history.replace('/login');
            }, 3000);
        }
    };
    
    useEffect(() => {
        if (hasProcessed.current) {
            console.log('Callback ya procesado, ignorando ejecución duplicada');
            return;
        }

        const urlParams = new URLSearchParams(window.location.search);
        const code = urlParams.get('code');
        const error = urlParams.get('error');

        console.log('Callback iniciado, código recibido:', code ? code.substring(0, 30) + '...' : 'NO');

        if (error) {
            setMessage('Fallo en la autorización, redirigiendo a login...');
            setTimeout(() => history.replace('/login'), 3000);
            return;
        }

        if (!code) {
            setMessage('No se recibió código de autorización, redirigiendo a login...');
            history.replace('/login');
            return;
        }
        hasProcessed.current = true;
        handleExchange(code);

    }, [history]); 

    return (
        <IonPage>
            <IonContent className="ion-padding">
                <div style={{ 
                    display: 'flex', 
                    justifyContent: 'center', 
                    alignItems: 'center', 
                    minHeight: '100vh',
                    flexDirection: 'column',
                    gap: '20px'
                }}>
                    <h2>{message}</h2>
                    {(message.includes('Procesando') || message.includes('Canjeando')) && (
                        <IonSpinner name="crescent" />
                    )}
                </div>
            </IonContent>
        </IonPage>
    );
};

export default Callback;
