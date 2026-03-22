// frontend/components/MapView.jsx
"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import "leaflet/dist/leaflet.css"
import { zones } from "@/lib/zones"

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

// IMPORTANT: Polygon must be dynamically imported too
const Polygon = dynamic(
  () => import("react-leaflet").then((m) => m.Polygon),
  { ssr: false }
)

export default function MapView({ userLocation }) {
  const [leaflet, setLeaflet] = useState(null)
  const [activeZone, setActiveZone] = useState(null) // Track which zone user is in

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

  // Debug: Log zones to console
  useEffect(() => {
    console.log("📦 Zones loaded in MapView:", zones)
    console.log("Number of zones:", zones.length)
    zones.forEach((zone, index) => {
      console.log(`Zone ${index + 1} (${zone.name}):`, zone.coordinates)
      const firstPoint = zone.coordinates[0]
      const lastPoint = zone.coordinates[zone.coordinates.length - 1]
      console.log(`  Is polygon closed?`,
        firstPoint[0] === lastPoint[0] && firstPoint[1] === lastPoint[1]
      )
    })
  }, [])

  // Detect which zone the user is in and set active zone
  useEffect(() => {
    if (!userLocation || !leaflet) return

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
  }, [userLocation, leaflet])

  if (!leaflet) {
    return <p className="text-center py-10">Loading map...</p>
  }

  // Default center (Delhi) if no user location
  const center = userLocation
    ? [userLocation.lat, userLocation.lng]
    : [28.6139, 77.2090]

  console.log("🎯 Map center:", center)

  return (
    <MapContainer
      center={center}
      zoom={14} // Zoom level to see zones clearly
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
            <br />
            ID: {zone.id}
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