"use client";

import { Search, X } from "lucide-react";
import { useState, useEffect } from "react";
import SearchModalContent from "./SearchModalContent";
import SearchInput from "./SearchInput";
import { useDebounce } from "../hooks/Debounce";

const SearchModal = () => {
  const [searchInput, setSearchInput] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const debouncedValue = useDebounce(searchInput, 300);

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

  return (
    <div>
      <button onClick={() => setIsOpen((prev) => !prev)} className="mt-1">
        {!isOpen ? (
          <Search strokeWidth={1.5} size={22} />
        ) : (
          <X strokeWidth={1.5} size={22} />
        )}
      </button>

      {isOpen && (
        <div className="absolute w-screen inset-0 h-[90vh] mt-20 z-10 bg-white border-t font-jost">
          <div className="w-full max-w-7xl mx-auto mt-10 px-3">
            <div className="flex items-center justify-between">
              <p>What are you looking for?</p>
              <button>
                <X />
              </button>
            </div>

            <div className="mt-2">
              <SearchInput
                searchInput={searchInput}
                setSearchInput={setSearchInput}
              />
            </div>

            <p className="text-sm text-gray-400 font-jost mt-5">
              Please type the world you want to search and press "enter
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchModal;
