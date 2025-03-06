import { ColumnDef } from "@tanstack/react-table";

import { iOrder } from "./Orders";
import { Label } from "../components/ui/label";
import { DataTableColumnHeader } from "../components/data-table/data-table-column-header";
import { Button } from "@/components/ui/button";
import OrderProgressbar from "./OrderProgressbar";

export const columns: ColumnDef<iOrder>[] = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => {
      const item = row.original;
      return (
        <div className="flex items-start gap-2 flex-col">
          <div className="flex items-center gap-2">
            <Label htmlFor="available">{item.name}</Label>
            <p>( {item.phone} )</p>
          </div>
          <p>{item.items.map((product) => product.name)}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "activities",
    header: "Activity",
    cell: ({ row }) => {
      const item = row.original;
      return <OrderProgressbar orderActivities={item.orderActivities} />;
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Total" />
    ),
  },
  {
    accessorKey: "pickupOrDelivery",
    header: "Pickup/Delivery",
  },
  {
    id: "view_items",
    header: "View Items",
    cell: ({ row }) => {
      const item = row.original;

      return (
        <div className="flex gap-2 items-center">
          <Button>View ({item.items.length})</Button>
          {/* {item.items.map((product) => product.name)} */}
        </div>
      );
    },
  },
];
