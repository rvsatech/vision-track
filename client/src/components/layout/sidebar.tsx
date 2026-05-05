'use client'

import Link from 'next/link'
import { LayoutDashboard, Building2, Users, Settings } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Building2, label: 'Empresas', href: '/companies' },
  { icon: Users, label: 'Usuários', href: '/users' },
  { icon: Settings, label: 'Configurações', href: '/settings' },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 border-r bg-gray-50/50 p-4 hidden md:block">
      <div className="mb-8 px-2">
        <h1 className="text-xl font-bold text-blue-600">Vision Track</h1>
      </div>
      
      <nav className="space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-all hover:bg-gray-200",
                isActive ? "bg-blue-100 text-blue-700" : "text-gray-500"
              )}
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>
    </aside>
  )
}
