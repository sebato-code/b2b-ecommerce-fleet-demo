function calcularDescuento(totalCompra) {
    let descuento = 0;

    if (totalCompra > 50000) {
        descuento = totalCompra * 0.10; // 10% de descuento
    } else if (totalCompra > 10000) {
        descuento = totalCompra * 0.05; // 5% de descuento
    }

    const totalFinal = totalCompra - descuento;
    return { descuento, totalFinal };
}

module.exports = { calcularDescuento };
