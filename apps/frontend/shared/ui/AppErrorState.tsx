import { AlertCircle, RefreshCw } from 'lucide-react'

interface AppErrorStateProps {
    title?: string
    message?: string
    onRetry?: () => void
}

const AppErrorState = ({ 
    title = "Something went wrong", 
    message = "We couldn't load the content you were looking for. Please try again later.", 
    onRetry 
}: AppErrorStateProps) => {
    return (
        <div className="w-full flex flex-col items-center justify-center py-20 px-4 text-center">
            <div className="size-16 bg-red-50 rounded-full flex items-center justify-center mb-6">
                <AlertCircle className="size-8 text-red-500" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">{title}</h2>
            <p className="text-gray-600 max-w-md mb-8">{message}</p>
            {onRetry && (
                <button 
                    onClick={onRetry}
                    className="flex items-center gap-2"
                >
                    <RefreshCw className="size-4" />
                    Try Again
                </button>
            )}
        </div>
    )
}

export default AppErrorState
