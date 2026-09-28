const { calcularDescuento } = require('../src/descuentos');

describe('calcularDescuento', () => {
    test('debería retornar 10% de descuento para compras mayores a $50,000', () => {
        const totalCompra = 60000;
        const resultado = calcularDescuento(totalCompra);
        expect(resultado.descuento).toBe(6000);
        expect(resultado.totalFinal).toBe(54000);
    });

    test('debería retornar 5% de descuento para compras entre $10,001 y $50,000', () => {
        const totalCompra = 20000;
        const resultado = calcularDescuento(totalCompra);
        expect(resultado.descuento).toBe(1000);
        expect(resultado.totalFinal).toBe(19000);
    });

    test('debería retornar 0% de descuento para compras menores o iguales a $10,000', () => {
        const totalCompra = 10000;
        const resultado = calcularDescuento(totalCompra);
        expect(resultado.descuento).toBe(0);
        expect(resultado.totalFinal).toBe(10000);
    });

    test('debería manejar montos exactos de los umbrales', () => {
        const resultadoUmbralSuperior = calcularDescuento(50000);
        expect(resultadoUmbralSuperior.descuento).toBe(2500);
        expect(resultadoUmbralSuperior.totalFinal).toBe(47500);

        const resultadoUmbralInferior = calcularDescuento(10000);
        expect(resultadoUmbralInferior.descuento).toBe(0);
        expect(resultadoUmbralInferior.totalFinal).toBe(10000);
    });
});
