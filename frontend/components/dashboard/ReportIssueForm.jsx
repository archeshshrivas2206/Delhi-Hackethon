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

    console.log("Submitting complaint:", data)

    // later connect API here
    alert("Complaint submitted!")
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-white shadow rounded">
      <h2 className="text-xl font-bold mb-3">Report an Issue</h2>

      <select
        className="w-full mb-2 p-2 border"
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

      <textarea
        placeholder="Describe the issue"
        className="w-full mb-2 p-2 border"
        onChange={(e) =>
          setFormData({ ...formData, description: e.target.value })
        }
      />

      <input
        type="file"
        className="mb-2"
        onChange={(e) =>
          setFormData({ ...formData, image: e.target.files[0] })
        }
      />

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Submit Complaint
      </button>
    </form>
  )
}