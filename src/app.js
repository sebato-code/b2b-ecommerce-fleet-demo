const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Rutas
const descuentosRoutes = require('./routes/descuentos');
app.use('/descuentos', descuentosRoutes);

// Documentación Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

module.exports = app;
