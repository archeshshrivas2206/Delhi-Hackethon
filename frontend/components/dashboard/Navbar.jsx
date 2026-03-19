"use client"

import { Globe2, Bell, Search, User } from "lucide-react"
import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="h-16 border-b border-border bg-card/50 backdrop-blur-sm flex items-center justify-between px-6">
      <Link href="/" className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-500 to-cyan-500 flex items-center justify-center">
          <Globe2 className="w-5 h-5 text-background" />
        </div>
        <span className="font-semibold text-foreground hidden sm:block">Geo-Civic Platform</span>
      </Link>

      <div className="flex items-center gap-2">
        <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
          <Search className="w-5 h-5 text-muted-foreground" />
        </button>
        <button className="p-2 rounded-lg hover:bg-secondary transition-colors relative">
          <Bell className="w-5 h-5 text-muted-foreground" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-emerald-500 rounded-full" />
        </button>
        <button className="p-2 rounded-lg hover:bg-secondary transition-colors">
          <User className="w-5 h-5 text-muted-foreground" />
        </button>
      </div>
    </nav>
  )
}
