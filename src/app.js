const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const descuentosRoutes = require('./routes/descuentos');

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());

// Swagger setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Descuentos B2B',
      version: '1.0.0',
      description: 'Documentación de la API para calcular descuentos B2B.'
    },
    servers: [
      {
        url: 'http://localhost:' + port,
        description: 'Servidor de desarrollo local'
      }
    ]
  },
  apis: ['./src/routes/*.js'] // Archivos que contienen las definiciones de Swagger
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/descuentos', descuentosRoutes);

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  console.log(`Documentación de la API disponible en http://localhost:${port}/api-docs`);
});

module.exports = app;
