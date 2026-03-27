# backend/routes/zones.py
from fastapi import APIRouter
from pydantic import BaseModel
from utils.geofence import is_point_in_polygon

router = APIRouter()


# Zone 1: New Delhi Constituency (Expanded to actual ward size)
BHARAT_MANDAPAM_ZONE = {
    "id": 1,
    "name": "New Delhi Constituency",
    "description": "Delhi Assembly Constituency covering Pragati Maidan, India Gate, Connaught Place, Parliament House, and Central Delhi. Home to India's most important government and cultural institutions.",
    "color": "#22c55e",
    "coordinates": [
        # Northern boundary (near Connaught Place)
        [28.6350, 77.2050],
        [28.6350, 77.2350],
        # Eastern boundary (near Pragati Maidan)
        [28.6250, 77.2450],
        [28.6150, 77.2450],
        # Southern boundary (near India Gate)
        [28.6000, 77.2400],
        [28.5950, 77.2250],
        # Western boundary (near Parliament)
        [28.6050, 77.2000],
        [28.6200, 77.2000],
        # Close back to start
        [28.6350, 77.2050]
    ],
    "highlights": [
        {"text": "G20 Summit 2023 Venue", "icon": "🌍"},
        {"text": "India Gate", "icon": "🏛️"},
        {"text": "Connaught Place", "icon": "🛍️"},
        {"text": "Parliament House", "icon": "🏦"},
        {"text": "LEED Gold Certified", "icon": "🏆"}
    ],
    "facts": {
        "area": "60 sq km",
        "population": "250,000+",
        "constituency": "New Delhi (No. 40)"
    }
}

# Zone 2: Paharganj (Delhi)
PAHARGANJ_ZONE = {
    "id": 2,
    "name": "Ballimaran Constituency - Paharganj",
    "description": "Delhi Assembly Constituency No. 22 covering Paharganj, Sadar Bazar, parts of Chandni Chowk, and surrounding areas. A historic commercial and residential hub.",
    "color": "#f59e0b",
    "coordinates": [
        # Northern boundary (near Sadar Bazar)
        [28.6600, 77.2100],
        [28.6600, 77.2350],
        # Eastern boundary (near Chandni Chowk)
        [28.6550, 77.2400],
        [28.6450, 77.2400],
        # Southern boundary (near New Delhi Railway Station)
        [28.6350, 77.2300],
        [28.6350, 77.2150],
        # Western boundary (near Paharganj Main Bazaar)
        [28.6450, 77.2080],
        [28.6550, 77.2080],
        # Close back to start
        [28.6600, 77.2100]
    ],
    "highlights": [
        {"text": "New Delhi Railway Station", "icon": "🚂"},
        {"text": "Main Bazaar Market", "icon": "🛍️"},
        {"text": "Sadar Bazar", "icon": "🏪"},
        {"text": "Chandni Chowk", "icon": "🕌"},
        {"text": "Street Food Paradise", "icon": "🍛"}
    ],
    "facts": {
        "area": "3.5 sq km",
        "population": "150,000+",
        "established": "1950s",
        "constituency": "Ballimaran (No. 22)"
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