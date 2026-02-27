import { Search } from "lucide-react";  
import { Input } from "@/components/ui/input";

const BlogSearch = () => {
  return (
    <div className="relative w-full font-jost">
      <Input placeholder="Search..." className="w-full rounded-none text-sm" />
      <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" strokeWidth={1.5} size={20}/>
    </div>
  )
}

export default BlogSearch