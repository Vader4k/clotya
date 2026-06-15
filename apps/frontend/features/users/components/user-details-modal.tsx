import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { UserDetailsModalProps } from "../types/users.types";
import { Badge } from "@/components/ui/badge";


export const UserDetailsModal = ({ user, isOpen, onClose }: UserDetailsModalProps) => {
  if (!user) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
          <DialogDescription>
            Detailed information about the selected user.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4 text-sm">
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium text-right text-gray-500">Name</span>
            <span className="col-span-3 text-gray-900">{user.name}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium text-right text-gray-500">Email</span>
            <span className="col-span-3 text-gray-900">{user.email}</span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium text-right text-gray-500">Phone</span>
            <span className="col-span-3 text-gray-900">{user.phone || "N/A"}</span>
          </div>
          <div className="grid grid-cols-4 items-start gap-4">
            <span className="font-medium text-right text-gray-500 mt-1">Address</span>
            <span className="col-span-3 text-gray-900 leading-relaxed">
              {[user.streetAddress, user.apartment, user.city, user.state, user.postalCode, user.country]
                .filter(Boolean)
                .join(", ") || "N/A"}
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium text-right text-gray-500">Role</span>
            <span className="col-span-3">
              <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                {user.role}
              </Badge>
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium text-right text-gray-500">Status</span>
            <span className="col-span-3">
              <Badge variant={user.isActive !== false ? 'default' : 'destructive'}>
                {user.isActive !== false ? 'Active' : 'Suspended'}
              </Badge>
            </span>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <span className="font-medium text-right text-gray-500">Joined</span>
            <span className="col-span-3 text-gray-900">{new Date(user.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
