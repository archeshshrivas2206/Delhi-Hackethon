// frontend/components/mla/MLACard.jsx
"use client"

import { useState } from "react"
import { 
    MapPin, Phone, Mail, Globe, Twitter, Facebook, Instagram, 
    Award, CheckCircle, Calendar, Trophy, CheckSquare, Rocket, 
    User, Building2, Clock, AlertCircle 
} from "lucide-react"

export default function MLACard({ mla }) {
    const [activeTab, setActiveTab] = useState("achievements")

    if (!mla) return null

    // Helper properties for gorgeous Party Colors
    const partyColorLight = `${mla.party_color}08`
    const partyColorMedium = `${mla.party_color}25`
    const partyColorDark = mla.party_color

    return (
        <div className="bg-card w-full rounded-[2rem] overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] border border-border/60 transition-all duration-300">
            {/* Header Area */}
            <div className="p-4 md:p-6 pb-0">
                <div className="p-8 md:p-10 rounded-[1.5rem] relative overflow-hidden transition-all duration-500 group" style={{ backgroundColor: partyColorLight }}>
                    {/* Artistic Background blobs */}
                    <div 
                        className="absolute -top-32 -right-32 w-[600px] h-[600px] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[100px] opacity-20 transition-transform duration-1000 group-hover:scale-110" 
                        style={{ backgroundColor: partyColorDark }} 
                    />
                    <div 
                        className="absolute -bottom-24 left-10 w-[400px] h-[400px] rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] opacity-10 transition-transform duration-1000 group-hover:-translate-x-10" 
                        style={{ backgroundColor: partyColorDark }} 
                    />
                    
                    <div className="flex flex-col md:flex-row items-start lg:items-center gap-8 relative z-10 w-full">
                        {/* Avatar */}
                        <div 
                            className="w-28 h-28 md:w-[130px] md:h-[130px] shrink-0 rounded-[1.5rem] flex items-center justify-center text-[4rem] font-black shadow-xl ring-4 ring-white dark:ring-zinc-900 transition-transform duration-500 hover:scale-105" 
                            style={{ 
                                background: `linear-gradient(135deg, ${partyColorLight}, white)`, 
                                color: partyColorDark,
                                boxShadow: `0 20px 40px -10px ${partyColorMedium}`
                            }}
                        >
                            {mla.name.charAt(0)}
                        </div>
                        
                        <div className="flex-1 w-full pt-2">
                            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-4">
                                <div>
                                    <h1 className="text-4xl md:text-[2.75rem] font-bold text-foreground tracking-tight leading-none mb-3">
                                        {mla.name}
                                    </h1>
                                    <p className="text-muted-foreground font-medium flex items-center gap-2 text-base">
                                        <span className="p-1.5 rounded-full bg-cyan-50 dark:bg-cyan-500/10 text-cyan-500 flex items-center justify-center">
                                            <MapPin className="w-4 h-4" strokeWidth={2.5} />
                                        </span>
                                        {mla.constituency} Constituency
                                    </p>
                                </div>
                                
                                {/* Premium Party Badge */}
                                <div className="px-5 py-2.5 rounded-xl border bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md flex items-center gap-3 h-fit shrink-0 shadow-sm transition-all hover:shadow-md" style={{ borderColor: partyColorMedium }}>
                                    <span className="text-lg drop-shadow-sm">{mla.party_symbol}</span>
                                    <span className="font-bold text-sm tracking-wide" style={{ color: partyColorDark }}>{mla.party}</span>
                                </div>
                            </div>
                            
                            <p className="text-[1.05rem] text-muted-foreground max-w-4xl leading-relaxed mt-6 font-medium pr-8">
                                {mla.bio}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Clean Tab Navigation */}
            <div className="px-8 mt-4 flex overflow-x-auto hide-scrollbar border-b border-border/50">
                {[
                    { id: "achievements", label: "Achievements", icon: Trophy, color: "text-blue-500" },
                    { id: "projects", label: "Projects", icon: Rocket, color: "text-purple-500" },
                    { id: "promises", label: "Promises", icon: CheckSquare, color: "text-emerald-500" },
                    { id: "contact", label: "Contact", icon: User, color: "text-orange-500" }
                ].map(tab => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2.5 px-6 py-5 text-[0.95rem] font-bold transition-all whitespace-nowrap border-b-[3px]
                                ${isActive 
                                    ? `border-primary text-foreground` 
                                    : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
                                }`}
                        >
                            <Icon className={`w-4.5 h-4.5 transition-colors ${isActive ? tab.color : 'text-muted-foreground/70'}`} strokeWidth={isActive ? 2.5 : 2} />
                            {tab.label}
                        </button>
                    )
                })}
            </div>

            {/* Tab Contents */}
            <div className="p-6 md:p-10 bg-gradient-to-b from-transparent to-muted/10 min-h-[400px]">
                
                {/* ACHIEVEMENTS TAB */}
                {activeTab === "achievements" && (
                    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Summary Row */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 mb-10">
                            {[
                                { val: mla.achievements.length, label: "Total Achievements", icon: Building2, color: "blue", bg: "bg-blue-500 text-white" },
                                { val: mla.promises_kept.length, label: "Promises Kept", icon: CheckCircle, color: "emerald", bg: "bg-emerald-500 text-white" },
                                { val: "12+", label: "Years Active", icon: Clock, color: "amber", bg: "bg-amber-500 text-white" },
                                { val: "A+", label: "Public Rating", icon: Award, color: "purple", bg: "bg-purple-500 text-white" },
                            ].map((stat, i) => (
                                <div key={i} className="bg-card hover:bg-muted/30 border border-border/80 rounded-[1.25rem] p-5 flex items-center gap-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 hover:border-transparent group">
                                    <div className={`p-3.5 rounded-xl shadow-sm ${stat.bg} ring-4 ring-${stat.color}-500/10 group-hover:scale-110 transition-transform duration-300`}>
                                        <stat.icon className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-black text-foreground">{stat.val}</p>
                                        <p className="text-[0.8rem] text-muted-foreground font-semibold uppercase tracking-wider mt-0.5">{stat.label}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* List items mimicking premium layout */}
                        {mla.achievements.map((achievement, idx) => {
                            const budgetLabel = achievement.sub_stats?.[0]?.label || "Budget";
                            const budgetValue = achievement.sub_stats?.[0]?.value || "₹25 Cr";
                            const beneLabel = achievement.sub_stats?.[1]?.label || "Beneficiaries";
                            const beneValue = achievement.sub_stats?.[1]?.value || "15,000";
                            const progValue = achievement.stats?.progress || 100;
                            const isComplete = progValue >= 85;

                            return (
                                <div key={idx} className="bg-white dark:bg-zinc-950 border border-border/50 rounded-2xl p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
                                    <div className="flex justify-between items-start mb-6">
                                        <div className="flex items-start gap-4">
                                            <div className={`mt-[0.4rem] w-3 h-3 rounded-full shrink-0 shadow-sm ${isComplete ? 'bg-emerald-500' : 'bg-cyan-500'}`} />
                                            <div>
                                                <h3 className="text-[1.3rem] font-bold text-foreground transition-colors hover:text-emerald-600">{achievement.title}</h3>
                                                <p className="text-sm text-muted-foreground mt-2 leading-relaxed max-w-3xl pr-4">{achievement.description}</p>
                                            </div>
                                        </div>
                                        <span className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm border ${
                                            isComplete 
                                            ? 'bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400' 
                                            : 'bg-cyan-50 border-cyan-200 text-cyan-600 dark:bg-cyan-500/10 dark:border-cyan-500/20 dark:text-cyan-400'
                                        }`}>
                                            {isComplete ? 'Completed' : 'Ongoing'}
                                        </span>
                                    </div>

                                    {/* Stats grid */}
                                    <div className="grid grid-cols-3 gap-6 mb-6">
                                        <div className="bg-zinc-50 dark:bg-zinc-900/40 p-5 rounded-2xl border border-transparent hover:border-border/60 transition-colors">
                                            <p className="text-[0.7rem] text-muted-foreground font-extrabold uppercase tracking-[0.15em] mb-1.5">{budgetLabel}</p>
                                            <p className="text-[1.35rem] font-bold text-foreground">{budgetValue}</p>
                                        </div>
                                        <div className="bg-zinc-50 dark:bg-zinc-900/40 p-5 rounded-2xl border border-transparent hover:border-border/60 transition-colors">
                                            <p className="text-[0.7rem] text-muted-foreground font-extrabold uppercase tracking-[0.15em] mb-1.5">{beneLabel}</p>
                                            <p className="text-[1.35rem] font-bold text-foreground">{beneValue}</p>
                                        </div>
                                        <div className="bg-zinc-50 dark:bg-zinc-900/40 p-5 rounded-2xl border border-transparent hover:border-border/60 transition-colors">
                                            <p className="text-[0.7rem] text-muted-foreground font-extrabold uppercase tracking-[0.15em] mb-1.5">Progress</p>
                                            <p className="text-[1.35rem] font-bold text-foreground">{progValue}%</p>
                                        </div>
                                    </div>

                                    {/* Solid Progress line */}
                                    <div className={`h-2.5 w-full rounded-full overflow-hidden ${isComplete ? 'bg-[#00c853]' : 'bg-muted/80'}`}>
                                        {!isComplete && (
                                            <div className="h-full rounded-full bg-cyan-500" style={{ width: `${progValue}%` }} />
                                        )}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* PROJECTS TAB */}
                {activeTab === "projects" && (
                    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {mla.upcoming_projects.map((project, idx) => {
                            const isPending = project.status === "planned";
                            const isOngoing = project.status === "ongoing";
                            const isComplete = project.status === "85% complete" || project.status === "completed";
                            
                            let statusColor = "bg-gray-500 shadow-gray-500/50";
                            let statusBadge = "bg-gray-50 border-gray-200 text-gray-600";
                            let statusText = "Planned";

                            if (isComplete) {
                                statusColor = "bg-emerald-500 shadow-emerald-500/50";
                                statusBadge = "bg-emerald-50 border-emerald-200 text-emerald-600 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-400";
                                statusText = "Completed";
                            } else if (isOngoing) {
                                statusColor = "bg-cyan-500 shadow-cyan-500/50";
                                statusBadge = "bg-cyan-50 border-cyan-200 text-cyan-600 dark:bg-cyan-500/10 dark:border-cyan-500/20 dark:text-cyan-400";
                                statusText = "Ongoing";
                            } else if (isPending) {
                                statusColor = "bg-amber-500 shadow-amber-500/50";
                                statusBadge = "bg-amber-50 border-amber-200 text-amber-600 dark:bg-amber-500/10 dark:border-amber-500/20 dark:text-amber-400";
                                statusText = "Pending";
                            }

                            return (
                                <div key={idx} className="bg-card hover:bg-muted/20 border border-border/80 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-transparent group">
                                    <div className="flex items-start gap-5">
                                        <div className={`mt-2 w-3.5 h-3.5 rounded-full shrink-0 shadow-sm ${statusColor}`} />
                                        <div>
                                            <h4 className="text-[1.15rem] font-bold text-foreground group-hover:text-primary transition-colors">{project.name}</h4>
                                            <p className="text-sm text-muted-foreground mt-1.5 flex items-center gap-2 font-medium">
                                                <Calendar className="w-4 h-4 text-cyan-500" />
                                                Expected: {project.timeline}
                                            </p>
                                        </div>
                                    </div>
                                    <span className={`px-4 py-1.5 text-xs font-bold uppercase tracking-wider rounded-full shadow-sm border w-fit ${statusBadge}`}>
                                        {statusText}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                )}

                {/* PROMISES TAB */}
                {activeTab === "promises" && (
                    <div className="grid md:grid-cols-2 gap-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {mla.promises_kept.map((promise, idx) => (
                            <div key={idx} className="bg-card border border-border/80 rounded-2xl p-5 flex items-start gap-4 hover:shadow-lg hover:border-emerald-500/30 transition-all duration-300 group hover:-translate-y-0.5">
                                <div className="p-2.5 bg-emerald-500 text-white rounded-xl shrink-0 shadow-sm shadow-emerald-500/30 group-hover:scale-110 transition-transform">
                                    <CheckCircle className="w-5 h-5" />
                                </div>
                                <span className="text-[1.05rem] font-medium text-foreground leading-relaxed mt-1">{promise.text}</span>
                            </div>
                        ))}
                    </div>
                )}

                {/* CONTACT TAB */}
                {activeTab === "contact" && mla.contact_info && (
                    <div className="bg-card border border-border/80 rounded-[1.5rem] p-8 md:p-10 shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="grid md:grid-cols-2 gap-x-16 gap-y-10">
                            <div className="space-y-8">
                                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest border-b border-border/50 pb-3">Office Details</h3>
                                
                                <div className="flex items-start gap-5 group">
                                    <div className="p-3 bg-blue-50 dark:bg-blue-500/10 text-blue-500 rounded-xl shrink-0 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-sm">
                                        <MapPin className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-foreground text-[0.95rem]">Constituency Office</p>
                                        <p className="text-[1.05rem] text-muted-foreground mt-1.5 leading-relaxed">{mla.contact_info.constituency_office || mla.contact_info.office || "Not available"}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-5 group">
                                    <div className="p-3 bg-emerald-50 dark:bg-emerald-500/10 text-emerald-500 rounded-xl shrink-0 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-sm">
                                        <Phone className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-foreground text-[0.95rem]">Phone Number</p>
                                        <p className="text-[1.05rem] text-muted-foreground mt-1.5 font-medium">{mla.contact_info.phone || mla.phone || "Not available"}</p>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="space-y-8">
                                <h3 className="text-sm font-bold text-muted-foreground uppercase tracking-widest border-b border-border/50 pb-3">Online Presence</h3>
                                
                                <div className="flex items-start gap-5 group">
                                    <div className="p-3 bg-purple-50 dark:bg-purple-500/10 text-purple-500 rounded-xl shrink-0 group-hover:scale-110 group-hover:bg-purple-500 group-hover:text-white transition-all shadow-sm">
                                        <Mail className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-foreground text-[0.95rem]">Email Address</p>
                                        <p className="text-[1.05rem] text-muted-foreground mt-1.5 font-medium">{mla.contact_info.email || mla.email || "Not available"}</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-5 group">
                                    <div className="p-3 bg-cyan-50 dark:bg-cyan-500/10 text-cyan-500 rounded-xl shrink-0 group-hover:scale-110 group-hover:bg-cyan-500 group-hover:text-white transition-all shadow-sm">
                                        <Globe className="w-6 h-6" />
                                    </div>
                                    <div>
                                        <p className="font-bold text-foreground text-[0.95rem]">Website</p>
                                        <p className="text-[1.05rem] text-muted-foreground mt-1.5 font-medium">{mla.contact_info.website || mla.website || "delhi.gov.in"}</p>
                                    </div>
                                </div>
                                
                                {mla.social_media && (
                                    <div className="pt-6 mt-4 flex items-center gap-4">
                                        {mla.social_media.twitter && <button className="p-3 rounded-full bg-muted/50 hover:bg-[#1DA1F2] hover:text-white text-gray-400 transition-all shadow-sm hover:shadow-md hover:-translate-y-1"><Twitter className="w-5 h-5" /></button>}
                                        {mla.social_media.facebook && <button className="p-3 rounded-full bg-muted/50 hover:bg-[#1877F2] hover:text-white text-gray-400 transition-all shadow-sm hover:shadow-md hover:-translate-y-1"><Facebook className="w-5 h-5" /></button>}
                                        {mla.social_media.instagram && <button className="p-3 rounded-full bg-muted/50 hover:bg-gradient-to-tr hover:from-[#F58529] hover:via-[#DD2A7B] hover:to-[#8134AF] hover:text-white text-gray-400 transition-all shadow-sm hover:shadow-md hover:-translate-y-1"><Instagram className="w-5 h-5" /></button>}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}