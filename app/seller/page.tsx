"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Package,
  ShoppingCart,
  Star,
  Eye,
  MessageSquare,
  Users,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
} from "lucide-react"
import SellerLayout from "@/components/seller-layout"
import Link from "next/link"
import { useEffect, useState } from "react"

const stats = [
  {
    title: "Total Revenue",
    value: "₦2,847,500",
    animatedValue: 2847500,
    change: "+18.2%",
    trend: "up",
    period: "vs last month",
    icon: DollarSign,
    color: "text-emerald-600",
    bgColor: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    lightBg: "bg-emerald-50",
    borderColor: "border-emerald-200",
    hoverBg: "hover:bg-emerald-100",
  },
  {
    title: "Active Agents",
    value: "12",
    animatedValue: 12,
    change: "+2",
    trend: "up",
    period: "this month",
    icon: Package,
    color: "text-blue-600",
    bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
    lightBg: "bg-blue-50",
    borderColor: "border-blue-200",
    hoverBg: "hover:bg-blue-100",
  },
  {
    title: "Total Sales",
    value: "1,847",
    animatedValue: 1847,
    change: "+12.5%",
    trend: "up",
    period: "vs last month",
    icon: ShoppingCart,
    color: "text-purple-600",
    bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
    lightBg: "bg-purple-50",
    borderColor: "border-purple-200",
    hoverBg: "hover:bg-purple-100",
  },
  {
    title: "Avg. Rating",
    value: "4.8",
    animatedValue: 4.8,
    change: "+0.2",
    trend: "up",
    period: "this month",
    icon: Star,
    color: "text-amber-600",
    bgColor: "bg-gradient-to-br from-amber-500 to-amber-600",
    lightBg: "bg-amber-50",
    borderColor: "border-amber-200",
    hoverBg: "hover:bg-amber-100",
  },
]

const topAgents = [
  {
    id: 1,
    name: "CustomerCare Pro",
    category: "Customer Service",
    sales: 234,
    revenue: "₦351,000",
    rating: 4.9,
    views: 12500,
    status: "Active",
    image: "/placeholder.svg?height=60&width=60",
    growth: "+15%",
  },
  {
    id: 2,
    name: "SalesBot Nigeria",
    category: "Sales Automation",
    sales: 189,
    revenue: "₦472,500",
    rating: 4.8,
    views: 9800,
    status: "Active",
    image: "/placeholder.svg?height=60&width=60",
    growth: "+23%",
  },
  {
    id: 3,
    name: "ContentCreator AI",
    category: "Content Creation",
    sales: 156,
    revenue: "₦187,200",
    rating: 4.7,
    views: 7600,
    status: "Active",
    image: "/placeholder.svg?height=60&width=60",
    growth: "+8%",
  },
  {
    id: 4,
    name: "DataAnalyzer Pro",
    category: "Analytics",
    sales: 98,
    revenue: "₦147,000",
    rating: 4.6,
    views: 5400,
    status: "Draft",
    image: "/placeholder.svg?height=60&width=60",
    growth: "-2%",
  },
]

const recentOrders = [
  {
    id: "#ORD-24001",
    customer: "Adebayo Ogundimu",
    avatar: "/placeholder.svg?height=32&width=32",
    agent: "CustomerCare Pro",
    plan: "Professional",
    amount: "₦35,000",
    status: "Completed",
    date: "2 hours ago",
  },
  {
    id: "#ORD-24002",
    customer: "Kemi Adebisi",
    avatar: "/placeholder.svg?height=32&width=32",
    agent: "SalesBot Nigeria",
    plan: "Starter",
    amount: "₦25,000",
    status: "Processing",
    date: "4 hours ago",
  },
  {
    id: "#ORD-24003",
    customer: "Chinedu Okoro",
    avatar: "/placeholder.svg?height=32&width=32",
    agent: "ContentCreator AI",
    plan: "Enterprise",
    amount: "₦75,000",
    status: "Pending",
    date: "6 hours ago",
  },
  {
    id: "#ORD-24004",
    customer: "Fatima Hassan",
    avatar: "/placeholder.svg?height=32&width=32",
    agent: "CustomerCare Pro",
    plan: "Professional",
    amount: "₦35,000",
    status: "Completed",
    date: "1 day ago",
  },
]

