"use client"

import { X, Building2, User, FileText, Activity, Clock } from "lucide-react"

export default function InfoCard({ project, onClose }) {
  if (!project) return null

  const statusColors = {
    Completed: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
    Ongoing: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30",
    Planned: "bg-amber-500/20 text-amber-400 border-amber-500/30"
  }

  return (
    <div className="absolute top-4 right-4 w-96 max-w-[calc(100%-2rem)] bg-card/95 backdrop-blur-md border border-border rounded-2xl shadow-2xl z-[1000] overflow-hidden animate-in slide-in-from-right-5 duration-300">
      {/* Header */}
      <div className="relative p-4 border-b border-border bg-gradient-to-r from-emerald-500/10 to-cyan-500/10">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 p-1.5 rounded-lg hover:bg-secondary transition-colors"
        >
          <X className="w-4 h-4 text-muted-foreground" />
        </button>
        <h3 className="text-lg font-semibold text-foreground pr-8">{project.title}</h3>
        <div className="flex items-center gap-2 mt-2">
          <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${statusColors[project.status]}`}>
            {project.status}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
            <Building2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Organization</p>
            <p className="text-sm font-medium text-foreground">{project.organization}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
            <User className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Representative</p>
            <p className="text-sm font-medium text-foreground">{project.representative}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
            <FileText className="w-4 h-4 text-emerald-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Description</p>
            <p className="text-sm text-foreground leading-relaxed">{project.description}</p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center flex-shrink-0">
            <Activity className="w-4 h-4 text-cyan-400" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Impact</p>
            <p className="text-sm text-foreground">{project.impact}</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-border bg-secondary/30">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <Clock className="w-3.5 h-3.5" />
          <span>Last updated: {project.lastUpdated || "2 days ago"}</span>
        </div>
      </div>
    </div>
  )
}
