const creditData = {
  'customer-123': { limit: 1000, available: 1000 },
  'customer-456': { limit: 500, available: 500 },
};

class CreditService {
  /**
   * Obtiene el límite de crédito disponible para un cliente.
   * @param {string} customerId - El ID del cliente.
   * @returns {Promise<{limit: number, available: number}>}
   */
  async getCreditLimit(customerId) {
    console.log(`[CreditService] Obteniendo límite para cliente: ${customerId}`);
    if (!creditData[customerId]) {
      throw new Error('Cliente no encontrado');
    }
    return Promise.resolve(creditData[customerId]);
  }

  /**
   * Reserva una cantidad de crédito para un cliente.
   * @param {string} customerId - El ID del cliente.
   * @param {number} amount - La cantidad a reservar.
   * @returns {Promise<boolean>} - True si la reserva fue exitosa, false en caso contrario.
   */
  async reserveCredit(customerId, amount) {
    console.log(`[CreditService] Reservando ${amount} para cliente: ${customerId}`);
    if (!creditData[customerId]) {
      throw new Error('Cliente no encontrado');
    }

    const currentCredit = creditData[customerId];
    if (currentCredit.available >= amount) {
      currentCredit.available -= amount;
      // Simula persistencia
      console.log(`[CreditService] Reserva exitosa. Disponible: ${currentCredit.available}`);
      return true;
    } else {
      console.log(`[CreditService] Reserva fallida. Fondos insuficientes. Disponible: ${currentCredit.available}`);
      return false;
    }
  }

  /**
   * Ajusta el crédito de un cliente (ej. para liberar una reserva o aplicar un pago).
   * @param {string} customerId - El ID del cliente.
   * @param {number} amount - La cantidad a ajustar (positiva para añadir, negativa para restar).
   * @returns {Promise<void>}
   */
  async adjustCredit(customerId, amount) {
    console.log(`[CreditService] Ajustando crédito por ${amount} para cliente: ${customerId}`);
    if (!creditData[customerId]) {
      throw new Error('Cliente no encontrado');
    }

    const currentCredit = creditData[customerId];
    currentCredit.available += amount;
    // Asegurarse de que el crédito disponible no exceda el límite total si el ajuste es positivo
    if (amount > 0 && currentCredit.available > currentCredit.limit) {
        currentCredit.available = currentCredit.limit;
    }
    // Simula persistencia
    console.log(`[CreditService] Ajuste aplicado. Disponible: ${currentCredit.available}`);
    return Promise.resolve();
  }
}

module.exports = CreditService;
