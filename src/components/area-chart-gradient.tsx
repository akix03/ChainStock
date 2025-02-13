"use client"

import { Area, AreaChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart"

// 更新数据结构和内容
const chartData = [
  { month: "一月", 总库存: 3500, 入库: 800, 出库: 600 },
  { month: "二月", 总库存: 3700, 入库: 900, 出库: 700 },
  { month: "三月", 总库存: 3900, 入库: 850, 出库: 650 },
  { month: "四月", 总库存: 4100, 入库: 950, 出库: 750 },
  { month: "五月", 总库存: 4300, 入库: 1000, 出库: 800 },
  { month: "六月", 总库存: 4500, 入库: 900, 出库: 700 },
]

const chartConfig = {
  总库存: {
    label: "总库存",
    color: "hsl(var(--chart-1))",
  },
  入库: {
    label: "入库",
    color: "hsl(var(--chart-2))",
  },
  出库: {
    label: "出库",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function AreaChartGradient() {
  return (
    <div className="w-full h-full">
      <ChartContainer config={chartConfig}>
        <AreaChart
          data={chartData}
          margin={{ top: 5, right: 5, bottom: 5, left: -10 }}
          className="[&_.recharts-cartesian-grid-horizontal_line]:stroke-muted-foreground/10 
                    [&_.recharts-cartesian-grid-vertical_line]:stroke-muted-foreground/10
                    [&_.recharts-area]:transition-all [&_.recharts-area]:duration-300
                    [&_.recharts-area:hover]:opacity-90"
          style={{ minWidth: 0 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal vertical={false} strokeOpacity={0.3} />
          <XAxis
            dataKey="month"
            tickLine={false}
            axisLine={false}
            tickMargin={5}
            tick={{ fontSize: 12 }}
            className="text-xs text-muted-foreground"
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <defs>
            {Object.entries(chartConfig).map(([key, value]) => (
              <linearGradient key={key} id={`fill${key}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={value.color} stopOpacity={0.4} />
                <stop offset="100%" stopColor={value.color} stopOpacity={0.1} />
              </linearGradient>
            ))}
          </defs>
          {Object.keys(chartConfig).map((key) => (
            <Area
              key={key}
              dataKey={key}
              type="monotone"
              fill={`url(#fill${key})`}
              fillOpacity={1}
              stroke={`var(--color-${key})`}
              strokeWidth={1.5}
            />
          ))}
        </AreaChart>
      </ChartContainer>
    </div>
  )
}
