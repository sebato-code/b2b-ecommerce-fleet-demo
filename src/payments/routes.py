from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List

from src.database import get_db
from src.payments import schemas, crud

router = APIRouter(
    prefix="/payments",
    tags=["Payments"]
)

@router.get("/history/{customer_id}", response_model=List[schemas.Transaction])
def get_payment_history(customer_id: str, db: Session = Depends(get_db)):
    """
    Recupera el historial de transacciones para un cliente específico.
    """
    db_transactions = crud.get_transactions_by_customer(db, customer_id=customer_id)
    if db_transactions is None:
        raise HTTPException(status_code=404, detail="Customer not found or has no transactions")
    return db_transactions
