import AdminAuthGuard from "@/features/auth/components/AuthGuard"

const layout = ({children}: {children: React.ReactNode}) => {
  return (
    <AdminAuthGuard>
        {children}
    </AdminAuthGuard>
  )
}

export default layout