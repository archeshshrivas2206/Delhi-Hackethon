// frontend/data/zone.js
export const bharatMandapamZone = {
  id: 1,
  name: "Pragati Maidan - Bharat Mandapam",
  description: "India's premier convention and exhibition center, inaugurated in 2023. Hosted the G20 Summit and is a landmark of modern Indian infrastructure.",
  color: "#22c55e",
  coordinates: [
    [28.6115, 77.2390],  // Southwest
    [28.6115, 77.2450],  // Southeast
    [28.6175, 77.2450],  // Northeast
    [28.6175, 77.2390],  // Northwest
    [28.6115, 77.2390]   // Close polygon
  ],
  highlights: [
    { text: "G20 Summit 2023 Venue", icon: "🌍" },
    { text: "LEED Gold Certified", icon: "🏆" },
    { text: "25,000+ Capacity", icon: "👥" },
    { text: "7 Convention Halls", icon: "🏛️" }
  ],
  stats: {
    area: "123 acres",
    built_up: "2.7 million sq ft",
    parking: "5,500 cars",
    halls: 7
  }
}