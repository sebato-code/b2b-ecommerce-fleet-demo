const express = require('express');
const bodyParser = require('body-parser');
const descuentosRoutes = require('./routes/descuentos');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use('/descuentos', descuentosRoutes);

// Endpoint de prueba para verificar que el servidor está corriendo
app.get('/', (req, res) => {
  res.send('Servidor de descuentos B2B corriendo!');
});

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});

module.exports = app; // Exportar para pruebas
