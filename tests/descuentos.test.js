const request = require('supertest');
const app = require('../src/app');

describe('API de Descuentos B2B', () => {
  describe('POST /api/descuentos', () => {
    it('Debería retornar 10% de descuento para monto_total > 50000', async () => {
      const res = await request(app)
        .post('/api/descuentos')
        .send({ monto_total: 60000 });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('monto_descuento', 6000);
      expect(res.body).toHaveProperty('total_con_descuento', 54000);
    });

    it('Debería retornar 5% de descuento para monto_total entre 10001 y 50000', async () => {
      const res = await request(app)
        .post('/api/descuentos')
        .send({ monto_total: 12000 });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('monto_descuento', 600);
      expect(res.body).toHaveProperty('total_con_descuento', 11400);
    });

    it('Debería retornar 0% de descuento para monto_total <= 10000', async () => {
      const res = await request(app)
        .post('/api/descuentos')
        .send({ monto_total: 10000 });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('monto_descuento', 0);
      expect(res.body).toHaveProperty('total_con_descuento', 10000);
    });

    it('Debería retornar 0% de descuento para monto_total < 10000', async () => {
      const res = await request(app)
        .post('/api/descuentos')
        .send({ monto_total: 5000 });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('monto_descuento', 0);
      expect(res.body).toHaveProperty('total_con_descuento', 5000);
    });

    it('Debería retornar error 400 si monto_total no es proporcionado', async () => {
      const res = await request(app)
        .post('/api/descuentos')
        .send({});
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'monto_total es requerido y debe ser un número.');
    });

    it('Debería retornar error 400 si monto_total no es un número', async () => {
      const res = await request(app)
        .post('/api/descuentos')
        .send({ monto_total: 'abc' });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'monto_total es requerido y debe ser un número.');
    });
  });
});
