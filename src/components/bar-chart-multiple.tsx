"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

const chartData = [
  { time: "09:00", 入库: 45, 出库: 30 },
  { time: "10:00", 入库: 25, 出库: 35 },
  { time: "11:00", 入库: 35, 出库: 20 },
  { time: "12:00", 入库: 15, 出库: 25 },
  { time: "13:00", 入库: 30, 出库: 40 },
  { time: "14:00", 入库: 55, 出库: 30 },
  { time: "15:00", 入库: 40, 出库: 35 },
  { time: "16:00", 入库: 20, 出库: 45 },
]

const chartConfig = {
  入库: {
    label: "入库",
    color: "hsl(var(--chart-2))",
  },
  出库: {
    label: "出库",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function BarChartMultiple() {
  return (
    <div className="w-full h-full">
      <ChartContainer config={chartConfig} className="w-full h-full">
        <BarChart 
          data={chartData}
          margin={{ top: 5, right: 5, bottom: 5, left: -10 }}
          className="[&_.recharts-cartesian-grid-horizontal_line]:stroke-muted-foreground/20 [&_.recharts-cartesian-grid-vertical_line]:stroke-muted-foreground/20"
          style={{ minWidth: 0 }}
        >
          <CartesianGrid vertical={false} strokeOpacity={0.3} />
          <XAxis
            dataKey="time"
            tickLine={false}
            axisLine={false}
            tickMargin={5}
            tick={{ fontSize: 12 }}
            className="text-xs text-muted-foreground"
          />
          <ChartTooltip
            cursor={false}
            content={<ChartTooltipContent />}
          />
          <Bar 
            dataKey="入库" 
            fill="hsl(var(--chart-2))" 
            radius={[4, 4, 0, 0]} 
            fillOpacity={0.75}
          />
          <Bar 
            dataKey="出库" 
            fill="hsl(var(--chart-3))" 
            radius={[4, 4, 0, 0]}
            fillOpacity={0.75}
          />
        </BarChart>
      </ChartContainer>
    </div>
  )
}
