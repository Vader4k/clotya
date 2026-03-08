import AdminAuthGuard from "@/features/auth/components/AuthGuard"
import { DashboardLayout } from "@/features/dashboard/components/DashboardLayout"

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <AdminAuthGuard>
      <DashboardLayout>
        {children}
      </DashboardLayout>
    // </AdminAuthGuard>
  )
}

export default layout