from fastapi import FastAPI
from database.db import engine, Base
from models.project import Project
from routes import project
from routes import geofence
from fastapi.middleware.cors import CORSMiddleware


Base.metadata.create_all(bind=engine)

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

app.include_router(project.router)
app.include_router(geofence.router)