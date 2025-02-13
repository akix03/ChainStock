"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package2, BarChart3, ArrowLeftRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function StatsCards() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card className="data-card overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">总商品数</CardTitle>
          <div className="p-2 rounded-full bg-primary/10 interactive-icon">
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
      </Card>
      <Card className="data-card overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">库存总量</CardTitle>
          <div className="p-2 rounded-full bg-primary/10 interactive-icon">
            <BarChart3 className="w-4 h-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="stat-value text-2xl">2,345</div>
          <div className="flex items-center mt-2">
            <Badge variant="success" className="font-medium">
              +5.2%
            </Badge>
            <span className="text-xs text-muted-foreground ml-2">较上月</span>
          </div>
        </CardContent>
      </Card>
      <Card className="data-card overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
          <CardTitle className="text-sm font-medium">今日出入库</CardTitle>
          <div className="p-2 rounded-full bg-primary/10 interactive-icon">
            <ArrowLeftRight className="w-4 h-4 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <div className="stat-value text-2xl">24</div>
          <div className="flex items-center mt-2">
            <Badge variant="success" className="font-medium">
              +8%
            </Badge>
            <span className="text-xs text-muted-foreground ml-2">较昨日</span>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
