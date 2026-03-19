export const projects = [
  {
    id: 1,
    title: "City Hospital Expansion",
    organization: "Municipal Corporation",
    representative: "Dr. Rajesh Sharma (MLA)",
    description: "50 ICU beds added under Ayushman Bharat scheme serving 20,000 citizens annually. State-of-the-art medical equipment installed.",
    status: "Completed",
    impact: "20,000+ citizens benefited annually",
    lastUpdated: "1 week ago",
    coordinates: [28.6139, 77.2090], // Delhi
    radius: 800,
    color: "#10b981" // emerald
  },
  {
    id: 2,
    title: "Smart Traffic Management System",
    organization: "Transport Department",
    representative: "Amit Verma (Commissioner)",
    description: "AI-powered traffic signal system covering 50 intersections. Real-time monitoring and adaptive signal timing.",
    status: "Ongoing",
    impact: "30% reduction in traffic congestion",
    lastUpdated: "3 days ago",
    coordinates: [28.6280, 77.2195],
    radius: 1200,
    color: "#06b6d4" // cyan
  },
  {
    id: 3,
    title: "Green Park Development",
    organization: "Parks & Recreation Dept",
    representative: "Sunita Gupta (Councillor)",
    description: "10-acre urban park with jogging tracks, children's play area, and open gym. Solar-powered lighting throughout.",
    status: "Ongoing",
    impact: "5,000 daily visitors expected",
    lastUpdated: "5 days ago",
    coordinates: [28.5985, 77.1990],
    radius: 600,
    color: "#06b6d4" // cyan
  },
  {
    id: 4,
    title: "Water Treatment Plant Upgrade",
    organization: "Jal Board",
    representative: "Priya Mehta (Chief Engineer)",
    description: "Capacity increased from 50 MLD to 100 MLD. Advanced filtration systems and 24/7 quality monitoring.",
    status: "Completed",
    impact: "Clean water for 2 lakh households",
    lastUpdated: "2 weeks ago",
    coordinates: [28.6350, 77.2250],
    radius: 1000,
    color: "#10b981" // emerald
  },
  {
    id: 5,
    title: "Metro Line Extension",
    organization: "Metro Rail Corporation",
    representative: "Vikram Singh (MD)",
    description: "12 km extension with 8 new stations connecting eastern suburbs. Expected to serve 5 lakh daily commuters.",
    status: "Ongoing",
    impact: "5 lakh daily commuters",
    lastUpdated: "1 day ago",
    coordinates: [28.6450, 77.2100],
    radius: 1500,
    color: "#06b6d4" // cyan
  },
  {
    id: 6,
    title: "Solar Power Plant",
    organization: "Renewable Energy Dept",
    representative: "Rahul Jain (Director)",
    description: "50 MW solar power plant generating clean energy for 10,000 households. Reduces carbon footprint significantly.",
    status: "Completed",
    impact: "10,000 households powered",
    lastUpdated: "1 month ago",
    coordinates: [28.5800, 77.2300],
    radius: 900,
    color: "#10b981" // emerald
  }
]

export const organizations = [
  { id: 1, name: "Municipal Corporation", projects: 15, activeProjects: 8 },
  { id: 2, name: "Transport Department", projects: 12, activeProjects: 5 },
  { id: 3, name: "Parks & Recreation Dept", projects: 8, activeProjects: 3 },
  { id: 4, name: "Jal Board", projects: 10, activeProjects: 4 },
  { id: 5, name: "Metro Rail Corporation", projects: 6, activeProjects: 2 },
  { id: 6, name: "Renewable Energy Dept", projects: 9, activeProjects: 4 },
]

export const complaints = [
  { id: 1, title: "Road repair needed", status: "Pending", location: "Sector 15", date: "2024-01-15" },
  { id: 2, title: "Street light not working", status: "Resolved", location: "Main Market", date: "2024-01-14" },
  { id: 3, title: "Water supply issue", status: "In Progress", location: "Block A", date: "2024-01-13" },
  { id: 4, title: "Garbage collection delay", status: "Pending", location: "Residential Area", date: "2024-01-12" },
]
