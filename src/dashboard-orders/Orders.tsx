import { columns } from "./columns";
import ordersData from "./data";
import { DataTable } from "./data-table";

export type OrderStatus =
  | "created"
  | "accepted"
  | "rejected"
  | "cancelled"
  | "modified"
  | "completed";

export interface iOrderActivity {
  status: OrderStatus;
  timestamp: string; // ISO string format for timestamps
  doneBy?: string; // userId
}

export interface iOrderItem {
  id: number;
  orderId: string;
  name: string;
  price: number;
  quantity: number;
}
export interface iOrder {
  id: number;
  date: string;
  name: string;
  phone: string;
  totalPrice: number;
  totalQuantity: number;
  paymentMethod: string;
  pickupOrDelivery: string; // 'pickup' | 'delivery'
  status: OrderStatus; // 'accepted' | 'completed' | 'cancelled' | 'rejected'
  items: iOrderItem[];
  orderActivities: iOrderActivity[];
}

const Orders = () => {
  return (
    <div className="space-y-4">
      <DataTable columns={columns} data={ordersData} />
    </div>
  );
};

export default Orders;
