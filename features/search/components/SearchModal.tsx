"use client";

import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import SearchModalContent from "./SearchModalContent";
import SearchInput from "./SearchInput";
import { useDebounce } from "../hooks/Debounce";
import { useSearchResults } from "../hooks/useSearchResults"
import { usePathname, useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const SearchModal = () => {

  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchInput, setSearchInput] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const debouncedValue = useDebounce(searchInput, 300);

  const { data, isLoading, error } = useSearchResults(debouncedValue || "");

  const closeSearchModal = () => {
    setSearchInput(null);
    setIsOpen(false);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    closeSearchModal();
  }, [pathname, searchParams]);



  return (
    <div>
      <button onClick={() => setIsOpen((prev) => !prev)} className="mt-1">
        {!isOpen ? (
          <Search strokeWidth={1.5} size={22} />
        ) : (
          <X strokeWidth={1.5} size={22} />
        )}
      </button>

      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="absolute w-screen inset-0 h-[90vh] mt-20 z-10 bg-white border-t font-jost"
          >
            <div className="w-full max-w-7xl mx-auto mt-10 px-3">
              <div className="flex items-center justify-between">
                <p>What are you looking for?</p>
                <button onClick={closeSearchModal}>
                  <X />
                </button>
              </div>

              <div className="mt-2">
                <SearchInput
                  searchInput={searchInput}
                  setSearchInput={setSearchInput}
                  isLoading={isLoading}
                />
              </div>

              {data && !isLoading && <SearchModalContent data={data} error={error} debounceValue={debouncedValue} />}

              {!data && !isLoading && <p className="text-sm text-gray-400 font-jost mt-5">
                Please type the world you want to search and press "enter
              </p>}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchModal;
