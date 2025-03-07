import { Card, CardTitle } from "./ui/card";

const CartItem = ({
  name,
  image,
  price,
  quantity,
  onRemove,
  onAdd,
  onDelete,
}: {
  name: string;
  image: string;
  price: number;
  quantity: number;
  onRemove: () => void;
  onAdd: () => void;
  onDelete: () => void;
}) => {
  return (
    <Card className="flex">
      <img src={image} alt={name} className="w-16 h-16 object-cover" />
      <div className="ml-4">
        <CardTitle className="text-lg font-semibold">{name}</CardTitle>
        <div className="flex items-center gap-2">
          <p>{quantity} quantity</p>
          <p>Price {price}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button onClick={onRemove}>-</button>
            <button onClick={onAdd}>+</button>
          </div>
          <button onClick={onDelete}>Delete</button>
        </div>
      </div>
    </Card>
  );
};

export default CartItem;
