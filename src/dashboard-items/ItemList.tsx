import { columns } from "./columns";
import { DataTable } from "./data-table";

export interface iItem {
  id: string;
  category: string;
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
    category: "mutton",
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
    category: "chicken",
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
    category: "veg",
    name: "Item3",
    price: 15,
    categoryId: "chicken",
    image: "https://placehold.co/600x400",
    description: "item description",
    menus: ["lunch", "anytime"],
    available: true,
  },
];

const menuCount = data.reduce((acc, item) => {
  item.menus.forEach((menu) => {
    acc[menu] = (acc[menu] || 0) + 1;
  });
  return acc;
}, {} as Record<string, number>);

const ItemList = () => {
  return (
    <div className="space-y-4">
      <DataTable columns={columns} data={data} menuCount={menuCount} />
    </div>
  );
};

export default ItemList;
