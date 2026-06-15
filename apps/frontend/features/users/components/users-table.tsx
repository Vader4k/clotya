import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { User } from "../types/users.types";
import { UserDetailsModal } from "./user-details-modal";
import { useToggleUserStatus } from "../hooks/users.hooks";
import { Eye, ShieldBan, ShieldCheck } from "lucide-react";

interface UsersTableProps {
  users?: User[];
  isLoading: boolean;
}

export const UsersTable = ({ users, isLoading }: UsersTableProps) => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const { mutate: toggleStatus, isPending } = useToggleUserStatus();

  if (isLoading) {
    return (
      <div className="rounded-md border border-gray-200">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {Array.from({ length: 5 }).map((_, i) => (
              <TableRow key={i}>
                <TableCell><Skeleton className="h-4 w-[150px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[200px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[80px]" /></TableCell>
                <TableCell><Skeleton className="h-4 w-[120px]" /></TableCell>
                <TableCell><Skeleton className="h-8 w-[150px] ml-auto" /></TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }

  if (!users?.length) {
    return (
      <div className="flex flex-col items-center justify-center p-8 text-center border rounded-md bg-gray-50 border-gray-200 border-dashed">
        <p className="text-sm text-gray-500">No users found</p>
      </div>
    );
  }

  return (
    <>
      <div className="rounded-md border border-gray-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Joined Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium text-gray-900">{user.name}</TableCell>
                <TableCell className="text-gray-500">{user.email}</TableCell>
                <TableCell>
                  <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                    {user.role}
                  </Badge>
                </TableCell>
                <TableCell>
                  <Badge variant={user.isActive !== false ? 'default' : 'destructive'}>
                    {user.isActive !== false ? 'Active' : 'Suspended'}
                  </Badge>
                </TableCell>
                <TableCell className="text-gray-500">
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedUser(user)}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      View
                    </Button>
                    <Button 
                      variant={user.isActive !== false ? "destructive" : "default"}
                      size="sm"
                      onClick={() => toggleStatus({ id: user._id, isActive: user.isActive === false })}
                      disabled={isPending}
                    >
                      {user.isActive !== false ? (
                        <><ShieldBan className="h-4 w-4 mr-1" /> Suspend</>
                      ) : (
                        <><ShieldCheck className="h-4 w-4 mr-1" /> Activate</>
                      )}
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <UserDetailsModal 
        user={selectedUser} 
        isOpen={!!selectedUser} 
        onClose={() => setSelectedUser(null)} 
      />
    </>
  );
};
