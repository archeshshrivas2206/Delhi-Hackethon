from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from database.db import SessionLocal
from models.user import User
from utils.auth import create_access_token
from passlib.context import CryptContext

router = APIRouter()

# 🔐 password hashing setup
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

def hash_password(password: str):
    return pwd_context.hash(password)

def verify_password(plain, hashed):
    return pwd_context.verify(plain, hashed)

# =========================
# ✅ REGISTER
# =========================

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    user_type: str


@router.post("/register")
def register(data: RegisterRequest):
    db = SessionLocal()

    # check if user already exists
    existing_user = db.query(User).filter(User.email == data.email).first()
    if existing_user:
        db.close()
        raise HTTPException(status_code=400, detail="User already exists")

    # create new user
    new_user = User(
        name=data.name,
        email=data.email,
        password=hash_password(data.password),  # 🔐 hashed
        user_type=data.user_type
    )

    db.add(new_user)
    db.commit()
    db.close()

    return {"message": "User registered successfully"}


# =========================
# ✅ LOGIN
# =========================

class LoginRequest(BaseModel):
    email: str
    password: str


@router.post("/login")
def login(data: LoginRequest):
    db = SessionLocal()

    user = db.query(User).filter(User.email == data.email).first()

    # ❌ user not found
    if not user:
        db.close()
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # ❌ wrong password
    if not verify_password(data.password, user.password):
        db.close()
        raise HTTPException(status_code=401, detail="Invalid credentials")

    # ✅ generate JWT token
    token = create_access_token({"sub": user.email})

    db.close()

    return {
        "access_token": token,
        "token_type": "bearer",
        "user_type": user.user_type
    }