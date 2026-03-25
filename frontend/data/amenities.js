// frontend/data/amenities.js
export const amenitiesData = [
  // Transport
  {
    id: 1,
    name: "Pragati Maidan Metro Station",
    type: "metro",
    category: "transport",
    lat: 28.6140,
    lng: 77.2405,
    address: "Pragati Maidan, New Delhi",
    description: "Delhi Metro Blue Line station, directly connected to Bharat Mandapam via skywalk.",
    distance: "0.1 km",
    timings: "5:30 AM - 11:30 PM",
    platform: "Blue Line"
  },
  {
    id: 2,
    name: "Supreme Court of India",
    type: "court",
    category: "government",
    lat: 28.6220,
    lng: 77.2390,
    address: "Tilak Marg, New Delhi",
    description: "Highest judicial body in India. Visitors can attend court proceedings.",
    timings: "10:00 AM - 5:00 PM",
    website: "sci.gov.in"
  },
  
  // Monuments & Recreation
  {
    id: 3,
    name: "India Gate",
    type: "monument",
    category: "recreation",
    lat: 28.6129,
    lng: 77.2295,
    address: "Rajpath, New Delhi",
    description: "Iconic war memorial dedicated to Indian soldiers who died in World War I.",
    rating: 4.8,
    timings: "24/7",
    best_time: "Evening for light show"
  },
  {
    id: 4,
    name: "National Museum",
    type: "museum",
    category: "recreation",
    lat: 28.6120,
    lng: 77.2340,
    address: "Janpath, New Delhi",
    description: "India's premier museum with artifacts spanning 5,000 years of history.",
    rating: 4.6,
    timings: "10:00 AM - 6:00 PM (Closed Monday)",
    entry_fee: "₹20 (Indians), ₹650 (Foreigners)"
  },
  {
    id: 5,
    name: "National Gallery of Modern Art",
    type: "museum",
    category: "recreation",
    lat: 28.6150,
    lng: 77.2360,
    address: "Jaipur House, India Gate",
    description: "Modern and contemporary art museum housed in a heritage building.",
    rating: 4.5,
    timings: "11:00 AM - 6:30 PM (Closed Monday)",
    entry_fee: "₹20"
  },
  {
    id: 6,
    name: "Jawaharlal Nehru Stadium",
    type: "stadium",
    category: "recreation",
    lat: 28.5800,
    lng: 77.2300,
    address: "Lodhi Road, New Delhi",
    description: "Multi-purpose stadium, venue for Commonwealth Games 2010.",
    rating: 4.3,
    events: "Sports, concerts"
  },
  
  // Healthcare
  {
    id: 7,
    name: "Max Hospital Saket",
    type: "hospital",
    category: "healthcare",
    lat: 28.5280,
    lng: 77.2100,
    address: "Saket, New Delhi",
    description: "Multi-specialty hospital with 24/7 emergency services.",
    rating: 4.5,
    timings: "24/7",
    emergency: "011-26515050"
  },
  {
    id: 8,
    name: "AIIMS Delhi",
    type: "hospital",
    category: "healthcare",
    lat: 28.5675,
    lng: 77.2100,
    address: "Ansari Nagar, New Delhi",
    description: "All India Institute of Medical Sciences, India's premier medical institution.",
    rating: 4.7,
    timings: "24/7",
    emergency: "011-26588500"
  },
  
  // Education
  {
    id: 9,
    name: "Delhi Public School, Mathura Road",
    type: "school",
    category: "education",
    lat: 28.6300,
    lng: 77.2400,
    address: "Mathura Road, New Delhi",
    description: "Premier educational institution with excellent academic record.",
    rating: 4.7,
    established: "1949"
  },
  {
    id: 10,
    name: "Jamia Millia Islamia",
    type: "university",
    category: "education",
    lat: 28.5620,
    lng: 77.2800,
    address: "Jamia Nagar, New Delhi",
    description: "Central university known for its academic excellence.",
    rating: 4.6,
    established: "1920"
  },
  
  // Shopping & Markets
  {
    id: 11,
    name: "Connaught Place",
    type: "market",
    category: "shopping",
    lat: 28.6300,
    lng: 77.2200,
    address: "Connaught Place, New Delhi",
    description: "Iconic commercial hub with shops, restaurants, and cafes.",
    timings: "10:00 AM - 10:00 PM",
    parking: "Available"
  },
  {
    id: 12,
    name: "Select Citywalk Mall",
    type: "mall",
    category: "shopping",
    lat: 28.5320,
    lng: 77.2080,
    address: "Saket, New Delhi",
    description: "Premium shopping mall with international brands.",
    rating: 4.6,
    timings: "11:00 AM - 9:00 PM"
  }
]