"use client"
import { useState } from "react"
import { MapPin, AlertCircle, CheckCircle } from "lucide-react"
export default function ReportIssueForm({ userLocation }) {
  const [formData, setFormData] = useState({
    category: "",
    description: "",
    image: null,
  })
  const [showSuccessDialog, setShowSuccessDialog] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const data = {
      ...formData,
      location: userLocation,
      status: "pending",
      createdAt: new Date(),
    }

    console.log(data)
    setShowSuccessDialog(true)
  }

  return (
    <div className="bg-white p-6 sm:p-8 rounded-[2rem] shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-gray-100 w-full max-w-xl mx-auto">

      <h2 className="text-2xl font-bold mb-6 text-gray-900 flex items-center gap-2">
        <AlertCircle className="w-6 h-6 text-[#0acc8b]" />
        Report an Issue
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Category */}
        <select
          className="w-full p-4 rounded-xl bg-white border border-gray-200 text-gray-600 focus:outline-none focus:ring-2 focus:ring-[#0acc8b]/20 focus:border-[#0acc8b] transition"
          onChange={(e) =>
            setFormData({ ...formData, category: e.target.value })
          }
        >
          <option value="">Select Category...</option>
          <option value="garbage">Garbage / Waste</option>
          <option value="water">Water Supply / Leaks</option>
          <option value="roads">Road Damage / Potholes</option>
          <option value="electricity">Electricity / Streetlights</option>
        </select>

        {/* Description */}
        <textarea
          placeholder="Describe the issue in detail..."
          className="w-full p-4 rounded-xl bg-white border border-gray-200 text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#0acc8b]/20 focus:border-[#0acc8b] transition resize-none"
          rows={4}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
        />

        {/* File Upload */}
        <input
          type="file"
          className="w-full text-sm text-gray-600 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-semibold file:bg-[#0acc8b]/5 file:text-[#0acc8b] hover:file:bg-[#0acc8b]/10 transition cursor-pointer"
          onChange={(e) =>
            setFormData({ ...formData, image: e.target.files[0] })
          }
        />

        {/* Location Info */}
        <div className="flex items-center justify-between text-sm text-gray-600 bg-gray-50 p-4 rounded-xl border border-gray-100">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#3db1ff] shrink-0" />
            <span className="font-medium">Selected Location</span>
          </div>
          <span className="text-gray-400 font-mono">
            {userLocation?.lat 
              ? `${userLocation.lat.toFixed(4)}, ${userLocation.lng.toFixed(4)}`
              : "Tracking..."}
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full mt-2 bg-[#0acc8b] hover:bg-[#09b87d] text-white py-4 rounded-xl font-bold transition-all shadow-sm focus:outline-none focus:ring-4 focus:ring-[#0acc8b]/30"
        >
          Submit Complaint
        </button>

      </form>

      {/* Success Dialog */}
      {showSuccessDialog && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm">
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-xl border border-gray-100 m-4 flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-[#0acc8b]/20 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-[#0acc8b]" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Success!</h2>
            <p className="text-gray-600 mb-6">Your complaint has been submitted successfully and is now pending review.</p>
            <button
              onClick={() => {
                setShowSuccessDialog(false)
                setFormData({ category: "", description: "", image: null })
              }}
              className="w-full bg-[#0acc8b] hover:bg-[#09b87d] text-white py-3 rounded-xl font-bold transition-all shadow-sm focus:outline-none focus:ring-4 focus:ring-[#0acc8b]/30"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  )
}