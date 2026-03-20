from fastapi import APIRouter
from database.db import SessionLocal
from models.project import Project
from fastapi import APIRouter

router = APIRouter()

# 🔥 Temporary data (same as geofence)
projects = [
    {
        "id": 1,
        "name": "Smart City Development - Your Area",
        "description": "Road upgrade & drainage system improved",
        "lat": 28.6139,
        "lon": 77.2090,
        "radius": 2000
    },
    {
        "id": 2,
        "name": "Metro Infrastructure Upgrade",
        "description": "New metro line construction in progress",
        "lat": 28.6239,
        "lon": 77.2190,
        "radius": 3000
    }
]

@router.get("/projects")
def get_projects():
    return {"projects": projects}



@router.post("/add-project")
def add_project(name: str, description: str, lat: float, lon: float):
    db = SessionLocal()

    new_project = Project(
        name=name,
        description=description,
        latitude=lat,
        longitude=lon
    )

    db.add(new_project)
    db.commit()
    db.refresh(new_project)

    return {"message": "Project added"}