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
 *                 example: 12000
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
 *                   description: El monto del descuento aplicado.
 *                   example: 600
 *                 total_con_descuento:
 *                   type: number
 *                   description: El monto total después de aplicar el descuento.
 *                   example: 11400
 *       400:
 *         description: Solicitud inválida.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: Mensaje de error.
 *                   example: "monto_total es requerido y debe ser un número."
 */
router.post('/', (req, res) => {
  const { monto_total } = req.body;

  if (typeof monto_total !== 'number' || monto_total === undefined) {
    return res.status(400).json({
      error: "monto_total es requerido y debe ser un número."
    });
  }

  let monto_descuento = 0;

  if (monto_total > 50000) {
    monto_descuento = monto_total * 0.10;
  } else if (monto_total > 10000) {
    monto_descuento = monto_total * 0.05;
  }

  const total_con_descuento = monto_total - monto_descuento;

  res.status(200).json({
    monto_descuento,
    total_con_descuento
  });
});

module.exports = router;
