import Chart from "@/features/overview/components/Chart"
import QuickStats from "@/features/overview/components/QuickStats"

const page = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold tracking-tight text-gray-900">Dashboard Overview</h1>
        <p className="text-gray-500 text-xs">Welcome back. Here's what's happening with your store today.</p>
      </div>

      <QuickStats />

      <Chart />
    </div>
  )
}

export default page