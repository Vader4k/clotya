import TrackingForm from "@/features/order-tracking/components/TrackingForm"

const page = () => {
  return (
    <main>
      <div className='w-full max-w-7xl mx-auto my-10 lg:my-20 font-jost px-5 xl:px-0'>
        <p className='xl:pr-5 text-sm lg:text-base'>To track your order please enter your Order Id in the box below and press the "Track" button. This was given to you on your receipt and in the confirmation email you should have received.</p>
        <div className="mt-5">
          <TrackingForm />
        </div>
      </div>
    </main>
  )
}

export default page