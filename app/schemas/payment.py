from pydantic import BaseModel, Field
from typing import Optional

class PaymentCreateRequest(BaseModel):
    customer_id: str
    amount: float = Field(..., gt=0, description="Monto del pago, debe ser positivo")
    currency: str = Field(..., min_length=3, max_length=3, description="Código de moneda ISO 4217")
    payment_method: str = Field(..., description="Método de pago (ej. 'credit_card', 'bank_transfer')")
    card_details: Optional[dict] = Field(None, description="Detalles de la tarjeta si payment_method es 'credit_card'")
    bank_transfer_details: Optional[dict] = Field(None, description="Detalles de transferencia bancaria si payment_method es 'bank_transfer'")

class PaymentResponse(BaseModel):
    payment_id: str
    customer_id: str
    amount: float
    currency: str
    status: str # ej. 'pending', 'completed', 'failed'
    created_at: str
    updated_at: str

class CreditCheckRequest(BaseModel):
    customer_id: str
    amount: float
    currency: str

class CreditCheckResponse(BaseModel):
    customer_id: str
    is_approved: bool
    message: Optional[str] = None
    available_credit: Optional[float] = None
    reserved_credit: Optional[float] = None
