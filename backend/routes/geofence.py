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
    print(f"[INFO] User location: {user_lat}, {user_lon}")

    #  TEMPORARY DATA (replace DB)
    projects = [
    {
        "id": 1,
        "name": "Smart City Development - Your Area",
        "description": "Road upgrade & drainage system improved",
        "lat": user_lat,
        "lon": user_lon,
        "radius": 2000
    },
    {
        "id": 2,
        "name": "Metro Infrastructure Upgrade",
        "description": "New metro line construction in progress",
        "lat": user_lat + 0.01,
        "lon": user_lon + 0.01,
        "radius": 3000
    }
]

    results = []

    for project in projects:
        if is_inside_geofence(
    user_lat,
    user_lon,
    project["lat"],
    project["lon"],
    project["radius"]
):
            results.append({
                "name": project["name"],
                "description": project["description"]
            })

    return {
    "status": "success",
    "inside": len(results) > 0,
    "count": len(results),
    "projects": results,
    "message": "Nearby development detected" if len(results) > 0 else "No nearby projects"
}