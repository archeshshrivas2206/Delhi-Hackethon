"use client"

import { useRouter } from "next/navigation"
import { MapPin, Building2, Users, ChevronRight, Globe2, Shield, Activity } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()

  const features = [
    {
      icon: MapPin,
      title: "Geo-Fenced Zones",
      description: "Track civic zones with precise geographic boundaries"
    },
    {
      icon: Building2,
      title: "Project Monitoring",
      description: "Monitor development projects in real-time"
    },
    {
      icon: Users,
      title: "Citizen Engagement",
      description: "Connect citizens with authorities seamlessly"
    }
  ]

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">

      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      {/* Grid Overlay */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px"
        }}
      />

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 py-20">

        {/* Badge */}
        <div className="flex items-center gap-2 px-4 py-2 mb-8 rounded-full bg-secondary/50 border border-border">
          <Globe2 className="w-4 h-4 text-emerald-400" />
          <span className="text-sm text-muted-foreground">
            Civic Governance Platform
          </span>
        </div>

        {/* Heading */}
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-6">
          Geo-Spatial <br />
          <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
            Civic Governance
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg text-muted-foreground text-center max-w-xl mb-12">
          Explore your area, track civic projects, and know exactly 
          which authority is responsible — all on an interactive map.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">

          <button
            onClick={() => router.push("/login?type=citizen")}
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl font-semibold text-background hover:scale-105 transition"
          >
            <span className="flex items-center gap-2">
              <Users className="w-5 h-5" />
              Continue as Citizen
              <ChevronRight className="w-5 h-5" />
            </span>
          </button>

          <button
            onClick={() => router.push("/login?type=politician")}
            className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-xl font-semibold text-background hover:scale-105 transition"
          >
            <span className="flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Continue as Authority
              <ChevronRight className="w-5 h-5" />
            </span>
          </button>

          <button
            onClick={() => router.push("/register")}
            className="px-8 py-4 border border-border rounded-xl font-semibold hover:bg-muted transition"
          >
            Register
          </button>

        </div>

        {/* Features */}
        <div className="grid md:grid-cols-3 gap-6 mt-20 max-w-5xl w-full">
          {features.map((feature, i) => {
            const Icon = feature.icon
            return (
              <div key={i} className="p-6 rounded-xl bg-card border border-border hover:border-emerald-500/30 transition">
                <Icon className="w-8 h-8 text-emerald-400 mb-4" />
                <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </div>
            )
          })}
        </div>

        {/* Stats */}
        <div className="flex gap-10 mt-16 flex-wrap justify-center">
          <div className="text-center">
            <p className="text-2xl font-bold">150+</p>
            <p className="text-sm text-muted-foreground">Projects</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">45</p>
            <p className="text-sm text-muted-foreground">Organizations</p>
          </div>
          <div className="text-center">
            <p className="text-2xl font-bold">2.5M</p>
            <p className="text-sm text-muted-foreground">Citizens</p>
          </div>
        </div>

      </div>
    </main>
  )
}