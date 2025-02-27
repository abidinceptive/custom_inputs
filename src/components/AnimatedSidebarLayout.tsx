import { ReactNode, useState } from "react";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";

import { Button } from "./ui/button";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "./ui/menubar";
import { cn } from "@/lib/utils";

interface iSidebarMenu {
  id: string;
  labelT: string;
  icon: ReactNode;
}
interface AnimatedSidebarLayoutProps {
  sidebarMenus: iSidebarMenu[];
  onSelectSidebarMenu: (id: string) => void;
  selectedSidebarMenu: string;
  mainContent: ReactNode;
  breadCrumb?: ReactNode;
}

const AnimatedSidebarLayout = ({
  sidebarMenus,
  onSelectSidebarMenu,
  selectedSidebarMenu,
  mainContent,
  breadCrumb,
}: AnimatedSidebarLayoutProps) => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="bg-gray-100">
      {/* Mobile toggle button */}
      <div className="flex lg:hidden mb-4 gap-4 items-center">
        <Menubar>
          <MenubarMenu>
            <MenubarTrigger>
              <Menu />
            </MenubarTrigger>
            <MenubarContent>
              {sidebarMenus.map((menu) => (
                <MenubarItem
                  key={menu.id}
                  onClick={() => onSelectSidebarMenu(menu.id)}
                  className="flex gap-1 items-center justify-between"
                >
                  {menu?.icon} {menu?.labelT}
                </MenubarItem>
              ))}
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
        {breadCrumb}
      </div>

      <div className="flex">
        {/* Desktop Sidebar */}
        <div
          className={cn(
            "bg-white rounded-lg shadow-md transition-all duration-300 h-auto",
            isOpen ? "w-64" : "w-16",
            "hidden lg:block"
          )}
        >
          <div className="p-4">
            <Button
              variant="ghost"
              size="icon"
              className="ml-auto block mb-6"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <ChevronLeft /> : <ChevronRight />}
            </Button>

            <div className="space-y-2">
              {sidebarMenus.map((option) => (
                <Button
                  key={option.id}
                  variant={
                    selectedSidebarMenu === option.id ? "default" : "ghost"
                  }
                  className={cn(
                    "w-full justify-start",
                    !isOpen && "justify-center px-0"
                  )}
                  onClick={() => onSelectSidebarMenu(option.id)}
                >
                  {option.icon && (
                    <div className={isOpen ? "mr-2" : ""}>{option.icon}</div>
                  )}
                  {isOpen && <span>{option.labelT}</span>}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div
          className={cn(
            "bg-white rounded-lg shadow-md p-6 transition-all duration-300",
            "flex-1 ml-4"
          )}
        >
          {mainContent}
        </div>
      </div>
    </div>
  );
};

export default AnimatedSidebarLayout;
