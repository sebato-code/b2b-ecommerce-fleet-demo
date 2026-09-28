const request = require('supertest');
const app = require('../src/app');

describe('API de Descuentos', () => {
  describe('POST /api/descuentos', () => {
    it('debería aplicar un 10% de descuento para montos mayores a $50,000', async () => {
      const res = await request(app)
        .post('/api/descuentos')
        .send({ monto_total: 60000 });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('monto_descuento', 6000);
      expect(res.body).toHaveProperty('total_con_descuento', 54000);
    });

    it('debería aplicar un 5% de descuento para montos entre $10,001 y $50,000', async () => {
      const res = await request(app)
        .post('/api/descuentos')
        .send({ monto_total: 20000 });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('monto_descuento', 1000);
      expect(res.body).toHaveProperty('total_con_descuento', 19000);
    });

    it('debería aplicar 0% de descuento para montos menores o iguales a $10,000', async () => {
      const res = await request(app)
        .post('/api/descuentos')
        .send({ monto_total: 5000 });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('monto_descuento', 0);
      expect(res.body).toHaveProperty('total_con_descuento', 5000);
    });

    it('debería manejar el límite exacto de $10,000 con 0% de descuento', async () => {
      const res = await request(app)
        .post('/api/descuentos')
        .send({ monto_total: 10000 });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('monto_descuento', 0);
      expect(res.body).toHaveProperty('total_con_descuento', 10000);
    });

    it('debería manejar el límite exacto de $50,000 con 5% de descuento', async () => {
      const res = await request(app)
        .post('/api/descuentos')
        .send({ monto_total: 50000 });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('monto_descuento', 2500);
      expect(res.body).toHaveProperty('total_con_descuento', 47500);
    });

    it('debería retornar un error si el monto_total no es un número', async () => {
      const res = await request(app)
        .post('/api/descuentos')
        .send({ monto_total: 'abc' });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'El monto total debe ser un número positivo.');
    });

    it('debería retornar un error si el monto_total es negativo', async () => {
      const res = await request(app)
        .post('/api/descuentos')
        .send({ monto_total: -1000 });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'El monto total debe ser un número positivo.');
    });

    it('debería retornar un error si el body está vacío', async () => {
      const res = await request(app)
        .post('/api/descuentos')
        .send({});
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'El monto total debe ser un número positivo.');
    });
  });
});
