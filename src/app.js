const express = require('express');
const discountRoutes = require('./routes/discount');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.use('/discount', discountRoutes);

app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});

module.exports = app;
