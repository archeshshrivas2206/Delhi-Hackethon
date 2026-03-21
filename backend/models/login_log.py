from sqlalchemy import Column, Integer, String, DateTime
from database.db import Base
from datetime import datetime

class LoginLog(Base):
    __tablename__ = "login_logs"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, index=True)
    user_type = Column(String)  # citizen / politician
    timestamp = Column(DateTime, default=datetime.utcnow)