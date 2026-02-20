"use client"

import CategoriesTab from "@/features/categories/components/CategoriesTab";
import { useState } from "react";

export const PRODUCT_CATEGORIES = [
  "men",
  "women",
  "outerwear",
]

const Categories = () => {

  const [selected, setSelected] = useState(PRODUCT_CATEGORIES[0])

  return (
    <section className="w-full max-w-7xl mx-auto my-14">
        <div className="w-full">
            <CategoriesTab selected={selected} setSelected={setSelected} categories={PRODUCT_CATEGORIES} />
        </div>
    </section>
  )
}

export default Categories