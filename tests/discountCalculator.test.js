const { calcularDescuento } = require('../src/discountCalculator');

describe('calcularDescuento', () => {
  test('debería retornar 0 descuento para montos <= 10000', () => {
    const resultado = calcularDescuento(10000);
    expect(resultado.descuento).toBe(0);
    expect(resultado.totalFinal).toBe(10000);
  });

  test('debería retornar 5% de descuento para montos > 10000 y <= 50000', () => {
    const resultado = calcularDescuento(20000);
    expect(resultado.descuento).toBe(1000);
    expect(resultado.totalFinal).toBe(19000);
  });

  test('debería retornar 10% de descuento para montos > 50000', () => {
    const resultado = calcularDescuento(60000);
    expect(resultado.descuento).toBe(6000);
    expect(resultado.totalFinal).toBe(54000);
  });

  test('debería manejar montos con decimales correctamente', () => {
    const resultado = calcularDescuento(15000.50);
    expect(resultado.descuento).toBe(750.025);
    expect(resultado.totalFinal).toBe(14250.475);
  });
});
