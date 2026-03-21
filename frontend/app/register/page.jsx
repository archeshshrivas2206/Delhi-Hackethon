"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

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

  // ✅ SUBMIT FUNCTION
  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setLoading(true)

    // ✅ validation
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
          user_type: userType   // ✅ correct field
        })
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.detail || "Registration failed")
      }

      // ✅ optional: store user locally
      localStorage.setItem("user", JSON.stringify({
        name: formData.name,
        email: formData.email,
        role: userType
      }))

      // ✅ redirect to login
      router.push("/login")

    } catch (err) {
      setError(err.message || "Registration failed")
      setLoading(false)
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md bg-card border rounded-xl p-6">

        <h1 className="text-xl font-bold mb-4 text-center">
          Create Account
        </h1>

        {/* ✅ USER TYPE SELECT */}
        <div className="grid grid-cols-2 gap-3 mb-4">
          <button
            type="button"
            onClick={() => setUserType("citizen")}
            className={`p-3 border rounded ${
              userType === "citizen" ? "border-green-500" : ""
            }`}
          >
            Citizen
          </button>

          <button
            type="button"
            onClick={() => setUserType("authority")}
            className={`p-3 border rounded ${
              userType === "authority" ? "border-blue-500" : ""
            }`}
          >
            Authority
          </button>
        </div>

        {/* ✅ FORM */}
        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-3 border rounded"
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-3 border rounded"
          />

          {error && (
            <p className="text-red-500 text-sm">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-emerald-500 text-white rounded"
          >
            {loading ? "Creating..." : "Register"}
          </button>

        </form>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <span
            onClick={() => router.push("/login")}
            className="text-blue-500 cursor-pointer"
          >
            Login
          </span>
        </p>

      </div>
    </main>
  )
}