import { columns } from "./columns";
import { DataTable } from "./data-table";

export interface iItem {
  id: string;
  name: string;
  price: number;
  categoryId: string;
  image: string;
  description: string;
  menus: string[];
  available: boolean;
}

const data: iItem[] = [
  {
    id: "item1",
    name: "Item1",
    price: 10,
    categoryId: "mutton",
    image: "https://placehold.co/600x400",
    description: "item description",
    menus: ["breakfast", "lunch"],
    available: true,
  },
  {
    id: "item2",
    name: "Item2",
    price: 12,
    categoryId: "chicken",
    image: "https://placehold.co/600x400",
    description: "item description",
    menus: ["dinner", "anytime"],
    available: true,
  },
  {
    id: "item3",
    name: "Item3",
    price: 15,
    categoryId: "chicken",
    image: "https://placehold.co/600x400",
    description: "item description",
    menus: ["lunch", "anytime"],
    available: true,
  },
];

const ItemList = () => {
  return <DataTable columns={columns} data={data} />;
};

export default ItemList;
