import { useState } from "react";
import { Check, MoreHorizontal } from "lucide-react";

import { cn } from "../lib/utils";
import { Button } from "../components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "../components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import { restaurantMenu, restaurantMenuDetail } from "./data";

interface UpdateMenuForItemProps {
  menus: string[];
}

export function UpdateMenuForItem({ menus }: UpdateMenuForItemProps) {
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

  //   const selectedValues = new Set(column?.getFilterValue() as string[]);

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" size="sm" className="h-8 border-dashed">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0" align="start">
        <Command>
          <h2 className="text-gray-400">Update Menu</h2>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              {restaurantMenuDetail.map((option) => {
                const isSelected = selectedMenus.indexOf(option.value) !== -1;

                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      if (isSelected) {
                        onToggleMenu(option.value, false);
                        // selectedValues.delete(option.value);
                      } else {
                        onToggleMenu(option.value, true);
                        // selectedValues.add(option.value);
                      }
                      //   const filterValues = Array.from(selectedValues);
                      //   column?.setFilterValue(
                      //     filterValues?.length ? filterValues : undefined
                      //   );
                    }}
                  >
                    <div
                      className={cn(
                        "mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary",
                        isSelected
                          ? "bg-primary text-primary-foreground"
                          : "opacity-50 [&_svg]:invisible"
                      )}
                    >
                      <Check />
                    </div>
                    {option.reactElement && option.reactElement}
                    <span>{option.label}</span>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
