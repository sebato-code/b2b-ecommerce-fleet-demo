const express = require('express');
const { authMiddleware } = require('./middleware/auth');
const orderRouter = require('./controllers/OrderController');

const app = express();
app.use(express.json());

app.get('/health', (req, res) => res.json({ status: 'healthy', uptime: process.uptime() }));
app.use('/api/v1/orders', authMiddleware, orderRouter);

if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => console.log(`B2B E-commerce Service listening on port ${PORT}`));
}

module.exports = app;
