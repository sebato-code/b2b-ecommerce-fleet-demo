const request = require('supertest');
const app = require('../src/app');

describe('API de Descuentos B2B', () => {
  describe('POST /descuentos/calcular', () => {
    it('Debería retornar 10% de descuento para compras mayores a $50,000', async () => {
      const res = await request(app)
        .post('/descuentos/calcular')
        .send({ total_compra: 60000 });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('monto_descuento', 6000.00);
      expect(res.body).toHaveProperty('total_con_descuento', 54000.00);
    });

    it('Debería retornar 5% de descuento para compras entre $10,001 y $50,000', async () => {
      const res = await request(app)
        .post('/descuentos/calcular')
        .send({ total_compra: 20000 });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('monto_descuento', 1000.00);
      expect(res.body).toHaveProperty('total_con_descuento', 19000.00);
    });

    it('Debería retornar 0% de descuento para compras menores o iguales a $10,000', async () => {
      const res = await request(app)
        .post('/descuentos/calcular')
        .send({ total_compra: 5000 });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('monto_descuento', 0.00);
      expect(res.body).toHaveProperty('total_con_descuento', 5000.00);
    });

    it('Debería retornar 0% de descuento para compras exactamente en el límite de $10,000', async () => {
      const res = await request(app)
        .post('/descuentos/calcular')
        .send({ total_compra: 10000 });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('monto_descuento', 0.00);
      expect(res.body).toHaveProperty('total_con_descuento', 10000.00);
    });

    it('Debería retornar 10% de descuento para compras exactamente en el límite de $50,000', async () => {
      const res = await request(app)
        .post('/descuentos/calcular')
        .send({ total_compra: 50000 });
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('monto_descuento', 2500.00);
      expect(res.body).toHaveProperty('total_con_descuento', 47500.00);
    });

    it('Debería retornar un error 400 si total_compra no es un número', async () => {
      const res = await request(app)
        .post('/descuentos/calcular')
        .send({ total_compra: 'abc' });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'El monto total de la compra debe ser un número válido.');
    });

    it('Debería retornar un error 400 si total_compra es nulo', async () => {
      const res = await request(app)
        .post('/descuentos/calcular')
        .send({ total_compra: null });
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'El monto total de la compra debe ser un número válido.');
    });

    it('Debería retornar un error 400 si el body está vacío', async () => {
      const res = await request(app)
        .post('/descuentos/calcular')
        .send({});
      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error', 'El monto total de la compra debe ser un número válido.');
    });
  });
});
