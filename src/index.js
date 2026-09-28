import express from 'express';
import NotificationService from './services/NotificationService.js';

const app = express();
const port = process.env.PORT || 3000;

// Configuración del servicio de notificaciones
// Se asume que la URL del API Gateway está disponible como variable de entorno
const apiGatewayUrl = process.env.API_GATEWAY_URL || 'http://localhost:8080'; // URL de ejemplo
const notificationService = new NotificationService(apiGatewayUrl);

app.use(express.json());

// Endpoint para simular el envío de notificaciones
app.post('/notifications/send', async (req, res) => {
  const notificationData = req.body;
  try {
    // Aquí se llamaría al método real del servicio de notificaciones
    // Por ahora, simulamos el éxito y registramos los datos recibidos
    console.log('Received notification request:', notificationData);
    // Simulación de llamada al servicio real:
    // const result = await notificationService.sendNotification(notificationData);
    // res.status(200).json({ message: 'Notification processed', data: result });

    // Simulación de respuesta exitosa sin llamar al servicio externo aún
    res.status(200).json({ message: 'Notification request received and simulated successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to process notification', error: error.message });
  }
});

app.listen(port, () => {
  console.log(`Notification Service listening on port ${port}`);
});
