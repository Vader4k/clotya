import { Star } from "lucide-react"
import { Progress } from "@/components/ui/progress"

const ReviewIndicator = ({ reviews, name }: { reviews: number, name: string }) => {
  return (
    <div className='grid gap-3 w-full'>
      <h3 className='text-xl font-jost'>{reviews} reviews for {name}</h3>
      <div className="flex items-center gap-20 font-jost">
        <div className="flex items-center gap-6">
          <h1 className="text-7xl">5.00</h1>
          <div className="grid gap-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center">
                  <Star fill="gold" stroke="gold" size={10} />
                </div>
              ))}
            </div>
            <p>Average of <span className="font-bold">{reviews} reviews</span></p>
          </div>
        </div>

        {/* review indicator */}
        <div className="grid gap-2 w-full max-w-sm">
          {[...Array(5)].map((_, i) => (
            <button key={i} className="flex items-center gap-2">
              <p>{5 - i}</p>
              <Star fill="gold" stroke="gold" size={10} />
              <Progress value={(i + 1) * 20} />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ReviewIndicator