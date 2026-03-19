"use client"

import { useState, useEffect } from "react"
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

        <div className="flex items-center gap-3">
          <button className="p-2 rounded-lg hover:bg-muted transition-colors relative">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-cyan-500 rounded-full" />
          </button>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-muted">
            <User className="w-5 h-5 text-muted-foreground" />
            <span className="text-sm text-foreground">MLA - Constituency 14</span>
          </div>
          <button 
            onClick={() => router.push("/login")}
            className="p-2 rounded-lg hover:bg-muted transition-colors text-red-400"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </nav>

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
              <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-muted-foreground hover:bg-muted transition-colors">
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
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    {activeTab === "overview" && "Monitor your constituency development"}
                    {activeTab === "projects" && "Track all development projects in your area"}
                    {activeTab === "complaints" && "Manage and resolve citizen complaints"}
                    {activeTab === "analytics" && "View detailed analytics and reports"}
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
