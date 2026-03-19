"use client"

import { complaints } from "@/lib/dummyData"
import { MessageSquare, Clock, MapPin, CheckCircle, AlertCircle, Loader2 } from "lucide-react"

export default function ComplaintsView() {
  const statusConfig = {
    Pending: { 
      icon: AlertCircle, 
      color: "text-amber-400",
      bg: "bg-amber-500/20 border-amber-500/30"
    },
    "In Progress": { 
      icon: Loader2, 
      color: "text-cyan-400",
      bg: "bg-cyan-500/20 border-cyan-500/30"
    },
    Resolved: { 
      icon: CheckCircle, 
      color: "text-emerald-400",
      bg: "bg-emerald-500/20 border-emerald-500/30"
    }
  }

  return (
    <div className="p-6 h-full overflow-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
            <MessageSquare className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Complaints</h1>
            <p className="text-sm text-muted-foreground">Track and manage citizen complaints</p>
          </div>
        </div>

        <div className="grid gap-4">
          {complaints.map((complaint) => {
            const status = statusConfig[complaint.status]
            const StatusIcon = status.icon
            return (
              <div 
                key={complaint.id}
                className="p-4 bg-card/50 border border-border rounded-xl hover:bg-card/80 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">{complaint.title}</h3>
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1.5">
                        <MapPin className="w-4 h-4" />
                        {complaint.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        {complaint.date}
                      </span>
                    </div>
                  </div>
                  <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border ${status.bg}`}>
                    <StatusIcon className={`w-4 h-4 ${status.color} ${complaint.status === "In Progress" ? "animate-spin" : ""}`} />
                    <span className={`text-xs font-medium ${status.color}`}>{complaint.status}</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
