import logging

logger = logging.getLogger(__name__)

# Simulate a database for credit information
# In a real application, this would be a persistent database like PostgreSQL
_credit_db = {
    'cust_123': {'available_limit': 1000.0, 'used_limit': 0.0},
    'cust_456': {'available_limit': 500.0, 'used_limit': 150.0}
}

class CreditService:
    async def get_customer_credit(self, customer_id: str):
        logger.debug(f"Fetching credit info for customer {customer_id}")
        return _credit_db.get(customer_id)

    async def update_credit_usage(self, customer_id: str, amount: float):
        logger.info(f"Updating credit usage for customer {customer_id} by {amount}")
        customer_credit = _credit_db.get(customer_id)
        if customer_credit:
            customer_credit['used_limit'] += amount
            customer_credit['available_limit'] = max(0, customer_credit['available_limit'] - amount)
            logger.info(f"Updated credit for {customer_id}: Available={customer_credit['available_limit']}, Used={customer_credit['used_limit']}")
        else:
            logger.warn(f"Customer {customer_id} not found for credit update.")
