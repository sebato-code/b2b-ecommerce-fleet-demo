from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List

router = APIRouter()

# Simulación de base de datos
payments_db = []
next_payment_id = 1

class Payment(BaseModel):
    payment_id: int
    customer_id: str
    amount: float
    status: str
    timestamp: str

class Transaction(BaseModel):
    transaction_id: int
    payment_id: int
    customer_id: str
    amount: float
    status: str
    timestamp: str

# Simulación de base de datos de transacciones
transactions_db = []
next_transaction_id = 1

@router.post("/payments/process", response_model=Payment)
def process_payment(payment_request: dict):
    global next_payment_id
    customer_id = payment_request.get("customer_id")
    amount = payment_request.get("amount")

    if not customer_id or amount is None:
        raise HTTPException(status_code=400, detail="customer_id and amount are required")

    # Lógica de procesamiento de pago (simulada)
    # En una implementación real, aquí iría la interacción con la pasarela de pago y el servicio de crédito
    status = "completed" # Simulación de estado exitoso

    new_payment = Payment(
        payment_id=next_payment_id,
        customer_id=customer_id,
        amount=amount,
        status=status,
        timestamp="2023-10-27T10:00:00Z" # Simulación de timestamp
    )
    payments_db.append(new_payment)

    # Simulación de registro de transacción
    global next_transaction_id
    new_transaction = Transaction(
        transaction_id=next_transaction_id,
        payment_id=new_payment.payment_id,
        customer_id=customer_id,
        amount=amount,
        status=status,
        timestamp="2023-10-27T10:00:00Z" # Simulación de timestamp
    )
    transactions_db.append(new_transaction)
    next_transaction_id += 1

    next_payment_id += 1
    return new_payment

@router.get("/payments/history/{customer_id}", response_model=List[Transaction])
def get_payment_history(customer_id: str):
    customer_transactions = [t for t in transactions_db if t.customer_id == customer_id]
    if not customer_transactions:
        raise HTTPException(status_code=404, detail=f"No transactions found for customer_id: {customer_id}")
    return customer_transactions
