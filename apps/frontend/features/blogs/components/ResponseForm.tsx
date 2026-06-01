"use client"

import { Input } from "@/components/ui/input"

const ResponseForm = () => {
  return (
    <form className="w-full grid gap-4 pt-4 pb-8 font-jost">
      <h2 className="md:text-lg font-medium font-jost uppercase">Leave a reply</h2>
      <p className="text-sm mb-4">Your email address will not be published. Required fields are marked *</p>
      <div>
        <label htmlFor="comment" className="text-sm mb-2">Comment*</label>
        <textarea placeholder="Comment" className="w-full h-32 border border-gray-200 p-2" />
      </div>
      <div className="grid xl:grid-cols-3 gap-6 xl:gap-4">
        <div>
          <label htmlFor="name" className="text-sm mb-2">Name*</label>
          <Input placeholder="Name" className="rounded-none" />
        </div>
        <div>
          <label htmlFor="email" className="text-sm mb-2">Email*</label>
          <Input placeholder="Email" className="rounded-none" />
        </div>
        <div>
          <label htmlFor="website" className="text-sm mb-2">Website</label>
          <Input placeholder="Website" className="rounded-none" />
        </div>
      </div>
      <button className="w-fit px-6 py-2 bg-black text-white font-medium font-jost">Post Comment</button>
    </form>
  )
}

export default ResponseForm