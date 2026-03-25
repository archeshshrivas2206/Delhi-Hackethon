# backend/routes/amenities.py
from fastapi import APIRouter
from pydantic import BaseModel
import math

router = APIRouter()

# Amenities data (Delhi focus for Bharat Mandapam)
amenities = [
    # Transport
    {
        "id": 1,
        "name": "Pragati Maidan Metro Station",
        "type": "metro",
        "category": "transport",
        "lat": 28.6140,
        "lng": 77.2405,
        "address": "Pragati Maidan, New Delhi",
        "description": "Delhi Metro Blue Line station, directly connected to Bharat Mandapam",
        "timings": "5:30 AM - 11:30 PM"
    },
    # Government
    {
        "id": 2,
        "name": "Supreme Court of India",
        "type": "court",
        "category": "government",
        "lat": 28.6220,
        "lng": 77.2390,
        "address": "Tilak Marg, New Delhi",
        "description": "Highest judicial body in India",
        "timings": "10:00 AM - 5:00 PM"
    },
    # Monuments & Recreation
    {
        "id": 3,
        "name": "India Gate",
        "type": "monument",
        "category": "recreation",
        "lat": 28.6129,
        "lng": 77.2295,
        "address": "Rajpath, New Delhi",
        "description": "Iconic war memorial",
        "rating": 4.8,
        "timings": "24/7"
    },
    {
        "id": 4,
        "name": "National Museum",
        "type": "museum",
        "category": "recreation",
        "lat": 28.6120,
        "lng": 77.2340,
        "address": "Janpath, New Delhi",
        "description": "India's premier museum",
        "rating": 4.6,
        "timings": "10:00 AM - 6:00 PM"
    },
    {
        "id": 5,
        "name": "National Gallery of Modern Art",
        "type": "museum",
        "category": "recreation",
        "lat": 28.6150,
        "lng": 77.2360,
        "address": "Jaipur House, India Gate",
        "description": "Modern and contemporary art museum",
        "rating": 4.5,
        "timings": "11:00 AM - 6:30 PM"
    },
    # Healthcare
    {
        "id": 6,
        "name": "Max Hospital Saket",
        "type": "hospital",
        "category": "healthcare",
        "lat": 28.5280,
        "lng": 77.2100,
        "address": "Saket, New Delhi",
        "description": "Multi-specialty hospital",
        "rating": 4.5,
        "timings": "24/7"
    },
    {
        "id": 7,
        "name": "AIIMS Delhi",
        "type": "hospital",
        "category": "healthcare",
        "lat": 28.5675,
        "lng": 77.2100,
        "address": "Ansari Nagar, New Delhi",
        "description": "All India Institute of Medical Sciences",
        "rating": 4.7,
        "timings": "24/7"
    },
    # Education
    {
        "id": 8,
        "name": "Delhi Public School, Mathura Road",
        "type": "school",
        "category": "education",
        "lat": 28.6300,
        "lng": 77.2400,
        "address": "Mathura Road, New Delhi",
        "description": "Premier educational institution",
        "rating": 4.7
    },
    # Shopping
    {
        "id": 9,
        "name": "Connaught Place",
        "type": "market",
        "category": "shopping",
        "lat": 28.6300,
        "lng": 77.2200,
        "address": "Connaught Place, New Delhi",
        "description": "Iconic commercial hub",
        "timings": "10:00 AM - 10:00 PM"
    },
    # Additional Delhi Landmarks
    {
        "id": 10,
        "name": "Red Fort",
        "type": "monument",
        "category": "recreation",
        "lat": 28.6562,
        "lng": 77.2410,
        "address": "Netaji Subhash Marg",
        "description": "Historical fort, UNESCO World Heritage Site",
        "rating": 4.7
    },
    {
        "id": 11,
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
        "id": 12,
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
        "id": 13,
        "name": "Delhi Metro - Rajiv Chowk",
        "type": "metro",
        "category": "transport",
        "lat": 28.6320,
        "lng": 77.2200,
        "address": "Connaught Place",
        "description": "Major metro station",
        "timings": "5:30 AM - 11:30 PM"
    }
]
PAHARGANJ_AMENITIES = [
    {
        "id": 21,
        "name": "New Delhi Railway Station",
        "type": "railway",
        "category": "transport",
        "lat": 28.6418,
        "lng": 77.2202,
        "address": "Connaught Place, New Delhi",
        "description": "One of India's busiest railway stations, major transit hub",
        "timings": "24/7",
        "rating": 4.3
    },
    {
        "id": 22,
        "name": "Paharganj Main Market",
        "type": "market",
        "category": "shopping",
        "lat": 28.6480,
        "lng": 77.2150,
        "address": "Main Bazaar, Paharganj",
        "description": "Famous market for clothes, souvenirs, and street shopping",
        "timings": "10 AM - 10 PM",
        "rating": 4.4
    },
    {
        "id": 23,
        "name": "Shri Ram Janam Bhumi Temple",
        "type": "temple",
        "category": "recreation",
        "lat": 28.6475,
        "lng": 77.2145,
        "address": "Paharganj, New Delhi",
        "description": "Historic temple in Paharganj area",
        "timings": "5 AM - 9 PM",
        "rating": 4.6
    },
    {
        "id": 24,
        "name": "Lady Hardinge Medical College",
        "type": "hospital",
        "category": "healthcare",
        "lat": 28.6350,
        "lng": 77.2150,
        "address": "Connaught Place, New Delhi",
        "description": "Government medical college and hospital",
        "timings": "24/7",
        "rating": 4.4
    },
    {
        "id": 25,
        "name": "Paharganj Police Station",
        "type": "police",
        "category": "government",
        "lat": 28.6465,
        "lng": 77.2175,
        "address": "Main Bazaar, Paharganj",
        "description": "Local police station serving the area",
        "timings": "24/7"
    },
    {
        "id": 26,
        "name": "Hotel Broadway",
        "type": "hotel",
        "category": "accommodation",
        "lat": 28.6470,
        "lng": 77.2160,
        "address": "Paharganj, New Delhi",
        "description": "Heritage hotel in Paharganj",
        "rating": 4.2
    }
]

