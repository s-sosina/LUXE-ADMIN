export const MOCK_TOP_GUIDES = [
  { name: "Chidi Okafor", tours: 12, bookings: 285, revenue: 8450000 },
  { name: "David Eze", tours: 20, bookings: 167, revenue: 4120000 },
  { name: "Grace Adeyemi", tours: 6, bookings: 145, revenue: 7340000 },
  { name: "Emeka Okonkwo", tours: 8, bookings: 214, revenue: 9230000 },
  { name: "Fatima Mohammed", tours: 15, bookings: 198, revenue: 5890000 },
].sort((a, b) => b.revenue - a.revenue);

export const MOCK_TOP_LOCATIONS = [
  { name: "Lagos State", tours: 45, bookings: 567, revenue: 8900000 },
  { name: "Cross River State", tours: 18, bookings: 489, revenue: 7650000 },
  { name: "Ogun State", tours: 23, bookings: 384, revenue: 6780000 },
  { name: "Edo State", tours: 12, bookings: 298, revenue: 4560000 },
  { name: "Ondo State", tours: 6, bookings: 122, revenue: 8890000 },
].sort((a, b) => b.revenue - a.revenue);
