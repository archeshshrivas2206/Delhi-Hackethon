// frontend/lib/api.js
const API_BASE = 'http://localhost:8000/api'

export const api = {
  // Location check (your existing endpoint)
  checkLocation: async (lat, lng) => {
    const res = await fetch(`${API_BASE}/check-location`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_lat: lat, user_lon: lng })
    })
    return res.json()
  },
  
  // Zones
  getZones: async () => {
    const res = await fetch(`${API_BASE}/zones`)
    return res.json()
  },
  
  getZoneByPoint: async (lat, lng) => {
    const res = await fetch(`${API_BASE}/zones/point`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lng })
    })
    return res.json()
  },
  
  // Amenities
  getNearbyAmenities: async (lat, lng, radius = 2, limit = 20) => {
    const res = await fetch(`${API_BASE}/amenities/nearby`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ lat, lng, radius, limit })
    })
    return res.json()
  },
  
  getAmenitiesByCategory: async (category) => {
    const res = await fetch(`${API_BASE}/amenities/category/${category}`)
    return res.json()
  }
}