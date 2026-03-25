// frontend/components/mla/MLACard.jsx
"use client"

import { useState } from "react"
import { MapPin, Phone, Mail, Globe, Twitter, Facebook, Instagram, Award, CheckCircle, Calendar } from "lucide-react"

export default function MLACard({ mla }) {
    const [activeTab, setActiveTab] = useState("achievements")

    if (!mla) return null

    return (
        <div className="bg-card border border-border rounded-xl overflow-hidden shadow-lg">
            {/* Header with Party Color */}
            <div className="relative" style={{ backgroundColor: `${mla.party_color}15` }}>
                <div className="absolute top-0 right-0 w-32 h-32 opacity-10" style={{ backgroundColor: mla.party_color }} />

                <div className="p-6">
                    <div className="flex items-start gap-6">
                        {/* Profile Image Placeholder */}
                        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                            {mla.name.charAt(0)}
                        </div>

                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h2 className="text-2xl font-bold text-foreground">{mla.name}</h2>
                                <span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: `${mla.party_color}20`, color: mla.party_color }}>
                                    {mla.party_symbol} {mla.party}
                                </span>
                            </div>
                            <p className="text-muted-foreground flex items-center gap-2 mb-2">
                                <MapPin className="w-4 h-4" />
                                {mla.constituency} Constituency • Since {mla.since}
                            </p>
                            <p className="text-sm text-muted-foreground max-w-2xl">{mla.bio}</p>

                            {/* Quick Stats */}
                            <div className="flex gap-4 mt-4">
                                <div className="flex items-center gap-1">
                                    <Award className="w-4 h-4 text-cyan-400" />
                                    <span className="text-sm">4 Major Achievements</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <CheckCircle className="w-4 h-4 text-green-400" />
                                    <span className="text-sm">{mla.promises_kept.length} Promises Kept</span>
                                </div>
                                <div className="flex items-center gap-1">
                                    <Calendar className="w-4 h-4 text-amber-400" />
                                    <span className="text-sm">12+ Years Service</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tab Navigation */}
                <div className="flex border-b border-border px-6">
                    <button
                        onClick={() => setActiveTab("achievements")}
                        className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === "achievements"
                                ? "border-cyan-500 text-cyan-400"
                                : "border-transparent text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        🏆 Achievements
                    </button>
                    <button
                        onClick={() => setActiveTab("promises")}
                        className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === "promises"
                                ? "border-cyan-500 text-cyan-400"
                                : "border-transparent text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        ✅ Promises Kept
                    </button>
                    <button
                        onClick={() => setActiveTab("projects")}
                        className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === "projects"
                                ? "border-cyan-500 text-cyan-400"
                                : "border-transparent text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        🚀 Upcoming Projects
                    </button>
                    <button
                        onClick={() => setActiveTab("contact")}
                        className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 ${activeTab === "contact"
                                ? "border-cyan-500 text-cyan-400"
                                : "border-transparent text-muted-foreground hover:text-foreground"
                            }`}
                    >
                        📞 Contact
                    </button>
                </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
                {activeTab === "achievements" && (
                    <div className="space-y-6">
                        {mla.achievements.map((achievement, idx) => (
                            <div key={idx} className="border border-border rounded-xl p-5 hover:shadow-md transition">
                                <div className="flex items-start gap-4">
                                    <div className="text-3xl">{achievement.icon}</div>
                                    <div className="flex-1">
                                        <div className="flex items-center justify-between mb-2">
                                            <h3 className="text-lg font-semibold">{achievement.title}</h3>
                                            <span className="text-xs text-muted-foreground">{achievement.year}</span>
                                        </div>
                                        <p className="text-sm text-muted-foreground mb-4">{achievement.description}</p>

                                        {/* Progress Bar */}
                                        <div className="mb-3">
                                            <div className="flex justify-between text-xs mb-1">
                                                <span>{achievement.stats.label}</span>
                                                <span>{achievement.stats.value}</span>
                                            </div>
                                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                                                <div
                                                    className="h-full rounded-full transition-all duration-500"
                                                    style={{
                                                        width: `${achievement.stats.progress}%`,
                                                        backgroundColor: achievement.color
                                                    }}
                                                />
                                            </div>
                                        </div>

                                        {/* Sub Stats */}
                                        <div className="grid grid-cols-3 gap-3 mt-4">
                                            {achievement.sub_stats.map((stat, i) => (
                                                <div key={i} className="bg-muted/30 rounded-lg p-2 text-center">
                                                    <p className="text-lg font-bold text-foreground">{stat.value}</p>
                                                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "promises" && (
                    <div className="grid md:grid-cols-2 gap-3">
                        {mla.promises_kept.map((promise, idx) => (
                            <div key={idx} className="flex items-center gap-3 p-3 bg-muted/30 rounded-lg">
                                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                <span className="text-sm">{promise.text}</span>
                            </div>
                        ))}
                    </div>
                )}

                {activeTab === "projects" && (
                    <div className="space-y-4">
                        {mla.upcoming_projects.map((project, idx) => (
                            <div key={idx} className="flex items-center justify-between p-4 border border-border rounded-lg">
                                <div className="flex items-center gap-3">
                                    <span className="text-2xl">{project.icon}</span>
                                    <div>
                                        <h4 className="font-semibold">{project.name}</h4>
                                        <p className="text-xs text-muted-foreground">Expected: {project.timeline}</p>
                                    </div>
                                </div>
                                <span className={`text-xs px-2 py-1 rounded-full ${project.status === "ongoing" ? "bg-amber-500/20 text-amber-400" :
                                        project.status === "85% complete" ? "bg-green-500/20 text-green-400" :
                                            "bg-cyan-500/20 text-cyan-400"
                                    }`}>
                                    {project.status === "85% complete" ? "85% Complete" :
                                        project.status === "ongoing" ? "In Progress" : "Planned"}
                                </span>
                            </div>
                        ))}
                    </div>
                )}
                {activeTab === "contact" && mla.contact_info && (
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-cyan-400 mt-0.5" />
                                <div>
                                    <p className="font-semibold">Constituency Office</p>
                                    <p className="text-sm text-muted-foreground">{mla.contact_info.constituency_office || mla.contact_info.office || "Not available"}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-cyan-400 mt-0.5" />
                                <div>
                                    <p className="font-semibold">Phone</p>
                                    <p className="text-sm text-muted-foreground">{mla.contact_info.phone || mla.phone || "Not available"}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-cyan-400 mt-0.5" />
                                <div>
                                    <p className="font-semibold">Email</p>
                                    <p className="text-sm text-muted-foreground">{mla.contact_info.email || mla.email || "Not available"}</p>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <Globe className="w-5 h-5 text-cyan-400 mt-0.5" />
                                <div>
                                    <p className="font-semibold">Website</p>
                                    <p className="text-sm text-muted-foreground">{mla.contact_info.website || mla.website || "delhi.gov.in"}</p>
                                </div>
                            </div>
                            {mla.social_media && (
                                <div className="flex items-start gap-3">
                                    <div className="flex gap-3 mt-1">
                                        {mla.social_media.twitter && <Twitter className="w-5 h-5 text-cyan-400 cursor-pointer hover:text-cyan-300" />}
                                        {mla.social_media.facebook && <Facebook className="w-5 h-5 text-cyan-400 cursor-pointer hover:text-cyan-300" />}
                                        {mla.social_media.instagram && <Instagram className="w-5 h-5 text-cyan-400 cursor-pointer hover:text-cyan-300" />}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}