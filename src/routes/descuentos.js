const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /api/descuentos:
 *   post:
 *     summary: Calcula el descuento aplicable a una compra.
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
 *                 example: 15000.50
 *     responses:
 *       200:
 *         description: Información del descuento aplicado.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 monto_descuento:
 *                   type: number
 *                   description: El monto del descuento calculado.
 *                   example: 750.025
 *                 total_con_descuento:
 *                   type: number
 *                   description: El monto total después de aplicar el descuento.
 *                   example: 14250.475
 *       400:
 *         description: Monto total inválido.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "El monto total debe ser un número positivo."
 */
router.post('/', (req, res) => {
  const { monto_total } = req.body;

  if (typeof monto_total !== 'number' || monto_total < 0) {
    return res.status(400).json({
      error: 'El monto total debe ser un número positivo.'
    });
  }

  let monto_descuento = 0;
  let total_con_descuento = monto_total;

  if (monto_total > 50000) {
    monto_descuento = monto_total * 0.10;
  } else if (monto_total > 10000) {
    monto_descuento = monto_total * 0.05;
  }

  total_con_descuento = monto_total - monto_descuento;

  res.json({
    monto_descuento,
    total_con_descuento
  });
});

module.exports = router;
