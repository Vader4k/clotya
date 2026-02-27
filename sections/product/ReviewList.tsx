import { Review, reviewData } from "@/data/reviews"
import { Star } from "lucide-react"

const ReviewList = () => {
  // TODO: Fetch reviews from API by id
  return (
    <div className='w-full h-full py-10 border-t mt-8 grid gap-6 font-jost'>
      {reviewData.map((review) => (
        <div key={review.id} className="grid gap-1">
          <div className="flex items-center gap-1">
            {[...Array(review.rating)].map((_, i) => (
              <Star size={12} fill="gold" stroke="gold" key={i} />
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm">
            <p className="text-sm font-medium capitalize">{review.name}</p>
            <p className="text-sm text-gray-700">—</p>
            <p className="text-gray-400 text-xs">{review.date}</p>
          </div>
          <p className="text-gray-700 text-sm">{review.comment}</p>
        </div>
      ))}
    </div>
  )
}

export default ReviewList