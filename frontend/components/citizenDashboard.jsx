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
import { api } from "@/lib/api"

// Category icons mapping for amenities
const categoryIcons = {
  healthcare: "🏥",
  education: "📚",
  transport: "🚌",
  recreation: "🌳",
  shopping: "🛍️",
  facility: "🚻"
}

const categoryColors = {
  healthcare: "bg-red-500",
  education: "bg-blue-500",
  transport: "bg-yellow-500",
  recreation: "bg-green-500",
  shopping: "bg-purple-500",
  facility: "bg-cyan-500"
}

/* -------------------- DATA -------------------- */

const categories = [
  { id: "hospitals", name: "Hospitals", icon: Hospital, color: "bg-red-500" },
  { id: "education", name: "Education", icon: GraduationCap, color: "bg-blue-500" },
  { id: "toilets", name: "Toilets", icon: Droplets, color: "bg-cyan-500" },
  { id: "transport", name: "Transport", icon: Bus, color: "bg-yellow-500" },
  { id: "parks", name: "Parks", icon: Leaf, color: "bg-green-500" },
  { id: "markets", name: "Markets", icon: ShoppingBag, color: "bg-purple-500" },
]

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
  const [currentZone, setCurrentZone] = useState(null)
  const [nearbyAmenities, setNearbyAmenities] = useState([])
  const [selectedAmenityType, setSelectedAmenityType] = useState("all")
  const [zonesList, setZonesList] = useState([])
  const [loading, setLoading] = useState({
    amenities: true,
    zones: true
  })

  /* -------------------- LOCATION -------------------- */
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude
        const lng = pos.coords.longitude
        console.log("📍 YOUR LOCATION:", lat, lng)
        setUserLocation({ lat, lng })
      },
      () => {
        console.log("Using fallback location (Indore)")
        setUserLocation({ lat: 22.6954, lng: 75.8346 })
      }
    )
  }, [])

  // Fetch zones list
  useEffect(() => {
    const fetchZones = async () => {
      try {
        const data = await api.getZones()
        setZonesList(data)
        console.log("📦 Zones loaded:", data.length)
      } catch (error) {
        console.error("Failed to fetch zones:", error)
      } finally {
        setLoading(prev => ({ ...prev, zones: false }))
      }
    }
    fetchZones()
  }, [])

  // Check which zone user is in
  useEffect(() => {
    if (!userLocation || zonesList.length === 0) return

    const findZone = async () => {
      try {
        const zone = await api.getZoneByPoint(userLocation.lat, userLocation.lng)
        if (zone && zone.id) {
          setCurrentZone(zone)
          console.log(`📍 Current zone: ${zone.name}`)
        } else {
          setCurrentZone(null)
        }
      } catch (error) {
        console.error("Failed to find zone:", error)
      }
    }
    findZone()
  }, [userLocation, zonesList])

  // Location check with backend API
  useEffect(() => {
    if (!userLocation) return

    const checkLocation = async () => {
      try {
        const data = await api.checkLocation(userLocation.lat, userLocation.lng)
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
      } catch (error) {
        console.error("Location check failed:", error)
      }
    }

    checkLocation()
  }, [userLocation])

  // Fetch nearby amenities when user location changes
  useEffect(() => {
    if (!userLocation) return

    const fetchAmenities = async () => {
      try {
        setLoading(prev => ({ ...prev, amenities: true }))
        const data = await api.getNearbyAmenities(userLocation.lat, userLocation.lng, 2, 20)
        setNearbyAmenities(data.amenities || [])
        console.log("📍 Amenities fetched:", data.amenities?.length)
      } catch (error) {
        console.error("Failed to fetch amenities:", error)
      } finally {
        setLoading(prev => ({ ...prev, amenities: false }))
      }
    }

    fetchAmenities()
  }, [userLocation])

  // Filter amenities by type
  const filteredAmenities = selectedAmenityType === "all"
    ? nearbyAmenities
    : nearbyAmenities.filter(a => a.category === selectedAmenityType)

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
          <button onClick={() => {
            setShowNotifications(!showNotifications)
            setShowProfileMenu(false)
          }}>
            <Bell />
          </button>

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
                    <div key={n.id} className="p-2 rounded hover:bg-muted transition">
                      {n.text}
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
          
          {showProfileMenu && (
            <div className="absolute right-0 top-10 w-56 bg-card border rounded-xl shadow-lg p-3 z-50">
              <p className="font-semibold">{user?.name || "Guest"}</p>
              <p className="text-xs text-muted-foreground mb-3">{user?.email || "No email"}</p>
              <div className="space-y-2">
                <button onClick={() => setActiveView("profile")} className="w-full text-left text-sm hover:bg-muted p-2 rounded">
                  View Profile
                </button>
                <button onClick={() => setActiveView("setting")} className="w-full text-left text-sm hover:bg-muted p-2 rounded">
                  Settings
                </button>
                <button onClick={() => router.push("/login")} className="w-full text-left text-sm text-red-400 hover:bg-muted p-2 rounded">
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
              }`}>
                <Home /> Dashboard
              </button>

              <button onClick={() => setActiveView("complaint")} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeView === "complaint"
                ? "bg-cyan-500/10 text-cyan-400"
                : "text-muted-foreground hover:bg-muted"
              }`}>
                <FileText /> Complaints
              </button>
              
              <button onClick={() => setActiveView("map")} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeView === "map"
                ? "bg-cyan-500/10 text-cyan-400"
                : "text-muted-foreground hover:bg-muted"
              }`}>
                <MapIcon /> Map
              </button>

              <button onClick={() => setActiveView("zones")} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeView === "zones"
                ? "bg-cyan-500/10 text-cyan-400"
                : "text-muted-foreground hover:bg-muted"
              }`}>
                <MapIcon /> Development Zones
              </button>

              <button className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeView === "setting"
                ? "bg-cyan-500/10 text-cyan-400"
                : "text-muted-foreground hover:bg-muted"
              }`}>
                <Settings /> Settings
              </button>
            </nav>
            
            {/* Categories with counts */}
            <div className="mt-6">
              <p className="text-sm mb-2 text-muted-foreground">Nearby</p>
              {[
                { id: "all", name: "All Places", icon: MapPin, category: "all" },
                { id: "healthcare", name: "Hospitals", icon: Hospital, category: "healthcare" },
                { id: "education", name: "Education", icon: GraduationCap, category: "education" },
                { id: "transport", name: "Transport", icon: Bus, category: "transport" },
                { id: "recreation", name: "Parks", icon: Leaf, category: "recreation" },
                { id: "shopping", name: "Markets", icon: ShoppingBag, category: "shopping" }
              ].map((cat) => {
                const Icon = cat.icon
                const count = cat.id === "all" 
                  ? nearbyAmenities.length 
                  : nearbyAmenities.filter(a => a.category === cat.category).length
                
                return (
                  <button
                    key={cat.id}
                    onClick={() => {
                      if (cat.id === "all") {
                        setSelectedAmenityType("all")
                      } else {
                        setSelectedAmenityType(cat.category)
                      }
                      setActiveView("places")
                    }}
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                      activeView === cat.id
                        ? "bg-cyan-500/10 text-cyan-400"
                        : "text-muted-foreground hover:bg-muted"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4" />
                      <span>{cat.name}</span>
                    </div>
                    {count > 0 && (
                      <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                        {count}
                      </span>
                    )}
                  </button>
                )
              })}
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
              {/* Current Zone Card */}
              {currentZone && (
                <div className="mb-6 p-4 rounded-xl border-2 border-green-500 bg-green-500/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-green-400 font-semibold">Current Zone</p>
                      <h2 className="text-xl font-bold text-green-400">{currentZone.name}</h2>
                      {currentZone.description && (
                        <p className="text-sm text-gray-400 mt-1">{currentZone.description}</p>
                      )}
                    </div>
                    <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                      <MapPin className="w-6 h-6 text-green-400" />
                    </div>
                  </div>
                  <div className="mt-4 grid grid-cols-3 gap-2">
                    <button onClick={() => setActiveView("map")} className="text-xs px-3 py-2 bg-green-500/20 rounded-lg text-green-400 hover:bg-green-500/30 transition">
                      View on Map
                    </button>
                    <button onClick={() => setActiveView("complaint")} className="text-xs px-3 py-2 bg-green-500/20 rounded-lg text-green-400 hover:bg-green-500/30 transition">
                      Report Issue
                    </button>
                    <button onClick={() => setActiveView("zones")} className="text-xs px-3 py-2 bg-green-500/20 rounded-lg text-green-400 hover:bg-green-500/30 transition">
                      Zone Details
                    </button>
                  </div>
                </div>
              )}

              {/* Nearby Development Projects */}
              {geoResult?.inside && geoResult.projects?.length > 0 && (
                <div className="mb-4 p-4 rounded-xl border border-emerald-500 bg-emerald-500/10">
                  <p className="text-emerald-400 font-semibold mb-2">
                    📍 Nearby Development Projects
                  </p>
                  {geoResult.projects.map((p, i) => (
                    <div key={i} className="text-sm mb-2 pb-2 border-b border-emerald-500/20 last:border-0">
                      <p className="font-semibold">{p.name}</p>
                      <p className="text-gray-400 text-xs">{p.description}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* HEADER */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Citizen Dashboard</h1>
                  <p className="text-muted-foreground mt-1">Explore services and report issues in your area</p>
                </div>
                <button onClick={() => setActiveView("map")} className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl">
                  <MapIcon className="w-5 h-5" />
                  Open Map
                </button>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                {[
                  { label: "Nearby Places", value: loading.amenities ? "..." : nearbyAmenities.length.toString(), icon: MapPin },
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
                {/* Nearby Amenities - Real Data */}
                <div className="bg-card border rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">📍 Nearby Amenities</h3>
                    <button 
                      onClick={() => setActiveView("places")}
                      className="text-xs text-cyan-400 hover:text-cyan-300"
                    >
                      View All
                    </button>
                  </div>

                  <div className="space-y-3">
                    {loading.amenities ? (
                      <p className="text-center text-muted-foreground py-4">Loading amenities...</p>
                    ) : nearbyAmenities.length === 0 ? (
                      <p className="text-center text-muted-foreground py-4">No amenities found nearby</p>
                    ) : (
                      nearbyAmenities.slice(0, 3).map((amenity) => (
                        <div
                          key={amenity.id}
                          className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition cursor-pointer"
                          onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${amenity.lat},${amenity.lng}`)}
                        >
                          <div className={`w-10 h-10 rounded-lg ${categoryColors[amenity.category]} flex items-center justify-center text-white text-xl`}>
                            {categoryIcons[amenity.category]}
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">{amenity.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {amenity.distance} km • {amenity.address || amenity.type}
                            </p>
                          </div>
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              window.open(`https://www.google.com/maps/search/?api=1&query=${amenity.lat},${amenity.lng}`)
                            }}
                            className="text-xs text-cyan-400"
                          >
                            Directions
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                {/* Your Complaints */}
                <div className="bg-card border rounded-xl p-5">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">Your Complaints</h3>
                    <button 
                      onClick={() => setActiveView("complaint")}
                      className="text-xs text-cyan-400 hover:text-cyan-300"
                    >
                      + New
                    </button>
                  </div>

                  <div className="space-y-3">
                    {[
                      { title: "Water issue", status: "pending", date: "2 days ago" },
                      { title: "Garbage issue", status: "resolved", date: "5 days ago" },
                    ].map((c, i) => (
                      <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                        <div>
                          <p className="text-sm font-medium">{c.title}</p>
                          <p className="text-xs text-muted-foreground">{c.date}</p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${c.status === "resolved" ? "bg-emerald-500/20 text-emerald-400" : "bg-amber-500/20 text-amber-400"}`}>
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
              <MapView userLocation={userLocation} zones={zonesList} />
            </div>
          )}
          
          {/* ================= COMPLAINT ================= */}
          {activeView === "complaint" && (
            <ReportIssueForm userLocation={userLocation} />
          )}

          {/* ================= ZONES ================= */}
          {activeView === "zones" && (
            <>
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold">Development Zones</h1>
                {currentZone && (
                  <div className="px-3 py-1 bg-green-500/20 rounded-full text-green-400 text-sm">
                    Current: {currentZone.name}
                  </div>
                )}
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {zonesList.map((zone) => (
                  <div
                    key={zone.id}
                    className={`border rounded-xl p-5 transition-all cursor-pointer hover:shadow-lg ${currentZone?.id === zone.id ? 'border-green-500 bg-green-500/5 shadow-lg shadow-green-500/20' : 'border-gray-700 bg-card'}`}
                    onClick={() => setActiveView("map")}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-lg">{zone.name}</h3>
                      {currentZone?.id === zone.id && (
                        <span className="text-xs px-2 py-1 bg-green-500/20 rounded-full text-green-400">Current</span>
                      )}
                    </div>
                    {zone.description && <p className="text-sm text-muted-foreground mb-3">{zone.description}</p>}
                  </div>
                ))}
              </div>
            </>
          )}

          {/* ================= PLACES ================= */}
          {activeView === "places" && (
            <>
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold">Nearby Amenities</h1>
                  <p className="text-muted-foreground mt-1">
                    {selectedAmenityType === "all" ? "All amenities near you" : `${selectedAmenityType} facilities near you`}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => setSelectedAmenityType("all")} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${selectedAmenityType === "all" ? "bg-cyan-500 text-white" : "bg-muted hover:bg-muted/80"}`}>
                    All
                  </button>
                  <button onClick={() => setSelectedAmenityType("healthcare")} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${selectedAmenityType === "healthcare" ? "bg-red-500 text-white" : "bg-muted hover:bg-muted/80"}`}>
                    🏥 Hospitals
                  </button>
                  <button onClick={() => setSelectedAmenityType("education")} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${selectedAmenityType === "education" ? "bg-blue-500 text-white" : "bg-muted hover:bg-muted/80"}`}>
                    📚 Schools
                  </button>
                  <button onClick={() => setSelectedAmenityType("transport")} className={`px-4 py-2 rounded-lg text-sm font-medium transition ${selectedAmenityType === "transport" ? "bg-yellow-500 text-white" : "bg-muted hover:bg-muted/80"}`}>
                    🚌 Transport
                  </button>
                </div>
              </div>

              {/* Search */}
              <div className="relative mb-6">
                <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search places..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 p-3 bg-card border rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
                />
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAmenities
                  .filter(amenity => searchQuery === "" || amenity.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((amenity) => (
                    <div
                      key={amenity.id}
                      className="bg-card border rounded-xl p-4 hover:shadow-lg transition cursor-pointer"
                      onClick={() => window.open(`https://www.google.com/maps/search/?api=1&query=${amenity.lat},${amenity.lng}`)}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-12 h-12 rounded-lg ${categoryColors[amenity.category]} flex items-center justify-center text-white text-xl`}>
                          {categoryIcons[amenity.category]}
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{amenity.name}</h3>
                          <p className="text-xs text-muted-foreground mt-1">{amenity.address || amenity.description}</p>
                          <div className="flex items-center justify-between mt-3">
                            <span className="text-xs text-cyan-400 font-mono">{amenity.distance} km away</span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                window.open(`https://www.google.com/maps/search/?api=1&query=${amenity.lat},${amenity.lng}`)
                              }}
                              className="text-xs bg-cyan-500/20 px-3 py-1 rounded-full text-cyan-400 hover:bg-cyan-500/30"
                            >
                              Get Directions
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
              
              {filteredAmenities.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No amenities found</p>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  )
}