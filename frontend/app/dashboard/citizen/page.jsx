"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  MapPin, Search, Bell, User, LogOut, Menu, X,
  Hospital, GraduationCap, Droplets, Bus, Leaf,
  ShoppingBag, Map as MapIcon, Home, FileText, Settings,
  CheckCircle, Clock
} from "lucide-react"
import ReportIssueForm from "@/components/ReportIssueForm"
import toast from "react-hot-toast"
import MapView from "@/components/MapView"
/* -------------------- DATA -------------------- */

const categories = [
  { id: "hospitals", name: "Hospitals", icon: Hospital, color: "bg-red-500" },
  { id: "education", name: "Education", icon: GraduationCap, color: "bg-blue-500" },
  { id: "toilets", name: "Toilets", icon: Droplets, color: "bg-cyan-500" },
  { id: "transport", name: "Transport", icon: Bus, color: "bg-yellow-500" },
  { id: "parks", name: "Parks", icon: Leaf, color: "bg-green-500" },
  { id: "markets", name: "Markets", icon: ShoppingBag, color: "bg-purple-500" },
]

const developmentZones = [
  { id: 1, name: "Sector 15 Development", status: "completed", progress: 100 },
  { id: 2, name: "Smart City Zone A", status: "ongoing", progress: 65 },
  { id: 3, name: "Water Supply Project", status: "ongoing", progress: 45 },
]

const nearbyPlaces = {
  hospitals: [
    { id: 1, name: "City Hospital", distance: "0.8 km" },
    { id: 2, name: "Apollo Clinic", distance: "1.2 km" },
  ],
  education: [
    { id: 1, name: "Govt School", distance: "0.5 km" },
  ],
  toilets: [
    { id: 1, name: "Public Toilet", distance: "0.2 km" },
  ],
}

/* -------------------- COMPONENT -------------------- */

