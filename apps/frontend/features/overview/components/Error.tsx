import { AlertCircle, RefreshCw } from 'lucide-react'

interface ErrorProps {
  refetch: () => void;
}

const Error = ({ refetch }: ErrorProps) => {
  return (
    <div className="border border-red-200 bg-red-50 p-6 flex flex-col items-center justify-center gap-3">
      <div className="flex items-center gap-2 text-red-600">
        <AlertCircle className="h-5 w-5" />
        <p className="font-medium">Failed to load statistics</p>
      </div>
      <button 
        onClick={() => refetch()}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-red-200 text-red-600 rounded-md hover:bg-red-50 transition-colors text-sm font-medium"
      >
        <RefreshCw className="h-4 w-4" />
        Try Again
      </button>
    </div>
  )
}

export default Error