"use client"

import dynamic from "next/dynamic"
import { useEffect, useState } from "react"
import "leaflet/dist/leaflet.css"

// ✅ Load components without SSR
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
const Circle = dynamic(
  () => import("react-leaflet").then((m) => m.Circle),
  { ssr: false }
)

export default function MapView({ userLocation, projects }) {
  const [leaflet, setLeaflet] = useState(null)

  // ✅ Load Leaflet ONLY on client
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

  if (!userLocation || !leaflet) {
    return <p className="text-center">Loading map...</p>
  }

  // ✅ Safe icon creation
  const userIcon = new leaflet.Icon({
    iconUrl: "https://cdn-icons-png.flaticon.com/512/64/64113.png",
    iconSize: [30, 30],
  })

  return (
    <MapContainer
      center={[userLocation.lat, userLocation.lng]}
      zoom={15}
      style={{ height: "500px", width: "100%" }}
    >
      <TileLayer
        attribution="&copy; OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {/* 🔵 USER */}
      <Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
        <Popup>You are here</Popup>
      </Marker>

      {/* 📍 PROJECTS */}
      {projects?.map((p, i) => (
        <div key={i}>
          <Marker position={[p.lat, p.lon]}>
            <Popup>
              <b>{p.name}</b>
              <br />
              {p.description}
            </Popup>
          </Marker>

          <Circle
            center={[p.lat, p.lon]}
            radius={p.radius || 2000}
            pathOptions={{ color: "green" }}
          />
        </div>
      ))}
    </MapContainer>
  )
}