from sqlalchemy.orm import Session
from src.payments import models, schemas

def get_transactions_by_customer(db: Session, customer_id: str) -> List[models.Transaction]:
    """
    Obtiene todas las transacciones asociadas a un customer_id específico.
    """
    return db.query(models.Transaction).filter(models.Transaction.customer_id == customer_id).all()
