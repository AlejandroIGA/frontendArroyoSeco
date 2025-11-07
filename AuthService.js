import { Capacitor } from '@capacitor/core';
import apiClient, { CLIENT_ID, REDIRECT_URI, AUTHORIZE } from './axiosConfig';
import { mobileOAuth } from './src/utils/MobileOauth';

class AuthService {
  constructor() {
    this.isNative = Capacitor.isNativePlatform();
  }

  /**
   * Inicia el flujo de OAuth2
   */
  async startLoginFlow() {
    const authUrl = `${AUTHORIZE}?` +
      `response_type=code&` +
      `client_id=${CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
      `scope=read write`;

    if (this.isNative) {
      // Flujo para móvil
      return this.handleMobileLogin(authUrl);
    } else {
      // Flujo para web (redireccionamiento)
      window.location.href = authUrl;
    }
  }

  /**
   * Maneja el login en dispositivos móviles
   */
  async handleMobileLogin(authUrl) {
    try {
      // Abrir navegador in-app y esperar el código
      const code = await mobileOAuth.startOAuthFlow(authUrl);
      
      // Intercambiar código por token
      const tokenData = await this.exchangeCodeForToken(code);
      
      // Guardar datos de sesión
      this.saveSession(tokenData);
      
      return tokenData;
    } catch (error) {
      console.error('Error en login móvil:', error);
      throw error;
    }
  }

  /**
   * Maneja el callback en web (llamar desde el componente de callback)
   */
  async handleWebCallback(code) {
    try {
      const tokenData = await this.exchangeCodeForToken(code);
      this.saveSession(tokenData);
      return tokenData;
    } catch (error) {
      console.error('Error en callback web:', error);
      throw error;
    }
  }

  /**
   * Intercambia el código de autorización por un token
   */
  async exchangeCodeForToken(code) {
    const response = await apiClient.get('/auth/exchange-code', {
      params: { code }
    });
    return response.data;
  }

  /**
   * Guarda la sesión
   */
  saveSession(tokenData) {
    sessionStorage.setItem('token', tokenData.access_token);
    sessionStorage.setItem('refresh_token', tokenData.refresh_token);
    sessionStorage.setItem('user_role', tokenData.user_role);
    sessionStorage.setItem('isSessionActive', 'true');

    // En móvil, también guardar en localStorage para persistencia
    if (this.isNative) {
      localStorage.setItem('token', tokenData.access_token);
      localStorage.setItem('refresh_token', tokenData.refresh_token);
      localStorage.setItem('user_role', tokenData.user_role);
    }
  }

  /**
   * Cierra sesión
   */
  logout() {
    sessionStorage.clear();
    if (this.isNative) {
      localStorage.clear();
    }
  }

  /**
   * Verifica si hay sesión activa
   */
  isAuthenticated() {
    return sessionStorage.getItem('isSessionActive') === 'true';
  }

  /**
   * Obtiene el rol del usuario
   */
  getUserRole() {
    return sessionStorage.getItem('user_role');
  }
}

export const authService = new AuthService();