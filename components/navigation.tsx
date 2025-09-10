"use client"

import { usePathname, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Home, User, MapPin, Phone } from "lucide-react"

const navigationItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/login", label: "Login", icon: User },
  { href: "/profile", label: "Profile", icon: User },
  { href: "/itinerary", label: "Itinerary", icon: MapPin },
  { href: "/emergency", label: "Emergency", icon: Phone },
]

export function Navigation() {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-background/95 backdrop-blur-sm border-t border-border z-40">
      <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Button
              key={item.href}
              variant="ghost"
              size="sm"
              onClick={() => router.push(item.href)}
              className={`flex flex-col items-center gap-1 h-auto py-2 px-3 ${
                isActive
                  ? "text-blue-600 bg-blue-50 hover:bg-blue-100 dark:text-blue-400 dark:bg-blue-950 dark:hover:bg-blue-900"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-400 dark:hover:text-slate-100 dark:hover:bg-slate-800"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span className="text-xs font-medium">{item.label}</span>
            </Button>
          )
        })}
      </div>
    </nav>
  )
}
