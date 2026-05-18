export interface CartItem {
  _id: string;
  product: string; // Object ID
  name: string;
  image: string;
  sku: string;
  quantity: number;
  size: string;
  color?: string;
  price: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  companyName?: string;
  country: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  phone: string;
  email: string;
  notes?: string;
}

export interface PaymentResult {
  id?: string;
  status?: string;
  reference?: string;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'paid' | 'failed';
export type PaymentType = 'paystack' | 'bank_transfer' | 'cash_on_delivery';
export type ShipmentType = 'standard' | 'local_pickup';

export interface Order {
  _id: string;
  orderNumber: string;
  user?: string; // Optional Object ID
  cartId?: string;
  shippingAddress: ShippingAddress;
  items: CartItem[];
  shipmentType: ShipmentType;
  paymentType: PaymentType;
  paymentStatus: PaymentStatus;
  paymentResult?: PaymentResult;
  itemsPrice: number;
  shippingPrice: number;
  taxPrice: number;
  totalPrice: number;
  status: OrderStatus;
  isPaid: boolean;
  paidAt?: string | Date;
  isDelivered: boolean;
  deliveredAt?: string | Date;
  createdAt: string | Date;
  updatedAt: string | Date;
}

export interface OrderStatusSelectProps {
  status: OrderStatus;
  orderId: string;
  onStatusChange: (orderId: string, status: OrderStatus) => void;
  disabled?: boolean;
  className?: string;
  showBadgeStyle?: boolean;
}

export interface OrderTableProps {
  orders: Order[];
  onSelectOrder: (order: Order) => void;
  onStatusChange: (orderId: string, status: OrderStatus) => void;
  isUpdating?: boolean;
}

export interface OrderSheetProps {
  order: Order | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onStatusChange: (orderId: string, status: OrderStatus) => void;
  isUpdating?: boolean;
}

export interface OrderErrorProps {
  onRetry: () => void;
  message?: string;
}

export interface OrderEmptyProps {
  onReset?: () => void;
  hasSearch?: boolean;
}
