"use client"

import { Search } from "lucide-react";  
import { Input } from "@/components/ui/input";
import { useBlogFilters } from "../hooks/useBlogFilters";

const BlogSearch = () => {
  const { searchTerm, setSearchTerm } = useBlogFilters();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Logic is handled by useBlogFilters debounce
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full font-jost">
      <Input 
        placeholder="Search..." 
        className="w-full rounded-none text-sm" 
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary transition-colors">
        <Search strokeWidth={1.5} size={20}/>
      </button>
    </form>
  )
}

export default BlogSearch