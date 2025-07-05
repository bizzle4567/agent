"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  ShoppingCart,
  Star,
  Plus,
  Bot,
  Clock,
  Activity,
  CreditCard,
  BarChart3,
  PlayCircle,
  Settings,
  HelpCircle,
} from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import RecommendationsWidget from "@/components/recommendations-widget"
import Link from "next/link"
import { useEffect, useState } from "react"

// Custom hook for count-up animation
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

const userStats = [
  {
    title: "Active Agents",
    value: "8",
    change: "+2",
    trend: "up",
    period: "this month",
    icon: Bot,
    color: "text-blue-600",
    bgColor: "bg-gradient-to-br from-blue-500 to-blue-600",
    lightBg: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  {
    title: "Total Spent",
    value: "₦245,000",
    change: "+₦35,000",
    trend: "up",
    period: "this month",
    icon: CreditCard,
    color: "text-emerald-600",
    bgColor: "bg-gradient-to-br from-emerald-500 to-emerald-600",
    lightBg: "bg-emerald-50",
    borderColor: "border-emerald-200",
  },
  {
    title: "Usage Hours",
    value: "156",
    change: "+24",
    trend: "up",
    period: "this week",
    icon: Clock,
    color: "text-purple-600",
    bgColor: "bg-gradient-to-br from-purple-500 to-purple-600",
    lightBg: "bg-purple-50",
    borderColor: "border-purple-200",
  },
  {
    title: "Avg. Rating Given",
    value: "4.6",
    change: "+0.3",
    trend: "up",
    period: "overall",
    icon: Star,
    color: "text-amber-600",
    bgColor: "bg-gradient-to-br from-amber-500 to-amber-600",
    lightBg: "bg-amber-50",
    borderColor: "border-amber-200",
  },
]

const myAgents = [
  {
    id: 1,
    name: "CustomerCare Pro",
    category: "Customer Service",
    plan: "Professional",
    usage: 85,
    lastUsed: "2 hours ago",
    status: "Active",
    image: "/placeholder.svg?height=60&width=60",
    rating: 4.9,
    monthlyQuota: "500 requests",
    used: "425 requests",
  },
  {
    id: 2,
    name: "SalesBot Nigeria",
    category: "Sales Automation",
    plan: "Enterprise",
    usage: 92,
    lastUsed: "30 minutes ago",
    status: "Active",
    image: "/placeholder.svg?height=60&width=60",
    rating: 4.8,
    monthlyQuota: "1000 requests",
    used: "920 requests",
  },
  {
    id: 3,
    name: "ContentCreator AI",
    category: "Content Creation",
    plan: "Starter",
    usage: 45,
    lastUsed: "1 day ago",
    status: "Active",
    image: "/placeholder.svg?height=60&width=60",
    rating: 4.7,
    monthlyQuota: "200 requests",
    used: "90 requests",
  },
  {
    id: 4,
    name: "DataAnalyzer Pro",
    category: "Analytics",
    plan: "Professional",
    usage: 78,
    lastUsed: "5 hours ago",
    status: "Active",
    image: "/placeholder.svg?height=60&width=60",
    rating: 4.6,
    monthlyQuota: "500 requests",
    used: "390 requests",
  },
]

const recentActivity = [
  {
    id: 1,
    type: "purchase",
    title: "Purchased CustomerCare Pro",
    description: "Professional Plan - ₦35,000",
    time: "2 hours ago",
    icon: ShoppingCart,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    id: 2,
    type: "usage",
    title: "Used SalesBot Nigeria",
    description: "Generated 15 sales leads",
    time: "4 hours ago",
    icon: Bot,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    id: 3,
    type: "rating",
    title: "Rated ContentCreator AI",
    description: "5 stars - Great content quality",
    time: "1 day ago",
    icon: Star,
    color: "text-amber-600",
    bgColor: "bg-amber-50",
  },
  {
    id: 4,
    type: "support",
    title: "Support Ticket Resolved",
    description: "Issue with DataAnalyzer Pro",
    time: "2 days ago",
    icon: HelpCircle,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
]

const usageData = [
  { day: "Mon", hours: 8 },
  { day: "Tue", hours: 12 },
  { day: "Wed", hours: 6 },
  { day: "Thu", hours: 15 },
  { day: "Fri", hours: 10 },
  { day: "Sat", hours: 4 },
  { day: "Sun", hours: 7 },
]

export default function UserDashboard() {
  const [mounted, setMounted] = useState(false)
  const activeAgentsCount = useCountUp(8, 2000)
  const totalSpent = useCountUp(245000, 2000)
  const usageHours = useCountUp(156, 2000)
  const avgRating = useCountUp(46, 2000)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">My Dashboard</h1>
            <p className="text-slate-600">Welcome back, Jerry! Here's your AI agent activity.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <BarChart3 className="h-4 w-4" />
              Usage Report
            </Button>
            <Link href="/marketplace">
              <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Browse Agents
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards with Animation */}
        <div className="grid md:grid-cols-4 gap-6">
          {userStats.map((stat, index) => {
            const numericValue = Number.parseInt(stat.value.replace(/[^\d]/g, "")) || 0
            const animatedValue = mounted
              ? stat.title === "Active Agents"
                ? activeAgentsCount
                : stat.title === "Total Spent"
                  ? totalSpent
                  : stat.title === "Usage Hours"
                    ? usageHours
                    : stat.title === "Avg. Rating Given"
                      ? avgRating
                      : numericValue
              : numericValue
            const displayValue = stat.value.includes("₦")
              ? `₦${animatedValue.toLocaleString()}`
              : stat.value.includes(".")
                ? (animatedValue / 10).toFixed(1)
                : animatedValue.toString()

            return (
              <Card
                key={index}
                className={`border-0 shadow-sm ${stat.lightBg} ${stat.borderColor} border-l-4 transform transition-all duration-500 hover:scale-105 hover:shadow-lg cursor-pointer`}
                style={{
                  animationDelay: `${index * 150}ms`,
                  animation: mounted ? "slideInUp 0.6s ease-out forwards" : "none",
                }}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className={`p-2 rounded-lg ${stat.bgColor} shadow-sm transform transition-transform duration-300 hover:rotate-12 hover:scale-110`}
                      >
                        <stat.icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <p className="text-lg font-bold text-slate-800 transition-colors duration-300">
                          {displayValue}
                        </p>
                        <p className="text-xs text-slate-600 font-medium">{stat.title}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium bg-emerald-100 text-emerald-700 animate-bounce">
                        <TrendingUp className="h-3 w-3" />
                        {stat.change}
                      </div>
                      <p className="text-xs text-slate-500 mt-1">{stat.period}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Usage Overview */}
          <Card className="lg:col-span-2 border border-slate-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Weekly Usage Overview</CardTitle>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="text-xs bg-blue-50 text-blue-600">
                    Hours
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Requests
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-2xl font-bold text-slate-800">156 Hours</p>
                <p className="text-sm text-slate-500 flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                  +18% from last week
                </p>
              </div>
              {/* Usage Chart with Animation */}
              <div className="h-48 bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg flex items-end justify-center p-4">
                <div className="w-full h-full relative flex items-end justify-between gap-2">
                  {usageData.map((data, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 flex-1">
                      <div
                        className="bg-blue-500 rounded-t w-full transition-all duration-1000 hover:bg-blue-600 transform hover:scale-105"
                        style={{
                          height: mounted ? `${(data.hours / 15) * 100}%` : "0%",
                          transitionDelay: `${index * 100}ms`,
                        }}
                      />
                      <span className="text-xs text-slate-600">{data.day}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations Widget */}
          <RecommendationsWidget />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* My Active Agents */}
          <Card className="border border-slate-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">My Active Agents</CardTitle>
                <Link href="/dashboard/agents">
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {myAgents.map((agent, index) => (
                  <div
                    key={index}
                    className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-all duration-300 transform hover:scale-[1.02]"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animation: mounted ? "slideInLeft 0.6s ease-out forwards" : "none",
                    }}
                  >
                    <div className="flex items-start gap-3 mb-3">
                      <img
                        src={agent.image || "/placeholder.svg"}
                        alt={agent.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-medium text-slate-800">{agent.name}</h4>
                          <Badge className="text-xs bg-emerald-100 text-emerald-700">{agent.plan}</Badge>
                        </div>
                        <p className="text-sm text-slate-500">{agent.category}</p>
                        <p className="text-xs text-slate-400">Last used: {agent.lastUsed}</p>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{agent.rating}</span>
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {agent.status}
                        </Badge>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-slate-600">Usage this month</span>
                        <span className="font-medium">{agent.usage}%</span>
                      </div>
                      <Progress value={mounted ? agent.usage : 0} className="h-2 transition-all duration-1000" />
                      <div className="flex justify-between text-xs text-slate-500">
                        <span>{agent.used}</span>
                        <span>{agent.monthlyQuota}</span>
                      </div>
                    </div>

                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        className="flex-1 bg-blue-600 hover:bg-blue-700 transform transition-transform hover:scale-105"
                      >
                        <PlayCircle className="h-3 w-3 mr-1" />
                        Use Now
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent transform transition-transform hover:scale-105"
                      >
                        <Settings className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="border border-slate-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Recent Activity</CardTitle>
                <Link href="/dashboard/activity">
                  <Button variant="ghost" size="sm" className="text-blue-600">
                    View All
                  </Button>
                </Link>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors duration-300"
                    style={{
                      animationDelay: `${index * 150}ms`,
                      animation: mounted ? "slideInRight 0.6s ease-out forwards" : "none",
                    }}
                  >
                    <div
                      className={`p-2 rounded-lg ${activity.bgColor} transform transition-transform hover:scale-110`}
                    >
                      <activity.icon className={`h-4 w-4 ${activity.color}`} />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-slate-800 text-sm">{activity.title}</p>
                      <p className="text-xs text-slate-500">{activity.description}</p>
                      <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Account Summary */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="border border-slate-200 hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CreditCard className="h-5 w-5 text-emerald-600" />
                Billing Summary
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Current Month</span>
                  <span className="font-bold">₦85,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Next Billing</span>
                  <span className="text-sm">Dec 15, 2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Payment Method</span>
                  <span className="text-sm">•••• 4532</span>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-4 bg-transparent">
                  Manage Billing
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <HelpCircle className="h-5 w-5 text-blue-600" />
                Support Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Open Tickets</span>
                  <Badge className="bg-blue-100 text-blue-700">1</Badge>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Avg Response</span>
                  <span className="text-sm">2 hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Community Rank</span>
                  <Badge className="bg-amber-100 text-amber-700">Gold</Badge>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-4 bg-transparent">
                  Get Support
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="border border-slate-200 hover:shadow-md transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-600" />
                Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-slate-600">Efficiency Score</span>
                  <span className="font-bold text-emerald-600">94%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Cost Savings</span>
                  <span className="font-bold text-emerald-600">₦125,000</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-600">Time Saved</span>
                  <span className="text-sm">48 hours</span>
                </div>
                <Button size="sm" variant="outline" className="w-full mt-4 bg-transparent">
                  View Analytics
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card className="border border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-4">
              <Link href="/marketplace">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col gap-2 bg-transparent hover:bg-blue-50 hover:border-blue-200 transition-all duration-300 transform hover:scale-105"
                >
                  <Bot className="h-6 w-6 text-blue-600" />
                  <span className="text-sm">Browse Agents</span>
                </Button>
              </Link>
              <Link href="/dashboard/usage">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col gap-2 bg-transparent hover:bg-emerald-50 hover:border-emerald-200 transition-all duration-300 transform hover:scale-105"
                >
                  <BarChart3 className="h-6 w-6 text-emerald-600" />
                  <span className="text-sm">Usage Analytics</span>
                </Button>
              </Link>
              <Link href="/dashboard/billing">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col gap-2 bg-transparent hover:bg-purple-50 hover:border-purple-200 transition-all duration-300 transform hover:scale-105"
                >
                  <CreditCard className="h-6 w-6 text-purple-600" />
                  <span className="text-sm">Billing</span>
                </Button>
              </Link>
              <Link href="/help">
                <Button
                  variant="outline"
                  className="w-full h-20 flex flex-col gap-2 bg-transparent hover:bg-amber-50 hover:border-amber-200 transition-all duration-300 transform hover:scale-105"
                >
                  <HelpCircle className="h-6 w-6 text-amber-600" />
                  <span className="text-sm">Get Support</span>
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>

      <style jsx>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes slideInLeft {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </DashboardLayout>
  )
}
