from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from utils.auth import create_access_token
from database.db import SessionLocal
from models.login_log import LoginLog

router = APIRouter()

# ✅ Request schema
class LoginRequest(BaseModel):
    email: str
    password: str


@router.post("/login")
def login(data: LoginRequest):
    db = SessionLocal()

    # 🔥 TEMP USER (replace later with real DB user)
    if data.email == "test@gmail.com" and data.password == "1234":

        # ✅ create token
        token = create_access_token({"sub": data.email})

        # ✅ save login in DB
        log = LoginLog(
            email=data.email,
            user_type="citizen"   # you can change later dynamically
        )

        db.add(log)
        db.commit()
        db.close()

        return {
            "access_token": token,
            "token_type": "bearer"
        }

    db.close()
    raise HTTPException(status_code=401, detail="Invalid credentials")