const monthlyData = [
  { month: "Jan", revenue: 180000, sales: 120 },
  { month: "Feb", revenue: 220000, sales: 145 },
  { month: "Mar", revenue: 280000, sales: 180 },
  { month: "Apr", revenue: 320000, sales: 210 },
  { month: "May", revenue: 380000, sales: 250 },
  { month: "Jun", revenue: 420000, sales: 280 },
]

// Custom hook for number animation
function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(end * easeOutQuart))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return count
}

// Animated Stats Card Component
function AnimatedStatsCard({ stat, index }: { stat: (typeof stats)[0]; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const animatedCount = useCountUp(stat.animatedValue, 2000)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), index * 150)
    return () => clearTimeout(timer)
  }, [index])

  const formatAnimatedValue = (value: number, originalValue: string) => {
    if (originalValue.includes("₦")) {
      return `₦${value.toLocaleString()}`
    } else if (originalValue.includes(".")) {
      return (value / 10).toFixed(1)
    }
    return value.toString()
  }

  return (
    <Card
      className={`
        border-0 shadow-sm ${stat.lightBg} ${stat.borderColor} border-l-4 
        transition-all duration-500 ease-out cursor-pointer group
        ${stat.hoverBg} hover:shadow-lg hover:scale-105 hover:-translate-y-1
        ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
      `}
      style={{
        transitionDelay: `${index * 100}ms`,
      }}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`
              p-2 rounded-lg ${stat.bgColor} shadow-sm transition-all duration-300 
              group-hover:scale-110 group-hover:rotate-3 group-hover:shadow-md
            `}
            >
              <stat.icon className="h-4 w-4 text-white transition-all duration-300 group-hover:scale-110" />
            </div>
            <div>
              <p className="text-lg font-bold text-slate-800 transition-all duration-300 group-hover:text-slate-900">
                {isVisible ? formatAnimatedValue(animatedCount, stat.value) : "0"}
              </p>
              <p className="text-xs text-slate-600 font-medium transition-all duration-300 group-hover:text-slate-700">
                {stat.title}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div
              className={`
                inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium 
                transition-all duration-300 group-hover:scale-105
                ${
                  stat.trend === "up"
                    ? "bg-emerald-100 text-emerald-700 group-hover:bg-emerald-200"
                    : "bg-red-100 text-red-700 group-hover:bg-red-200"
                }
              `}
            >
              <div className={`transition-transform duration-300 ${isVisible ? "animate-bounce" : ""}`}>
                {stat.trend === "up" ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              </div>
              {stat.change}
            </div>
            <p className="text-xs text-slate-500 mt-1 transition-all duration-300 group-hover:text-slate-600">
              {stat.period}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function SellerDashboard() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    setIsLoaded(true)
  }, [])

  return (
    <SellerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div
          className={`
          flex flex-col md:flex-row md:items-center justify-between gap-4
          transition-all duration-700 ease-out
          ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}
        `}
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Seller Dashboard</h1>
            <p className="text-slate-600">Welcome back, Jerry! Here's how your agents are performing.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-transparent hover:bg-slate-50 transition-all duration-200">
              <Calendar className="h-4 w-4 mr-2" />
              Last 30 days
            </Button>
            <Link href="/list-agent">
              <Button className="bg-emerald-600 hover:bg-emerald-700 transition-all duration-200 hover:scale-105">
                <Plus className="h-4 w-4 mr-2" />
                Create Agent
              </Button>
            </Link>
          </div>
        </div>

        {/* Animated Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {stats.map((stat, index) => (
            <AnimatedStatsCard key={index} stat={stat} index={index} />
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Revenue Chart */}
          <Card
            className={`
            lg:col-span-2 border border-slate-200 transition-all duration-500 ease-out
            hover:shadow-lg hover:border-slate-300
            ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
          `}
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Revenue Overview</CardTitle>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs hover:bg-slate-100 transition-colors duration-200"
                  >
                    Revenue
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-xs bg-emerald-50 text-emerald-600 hover:bg-emerald-100 transition-colors duration-200"
                  >
                    Sales
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-2xl font-bold text-slate-800">₦2,847,500</p>
                <p className="text-sm text-slate-500 flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-emerald-500 animate-pulse" />
                  +18.2% from last month
                </p>
              </div>
              {/* Animated Chart */}
              <div className="h-64 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg flex items-end justify-center p-4">
                <div className="w-full h-full relative flex items-end justify-between gap-2">
                  {monthlyData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 flex-1">
                      <div
                        className={`
                          bg-emerald-500 rounded-t w-full transition-all duration-1000 ease-out
                          hover:bg-emerald-600 hover:scale-105 cursor-pointer
                          ${isLoaded ? "opacity-100" : "opacity-0"}
                        `}
                        style={{
                          height: isLoaded ? `${(data.revenue / 420000) * 100}%` : "0%",
                          transitionDelay: `${index * 200}ms`,
                        }}
                      />
                      <span
                        className={`
                        text-xs text-slate-600 transition-all duration-500
                        ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"}
                      `}
                        style={{ transitionDelay: `${index * 200 + 500}ms` }}
                      >
                        {data.month}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card
            className={`
            border border-slate-200 transition-all duration-500 ease-out
            hover:shadow-lg hover:border-slate-300
            ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}
          `}
          >
            <CardHeader>
              <CardTitle className="text-lg">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <div className="relative w-24 h-24 mx-auto mb-4">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="35" stroke="#E2E8F0" strokeWidth="8" fill="none" />
                    <circle
                      cx="50"
                      cy="50"
                      r="35"
                      stroke="#10B981"
                      strokeWidth="8"
                      fill="none"
                      strokeDasharray="219.8"
                      strokeDashoffset={isLoaded ? "43.96" : "219.8"}
                      className="transition-all duration-2000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-slate-800">80%</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-2">Monthly Goal Progress</p>
                <p className="text-xs text-slate-500">₦2.8M / ₦3.5M target</p>
              </div>

              <div className="space-y-4">
                {[
                  { icon: Eye, label: "Total Views", value: "45.2K", color: "text-blue-500" },
                  { icon: MessageSquare, label: "Messages", value: "127", color: "text-purple-500" },
                  { icon: Users, label: "Customers", value: "892", color: "text-emerald-500" },
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`
                      flex items-center justify-between transition-all duration-500 ease-out
                      hover:bg-slate-50 rounded-lg p-2 -m-2 cursor-pointer
                      ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}
                    `}
                    style={{ transitionDelay: `${index * 200 + 800}ms` }}
                  >
                    <div className="flex items-center gap-2">
                      <item.icon
                        className={`h-4 w-4 ${item.color} transition-transform duration-200 hover:scale-110`}
                      />
                      <span className="text-sm text-slate-600">{item.label}</span>
                    </div>
                    <span className="font-medium text-slate-800">{item.value}</span>
                  </div>
                ))}
              </div>

              <Link href="/seller/analytics">
                <Button
                  variant="outline"
                  className="w-full bg-transparent hover:bg-slate-50 transition-all duration-200 hover:scale-105"
                >
                  <TrendingUp className="h-4 w-4 mr-2" />
                  View Analytics
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Top Performing Agents */}
          <Card
            className={`
            border border-slate-200 transition-all duration-500 ease-out
            hover:shadow-lg hover:border-slate-300
            ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Top Performing Agents</CardTitle>
                <Link href="/seller/agents">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-emerald-600 hover:bg-emerald-50 transition-colors duration-200"
                  >
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topAgents.map((agent, index) => (
                  <div
                    key={index}
                    className={`
                      flex items-center gap-4 p-4 bg-slate-50 rounded-lg
                      transition-all duration-300 ease-out hover:bg-slate-100 hover:scale-102 cursor-pointer
                      ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"}
                    `}
                    style={{ transitionDelay: `${index * 150 + 1000}ms` }}
                  >
                    <img
                      src={agent.image || "/placeholder.svg"}
                      alt={agent.name}
                      className="w-12 h-12 rounded-lg object-cover transition-transform duration-200 hover:scale-110"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-slate-800">{agent.name}</h4>
                        <Badge
                          variant={agent.status === "Active" ? "default" : "secondary"}
                          className={`text-xs transition-colors duration-200 ${
                            agent.status === "Active" ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200" : ""
                          }`}
                        >
                          {agent.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-500 mb-2">{agent.category}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-600">
                        <span>{agent.sales} sales</span>
                        <span className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400 transition-transform duration-200 hover:scale-125" />
                          {agent.rating}
                        </span>
                        <span>{agent.views.toLocaleString()} views</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-800">{agent.revenue}</p>
                      <p
                        className={`text-xs flex items-center gap-1 transition-colors duration-200 ${
                          agent.growth.startsWith("+")
                            ? "text-emerald-600 hover:text-emerald-700"
                            : "text-red-600 hover:text-red-700"
                        }`}
                      >
                        {agent.growth.startsWith("+") ? (
                          <ArrowUpRight className="h-3 w-3 transition-transform duration-200 hover:scale-125" />
                        ) : (
                          <ArrowDownRight className="h-3 w-3 transition-transform duration-200 hover:scale-125" />
                        )}
                        {agent.growth}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card
            className={`
            border border-slate-200 transition-all duration-500 ease-out
            hover:shadow-lg hover:border-slate-300
            ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
          `}
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Recent Orders</CardTitle>
                <Link href="/seller/orders">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-emerald-600 hover:bg-emerald-50 transition-colors duration-200"
                  >
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentOrders.map((order, index) => (
                  <div
                    key={index}
                    className={`
                      flex items-center gap-4 p-4 bg-slate-50 rounded-lg
                      transition-all duration-300 ease-out hover:bg-slate-100 hover:scale-102 cursor-pointer
                      ${isLoaded ? "opacity-100 translate-x-0" : "opacity-0 translate-x-4"}
                    `}
                    style={{ transitionDelay: `${index * 150 + 1200}ms` }}
                  >
                    <Avatar className="h-10 w-10 transition-transform duration-200 hover:scale-110">
                      <AvatarImage src={order.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {order.customer
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-slate-800 text-sm">{order.customer}</p>
                      <p className="text-xs text-slate-500">
                        {order.agent} - {order.plan}
                      </p>
                      <p className="text-xs text-slate-400">{order.date}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-800">{order.amount}</p>
                      <Badge
                        variant={
                          order.status === "Completed"
                            ? "default"
                            : order.status === "Processing"
                              ? "secondary"
                              : "outline"
                        }
                        className={`text-xs transition-colors duration-200 ${
                          order.status === "Completed"
                            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                            : order.status === "Processing"
                              ? "bg-blue-100 text-blue-700 hover:bg-blue-200"
                              : "bg-yellow-100 text-yellow-700 hover:bg-yellow-200"
                        }`}
                      >
                        {order.status}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Action Items */}
        <Card
          className={`
          border border-slate-200 transition-all duration-500 ease-out
          hover:shadow-lg hover:border-slate-300
          ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
        `}
        >
          <CardHeader>
            <CardTitle className="text-lg">Action Items</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-4">
              {[
                {
                  icon: MessageSquare,
                  title: "Pending Messages",
                  description: "You have 3 unread customer messages",
                  buttonText: "Reply Now",
                  href: "/seller/messages",
                  bgColor: "bg-blue-50",
                  iconColor: "text-blue-600",
                  titleColor: "text-blue-900",
                  descColor: "text-blue-700",
                  buttonColor: "bg-white border-blue-200 text-blue-600 hover:bg-blue-50",
                },
                {
                  icon: Package,
                  title: "Draft Agents",
                  description: "1 agent is waiting for approval",
                  buttonText: "Review Draft",
                  href: "/seller/agents",
                  bgColor: "bg-yellow-50",
                  iconColor: "text-yellow-600",
                  titleColor: "text-yellow-900",
                  descColor: "text-yellow-700",
                  buttonColor: "bg-white border-yellow-200 text-yellow-600 hover:bg-yellow-50",
                },
                {
                  icon: TrendingUp,
                  title: "Optimize Performance",
                  description: "Get tips to boost your sales",
                  buttonText: "View Tips",
                  href: "/seller/analytics",
                  bgColor: "bg-emerald-50",
                  iconColor: "text-emerald-600",
                  titleColor: "text-emerald-900",
                  descColor: "text-emerald-700",
                  buttonColor: "bg-white border-emerald-200 text-emerald-600 hover:bg-emerald-50",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className={`
                    p-4 ${item.bgColor} rounded-lg transition-all duration-300 ease-out
                    hover:scale-105 hover:shadow-md cursor-pointer
                    ${isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}
                  `}
                  style={{ transitionDelay: `${index * 200 + 1500}ms` }}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <item.icon
                      className={`h-5 w-5 ${item.iconColor} transition-transform duration-200 hover:scale-110`}
                    />
                    <h4 className={`font-medium ${item.titleColor}`}>{item.title}</h4>
                  </div>
                  <p className={`text-sm ${item.descColor} mb-3`}>{item.description}</p>
                  <Link href={item.href}>
                    <Button size="sm" variant="outline" className={`${item.buttonColor} transition-all duration-200`}>
                      {item.buttonText}
                    </Button>
                  </Link>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SellerLayout>
  )
}
