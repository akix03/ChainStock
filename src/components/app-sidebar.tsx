"use client"

import * as React from "react"
import { NavUser } from "@/components/nav-user"
import { ThemeToggle } from "@/components/theme-toggle"
import { useUser } from "@/contexts/user-context"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@/components/ui/sidebar"

import { AiFillProduct } from "react-icons/ai";
import { SiNginxproxymanager } from "react-icons/si";
import { BsClipboardDataFill } from "react-icons/bs";
import { IoIosSettings } from "react-icons/io";

// This is sample data.
const data = {
  navMain: [
    {
      title: "商品管理",
      url: "#",
      logo: <AiFillProduct />,
      items: [
        {
          title: "新增商品",
          url: "/dashboard/products/new",
        },
        {
          title: "商品分类管理",
          url: "/dashboard/products/manage",
        },
      ],
    },
    {
      title: "库存管理",
      url: "#",
      logo: <SiNginxproxymanager />,
      items: [
        {
          title: "出入库",
          url: "/dashboard/stocks/in-out",
        },
        {
          title: "库存查询",
          url: "/dashboard/stocks/query",
        },
        {
          title: "库存预警",
          url: "/dashboard/stocks/alert",
        },
      ],
    },
    {
      title: "数据报表",
      url: "#",
      logo: <BsClipboardDataFill />,
      items: [
        {
          title: "库存报表",
          url: "/dashboard/journaling/stocks",
        },
        {
          title: "出入库记录",
          url: "/dashboard/journaling/in-out",
        },
        {
          title: "决策分析",
          url: "/dashboard/journaling/analysis",
        },
      ],
    },
    {
      title: "系统设置",
      url: "/dashboard/settings",
      logo: <IoIosSettings />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const [openMenus, setOpenMenus] = React.useState<string[]>(data.navMain.map(item => item.title))
  const { user, loading } = useUser()

  if (loading) {
    return <div className="flex items-center justify-center h-full">加载中...</div>
  }

  if (!user) {
    return null
  }

  const toggleMenu = (title: string) => {
    setOpenMenus((prevOpenMenus) =>
      prevOpenMenus.includes(title)
        ? prevOpenMenus.filter((t) => t !== title)
        : [...prevOpenMenus, title]
    )
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <img src="/logo-light.svg" alt="ChainStock" className="size-4" />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">ChainStock | 链存优管</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton 
                  asChild 
                  onClick={() => toggleMenu(item.title)}
                  className="group/menu-btn"
                >
                  <a href={item.url} className="flex items-center font-semibold h-16 text-lg">
                    <div className="w-3 transition-transform duration-200 group-hover/menu-btn:scale-125">{item.logo}</div>
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length && openMenus.includes(item.title) ? (
                  <SidebarMenuSub>
                    {item.items.map((subItem) => (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuSubButton 
                          asChild
                          className="transition-all duration-200 hover:translate-x-1 hover:text-primary dark:hover:text-primary"
                        >
                          <a href={subItem.url} className="text-base text-gray-600 dark:text-gray-400">
                            {subItem.title}
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={user} />
        <ThemeToggle />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
