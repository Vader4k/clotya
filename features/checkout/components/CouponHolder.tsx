"use client";

import { useState } from "react";
import { Bookmark } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { Input } from "@/components/ui/input";

const CouponHolder = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState<string>("");

  return (
    <>
      <div className="w-full p-4 bg-gray-100 flex items-start gap-1 text-sm">
        <Bookmark className="text-red-500" strokeWidth={1.3} size={15} />
        <div>
          Have a coupon?{" "}
          <button onClick={() => setOpen((prev) => !prev)}>
            click here to enter your code
          </button>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {open && (
          <motion.div
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="grid gap-4 w-full"
          >
            <Input
              placeholder="Coupon code"
              className="w-full rounded-none focus:ring-0 focus:outline-0"
              value={value}
              onChange={(e) => setValue(e.target.value)}
            />

            <button className="w-fit bg-red-500 px-4 py-2.5 text-white text-sm">
              Apply coupon
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default CouponHolder;
