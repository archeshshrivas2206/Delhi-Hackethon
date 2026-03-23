"use client"

import { useRouter } from "next/navigation"
import Image from "next/image"
import { MapPin, Building2, Users, ChevronRight, Globe2, Shield, Activity } from "lucide-react"

export default function LandingPage() {
  const router = useRouter()

  const features = [
    {
      icon: MapPin,
      title: "Select Your Area",
      description: "Choose your location to explore near by civic"
    },
    {
      icon: Building2,
      title: "View Issue & Projects",
      description: "Track problems and projects in your area"
    },
    {
      icon: Users,
      title: "Connect With Authorities",
      description: "Engage directly with authorities to voice your concerns and suggestions"
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
          backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: "50px 50px"
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 pt-4 pb-20">

        {/* Hero Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">

          {/* Left Column - Content */}
          <div className="flex flex-col items-start text-left pt-6">
            <h2 className="text-[2.5rem] md:text-6xl font-bold text-blue-400 mb-8 tracking-wide">Geo Civic</h2>
            <h1 className="text-[3.5rem] md:text-4xl font-extrabold text-black dark:text-white leading-[1.1] mb-2 tracking-tight">
              Explore Your City
            </h1>
            <h1 className="text-[3.5rem] md:text-[5rem] font-extrabold text-[#0acc8b] leading-[1.1] mb-8 tracking-tight">
              With Smart Governance
            </h1>

            <p className="text-xl text-muted-foreground mb-10 max-w-xl">
              Discover civic projects, report issues, and connect directly with authorities in your area — all in one place.
            </p>

            {/* CTA Buttons Container */}
            <div className="flex flex-col w-full sm:w-auto self-start gap-4">
              <div className="flex flex-col sm:flex-row w-full gap-4">
                <button
                  onClick={() => router.push("/login?type=citizen")}
                  className="px-6 py-2 bg-[#0acc8b] text-white rounded-xl font-semibold hover:bg-emerald-600 transition shadow-md flex items-center justify-center gap-2 flex-1 text-lg"
                >
                  <Users className="w-5 h-5" />
                  Explore as Citizen
                </button>

                <button
                  onClick={() => router.push("/login?type=politician")}
                  className="px-6 py-2 bg-white text-gray-800 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition shadow-sm flex items-center justify-center gap-2 flex-1 text-lg"
                >
                  <Building2 className="w-5 h-5 text-gray-600" />
                  Authority Panel
                </button>
              </div>

              <div className="flex w-full justify-center">
                <button
                  onClick={() => router.push("/register")}
                  className="px-8 py-3 bg-white text-gray-800 border border-gray-200 rounded-xl font-semibold hover:bg-gray-50 transition shadow-sm flex items-center justify-center gap-2 min-w-[200px]"
                >
                  <ChevronRight className="w-5 h-5 text-gray-600" />
                  Register
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Image Card & Features */}
          <div className="flex flex-col w-full gap-8 z-20">
            <div className="relative w-full aspect-[5/3] -mt-2 rounded-3xl overflow-hidden shadow-2xl group">
              <Image
                src="/indiaflag.png"
                alt="India Flag"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                priority
              />

              {/* Floating Stats Card */}
              <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border border-gray-100 z-20">
                <p className="text-sm font-medium text-gray-500 mb-1">Active Projects</p>
                <p className="text-2xl font-extrabold text-gray-900">150+ Running</p>
              </div>
            </div>

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
              {features.map((feature, i) => {
                const Icon = feature.icon
                return (
                  <div key={i} className="p-5 rounded-xl bg-white/60 backdrop-blur-sm border border-border hover:border-emerald-500/30 hover:shadow-md transition">
                    <Icon className="w-6 h-6 text-emerald-500 mb-3" />
                    <h3 className="font-semibold text-base mb-1">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground">{feature.description}</p>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}