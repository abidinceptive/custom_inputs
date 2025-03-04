import { ColumnDef } from "@tanstack/react-table";

import { iOrder } from "./Orders";
import { Label } from "../components/ui/label";
import { DataTableColumnHeader } from "../components/data-table/data-table-column-header";

export const columns: ColumnDef<iOrder>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex items-center space-x-2">
          <Label htmlFor="available">{item.name}</Label>
          <p>{item.phone}</p>
          <p>{item.items.map((product) => product.name)}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const item = row.original;
      return <p>{item.stattus}</p>;
    },
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
  },
  {
    accessorKey: "pickupOrDelivery",
    header: "Pickup or Delivery",
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
    id: "view_items",
    header: "View Items",
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="flex gap-2 items-center">
          {item.items.map((product) => product.name)}
        </div>
      );
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
];
