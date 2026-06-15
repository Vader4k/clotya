export type User = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  role: string;
  createdAt: string;
  updatedAt: string;
  streetAddress?: string;
  apartment?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  country?: string;
  isActive?: boolean;
};

export type UsersResponse = {
  status: string;
  users: User[];
  pagination: {
    totalUsers: number;
    currentPage: number;
    totalPages: number;
    limit: number;
  };
  message: string;
};

export type UsersQuery = {
  page?: number;
  limit?: number;
  search?: string;
};

export interface UserDetailsModalProps {
  user: User | null;
  isOpen: boolean;
  onClose: () => void;
}