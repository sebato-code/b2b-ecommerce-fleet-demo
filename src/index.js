const express = require('express');
const bodyParser = require('body-parser');
const { calcularDescuento } = require('./descuentos');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/api/descuentos', (req, res) => {
    const { monto_total } = req.body;

    // Validación de entrada
    if (typeof monto_total !== 'number' || monto_total < 0) {
        return res.status(400).json({ error: 'El monto total de la compra debe ser un número positivo.' });
    }

    const { descuento, totalFinal } = calcularDescuento(monto_total);
    
    res.json({
        descuento,
        total_final: totalFinal
    });
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
