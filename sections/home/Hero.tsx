
const Hero = () => {
  return (
    <section className='w-full h-114'>
      <div className="w-full max-w-[90%] mx-auto h-full flex items-center justify-center font-jost uppercase text-9xl font-medium">
        {/* men banner */}
        <div className="w-1/2 h-full banner1 flex items-center justify-center text-white">
          <h1 className="text-transparent text-outline">Men</h1>
        </div>

        {/* women banner */}
        <div className="w-1/2 h-full banner2 flex items-center justify-center text-white">
          <h1 className="text-transparent text-outline">Women</h1>
        </div>
      </div>
    </section>
  )
}

export default Hero