class OrderService {
  constructor() {
    this.orders = [
      { id: 'ORD-1001', customerId: 'CUST-500', total: 1500.0, status: 'COMPLETED' },
      { id: 'ORD-1002', customerId: 'CUST-501', total: 3200.5, status: 'PENDING' }
    ];
  }

  async getAllOrders() {
    return this.orders;
  }

  async getOrderById(id) {
    return this.orders.find(o => o.id === id);
  }

  async createOrder(data) {
    const newOrder = {
      id: `ORD-${1000 + this.orders.length + 1}`,
      customerId: data.customerId,
      total: data.total || 0,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };
    this.orders.push(newOrder);
    return newOrder;
  }
}

module.exports = new OrderService();
