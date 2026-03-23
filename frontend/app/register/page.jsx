"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { User, Building2 } from "lucide-react"

export default function RegisterPage() {
  const router = useRouter()

  const [confirmPassword, setConfirmPassword] = useState("")
  const [userType, setUserType] = useState("citizen")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: ""
  })

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (formData.password !== confirmPassword) {
      setError("Passwords do not match")
      setLoading(false)
      return
    }

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required")
      setLoading(false)
      return
    }

    try {
      const res = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          user_type: userType
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.detail || "Registration failed")
      }

      localStorage.setItem("user", JSON.stringify({
        name: formData.name,
        email: formData.email,
        role: userType
      }))

      router.push("/login")

    } catch (err) {
      setError(err.message || "Registration failed")
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-[#f8fafc] flex items-center justify-center p-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Column: Form Card */}
        <div className="bg-white border border-gray-100 rounded-[2rem] p-8 sm:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full max-w-md mx-auto">
          
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">
              Create Account
            </h1>
          </div>

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
              onClick={() => setUserType("authority")}
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

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-4 border border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0acc8b]/20 focus:border-[#0acc8b] transition"
              />
            </div>

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

            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-4 border border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0acc8b]/20 focus:border-[#0acc8b] transition"
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full p-4 border border-gray-200 text-gray-900 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0acc8b]/20 focus:border-[#0acc8b] transition"
              />
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center font-medium bg-red-50 py-2 rounded-lg">{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 mt-2 bg-[#0acc8b] text-white rounded-xl font-bold text-lg hover:bg-[#09b87d] focus:outline-none focus:ring-4 focus:ring-[#0acc8b]/30 transition disabled:opacity-70"
            >
              {loading ? "Creating..." : "Register"}
            </button>
          </form>

          <p className="text-sm font-medium text-center mt-8 text-gray-900">
            Already have an account?{" "}
            <span
              onClick={() => router.push("/login")}
              className="text-[#3db1ff] cursor-pointer hover:underline"
            >
              Login
            </span>
          </p>

        </div>

        {/* Right Column: Info */}
        <div className="hidden md:flex flex-col items-start text-left pl-8 lg:pl-12">
          <h1 className="text-[3.5rem] font-extrabold text-[#3db1ff] leading-[1.1] mb-6 tracking-tight">
            Geo Civic
          </h1>
          <p className="text-xl text-gray-600 mb-10 max-w-md leading-relaxed">
            {userType === "citizen"
              ? "Join the platform and start exploring civic issues, tracking projects, and making your city smarter."
              : "Register as an authority to begin managing civic issues, updating infrastructure modules, and supporting your constituents."
            }
          </p>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-gray-600 text-lg">
              ✓ {userType === "citizen" ? "Report local issues easily" : "Manage constituent reports"}
            </div>
            <div className="flex items-center gap-3 text-gray-600 text-lg">
              ✓ {userType === "citizen" ? "Stay updated with projects" : "Publish infrastructure updates"}
            </div>
            <div className="flex items-center gap-3 text-gray-600 text-lg">
              ✓ {userType === "citizen" ? "Connect with your authorities" : "Engage with your community directly"}
            </div>
          </div>
        </div>

      </div>
    </main>
  )
}