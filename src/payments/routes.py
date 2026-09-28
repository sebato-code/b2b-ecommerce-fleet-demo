from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from src.payments.services import PaymentService
from src.credit.services import CreditService

router = APIRouter()

class PaymentDetails(BaseModel):
    customer_id: str
    amount: float
    payment_method: str # 'credit_card' or 'bank_transfer'
    card_number: str | None = None
    expiry_month: int | None = None
    expiry_year: int | None = None
    cvv: str | None = None
    account_number: str | None = None
    routing_number: str | None = None

@router.post('/payments/process')
async def process_payment(payment_details: PaymentDetails):
    payment_service = PaymentService()
    credit_service = CreditService()

    # 1. Validate customer and credit limit
    customer_credit = await credit_service.get_customer_credit(payment_details.customer_id)
    if not customer_credit or customer_credit['available_limit'] < payment_details.amount:
        raise HTTPException(status_code=400, detail='Insufficient credit limit')

    # 2. Process payment (simulated)
    try:
        transaction_result = await payment_service.process_transaction(
            customer_id=payment_details.customer_id,
            amount=payment_details.amount,
            payment_method=payment_details.payment_method,
            card_details={
                'card_number': payment_details.card_number,
                'expiry_month': payment_details.expiry_month,
                'expiry_year': payment_details.expiry_year,
                'cvv': payment_details.cvv
            } if payment_details.payment_method == 'credit_card' else None,
            bank_details={
                'account_number': payment_details.account_number,
                'routing_number': payment_details.routing_number
            } if payment_details.payment_method == 'bank_transfer' else None
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f'Payment processing failed: {str(e)}')

    # 3. Update credit limit
    await credit_service.update_credit_usage(
        customer_id=payment_details.customer_id,
        amount=payment_details.amount
    )

    return {"message": "Payment processed successfully", "transaction_id": transaction_result['transaction_id']}
