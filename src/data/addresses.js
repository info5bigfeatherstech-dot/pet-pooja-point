// src/data/addresses.js - 3 dummy saved addresses conforming to Address data contract
export const dummyAddresses = [
  {
    id: "addr-1",
    label: "home",
    name: "Aarav Sharma",
    phone: "9876543210",
    line1: "Flat 402, Signature Tower B",
    line2: "Green Glen Layout, Bellandur",
    landmark: "Near EcoSpace Tech Park",
    city: "Bengaluru",
    pincode: "560103",
    isDefault: true,
  },
  {
    id: "addr-2",
    label: "work",
    name: "Aarav Sharma",
    phone: "9876543210",
    line1: "5th Floor, Innov8 Coworking Hub",
    line2: "Cyber City, DLF Phase 2",
    landmark: "Opposite Cyber Hub Entrance",
    city: "Gurugram",
    pincode: "122002",
    isDefault: false,
  },
  {
    id: "addr-3",
    label: "other",
    name: "Aarav Sharma",
    phone: "9876543210",
    line1: "Villa 14, Palm Meadows",
    line2: "Airport Road, Viman Nagar",
    landmark: "Near Phoenix Marketcity",
    city: "Pune",
    pincode: "411014",
    isDefault: false,
  },
]

export default dummyAddresses
