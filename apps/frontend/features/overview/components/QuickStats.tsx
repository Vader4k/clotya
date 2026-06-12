'use client'

import { DollarSign, ShoppingBag, Users } from 'lucide-react'
import { useQuickStats } from '@/features/overview/hooks/overview.hooks'
import Loading from './Loading'
import Error from './Error'


const QuickStats = () => {
  const { data, isLoading, isError, refetch } = useQuickStats()


  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <Error refetch={refetch} />
  }

  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

      <div className="border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">Total Revenue</p>
          <DollarSign className="h-4 w-4 text-gray-400" />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-2xl font-semibold text-gray-900">{data?.data.totalRevenue.toLocaleString('en-US', {
            style: 'currency',
            currency: 'USD',
          })}</p>
        </div>
      </div>

      <div className="border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">Active Orders</p>
          <ShoppingBag className="h-4 w-4 text-gray-400" />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-2xl font-semibold text-gray-900">{data?.data.activeOrders}</p>
        </div>
      </div>

      <div className="border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <p className="text-sm font-medium text-gray-500">Total Customers</p>
          <Users className="h-4 w-4 text-gray-400" />
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <p className="text-2xl font-semibold text-gray-900">{data?.data.totalUsers}</p>
        </div>
      </div>

    </section>
  )
}

export default QuickStats