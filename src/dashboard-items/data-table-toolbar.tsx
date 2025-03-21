import { useMemo } from "react";
import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { DataTableViewOptions } from "../components/data-table/data-table-view-options";

import { DataTableFacetedFilter } from "../components/data-table/data-table-faceted-filter";
import { restaurantCategoryDetail } from "./data";
import { DataTableRestaurantMenuFilter } from "@/components/data-table/data-table-restaurant-menu-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  menuCount: Record<string, number>;
}

export function DataTableToolbar<TData>({
  table,
  menuCount,
}: DataTableToolbarProps<TData>) {
  const isTableReady = table.getAllColumns().length > 0;

  const categoryColumn = table?.getColumn("category");
  const menuColumn = table?.getColumn("menus");

  const uniqueCategories = useMemo(() => {
    if (!categoryColumn) {
      return [];
    }
    const values = categoryColumn?.getFacetedUniqueValues();
    return values ? Array.from(values.keys()) : [];
  }, [categoryColumn]);

  const categoriesInTable = useMemo(
    () =>
      restaurantCategoryDetail.filter((item) =>
        uniqueCategories.includes(item.value)
      ),
    [uniqueCategories]
  );

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {isTableReady && categoryColumn && categoriesInTable.length > 0 && (
          <DataTableFacetedFilter
            column={categoryColumn}
            title="Category"
            options={categoriesInTable}
          />
        )}
        <DataTableRestaurantMenuFilter
          column={menuColumn}
          title="Menu"
          menuCount={menuCount}
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
