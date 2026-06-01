import Link from 'next/link'

const CustomerChecker = () => {
  return (
    <div className='p-4 w-full border border-gray-200 inline-flex items-center text-sm gap-1'>
      <p>Returning customer?</p>
      <Link href={'/account/login'} className='underline text-red-500 font-medium'>Click here to login</Link>
    </div>
  )
}

export default CustomerChecker