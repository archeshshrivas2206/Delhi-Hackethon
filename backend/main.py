from fastapi import FastAPI
from database.db import engine, Base
from models.project import Project
from routes import project
from routes import geofence
from routes import zones  # Add this import
from routes import amenities  # Add this import
from fastapi.middleware.cors import CORSMiddleware
from routes import auth
from models.login_log import LoginLog
from routes import mla

#Base.metadata.create_all(bind=engine)

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # allow frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Backend Running 🚀"}

# Include all routes
app.include_router(project.router, prefix="/api")
app.include_router(geofence.router, prefix="/api")
app.include_router(auth.router)
app.include_router(zones.router, prefix="/api")      
app.include_router(amenities.router, prefix="/api")  
app.include_router(mla.router, prefix="/api")