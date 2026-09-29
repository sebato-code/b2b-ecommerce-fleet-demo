const express = require('express');
const { calcularDescuento } = require('./discountCalculator');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/calcular-descuento', (req, res) => {
  const { monto_total } = req.body;

  if (typeof monto_total !== 'number' || monto_total < 0) {
    return res.status(400).json({ error: 'monto_total debe ser un número positivo.' });
  }

  const { descuento, totalFinal } = calcularDescuento(monto_total);

  res.json({
    descuento: parseFloat(descuento.toFixed(2)),
    total_final: parseFloat(totalFinal.toFixed(2))
  });
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

module.exports = app; // Export for testing
