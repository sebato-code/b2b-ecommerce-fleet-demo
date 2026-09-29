const request = require('supertest');
const app = require('../src/server');

describe('API de Descuentos', () => {
  test('POST /calcular-descuento debe retornar 10% de descuento para monto > 50000', async () => {
    const response = await request(app)
      .post('/calcular-descuento')
      .send({ monto_total: 60000 });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      descuento: 6000.00,
      total_final: 54000.00
    });
  });

  test('POST /calcular-descuento debe retornar 5% de descuento para monto > 10000 y <= 50000', async () => {
    const response = await request(app)
      .post('/calcular-descuento')
      .send({ monto_total: 20000 });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      descuento: 1000.00,
      total_final: 19000.00
    });
  });

  test('POST /calcular-descuento debe retornar 0 descuento para monto <= 10000', async () => {
    const response = await request(app)
      .post('/calcular-descuento')
      .send({ monto_total: 10000 });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
      descuento: 0.00,
      total_final: 10000.00
    });
  });

  test('POST /calcular-descuento debe retornar error 400 si monto_total no es un número', async () => {
    const response = await request(app)
      .post('/calcular-descuento')
      .send({ monto_total: 'abc' });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });

  test('POST /calcular-descuento debe retornar error 400 si monto_total es negativo', async () => {
    const response = await request(app)
      .post('/calcular-descuento')
      .send({ monto_total: -5000 });
    expect(response.statusCode).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
