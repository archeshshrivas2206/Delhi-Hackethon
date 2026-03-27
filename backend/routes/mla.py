# backend/routes/mla.py
from fastapi import APIRouter
from pydantic import BaseModel
from utils.geofence import is_point_in_polygon

router = APIRouter()

# MLA Data for New Delhi Constituency (Bharat Mandapam area)
# MLA Data for New Delhi Constituency (Bharat Mandapam area) - Updated 2025
NEW_DELHI_MLA = {
    "id": 1,
    "name": "Parvesh Sahib Singh Verma",
    "constituency": "New Delhi",
    "party": "Bharatiya Janata Party (BJP)",
    "party_color": "#FF9933",  # BJP saffron color
    "party_symbol": "🪷",  # Lotus symbol
    "since": "2025",
    "office_address": "New Delhi Constituency Office, Windsor Place, New Delhi",
    "phone": "9910661000",
    "email": "office.parveshsahibsingh@gmail.com",
    "website": "delhi.gov.in",
    "bio": "Parvesh Sahib Singh Verma is a senior BJP leader and current MLA from New Delhi. He has previously served as Member of Parliament from West Delhi and focuses on infrastructure, civic development, and urban governance.",
    
    "achievements": [
        {
            "title": "Infrastructure Development",
            "description": "Improvement of roads, flyovers, and public infrastructure across Delhi.",
            "year": "2014-2025",
            "icon": "🛣️",
            "color": "#ef4444",
            "stats": {"label": "Road Projects Completed", "value": "200+ km", "progress": 90},
            "sub_stats": [
                {"label": "Flyovers", "value": "15+"},
                {"label": "Roads Improved", "value": "200+ km"},
                {"label": "Budget Allocation", "value": "₹10,000 Cr"}
            ]
        },
        {
            "title": "Public Welfare Initiatives",
            "description": "Worked on sanitation, housing schemes, and welfare programs for citizens.",
            "year": "2015-2025",
            "icon": "👥",
            "color": "#10b981",
            "stats": {"label": "Beneficiaries", "value": "1M+", "progress": 100},
            "sub_stats": [
                {"label": "Citizens Benefited", "value": "1M+"},
                {"label": "Schemes", "value": "25+"},
                {"label": "Budget", "value": "₹5,000 Cr"}
            ]
        },
        {
            "title": "Cleanliness & Civic Improvements",
            "description": "Focused on sanitation drives and waste management across the constituency.",
            "year": "2016-2025",
            "icon": "🧹",
            "color": "#3b82f6",
            "stats": {"label": "Areas Covered", "value": "100+", "progress": 85},
            "sub_stats": [
                {"label": "Cleanliness Drives", "value": "300+"},
                {"label": "Areas Covered", "value": "100+"},
                {"label": "Impact", "value": "High"}
            ]
        },
        {
            "title": "Digital Governance",
            "description": "Promoted digital governance and online services for better citizen engagement.",
            "year": "2018-2025",
            "icon": "💻",
            "color": "#8b5cf6",
            "stats": {"label": "Services Digitized", "value": "20+", "progress": 95},
            "sub_stats": [
                {"label": "Services", "value": "20+"},
                {"label": "Users Impacted", "value": "500K+"},
                {"label": "Efficiency", "value": "Fast"}
            ]
        }
    ],
    
    "promises_kept": [
        {"text": "Improvement of major roads and traffic flow", "completed": True},
        {"text": "Development of smart infrastructure", "completed": True},
        {"text": "Better sanitation and waste management", "completed": True},
        {"text": "Improved civic services delivery", "completed": True},
        {"text": "Support for digital governance initiatives", "completed": True}
    ],
    
    "upcoming_projects": [
        {"name": "Road Redevelopment Project", "timeline": "2026", "icon": "🛣️", "status": "In Progress"},
        {"name": "Smart Infrastructure Upgrade", "timeline": "2026", "icon": "🏗️", "status": "Planned"},
        {"name": "Public Transport Improvement", "timeline": "2027", "icon": "🚌", "status": "Planned"}
    ],
    
    "contact_info": {
        "office": "New Delhi Constituency Office, Windsor Place, New Delhi",
        "phone": "9910661000",
        "email": "office.parveshsahibsingh@gmail.com",
        "website": "delhi.gov.in",
        "constituency_office": "New Delhi Constituency Office, Windsor Place"
    },
    
    "social_media": {
        "twitter": "@ParveshSahib",
        "facebook": "ParveshSahibSinghVerma",
        "instagram": "parveshsahibsingh"
    }
}

