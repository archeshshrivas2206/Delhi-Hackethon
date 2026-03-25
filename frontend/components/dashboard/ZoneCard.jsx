"use client"

import { MapPin } from "lucide-react"

export default function ZoneCard({ zone, onViewMap }) {
  if (!zone) return null

  return (
    <div className="mb-6 p-4 rounded-xl border-2 border-green-500 bg-gradient-to-r from-green-500/10 to-emerald-500/10">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
            <MapPin className="w-5 h-5 text-green-400" />
          </div>
          <div>
            <p className="text-xs text-green-400 font-semibold">You are in</p>
            <h2 className="text-xl font-bold text-green-400">{zone.name}</h2>
            {zone.description && (
              <p className="text-xs text-gray-400 mt-0.5">{zone.description}</p>
            )}
          </div>
        </div>
        <button
          onClick={onViewMap}
          className="px-4 py-2 text-sm bg-green-500/20 hover:bg-green-500/30 rounded-lg text-green-400 transition"
        >
          Open Map
        </button>
      </div>
    </div>
  )
}