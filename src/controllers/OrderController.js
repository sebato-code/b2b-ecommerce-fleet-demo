const express = require('express');
const router = express.Router();
const orderService = require('../services/OrderService');

router.get('/', async (req, res) => {
  const orders = await orderService.getAllOrders();
  res.json(orders);
});

router.get('/:id', async (req, res) => {
  const order = await orderService.getOrderById(req.params.id);
  if (!order) return res.status(404).json({ error: 'Orden no encontrada' });
  res.json(order);
});

router.post('/', async (req, res) => {
  if (!req.body.customerId || !req.body.total) {
    return res.status(400).json({ error: 'customerId y total son obligatorios' });
  }
  const newOrder = await orderService.createOrder(req.body);
  res.status(201).json(newOrder);
});

module.exports = router;
