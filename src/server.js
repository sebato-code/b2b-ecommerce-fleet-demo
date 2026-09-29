const express = require('express');
const { calcularDescuento } = require('./discountCalculator');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

/**
 * @swagger
 * /calcular-descuento:
 *   post:
 *     summary: Calcula el descuento y el total final de una compra.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               monto_total:
 *                 type: number
 *                 description: El monto total de la compra.
 *     responses:
 *       200:
 *         description: Los detalles del descuento y el total final.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 descuento:
 *                   type: number
 *                   description: El monto del descuento aplicado.
 *                 total_final:
 *                   type: number
 *                   description: El monto total después de aplicar el descuento.
 *       400:
 *         description: Monto total inválido.
 */
app.post('/calcular-descuento', (req, res) => {
  const { monto_total } = req.body;

  if (typeof monto_total !== 'number' || monto_total < 0) {
    return res.status(400).json({ error: 'Monto total inválido. Debe ser un número positivo.' });
  }

  const { descuento, totalFinal } = calcularDescuento(monto_total);

  res.json({
    descuento: parseFloat(descuento.toFixed(2)),
    total_final: parseFloat(totalFinal.toFixed(2))
  });
});

// Swagger setup (optional, for documentation generation)
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Descuentos B2B',
      version: '1.0.0',
      description: 'API para calcular descuentos basados en el monto total de la compra.'
    },
  },
  apis: ['./src/server.js'], // Archivo donde están las anotaciones Swagger
};

const swaggerSpec = swaggerJsdoc(options);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

module.exports = app; // Export for testing
