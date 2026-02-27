"use client"

import ReviewIndicator from "@/features/products/components/ReviewIndicator"
import { useState } from "react"
import ReviewList from "./ReviewList"
import ReviewForm from "./ReviewForm"

const DetailsView = ({reviews, name}: {reviews:number, name:string}) => {

  const [view, setView] = useState<"description" | "reviews">("description")

  return (
    <div className="w-full h-full">
      {/* tabs */}
      <div className="w-full h-full flex items-start gap-10 font-jost border-b pb-3">
        <button onClick={() => setView("description")} className={`text-xl font-medium transition ${view === "description" ? "text-black" : "text-gray-500"}`}>
          Description
        </button>
        <button onClick={() => setView("reviews")} className={`text-xl font-medium transition ${view === "reviews" ? "text-black" : "text-gray-500"}`}>
          Reviews({reviews})
        </button>
      </div>

      {/* content */}
      <div className="w-full h-full mt-5">
        {view === "description" ? (
          <div className="w-full h-full">
            <p className="text-sm">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Molestiae nam enim animi. Voluptatibus, odio! Ea iste maiores quos numquam dolorum!
            </p>
          </div>
        ) : (
          <div className="w-full h-full grid gap-5">
            <ReviewIndicator reviews={reviews} name={name}/>
            <ReviewList />
            <ReviewForm />
          </div>
        )}
      </div>
    </div>
  )
}

export default DetailsView