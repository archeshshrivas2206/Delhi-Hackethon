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