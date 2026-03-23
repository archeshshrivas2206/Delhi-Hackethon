"use client"

import { useState, useEffect, useRef } from "react"
import { useRouter } from "next/navigation"
import { 
  MapPin, Bell, User, LogOut, Menu, X,
  Map, Home, FileText, Settings, Users,
  TrendingUp, CheckCircle, Clock, AlertCircle,
  Building2, BarChart3
} from "lucide-react"

const developmentZones = [
  {
    id: 1,
    name: "Sector 15 Development",
    status: "completed",
    progress: 100,
    budget: "₹25 Cr",
    beneficiaries: "15,000",
    description: "Road widening and drainage system upgrade",
    color: "#10b981"
  },
  {
    id: 2,
    name: "Smart City Initiative - Zone A",
    status: "ongoing",
    progress: 65,
    budget: "₹50 Cr",
    beneficiaries: "50,000",
    description: "Smart lighting, WiFi zones, and surveillance",
    color: "#06b6d4"
  },
  {
    id: 3,
    name: "Water Supply Extension",
    status: "ongoing",
    progress: 45,
    budget: "₹18 Cr",
    beneficiaries: "25,000",
    description: "24x7 water supply to underserved areas",
    color: "#06b6d4"
  },
  {
    id: 4,
    name: "Community Health Center",
    status: "completed",
    progress: 100,
    budget: "₹8 Cr",
    beneficiaries: "30,000",
    description: "Primary healthcare facility with specialists",
    color: "#10b981"
  },
  {
    id: 5,
    name: "School Renovation Program",
    status: "pending",
    progress: 10,
    budget: "₹12 Cr",
    beneficiaries: "8,000",
    description: "Renovation of 5 government schools",
    color: "#f59e0b"
  },
]

const stats = [
  { label: "Total Projects", value: "12", icon: Building2, color: "text-blue-400" },
  { label: "Completed", value: "5", icon: CheckCircle, color: "text-emerald-400" },
  { label: "Ongoing", value: "5", icon: Clock, color: "text-cyan-400" },
  { label: "Pending", value: "2", icon: AlertCircle, color: "text-amber-400" },
]

const complaints = [
  { id: 1, title: "Road repair needed in Block D", status: "pending", date: "2 days ago", priority: "high" },
  { id: 2, title: "Street lights not working", status: "in-progress", date: "5 days ago", priority: "medium" },
  { id: 3, title: "Water logging issue", status: "resolved", date: "1 week ago", priority: "high" },
  { id: 4, title: "Garbage collection delay", status: "pending", date: "3 days ago", priority: "low" },
]

