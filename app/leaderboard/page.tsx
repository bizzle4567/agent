"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Star, Trophy, TrendingUp, Users, Crown, Medal, Award } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const topAgents = [
  {
    rank: 1,
    name: "CustomerCare Pro",
    category: "Customer Service",
    seller: "TechSolutions NG",
    sales: 1247,
    revenue: "₦18,705,000",
    rating: 4.9,
    reviews: 234,
    growth: "+23%",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    rank: 2,
    name: "SalesBot Nigeria",
    category: "Sales Automation",
    seller: "SalesForce Africa",
    sales: 1089,
    revenue: "₦27,225,000",
    rating: 4.8,
    reviews: 189,
    growth: "+18%",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    rank: 3,
    name: "DataAnalyzer Pro",
    category: "Data Analysis",
    seller: "DataCorp Nigeria",
    sales: 892,
    revenue: "₦26,760,000",
    rating: 4.7,
    reviews: 156,
    growth: "+15%",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    rank: 4,
    name: "MarketingBot",
    category: "Marketing",
    seller: "Digital Marketing Pro",
    sales: 756,
    revenue: "₦13,608,000",
    rating: 4.6,
    reviews: 145,
    growth: "+12%",
    image: "/placeholder.svg?height=60&width=60",
  },
  {
    rank: 5,
    name: "ContentCreator AI",
    category: "Content Creation",
    seller: "Creative Minds",
    sales: 689,
    revenue: "₦8,268,000",
    rating: 4.5,
    reviews: 134,
    growth: "+9%",
    image: "/placeholder.svg?height=60&width=60",
  },
]

const topSellers = [
  {
    rank: 1,
    name: "TechSolutions NG",
    totalSales: 2456,
    totalRevenue: "₦45,230,000",
    agents: 8,
    avgRating: 4.8,
    joinedDate: "Jan 2023",
    badge: "Elite Seller",
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    rank: 2,
    name: "SalesForce Africa",
    totalSales: 1834,
    totalRevenue: "₦38,940,000",
    agents: 6,
    avgRating: 4.7,
    joinedDate: "Mar 2023",
    badge: "Top Seller",
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    rank: 3,
    name: "DataCorp Nigeria",
    totalSales: 1567,
    totalRevenue: "₦32,150,000",
    agents: 5,
    avgRating: 4.6,
    joinedDate: "Feb 2023",
    badge: "Rising Star",
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    rank: 4,
    name: "Creative Minds",
    totalSales: 1234,
    totalRevenue: "₦28,670,000",
    agents: 7,
    avgRating: 4.5,
    joinedDate: "Apr 2023",
    badge: "Verified Seller",
    avatar: "/placeholder.svg?height=50&width=50",
  },
  {
    rank: 5,
    name: "FinTech Solutions",
    totalSales: 987,
    totalRevenue: "₦24,890,000",
    agents: 4,
    avgRating: 4.4,
    joinedDate: "May 2023",
    badge: "Trusted Seller",
    avatar: "/placeholder.svg?height=50&width=50",
  },
]

const categoryStats = [
  {
    category: "Customer Service",
    agents: 45,
    totalSales: 3456,
    avgPrice: "₦15,000",
    growth: "+25%",
    color: "bg-blue-500",
  },
  {
    category: "Sales Automation",
    agents: 38,
    totalSales: 2890,
    avgPrice: "₦22,000",
    growth: "+18%",
    color: "bg-emerald-500",
  },
  {
    category: "Content Creation",
    agents: 52,
    totalSales: 2234,
    avgPrice: "₦12,000",
    growth: "+15%",
    color: "bg-purple-500",
  },
  {
    category: "Data Analysis",
    agents: 29,
    totalSales: 1876,
    avgPrice: "₦28,000",
    growth: "+12%",
    color: "bg-orange-500",
  },
  {
    category: "Marketing",
    agents: 41,
    totalSales: 1654,
    avgPrice: "₦18,000",
    growth: "+10%",
    color: "bg-pink-500",
  },
]

