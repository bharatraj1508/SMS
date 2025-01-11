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
import { menuItems } from "./Menu";
import Link from "next/link";
import Image from "next/image";
import { role } from "@/lib/data";

export default function AppSidebar() {
  return (
    <Sidebar variant="inset" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          {menuItems.map((group) => (
            <>
              <SidebarGroupLabel key={group.title}>
                {group.title}
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu className="ml-2">
                  {group.items.map((item) => {
                    if (item.visible.includes(role)) {
                      return (
                        <SidebarMenuItem className="my-1.5" key={item.label}>
                          <SidebarMenuButton
                            asChild
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
            </>
          ))}
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
