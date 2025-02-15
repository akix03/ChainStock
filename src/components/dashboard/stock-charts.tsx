"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Bar,
  BarChart,
  AreaChart, // 替换 LineChart 为 AreaChart
  Area,     // 添加 Area 组件
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts"
import { TrendingUp, BarChart3, ArrowUpDown } from "lucide-react"

// 模拟数据
const barData = [
  { name: "1月", value: 345 },
  { name: "2月", value: 290 },
  { name: "3月", value: 438 },
  { name: "4月", value: 256 },
  { name: "5月", value: 523 },
  { name: "6月", value: 478 },
]

const lineData = [
  { name: "周一", value: 42 },
  { name: "周二", value: 38 },
  { name: "周三", value: 65 },
  { name: "周四", value: 48 },
  { name: "周五", value: 52 },
  { name: "周六", value: 28 },
  { name: "周日", value: 35 },
]

const recordData = [
  { name: "1月", inbound: 345, outbound: 234 },
  { name: "2月", inbound: 290, outbound: 312 },
  { name: "3月", inbound: 438, outbound: 389 },
  { name: "4月", inbound: 256, outbound: 287 },
  { name: "5月", inbound: 523, outbound: 456 },
  { name: "6月", inbound: 478, outbound: 412 },
]

export function Charts() {
  const axisStyle = {
    fontSize: 12,
    tickLine: false,
    axisLine: false,
    stroke: "rgb(148, 163, 184)",
    className: "text-xs font-medium dark:text-slate-400"
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {/* 商品库存趋势图 */}
      <Card className="col-span-1 h-[300px] data-card glass-effect glow-effect">
        <div className="relative z-10 flex flex-col h-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/50 transition-colors">
                <TrendingUp className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-base font-medium text-zinc-900 dark:text-zinc-100">商品库存趋势</CardTitle>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">近7天数据统计</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 pb-1">
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  data={lineData}
                  margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                  className="[&_.recharts-cartesian-grid-horizontal_line]:stroke-slate-200/60 
                            [&_.recharts-cartesian-grid-vertical_line]:stroke-slate-200/60
                            dark:[&_.recharts-cartesian-grid-horizontal_line]:stroke-slate-800/60
                            dark:[&_.recharts-cartesian-grid-vertical_line]:stroke-slate-800/60"
                >
                  <defs>
                    <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="rgb(59, 130, 246)" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="rgb(59, 130, 246)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis {...axisStyle} dataKey="name" />
                  <YAxis {...axisStyle} tickFormatter={(value) => `${value}`} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm p-3 shadow-xl">
                            <div className="grid gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] font-medium text-muted-foreground">
                                  日期
                                </span>
                                <span className="font-semibold tracking-tight">
                                  {payload[0].payload.name}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] font-medium text-muted-foreground">
                                  库存量
                                </span>
                                <span className="font-semibold tracking-tight text-primary">
                                  {payload[0].value}
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                    wrapperStyle={{
                      outline: 'none'
                    }}
                    cursor={{
                      stroke: 'hsl(var(--muted))',
                      strokeWidth: 1,
                      strokeDasharray: '4 4'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="value"
                    stroke="rgb(59, 130, 246)"
                    strokeWidth={2}
                    fill="url(#lineGradient)"
                    dot={{
                      r: 4,
                      strokeWidth: 0,
                      fill: "rgb(59, 130, 246)",
                      opacity: 0.7
                    }}
                    activeDot={{
                      r: 6,
                      strokeWidth: 0,
                      fill: "rgb(59, 130, 246)",
                      opacity: 1
                    }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/10 to-slate-100/20 dark:from-slate-900/10 dark:to-slate-800/20 pointer-events-none rounded-lg"></div>
      </Card>

      {/* 出入库记录统计 */}
      <Card className="col-span-1 h-[300px] data-card glass-effect glow-effect">
        <div className="relative z-10 flex flex-col h-full">
          <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
            <div className="flex items-center space-x-3">
              <div className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800/50 transition-colors">
                <ArrowUpDown className="w-4 h-4 text-slate-600 dark:text-slate-400" />
              </div>
              <div className="space-y-1">
                <CardTitle className="text-base font-medium text-zinc-900 dark:text-zinc-100">出入库记录</CardTitle>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">近6个月数据</p>
              </div>
            </div>
          </CardHeader>
          <CardContent className="flex-1 pb-1">
            <div className="h-[220px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={recordData}
                  margin={{ top: 10, right: 10, left: -15, bottom: 0 }}
                  className="[&_.recharts-cartesian-grid-horizontal_line]:stroke-slate-200/60 
                            [&_.recharts-cartesian-grid-vertical_line]:stroke-slate-200/60
                            dark:[&_.recharts-cartesian-grid-horizontal_line]:stroke-slate-800/60
                            dark:[&_.recharts-cartesian-grid-vertical_line]:stroke-slate-800/60"
                >
                  <defs>
                    <linearGradient id="inboundGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgb(96, 165, 250)" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="rgb(96, 165, 250)" stopOpacity={0.4}/>
                    </linearGradient>
                    <linearGradient id="outboundGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="rgb(147, 197, 253)" stopOpacity={0.9}/>
                      <stop offset="95%" stopColor="rgb(147, 197, 253)" stopOpacity={0.4}/>
                    </linearGradient>
                  </defs>
                  <XAxis {...axisStyle} dataKey="name" />
                  <YAxis {...axisStyle} tickFormatter={(value) => `${value}`} />
                  <Tooltip
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        return (
                          <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white/95 dark:bg-zinc-950/95 backdrop-blur-sm p-3 shadow-xl">
                            <div className="grid gap-2">
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] font-medium text-muted-foreground">
                                  月份
                                </span>
                                <span className="font-semibold tracking-tight">
                                  {payload[0].payload.name}
                                </span>
                              </div>
                              <div className="flex flex-col">
                                <span className="text-[0.70rem] font-medium text-blue-500">
                                  入库量: {payload[0].value}
                                </span>
                                <span className="text-[0.70rem] font-medium text-blue-300">
                                  出库量: {payload[1].value}
                                </span>
                              </div>
                            </div>
                          </div>
                        )
                      }
                      return null
                    }}
                    wrapperStyle={{ outline: 'none' }}
                    cursor={{ fill: 'hsl(var(--muted))', opacity: 0.1 }}
                  />
                  <Bar
                    dataKey="inbound"
                    name="入库"
                    radius={[4, 4, 0, 0]}
                    style={{ fill: "url(#inboundGradient)" }}
                    minPointSize={5}
                  />
                  <Bar
                    dataKey="outbound"
                    name="出库"
                    radius={[4, 4, 0, 0]}
                    style={{ fill: "url(#outboundGradient)" }}
                    minPointSize={10}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </div>
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50/10 to-slate-100/20 dark:from-slate-900/10 dark:to-slate-800/20 pointer-events-none rounded-lg"></div>
      </Card>
    </div>
  )
}

export default Charts;
