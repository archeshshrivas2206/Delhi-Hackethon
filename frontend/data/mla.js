// frontend/data/mla.js
export const mlaData = {
  id: 1,
  name: "Arvind Kejriwal",
  constituency: "New Delhi",
  party: "Aam Aadmi Party (AAP)",
  party_color: "#00BFFF",
  party_symbol: "🧹", // Broom symbol
  since: "2013",
  office_address: "Kaushalya Park, New Delhi - 110001",
  phone: "011-23392123",
  email: "cm.delhi@nic.in",
  website: "delhi.gov.in",
  image: null, // Will use placeholder with initials
  
  bio: "Chief Minister of Delhi since 2015. Architect of the 'Delhi Model' focusing on education, healthcare, and infrastructure. Awarded the Ramon Magsaysay Award for transformative governance.",
  
  achievements: [
    {
      title: "Education Revolution",
      description: "Transformed government schools with modern infrastructure, new classrooms, and improved student outcomes.",
      year: "2015-2025",
      icon: "📚",
      color: "#3b82f6",
      stats: {
        label: "Schools Upgraded",
        value: "1,200+",
        progress: 100,
        metric: "1200 schools"
      },
      sub_stats: [
        { label: "New Classrooms", value: "5,000+" },
        { label: "Student Achievement", value: "90% pass rate" },
        { label: "Budget Allocation", value: "₹15,000 Cr" }
      ]
    },
    {
      title: "Mohalla Clinics",
      description: "Free primary healthcare centers providing quality medical care to all residents.",
      year: "2016-2025",
      icon: "🏥",
      color: "#10b981",
      stats: {
        label: "Clinics Established",
        value: "500+",
        progress: 100,
        metric: "500 clinics"
      },
      sub_stats: [
        { label: "Patients Served", value: "2.5 Cr+" },
        { label: "Free Medicines", value: "100+ types" },
        { label: "Budget", value: "₹800 Cr" }
      ]
    },
    {
      title: "Power & Water Reforms",
      description: "Subsidized electricity and water for residents with 24/7 supply improvements.",
      year: "2015-2025",
      icon: "💡",
      color: "#f59e0b",
      stats: {
        label: "Free Electricity",
        value: "200 units",
        progress: 100,
        metric: "Monthly subsidy"
      },
      sub_stats: [
        { label: "Free Water", value: "20,000 liters" },
        { label: "Beneficiaries", value: "50 Lakh+" },
        { label: "Annual Subsidy", value: "₹3,200 Cr" }
      ]
    },
    {
      title: "Infrastructure Development",
      description: "Construction of new flyovers, road improvements, and beautification projects.",
      year: "2020-2025",
      icon: "🛣️",
      color: "#ef4444",
      stats: {
        label: "Roads Built",
        value: "200+ km",
        progress: 85,
        metric: "85% complete"
      },
      sub_stats: [
        { label: "Flyovers", value: "15+" },
        { label: "Foot Overbridges", value: "50+" },
        { label: "Budget", value: "₹5,000 Cr" }
      ]
    }
  ],
  
  promises_kept: [
    { text: "Free electricity up to 200 units per month", completed: true },
    { text: "Free water up to 20,000 liters per month", completed: true },
    { text: "500+ Mohalla clinics established", completed: true },
    { text: "Government schools infrastructure upgraded", completed: true },
    { text: "Women's safety: 2 lakh+ CCTV cameras installed", completed: true },
    { text: "Bus fleet expansion with 1,000+ electric buses", completed: true },
    { text: "24x7 electricity supply across Delhi", completed: true }
  ],
  
  upcoming_projects: [
    { name: "Delhi-Meerut Expressway", timeline: "2025", icon: "🚇", status: "85% complete" },
    { name: "New flyover at Pragati Maidan", timeline: "2025", icon: "🛣️", status: "ongoing" },
    { name: "Metro Phase IV expansion", timeline: "2026", icon: "🚊", status: "planned" },
    { name: "New super-specialty hospitals", timeline: "2026", icon: "🏥", status: "planned" }
  ],
  
  contact_info: {
    office: "Kaushalya Park, New Delhi - 110001",
    phone: "011-23392123",
    email: "cm.delhi@nic.in",
    website: "delhi.gov.in",
    constituency_office: "New Delhi Constituency Office, Kaushalya Park"
  },
  
  social_media: {
    twitter: "@ArvindKejriwal",
    facebook: "ArvindKejriwal",
    instagram: "arvindkejriwal"
  }
}