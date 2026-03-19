"use client"

import { Map, MessageSquare, Building2, ChevronLeft, ChevronRight } from "lucide-react"
import { useState } from "react"

const menuItems = [
  { id: "map", icon: Map, label: "Map" },
  { id: "complaints", icon: MessageSquare, label: "Complaints" },
  { id: "organizations", icon: Building2, label: "Organizations" },
]

export default function Sidebar({ activeItem = "map", onItemClick }) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside 
      className={`${collapsed ? 'w-16' : 'w-64'} h-full border-r border-border bg-card/30 backdrop-blur-sm transition-all duration-300 flex flex-col`}
    >
      <div className="flex-1 py-4">
        <div className="px-3 mb-4">
          <p className={`text-xs font-medium text-muted-foreground uppercase tracking-wider ${collapsed ? 'hidden' : 'block'}`}>
            Navigation
          </p>
        </div>
        <nav className="space-y-1 px-2">
          {menuItems.map((item) => {
            const isActive = activeItem === item.id
            return (
              <button
                key={item.id}
                onClick={() => onItemClick?.(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 ${
                  isActive 
                    ? 'bg-gradient-to-r from-emerald-500/20 to-cyan-500/20 text-emerald-400 border border-emerald-500/30' 
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                <item.icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-emerald-400' : ''}`} />
                <span className={`font-medium ${collapsed ? 'hidden' : 'block'}`}>{item.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      <div className="p-3 border-t border-border">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors"
        >
          {collapsed ? (
            <ChevronRight className="w-5 h-5" />
          ) : (
            <>
              <ChevronLeft className="w-5 h-5" />
              <span className="text-sm">Collapse</span>
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
