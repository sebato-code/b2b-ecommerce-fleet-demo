const { calcularDescuento } = require('../src/discountCalculator');

describe('calcularDescuento', () => {
  test('debería retornar 0% de descuento para montos <= $10,000', () => {
    const montoTotal = 9999.99;
    const resultado = calcularDescuento(montoTotal);
    expect(resultado.descuento).toBeCloseTo(0);
    expect(resultado.totalFinal).toBeCloseTo(montoTotal);
  });

  test('debería retornar 5% de descuento para montos > $10,000 y <= $50,000', () => {
    const montoTotal = 20000;
    const resultado = calcularDescuento(montoTotal);
    expect(resultado.descuento).toBeCloseTo(montoTotal * 0.05);
    expect(resultado.totalFinal).toBeCloseTo(montoTotal * 0.95);
  });

  test('debería retornar 10% de descuento para montos > $50,000', () => {
    const montoTotal = 60000;
    const resultado = calcularDescuento(montoTotal);
    expect(resultado.descuento).toBeCloseTo(montoTotal * 0.10);
    expect(resultado.totalFinal).toBeCloseTo(montoTotal * 0.90);
  });

  test('debería manejar montos exactos de los umbrales', () => {
    const montoUmbralInferior = 10000;
    const resultadoInferior = calcularDescuento(montoUmbralInferior);
    expect(resultadoInferior.descuento).toBeCloseTo(0);
    expect(resultadoInferior.totalFinal).toBeCloseTo(montoUmbralInferior);

    const montoUmbralSuperior = 50000;
    const resultadoSuperior = calcularDescuento(montoUmbralSuperior);
    expect(resultadoSuperior.descuento).toBeCloseTo(montoUmbralSuperior * 0.05);
    expect(resultadoSuperior.totalFinal).toBeCloseTo(montoUmbralSuperior * 0.95);
  });

  test('debería manejar montos con decimales', () => {
    const montoTotal = 15550.75;
    const resultado = calcularDescuento(montoTotal);
    expect(resultado.descuento).toBeCloseTo(montoTotal * 0.05);
    expect(resultado.totalFinal).toBeCloseTo(montoTotal * 0.95);
  });

  test('debería manejar monto cero', () => {
    const montoTotal = 0;
    const resultado = calcularDescuento(montoTotal);
    expect(resultado.descuento).toBeCloseTo(0);
    expect(resultado.totalFinal).toBeCloseTo(0);
  });
});
