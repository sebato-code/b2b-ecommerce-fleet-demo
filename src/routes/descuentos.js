const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /descuentos/calcular:
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
 *                 example: 15000
 *     responses:
 *       200:
 *         description: Retorna el monto del descuento y el total después del descuento.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 monto_descuento:
 *                   type: number
 *                   description: El monto del descuento aplicado.
 *                   example: 750
 *                 total_con_descuento:
 *                   type: number
 *                   description: El monto total de la compra después de aplicar el descuento.
 *                   example: 14250
 *       400:
 *         description: Error en la validación de la entrada.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error detallando el problema.
 *                   example: "El monto total de la compra debe ser un número positivo."
 */
router.post('/calcular', (req, res) => {
  const { monto_total } = req.body;

  // Validación de entrada: monto_total debe ser un número positivo
  if (typeof monto_total !== 'number' || monto_total <= 0) {
    return res.status(400).json({
      error: 'El monto total de la compra debe ser un número positivo.'
    });
  }

  let monto_descuento = 0;

  if (monto_total > 50000) {
    monto_descuento = monto_total * 0.10;
  } else if (monto_total > 10000) {
    monto_descuento = monto_total * 0.05;
  }

  const total_con_descuento = monto_total - monto_descuento;

  res.json({
    monto_descuento,
    total_con_descuento
  });
});

module.exports = router;
