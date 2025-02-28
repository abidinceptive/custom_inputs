import { Fragment } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

interface iBreadcrumbItem {
  navto: string;
  labelT: string;
}

interface CustomBreadCrumbProps {
  breadcrumbs: iBreadcrumbItem[];
}

const CustomBreadCrumb = ({ breadcrumbs }: CustomBreadCrumbProps) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbs.map((item, index) => (
          <Fragment key={index}>
            {index < breadcrumbs.length - 1 && (
              <BreadcrumbItem>
                <BreadcrumbLink href={item.navto}>{item.labelT}</BreadcrumbLink>
              </BreadcrumbItem>
            )}
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
            {index === breadcrumbs.length - 1 && (
              <BreadcrumbPage>{item.labelT}</BreadcrumbPage>
            )}
          </Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default CustomBreadCrumb;
