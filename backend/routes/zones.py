# backend/routes/zones.py
from fastapi import APIRouter
from pydantic import BaseModel
from utils.geofence import is_point_in_polygon

router = APIRouter()

# Zones for your location (22.6954, 75.8346)
zones = [
    {
        "id": 1,
        "name": "Sudama Nagar Ward",
        "description": "Your immediate neighborhood - residential area with local amenities",
        "color": "#3b82f6",
        "coordinates": [
            [22.6904, 75.8296],
            [22.6904, 75.8396],
            [22.7004, 75.8396],
            [22.7004, 75.8296],
            [22.6904, 75.8296]
        ]
    },
    {
        "id": 2,
        "name": "Banganga Area",
        "description": "Historical temple and commercial area",
        "color": "#10b981",
        "coordinates": [
            [22.7004, 75.8296],
            [22.7004, 75.8396],
            [22.7104, 75.8396],
            [22.7104, 75.8296],
            [22.7004, 75.8296]
        ]
    },
    {
        "id": 3,
        "name": "MR10 Corridor",
        "description": "Major road connectivity area with transport hubs",
        "color": "#ef4444",
        "coordinates": [
            [22.6854, 75.8246],
            [22.6854, 75.8346],
            [22.6954, 75.8346],
            [22.6954, 75.8246],
            [22.6854, 75.8246]
        ]
    }
]

class PointRequest(BaseModel):
    lat: float
    lng: float

@router.get("/zones")
def get_zones():
    """Get all zones"""
    return zones

@router.post("/zones/point")
def get_zone_by_point(data: PointRequest):
    """Find which zone contains the given point"""
    for zone in zones:
        if is_point_in_polygon([data.lat, data.lng], zone["coordinates"]):
            return zone
    return {"message": "Not in any zone", "inside": False}