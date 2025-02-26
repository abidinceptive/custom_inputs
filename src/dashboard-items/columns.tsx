/* eslint-disable react-refresh/only-export-components */
import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";

import { iItem } from "./ItemList";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import { Button } from "../components/ui/button";
import { Checkbox } from "../components/ui/checkbox";
import { Switch } from "../components/ui/switch";
import { Label } from "../components/ui/label";
import { restaurantMenu, restaurantMenuDetail } from "./data";
import { DataTableColumnHeader } from "../components/data-table/data-table-column-header";

// 🔹 Correct function with proper type definition
const getMenuIcon = (menuValue: string) => {
  const menu = restaurantMenuDetail.find((item) => item.value === menuValue);

  return menu ? menu?.reactElement : null;
};

const MenuContent = ({ menus }: { menus: string[] }) => {
  const sortedMenus = menus.sort(
    (a, b) => restaurantMenu.indexOf(a) - restaurantMenu.indexOf(b)
  ); // Sort to show menu icon in order

  const [selectedMenus, setSelectedMenus] = useState([...sortedMenus]);

  const onToggleMenu = (menuValue: string, checked: boolean) => {
    setSelectedMenus(
      (prev) =>
        checked
          ? [...prev, menuValue] // Add if checked
          : prev.filter((m) => m !== menuValue) // Remove if unchecked
    );
  };

  return (
    <DropdownMenuContent align="end" className="gap-2">
      <DropdownMenuLabel>Update Menu</DropdownMenuLabel>
      {restaurantMenuDetail.map((item) => {
        return (
          <div
            key={item.value}
            className="flex items-center flex-nowrap gap-2 my-2"
          >
            <Checkbox
              id={item.value}
              className="bg-white"
              checked={selectedMenus.includes(item.value)}
              onCheckedChange={(checked) =>
                onToggleMenu(item.value, checked as boolean)
              }
            />
            <Label
              htmlFor={item.value}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {item.label}
            </Label>
          </div>
        );
      })}
    </DropdownMenuContent>
  );
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
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-5 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <MenuContent menus={menus} />
          </DropdownMenu>
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
