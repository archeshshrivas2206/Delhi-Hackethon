"use client"

import { useState, useEffect, useRef } from "react"
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
import NotificationCenter from "@/components/dashboard/NotificationCenter"
import ZoneCard from "@/components/dashboard/ZoneCard"

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
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)
  const [notificationCenterOpen, setNotificationCenterOpen] = useState(false)
  const [notifications, setNotifications] = useState([
    {
      id: "init-1",
      text: "✅ Complaint #123 has been resolved",
      type: "complaint",
      read: false,
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
    },
    {
      id: "init-2",
      text: "📍 New project 'Smart City Development' near your area",
      type: "project",
      read: false,
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    }
  ])
  const [currentZone, setCurrentZone] = useState(null)
  const [nearbyAmenities, setNearbyAmenities] = useState([])
  const [selectedAmenityType, setSelectedAmenityType] = useState("all")
  const [zonesList, setZonesList] = useState([])
  const [loading, setLoading] = useState({
    amenities: true,
    zones: true
  })

  const navRef = useRef(null)

  // Add notification function with unique ID
  const addNotification = (message, type = "info", link = null) => {
    const newNotification = {
      id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      text: message,
      type,
      link,
      timestamp: new Date().toISOString(),
      read: false
    }
    setNotifications(prev => [newNotification, ...prev])
  }

  // Mark notification as read
  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  // Clear all notifications
  const clearAllNotifications = () => {
    setNotifications([])
  }

  // Mark all as read (from teammate's dropdown)
  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  // Handle click outside for dropdowns
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setShowNotifications(false)
        setShowProfileMenu(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

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

  // Add notification when entering zone - PREVENT DUPLICATES
  useEffect(() => {
    if (currentZone) {
      const existingZoneNotification = notifications.some(
        n => n.text?.includes(currentZone.name) && n.type === "zone" && 
             (Date.now() - new Date(n.timestamp).getTime() < 10000)
      )
      if (!existingZoneNotification) {
        addNotification(
          `📍 You entered ${currentZone.name}`,
          "zone",
          "/dashboard/citizen?view=map"
        )
      }
    }
  }, [currentZone])

  // Location check with backend API
  useEffect(() => {
    if (!userLocation) return

    const checkLocation = async () => {
      try {
        const data = await api.checkLocation(userLocation.lat, userLocation.lng)
        console.log("Geo Result:", data)
        setGeoResult(data)

        if (data.inside && data.projects?.length > 0) {
          const existingProjectNotifications = notifications
            .filter(n => n.type === "project")
            .map(n => n.text)
          
          data.projects.forEach((p) => {
            const notificationText = `🏗️ ${p.name}: ${p.description}`
            
            const alreadyNotified = existingProjectNotifications.some(
              text => text.includes(p.name)
            )
            
            if (!alreadyNotified) {
              toast.success(`📍 ${p.name}`, {
                description: p.description,
                duration: 5000,
                style: {
                  background: "#0f172a",
                  color: "#22c55e",
                  border: "1px solid #22c55e"
                }
              })
              addNotification(
                notificationText,
                "project",
                "/dashboard/citizen?view=map"
              )
            }
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
    } else {
      router.replace("/login")
    }
  }, [router])

  return (
    <div className="h-screen flex flex-col">

      {/* ---------------- NAVBAR ---------------- */}
      <nav className="h-16 flex justify-between items-center px-4 border-b">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X /> : <Menu />}
          </button>
          <span className="font-bold text-4xl">Civic Gov</span>
        </div>

        <div ref={navRef} className="flex gap-3 relative items-center">

          {/* Notification Bell with Badge */}
          <button
            className="p-2 hover:bg-muted rounded-full transition-colors relative"
            onClick={() => {
              setNotificationCenterOpen(true)
              setShowProfileMenu(false)
              setShowNotifications(false)
            }}
          >
            <Bell size={28} className="text-muted-foreground hover:text-cyan-500 transition-colors" />
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center border-2 border-background">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </button>

          {/* Profile Button */}
          <button
            className="p-2 hover:bg-muted rounded-full transition-colors"
            onClick={() => {
              setShowProfileMenu(!showProfileMenu)
              setNotificationCenterOpen(false)
              setShowNotifications(false)
            }}
          >
            <User size={28} className="text-muted-foreground hover:text-cyan-500 transition-colors" />
          </button>

          {/* Notification Dropdown (teammate's feature) */}
          {showNotifications && (
            <div className="absolute right-12 top-10 w-80 bg-card border border-border shadow-lg rounded-xl overflow-hidden z-50">
              <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
                <h3 className="font-semibold text-foreground">Notifications</h3>
                <span
                  className="text-xs text-cyan-500 font-medium cursor-pointer"
                  onClick={markAllAsRead}
                >
                  Mark all as read
                </span>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                <div className="space-y-1 p-2">
                  {notifications.length === 0 ? (
                    <p className="text-muted-foreground text-sm p-2 text-center">No notifications</p>
                  ) : (
                    notifications.map((n) => (
                      <div
                        key={n.id}
                        className={`p-3 rounded-lg hover:bg-muted/50 transition cursor-pointer text-sm ${!n.read ? 'font-medium bg-muted/30' : ''}`}
                        onClick={() => markAsRead(n.id)}
                      >
                        {n.text}
                      </div>
                    ))
                  )}
                </div>
                <div
                  onClick={() => { setActiveView("notifications"); setShowNotifications(false) }}
                  className="p-4 border-t border-border hover:bg-muted/50 transition cursor-pointer text-center"
                >
                  <span className="text-sm text-cyan-500 font-medium">View all notifications</span>
                </div>
              </div>
            </div>
          )}

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className="absolute right-0 top-10 w-56 bg-card border rounded-xl shadow-lg p-3 z-50">
              <p className="font-semibold">{user?.name || "Guest"}</p>
              <p className="text-xs text-muted-foreground mb-3">{user?.email || "No email"}</p>
              <div className="space-y-2">
                <button onClick={() => { setActiveView("profile"); setShowProfileMenu(false) }} className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors">
                  <User size={16} /> My Profile
                </button>
                <button onClick={() => { setActiveView("setting"); setShowProfileMenu(false) }} className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors">
                  <Settings size={16} /> Account Settings
                </button>
                <div className="border-t border-border pt-2 mt-2">
                  <button onClick={() => { setShowProfileMenu(false); setShowLogoutConfirm(true); }} className="w-full text-left flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-card w-full max-w-sm rounded-2xl p-6 shadow-xl border border-border m-4">
            <h2 className="text-xl font-bold text-foreground mb-2">Confirm Logout</h2>
            <p className="text-muted-foreground mb-6">Are you sure you want to sign out of your account?</p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 rounded-xl text-foreground bg-muted hover:bg-muted/80 transition-colors font-medium"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  localStorage.removeItem("user")
                  localStorage.removeItem("token")
                  router.replace("/login")
                }}
                className="px-4 py-2 rounded-xl text-white bg-red-500 hover:bg-red-600 transition-colors font-medium shadow-lg shadow-red-500/25"
              >
                Yes, Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

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

              <button onClick={() => setActiveView("setting")} className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeView === "setting"
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
                    className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg transition-colors ${activeView === cat.id
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

        <main className="flex-1 p-6 overflow-auto">
          {activeView === "profile" && (
            <div className="max-w-2xl mx-auto bg-card border border-border rounded-xl p-8 mt-4">
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center text-white shrink-0 text-3xl font-bold shadow-lg">
                  {user?.name ? user.name.charAt(0).toUpperCase() : "G"}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-foreground">{user?.name || "Guest Citizen"}</h2>
                  <p className="text-muted-foreground">{user?.email || "citizen@example.com"}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-green-500/20 text-green-500 rounded-full text-sm font-semibold">Verified Resident</span>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="text-sm font-semibold text-muted-foreground block mb-2">Full Name</label>
                  <input type="text" disabled value={user?.name || "Guest Citizen"} className="w-full p-3 rounded-lg bg-muted border border-border text-foreground" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-muted-foreground block mb-2">Email Address</label>
                  <input type="text" disabled value={user?.email || "citizen@example.com"} className="w-full p-3 rounded-lg bg-muted border border-border text-foreground" />
                </div>
                <div>
                  <label className="text-sm font-semibold text-muted-foreground block mb-2">Saved Location</label>
                  <input type="text" disabled value={userLocation ? `${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}` : "Location not available"} className="w-full p-3 rounded-lg bg-muted border border-border text-foreground" />
                </div>
                <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-lg transition-colors">
                  Request Profile Update
                </button>
              </div>
            </div>
          )}

          {activeView === "notifications" && (
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">All Notifications</h3>
              <div className="space-y-4">
                {notifications.length === 0 ? (
                  <p className="text-muted-foreground">You have no new notifications.</p>
                ) : (
                  notifications.map((n) => (
                    <div key={n.id} className="flex items-start gap-4 p-4 border border-border rounded-xl bg-muted/30">
                      <div className="p-2 bg-cyan-500/10 text-cyan-500 rounded-lg shrink-0">
                        <Bell className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{n.text}</p>
                        <p className="text-xs text-muted-foreground mt-2">
                          {new Date(n.timestamp).toLocaleDateString()} {new Date(n.timestamp).toLocaleTimeString()}
                        </p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {activeView === "setting" && (
            <div className="max-w-2xl mx-auto bg-card border border-border rounded-xl p-8 mt-4">
              <h3 className="text-xl font-bold text-foreground mb-6">Account Settings</h3>

              <div className="space-y-6 border-b border-border pb-6 mb-6">
                <h4 className="font-semibold text-foreground mb-4">Notifications</h4>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive civic updates</p>
                  </div>
                  <div className="w-12 h-6 bg-cyan-500 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">SMS Alerts</p>
                    <p className="text-sm text-muted-foreground">Complaint status changes</p>
                  </div>
                  <div className="w-12 h-6 bg-cyan-500 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <h4 className="font-semibold text-foreground mb-4">Security</h4>
                <button className="w-full text-left px-4 py-3 rounded-lg border border-border hover:bg-muted transition-colors flex justify-between items-center">
                  <span className="font-medium text-foreground">Change Password</span>
                  <Settings className="w-4 h-4 text-muted-foreground" />
                </button>
              </div>
            </div>
          )}

          {/* ================= DASHBOARD ================= */}
          {activeView === "dashboard" && (
            <>
              {/* Current Zone Card - Enhanced with teammate's styling */}
              {currentZone && (
                <div className="mb-6 bg-card border border-cyan-500/30 shadow-[0_4px_20px_-4px_rgba(6,182,212,0.15)] rounded-2xl p-6 relative overflow-hidden transition-all hover:border-cyan-500/50">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 blur-[50px] rounded-full -mr-10 -mt-10" />
                  <div className="flex items-start justify-between relative z-10">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
                        </span>
                        <p className="text-xs text-cyan-500 font-semibold uppercase tracking-wider">Current Zone</p>
                      </div>
                      <h2 className="text-2xl font-bold text-foreground mb-1">{currentZone.name}</h2>
                      {currentZone.description && (
                        <p className="text-sm text-muted-foreground max-w-lg">{currentZone.description}</p>
                      )}
                    </div>
                    <div className="w-12 h-12 rounded-xl bg-cyan-500/10 flex items-center justify-center shrink-0 border border-cyan-500/20">
                      <MapPin className="w-6 h-6 text-cyan-500" />
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2 relative z-10">
                    <button onClick={() => setActiveView("map")} className="text-sm px-4 py-2 bg-muted hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/20 rounded-lg text-foreground hover:text-cyan-400 transition-colors">
                      View on Map
                    </button>
                    <button onClick={() => setActiveView("complaint")} className="text-sm px-4 py-2 bg-muted hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/20 rounded-lg text-foreground hover:text-cyan-400 transition-colors">
                      Report Issue
                    </button>
                    <button onClick={() => setActiveView("zones")} className="text-sm px-4 py-2 bg-muted hover:bg-cyan-500/10 border border-transparent hover:border-cyan-500/20 rounded-lg text-foreground hover:text-cyan-400 transition-colors">
                      Zone Details
                    </button>
                  </div>
                </div>
              )}

              {/* Nearby Development Projects */}
              {geoResult?.inside && geoResult.projects?.length > 0 && (
                <div className="mb-6 bg-card border border-border rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="p-1.5 rounded-md bg-cyan-500/10 text-cyan-500">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground">Nearby Development Projects</h3>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {geoResult.projects.map((p, i) => (
                      <div key={i} className="bg-muted/30 hover:bg-muted/60 border border-border rounded-xl p-4 transition-colors flex flex-col justify-between">
                        <div>
                          <h4 className="font-semibold text-foreground text-sm mb-1">{p.name}</h4>
                          <p className="text-xs text-muted-foreground leading-relaxed">{p.description}</p>
                        </div>
                        <div className="mt-3 pt-3 border-t border-border/50 flex items-center gap-2">
                          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                          <span className="text-[10px] font-medium text-cyan-500 uppercase tracking-wide">In Progress</span>
                        </div>
                      </div>
                    ))}
                  </div>
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

      {/* Notification Center - Your component */}
      <NotificationCenter
        isOpen={notificationCenterOpen}
        onClose={() => setNotificationCenterOpen(false)}
        notifications={notifications}
        onMarkAsRead={markAsRead}
        onClearAll={clearAllNotifications}
      />
    </div>
  )
}