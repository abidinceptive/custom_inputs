/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { iItem } from "./ItemList";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";
import { Switch } from "./ui/switch";
import { Label } from "./ui/label";

const menu = ["breakfast", "lunch", "dinner", "anytime", "special"] as const;

const renderMenuIcon = (id: string) => {
  let letter = "";
  let bgColor = "";

  switch (id) {
    case "breakfast":
      letter = "B";
      bgColor = "bg-blue-600";
      break;
    case "lunch":
      letter = "L";
      bgColor = "bg-red-600";
      break;
    case "dinner":
      letter = "D";
      bgColor = "bg-yellow-600";
      break;
    case "anytime":
      letter = "A";
      bgColor = "bg-green-600";
      break;
    case "special":
      letter = "S";
      bgColor = "bg-fuchsia-600";
      break;

    default:
      break;
  }
  return (
    <div
      key={id}
      className={
        "h-5 w-5 flex items-center justify-center rounded-full text-white text-sm " +
        bgColor
      }
    >
      {letter}
    </div>
  );
};

const menuDetail = {
  breakfast: {
    icon: renderMenuIcon("breakfast"),
    label: "Breakfast",
  },
  lunch: {
    icon: renderMenuIcon("lunch"),
    label: "Lunch",
  },
  dinner: {
    icon: renderMenuIcon("dinner"),
    label: "Dinner",
  },
  anytime: {
    icon: renderMenuIcon("anytime"),
    label: "Anytime",
  },
  special: {
    icon: renderMenuIcon("special"),
    label: "Special",
  },
} as const; // 🔹 Ensures TypeScript infers it as a readonly object

// 🔹 Correct function with proper type definition
const getMenuIcon = (menuKey: keyof typeof menuDetail) => {
  return menuDetail[menuKey].icon; // 🔹 Access `menuDetail` correctly
};

const MenuContent = ({ menus }: { menus: string[] }) => {
  const sortedMenus = menus
    .filter((menuItem): menuItem is keyof typeof menuDetail =>
      menu.includes(menuItem as any)
    ) // Type-safe filtering
    .sort((a, b) => menu.indexOf(a) - menu.indexOf(b)); // Sort to show menu icon in order

  const [selectedMenus, setSelectedMenus] = useState([...sortedMenus]);

  const onToggleMenu = (menuKey: keyof typeof menuDetail, checked: boolean) => {
    setSelectedMenus(
      (prev) =>
        checked
          ? [...prev, menuKey] // Add if checked
          : prev.filter((m) => m !== menuKey) // Remove if unchecked
    );
  };

  return (
    <DropdownMenuContent align="end" className="gap-2">
      <DropdownMenuLabel>Menus</DropdownMenuLabel>
      {Object.keys(menuDetail).map((menuId) => {
        const menuKey = menuId as keyof typeof menuDetail; // Explicitly cast

        return (
          <div
            key={menuKey}
            className="flex items-center flex-nowrap gap-2 my-2"
          >
            <Checkbox
              id={menuKey}
              className="bg-white"
              checked={selectedMenus.includes(menuKey)}
              onCheckedChange={(checked) =>
                onToggleMenu(menuKey, checked as boolean)
              }
            />
            <Label
              htmlFor={menuKey}
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {menuDetail[menuKey].label}
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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Price
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
    id: "menu",
    header: "Menus",
    cell: ({ row }) => {
      const item = row.original;
      const menus = item.menus as string[];
      const sortedMenus = menus
        .filter((menuItem): menuItem is keyof typeof menuDetail =>
          menu.includes(menuItem as any)
        ) // Type-safe filtering
        .sort((a, b) => menu.indexOf(a) - menu.indexOf(b)); // sort to show menu icon in order

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
  },
];
