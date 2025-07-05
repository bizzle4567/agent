"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { TrendingUp, TrendingDown, DollarSign, Eye, Users, Star, Download, Target } from "lucide-react"
import SellerLayout from "@/components/seller-layout"

const overviewStats = [
  {
    title: "Total Revenue",
    value: "₦2,847,500",
    change: "+18.2%",
    trend: "up",
    period: "vs last month",
    icon: DollarSign,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Total Views",
    value: "45,234",
    change: "+12.5%",
    trend: "up",
    period: "vs last month",
    icon: Eye,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Conversion Rate",
    value: "3.2%",
    change: "+0.8%",
    trend: "up",
    period: "vs last month",
    icon: Target,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Customer Satisfaction",
    value: "4.8/5",
    change: "+0.2",
    trend: "up",
    period: "vs last month",
    icon: Star,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
]

const revenueData = [
  { month: "Jan", revenue: 180000, sales: 120, views: 8500 },
  { month: "Feb", revenue: 220000, sales: 145, views: 9200 },
  { month: "Mar", revenue: 280000, sales: 180, views: 10800 },
  { month: "Apr", revenue: 320000, sales: 210, views: 12400 },
  { month: "May", revenue: 380000, sales: 250, views: 14200 },
  { month: "Jun", revenue: 420000, sales: 280, views: 15600 },
]

const topAgentsAnalytics = [
  {
    name: "CustomerCare Pro",
    revenue: "₦1,245,000",
    sales: 234,
    views: 12500,
    conversion: "4.2%",
    rating: 4.9,
    growth: "+15%",
  },
  {
    name: "SalesBot Nigeria",
    revenue: "₦892,500",
    sales: 189,
    views: 9800,
    conversion: "3.8%",
    rating: 4.8,
    growth: "+23%",
  },
  {
    name: "ContentCreator AI",
    revenue: "₦567,200",
    sales: 156,
    views: 7600,
    conversion: "2.9%",
    rating: 4.7,
    growth: "+8%",
  },
]

const categoryPerformance = [
  { category: "Customer Service", revenue: 1650000, percentage: 58, agents: 3 },
  { category: "Sales Automation", revenue: 892500, percentage: 31, agents: 2 },
  { category: "Content Creation", revenue: 305000, percentage: 11, agents: 1 },
]

const customerInsights = [
  { metric: "New Customers", value: "156", change: "+12%" },
  { metric: "Returning Customers", value: "89", change: "+8%" },
  { metric: "Customer Lifetime Value", value: "₦45,200", change: "+15%" },
  { metric: "Avg. Order Value", value: "₦28,500", change: "+5%" },
]

export default function SellerAnalyticsPage() {
  const [timeRange, setTimeRange] = useState("30d")
  const [selectedMetric, setSelectedMetric] = useState("revenue")

  return (
    <SellerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Analytics Dashboard</h1>
            <p className="text-slate-600">Track your performance and optimize your agent sales</p>
          </div>
          <div className="flex gap-3">
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {overviewStats.map((stat, index) => (
            <Card key={index} className="border border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <Badge
                    variant={stat.trend === "up" ? "default" : "destructive"}
                    className={`text-xs ${
                      stat.trend === "up" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 mr-1" />
                    ) : (
                      <TrendingDown className="h-3 w-3 mr-1" />
                    )}
                    {stat.change}
                  </Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</p>
                  <p className="text-sm text-slate-600">{stat.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{stat.period}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white border border-slate-200 rounded-xl p-1">
            <TabsTrigger value="overview" className="rounded-lg">
              Overview
            </TabsTrigger>
            <TabsTrigger value="agents" className="rounded-lg">
              Agent Performance
            </TabsTrigger>
            <TabsTrigger value="customers" className="rounded-lg">
              Customer Insights
            </TabsTrigger>
            <TabsTrigger value="trends" className="rounded-lg">
              Market Trends
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Revenue Chart */}
              <Card className="lg:col-span-2 border border-slate-200">
                <CardHeader>
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg">Revenue Trends</CardTitle>
                    <Select value={selectedMetric} onValueChange={setSelectedMetric}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="revenue">Revenue</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="views">Views</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="mb-4">
                    <p className="text-2xl font-bold text-slate-800">
                      {selectedMetric === "revenue" ? "₦2,847,500" : selectedMetric === "sales" ? "1,847" : "45,234"}
                    </p>
                    <p className="text-sm text-slate-500 flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-emerald-500" />
                      +18.2% from last month
                    </p>
                  </div>
                  {/* Chart placeholder */}
                  <div className="h-64 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg flex items-end justify-center p-4">
                    <div className="w-full h-full relative flex items-end justify-between gap-2">
                      {revenueData.map((data, index) => {
                        const value =
                          selectedMetric === "revenue"
                            ? data.revenue
                            : selectedMetric === "sales"
                              ? data.sales
                              : data.views
                        const maxValue =
                          selectedMetric === "revenue" ? 420000 : selectedMetric === "sales" ? 280 : 15600
                        return (
                          <div key={index} className="flex flex-col items-center gap-2 flex-1">
                            <div
                              className="bg-emerald-500 rounded-t w-full transition-all duration-500 hover:bg-emerald-600 cursor-pointer"
                              style={{ height: `${(value / maxValue) * 100}%` }}
                              title={`${data.month}: ${
                                selectedMetric === "revenue" ? `₦${value.toLocaleString()}` : value.toLocaleString()
                              }`}
                            />
                            <span className="text-xs text-slate-600">{data.month}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Category Performance */}
              <Card className="border border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg">Category Performance</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {categoryPerformance.map((category, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-slate-700">{category.category}</span>
                          <span className="text-sm text-slate-600">{category.percentage}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className="bg-emerald-500 h-2 rounded-full transition-all duration-500"
                            style={{ width: `${category.percentage}%` }}
                          />
                        </div>
                        <div className="flex justify-between text-xs text-slate-500">
                          <span>₦{category.revenue.toLocaleString()}</span>
                          <span>{category.agents} agents</span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-emerald-50 rounded-lg">
                    <h4 className="font-medium text-emerald-900 mb-2">Top Category</h4>
                    <p className="text-sm text-emerald-700">
                      Customer Service is your best performing category with 58% of total revenue
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Performance Metrics */}
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg">Conversion Funnel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                      <span className="text-sm font-medium">Page Views</span>
                      <span className="font-bold text-blue-600">45,234</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                      <span className="text-sm font-medium">Agent Views</span>
                      <span className="font-bold text-purple-600">12,456</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                      <span className="text-sm font-medium">Add to Cart</span>
                      <span className="font-bold text-yellow-600">2,847</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                      <span className="text-sm font-medium">Purchases</span>
                      <span className="font-bold text-emerald-600">1,456</span>
                    </div>
                  </div>
                  <div className="mt-4 text-center">
                    <p className="text-sm text-slate-600">Overall Conversion Rate</p>
                    <p className="text-2xl font-bold text-slate-800">3.2%</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg">Traffic Sources</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { source: "Direct", visitors: 18500, percentage: 41 },
                      { source: "Search", visitors: 13600, percentage: 30 },
                      { source: "Social Media", visitors: 9050, percentage: 20 },
                      { source: "Referrals", visitors: 4084, percentage: 9 },
                    ].map((source, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 rounded-full bg-emerald-500" />
                          <span className="text-sm font-medium text-slate-700">{source.source}</span>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-bold text-slate-800">{source.visitors.toLocaleString()}</p>
                          <p className="text-xs text-slate-500">{source.percentage}%</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Agent Performance Tab */}
          <TabsContent value="agents" className="space-y-6">
            <Card className="border border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">Top Performing Agents</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topAgentsAnalytics.map((agent, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
                      <div className="flex-1">
                        <h4 className="font-medium text-slate-800 mb-1">{agent.name}</h4>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div>
                            <p className="text-slate-500">Revenue</p>
                            <p className="font-semibold text-slate-800">{agent.revenue}</p>
                          </div>
                          <div>
                            <p className="text-slate-500">Sales</p>
                            <p className="font-semibold text-slate-800">{agent.sales}</p>
                          </div>
                          <div>
                            <p className="text-slate-500">Views</p>
                            <p className="font-semibold text-slate-800">{agent.views.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="text-slate-500">Conversion</p>
                            <p className="font-semibold text-slate-800">{agent.conversion}</p>
                          </div>
                          <div>
                            <p className="text-slate-500">Rating</p>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="font-semibold text-slate-800">{agent.rating}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <Badge
                        className={`ml-4 ${
                          agent.growth.startsWith("+") ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                        }`}
                      >
                        {agent.growth}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Customer Insights Tab */}
          <TabsContent value="customers" className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {customerInsights.map((insight, index) => (
                <Card key={index} className="border border-slate-200">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-medium text-slate-600">{insight.metric}</h3>
                      <Badge className="bg-emerald-100 text-emerald-700 text-xs">{insight.change}</Badge>
                    </div>
                    <p className="text-2xl font-bold text-slate-800">{insight.value}</p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="border border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">Customer Demographics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-medium text-slate-800 mb-4">By Location</h4>
                    <div className="space-y-3">
                      {[
                        { location: "Lagos", percentage: 35, customers: 312 },
                        { location: "Abuja", percentage: 22, customers: 196 },
                        { location: "Port Harcourt", percentage: 18, customers: 160 },
                        { location: "Kano", percentage: 15, customers: 134 },
                        { location: "Others", percentage: 10, customers: 89 },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">{item.location}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-slate-200 rounded-full h-2">
                              <div
                                className="bg-emerald-500 h-2 rounded-full"
                                style={{ width: `${item.percentage}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-slate-800 w-8">{item.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-slate-800 mb-4">By Business Size</h4>
                    <div className="space-y-3">
                      {[
                        { size: "Small Business", percentage: 45, customers: 401 },
                        { size: "Medium Business", percentage: 32, customers: 285 },
                        { size: "Enterprise", percentage: 23, customers: 205 },
                      ].map((item, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <span className="text-sm text-slate-600">{item.size}</span>
                          <div className="flex items-center gap-2">
                            <div className="w-20 bg-slate-200 rounded-full h-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${item.percentage}%` }} />
                            </div>
                            <span className="text-sm font-medium text-slate-800 w-8">{item.percentage}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Market Trends Tab */}
          <TabsContent value="trends" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg">Market Opportunities</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 bg-emerald-50 rounded-lg">
                      <h4 className="font-medium text-emerald-900 mb-2">Growing Demand</h4>
                      <p className="text-sm text-emerald-700 mb-2">
                        Customer Service agents are seeing 25% increased demand
                      </p>
                      <Badge className="bg-emerald-100 text-emerald-700 text-xs">High Opportunity</Badge>
                    </div>
                    <div className="p-4 bg-blue-50 rounded-lg">
                      <h4 className="font-medium text-blue-900 mb-2">Emerging Category</h4>
                      <p className="text-sm text-blue-700 mb-2">Analytics agents are gaining traction in the market</p>
                      <Badge className="bg-blue-100 text-blue-700 text-xs">Medium Opportunity</Badge>
                    </div>
                    <div className="p-4 bg-yellow-50 rounded-lg">
                      <h4 className="font-medium text-yellow-900 mb-2">Competitive Space</h4>
                      <p className="text-sm text-yellow-700 mb-2">
                        Content Creation has high competition but steady demand
                      </p>
                      <Badge className="bg-yellow-100 text-yellow-700 text-xs">Monitor Closely</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg">Recommendations</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                      <TrendingUp className="h-5 w-5 text-emerald-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-slate-800 mb-1">Optimize Pricing</h4>
                        <p className="text-sm text-slate-600">
                          Consider increasing prices for CustomerCare Pro based on high demand
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                      <Target className="h-5 w-5 text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-slate-800 mb-1">Expand Categories</h4>
                        <p className="text-sm text-slate-600">
                          Create more Analytics agents to capture growing market demand
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 p-3 bg-slate-50 rounded-lg">
                      <Users className="h-5 w-5 text-purple-500 mt-0.5" />
                      <div>
                        <h4 className="font-medium text-slate-800 mb-1">Target Audience</h4>
                        <p className="text-sm text-slate-600">
                          Focus marketing efforts on Lagos and Abuja for better conversion
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </SellerLayout>
  )
}