# Add Sudama Nagar amenities (Indore)
SUDAMA_NAGAR_AMENITIES = [
    {
        "id": 27,
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
        "id": 28,
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
        "id": 29,
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
        "id": 30,
        "name": "Sudama Nagar Market",
        "type": "market",
        "category": "shopping",
        "lat": 22.6942,
        "lng": 75.8342,
        "address": "Main Market Road",
        "description": "Daily needs market with vegetables and grocery",
        "timings": "9 AM - 9 PM"
    },
    {
        "id": 31,
        "name": "Sudama Nagar Bus Stop",
        "type": "bus_stop",
        "category": "transport",
        "lat": 22.6945,
        "lng": 75.8340,
        "address": "Main Road",
        "description": "City bus stop with frequent service"
    },
    {
        "id": 32,
        "name": "Banganga Clinic",
        "type": "clinic",
        "category": "healthcare",
        "lat": 22.6980,
        "lng": 75.8360,
        "address": "Banganga Square",
        "description": "Primary health care center",
        "rating": 4.0,
        "timings": "9 AM - 9 PM"
    },
    {
        "id": 33,
        "name": "Shri Krishna Mandir",
        "type": "temple",
        "category": "recreation",
        "lat": 22.6948,
        "lng": 75.8338,
        "address": "Sudama Nagar",
        "description": "Local temple, community gathering spot",
        "timings": "6 AM - 8 PM",
        "rating": 4.4
    }
]
amenities.extend(PAHARGANJ_AMENITIES)
amenities.extend(SUDAMA_NAGAR_AMENITIES)

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
    radius: float = 3.0
    limit: int = 20

@router.post("/amenities/nearby")
def get_nearby_amenities(request: NearbyRequest):
    """Get amenities within radius of location"""
    results = []
    for a in amenities:
        distance = calculate_distance(request.lat, request.lng, a["lat"], a["lng"])
        if distance <= request.radius:
            a_copy = a.copy()
            a_copy["distance"] = round(distance, 1)
            results.append(a_copy)
    
    results.sort(key=lambda x: x["distance"])
    return {
        "amenities": results[:request.limit],
        "count": len(results[:request.limit])
    }

@router.get("/amenities/category/{category}")
def get_amenities_by_category(category: str):
    """Get amenities by category"""
    filtered = [a for a in amenities if a.get("category") == category]
    return {"amenities": filtered}

