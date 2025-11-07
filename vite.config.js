import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({ 
      registerType: 'autoUpdate',
      manifest: {
        name: 'Alojando',
        short_name: 'Alojando',
        description: 'Aplicación que conecta propietarios con visitatntes para realizar reservaciones de alojamiento',
        theme_color: '#495de2ff', // Color de la barra de herramientas
        background_color: '#ec6b6bff', // Color de la pantalla de bienvenida (splash screen)
        icons: [
          {
            src: 'logo_x96.png',
            sizes: '96x96',
            type: 'image/png'
          },
          {
            src: 'logo_x128.png',
            sizes: '128x128',
            type: 'image/png'
          },
          {
            src: 'logo_x192.png',
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'logo_x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'logo_x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable' // Ícono adaptable para diferentes formas en Android
          }
        ]
      },
    workbox: {
        // Esta opción asegura que tu index.html (el App Shell) se sirva para todas las rutas
        // Es fundamental para Single-Page Applications (SPAs)
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/\/oauth2\//],
        // Reglas para el cacheo en tiempo de ejecución (runtime)
        runtimeCaching: [
          {
            // Regla para las imágenes
            // Intercepta peticiones que terminen en .png, .jpg, .jpeg, .svg, .gif
            urlPattern: /\.(?:png|jpg|jpeg|svg|gif)$/,

            // Estrategia: Primero busca en caché. Si no está, va a la red,
            // la descarga y la guarda en caché para la próxima vez.
            handler: 'CacheFirst',

            options: {
              cacheName: 'images-cache',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 30 * 24 * 60 * 60 // Guarda las imágenes por 30 días
              }
            }
          }
        ]
      }
    })
  ],
})