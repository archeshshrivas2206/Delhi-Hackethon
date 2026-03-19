"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { MapPin, Eye, EyeOff, User, Building2 } from "lucide-react"

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

  const [error, setError] = useState("")

  // ✅ Sync userType with URL
  useEffect(() => {
    if (typeFromUrl) {
      setUserType(typeFromUrl)
    }
  }, [typeFromUrl])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    await new Promise(resolve => setTimeout(resolve, 1000))

    if (formData.email && formData.password) {
      router.push(
        userType === "citizen"
          ? "/dashboard/citizen"
          : "/dashboard/politician"
      )
    } else {
      setError("Please enter both email and password")
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
    <main className="min-h-screen flex items-center justify-center px-4 bg-background">
      <div className="w-full max-w-md bg-card border border-border rounded-xl p-6">

        {/* Header */}
        <div className="text-center mb-6">
          <MapPin className="mx-auto mb-2" />
          <h1 className="text-xl font-bold">
            Login as {userType === "citizen" ? "Citizen" : "Authority"}
          </h1>
        </div>

        {/* ✅ Show selection only if no type in URL */}
        {!typeFromUrl && (
          <div className="grid grid-cols-2 gap-3 mb-4">
            <button
              type="button"
              onClick={() => setUserType("citizen")}
              className={`p-3 border rounded ${
                userType === "citizen" ? "border-green-500" : ""
              }`}
            >
              <User className="mx-auto mb-1" />
              Citizen
            </button>

            <button
              type="button"
              onClick={() => setUserType("politician")}
              className={`p-3 border rounded ${
                userType === "politician" ? "border-blue-500" : ""
              }`}
            >
              <Building2 className="mx-auto mb-1" />
              Authority
            </button>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-3 border rounded"
            />

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-blue-500 text-white rounded"
          >
            {isLoading ? "Loading..." : `Login as ${userType}`}
          </button>

        </form>

      </div>
    </main>
  )
}