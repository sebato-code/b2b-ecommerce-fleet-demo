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
 *               total_compra:
 *                 type: number
 *                 format: float
 *                 description: El monto total de la compra.
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
 *                   format: float
 *                   description: El monto del descuento aplicado.
 *                 total_con_descuento:
 *                   type: number
 *                   format: float
 *                   description: El total de la compra después de aplicar el descuento.
 *       400:
 *         description: Bad Request - El monto total de la compra es inválido.
 */
router.post('/calcular', (req, res) => {
  const { total_compra } = req.body;

  if (typeof total_compra !== 'number' || isNaN(total_compra)) {
    return res.status(400).json({ error: 'El monto total de la compra debe ser un número válido.' });
  }

  let monto_descuento = 0;
  let total_con_descuento = total_compra;

  if (total_compra > 50000) {
    monto_descuento = total_compra * 0.10;
  } else if (total_compra > 10000) {
    monto_descuento = total_compra * 0.05;
  }

  total_con_descuento = total_compra - monto_descuento;

  res.json({
    monto_descuento: parseFloat(monto_descuento.toFixed(2)),
    total_con_descuento: parseFloat(total_con_descuento.toFixed(2))
  });
});

module.exports = router;
