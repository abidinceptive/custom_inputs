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
  stattus: string; // 'accepted' | 'completed' | 'cancelled' | 'rejected'
  items: iOrderItem[];
}

const Orders = () => {
  return <div></div>;
};

export default Orders;
