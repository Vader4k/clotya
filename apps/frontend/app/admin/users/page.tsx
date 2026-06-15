"use client"

import { useState } from "react";
import { useGetAllUsers } from "@/features/users/hooks/users.hooks";
import { UsersTable } from "@/features/users/components/users-table";
import { UsersPagination } from "@/features/users/components/users-pagination";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const UsersPage = () => {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const limit = 10;

  const { data, isLoading } = useGetAllUsers({ page, limit, search });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
    setPage(1);
  };

  return (
    <main className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-gray-900">Users</h1>
          <p className="text-gray-500 text-xs">View users account on the platform.</p>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            type="search"
            placeholder="Search users by name or email..."
            className="pl-9 bg-white"
            value={search}
            onChange={handleSearch}
          />
        </div>
      </div>

      <UsersTable users={data?.users} isLoading={isLoading} />
      
      {data?.pagination && (
        <UsersPagination 
          currentPage={data.pagination.currentPage}
          totalPages={data.pagination.totalPages}
          onPageChange={setPage}
        />
      )}
    </main>
  );
};

export default UsersPage;