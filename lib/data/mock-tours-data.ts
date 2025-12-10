export interface Tour {
  id: string;
  title: string;
  status: "Active" | "Pending Review" | "Completed" | "Paused";
  price: number;
  location: string;
  guide: string;
  dates: string;
  bookings: number;
  image: string;
}

export const TOURS_DATA: Tour[] = [
  {
    id: "1",
    title: "Yankari Wildlife Safari",
    status: "Active",
    price: 520000,
    location: "Bauchi State, Nigeria",
    guide: "Amina Yusuf",
    dates: "Nov 14th - Nov 17th 2025",
    bookings: 1,
    image: "/placeholder.svg?height=200&width=300&text=Yankari",
  },
  {
    id: "2",
    title: "2 days relaxation at Ziba Beach Resort",
    status: "Pending Review",
    price: 450000,
    location: "Lagos State, Nigeria",
    guide: "Asake Bello",
    dates: "Dec 5th - Dec 7th 2025",
    bookings: 0,
    image: "/placeholder.svg?height=200&width=300&text=Ziba+Resort",
  },
  {
    id: "3",
    title: "3 day Abeokuta Adventure",
    status: "Pending Review",
    price: 120000,
    location: "Ogun State, Nigeria",
    guide: "Tunde Bakare",
    dates: "Oct 10th - Oct 12th 2025",
    bookings: 0,
    image: "/placeholder.svg?height=200&width=300&text=Abeokuta",
  },
  {
    id: "4",
    title: "4-day Tarkwa Bay Beach Retreat",
    status: "Pending Review",
    price: 120000,
    location: "Lagos State, Nigeria",
    guide: "Chinedu Eze",
    dates: "Sep 5th - Sep 8th 2025",
    bookings: 0,
    image: "/placeholder.svg?height=200&width=300&text=Tarkwa+Bay",
  },
  {
    id: "5",
    title: "2-day Idanre Hills Expedition",
    status: "Completed",
    price: 85000,
    location: "Ondo State, Nigeria",
    guide: "Subomi Rasheed",
    dates: "Jul 28th - Jul 30th 2025",
    bookings: 8,
    image: "/placeholder.svg?height=200&width=300&text=Idanre+Hills",
  },
  {
    id: "6",
    title: "Weekend at Erin-Ijesha Waterfall",
    status: "Active",
    price: 80000,
    location: "Osun State, Nigeria",
    guide: "Samuel Adeleye",
    dates: "Aug 21st - Aug 23rd 2025",
    bookings: 0,
    image: "/placeholder.svg?height=200&width=300&text=Erin-Ijesha",
  },
  {
    id: "7",
    title: "4-day Abuja City & Nature Experience",
    status: "Paused",
    price: 600000,
    location: "FCT Abuja State, Nigeria",
    guide: "Usman Bello",
    dates: "Dec 14th - Dec 18th 2025",
    bookings: 0,
    image: "/placeholder.svg?height=200&width=300&text=Abuja",
  },
  {
    id: "8",
    title: "Jos Plateau Exploration",
    status: "Active",
    price: 30000,
    location: "Plateau State, Nigeria",
    guide: "Sani Yazri",
    dates: "Nov 22nd 2025",
    bookings: 0,
    image: "/placeholder.svg?height=200&width=300&text=Jos",
  },
];
