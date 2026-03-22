/* Check if a point is inside a polygon using ray-casting algorithm
 * @param {Array} point - [lat, lng] coordinates
 * @param {Array} polygon - Array of [lat, lng] coordinates forming a closed polygon
 * @returns {boolean} - True if point is inside polygon
 */
export function isPointInPolygon(point, polygon) {
  const x = point[0]
  const y = point[1]
  let inside = false
  
  for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
    const xi = polygon[i][0]
    const yi = polygon[i][1]
    const xj = polygon[j][0]
    const yj = polygon[j][1]
    
    const intersect = ((yi > y) != (yj > y)) &&
      (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
    
    if (intersect) inside = !inside
  }
  
  return inside
}

/**
 * Find which zone contains the given point
 * @param {Array} point - [lat, lng] coordinates
 * @param {Array} zones - Array of zone objects with coordinates property
 * @returns {Object|null} - The zone object or null if not in any zone
 */
export function findZoneByPoint(point, zones) {
  for (const zone of zones) {
    if (isPointInPolygon(point, zone.coordinates)) {
      return zone
    }
  }
  return null
}

/**
 * Calculate distance between two points in kilometers
 * @param {Array} point1 - [lat, lng]
 * @param {Array} point2 - [lat, lng]
 * @returns {number} - Distance in kilometers
 */
export function calculateDistance(point1, point2) {
  const [lat1, lon1] = point1
  const [lat2, lon2] = point2
  const R = 6371 // Earth's radius in km
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}