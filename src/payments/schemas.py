from pydantic import BaseModel
from datetime import datetime

class Transaction(BaseModel):
    id: int
    customer_id: str
    amount: float
    status: str
    transaction_date: datetime

    class Config:
        orm_mode = True
