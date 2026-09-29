const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(bodyParser.json());

// Rutas
const descuentosRoutes = require('./routes/descuentos');
app.use('/api/descuentos', descuentosRoutes);

// Swagger setup
const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Descuentos B2B',
      version: '1.0.0',
      description: 'Documentación de la API para el cálculo de descuentos B2B.'
    },
    servers: [
      {
        url: 'http://localhost:3000/api'
      }
    ]
  },
  apis: ['./src/routes/*.js'] // Archivos que contienen las anotaciones de Swagger
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
  console.log(`Documentación de la API disponible en http://localhost:${port}/api-docs`);
});

module.exports = app;
