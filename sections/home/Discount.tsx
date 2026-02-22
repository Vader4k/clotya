
const Discount = () => {
  return (
    <div className='w-full flex flex-wrap lg:flex-nowrap items-center justify-center gap-3 text-red-600 py-4 md:py-6 my-10 font-jost  bg-[#faf0eb]'>
        <p className='text-sm md:text-xl font-medium'>Super discount for your <span className='font-bold'>first purchase</span>.</p>
        <p className='border border-dashed border-red-500 text-xs md:text-sm py-1.5 px-3 font-medium'>FREE15FIRST</p>
        <p className='font-light text-sm md:text-lg'>Use discount code in checkout!</p>
    </div>
  )
}

export default Discount