"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { getMenuItems } from "./Menu";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";

export default function AppSidebar() {
  const paths = usePathname();

  const { user } = useUser();

  const role = user?.publicMetadata.role as string;

  const menuItems = getMenuItems(role);

  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          {menuItems.map((group) => (
            <div key={group.title}>
              <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="ml-2">
                  {group.items.map((item) => {
                    if (item.visible.includes(role)) {
                      return (
                        <SidebarMenuItem className="my-1.5" key={item.label}>
                          <SidebarMenuButton
                            asChild
                            isActive={paths === item.href}
                            className="hover:bg-red-100 transition-all duration-300"
                          >
                            <Link href={item.href}>
                              <Image
                                src={item.icon}
                                alt="icon"
                                width={20}
                                height={20}
                              />
                              <span>{item.label}</span>
                            </Link>
                          </SidebarMenuButton>
                        </SidebarMenuItem>
                      );
                    }
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </div>
          ))}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