export default function LeaderboardPage() {
  const [timeframe, setTimeframe] = useState("monthly")

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-6 w-6 text-yellow-500" />
      case 2:
        return <Medal className="h-6 w-6 text-gray-400" />
      case 3:
        return <Award className="h-6 w-6 text-amber-600" />
      default:
        return <span className="text-lg font-bold text-slate-600">#{rank}</span>
    }
  }

  const getRankBadge = (rank: number) => {
    switch (rank) {
      case 1:
        return "bg-gradient-to-r from-yellow-400 to-yellow-600 text-white"
      case 2:
        return "bg-gradient-to-r from-gray-300 to-gray-500 text-white"
      case 3:
        return "bg-gradient-to-r from-amber-400 to-amber-600 text-white"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl">
                <Trophy className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-4">
              Leaderboard
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Discover the top-performing AI agents, sellers, and categories on our platform
            </p>
          </div>

          {/* Time Filter */}
          <div className="flex justify-center mb-8">
            <div className="bg-gradient-to-r from-white to-blue-50 rounded-xl border border-blue-200 p-1 shadow-lg">
              {["weekly", "monthly", "yearly", "all-time"].map((period) => (
                <Button
                  key={period}
                  variant={timeframe === period ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setTimeframe(period)}
                  className={`capitalize ${timeframe === period ? "bg-gradient-to-r from-blue-500 to-purple-600" : ""}`}
                >
                  {period.replace("-", " ")}
                </Button>
              ))}
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid md:grid-cols-4 gap-6 mb-12">
            <Card className="border border-slate-200 bg-gradient-to-br from-blue-50 to-blue-100">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-blue-900 mb-1">500+</div>
                <div className="text-sm text-blue-700">Active Agents</div>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 bg-gradient-to-br from-emerald-50 to-emerald-100">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-emerald-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-emerald-900 mb-1">₦2.4B</div>
                <div className="text-sm text-emerald-700">Total Revenue</div>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 bg-gradient-to-br from-purple-50 to-purple-100">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-purple-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-purple-900 mb-1">4.7</div>
                <div className="text-sm text-purple-700">Avg Rating</div>
              </CardContent>
            </Card>

            <Card className="border border-slate-200 bg-gradient-to-br from-orange-50 to-orange-100">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Trophy className="h-6 w-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-orange-900 mb-1">150+</div>
                <div className="text-sm text-orange-700">Top Sellers</div>
              </CardContent>
            </Card>
          </div>

          {/* Leaderboard Tabs */}
          <Tabs defaultValue="agents" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 bg-white border border-slate-200 rounded-xl p-1">
              <TabsTrigger value="agents" className="rounded-lg">
                Top Agents
              </TabsTrigger>
              <TabsTrigger value="sellers" className="rounded-lg">
                Top Sellers
              </TabsTrigger>
              <TabsTrigger value="categories" className="rounded-lg">
                Categories
              </TabsTrigger>
            </TabsList>

            {/* Top Agents */}
            <TabsContent value="agents">
              <Card className="border border-slate-200">
                <CardHeader>
                  <CardTitle className="text-xl">Top Performing Agents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topAgents.map((agent, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-6 p-6 rounded-xl border transition-all hover:shadow-md ${
                          agent.rank <= 3
                            ? "bg-gradient-to-r from-slate-50 to-white border-slate-300"
                            : "bg-white border-slate-200"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center ${getRankBadge(agent.rank)}`}
                          >
                            {getRankIcon(agent.rank)}
                          </div>
                          <img
                            src={agent.image || "/placeholder.svg"}
                            alt={agent.name}
                            className="w-16 h-16 rounded-xl object-cover"
                          />
                        </div>

                        <div className="flex-1 grid md:grid-cols-6 gap-4 items-center">
                          <div className="md:col-span-2">
                            <h3 className="font-semibold text-slate-800 text-lg">{agent.name}</h3>
                            <p className="text-sm text-slate-500">by {agent.seller}</p>
                            <Badge variant="secondary" className="mt-1 text-xs">
                              {agent.category}
                            </Badge>
                          </div>

                          <div className="text-center">
                            <div className="font-bold text-slate-800">{agent.sales}</div>
                            <div className="text-xs text-slate-500">Sales</div>
                          </div>

                          <div className="text-center">
                            <div className="font-bold text-slate-800">{agent.revenue}</div>
                            <div className="text-xs text-slate-500">Revenue</div>
                          </div>

                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-bold text-slate-800">{agent.rating}</span>
                            </div>
                            <div className="text-xs text-slate-500">({agent.reviews} reviews)</div>
                          </div>

                          <div className="text-center">
                            <Badge className="bg-emerald-100 text-emerald-700">{agent.growth}</Badge>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Top Sellers */}
            <TabsContent value="sellers">
              <Card className="border border-slate-200">
                <CardHeader>
                  <CardTitle className="text-xl">Top Performing Sellers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {topSellers.map((seller, index) => (
                      <div
                        key={index}
                        className={`flex items-center gap-6 p-6 rounded-xl border transition-all hover:shadow-md ${
                          seller.rank <= 3
                            ? "bg-gradient-to-r from-slate-50 to-white border-slate-300"
                            : "bg-white border-slate-200"
                        }`}
                      >
                        <div className="flex items-center gap-4">
                          <div
                            className={`w-12 h-12 rounded-xl flex items-center justify-center ${getRankBadge(seller.rank)}`}
                          >
                            {getRankIcon(seller.rank)}
                          </div>
                          <Avatar className="h-16 w-16">
                            <AvatarImage src={seller.avatar || "/placeholder.svg"} />
                            <AvatarFallback>
                              {seller.name
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                        </div>

                        <div className="flex-1 grid md:grid-cols-6 gap-4 items-center">
                          <div className="md:col-span-2">
                            <h3 className="font-semibold text-slate-800 text-lg">{seller.name}</h3>
                            <p className="text-sm text-slate-500">Joined {seller.joinedDate}</p>
                            <Badge variant="secondary" className="mt-1 text-xs">
                              {seller.badge}
                            </Badge>
                          </div>

                          <div className="text-center">
                            <div className="font-bold text-slate-800">{seller.totalSales}</div>
                            <div className="text-xs text-slate-500">Total Sales</div>
                          </div>

                          <div className="text-center">
                            <div className="font-bold text-slate-800">{seller.totalRevenue}</div>
                            <div className="text-xs text-slate-500">Revenue</div>
                          </div>

                          <div className="text-center">
                            <div className="font-bold text-slate-800">{seller.agents}</div>
                            <div className="text-xs text-slate-500">Agents</div>
                          </div>

                          <div className="text-center">
                            <div className="flex items-center justify-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-bold text-slate-800">{seller.avgRating}</span>
                            </div>
                            <div className="text-xs text-slate-500">Avg Rating</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Categories */}
            <TabsContent value="categories">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryStats.map((category, index) => (
                  <Card key={index} className="border border-slate-200 hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4 mb-4">
                        <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center`}>
                          <span className="text-white font-bold">#{index + 1}</span>
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-800">{category.category}</h3>
                          <Badge className="bg-emerald-100 text-emerald-700 text-xs">{category.growth}</Badge>
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">Agents:</span>
                          <span className="font-medium text-slate-800">{category.agents}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">Total Sales:</span>
                          <span className="font-medium text-slate-800">{category.totalSales}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-600">Avg Price:</span>
                          <span className="font-medium text-slate-800">{category.avgPrice}</span>
                        </div>
                      </div>

                      <div className="mt-4 pt-4 border-t border-slate-200">
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className={`${category.color} h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${Math.min((category.totalSales / 3500) * 100, 100)}%` }}
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  )
}
