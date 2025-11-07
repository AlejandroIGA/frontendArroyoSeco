import { registerPlugin } from '@capacitor/core';
import { Browser } from '@capacitor/browser';
import { App } from '@capacitor/app';

export class MobileOAuth {
  constructor() {
    this.setupDeepLinkListener();
  }

  setupDeepLinkListener() {
    // Escuchar cuando la app se abre por un deep link
    App.addListener('appUrlOpen', (data) => {
      const url = data.url;
      
      // Si es nuestro callback de OAuth
      if (url.startsWith('alojando://callback')) {
        // Extraer el código de autorización
        const urlParams = new URL(url).searchParams;
        const code = urlParams.get('code');
        
        if (code) {
          // Disparar evento personalizado con el código
          window.dispatchEvent(new CustomEvent('oauth-callback', { 
            detail: { code } 
          }));
        }
        
        // Cerrar el navegador in-app si está abierto
        Browser.close();
      }
    });
  }

  async startOAuthFlow(authUrl) {
    try {
      // Abrir el navegador in-app con la URL de autorización
      await Browser.open({ 
        url: authUrl,
        presentationStyle: 'popover',
        toolbarColor: '#495de2ff'
      });

      // Esperar a que el usuario complete el flujo
      return new Promise((resolve, reject) => {
        const timeout = setTimeout(() => {
          reject(new Error('OAuth timeout'));
        }, 300000); // 5 minutos timeout

        const handler = (event) => {
          clearTimeout(timeout);
          window.removeEventListener('oauth-callback', handler);
          resolve(event.detail.code);
        };

        window.addEventListener('oauth-callback', handler);
      });
    } catch (error) {
      console.error('Error en OAuth flow:', error);
      throw error;
    }
  }
}

export const mobileOAuth = new MobileOAuth();