from fastapi import APIRouter
from database.db import SessionLocal
from models.project import Project

router = APIRouter()

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