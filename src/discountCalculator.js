/**
 * Calcula el descuento y el total final basado en el monto total de la compra.
 *
 * @param {number} montoTotal - El monto total de la compra.
 * @returns {{descuento: number, totalFinal: number}}
 */
function calcularDescuento(montoTotal) {
  let descuento = 0;

  if (montoTotal > 50000) {
    descuento = montoTotal * 0.10;
  } else if (montoTotal > 10000) {
    descuento = montoTotal * 0.05;
  }

  const totalFinal = montoTotal - descuento;
  return { descuento, totalFinal };
}

module.exports = { calcularDescuento };
