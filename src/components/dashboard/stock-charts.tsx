"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, BarChart, ArrowUpRight } from "lucide-react"
import { AreaChartGradient } from "@/components/area-chart-gradient"
import { BarChartMultiple } from "@/components/bar-chart-multiple"

export function Charts() {
  return (
    <div className="grid gap-4 lg:grid-cols-7">
      <Card className="col-span-full lg:col-span-4 data-card glass-effect glow-effect min-w-0">
        <CardHeader className="flex-none pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900/20">
                <LineChart className="w-4 h-4 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold">库存趋势</CardTitle>
                <CardDescription className="text-sm">近30天库存变化趋势</CardDescription>
              </div>
            </div>
            <div className="flex items-center gap-2 text-emerald-500">
              <ArrowUpRight className="w-4 h-4" />
              <span className="text-sm font-medium">+12.5%</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="px-3">
            <div className="h-[180px] w-full">
              <AreaChartGradient />
            </div>
            <div className="flex items-center gap-4 py-2 px-2 border-t border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-1))]"></div>
                <span className="text-sm text-muted-foreground">总库存</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-2))]"></div>
                <span className="text-sm text-muted-foreground">入库</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-3))]"></div>
                <span className="text-sm text-muted-foreground">出库</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="col-span-full lg:col-span-3 data-card glass-effect glow-effect min-w-0">
        <CardHeader className="flex-none pb-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="p-2 rounded-full bg-purple-100 dark:bg-purple-900/20">
                <BarChart className="w-4 h-4 text-purple-600 dark:text-purple-400" />
              </div>
              <div>
                <CardTitle className="text-xl font-semibold">出入库记录</CardTitle>
                <CardDescription className="text-sm">今日出入库统计</CardDescription>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="px-3">
            <div className="h-[180px] w-full">
              <BarChartMultiple />
            </div>
            <div className="flex items-center gap-4 py-2 px-2 border-t border-border/50">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-2))]"></div>
                <span className="text-sm text-muted-foreground">入库</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[hsl(var(--chart-3))]"></div>
                <span className="text-sm text-muted-foreground">出库</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
