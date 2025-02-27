import { useState } from "react";
import { Home, Settings, User, FileText, HelpCircle } from "lucide-react";

import AnimatedSidebarLayout from "@/components/AnimatedSidebarLayout";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const sidebarOptions = [
  { id: "home", labelT: "Home", icon: <Home size={20} /> },
  { id: "dashboard", labelT: "Dashboard", icon: <FileText size={20} /> },
  { id: "profile", labelT: "Profile", icon: <User size={20} /> },
  { id: "settings", labelT: "Settings", icon: <Settings size={20} /> },
  { id: "help", labelT: "Help", icon: <HelpCircle size={20} /> },
];

const SampleSideBar = () => {
  const [scene, setScene] = useState("home");

  const CustomBreadCrumb = () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden lg:block">
          <BreadcrumbLink href="#">Building Your Application</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="hidden lg:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>{scene}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );

  return (
    <AnimatedSidebarLayout
      sidebarMenus={sidebarOptions}
      selectedSidebarMenu={scene}
      onSelectSidebarMenu={setScene}
      breadCrumb={<CustomBreadCrumb />}
      mainContent={
        <div className="flex flex-col w-full gap-2">
          <CustomBreadCrumb />
          <h2 className="text-2xl font-bold mb-4">{scene} Content</h2>

          <p className="mb-4">
            This content area adjusts based on the sidebar state. When the
            sidebar is open, the content area shifts to accommodate it. When
            closed, the content area expands.
          </p>

          <div className="border rounded-lg p-4 bg-gray-50">
            <p className="font-semibold">Content Status:</p>
            <ul className="list-disc pl-5 mt-2">
              <li>Sidebar is on desktop</li>
              <li>Sidebar is on mobile</li>
              <li>Current section: {scene}</li>
            </ul>
          </div>
        </div>
      }
    />
  );
};

export default SampleSideBar;
