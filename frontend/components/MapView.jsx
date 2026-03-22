// frontend/components/MapView.jsx
"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import "leaflet/dist/leaflet.css"
import { api } from "@/lib/api"

// Dynamically import all Leaflet components to avoid SSR issues
const MapContainer = dynamic(
  () => import("react-leaflet").then((m) => m.MapContainer),
  { ssr: false }
)

const TileLayer = dynamic(
  () => import("react-leaflet").then((m) => m.TileLayer),
  { ssr: false }
)

const Marker = dynamic(
  () => import("react-leaflet").then((m) => m.Marker),
  { ssr: false }
)

const Popup = dynamic(
  () => import("react-leaflet").then((m) => m.Popup),
  { ssr: false }
)

const Polygon = dynamic(
  () => import("react-leaflet").then((m) => m.Polygon),
  { ssr: false }
)

// Custom icon function for different amenity types
const getAmenityIcon = (type, L) => {
  const iconMap = {
    hospital: L.divIcon({
      className: "custom-div-icon",
      html: "🏥",
      iconSize: [30, 30],
      popupAnchor: [0, -15]
    }),
    clinic: L.divIcon({
      className: "custom-div-icon",
      html: "🏥",
      iconSize: [30, 30],
      popupAnchor: [0, -15]
    }),
    school: L.divIcon({
      className: "custom-div-icon",
      html: "📚",
      iconSize: [30, 30],
      popupAnchor: [0, -15]
    }),
    college: L.divIcon({
      className: "custom-div-icon",
      html: "📚",
      iconSize: [30, 30],
      popupAnchor: [0, -15]
    }),
    university: L.divIcon({
      className: "custom-div-icon",
      html: "📚",
      iconSize: [30, 30],
      popupAnchor: [0, -15]
    }),
    park: L.divIcon({
      className: "custom-div-icon",
      html: "🌳",
      iconSize: [30, 30],
      popupAnchor: [0, -15]
    }),
    garden: L.divIcon({
      className: "custom-div-icon",
      html: "🌳",
      iconSize: [30, 30],
      popupAnchor: [0, -15]
    }),
    market: L.divIcon({
      className: "custom-div-icon",
      html: "🛍️",
      iconSize: [30, 30],
      popupAnchor: [0, -15]
    }),
    mall: L.divIcon({
      className: "custom-div-icon",
      html: "🛍️",
      iconSize: [30, 30],
      popupAnchor: [0, -15]
    }),
    bus_stop: L.divIcon({
      className: "custom-div-icon",
      html: "🚌",
      iconSize: [30, 30],
      popupAnchor: [0, -15]
    }),
    metro: L.divIcon({
      className: "custom-div-icon",
      html: "🚇",
      iconSize: [30, 30],
      popupAnchor: [0, -15]
    }),
    airport: L.divIcon({
      className: "custom-div-icon",
      html: "✈️",
      iconSize: [30, 30],
      popupAnchor: [0, -15]
    }),
    monument: L.divIcon({
      className: "custom-div-icon",
      html: "🏛️",
      iconSize: [30, 30],
      popupAnchor: [0, -15]
    }),
    temple: L.divIcon({
      className: "custom-div-icon",
      html: "🛕",
      iconSize: [30, 30],
      popupAnchor: [0, -15]
    }),
    toilet: L.divIcon({
      className: "custom-div-icon",
      html: "🚻",
      iconSize: [30, 30],
      popupAnchor: [0, -15]
    }),
    default: L.divIcon({
      className: "custom-div-icon",
      html: "📍",
      iconSize: [30, 30],
      popupAnchor: [0, -15]
    })
  }
  return iconMap[type] || iconMap.default
}

