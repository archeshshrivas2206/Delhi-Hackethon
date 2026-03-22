// frontend/components/MapView.jsx
"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import "leaflet/dist/leaflet.css"

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

export default function MapView({ userLocation, zones = [] }) {  // ← Added zones as prop with default empty array
  const [leaflet, setLeaflet] = useState(null)
  const [activeZone, setActiveZone] = useState(null)

  // Fix Leaflet default marker icons
  useEffect(() => {
    import("leaflet").then((L) => {
      delete L.Icon.Default.prototype._getIconUrl

      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      })

      setLeaflet(L)
    })
  }, [])

  // Debug: Log zones received from prop
  useEffect(() => {
    console.log("📦 Zones received in MapView from props:", zones)
    console.log("Number of zones:", zones.length)
    if (zones.length > 0) {
      zones.forEach((zone, index) => {
        console.log(`Zone ${index + 1} (${zone.name}):`, zone.coordinates)
      })
    } else {
      console.log("⚠️ No zones passed to MapView")
    }
  }, [zones])

  // Detect which zone the user is in and set active zone
  useEffect(() => {
    if (!userLocation || !leaflet || zones.length === 0) return

    // Point-in-polygon detection function
    const isPointInPolygon = (point, polygon) => {
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

    const userPoint = [userLocation.lat, userLocation.lng]
    let foundZone = null

    // Check each zone to find which one contains the user
    for (const zone of zones) {
      const isInside = isPointInPolygon(userPoint, zone.coordinates)
      if (isInside) {
        foundZone = zone
        console.log(`✅ You are in: ${zone.name}`)
        if (zone.description) {
          console.log(`   Description: ${zone.description}`)
        }
        break
      }
    }

    if (!foundZone) {
      console.log('📍 You are not in any defined zone')
    }

    setActiveZone(foundZone)
  }, [userLocation, zones, leaflet])

  if (!leaflet) {
    return <p className="text-center py-10">Loading map...</p>
  }

  // Default center (Indore) if no user location
  const center = userLocation
    ? [userLocation.lat, userLocation.lng]
    : [22.6954, 75.8346]  // ← Changed to Indore coordinates

  console.log("🎯 Map center:", center)

  return (
    <MapContainer
      center={center}
      zoom={14}
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
            <b>📍 You are here</b>
            <br />
            Lat: {userLocation.lat.toFixed(4)}
            <br />
            Lng: {userLocation.lng.toFixed(4)}
            {activeZone && (
              <>
                <br />
                <b className="text-green-500">Zone: {activeZone.name}</b>
              </>
            )}
          </Popup>
        </Marker>
      )}

      {/* Zones polygons - with active zone highlighting */}
      {zones.map((zone) => (
        <Polygon
          key={zone.id}
          positions={zone.coordinates}
          pathOptions={{
            color: activeZone?.id === zone.id ? "#22c55e" : (zone.color || "#3b82f6"),
            fillColor: activeZone?.id === zone.id ? "#22c55e" : (zone.fillColor || "#3b82f6"),
            fillOpacity: activeZone?.id === zone.id ? 0.5 : 0.3,
            weight: activeZone?.id === zone.id ? 3 : 2,
            opacity: 0.8
          }}
        >
          <Popup>
            <b>{zone.name}</b>
            {zone.description && (
              <>
                <br />
                <span className="text-sm text-gray-600">{zone.description}</span>
              </>
            )}
            {activeZone?.id === zone.id && (
              <>
                <br />
                <span className="text-green-500 font-semibold">✓ You are here</span>
              </>
            )}
          </Popup>
        </Polygon>
      ))}
    </MapContainer>
  )
}