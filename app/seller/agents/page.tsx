"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Package,
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Copy,
  Star,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Calendar,
  ExternalLink,
} from "lucide-react"
import SellerLayout from "@/components/seller-layout"
import Link from "next/link"

const agents = [
  {
    id: 1,
    name: "CustomerCare Pro",
    category: "Customer Service",
    description: "24/7 customer support automation with Nigerian context understanding",
    price: 15000,
    status: "Active",
    sales: 234,
    revenue: "₦3,510,000",
    rating: 4.9,
    reviews: 89,
    views: 12500,
    created: "2024-01-15",
    lastUpdated: "2024-03-10",
    image: "/placeholder.svg?height=80&width=80",
    growth: "+15%",
    featured: true,
  },
  {
    id: 2,
    name: "SalesBot Nigeria",
    category: "Sales Automation",
    description: "Intelligent sales automation for Nigerian businesses",
    price: 25000,
    status: "Active",
    sales: 189,
    revenue: "₦4,725,000",
    rating: 4.8,
    reviews: 67,
    views: 9800,
    created: "2024-02-01",
    lastUpdated: "2024-03-08",
    image: "/placeholder.svg?height=80&width=80",
    growth: "+23%",
    featured: false,
  },
  {
    id: 3,
    name: "ContentCreator AI",
    category: "Content Creation",
    description: "AI-powered content generation for social media and marketing",
    price: 12000,
    status: "Active",
    sales: 156,
    revenue: "₦1,872,000",
    rating: 4.7,
    reviews: 45,
    views: 7600,
    created: "2024-02-15",
    lastUpdated: "2024-03-05",
    image: "/placeholder.svg?height=80&width=80",
    growth: "+8%",
    featured: false,
  },
  {
    id: 4,
    name: "DataAnalyzer Pro",
    category: "Analytics",
    description: "Advanced data analysis and reporting for business insights",
    price: 18000,
    status: "Draft",
    sales: 0,
    revenue: "₦0",
    rating: 0,
    reviews: 0,
    views: 0,
    created: "2024-03-01",
    lastUpdated: "2024-03-12",
    image: "/placeholder.svg?height=80&width=80",
    growth: "0%",
    featured: false,
  },
  {
    id: 5,
    name: "ChatBot Express",
    category: "Customer Service",
    description: "Quick setup chatbot for small businesses",
    price: 8000,
    status: "Paused",
    sales: 98,
    revenue: "₦784,000",
    rating: 4.4,
    reviews: 32,
    views: 5400,
    created: "2024-01-20",
    lastUpdated: "2024-02-28",
    image: "/placeholder.svg?height=80&width=80",
    growth: "-5%",
    featured: false,
  },
  {
    id: 6,
    name: "EmailMarketer AI",
    category: "Marketing",
    description: "Automated email marketing campaigns with AI optimization",
    price: 20000,
    status: "Under Review",
    sales: 0,
    revenue: "₦0",
    rating: 0,
    reviews: 0,
    views: 0,
    created: "2024-03-10",
    lastUpdated: "2024-03-12",
    image: "/placeholder.svg?height=80&width=80",
    growth: "0%",
    featured: false,
  },
]

const stats = [
  {
    title: "Total Agents",
    value: "6",
    change: "+1",
    trend: "up",
    icon: Package,
  },
  {
    title: "Active Agents",
    value: "3",
    change: "0",
    trend: "neutral",
    icon: TrendingUp,
  },
  {
    title: "Total Revenue",
    value: "₦10.9M",
    change: "+18%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Avg. Rating",
    value: "4.7",
    change: "+0.1",
    trend: "up",
    icon: Star,
  },
]

