const { calcularDescuento } = require('../src/descuentos');

describe('calcularDescuento', () => {
    test('Sin descuento para compras <= $10,000', () => {
        const resultado = calcularDescuento(10000);
        expect(resultado.descuento).toBe(0);
        expect(resultado.totalFinal).toBe(10000);
    });

    test('5% de descuento para compras > $10,000 y <= $50,000', () => {
        const resultado = calcularDescuento(12000);
        expect(resultado.descuento).toBe(600);
        expect(resultado.totalFinal).toBe(11400);
    });

    test('10% de descuento para compras > $50,000', () => {
        const resultado = calcularDescuento(60000);
        expect(resultado.descuento).toBe(6000);
        expect(resultado.totalFinal).toBe(54000);
    });

    test('Manejo de monto cero', () => {
        const resultado = calcularDescuento(0);
        expect(resultado.descuento).toBe(0);
        expect(resultado.totalFinal).toBe(0);
    });

    test('Límite inferior del 5% de descuento', () => {
        const resultado = calcularDescuento(10000.01);
        expect(resultado.descuento).toBeCloseTo(500.0005);
        expect(resultado.totalFinal).toBeCloseTo(9500.0095);
    });

    test('Límite superior del 5% de descuento', () => {
        const resultado = calcularDescuento(50000);
        expect(resultado.descuento).toBe(2500);
        expect(resultado.totalFinal).toBe(47500);
    });

    test('Límite inferior del 10% de descuento', () => {
        const resultado = calcularDescuento(50000.01);
        expect(resultado.descuento).toBeCloseTo(5000.001);
        expect(resultado.totalFinal).toBeCloseTo(45000.009);
    });
});
