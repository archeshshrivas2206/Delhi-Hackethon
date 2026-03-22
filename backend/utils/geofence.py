from math import radians, cos, sin, asin, sqrt

def is_inside_geofence(user_lat, user_lon, target_lat, target_lon, radius=2000):
    radius_km = radius / 1000

    lon1, lat1, lon2, lat2 = map(radians, [user_lon, user_lat, target_lon, target_lat])

    dlon = lon2 - lon1
    dlat = lat2 - lat1

    a = sin(dlat/2)**2 + cos(lat1) * cos(lat2) * sin(dlon/2)**2
    c = 2 * asin(sqrt(a))

    distance = 6371 * c

    return distance <= radius_km
def is_point_in_polygon(point, polygon):
    """
    Check if a point is inside a polygon using ray-casting algorithm
    point: [lat, lng]
    polygon: [[lat1, lng1], [lat2, lng2], ...]
    """
    x, y = point
    inside = False
    n = len(polygon)
    
    for i in range(n):
        x1, y1 = polygon[i]
        x2, y2 = polygon[(i + 1) % n]
        
        # Check if point is on the edge
        if (y1 == y2 and y == y1 and min(x1, x2) <= x <= max(x1, x2)):
            return True
        
        # Check if ray crosses the edge
        if ((y1 > y) != (y2 > y)) and (x < (x2 - x1) * (y - y1) / (y2 - y1) + x1):
            inside = not inside
    
    return inside