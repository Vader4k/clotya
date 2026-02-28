"use client"

import { ProductCardProps } from "@/features/products/types/product.types";
import SearchCard from "./SearchCard";
import { motion } from "framer-motion";

const SearchModalContent = ({ data, error, debounceValue }: { data: ProductCardProps[]; error: Error | null; debounceValue: string | null }) => {

  if (data.length === 0 && debounceValue) {
    return (
      <div className="w-full mt-3 font-jost">
        <p>No results found for "{debounceValue}"</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full mt-3 font-jost">
        <p>Error: {error.message}</p>
      </div>
    )
  }

  return (
    <div className="w-full mt-3 font-jost grid gap-3 h-50 overflow-y-scroll px-1 border p-2" style={{ scrollbarWidth: 'thin' }}>
      {data.map((product, index) => (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.1 }}
          viewport={{ amount: 0.2, once: true }}
          key={product.id}
        >
          <SearchCard product={product} />
        </motion.div>
      ))}
    </div>
  );
};

export default SearchModalContent;
