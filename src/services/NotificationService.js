import axios from 'axios';

class NotificationService {
  constructor(apiGatewayUrl) {
    this.apiGatewayUrl = apiGatewayUrl;
  }

  /**
   * Envía una notificación al comprador.
   * @param {object} notificationData - Los datos de la notificación.
   * @param {string} notificationData.userId - El ID del usuario a notificar.
   * @param {string} notificationData.message - El mensaje de la notificación.
   * @param {string} notificationData.type - El tipo de notificación (ej. 'email', 'sms').
   * @returns {Promise<object>} - La respuesta del servicio de notificaciones.
   */
  async sendNotification(notificationData) {
    try {
      const response = await axios.post(`${this.apiGatewayUrl}/notifications/send`, notificationData);
      console.log('Notification sent successfully:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error sending notification:', error.response ? error.response.data : error.message);
      throw error;
    }
  }
}

export default NotificationService;