export default function CitizenDashboard() {
  const router = useRouter()

  const [activeView, setActiveView] = useState("dashboard")
  const [selectedCategory, setSelectedCategory] = useState("hospitals")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [userLocation, setUserLocation] = useState(null)
  const [geoResult, setGeoResult] = useState(null)
  const [user, setUser] = useState(null)
  const [showProfileMenu, setShowProfileMenu] = useState(false)
  const [showNotifications, setShowNotifications] = useState(false)
  const [notifications, setNotifications] = useState([
    { id: 1, text: "Complaint resolved", read: false },
    { id: 2, text: "New project near you", read: false }
  ])

  /* -------------------- LOCATION -------------------- */
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      (pos) => {
        setUserLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude
        })
      },
      () => {
        setUserLocation({ lat: 28.6139, lng: 77.2090 }) // fallback Delhi
      }
    )
  }, [])
  useEffect(() => {
    if (!userLocation) return

    fetch("http://localhost:8000/api/check-location", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        user_lat: userLocation.lat,
        user_lon: userLocation.lng
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("Geo Result:", data)
        setGeoResult(data)

        if (data.inside && data.projects?.length > 0) {
          data.projects.forEach((p) => {
            toast.success(`📍 ${p.name}`, {
              description: p.description,
              duration: 5000,
              style: {
                background: "#0f172a",
                color: "#22c55e",
                border: "1px solid #22c55e"
              }
            })
          })
        }
      })
      .catch(err => console.error(err))

  }, [userLocation])

  const places = nearbyPlaces[selectedCategory] || []
  const CategoryIcon =
    categories.find(c => c.id === selectedCategory)?.icon || Hospital

    useEffect(() => {
  const storedUser = localStorage.getItem("user")
  if (storedUser) {
    setUser(JSON.parse(storedUser))
  }
}, [])

  return (
    <div className="h-screen flex flex-col">

      {/* ---------------- NAVBAR ---------------- */}
      <nav className="h-16 flex justify-between items-center px-4 border-b">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X /> : <Menu />}
          </button>
          <span className="font-bold">CivicGov</span>
        </div>

        <div className="flex gap-3 relative">

          {/* 🔔 Notification Button */}
          <button onClick={() => {
            setShowNotifications(!showNotifications)
            setShowProfileMenu(false)
          }}>
            <Bell />
          </button>

          {/* 👤 Profile Button */}
          <button onClick={() => {
            setShowProfileMenu(!showProfileMenu)
            setShowNotifications(false)
          }}>
            <User />
          </button>
          <button onClick={() => router.push("/login")}>
            <LogOut />
          </button>
          {showNotifications && (
            <div className="absolute right-12 top-10 w-72 bg-card border rounded-xl shadow-lg p-4 z-50">
              <h4 className="font-semibold mb-2">Notifications</h4>

              <div className="space-y-2 text-sm">
                {notifications.length === 0 ? (
                  <p className="text-muted-foreground">No notifications</p>
                ) : (
                  notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-2 rounded hover:bg-muted transition"
                    >
                      {n.text}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
          {showProfileMenu && (
            <div className="absolute right-0 top-10 w-56 bg-card border rounded-xl shadow-lg p-3 z-50">

              <p className="font-semibold">
                {user?.name || "Guest"}
              </p>
              <p className="text-xs text-muted-foreground mb-3">
                {user?.email || "No email"}
              </p>

              <div className="space-y-2">
                <button
                  onClick={() => setActiveView("profile")}
                  className="w-full text-left text-sm hover:bg-muted p-2 rounded"
                >
                  View Profile
                </button>

                <button
                  onClick={() => setActiveView("setting")}
                  className="w-full text-left text-sm hover:bg-muted p-2 rounded"
                >
                  Settings
                </button>

                <button
                  onClick={() => router.push("/login")}
                  className="w-full text-left text-sm text-red-400 hover:bg-muted p-2 rounded"
                >
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      <div className="flex flex-1">

        {/* ---------------- SIDEBAR ---------------- */}
        {sidebarOpen && (
          <aside className="w-64 border-r p-4 space-y-2">
            <nav className="space-y-1">
              <button onClick={() => setActiveView("dashboard")} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeView === "dashboard"
                ? "bg-cyan-500/10 text-cyan-400"
                : "text-muted-foreground hover:bg-muted"
                }`} >
                <Home /> Dashboard
              </button>

              <button
                onClick={() => setActiveView("complaint")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeView === "complaint"
                  ? "bg-cyan-500/10 text-cyan-400"
                  : "text-muted-foreground hover:bg-muted"
                  }`}
              >
                <FileText /> Complaints
              </button>
              <button
                onClick={() => setActiveView("map")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeView === "map"
                  ? "bg-cyan-500/10 text-cyan-400"
                  : "text-muted-foreground hover:bg-muted"
                  }`}
              >
                <MapIcon /> Map
              </button>

              <button
                onClick={() => {
                  setActiveView("zones")
                }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeView === "zones"
                  ? "bg-cyan-500/10 text-cyan-400"
                  : "text-muted-foreground hover:bg-muted"
                  }`}
              >
                <MapIcon /> Development Zones
              </button>

              <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeView === "setting"
                ? "bg-cyan-500/10 text-cyan-400"
                : "text-muted-foreground hover:bg-muted"
                }`}>
                <Settings /> Settings
              </button>
            </nav>
            {/* Categories */}
            <div className="mt-6">
              <p className="text-sm mb-2">Nearby</p>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id)
                    setActiveView("places")
                  }}
                  className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeView === `${cat.id}`
                    ? "bg-cyan-500/10 text-cyan-400"
                    : "text-muted-foreground hover:bg-muted"
                    }`}
                >
                  <cat.icon /> {cat.name}
                </button>
              ))}
            </div>
          </aside>
        )}

        {/* ---------------- MAIN ---------------- */}

        <main className="flex-1 p-6 overflow-auto">
          {activeView === "profile" && (
            <div className="max-w-xl mx-auto bg-card border rounded-xl p-6">
              <h2 className="text-xl font-bold mb-4">My Profile</h2>

              <div className="space-y-3">
                <p><b>Name:</b> {user?.name || "Guest"}</p>
                <p><b>Email:</b> {user?.email || "No email"}</p>
                <p><b>Location:</b> {userLocation?.lat}, {userLocation?.lng}</p>
              </div>
            </div>
          )}

          {/* ================= DASHBOARD ================= */}
          {activeView === "dashboard" && (
            <>
              {geoResult?.inside && geoResult.projects?.length > 0 && (
                <div className="mb-4 p-4 rounded-xl border border-emerald-500 bg-emerald-500/10">
                  <p className="text-emerald-400 font-semibold mb-2">
                    📍 Nearby Development Projects
                  </p>

                  {geoResult.projects.map((p, i) => (
                    <div key={i} className="text-sm mb-1">
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-gray-400">{p.description}</p>

                    </div>
                  ))}
                </div>
              )}

              {/* HEADER */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    Citizen Dashboard
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Explore services and report issues in your area
                  </p>
                </div>

                <button
                  onClick={() => setActiveView("map")}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl"
                >
                  <MapIcon className="w-5 h-5" />
                  Open Map
                </button>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Nearby Places", value: "20+", icon: MapPin },
                  { label: "Complaints", value: "5", icon: FileText },
                  { label: "Resolved", value: "3", icon: CheckCircle },
                  { label: "Pending", value: "2", icon: Clock },
                ].map((stat, i) => {
                  const Icon = stat.icon
                  return (
                    <div key={i} className="bg-card border rounded-xl p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-muted">
                          <Icon className="w-5 h-5 text-cyan-400" />
                        </div>
                        <div>
                          <p className="text-xl font-bold">{stat.value}</p>
                          <p className="text-xs text-muted-foreground">{stat.label}</p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* MAIN GRID */}
              <div className="grid lg:grid-cols-2 gap-6">

                {/* Nearby Services */}
                <div className="bg-card border rounded-xl p-5">
                  <h3 className="text-lg font-semibold mb-4">
                    Nearby Services
                  </h3>

                  <div className="space-y-3">
                    {places.slice(0, 3).map((place) => (
                      <div
                        key={place.id}
                        className="flex items-center gap-3 p-3 rounded-lg bg-muted/50"
                      >
                        <MapPin className="w-4 h-4 text-cyan-400" />

                        <div className="flex-1">
                          <p className="text-sm font-medium">{place.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {place.distance}
                          </p>
                        </div>

                        <button
                          onClick={() =>
                            window.open(
                              `https://www.google.com/maps/search/?api=1&query=${place.name}`
                            )
                          }
                          className="text-xs text-cyan-400"
                        >
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Complaints */}
                <div className="bg-card border rounded-xl p-5">
                  <h3 className="text-lg font-semibold mb-4">
                    Your Complaints
                  </h3>

                  <div className="space-y-3">
                    {[
                      { title: "Water issue", status: "pending" },
                      { title: "Garbage issue", status: "resolved" },
                    ].map((c, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                      >
                        <p className="text-sm">{c.title}</p>

                        <span
                          className={`text-xs px-2 py-1 rounded-full ${c.status === "resolved"
                            ? "bg-emerald-500/20 text-emerald-400"
                            : "bg-amber-500/20 text-amber-400"
                            }`}
                        >
                          {c.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </>
          )}
          {/* ================= MAP ================= */}
          {activeView === "map" && (
            <div className="h-[500px] rounded-xl overflow-hidden border">
              <MapView
                userLocation={userLocation}
                projects={geoResult?.projects}
              />
            </div>
          )}
          {/* ================= COMPLAINT ================= */}
          {activeView === "complaint" && (
            <ReportIssueForm userLocation={userLocation} />
          )}

          {/* ================= ZONES ================= */}
          {activeView === "zones" && (
            <>
              <h1 className="text-2xl font-bold mb-4">Development Zones</h1>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {developmentZones.map((zone) => (
                  <div
                    key={zone.id}
                    className="bg-card border rounded-xl p-5"
                  >
                    <h3 className="font-semibold">{zone.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {zone.description}
                    </p>

                    <div className="mt-3 h-2 bg-muted rounded">
                      <div
                        className="h-full bg-cyan-500"
                        style={{ width: `${zone.progress}%` }}
                      />
                    </div>

                    <p className="text-xs mt-2">{zone.progress}% completed</p>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ================= PLACES ================= */}
          {activeView === "places" && (
            <>
              <h1 className="text-2xl font-bold mb-4">
                Nearby {categories.find(c => c.id === selectedCategory)?.name}
              </h1>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-3 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search places..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 p-2 border rounded"
                />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {places.map((place) => (
                  <div key={place.id} className="p-4 border rounded-xl">
                    <h3>{place.name}</h3>
                    <p className="text-sm text-muted-foreground">
                      {place.distance}
                    </p>

                    <button
                      onClick={() =>
                        window.open(
                          `https://www.google.com/maps/search/?api=1&query=${place.name}`
                        )
                      }
                      className="mt-3 text-sm text-blue-500"
                    >
                      Get Directions
                    </button>
                  </div>
                ))}
              </div>
            </>
          )}

        </main>
      </div>
    </div>
  )
}
