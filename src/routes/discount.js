const express = require('express');
const router = express.Router();

/**
 * @typedef {object}
 * @property {number} monto_total - El monto total de la compra.
 */

/**
 * @typedef {object}
 * @property {number} monto_descuento - El monto del descuento aplicado.
 * @property {number} monto_final - El monto total después de aplicar el descuento.
 */

/**
 * Calcula el descuento aplicable a una compra.
 * @route POST /discount
 * @param {number} monto_total - El monto total de la compra.
 * @returns {object} Un objeto con el monto del descuento y el monto final.
 * @throws {Error} Si el monto_total no es un número válido.
 */
router.post('/', (req, res) => {
  const { monto_total } = req.body;

  if (typeof monto_total !== 'number' || isNaN(monto_total)) {
    return res.status(400).json({ error: 'El monto_total debe ser un número válido.' });
  }

  let monto_descuento = 0;
  let porcentaje_descuento = 0;

  if (monto_total > 50000) {
    porcentaje_descuento = 0.10; // 10%
  } else if (monto_total > 10000) {
    porcentaje_descuento = 0.05; // 5%
  }

  monto_descuento = monto_total * porcentaje_descuento;
  const monto_final = monto_total - monto_descuento;

  res.json({
    monto_descuento: parseFloat(monto_descuento.toFixed(2)),
    monto_final: parseFloat(monto_final.toFixed(2))
  });
});

module.exports = router;
