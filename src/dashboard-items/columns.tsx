import { ColumnDef } from "@tanstack/react-table";

import { iItem } from "./ItemList";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { restaurantMenu, restaurantMenuDetail } from "./data";
import { DataTableColumnHeader } from "../components/data-table/data-table-column-header";
import { UpdateMenuForItem } from "./menu-popover";

// 🔹 Correct function with proper type definition
const getMenuIcon = (menuValue: string) => {
  const menu = restaurantMenuDetail.find((item) => item.value === menuValue);

  return menu ? menu?.reactElement : null;
};

export const columns: ColumnDef<iItem>[] = [
  {
    accessorKey: "available",
    header: "Available",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex items-center space-x-2">
          <Switch id="available" checked={item.available} />
          <Label htmlFor="available">yes/no</Label>
        </div>
      );
    },
  },
  {
    accessorKey: "image",
    header: "Image",
    cell: ({ row }) => {
      const item = row.original;

      return (
        <img src={item.image} alt={item.name} className="w-16 h-8 rounded-md" />
      );
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" />
    ),
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <div className="flex justify-end">
        <DataTableColumnHeader column={column} title="Price" />
      </div>
    ),
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "menus",
    header: "Menus",
    cell: ({ row }) => {
      const item = row.original;
      const menus = item.menus as string[];
      const sortedMenus = menus.sort(
        (a, b) => restaurantMenu.indexOf(a) - restaurantMenu.indexOf(b)
      ); // sort to show menu icon in order

      return (
        <div className="flex gap-2 items-center">
          {sortedMenus.map((menu) => getMenuIcon(menu))}
          <UpdateMenuForItem menus={menus} />
        </div>
      );
    },
    filterFn: (row, _ /*columnId*/, filterValues) => {
      if (!filterValues.length) {
        return true; // Show all if no filter is selected
      }
      const item = row.original;
      return item?.menus.some((menu) => filterValues.includes(menu));
    },
  },
  {
    accessorKey: "category",
    header: "Category",
    filterFn: (row, _ /*columnId*/, filterValues) => {
      if (!filterValues.length) {
        return true; // Show all if no filter is selected
      }
      const item = row.original;
      return filterValues.includes(item.category);
    },
  },
];
