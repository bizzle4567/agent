"use client"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  BarChart3,
  Package,
  ShoppingCart,
  MessageSquare,
  Settings,
  Users,
  FileText,
  Bell,
  Search,
  Menu,
  LogOut,
  User,
  CreditCard,
  HelpCircle,
  ChevronDown,
  TrendingUp,
  DollarSign,
  Eye,
} from "lucide-react"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

const navigation = [
  { name: "Overview", href: "/seller", icon: BarChart3 },
  { name: "My Agents", href: "/seller/agents", icon: Package },
  { name: "Orders", href: "/seller/orders", icon: ShoppingCart },
  { name: "Analytics", href: "/seller/analytics", icon: TrendingUp },
  { name: "Customers", href: "/seller/customers", icon: Users },
  { name: "Messages", href: "/seller/messages", icon: MessageSquare },
  { name: "Earnings", href: "/seller/earnings", icon: DollarSign },
  { name: "Reviews", href: "/seller/reviews", icon: Eye },
  { name: "Reports", href: "/seller/reports", icon: FileText },
  { name: "Settings", href: "/seller/settings", icon: Settings },
]

interface SellerLayoutProps {
  children: React.ReactNode
}

export default function SellerLayout({ children }: SellerLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-slate-200 transform transition-transform duration-200 ease-in-out lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center gap-2 px-6 py-4 border-b border-slate-200">
            <div className="w-8 h-8 bg-gradient-to-r from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            <span className="text-xl font-bold text-slate-800">Seller Hub</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {navigation.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                    isActive
                      ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                      : "text-slate-600 hover:text-slate-800 hover:bg-slate-50",
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                  {item.name === "Messages" && <Badge className="ml-auto bg-red-500 text-white text-xs">3</Badge>}
                  {item.name === "Orders" && <Badge className="ml-auto bg-blue-500 text-white text-xs">12</Badge>}
                </Link>
              )
            })}
          </nav>

          {/* User Profile */}
          <div className="p-4 border-t border-slate-200">
            <DropdownMenu>
              <DropdownMenuTrigger className="flex items-center gap-3 w-full p-2 rounded-lg hover:bg-slate-50">
                <Avatar className="h-10 w-10">
                  <AvatarImage src="/placeholder.svg?height=40&width=40" />
                  <AvatarFallback>JA</AvatarFallback>
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="text-sm font-medium text-slate-800">Jerry Alvez</p>
                  <p className="text-xs text-slate-500">Seller Level: Pro</p>
                </div>
                <ChevronDown className="h-4 w-4 text-slate-400" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem>
                  <User className="h-4 w-4 mr-2" />
                  Profile
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <CreditCard className="h-4 w-4 mr-2" />
                  Billing
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <HelpCircle className="h-4 w-4 mr-2" />
                  Help & Support
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Buyer Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                  <LogOut className="h-4 w-4 mr-2" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Top header */}
        <header className="bg-white border-b border-slate-200 px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="sm" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
                <Menu className="h-5 w-5" />
              </Button>

              {/* Search */}
              <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input placeholder="Search agents, orders..." className="pl-10 w-80 bg-slate-50 border-slate-200" />
              </div>
            </div>

            <div className="flex items-center gap-3">
              {/* Quick Actions */}
              <Link href="/list-agent">
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700 hidden md:flex">
                  + New Agent
                </Button>
              </Link>

              {/* Notifications */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="relative">
                    <Bell className="h-5 w-5" />
                    <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full p-0 flex items-center justify-center">
                      5
                    </Badge>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-80">
                  <div className="p-3 border-b border-slate-200">
                    <h3 className="font-medium text-slate-800">Seller Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    {[
                      { title: "New order received", message: "CustomerCare Pro was purchased", time: "2 min ago" },
                      { title: "Agent approved", message: "Your SalesBot Nigeria is now live", time: "1 hour ago" },
                      { title: "Payment received", message: "₦25,000 deposited to your account", time: "3 hours ago" },
                      { title: "New review", message: "5-star review on CustomerCare Pro", time: "5 hours ago" },
                      { title: "Agent featured", message: "Your agent is now featured", time: "1 day ago" },
                    ].map((notification, index) => (
                      <DropdownMenuItem key={index} className="p-3 cursor-pointer">
                        <div>
                          <p className="font-medium text-sm">{notification.title}</p>
                          <p className="text-xs text-slate-500">{notification.message}</p>
                          <p className="text-xs text-slate-400 mt-1">{notification.time}</p>
                        </div>
                      </DropdownMenuItem>
                    ))}
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* User menu */}
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/placeholder.svg?height=32&width=32" />
                    <AvatarFallback>JA</AvatarFallback>
                  </Avatar>
                  <span className="hidden md:block text-sm font-medium text-slate-800">Jerry Alvez</span>
                  <ChevronDown className="h-4 w-4 text-slate-600" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <User className="h-4 w-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/dashboard" className="flex items-center">
                      <BarChart3 className="h-4 w-4 mr-2" />
                      Buyer Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
