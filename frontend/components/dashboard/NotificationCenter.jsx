"use client"

import { useState, useEffect } from "react"
import { X, Bell, MapPin, CheckCircle, Clock, Trash2, AlertCircle } from "lucide-react"

export default function NotificationCenter({ isOpen, onClose, notifications, onMarkAsRead, onClearAll }) {
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setAnimate(true)
    } else {
      setAnimate(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  const getIcon = (type) => {
    switch (type) {
      case "zone":
        return <MapPin className="w-4 h-4 text-green-400" />
      case "project":
        return <Bell className="w-4 h-4 text-blue-400" />
      case "complaint":
        return <CheckCircle className="w-4 h-4 text-yellow-400" />
      case "info":
        return <AlertCircle className="w-4 h-4 text-cyan-400" />
      default:
        return <Bell className="w-4 h-4 text-gray-400" />
    }
  }

  const getTimeAgo = (timestamp) => {
    if (!timestamp) return "Just now"
    const seconds = Math.floor((new Date() - new Date(timestamp)) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  // Get notification message safely
  const getMessage = (notification) => {
    return notification.text || notification.message || "New notification"
  }

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black/50 z-[1000] transition-opacity duration-300 ${
          animate ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />
      
      {/* Notification Panel */}
      <div 
        className={`fixed right-0 top-0 h-full w-96 bg-card border-l border-border shadow-2xl z-[1001] transition-transform duration-300 ${
          animate ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-cyan-400" />
            <h2 className="text-lg font-semibold">Notifications</h2>
            {notifications.length > 0 && (
              <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded-full">
                {notifications.length}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-muted transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Notifications List */}
        <div className="flex-1 overflow-y-auto h-[calc(100%-140px)]">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
              <Bell className="w-12 h-12 mb-2 opacity-30" />
              <p className="text-sm">No notifications yet</p>
              <p className="text-xs">You'll see updates here when you enter zones or get nearby projects</p>
            </div>
          ) : (
            <div className="divide-y divide-border">
              {notifications.map((notif) => (
                <div
                  key={notif.id}
                  className={`p-4 hover:bg-muted/30 transition cursor-pointer ${
                    !notif.read ? "bg-cyan-500/5" : ""
                  }`}
                  onClick={() => onMarkAsRead(notif.id)}
                >
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center flex-shrink-0">
                      {getIcon(notif.type)}
                    </div>
                    <div className="flex-1">
                      <p className={`text-sm ${!notif.read ? "font-semibold" : "text-muted-foreground"}`}>
                        {getMessage(notif)}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {getTimeAgo(notif.timestamp)}
                      </p>
                      {notif.link && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            if (notif.link) {
                              // Handle navigation
                              if (notif.link.includes("view=map")) {
                                // Navigate to map view
                                window.location.href = notif.link
                              }
                            }
                          }}
                          className="text-xs text-cyan-400 hover:text-cyan-300 mt-2 inline-block"
                        >
                          View on Map →
                        </button>
                      )}
                    </div>
                    {!notif.read && (
                      <div className="w-2 h-2 rounded-full bg-cyan-400 mt-2 flex-shrink-0" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {notifications.length > 0 && (
          <div className="p-4 border-t border-border">
            <button
              onClick={onClearAll}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 rounded-lg transition"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          </div>
        )}
      </div>
    </>
  )
}