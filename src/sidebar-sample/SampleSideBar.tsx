import { useState } from "react";
import { Home, Settings, User, FileText, HelpCircle } from "lucide-react";

import AnimatedSidebarLayout from "@/components/AnimatedSidebarLayout";

import CustomBreadCrumb from "@/components/CustomBreadcrumbs";

const sidebarOptions = [
  { id: "home", labelT: "Home", icon: <Home size={20} /> },
  { id: "dashboard", labelT: "Dashboard", icon: <FileText size={20} /> },
  { id: "profile", labelT: "Profile", icon: <User size={20} /> },
  { id: "settings", labelT: "Settings", icon: <Settings size={20} /> },
  { id: "help", labelT: "Help", icon: <HelpCircle size={20} /> },
];

const initialBreadcrumbOptions = [
  {
    navto: "#",
    labelT: "Home",
  },
];

const SampleSideBar = () => {
  const [scene, setScene] = useState("home");

  const selectedMenuInfo = sidebarOptions.find((item) => item.id === scene);
  const breadcrumbOptions = selectedMenuInfo
    ? [
        ...initialBreadcrumbOptions,
        { navto: "#", labelT: selectedMenuInfo?.labelT },
      ]
    : initialBreadcrumbOptions;

  return (
    <AnimatedSidebarLayout
      sidebarMenus={sidebarOptions}
      selectedSidebarMenu={scene}
      onSelectSidebarMenu={setScene}
      breadCrumb={<CustomBreadCrumb breadcrumbs={breadcrumbOptions} />}
      mainContent={
        <div className="flex flex-col w-full gap-2">
          <CustomBreadCrumb breadcrumbs={breadcrumbOptions} />
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