export default function MapView({ userLocation, zones = [] }) {
  const [leaflet, setLeaflet] = useState(null)
  const [activeZone, setActiveZone] = useState(null)
  const [amenities, setAmenities] = useState([])
  const [loadingAmenities, setLoadingAmenities] = useState(false)

  // Fix Leaflet default marker icons
  useEffect(() => {
    import("leaflet").then((L) => {
      delete L.Icon.Default.prototype._getIconUrl

      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      })

      setLeaflet(L)
    })
  }, [])

  // Fetch amenities from API when location changes
  useEffect(() => {
    if (!userLocation) return

    const fetchAmenities = async () => {
      try {
        setLoadingAmenities(true)
        const data = await api.getNearbyAmenities(userLocation.lat, userLocation.lng, 5, 50)
        setAmenities(data.amenities || [])
        console.log("📍 Amenities loaded for map:", data.amenities?.length)
      } catch (error) {
        console.error("Failed to fetch amenities for map:", error)
      } finally {
        setLoadingAmenities(false)
      }
    }

    fetchAmenities()
  }, [userLocation])

  // Debug: Log zones received from prop
  useEffect(() => {
    console.log("📦 Zones received in MapView from props:", zones.length)
    if (zones.length > 0) {
      zones.forEach((zone, index) => {
        console.log(`Zone ${index + 1} (${zone.name}):`, zone.coordinates?.length, "points")
      })
    }
  }, [zones])

  // Detect which zone the user is in and set active zone
  useEffect(() => {
    if (!userLocation || !leaflet || zones.length === 0) return

    // Point-in-polygon detection function
    const isPointInPolygon = (point, polygon) => {
      const [x, y] = point
      let inside = false
      const n = polygon.length
      
      for (let i = 0, j = n - 1; i < n; j = i++) {
        const [xi, yi] = polygon[i]
        const [xj, yj] = polygon[j]
        
        const intersect = ((yi > y) != (yj > y)) &&
          (x < (xj - xi) * (y - yi) / (yj - yi) + xi)
        
        if (intersect) inside = !inside
      }
      
      return inside
    }

    const userPoint = [userLocation.lat, userLocation.lng]
    let foundZone = null

    // Check each zone to find which one contains the user
    for (const zone of zones) {
      if (zone.coordinates && zone.coordinates.length >= 4) {
        const isInside = isPointInPolygon(userPoint, zone.coordinates)
        if (isInside) {
          foundZone = zone
          console.log(`✅ You are in: ${zone.name}`)
          break
        }
      }
    }

    if (!foundZone) {
      console.log('📍 You are not in any defined zone')
    }

    setActiveZone(foundZone)
  }, [userLocation, zones, leaflet])

  // Add custom CSS for icons after leaflet is loaded
  useEffect(() => {
    if (!leaflet) return
    
    // Add custom CSS for map icons if not already present
    if (typeof document !== "undefined" && !document.querySelector("#map-icons-style")) {
      const style = document.createElement("style")
      style.id = "map-icons-style"
      style.textContent = `
        .custom-div-icon {
          background: white;
          border-radius: 50%;
          border: 2px solid #22c55e;
          width: 30px !important;
          height: 30px !important;
          display: flex !important;
          align-items: center;
          justify-content: center;
          font-size: 18px;
          box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          cursor: pointer;
          transition: transform 0.2s ease;
        }
        .custom-div-icon:hover {
          transform: scale(1.15);
          z-index: 1000;
        }
      `
      document.head.appendChild(style)
    }
  }, [leaflet])

  if (!leaflet) {
    return <p className="text-center py-10">Loading map...</p>
  }

  // Default center (Indore) if no user location
  const center = userLocation
    ? [userLocation.lat, userLocation.lng]
    : [22.6954, 75.8346]

  console.log("🎯 Map center:", center)

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "500px", width: "100%" }}
      scrollWheelZoom={true}
    >
      {/* Base map tiles */}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* User location marker */}
      {userLocation && (
        <Marker position={[userLocation.lat, userLocation.lng]}>
          <Popup>
            <div className="p-1">
              <b className="text-lg">📍 You are here</b>
              <br />
              <span className="text-sm">Lat: {userLocation.lat.toFixed(4)}</span>
              <br />
              <span className="text-sm">Lng: {userLocation.lng.toFixed(4)}</span>
              {activeZone && (
                <>
                  <br />
                  <b className="text-green-500 text-sm">Zone: {activeZone.name}</b>
                </>
              )}
            </div>
          </Popup>
        </Marker>
      )}

      {/* Zones polygons - Lower opacity for non-active zones */}
      {zones.map((zone) => (
        <Polygon
          key={zone.id}
          positions={zone.coordinates}
          pathOptions={{
            color: activeZone?.id === zone.id ? "#22c55e" : (zone.color || "#3b82f6"),
            fillColor: activeZone?.id === zone.id ? "#22c55e" : (zone.color || "#3b82f6"),
            fillOpacity: activeZone?.id === zone.id ? 0.25 : 0.08,  // Lower opacity for non-active
            weight: activeZone?.id === zone.id ? 3 : 1.5,
            opacity: activeZone?.id === zone.id ? 0.8 : 0.4,
          }}
        >
          <Popup>
            <div className="p-1">
              <b className="text-base">{zone.name}</b>
              {zone.description && (
                <>
                  <br />
                  <span className="text-xs text-gray-600">{zone.description}</span>
                </>
              )}
              {activeZone?.id === zone.id && (
                <>
                  <br />
                  <span className="text-green-500 text-xs font-semibold">✓ You are here</span>
                </>
              )}
            </div>
          </Popup>
        </Polygon>
      ))}

      {/* Amenity Icons on Map - Hospitals, Schools, Parks, etc. */}
      {!loadingAmenities && amenities.map((amenity) => {
        const amenityType = amenity.type || "default"
        const icon = getAmenityIcon(amenityType, leaflet)
        
        return (
          <Marker
            key={`amenity-${amenity.id}`}
            position={[amenity.lat, amenity.lng]}
            icon={icon}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">{getAmenityIcon(amenityType, leaflet).options.html}</span>
                  <h3 className="font-bold text-base">{amenity.name}</h3>
                </div>
                {amenity.address && (
                  <p className="text-xs text-gray-600 mb-1">📍 {amenity.address}</p>
                )}
                {amenity.description && (
                  <p className="text-xs text-gray-500 mb-1">{amenity.description}</p>
                )}
                {amenity.rating && (
                  <p className="text-sm mt-1">⭐ {amenity.rating} / 5</p>
                )}
                {amenity.timings && (
                  <p className="text-xs text-gray-500 mt-1">🕐 {amenity.timings}</p>
                )}
                <button
                  onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${amenity.lat},${amenity.lng}`)}
                  className="mt-2 w-full text-xs bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1.5 rounded-full hover:opacity-90 transition"
                >
                  Get Directions
                </button>
              </div>
            </Popup>
          </Marker>
        )
      })}

      {/* Loading indicator for amenities */}
      {loadingAmenities && (
        <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs px-2 py-1 rounded z-[1000]">
          Loading amenities...
        </div>
      )}
    </MapContainer>
  )
}