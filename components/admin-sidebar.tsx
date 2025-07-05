"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Bot, ShoppingCart, BarChart3, MessageCircle, Users, FileText, Settings, DollarSign } from "lucide-react"

const adminLinks = [
  { href: "/admin", label: "Users", icon: Users },
  { href: "/admin/payments", label: "Payments", icon: DollarSign },
  { href: "/admin/agents", label: "Agents", icon: Bot },
  { href: "/admin/agent-listing", label: "Agent Listing", icon: Bot },
  { href: "/admin/analytics", label: "Analytics", icon: BarChart3 },
  { href: "/admin/messages", label: "Messages", icon: MessageCircle },
  { href: "/admin/customers", label: "Customers", icon: Users },
  { href: "/admin/reports", label: "Reports", icon: FileText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  return (
    <aside className="w-56 min-h-screen bg-white border-r border-slate-200 flex flex-col py-6 px-4">
      <div className="mb-8 text-2xl font-bold text-blue-700 tracking-tight">Admin Panel</div>
      <nav className="flex flex-col gap-2">
        {adminLinks.map(({ href, label, icon: Icon }) => (
          <Link
            key={href}
            href={href}
            className={`flex items-center gap-3 px-3 py-2 rounded-lg font-medium transition-colors ${
              pathname === href
                ? "bg-blue-100 text-blue-700"
                : "text-slate-700 hover:bg-slate-100"
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}
