"use client"

import { organizations } from "@/lib/dummyData"
import { Building2, Folder, Activity } from "lucide-react"

export default function OrganizationsView() {
  return (
    <div className="p-6 h-full overflow-auto">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Organizations</h1>
            <p className="text-sm text-muted-foreground">View participating government organizations</p>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {organizations.map((org) => (
            <div 
              key={org.id}
              className="p-5 bg-card/50 border border-border rounded-xl hover:bg-card/80 hover:border-emerald-500/30 transition-all duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0">
                  <Building2 className="w-6 h-6 text-emerald-400" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-foreground">{org.name}</h3>
                  <div className="flex items-center gap-4 mt-3">
                    <div className="flex items-center gap-1.5">
                      <Folder className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{org.projects} Projects</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Activity className="w-4 h-4 text-emerald-400" />
                      <span className="text-sm text-emerald-400">{org.activeProjects} Active</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
