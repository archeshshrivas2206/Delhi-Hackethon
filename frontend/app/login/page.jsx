"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { MapPin, Eye, EyeOff, User, Building2, Check } from "lucide-react"

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const typeFromUrl = searchParams.get("type")

  const [userType, setUserType] = useState("citizen")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [formData, setFormData] = useState({
    email: "",
    password: ""
  })

  // Ensure type matches the URL or defaults to citizen
  useEffect(() => {
    if (typeFromUrl) {
      setUserType(typeFromUrl)
    }
  }, [typeFromUrl])

  const [error, setError] = useState("")

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    if (!formData.email || !formData.password) {
      setError("Please enter both email and password")
      setIsLoading(false)
      return
    }

    try {
      const res = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password
        })
      })

      const data = await res.json()

      if (!res.ok) throw new Error(data.detail)

      localStorage.setItem("token", data.access_token)
      localStorage.setItem("user", JSON.stringify({
        email: formData.email,
        name: formData.email.split("@")[0]
      }))

      router.push(
        userType === "citizen"
          ? "/dashboard/citizen"
          : "/dashboard/politician"
      )
    } catch (err) {
      console.log("ERROR:", err)
      setError("Invalid credentials")
      setIsLoading(false)
    }
  }

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }))
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Form Card */}
        <div className="bg-white border border-gray-100 rounded-[2rem] p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full max-w-md mx-auto">
          
          <div className="text-center mb-8">
            <MapPin className="mx-auto mb-3 w-8 h-8 text-[#0acc8b]" />
            <h1 className="text-3xl font-bold text-gray-900">
              Login as {userType === "citizen" ? "Citizen" : "Authority"}
            </h1>
          </div>

          {!typeFromUrl && (
            <div className="grid grid-cols-2 gap-4 mb-8">
              <button
                type="button"
                onClick={() => setUserType("citizen")}
                className={`p-4 border rounded-2xl flex flex-col items-center gap-2 transition-all ${
                  userType === "citizen" 
                    ? "border-[#0acc8b] bg-[#0acc8b]/5 text-[#0acc8b]" 
                    : "border-gray-200 hover:border-gray-300 text-gray-500"
                }`}
              >
                <User className="w-6 h-6" />
                <span className="font-medium">Citizen</span>
              </button>

              <button
                type="button"
                onClick={() => setUserType("politician")}
                className={`p-4 border rounded-2xl flex flex-col items-center gap-2 transition-all ${
                  userType === "politician" || userType === "authority"
                    ? "border-[#0acc8b] bg-[#0acc8b]/5 text-[#0acc8b]" 
                    : "border-gray-200 hover:border-gray-300 text-gray-500"
                }`}
              >
                <Building2 className="w-6 h-6" />
                <span className="font-medium">Authority</span>
              </button>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-4 border border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0acc8b]/20 focus:border-[#0acc8b] transition"
              />
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-4 border border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0acc8b]/20 focus:border-[#0acc8b] transition"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center font-medium bg-red-50 py-2 rounded-lg">{error}</div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 mt-2 bg-[#0acc8b] text-white rounded-xl font-bold text-lg hover:bg-[#09b87d] focus:outline-none focus:ring-4 focus:ring-[#0acc8b]/30 transition disabled:opacity-70"
            >
              {isLoading ? "Loading..." : `Login as ${userType === "citizen" ? "citizen" : "authority"}`}
            </button>

            <button
              type="button"
              onClick={() => {
                localStorage.setItem("token", "dev-token")
                localStorage.setItem("user", JSON.stringify({
                  name: "Dev User",
                  email: "dev@test.com"
                }))
                router.push(
                  userType === "citizen" ? "/dashboard/citizen" : "/dashboard/politician"
                )
              }}
              className="w-full py-3 mt-4 text-gray-500 font-semibold hover:bg-gray-50 rounded-xl transition"
            >
              Continue in Dev Mode
            </button>
          </form>
        </div>

        {/* Right Column: Info */}
        <div className="hidden md:flex flex-col items-start text-left pl-8 lg:pl-12">
          <h1 className="text-[3.5rem] font-extrabold text-[#3db1ff] leading-[1.1] mb-6 tracking-tight">
            Geo Civic
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-md leading-relaxed">
            {userType === "citizen" 
              ? "Access your civic dashboard, track issues, and stay connected with your city in real-time."
              : "Access your authority dashboard to manage civic issues, oversee projects, and engage directly with your constituents."
            }
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-600 text-lg">
              ✓ {userType === "citizen" ? "Track local issues instantly" : "Review and resolve reported issues"}
            </div>
            <div className="flex items-center gap-3 text-gray-600 text-lg">
              ✓ {userType === "citizen" ? "Monitor government projects" : "Update project statuses"}
            </div>
            <div className="flex items-center gap-3 text-gray-600 text-lg">
              ✓ {userType === "citizen" ? "Connect with authorities" : "Broadcast updates to citizens"}
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}