# MLA Data for Ballimaran Constituency (Paharganj area)
BALLIMARAN_MLA = {
    "id": 2,
    "name": "Imran Hussain",
    "constituency": "Ballimaran",
    "party": "Aam Aadmi Party (AAP)",
    "party_color": "#00BFFF",
    "party_symbol": "🧹",
    "since": "2015",
    "office_address": "Ballimaran, Delhi - 110006",
    "phone": "011-23287654",
    "email": "imran.hussain@delhiassembly.gov.in",
    "website": "delhi.gov.in",
    "bio": "Cabinet Minister in Delhi Government. Focus on urban development, local infrastructure, and community welfare in Old Delhi area.",
    
    "achievements": [
        {
            "title": "Local Market Development",
            "description": "Revitalized Paharganj markets with improved infrastructure, better lighting, and organized vendor spaces.",
            "year": "2018-2025",
            "icon": "🛍️",
            "color": "#f59e0b",
            "stats": {"label": "Markets Revitalized", "value": "15+", "progress": 90},
            "sub_stats": [
                {"label": "Vendors Benefited", "value": "5,000+"},
                {"label": "New Lighting", "value": "500+ units"},
                {"label": "Footfall Increase", "value": "40%"}
            ]
        },
        {
            "title": "Road & Infrastructure",
            "description": "Widening and repaving of key roads in Paharganj area, improving connectivity and reducing congestion.",
            "year": "2019-2025",
            "icon": "🛣️",
            "color": "#3b82f6",
            "stats": {"label": "Roads Upgraded", "value": "25 km", "progress": 85},
            "sub_stats": [
                {"label": "New Footpaths", "value": "10 km"},
                {"label": "Drainage Improved", "value": "15 locations"},
                {"label": "Street Lights", "value": "300+"}
            ]
        },
        {
            "title": "Heritage Conservation",
            "description": "Preservation and restoration of heritage structures in the historic Ballimaran area.",
            "year": "2020-2025",
            "icon": "🏛️",
            "color": "#10b981",
            "stats": {"label": "Heritage Sites", "value": "12", "progress": 75},
            "sub_stats": [
                {"label": "Tourist Footfall", "value": "+50%"},
                {"label": "Restoration Cost", "value": "₹50 Cr"},
                {"label": "New Cafes", "value": "20+"}
            ]
        }
    ],
    
    "promises_kept": [
        {"text": "Paharganj market renovation completed", "completed": True},
        {"text": "New drainage system installed", "completed": True},
        {"text": "Increased police patrolling for safety", "completed": True},
        {"text": "Street lighting improvement", "completed": True},
        {"text": "Community center development", "completed": True}
    ],
    
    "upcoming_projects": [
        {"name": "Paharganj Heritage Walk", "timeline": "2025", "icon": "🚶", "status": "planned"},
        {"name": "New Multi-level Parking", "timeline": "2026", "icon": "🅿️", "status": "planned"},
        {"name": "Tourist Information Center", "timeline": "2025", "icon": "ℹ️", "status": "ongoing"}
    ],
    
    "contact_info": {
        "office": "Ballimaran, Delhi - 110006",
        "phone": "011-23287654",
        "email": "imran.hussain@delhiassembly.gov.in",
        "website": "delhi.gov.in",
        "constituency_office": "Ballimaran Constituency Office, Near Golcha Cinema"
    },
    
    "social_media": {
        "twitter": "@ImranHussainAAP",
        "facebook": "ImranHussainDelhi",
        "instagram": "imranhussain.aap"
    }
}

