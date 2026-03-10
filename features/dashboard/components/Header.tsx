
import { Bell, Search, Menu } from 'lucide-react'
import { Input } from '@/components/ui/input'

export const Header = () => {
    return (
        <header className="sticky top-0 z-30 flex h-14 w-full items-center justify-between border-b border-gray-200 bg-white px-4 sm:px-6 lg:px-8">
            <div className="flex items-center">
                {/* Mobile menu button could go here */}
                <div className="relative hidden max-w-md w-full sm:block">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                        <Search className="size-4 text-gray-400" />
                    </div>
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="block w-full rounded-full h-8 border-gray-300 text-sm placeholder:text-xs pl-8 focus:border-primary focus:ring-primary"
                    />
                </div>
            </div>

            <div className="flex items-center justify-end gap-4">
                <button
                    type="button"
                    className="relative rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                    <span className="sr-only">View notifications</span>
                    <Bell strokeWidth={1} className="size-5" aria-hidden="true" />
                    <span className="absolute right-1 top-1 flex h-2 w-2">
                        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
                        <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
                    </span>
                </button>

                {/* Profile dropdown mock */}
                <div className="relative ml-3">
                    <button
                        type="button"
                        className="flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                        id="user-menu-button"
                        aria-expanded="false"
                        aria-haspopup="true"
                    >
                        <span className="sr-only">Open user menu</span>
                        <img
                            className="size-7 rounded-full object-cover"
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="Admin User"
                        />
                    </button>
                </div>
            </div>
        </header>
    )
}