export default function SellerAgentsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedTab, setSelectedTab] = useState("all")

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.category.toLowerCase().includes(searchTerm.toLowerCase())

    if (selectedTab === "all") return matchesSearch
    if (selectedTab === "active") return matchesSearch && agent.status === "Active"
    if (selectedTab === "draft") return matchesSearch && agent.status === "Draft"
    if (selectedTab === "paused") return matchesSearch && (agent.status === "Paused" || agent.status === "Under Review")

    return matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-100 text-emerald-700"
      case "Draft":
        return "bg-yellow-100 text-yellow-700"
      case "Paused":
        return "bg-red-100 text-red-700"
      case "Under Review":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  return (
    <SellerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">My Agents</h1>
            <p className="text-slate-600">Manage and monitor your AI agent portfolio</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
            <Link href="/list-agent">
              <Button className="bg-emerald-600 hover:bg-emerald-700">
                <Plus className="h-4 w-4 mr-2" />
                Create Agent
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <Card key={index} className="border border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-2 rounded-lg bg-emerald-50">
                    <stat.icon className="h-5 w-5 text-emerald-600" />
                  </div>
                  {stat.trend !== "neutral" && (
                    <Badge
                      variant={stat.trend === "up" ? "default" : "destructive"}
                      className={`text-xs ${
                        stat.trend === "up" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
                      }`}
                    >
                      {stat.change}
                    </Badge>
                  )}
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</p>
                  <p className="text-sm text-slate-600">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Tabs */}
        <Card className="border border-slate-200">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search agents..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 bg-slate-100">
                <TabsTrigger value="all">All ({agents.length})</TabsTrigger>
                <TabsTrigger value="active">Active ({agents.filter((a) => a.status === "Active").length})</TabsTrigger>
                <TabsTrigger value="draft">Draft ({agents.filter((a) => a.status === "Draft").length})</TabsTrigger>
                <TabsTrigger value="paused">
                  Paused ({agents.filter((a) => a.status === "Paused" || a.status === "Under Review").length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={selectedTab} className="space-y-4">
                {filteredAgents.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-800 mb-2">No agents found</h3>
                    <p className="text-slate-600 mb-4">
                      {searchTerm ? "Try adjusting your search terms" : "Create your first agent to get started"}
                    </p>
                    <Link href="/list-agent">
                      <Button className="bg-emerald-600 hover:bg-emerald-700">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Agent
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="grid gap-4">
                    {filteredAgents.map((agent) => (
                      <Card key={agent.id} className="border border-slate-200 hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start gap-4">
                            <img
                              src={agent.image || "/placeholder.svg"}
                              alt={agent.name}
                              className="w-20 h-20 rounded-lg object-cover"
                            />

                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <h3 className="text-lg font-semibold text-slate-800">{agent.name}</h3>
                                    {agent.featured && (
                                      <Badge className="bg-purple-100 text-purple-700 text-xs">Featured</Badge>
                                    )}
                                    <Badge className={`text-xs ${getStatusColor(agent.status)}`}>{agent.status}</Badge>
                                  </div>
                                  <p className="text-sm text-slate-500 mb-1">{agent.category}</p>
                                  <p className="text-sm text-slate-600 mb-3 line-clamp-2">{agent.description}</p>
                                </div>

                                <DropdownMenu>
                                  <DropdownMenuTrigger asChild>
                                    <Button variant="ghost" size="sm">
                                      <MoreHorizontal className="h-4 w-4" />
                                    </Button>
                                  </DropdownMenuTrigger>
                                  <DropdownMenuContent align="end">
                                    <DropdownMenuItem asChild>
                                      <Link href={`/agent/${agent.id}`} className="flex items-center">
                                        <Eye className="h-4 w-4 mr-2" />
                                        View Public Page
                                      </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Edit className="h-4 w-4 mr-2" />
                                      Edit Agent
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <Copy className="h-4 w-4 mr-2" />
                                      Duplicate
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                      <ExternalLink className="h-4 w-4 mr-2" />
                                      Analytics
                                    </DropdownMenuItem>
                                    <DropdownMenuSeparator />
                                    <DropdownMenuItem className="text-red-600">
                                      <Trash2 className="h-4 w-4 mr-2" />
                                      Delete
                                    </DropdownMenuItem>
                                  </DropdownMenuContent>
                                </DropdownMenu>
                              </div>

                              <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                                <div>
                                  <p className="text-slate-500">Price</p>
                                  <p className="font-semibold text-slate-800">₦{agent.price.toLocaleString()}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500">Sales</p>
                                  <p className="font-semibold text-slate-800">{agent.sales}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500">Revenue</p>
                                  <p className="font-semibold text-slate-800">{agent.revenue}</p>
                                </div>
                                <div>
                                  <p className="text-slate-500">Rating</p>
                                  <div className="flex items-center gap-1">
                                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                    <span className="font-semibold text-slate-800">{agent.rating || "N/A"}</span>
                                    <span className="text-slate-500">({agent.reviews})</span>
                                  </div>
                                </div>
                                <div>
                                  <p className="text-slate-500">Growth</p>
                                  <p
                                    className={`font-semibold flex items-center gap-1 ${
                                      agent.growth.startsWith("+")
                                        ? "text-emerald-600"
                                        : agent.growth.startsWith("-")
                                          ? "text-red-600"
                                          : "text-slate-600"
                                    }`}
                                  >
                                    {agent.growth.startsWith("+") ? (
                                      <TrendingUp className="h-3 w-3" />
                                    ) : agent.growth.startsWith("-") ? (
                                      <TrendingDown className="h-3 w-3" />
                                    ) : null}
                                    {agent.growth}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center justify-between mt-4 pt-4 border-t border-slate-200">
                                <div className="flex items-center gap-4 text-xs text-slate-500">
                                  <span className="flex items-center gap-1">
                                    <Eye className="h-3 w-3" />
                                    {agent.views.toLocaleString()} views
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    Created {new Date(agent.created).toLocaleDateString()}
                                  </span>
                                </div>

                                <div className="flex gap-2">
                                  <Link href={`/agent/${agent.id}`}>
                                    <Button size="sm" variant="outline" className="bg-transparent">
                                      <Eye className="h-3 w-3 mr-1" />
                                      View
                                    </Button>
                                  </Link>
                                  <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                                    <Edit className="h-3 w-3 mr-1" />
                                    Edit
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </SellerLayout>
  )
}