# MLA Data for Indore-1 Constituency (Sudama Nagar area)
INDORE_MLA = {
    "id": 3,
    "name": "Ramesh Mendola",
    "constituency": "Indore-1",
    "party": "Bharatiya Janata Party (BJP)",
    "party_color": "#FF9933",
    "party_symbol": "🪷",
    "since": "2013",
    "office_address": "Sudama Nagar, Indore - 452008",
    "phone": "0731-1234567",
    "email": "ramesh.mendola@mpvidhansabha.gov.in",
    "website": "mpvidhansabha.nic.in",
    "bio": "Senior BJP leader, multiple-term MLA from Indore-1 constituency. Focus on urban development, education, and local infrastructure in Indore.",
    
    "achievements": [
        {
            "title": "Educational Infrastructure",
            "description": "Established new schools, upgraded existing facilities, and improved educational outcomes in Sudama Nagar area.",
            "year": "2015-2025",
            "icon": "📚",
            "color": "#3b82f6",
            "stats": {"label": "Schools Upgraded", "value": "25+", "progress": 100},
            "sub_stats": [
                {"label": "New Classrooms", "value": "100+"},
                {"label": "Smart Classrooms", "value": "50+"},
                {"label": "Students Benefited", "value": "15,000+"}
            ]
        },
        {
            "title": "Urban Development",
            "description": "Development of parks, community centers, and recreational spaces in Sudama Nagar.",
            "year": "2016-2025",
            "icon": "🏗️",
            "color": "#10b981",
            "stats": {"label": "Parks Developed", "value": "12", "progress": 100},
            "sub_stats": [
                {"label": "Community Halls", "value": "5"},
                {"label": "Sports Complex", "value": "2"},
                {"label": "Walking Tracks", "value": "8 km"}
            ]
        },
        {
            "title": "Road & Drainage",
            "description": "Comprehensive road improvement and drainage system upgrade in Sudama Nagar ward.",
            "year": "2018-2025",
            "icon": "🛣️",
            "color": "#ef4444",
            "stats": {"label": "Roads Built", "value": "30 km", "progress": 95},
            "sub_stats": [
                {"label": "Drainage Lines", "value": "15 km"},
                {"label": "Street Lights", "value": "500+"},
                {"label": "Footpaths", "value": "12 km"}
            ]
        }
    ],
    
    "promises_kept": [
        {"text": "Sudama Nagar Park renovation completed", "completed": True},
        {"text": "New community hall constructed", "completed": True},
        {"text": "Road widening project completed", "completed": True},
        {"text": "Drainage system upgraded", "completed": True},
        {"text": "New school building constructed", "completed": True},
        {"text": "24x7 water supply in area", "completed": True}
    ],
    
    "upcoming_projects": [
        {"name": "Indore Metro Phase 1", "timeline": "2026", "icon": "🚇", "status": "ongoing"},
        {"name": "Smart City Park", "timeline": "2025", "icon": "🌳", "status": "85% complete"},
        {"name": "Multi-purpose Community Center", "timeline": "2025", "icon": "🏛️", "status": "ongoing"}
    ],
    
    "contact_info": {
        "office": "Sudama Nagar, Indore - 452008",
        "phone": "0731-1234567",
        "email": "ramesh.mendola@mpvidhansabha.gov.in",
        "website": "mpvidhansabha.nic.in",
        "constituency_office": "Indore-1 Constituency Office, Sudama Nagar"
    },
    
    "social_media": {
        "twitter": "@RameshMendolaBJP",
        "facebook": "RameshMendolaIndore",
        "instagram": "ramesh.mendola"
    }
}

# Map zone names to their respective MLA data
ZONE_MLA_MAPPING = {
    "Pragati Maidan - Bharat Mandapam": NEW_DELHI_MLA,
    "Paharganj - Main Bazaar": BALLIMARAN_MLA,
    "Sudama Nagar": INDORE_MLA
}

# Also map by approximate coordinates for fallback
ZONE_COORDINATE_MAPPING = [
    {
        "zone_name": "Pragati Maidan - Bharat Mandapam",
        "coordinates": [
            [28.6115, 77.2390],
            [28.6115, 77.2450],
            [28.6175, 77.2450],
            [28.6175, 77.2390],
            [28.6115, 77.2390]
        ],
        "mla": NEW_DELHI_MLA
    },
    {
        "zone_name": "Paharganj - Main Bazaar",
        "coordinates": [
            [28.6450, 77.2100],
            [28.6450, 77.2200],
            [28.6550, 77.2200],
            [28.6550, 77.2100],
            [28.6450, 77.2100]
        ],
        "mla": BALLIMARAN_MLA
    },
    {
        "zone_name": "Sudama Nagar",
        "coordinates": [
            [22.6904, 75.8296],
            [22.6904, 75.8396],
            [22.7004, 75.8396],
            [22.7004, 75.8296],
            [22.6904, 75.8296]
        ],
        "mla": INDORE_MLA
    }
]

class LocationRequest(BaseModel):
    lat: float
    lng: float

@router.get("/mla")
def get_mla():
    """Get MLA data - returns default MLA (New Delhi - Parvesh Verma )"""
    return NEW_DELHI_MLA

@router.post("/mla/by-location")
def get_mla_by_location(data: LocationRequest):
    """Get MLA based on user's location"""
    lat = data.lat
    lng = data.lng
    
    # Check which zone the user is in
    for zone_data in ZONE_COORDINATE_MAPPING:
        if is_point_in_polygon([lat, lng], zone_data["coordinates"]):
            return zone_data["mla"]
    
    # If not in any predefined zone, return default
    return NEW_DELHI_MLA

@router.get("/mla/constituency/{constituency}")
def get_mla_by_constituency(constituency: str):
    """Get MLA by constituency name"""
    constituency_lower = constituency.lower()
    
    if constituency_lower in ["new delhi", "delhi", "new delhi constituency"]:
        return NEW_DELHI_MLA
    elif constituency_lower in ["ballimaran", "paharganj", "ballimaran constituency"]:
        return BALLIMARAN_MLA
    elif constituency_lower in ["indore-1", "indore", "sudama nagar"]:
        return INDORE_MLA
    
    return {"message": "Constituency not found"}

@router.get("/mla/all")
def get_all_mla():
    """Get all MLA data"""
    return {
        "mlas": [
            NEW_DELHI_MLA,
            BALLIMARAN_MLA,
            INDORE_MLA
        ],
        "count": 3
    }