"use client"
import { useState } from "react"

export default function ReportIssueForm({ userLocation }) {
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    image: null,
  })

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      ...formData,
      location: userLocation,
      status: "pending",
      createdAt: new Date(),
    }

    console.log(data)
    alert("Complaint submitted!")
  }

  return (
    <div className="bg-gray-900 text-white p-5 rounded-2xl shadow-lg border border-gray-800">

      <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
        📢 Report an Issue
      </h2>

      <form onSubmit={handleSubmit} className="space-y-3">

        {/* Category */}
        <select
          className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        >
          <option value="">Select Category</option>
          <option value="garbage">Garbage</option>
          <option value="water">Water</option>
          <option value="roads">Road Damage</option>
          <option value="electricity">Electricity</option>
        </select>

        {/* Description */}
        <textarea
          placeholder="Describe the issue..."
          className="w-full p-2 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          rows={3}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        {/* File Upload */}
        <input
          type="file"
          className="w-full text-sm text-gray-400 file:bg-blue-600 file:text-white file:border-0 file:px-3 file:py-1 file:rounded-lg"
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files[0] })
          }
        />

        {/* Location Info */}
        <div className="text-sm text-gray-400">
          📍 Location: {userLocation?.lat}, {userLocation?.lng}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 transition-all p-2 rounded-lg font-medium"
        >
          Submit Complaint
        </button>

      </form>
    </div>
  )
}