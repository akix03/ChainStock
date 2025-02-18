
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { StatsCards } from "@/components/dashboard/stats-cards"
import { MainContent } from "@/components/dashboard/main-content"
import { Charts } from "@/components/dashboard/stock-charts"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function Page() {
  return (
    <SidebarInset className="flex flex-col h-screen overflow-hidden">
      <header className="flex h-14 shrink-0 items-center gap-2 border-b">
        <div className="flex items-center gap-2 px-3">
          <SidebarTrigger />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/dashboard">
                  仪表盘
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>数据看板</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>
      <ScrollArea className="flex-1">
        <main className="container mx-auto py-4 px-6">
          <div className="grid gap-4">
            <StatsCards />
            <MainContent />
            <Charts />
          </div>
        </main>
      </ScrollArea>
    </SidebarInset>
  )
}
