import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "./ui/card";

const ProductItem = ({
  name,
  image,
  price,
  quantity,
  cartQty,
  dealPrice,
  description,
  onAdd,
  onRemove,
}: {
  name: string;
  image: string;
  price: number;
  quantity: number;
  cartQty?: number;
  dealPrice?: number;
  description?: string;
  onAdd: () => void;
  onRemove: () => void;
}) => {
  return (
    <Card className="flex gap-4">
      <img src={image} alt={name} className="w-16 h-16 object-cover" />
      <div className="flex flex-col">
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
        <CardContent className="flex items-center gap-2">
          <p>{quantity} quantity</p>
          <p>{price} price</p>
          <p>{dealPrice} dealPrice</p>
        </CardContent>
      </div>
      <CardFooter className="flex items-center gap-2">
        <button onClick={onRemove}>-</button>
        {cartQty}
        <button onClick={onAdd}>+</button>
      </CardFooter>
    </Card>
  );
};

export default ProductItem;
