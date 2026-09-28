from fastapi import FastAPI
from .payment_service import router as payment_router

app = FastAPI()

app.include_router(payment_router)

@app.get("/healthz")
def health_check():
    return {"status": "ok"}
