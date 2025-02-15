"use client"

import * as React from "react"
import { Moon, Sun } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { useTheme } from "next-themes"

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  // 防止水合不匹配
  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="flex items-center justify-center space-x-2 py-4 px-4">
      <Sun className="w-4 h-4 text-zinc-500 dark:text-zinc-400 transition-all rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
      <Switch
        checked={theme === "dark"}
        onCheckedChange={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="data-[state=checked]:bg-zinc-800"
      />
      <Moon className="w-4 h-4 text-zinc-500 dark:text-zinc-400 transition-all rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
    </div>
  )
}
