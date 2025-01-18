"use client";

import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "./ui/breadcrumb";
import { usePathname } from "next/navigation";

export default function BreadCrumb() {
  const paths = usePathname();
  const pathNames = paths.split("/").filter((segment) => segment);
  const actualPathName = pathNames.filter((item) => item !== "list");

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="/">Home</BreadcrumbLink>
        </BreadcrumbItem>

        {actualPathName.map((segment, index) => {
          // Construct the path up to the current segment
          const segmentPath = `/${actualPathName
            .slice(0, index + 1)
            .join("/")}`;
          const isLast = index === actualPathName.length - 1;

          return (
            <React.Fragment key={segment}>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                {isLast ? (
                  // Render last item as BreadcrumbPage
                  <BreadcrumbPage>{capitalize(segment)}</BreadcrumbPage>
                ) : (
                  // Render as a link for intermediate segments
                  <BreadcrumbLink href={segmentPath}>
                    {capitalize(segment)}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </React.Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
