'use client'

import { useState, useMemo, useCallback } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { MoreHorizontal, Search, Download, FileText, FileSpreadsheet } from 'lucide-react'
import { DataTable, Column } from '@/components/ui/data-table'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { BookingStats, BookingStatsSkeleton } from '@/components/bookings/bookings-stats'

// Types
interface Booking {
  id: string
  tourName: string
  userName: string
  userAvatar?: string
  guideName: string
  date: string
  participants: number
  amount: number
  status: 'upcoming' | 'completed' | 'cancelled'
}

interface BookingsResponse {
  bookings: Booking[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
  }
  stats: {
    totalBookings: number
    upcoming: number
    completed: number
    revenue: number
  }
}

type StatusFilter = 'all' | 'upcoming' | 'completed' | 'cancelled'

// Constants
const DEFAULT_PAGINATION = {
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
} as const

const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true,
}

const STATUS_CONFIG = {
  upcoming: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-200', label: 'Upcoming' },
  completed: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', label: 'Completed' },
  cancelled: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', label: 'Cancelled' },
} as const

const CSV_HEADERS = ['Booking ID', 'Tour', 'User', 'Guide', 'Date', 'Participants', 'Amount', 'Status']

// Utility functions (outside component)
const formatCurrency = (amount: number): string => `₦${amount.toLocaleString()}`

const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleDateString('en-US', DATE_FORMAT_OPTIONS)

const getStatusBadge = (status: Booking['status']) => {
  const config = STATUS_CONFIG[status]
  if (!config) return null
  
  return (
    <Badge className={`${config.bg} ${config.text} hover:${config.bg} font-medium ${config.border} shadow-none`}>
      {config.label}
    </Badge>
  )
}

const exportToCSV = (bookings: Booking[]): void => {
  const rows = bookings.map((b) => [
    b.id,
    b.tourName,
    b.userName,
    b.guideName,
    new Date(b.date).toLocaleDateString(),
    b.participants,
    b.amount,
    b.status,
  ])

  const csvContent =
    'data:text/csv;charset=utf-8,' +
    [CSV_HEADERS.join(','), ...rows.map((row) => row.join(','))].join('\n')

  const link = document.createElement('a')
  link.href = encodeURI(csvContent)
  link.download = 'bookings_export.csv'
  link.click()
}

// Actions cell component (prevents recreation)
const ActionsCell = () => (
  <DropdownMenu>
    <DropdownMenuTrigger asChild>
      <Button variant="ghost" size="icon" className="h-8 w-8">
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </DropdownMenuTrigger>
    <DropdownMenuContent align="end">
      <DropdownMenuItem>View Details</DropdownMenuItem>
      <DropdownMenuItem>Edit Booking</DropdownMenuItem>
      <DropdownMenuItem className="text-red-600">Cancel Booking</DropdownMenuItem>
    </DropdownMenuContent>
  </DropdownMenu>
)

// Column definitions (outside component - static)
const COLUMNS: Column<Booking>[] = [
  {
    header: 'Booking ID',
    accessorKey: 'id',
    className: 'font-medium text-muted-foreground w-[100px]',
  },
  {
    header: 'Tour',
    accessorKey: 'tourName',
    className: 'font-medium min-w-[200px]',
  },
  {
    header: 'User',
    accessorKey: 'userName',
    className: 'font-medium',
  },
  {
    header: 'Guide',
    accessorKey: 'guideName',
    className: 'text-sm',
  },
  {
    header: 'Date',
    accessorKey: 'date',
    cell: ({ date }) => formatDate(date),
    className: 'whitespace-nowrap text-muted-foreground text-sm',
  },
  {
    header: 'Participants',
    accessorKey: 'participants',
    className: 'text-center w-[100px]',
  },
  {
    header: 'Amount',
    accessorKey: 'amount',
    cell: ({ amount }) => <span className="font-semibold">{formatCurrency(amount)}</span>,
    className: 'font-medium',
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ status }) => getStatusBadge(status),
  },
  {
    header: 'Actions',
    cell: () => <ActionsCell />,
    className: 'text-right',
  },
]

// Fetch function
const fetchBookings = async (
  page: number,
  search: string,
  status: string
): Promise<BookingsResponse> => {
  const params = new URLSearchParams({
    page: page.toString(),
    limit: '10',
    search,
    status,
  })
  const res = await fetch(`/api/bookings?${params}`)
  if (!res.ok) throw new Error('Failed to fetch bookings')
  return res.json()
}

export function BookingsTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all')

  const { data, isLoading } = useQuery<BookingsResponse>({
    queryKey: ['bookings', currentPage, searchQuery, statusFilter],
    queryFn: () => fetchBookings(currentPage, searchQuery, statusFilter),
    placeholderData: keepPreviousData,
  })

  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }, [])

  const handleStatusChange = useCallback((value: string) => {
    setStatusFilter(value as StatusFilter)
  }, [])

  const handleExportCSV = useCallback(() => {
    if (data?.bookings) exportToCSV(data.bookings)
  }, [data])

  const handleExportPDF = useCallback(() => {
    window.print()
  }, [])

  const pagination = data?.pagination ?? DEFAULT_PAGINATION
  const bookings = data?.bookings ?? []

  const paginationConfig = useMemo(
    () => ({
      currentPage: pagination.currentPage,
      totalPages: pagination.totalPages,
      onPageChange: setCurrentPage,
      totalItems: pagination.totalItems,
      itemsPerPage: pagination.itemsPerPage,
    }),
    [pagination]
  )

  const tableContainerClass = useMemo(
    () => `w-full max-w-full overflow-x-hidden ${isLoading ? 'opacity-50 transition-opacity' : ''}`,
    [isLoading]
  )

  return (
    <div className="flex flex-col gap-6 w-full max-w-full overflow-x-hidden">
      {/* Stats Cards */}
      <div className="w-full overflow-x-hidden">
        {isLoading || !data?.stats ? <BookingStatsSkeleton /> : <BookingStats stats={data.stats} />}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 w-full max-w-full overflow-x-hidden">
        <div className="flex flex-col md:flex-row items-center gap-4 w-full">
          <div className="relative flex-1 w-full md:w-auto min-w-0">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by Booking ID, tour, user or guide"
              className="pl-10 w-full bg-gray-50 border-gray-200 h-12"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto shrink-0">
            <Select value={statusFilter} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full md:w-[140px] bg-gray-50 border-gray-200 h-12">
                <SelectValue placeholder="All Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="upcoming">Upcoming</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
              </SelectContent>
            </Select>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" className="gap-2 bg-background border h-12">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={handleExportPDF}>
                  <FileText className="mr-2 h-4 w-4" />
                  Export as PDF
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleExportCSV}>
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Export as CSV
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Data Table */}
      <div className={tableContainerClass}>
        <DataTable
          columns={COLUMNS}
          data={bookings}
          isLoading={isLoading && !data}
          pagination={paginationConfig}
          emptyMessage="No bookings found"
        />
      </div>
    </div>
  )
}
