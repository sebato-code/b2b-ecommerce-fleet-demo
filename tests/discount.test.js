const request = require('supertest');
const app = require('../src/app');

describe('API de Descuentos', () => {
  describe('POST /discount', () => {
    it('debería retornar 10% de descuento para monto > $50,000', async () => {
      const res = await request(app)
        .post('/discount')
        .send({ monto_total: 60000 });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('monto_descuento');
      expect(res.body.monto_descuento).toBe(6000);
      expect(res.body).toHaveProperty('monto_final');
      expect(res.body.monto_final).toBe(54000);
    });

    it('debería retornar 5% de descuento para monto > $10,000 y <= $50,000', async () => {
      const res = await request(app)
        .post('/discount')
        .send({ monto_total: 20000 });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('monto_descuento');
      expect(res.body.monto_descuento).toBe(1000);
      expect(res.body).toHaveProperty('monto_final');
      expect(res.body.monto_final).toBe(19000);
    });

    it('debería retornar 0% de descuento para monto <= $10,000', async () => {
      const res = await request(app)
        .post('/discount')
        .send({ monto_total: 5000 });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('monto_descuento');
      expect(res.body.monto_descuento).toBe(0);
      expect(res.body).toHaveProperty('monto_final');
      expect(res.body.monto_final).toBe(5000);
    });

    it('debería retornar 0% de descuento para monto exactamente $10,000', async () => {
      const res = await request(app)
        .post('/discount')
        .send({ monto_total: 10000 });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('monto_descuento');
      expect(res.body.monto_descuento).toBe(0);
      expect(res.body).toHaveProperty('monto_final');
      expect(res.body.monto_final).toBe(10000);
    });

    it('debería retornar 10% de descuento para monto exactamente $50,000', async () => {
      const res = await request(app)
        .post('/discount')
        .send({ monto_total: 50000 });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('monto_descuento');
      expect(res.body.monto_descuento).toBe(2500);
      expect(res.body).toHaveProperty('monto_final');
      expect(res.body.monto_final).toBe(47500);
    });

    it('debería retornar error si monto_total no es un número', async () => {
      const res = await request(app)
        .post('/discount')
        .send({ monto_total: 'abc' });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toBe('El monto_total debe ser un número válido.');
    });

    it('debería retornar error si monto_total es NaN', async () => {
      const res = await request(app)
        .post('/discount')
        .send({ monto_total: NaN });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toBe('El monto_total debe ser un número válido.');
    });

    it('debería retornar error si falta monto_total', async () => {
      const res = await request(app)
        .post('/discount')
        .send({});
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
      expect(res.body.error).toBe('El monto_total debe ser un número válido.');
    });
  });
});
