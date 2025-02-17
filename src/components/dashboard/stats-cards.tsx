"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package2, BarChart3, ArrowLeftRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      {/* 商品数卡片 */}
      <Card className="data-card overflow-hidden relative min-h-[160px] w-full flex-shrink-0 transform-gpu">
        <div className="absolute right-[10%] top-[70%] -translate-y-1/2 opacity-[0.7] dark:opacity-[0.8] pointer-events-none mix-blend-multiply dark:mix-blend-soft-light">
          <Image
            src="/undraw_groceries.svg"
            alt="Groceries illustration"
            width={192}
            height={192}
            className="object-contain"
            priority
          />
        </div>
        <div className="relative z-10 flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">总商品数</CardTitle>
            <div className="p-2 rounded-full bg-primary/10">
              <Package2 className="w-4 h-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="stat-value text-2xl">128</div>
            <div className="flex items-center mt-2">
              <Badge variant="success" className="font-medium">
                +12%
              </Badge>
              <span className="text-xs text-muted-foreground ml-2">较上月</span>
            </div>
          </CardContent>
        </div>
      </Card>
      
      {/* 库存总量卡片 */}
      <Card className="data-card overflow-hidden relative min-h-[160px] w-full flex-shrink-0 transform-gpu will-change-transform">
        <div className="absolute left-[45%] top-[20%] inset-0 flex items-center justify-center opacity-[0.7] dark:opacity-[0.8] pointer-events-none mix-blend-multiply dark:mix-blend-soft-light">
          <div className="w-[192px] h-[192px] relative">
            <Image
              src="/undraw_data-report.svg"
              alt="Data Report illustration"
              fill
              className="object-contain select-none"
              priority
            />
          </div>
        </div>
        <div className="relative z-10 flex flex-col h-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">库存总量</CardTitle>
            <div className="p-2 rounded-full bg-primary/10">
              <BarChart3 className="w-4 h-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col justify-between flex-1">
            <div className="stat-value text-2xl tabular-nums">2,345</div>
            <div className="flex items-center mt-2">
              <Badge variant="success" className="font-medium whitespace-nowrap">
                +5.2%
              </Badge>
              <span className="text-xs text-muted-foreground ml-2">较上月</span>
            </div>
          </CardContent>
        </div>
      </Card>

      {/* 出入库卡片 */}
      <Card className="data-card overflow-hidden relative min-h-[160px] w-full flex-shrink-0 transform-gpu will-change-transform">
        <div className="absolute left-[35%] top-[15%] inset-0 flex items-center justify-center opacity-[0.7] dark:opacity-[0.8] pointer-events-none mix-blend-multiply dark:mix-blend-soft-light">
          <div className="w-[220px] h-[220px] relative">
            <Image
              src="/undraw_logistics.svg"
              alt="Logistics illustration"
              fill
              className="object-contain select-none"
              priority
            />
          </div>
        </div>
        <div className="relative z-10 flex flex-col h-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <CardTitle className="text-sm font-medium">今日出入库</CardTitle>
            <div className="p-2 rounded-full bg-primary/10">
              <ArrowLeftRight className="w-4 h-4 text-primary" />
            </div>
          </CardHeader>
          <CardContent className="flex flex-col justify-between flex-1">
            <div className="stat-value text-2xl tabular-nums">24</div>
            <div className="flex items-center mt-2">
              <Badge variant="success" className="font-medium whitespace-nowrap">
                +8%
              </Badge>
              <span className="text-xs text-muted-foreground ml-2">较昨日</span>
            </div>
          </CardContent>
        </div>
      </Card>
    </div>
  )
}
