import NotificationService from '../../src/services/NotificationService';
import axios from 'axios';

// Mock de axios para evitar llamadas reales durante las pruebas unitarias
jest.mock('axios');

describe('NotificationService', () => {
  let notificationService;
  const mockApiGatewayUrl = 'http://mock-gateway.com';

  beforeEach(() => {
    notificationService = new NotificationService(mockApiGatewayUrl);
    // Limpiar mocks antes de cada prueba
    axios.post.mockClear();
  });

  describe('sendNotification', () => {
    const mockNotificationData = {
      userId: 'user-123',
      message: 'Your payment was successful.',
      type: 'email'
    };
    const mockResponse = { status: 'sent', notificationId: 'notif-abc' };

    test('should send a notification successfully', async () => {
      // Configurar el mock de axios para devolver una respuesta exitosa
      axios.post.mockResolvedValue({ data: mockResponse });

      const result = await notificationService.sendNotification(mockNotificationData);

      // Verificar que axios.post fue llamado con los argumentos correctos
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(`${mockApiGatewayUrl}/notifications/send`, mockNotificationData);

      // Verificar que el resultado de la función es la data de la respuesta
      expect(result).toEqual(mockResponse);
    });

    test('should throw an error if notification sending fails', async () => {
      const errorMessage = 'Network Error';
      // Configurar el mock de axios para simular un error
      axios.post.mockRejectedValue(new Error(errorMessage));

      // Verificar que la llamada a sendNotification lanza una excepción
      await expect(notificationService.sendNotification(mockNotificationData)).rejects.toThrow(errorMessage);

      // Verificar que axios.post fue llamado
      expect(axios.post).toHaveBeenCalledTimes(1);
    });
  });
});
