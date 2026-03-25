# backend/routes/zones.py
from fastapi import APIRouter
from pydantic import BaseModel
from utils.geofence import is_point_in_polygon

router = APIRouter()

# Zone 1: Bharat Mandapam (Delhi)
BHARAT_MANDAPAM_ZONE = {
    "id": 1,
    "name": "Pragati Maidan - Bharat Mandapam",
    "description": "India's premier convention and exhibition center, inaugurated in 2023. Hosted the G20 Summit and is a landmark of modern Indian infrastructure.",
    "color": "#22c55e",
    "coordinates": [
        [28.6115, 77.2390],
        [28.6115, 77.2450],
        [28.6175, 77.2450],
        [28.6175, 77.2390],
        [28.6115, 77.2390]
    ],
    "highlights": [
        {"text": "G20 Summit 2023 Venue", "icon": "🌍"},
        {"text": "LEED Gold Certified", "icon": "🏆"},
        {"text": "25,000+ Capacity", "icon": "👥"}
    ]
}

# Zone 2: Paharganj (Delhi)
PAHARGANJ_ZONE = {
    "id": 2,
    "name": "Paharganj - Main Bazaar",
    "description": "Vibrant commercial and tourist hub, known for markets, budget hotels, and proximity to New Delhi Railway Station. A historic area with rich cultural diversity.",
    "color": "#f59e0b",
    "coordinates": [
        [28.6450, 77.2100],
        [28.6450, 77.2200],
        [28.6550, 77.2200],
        [28.6550, 77.2100],
        [28.6450, 77.2100]
    ],
    "highlights": [
        {"text": "New Delhi Railway Station", "icon": "🚂"},
        {"text": "Main Bazaar Market", "icon": "🛍️"},
        {"text": "Budget Hotels Hub", "icon": "🏨"},
        {"text": "Street Food Paradise", "icon": "🍛"}
    ],
    "facts": {
        "area": "2.5 sq km",
        "population": "50,000+",
        "established": "1950s"
    }
}

# Zone 3: Sudama Nagar (Indore)
SUDAMA_NAGAR_ZONE = {
    "id": 3,
    "name": "Sudama Nagar",
    "description": "Residential neighborhood in Indore with excellent connectivity, local markets, schools, and parks. A well-planned area with growing infrastructure.",
    "color": "#3b82f6",
    "coordinates": [
        [22.6904, 75.8296],
        [22.6904, 75.8396],
        [22.7004, 75.8396],
        [22.7004, 75.8296],
        [22.6904, 75.8296]
    ],
    "highlights": [
        {"text": "Local Market", "icon": "🏪"},
        {"text": "Community Park", "icon": "🌳"},
        {"text": "Good Connectivity", "icon": "🚌"},
        {"text": "Educational Hub", "icon": "📚"}
    ],
    "facts": {
        "area": "1.8 sq km",
        "established": "1990s",
        "ward": "Ward 45"
    }
}

# All zones list
ALL_ZONES = [BHARAT_MANDAPAM_ZONE, PAHARGANJ_ZONE, SUDAMA_NAGAR_ZONE]

class PointRequest(BaseModel):
    lat: float
    lng: float

@router.get("/zones")
def get_zones():
    """Get all zones"""
    return ALL_ZONES

@router.post("/zones/point")
def get_zone_by_point(data: PointRequest):
    """Find which zone contains the given point - Fallback to Bharat Mandapam if none found"""
    for zone in ALL_ZONES:
        if is_point_in_polygon([data.lat, data.lng], zone["coordinates"]):
            return zone
    
    # If not in any zone, default to Bharat Mandapam zone
    print(f"📍 Location {data.lat}, {data.lng} not in any zone - defaulting to Bharat Mandapam")
    return {
        **BHARAT_MANDAPAM_ZONE,
        "message": "Default zone (Bharat Mandapam)"
    }