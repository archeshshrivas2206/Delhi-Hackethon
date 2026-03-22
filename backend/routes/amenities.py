# backend/routes/amenities.py
from fastapi import APIRouter
from pydantic import BaseModel
import math

router = APIRouter()

# Amenities near your location
amenities = [
    {
        "id": 1,
        "name": "Sudama Nagar Hospital",
        "type": "hospital",
        "category": "healthcare",
        "lat": 22.6930,
        "lng": 75.8330,
        "address": "Sudama Nagar Main Road",
        "description": "Multi-specialty hospital with emergency services",
        "rating": 4.2,
        "timings": "24/7"
    },
    {
        "id": 2,
        "name": "Sudama Nagar Public School",
        "type": "school",
        "category": "education",
        "lat": 22.6940,
        "lng": 75.8320,
        "address": "Sudama Nagar Sector A",
        "description": "CBSE affiliated school",
        "rating": 4.3,
        "timings": "8 AM - 2 PM"
    },
    {
        "id": 3,
        "name": "Sudama Nagar Park",
        "type": "park",
        "category": "recreation",
        "lat": 22.6955,
        "lng": 75.8345,
        "address": "Central Sudama Nagar",
        "description": "Community park with walking track",
        "rating": 4.5,
        "timings": "6 AM - 8 PM"
    },
    {
        "id": 4,
        "name": "Sudama Nagar Market",
        "type": "market",
        "category": "shopping",
        "lat": 22.6942,
        "lng": 75.8342,
        "address": "Main Market Road",
        "description": "Daily needs market",
        "timings": "9 AM - 9 PM"
    },
    {
        "id": 5,
        "name": "Sudama Nagar Bus Stop",
        "type": "bus_stop",
        "category": "transport",
        "lat": 22.6945,
        "lng": 75.8340,
        "address": "Main Road",
        "description": "City bus stop with frequent service"
    },
    {
        "id": 6,
        "name": "Banganga Clinic",
        "type": "clinic",
        "category": "healthcare",
        "lat": 22.6980,
        "lng": 75.8360,
        "address": "Banganga Square",
        "description": "Primary health care center",
        "rating": 4.0,
        "timings": "9 AM - 9 PM"
    }
]

def calculate_distance(lat1, lng1, lat2, lng2):
    """Calculate distance between two points in km using Haversine formula"""
    R = 6371  # Earth's radius in km
    lat1_rad, lat2_rad = math.radians(lat1), math.radians(lat2)
    lng1_rad, lng2_rad = math.radians(lng1), math.radians(lng2)
    
    dlat = lat2_rad - lat1_rad
    dlng = lng2_rad - lng1_rad
    
    a = math.sin(dlat/2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlng/2)**2
    c = 2 * math.asin(math.sqrt(a))
    
    return R * c

class NearbyRequest(BaseModel):
    lat: float
    lng: float
    radius: float = 2.0
    limit: int = 20

@router.post("/amenities/nearby")
def get_nearby_amenities(data: NearbyRequest):
    """Get amenities within radius of location"""
    results = []
    for a in amenities:
        distance = calculate_distance(data.lat, data.lng, a["lat"], a["lng"])
        if distance <= data.radius:
            a_copy = a.copy()
            a_copy["distance"] = round(distance, 1)
            results.append(a_copy)
    
    results.sort(key=lambda x: x["distance"])
    return {
        "amenities": results[:data.limit],
        "count": len(results[:data.limit])
    }

@router.get("/amenities/category/{category}")
def get_amenities_by_category(category: str):
    """Get amenities by category"""
    filtered = [a for a in amenities if a.get("category") == category]
    return {"amenities": filtered}

amenities.extend([
    # Indore Amenities
    {
        "id": 7,
        "name": "Indore Railway Station",
        "type": "transport",
        "category": "transport",
        "lat": 22.7100,
        "lng": 75.8600,
        "address": "Indore Railway Station",
        "description": "Major railway junction"
    },
    {
        "id": 8,
        "name": "Devi Ahilyabai Holkar Airport",
        "type": "airport",
        "category": "transport",
        "lat": 22.7200,
        "lng": 75.8000,
        "address": "Airport Road",
        "description": "Indore International Airport"
    },
    {
        "id": 9,
        "name": "Rajwada Palace",
        "type": "monument",
        "category": "recreation",
        "lat": 22.7180,
        "lng": 75.8550,
        "address": "Rajwada, Indore",
        "description": "Historical palace",
        "rating": 4.7
    },
    {
        "id": 10,
        "name": "Lal Bagh Palace",
        "type": "palace",
        "category": "recreation",
        "lat": 22.7050,
        "lng": 75.8700,
        "address": "Lal Bagh",
        "description": "Royal palace museum"
    },
    
    # Delhi Amenities
    {
        "id": 11,
        "name": "India Gate",
        "type": "monument",
        "category": "recreation",
        "lat": 28.6129,
        "lng": 77.2295,
        "address": "Rajpath, New Delhi",
        "description": "War memorial",
        "rating": 4.8
    },
    {
        "id": 12,
        "name": "Red Fort",
        "type": "monument",
        "category": "recreation",
        "lat": 28.6562,
        "lng": 77.2410,
        "address": "Netaji Subhash Marg",
        "description": "Historical fort",
        "rating": 4.7
    },
    {
        "id": 13,
        "name": "Qutub Minar",
        "type": "monument",
        "category": "recreation",
        "lat": 28.5245,
        "lng": 77.1855,
        "address": "Mehrauli",
        "description": "World Heritage Site",
        "rating": 4.8
    },
    {
        "id": 14,
        "name": "Lotus Temple",
        "type": "temple",
        "category": "recreation",
        "lat": 28.5535,
        "lng": 77.2588,
        "address": "Kalkaji",
        "description": "Bahá'í House of Worship",
        "rating": 4.7
    },
    {
        "id": 15,
        "name": "AIIMS Delhi",
        "type": "hospital",
        "category": "healthcare",
        "lat": 28.5675,
        "lng": 77.2100,
        "address": "Ansari Nagar",
        "description": "All India Institute of Medical Sciences",
        "rating": 4.6,
        "timings": "24/7"
    },
    {
        "id": 16,
        "name": "Delhi University",
        "type": "university",
        "category": "education",
        "lat": 28.6900,
        "lng": 77.2100,
        "address": "North Campus",
        "description": "Central University"
    },
    {
        "id": 17,
        "name": "Connaught Place",
        "type": "market",
        "category": "shopping",
        "lat": 28.6300,
        "lng": 77.2200,
        "address": "New Delhi",
        "description": "Commercial hub"
    },
    {
        "id": 18,
        "name": "Hauz Khas Village",
        "type": "market",
        "category": "shopping",
        "lat": 28.5530,
        "lng": 77.1950,
        "address": "Hauz Khas",
        "description": "Boutique shops and cafes"
    },
    {
        "id": 19,
        "name": "Nehru Park",
        "type": "park",
        "category": "recreation",
        "lat": 28.5900,
        "lng": 77.1900,
        "address": "Chanakyapuri",
        "description": "Large urban park",
        "timings": "5 AM - 9 PM"
    },
    {
        "id": 20,
        "name": "Delhi Metro - Rajiv Chowk",
        "type": "metro",
        "category": "transport",
        "lat": 28.6320,
        "lng": 77.2200,
        "address": "Connaught Place",
        "description": "Major metro station"
    }
])