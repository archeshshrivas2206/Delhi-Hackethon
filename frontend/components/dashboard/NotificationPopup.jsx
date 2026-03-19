"use client"

import { useEffect, useState } from "react"
import { MapPin, X, Bell } from "lucide-react"

export default function NotificationPopup({ message, onClose, type = "info" }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300)
    }, 5000)

    return () => clearTimeout(timer)
  }, [onClose])

  const typeStyles = {
    info: "from-cyan-500/20 to-emerald-500/20 border-cyan-500/30",
    warning: "from-amber-500/20 to-orange-500/20 border-amber-500/30",
    success: "from-emerald-500/20 to-cyan-500/20 border-emerald-500/30"
  }

  const iconColors = {
    info: "text-cyan-400",
    warning: "text-amber-400",
    success: "text-emerald-400"
  }

  return (
    <div 
      className={`fixed top-20 left-1/2 -translate-x-1/2 z-[1001] transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'
      }`}
    >
      <div className={`flex items-center gap-3 px-5 py-3 rounded-xl bg-gradient-to-r ${typeStyles[type]} border backdrop-blur-md shadow-lg`}>
        <div className="w-8 h-8 rounded-lg bg-background/50 flex items-center justify-center">
          <MapPin className={`w-4 h-4 ${iconColors[type]}`} />
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">{message}</p>
        </div>
        <button
          onClick={() => {
            setIsVisible(false)
            setTimeout(onClose, 300)
          }}
          className="p-1 rounded-lg hover:bg-secondary/50 transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
      </div>
    </div>
  )
}
