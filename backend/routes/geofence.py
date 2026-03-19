from fastapi import APIRouter
from database.db import SessionLocal
from models.project import Project
from utils.geofence import is_inside_geofence
from pydantic import BaseModel

router = APIRouter()


class LocationRequest(BaseModel):
    user_lat: float
    user_lon: float


@router.post("/check-location")
@router.post("/check-location")
def check_location(data: LocationRequest):
    user_lat = data.user_lat
    user_lon = data.user_lon

    #  TEMPORARY DATA (replace DB)
    projects = [
        {
        "name": "Smart City Development - Your Area",
        "description": "Road upgrade & drainage system improved",
        "lat": user_lat,   # SAME AS USER
        "lon": user_lon
    },
        {
            "name": "Metro Bridge Project",
            "description": "New flyover completed",
            "lat": 28.6139,
            "lon": 77.2090
        }
    ]

    results = []

    for project in projects:
        if is_inside_geofence(user_lat, user_lon, project["lat"], project["lon"]):
            results.append({
                "name": project["name"],
                "description": project["description"]
            })

    return {
        "inside": len(results) > 0,
        "projects": results
    }