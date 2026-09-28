/**
 * Calcula el descuento a aplicar sobre un monto total de compra.
 * 
 * Reglas de descuento:
 * - 10% de descuento para compras superiores a $50,000.
 * - 5% de descuento para compras superiores a $10,000 y hasta $50,000.
 * - 0% de descuento para compras de $10,000 o menos.
 *
 * @param {number} monto_total El monto total de la compra.
 * @returns {{descuento: number, totalFinal: number}} Un objeto con el monto del descuento y el total final después de aplicar el descuento.
 */
function calcularDescuento(monto_total) {
    let descuento = 0;

    if (monto_total > 50000) {
        descuento = monto_total * 0.10;
    } else if (monto_total > 10000) {
        descuento = monto_total * 0.05;
    }

    const totalFinal = monto_total - descuento;
    return { descuento, totalFinal };
}

module.exports = { calcularDescuento };
