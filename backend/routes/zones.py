# backend/routes/zones.py
from fastapi import APIRouter
from pydantic import BaseModel
from utils.geofence import is_point_in_polygon

router = APIRouter()

# Zones for your location 
zones = [
    # Indore Zones (your location)
    {
        "id": 1,
        "name": "Sudama Nagar Ward",
        "description": "Residential area with local amenities",
        "color": "#3b82f6",
        "coordinates": [
            [22.6904, 75.8296], [22.6904, 75.8396], [22.7004, 75.8396], [22.7004, 75.8296], [22.6904, 75.8296]
        ]
    },
    {
        "id": 2,
        "name": "Banganga Area",
        "description": "Historical temple and commercial area",
        "color": "#10b981",
        "coordinates": [
            [22.7004, 75.8296], [22.7004, 75.8396], [22.7104, 75.8396], [22.7104, 75.8296], [22.7004, 75.8296]
        ]
    },
    {
        "id": 3,
        "name": "MR10 Corridor",
        "description": "Major road connectivity area",
        "color": "#ef4444",
        "coordinates": [
            [22.6854, 75.8246], [22.6854, 75.8346], [22.6954, 75.8346], [22.6954, 75.8246], [22.6854, 75.8246]
        ]
    },
    {
        "id": 4,
        "name": "Ring Road South",
        "description": "Southern Ring Road corridor",
        "color": "#f59e0b",
        "coordinates": [
            [22.6900, 75.8400], [22.6900, 75.8550], [22.7050, 75.8550], [22.7050, 75.8400], [22.6900, 75.8400]
        ]
    },
    {
        "id": 5,
        "name": "Vijay Nagar",
        "description": "Commercial and residential hub",
        "color": "#a855f7",
        "coordinates": [
            [22.7200, 75.8600], [22.7200, 75.8800], [22.7400, 75.8800], [22.7400, 75.8600], [22.7200, 75.8600]
        ]
    },
    {
        "id": 6,
        "name": "Rajwada Area",
        "description": "Historical city center",
        "color": "#ec489a",
        "coordinates": [
            [22.7100, 75.8500], [22.7100, 75.8600], [22.7200, 75.8600], [22.7200, 75.8500], [22.7100, 75.8500]
        ]
    },
    
    # Delhi Zones
    {
        "id": 7,
        "name": "New Delhi",
        "description": "Central Delhi - Parliament, Connaught Place",
        "color": "#3b82f6",
        "coordinates": [
            [28.6100, 77.2000], [28.6100, 77.2300], [28.6400, 77.2300], [28.6400, 77.2000], [28.6100, 77.2000]
        ]
    },
    {
        "id": 8,
        "name": "South Delhi",
        "description": "South Delhi - Saket, Hauz Khas, Green Park",
        "color": "#10b981",
        "coordinates": [
            [28.5300, 77.1800], [28.5300, 77.2200], [28.5700, 77.2200], [28.5700, 77.1800], [28.5300, 77.1800]
        ]
    },
    {
        "id": 9,
        "name": "North Delhi",
        "description": "North Delhi - Civil Lines, Kamla Nagar",
        "color": "#ef4444",
        "coordinates": [
            [28.6700, 77.2000], [28.6700, 77.2400], [28.7100, 77.2400], [28.7100, 77.2000], [28.6700, 77.2000]
        ]
    },
    {
        "id": 10,
        "name": "East Delhi",
        "description": "East Delhi - Mayur Vihar, Laxmi Nagar",
        "color": "#f59e0b",
        "coordinates": [
            [28.6200, 77.2700], [28.6200, 77.3100], [28.6600, 77.3100], [28.6600, 77.2700], [28.6200, 77.2700]
        ]
    },
    {
        "id": 11,
        "name": "West Delhi",
        "description": "West Delhi - Rajouri Garden, Janakpuri",
        "color": "#a855f7",
        "coordinates": [
            [28.6400, 77.0800], [28.6400, 77.1200], [28.6800, 77.1200], [28.6800, 77.0800], [28.6400, 77.0800]
        ]
    },
    {
        "id": 12,
        "name": "Dwarka",
        "description": "Dwarka sub-city",
        "color": "#ec489a",
        "coordinates": [
            [28.5800, 77.0300], [28.5800, 77.0700], [28.6200, 77.0700], [28.6200, 77.0300], [28.5800, 77.0300]
        ]
    },
    {
        "id": 13,
        "name": "Rohini",
        "description": "Rohini residential area",
        "color": "#14b8a6",
        "coordinates": [
            [28.7000, 77.0900], [28.7000, 77.1300], [28.7400, 77.1300], [28.7400, 77.0900], [28.7000, 77.0900]
        ]
    },
    {
        "id": 14,
        "name": "Noida",
        "description": "Noida - IT hub",
        "color": "#f97316",
        "coordinates": [
            [28.5500, 77.3000], [28.5500, 77.3400], [28.5900, 77.3400], [28.5900, 77.3000], [28.5500, 77.3000]
        ]
    },
    {
        "id": 15,
        "name": "Gurgaon",
        "description": "Gurgaon - Corporate hub",
        "color": "#8b5cf6",
        "coordinates": [
            [28.4300, 77.0300], [28.4300, 77.0700], [28.4700, 77.0700], [28.4700, 77.0300], [28.4300, 77.0300]
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