export default function PoliticianDashboard() {
  const router = useRouter()
  const [showMap, setShowMap] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [userLocation, setUserLocation] = useState(null)
  const [showNotifications, setShowNotifications] = useState(false)
  const [showProfile, setShowProfile] = useState(false)
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  const navRef = useRef(null)
  useEffect(() => {
    function handleClickOutside(event) {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setShowNotifications(false)
        setShowProfile(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Get user's current location on mount
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          })
        },
        (error) => {
          console.log("Location error:", error.message)
          // Default to Delhi if location access denied
          setUserLocation({ lat: 28.6139, lng: 77.2090 })
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
      )
    } else {
      setUserLocation({ lat: 28.6139, lng: 77.2090 })
    }
  }, [])

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Navbar */}
      <nav className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-4 z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-lg hover:bg-muted transition-colors"
          >
            {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-cyan-500 to-blue-500 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-background" />
            </div>
            <span className="font-semibold text-foreground">CivicGov</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/20 text-cyan-400">Politician</span>
          </div>
        </div>

        <div ref={navRef} className="flex items-center gap-4 relative">

          {/* Notifications */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowNotifications(!showNotifications)
                setShowProfile(false)
              }}
              className={`p-2 rounded-lg transition-colors relative ${showNotifications ? 'bg-muted' : 'hover:bg-muted'}`}
            >
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-500 rounded-full" />
            </button>

            {/* Notification Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-card border border-border shadow-lg rounded-xl overflow-hidden z-50">
                <div className="p-4 border-b border-border flex items-center justify-between bg-muted/30">
                  <h3 className="font-semibold text-foreground">Notifications</h3>
                  <span className="text-xs text-cyan-500 font-medium cursor-pointer">Mark all as read</span>
                </div>
                <div className="max-h-[300px] overflow-y-auto">
                  <div className="p-4 border-b border-border hover:bg-muted/50 transition cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-red-500/10 text-red-500 rounded-lg shrink-0">
                        <AlertCircle className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">High Priority Complaint</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Water logging in Sector 9 needs immediate attention.</p>
                        <p className="text-[10px] text-muted-foreground mt-2">10 mins ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 border-b border-border hover:bg-muted/50 transition cursor-pointer">
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg shrink-0">
                        <Building2 className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">Project Update</p>
                        <p className="text-xs text-muted-foreground mt-0.5">Sector 15 Community Hall construction reached 80%.</p>
                        <p className="text-[10px] text-muted-foreground mt-2">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div 
                    onClick={() => { setActiveTab("notifications"); setShowNotifications(false); setShowMap(false) }}
                    className="p-4 hover:bg-muted/50 transition cursor-pointer text-center"
                  >
                    <span className="text-sm text-cyan-500 font-medium">View all notifications</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Profile */}
          <div className="relative">
            <button 
              onClick={() => {
                setShowProfile(!showProfile)
                setShowNotifications(false)
              }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg transition-colors border ${showProfile ? 'bg-muted border-border' : 'bg-transparent border-transparent hover:bg-muted'}`}
            >
              <div className="w-7 h-7 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shrink-0">
                <span className="text-xs font-bold">M</span>
              </div>
              <span className="text-sm font-medium text-foreground hidden sm:block">MLA - Const. 14</span>
            </button>

            {/* Profile Dropdown */}
            {showProfile && (
              <div className="absolute right-0 mt-2 w-56 bg-card border border-border shadow-lg rounded-xl overflow-hidden z-50">
                <div className="p-4 border-b border-border bg-muted/30">
                  <p className="font-semibold text-foreground">Authority Panel</p>
                  <p className="text-xs text-muted-foreground truncate">mla-const14@gov.in</p>
                </div>
                <div className="p-2">
                  <button 
                    onClick={() => { setActiveTab("profile"); setShowProfile(false); setShowMap(false) }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    <User className="w-4 h-4" /> My Profile
                  </button>
                  <button 
                    onClick={() => { setActiveTab("settings"); setShowProfile(false); setShowMap(false) }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-foreground hover:bg-muted rounded-lg transition-colors"
                  >
                    <Settings className="w-4 h-4" /> Account Settings
                  </button>
                </div>
                <div className="p-2 border-t border-border">
                  <button 
                    onClick={() => { setShowProfile(false); setShowLogoutConfirm(true); }}
                    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <LogOut className="w-4 h-4" /> Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
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
                onClick={() => router.push("/login")}
                className="px-4 py-2 rounded-xl text-white bg-red-500 hover:bg-red-600 transition-colors font-medium shadow-lg shadow-red-500/25"
              >
                Yes, Sign Out
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        {sidebarOpen && (
          <aside className="w-64 border-r border-border bg-card/30 p-4 flex flex-col">
            <nav className="space-y-1">
              <button 
                onClick={() => {setActiveTab("overview"); setShowMap(false)}}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  activeTab === "overview" && !showMap
                    ? "bg-cyan-500/10 text-cyan-400"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Home className="w-5 h-5" />
                <span className="font-medium">Overview</span>
              </button>
              <button 
                onClick={() => {setActiveTab("projects"); setShowMap(false)}}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  activeTab === "projects" && !showMap
                    ? "bg-cyan-500/10 text-cyan-400"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Building2 className="w-5 h-5" />
                <span>Development Zones</span>
              </button>
              <button 
                onClick={() => {setActiveTab("complaints"); setShowMap(false)}}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  activeTab === "complaints" && !showMap
                    ? "bg-cyan-500/10 text-cyan-400"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <FileText className="w-5 h-5" />
                <span>Complaints</span>
              </button>
              <button 
                onClick={() => setActiveTab("analytics")}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  activeTab === "analytics"
                    ? "bg-cyan-500/10 text-cyan-400"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <BarChart3 className="w-5 h-5" />
                <span>Analytics</span>
              </button>
              <button 
                onClick={() => { setActiveTab("settings"); setShowMap(false) }}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                  activeTab === "settings" && !showMap
                    ? "bg-cyan-500/10 text-cyan-400"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <Settings className="w-5 h-5" />
                <span>Settings</span>
              </button>
            </nav>

            <div className="mt-auto pt-4 border-t border-border">
              <div className="p-3 rounded-lg bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/20">
                <div className="flex items-center gap-2 mb-2">
                  <Users className="w-4 h-4 text-cyan-400" />
                  <span className="text-sm font-medium text-foreground">Your Area</span>
                </div>
                <p className="text-xs text-muted-foreground">Constituency 14, District North</p>
                <p className="text-xs text-muted-foreground mt-1">Population: 1,25,000</p>
              </div>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          {!showMap ? (
            <>
              {/* Header with Open Map Button */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">
                    {activeTab === "overview" && "Dashboard Overview"}
                    {activeTab === "projects" && "Development Zones"}
                    {activeTab === "complaints" && "Citizen Complaints"}
                    {activeTab === "analytics" && "Analytics"}
                    {activeTab === "notifications" && "All Notifications"}
                    {activeTab === "profile" && "My Profile"}
                    {activeTab === "settings" && "Account Settings"}
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    {activeTab === "overview" && "Monitor your constituency development"}
                    {activeTab === "projects" && "Track all development projects in your area"}
                    {activeTab === "complaints" && "Manage and resolve citizen complaints"}
                    {activeTab === "analytics" && "View detailed analytics and reports"}
                    {activeTab === "notifications" && "Review all your updates and alerts"}
                    {activeTab === "profile" && "Manage your professional authority profile"}
                    {activeTab === "settings" && "Configure dashboard and system preferences"}
                  </p>
                </div>
                <button
                  onClick={() => setShowMap(true)}
                  className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-500 text-background font-medium rounded-xl hover:shadow-lg hover:shadow-cyan-500/25 transition-all"
                >
                  <Map className="w-5 h-5" />
                  Open Map
                </button>
              </div>

              {/* Stats */}
              {(activeTab === "overview" || activeTab === "projects") && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  {stats.map((stat) => {
                    const Icon = stat.icon
                    return (
                      <div
                        key={stat.label}
                        className="bg-card border border-border rounded-xl p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg bg-muted ${stat.color}`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          <div>
                            <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                            <p className="text-xs text-muted-foreground">{stat.label}</p>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}

              {/* Overview Tab */}
              {activeTab === "overview" && (
                <div className="grid lg:grid-cols-2 gap-6">
                  {/* Recent Projects */}
                  <div className="bg-card border border-border rounded-xl p-5">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Recent Development Zones</h3>
                    <div className="space-y-3">
                      {developmentZones.slice(0, 3).map((zone) => (
                        <div key={zone.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                          <div 
                            className="w-3 h-3 rounded-full"
                            style={{ backgroundColor: zone.color }}
                          />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{zone.name}</p>
                            <p className="text-xs text-muted-foreground">{zone.description}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-sm font-medium text-foreground">{zone.progress}%</p>
                            <p className="text-xs text-muted-foreground capitalize">{zone.status}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Complaints */}
                  <div className="bg-card border border-border rounded-xl p-5">
                    <h3 className="text-lg font-semibold text-foreground mb-4">Recent Complaints</h3>
                    <div className="space-y-3">
                      {complaints.slice(0, 3).map((complaint) => (
                        <div key={complaint.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                          <div className={`w-2 h-2 rounded-full ${
                            complaint.priority === "high" ? "bg-red-500" :
                            complaint.priority === "medium" ? "bg-amber-500" : "bg-emerald-500"
                          }`} />
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">{complaint.title}</p>
                            <p className="text-xs text-muted-foreground">{complaint.date}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            complaint.status === "resolved" ? "bg-emerald-500/20 text-emerald-400" :
                            complaint.status === "in-progress" ? "bg-cyan-500/20 text-cyan-400" :
                            "bg-amber-500/20 text-amber-400"
                          }`}>
                            {complaint.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Projects Tab */}
              {activeTab === "projects" && (
                <div className="space-y-4">
                  {developmentZones.map((zone) => (
                    <div
                      key={zone.id}
                      className="bg-card border border-border rounded-xl p-5 hover:border-cyan-500/30 transition-all"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <div 
                            className="w-4 h-4 rounded-full"
                            style={{ backgroundColor: zone.color }}
                          />
                          <div>
                            <h3 className="font-semibold text-foreground">{zone.name}</h3>
                            <p className="text-sm text-muted-foreground">{zone.description}</p>
                          </div>
                        </div>
                        <span className={`text-xs px-3 py-1 rounded-full capitalize ${
                          zone.status === "completed" ? "bg-emerald-500/20 text-emerald-400" :
                          zone.status === "ongoing" ? "bg-cyan-500/20 text-cyan-400" :
                          "bg-amber-500/20 text-amber-400"
                        }`}>
                          {zone.status}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4 mb-4">
                        <div>
                          <p className="text-xs text-muted-foreground">Budget</p>
                          <p className="text-sm font-medium text-foreground">{zone.budget}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Beneficiaries</p>
                          <p className="text-sm font-medium text-foreground">{zone.beneficiaries}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Progress</p>
                          <p className="text-sm font-medium text-foreground">{zone.progress}%</p>
                        </div>
                      </div>
                      
                      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                        <div 
                          className="h-full rounded-full transition-all"
                          style={{ 
                            width: `${zone.progress}%`,
                            backgroundColor: zone.color 
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Complaints Tab */}
              {activeTab === "complaints" && (
                <div className="space-y-3">
                  {complaints.map((complaint) => (
                    <div
                      key={complaint.id}
                      className="bg-card border border-border rounded-xl p-5 hover:border-cyan-500/30 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className={`w-3 h-3 rounded-full ${
                            complaint.priority === "high" ? "bg-red-500" :
                            complaint.priority === "medium" ? "bg-amber-500" : "bg-emerald-500"
                          }`} />
                          <div>
                            <h3 className="font-medium text-foreground">{complaint.title}</h3>
                            <p className="text-sm text-muted-foreground">{complaint.date}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`text-xs px-3 py-1 rounded-full capitalize ${
                            complaint.status === "resolved" ? "bg-emerald-500/20 text-emerald-400" :
                            complaint.status === "in-progress" ? "bg-cyan-500/20 text-cyan-400" :
                            "bg-amber-500/20 text-amber-400"
                          }`}>
                            {complaint.status}
                          </span>
                          <button className="text-sm text-cyan-400 hover:text-cyan-300 transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Analytics Tab */}
              {activeTab === "analytics" && (
                <div className="bg-card border border-border rounded-xl p-8 text-center">
                  <BarChart3 className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">Analytics Coming Soon</h3>
                  <p className="text-muted-foreground">Detailed analytics and reports will be available here.</p>
                </div>
              )}
              {/* Notifications Tab */}
              {activeTab === "notifications" && (
                <div className="bg-card border border-border rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-foreground mb-4">All Notifications</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-4 p-4 border border-border rounded-xl bg-muted/30">
                      <div className="p-2 bg-red-500/10 text-red-500 rounded-lg shrink-0">
                        <AlertCircle className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">High Priority Complaint</p>
                        <p className="text-sm text-muted-foreground mt-1">Water logging in Sector 9 needs immediate attention due to heavy rains. Multiple reports generated.</p>
                        <p className="text-xs text-muted-foreground mt-2">10 mins ago</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4 p-4 border border-border rounded-xl bg-muted/30">
                      <div className="p-2 bg-emerald-500/10 text-emerald-500 rounded-lg shrink-0">
                        <Building2 className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">Project Update</p>
                        <p className="text-sm text-muted-foreground mt-1">Sector 15 Community Hall construction reached 80% completion milestone.</p>
                        <p className="text-xs text-muted-foreground mt-2">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === "profile" && (
                <div className="bg-card border border-border rounded-xl p-8 max-w-2xl mx-auto mt-4">
                  <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white shrink-0 text-3xl font-bold shadow-lg">
                      M
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-foreground">MLA Representative</h2>
                      <p className="text-muted-foreground">mla-const14@gov.in</p>
                      <span className="inline-block mt-2 px-3 py-1 bg-cyan-500/20 text-cyan-500 rounded-full text-sm font-semibold">Verified Authority</span>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground block mb-2">Full Name</label>
                      <input type="text" disabled value="Member of Legislative Assembly" className="w-full p-3 rounded-lg bg-muted border border-border text-foreground" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground block mb-2">Constituency</label>
                      <input type="text" disabled value="Constituency 14, North District" className="w-full p-3 rounded-lg bg-muted border border-border text-foreground" />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-muted-foreground block mb-2">Contact Number</label>
                      <input type="text" placeholder="+91 98765 43210" className="w-full p-3 rounded-lg bg-background border border-border text-foreground focus:outline-none focus:border-cyan-500" />
                    </div>
                    <button className="w-full bg-cyan-500 hover:bg-cyan-600 text-white font-bold py-3 rounded-lg transition-colors">
                      Save Profile Changes
                    </button>
                  </div>
                </div>
              )}

              {/* Settings Tab */}
              {activeTab === "settings" && (
                <div className="bg-card border border-border rounded-xl p-8 max-w-2xl mx-auto mt-4">
                  <h3 className="text-xl font-bold text-foreground mb-6">Account Settings</h3>
                  
                  <div className="space-y-6 border-b border-border pb-6 mb-6">
                    <h4 className="font-semibold text-foreground mb-4">Notifications</h4>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Email Notifications</p>
                        <p className="text-sm text-muted-foreground">Receive daily summaries</p>
                      </div>
                      <div className="w-12 h-6 bg-cyan-500 rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">SMS Alerts</p>
                        <p className="text-sm text-muted-foreground">Urgent citizen complaints</p>
                      </div>
                      <div className="w-12 h-6 bg-muted border border-border rounded-full relative cursor-pointer">
                        <div className="absolute left-1 top-1 w-4 h-4 bg-muted-foreground rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <h4 className="font-semibold text-foreground mb-4">Security</h4>
                    <button className="w-full text-left px-4 py-3 rounded-lg border border-border hover:bg-muted transition-colors flex justify-between items-center">
                      <span className="font-medium text-foreground">Change Password</span>
                      <Settings className="w-4 h-4 text-muted-foreground" />
                    </button>
                    <button className="w-full text-left px-4 py-3 rounded-lg border border-border hover:bg-muted transition-colors flex justify-between items-center">
                      <span className="font-medium text-foreground">Two-Factor Authentication</span>
                      <span className="text-xs bg-emerald-500/20 text-emerald-500 px-2 py-1 rounded-full font-semibold">Enabled</span>
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Map View */
            <div className="h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Your Constituency Map</h1>
                  <p className="text-muted-foreground">Development zones highlighted in different colors</p>
                </div>
                <button
                  onClick={() => setShowMap(false)}
                  className="flex items-center gap-2 px-4 py-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                  Close Map
                </button>
              </div>
              <div className="flex-1 rounded-xl overflow-hidden border border-border">
                <PoliticianMapView zones={developmentZones} userLocation={userLocation} />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

function PoliticianMapView({ zones, userLocation }) {
  // Use actual user coordinates if available
  const locationParam = userLocation 
    ? `${userLocation.lat},${userLocation.lng}`
    : "28.6139,77.2090" // Delhi default

  return (
    <div className="w-full h-full relative bg-card">
      <iframe
        width="100%"
        height="100%"
        style={{ border: 0 }}
        loading="lazy"
        allowFullScreen
        referrerPolicy="no-referrer-when-downgrade"
        src={`https://www.google.com/maps/embed/v1/view?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dZWTgaQzuU17R8&center=${locationParam}&zoom=13&maptype=roadmap`}
      />
      {/* Legend overlay */}
      <div className="absolute bottom-4 left-4 bg-card/95 backdrop-blur-sm border border-border rounded-xl p-4">
        <p className="text-sm font-medium text-foreground mb-3">Development Zones</p>
        <div className="space-y-2">
          {zones.slice(0, 4).map((zone) => (
            <div key={zone.id} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: zone.color }}
              />
              <span className="text-xs text-muted-foreground">{zone.name}</span>
            </div>
          ))}
        </div>
        <div className="mt-3 pt-3 border-t border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <div className="w-3 h-3 rounded-full bg-emerald-500" />
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
            <div className="w-3 h-3 rounded-full bg-cyan-500" />
            <span>Ongoing</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <span>Pending</span>
          </div>
        </div>
      </div>
      
      {/* Area indicator */}
      <div className="absolute top-4 left-4 bg-card/95 backdrop-blur-sm border border-border rounded-lg px-4 py-2">
        <p className="text-sm font-medium text-foreground">Constituency 14</p>
        <p className="text-xs text-muted-foreground">District North, Delhi</p>
      </div>
    </div>
  )
}
