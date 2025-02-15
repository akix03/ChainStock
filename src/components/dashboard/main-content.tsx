"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Bell, ChevronRight, ClipboardList } from "lucide-react" // 添加新的图标导入
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

const recentProducts = [
  {
    id: "PRD001",
    name: "iPhone 15 Pro",
    category: "电子产品",
    stock: 125,
    status: "充足",
    updateTime: "2024-03-15"
  },
  {
    id: "PRD002",
    name: "MacBook Air",
    category: "电子产品",
    stock: 89,
    status: "正常",
    updateTime: "2024-03-14"
  },
  {
    id: "PRD003",
    name: "AirPods Pro",
    category: "配件",
    stock: 232,
    status: "充足",
    updateTime: "2024-03-13"
  },
  {
    id: "PRD004",
    name: "iPad Air",
    category: "电子产品",
    stock: 56,
    status: "警告",
    updateTime: "2024-03-12"
  },
  {
    id: "PRD005",
    name: "Apple Watch",
    category: "电子产品",
    stock: 15,
    status: "紧急",
    updateTime: "2024-03-11"
  }
]

export function MainContent() {
  return (
    <div className="grid gap-4 lg:grid-cols-7">
      <Card className="col-span-full lg:col-span-4 data-card glass-effect glow-effect h-[320px]">
        <CardHeader className="flex flex-row items-center justify-between pb-1">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full bg-zinc-100 dark:bg-zinc-800">
              <ClipboardList className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
            </div>
            <div>
              <CardTitle className="text-xl font-semibold">商品列表</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">最近添加的商品</CardDescription>
            </div>
          </div>
          <Button 
            variant="ghost" 
            className="text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-300 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50"
          >
            查看全部 <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </CardHeader>
        <CardContent className="h-[calc(100%-3.5rem)] overflow-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>商品编号</TableHead>
                <TableHead>商品名称</TableHead>
                <TableHead>分类</TableHead>
                <TableHead>库存</TableHead>
                <TableHead>状态</TableHead>
                <TableHead className="text-right">更新时间</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentProducts.map((product) => (
                <TableRow key={product.id} className="cursor-pointer">
                  <TableCell className="font-medium">{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell>{product.stock}</TableCell>
                  <TableCell>
                    <Badge variant={
                      product.status === "充足" ? "success" :
                      product.status === "正常" ? "default" :
                      product.status === "警告" ? "warning" :
                      "destructive"
                    }>
                      {product.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-muted-foreground">
                    {product.updateTime}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
      
      <Card className="col-span-full lg:col-span-3 data-card glass-effect glow-effect h-[320px]">
        <CardHeader className="pb-1">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-xl font-semibold">库存预警</CardTitle>
              <CardDescription className="text-sm text-muted-foreground">需要关注的库存情况</CardDescription>
            </div>
            <div className="h-8 w-8 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
              <Bell className="h-4 w-4 text-red-600 dark:text-red-400" />
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-2">
          <Alert variant="destructive" className="border-red-200 bg-red-50 dark:bg-red-900/20 hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors duration-200 cursor-pointer dark:glow-effect">
            <AlertTitle className="text-red-600 dark:text-red-400 flex items-center gap-2">
              <Bell className="w-4 h-4" />
              库存不足
            </AlertTitle>
            <AlertDescription className="text-red-600/80 dark:text-red-400/80">
              商品"A001"库存低于预警值，请及时补货。
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )
}
