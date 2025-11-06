import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), VitePWA({ 
      registerType: 'autoUpdate',
      manifest: {
        name: 'Sistema de Reserva de Alojamientos Turísticos',
        short_name: 'SRAT',
        description: 'Aplicaci´oon que conecta propietarios con visitatntes para realizar reservaciones de alojamiento',
        theme_color: '#495de2ff', // Color de la barra de herramientas
        background_color: '#ec6b6bff', // Color de la pantalla de bienvenida (splash screen)
        icons: [
          {
            src: 'pwa-192x192.png', // Ruta relativa a la carpeta 'public'
            sizes: '192x192',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png'
          },
          {
            src: 'pwa-512x512.png',
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
            // Regla para las peticiones a tu API
            // Intercepta cualquier URL que contenga '/api/'
            urlPattern: ({ url }) => url.pathname.includes('/api/'),
            
            // Estrategia: Primero intenta ir a la red. Si falla (estás offline),
            // sirve la última versión guardada en caché.
            handler: 'NetworkFirst',
            
            options: {
              cacheName: 'api-cache', // Nombre del caché para las respuestas de la API
              expiration: {
                maxEntries: 50,       // Guarda un máximo de 50 peticiones
                maxAgeSeconds: 60 * 60 * 24 // Guarda los datos por 1 día
              }
            }
          },
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