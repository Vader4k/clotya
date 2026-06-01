"use client"

import { useState } from 'react'
import { Star } from 'lucide-react'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'

const ReviewForm = () => {
  const [rating, setRating] = useState(0)
  const [hover, setHover] = useState(0)

  return (
    <div className="w-full mt-10 font-jost">
      <h2 className="text-xl border-b pb-2 mb-4">Add a review</h2>
      <p className="text-sm text-gray-600 mb-6">
        Your email address will not be published. Required fields are marked *
      </p>

      <form className="grid gap-6">
        {/* Star Rating */}
        <div className="grid gap-2">
          <label className="text-sm font-medium">Your rating *</label>
          <div className="flex items-center gap-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="flex items-center group"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                {[...Array(star)].map((_, i) => (
                  <Star
                    key={i}
                    size={14}
                    className="transition-colors duration-200"
                    fill={(hover || rating) >= star ? "gold" : "transparent"}
                    stroke={(hover || rating) >= star ? "gold" : "#D1D5DB"}
                  />
                ))}
              </button>
            ))}
          </div>
        </div>

        {/* Review Textarea */}
        <div className="grid gap-2">
          <label htmlFor="review" className="text-sm font-medium">Your review *</label>
          <textarea
            id="review"
            rows={6}
            required
            className="w-full border border-gray-200 p-4 focus:outline-none focus:border-black transition-colors resize-none"
          />
        </div>

        {/* Name and Email */}
        <div className="grid md:grid-cols-1 gap-6">
          <div className="grid gap-2">
            <label htmlFor="name" className="text-sm font-medium">Name *</label>
            <Input
              id="name"
              type="text"
              required
              className="rounded-none border-gray-200 h-12 focus-visible:ring-0 focus-visible:border-black transition-colors"
            />
          </div>
          <div className="grid gap-2">
            <label htmlFor="email" className="text-sm font-medium">Email *</label>
            <Input
              id="email"
              type="email"
              required
              className="rounded-none border-gray-200 h-12 focus-visible:ring-0 focus-visible:border-black transition-colors"
            />
          </div>
        </div>

        {/* Checkbox */}
        <div className="flex items-center space-x-2">
          <Checkbox id="save-info" className="rounded-none data-[state=checked]:bg-black data-[state=checked]:border-black" />
          <label
            htmlFor="save-info"
            className="text-sm text-gray-600 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Save my name, email, and website in this browser for the next time I comment.
          </label>
        </div>

        {/* Submit Button */}
        <div>
          <button
            type="submit"
            className="bg-gray-100 text-black px-8 py-3 font-medium hover:bg-black hover:text-white transition-all duration-300"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}

export default ReviewForm