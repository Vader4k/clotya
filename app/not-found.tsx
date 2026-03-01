import Link from "next/link"

const NotFound = () => {
  return (
    <div className='min-h-screen w-full flex items-center justify-center flex-col gap-2 font-jost not-found-bg'>
        <h1 className='text-[16rem] font-bold leading-60'>404</h1>
        <p className='text-4xl font-semibold'>Page Not Found</p>
        <p className='mt-3 max-w-100 text-center'>It looks like nothing was found at this location. Maybe search for what you are looking for?</p>
        <Link href="/" className="mt-5 bg-red-500 text-white px-4 py-3 hover:opacity-80 transition-opacity">
            Go To Homepage
        </Link>
    </div>
  )
}

export default NotFound