'use client'

import { useState, useMemo, useCallback } from 'react'
import { Badge } from '@/components/ui/badge'
import { DataTable, Column } from '@/components/ui/data-table'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { GlobalStats } from '@/components/transactions/global-stats'
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Download } from 'lucide-react'

// Types
interface Transaction {
  id: string
  type: 'tour_earnings' | 'withdrawal'
  date: string
  description: string
  tourName?: string
  tourCost?: number
  platformCommission?: number
  guideReceives?: number
  bankAccount?: string
  amount: number
  status: 'completed' | 'pending' | 'failed'
  userId?: string
}

interface TransactionsResponse {
  transactions: Transaction[]
  pagination: {
    currentPage: number
    totalPages: number
    totalItems: number
    itemsPerPage: number
  }
}

type TabValue = 'all' | 'bookings' | 'withdrawals'

// Constants
const DEFAULT_PAGINATION = {
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10
} as const

const DATE_FORMAT_OPTIONS: Intl.DateTimeFormatOptions = {
  month: 'short',
  day: 'numeric',
  year: 'numeric',
  hour: 'numeric',
  minute: '2-digit',
  hour12: true
}

const TAB_TRIGGER_CLASS = 'px-4 py-4 rounded-full text-sm font-medium data-[state=active]:bg-white data-[state=active]:font-semibold data-[state=active]:text-black text-black'

const USER_REGEX = /Tourist: (.*?)\)/

// Utility functions (outside component to prevent recreation)
const formatCurrency = (amount: number): string => `₦${amount.toLocaleString()}`

const formatDate = (dateString: string): string =>
  new Date(dateString).toLocaleString('en-US', DATE_FORMAT_OPTIONS)

const extractUser = (item: Transaction): string => {
  if (item.type === 'withdrawal') return 'Jason Chapel'
  const match = item.description.match(USER_REGEX)
  return match?.[1] ?? 'Unknown User'
}

const getStatusBadge = (status: Transaction['status']) => {
  const styles = {
    completed: 'bg-green-100 text-green-600 hover:bg-green-100',
    pending: 'bg-yellow-100 text-yellow-600 hover:bg-yellow-100',
    failed: 'bg-red-100 text-red-600 hover:bg-red-100'
  }
  const labels = { completed: 'Completed', pending: 'Pending', failed: 'Failed' }
  
  return (
    <Badge className={`${styles[status]} font-medium px-3 py-1 border-0`}>
      {labels[status]}
    </Badge>
  )
}

// Column definitions (outside component - static)
const createColumns = (): Column<Transaction>[] => [
  {
    header: 'Transaction ID',
    accessorKey: 'id',
    className: 'font-medium text-gray-900 align-middle py-4'
  },
  {
    header: 'Type',
    accessorKey: 'type',
    cell: ({ type }) => (
      <Badge className={`${type === 'tour_earnings' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'} hover:bg-inherit font-medium px-4 py-1 rounded-md border-0`}>
        {type === 'tour_earnings' ? 'Booking' : 'Withdrawal'}
      </Badge>
    ),
    className: 'align-middle'
  },
  {
    header: 'Description',
    accessorKey: 'description',
    cell: ({ type, tourName, description }) => (
      <span className='font-medium text-gray-900'>
        {type === 'tour_earnings' && tourName ? tourName : description}
      </span>
    ),
    className: 'align-middle font-medium min-w-[200px]'
  },
  {
    header: 'User',
    cell: (item) => (
      <span className='font-medium text-gray-900'>{extractUser(item)}</span>
    ),
    className: 'align-middle'
  },
  {
    header: 'Amount',
    accessorKey: 'amount',
    cell: ({ type, tourCost, amount }) => (
      <span className={`font-semibold ${type === 'tour_earnings' ? 'text-green-500' : 'text-red-500'}`}>
        {formatCurrency(type === 'tour_earnings' ? (tourCost ?? amount) : amount)}
      </span>
    ),
    className: 'align-middle'
  },
  {
    header: 'Commission',
    cell: ({ platformCommission }) => (
      <span className='font-semibold text-green-500'>
        {platformCommission ? formatCurrency(platformCommission) : '-'}
      </span>
    ),
    className: 'align-middle'
  },
  {
    header: 'Date',
    accessorKey: 'date',
    cell: ({ date }) => (
      <span className='text-gray-900 font-medium'>{formatDate(date)}</span>
    ),
    className: 'align-middle whitespace-nowrap w-[180px]'
  },
  {
    header: 'Status',
    accessorKey: 'status',
    cell: ({ status }) => getStatusBadge(status),
    className: 'align-middle'
  }
]

// Memoized columns instance
const COLUMNS = createColumns()

// Fetch function
const fetchTransactions = async (page: number): Promise<TransactionsResponse> => {
  const res = await fetch(`/api/transactions?page=${page}&limit=50`)
  if (!res.ok) throw new Error('Failed to fetch transactions')
  return res.json()
}

export function GlobalTransactionsTable() {
  const [currentPage, setCurrentPage] = useState(1)
  const [activeTab, setActiveTab] = useState<TabValue>('all')

  const { data, isLoading } = useQuery<TransactionsResponse>({
    queryKey: ['global-transactions', currentPage],
    queryFn: () => fetchTransactions(currentPage),
    placeholderData: keepPreviousData
  })

  const handleTabChange = useCallback((value: string) => {
    setActiveTab(value as TabValue)
  }, [])

  const transactions = useMemo(() => {
    const items = data?.transactions ?? []
    if (activeTab === 'all') return items
    const typeFilter = activeTab === 'bookings' ? 'tour_earnings' : 'withdrawal'
    return items.filter(t => t.type === typeFilter)
  }, [data?.transactions, activeTab])

  const pagination = data?.pagination ?? DEFAULT_PAGINATION

  const paginationConfig = useMemo(() => ({
    currentPage: pagination.currentPage,
    totalPages: pagination.totalPages,
    onPageChange: setCurrentPage,
    totalItems: transactions.length,
    itemsPerPage: pagination.itemsPerPage
  }), [pagination, transactions.length])

  return (
    <div className='space-y-8 p-6'>
      <header className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4'>
        <div className='space-y-1'>
          <h1 className='text-3xl font-bold tracking-tight text-gray-900'>
            Transaction History
          </h1>
          <p className='text-gray-500 text-lg'>
            Complete history of all platform transactions
          </p>
        </div>
        <Button variant='outline' className='gap-2 text-gray-700 border-gray-200'>
          <Download className='h-4 w-4' />
          Export Report
        </Button>
      </header>

      <GlobalStats />

      <section className='space-y-6'>
        <Tabs defaultValue='all' className='w-full' onValueChange={handleTabChange}>
          <TabsList className='bg-gray-200 p-4 rounded-full inline-flex space-x-4'>
            <TabsTrigger value='all' className={TAB_TRIGGER_CLASS}>
              All Transactions
            </TabsTrigger>
            <TabsTrigger value='bookings' className={TAB_TRIGGER_CLASS}>
              Bookings
            </TabsTrigger>
            <TabsTrigger value='withdrawals' className={TAB_TRIGGER_CLASS}>
              Withdrawals
            </TabsTrigger>
          </TabsList>

          <div className='mt-6 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden'>
            <DataTable
              columns={COLUMNS}
              data={transactions}
              isLoading={isLoading && !data}
              pagination={paginationConfig}
              emptyMessage='No transactions found'
            />
          </div>
        </Tabs>
      </section>
    </div>
  )
}
