import { Input } from "@/components/ui/input";
import { Loader } from "lucide-react";

const SearchInput = ({
  searchInput,
  setSearchInput,
}: {
  searchInput: string | null;
  setSearchInput: (value: string) => void;
}) => {
  return (
    <div className="relative">
      <Input
        value={searchInput || ""}
        onChange={(e) => setSearchInput(e.target.value)}
        className="w-full border-y-0 border-x-0 border-b rounded-none"
      />
      <Loader className="absolute right-3 text-gray-500 top-1/2 -translate-y-1/2 animate-spin" />
    </div>
  );
};

export default SearchInput;
