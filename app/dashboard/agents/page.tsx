"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Bot,
  Search,
  MoreHorizontal,
  Play,
  Settings,
  BarChart3,
  Star,
  Zap,
  TrendingUp,
  TrendingDown,
  Activity,
  DollarSign,
  Eye,
  Trash2,
  Plus,
  Grid3X3,
  List,
  SortAsc,
  Download,
} from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import Link from "next/link"
import { useState } from "react"

import { useEffect } from "react"

// Fetch agents from Supabase for the current user
function useUserAgents(userId) {
  const [agents, setAgents] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    if (!userId) return
    setLoading(true)
    supabase
      .from("agents")
      .select("*")
      .eq("owner_id", userId)
      .then(({ data }) => {
        setAgents(data || [])
        setLoading(false)
      })
  }, [userId])
  return { agents, loading }
}

export default function AgentsPage() {
  // TODO: Replace with real user ID from auth/session
  const userId = null // e.g. useUser()?.id or from context
  const { agents, loading } = useUserAgents(userId)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedStatus, setSelectedStatus] = useState("all")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("name")

  // Filter and derive categories/statuses from live agents
  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      agent.category?.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === "all" || agent.category === selectedCategory
    const matchesStatus = selectedStatus === "all" || (agent.status || "").toLowerCase() === selectedStatus
    return matchesSearch && matchesCategory && matchesStatus
  })
  const categories = [...new Set(agents.map((agent) => agent.category).filter(Boolean))]
  const statuses = [...new Set(agents.map((agent) => (agent.status || "").toLowerCase()).filter(Boolean))]
  const totalAgents = agents.length
  const activeAgents = agents.filter((a) => a.status === "Active").length
  // These will be 0 if no agents, or you can add logic to sum real fields if present
  const totalUsage = agents.reduce((sum, agent) => sum + (agent.used || 0), 0)
  const totalCost = agents.reduce((sum, agent) => sum + Number.parseInt((agent.cost || "0").replace(/[^\d]/g, "")), 0)

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">My Agents</h1>
            <p className="text-slate-600">Manage and monitor your AI agent subscriptions</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
            <Link href="/marketplace">
              <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
                <Plus className="h-4 w-4" />
                Browse Agents
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6">
          <Card className="border-0 shadow-sm bg-blue-50 border-blue-200 border-l-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-800">{totalAgents}</p>
                    <p className="text-xs text-slate-600 font-medium">Total Agents</p>
                  </div>
                </div>
                <Badge className="bg-blue-100 text-blue-700">{activeAgents} Active</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-emerald-50 border-emerald-200 border-l-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-sm">
                    <Activity className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-800">{totalUsage.toLocaleString()}</p>
                    <p className="text-xs text-slate-600 font-medium">Total Requests</p>
                  </div>
                </div>
                <Badge className="bg-emerald-100 text-emerald-700">This Month</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-purple-50 border-purple-200 border-l-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 shadow-sm">
                    <DollarSign className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-800">₦{totalCost.toLocaleString()}</p>
                    <p className="text-xs text-slate-600 font-medium">Monthly Cost</p>
                  </div>
                </div>
                <Badge className="bg-purple-100 text-purple-700">Current</Badge>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-sm bg-amber-50 border-amber-200 border-l-4">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-gradient-to-br from-amber-500 to-amber-600 shadow-sm">
                    <Star className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-800">4.7</p>
                    <p className="text-xs text-slate-600 font-medium">Avg. Rating</p>
                  </div>
                </div>
                <Badge className="bg-amber-100 text-amber-700">Excellent</Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card className="border border-slate-200">
          <CardContent className="p-4">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="flex flex-1 gap-4 items-center">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    placeholder="Search agents..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    {statuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 items-center">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SortAsc className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="usage">Usage</SelectItem>
                    <SelectItem value="cost">Cost</SelectItem>
                    <SelectItem value="rating">Rating</SelectItem>
                    <SelectItem value="lastUsed">Last Used</SelectItem>
                  </SelectContent>
                </Select>

                <div className="flex border border-slate-200 rounded-lg">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={viewMode === "grid" ? "bg-blue-600 hover:bg-blue-700" : ""}
                  >
                    <Grid3X3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className={viewMode === "list" ? "bg-blue-600 hover:bg-blue-700" : ""}
                  >
                    <List className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Agents Grid/List */}
        {viewMode === "grid" ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAgents.map((agent) => (
              <Card key={agent.id} className="border border-slate-200 hover:shadow-lg transition-all duration-300">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-12 w-12">
                        <AvatarImage src={agent.image || "/placeholder.svg"} />
                        <AvatarFallback>{agent.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-slate-800">{agent.name}</h3>
                        <p className="text-sm text-slate-600">{agent.category}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Settings className="h-4 w-4 mr-2" />
                          Configure
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Analytics
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="h-4 w-4 mr-2" />
                          Remove
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Badge
                      className={
                        agent.status === "Active"
                          ? "bg-emerald-100 text-emerald-700"
                          : agent.status === "Paused"
                            ? "bg-amber-100 text-amber-700"
                            : "bg-blue-100 text-blue-700"
                      }
                    >
                      {agent.status}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {agent.plan}
                    </Badge>
                  </div>

                  <p className="text-sm text-slate-600 line-clamp-2">{agent.description}</p>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Usage this month</span>
                      <span className="font-medium">{agent.usage}%</span>
                    </div>
                    <Progress value={agent.usage} className="h-2" />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>{agent.used.toLocaleString()} requests</span>
                      <span>{agent.monthlyQuota.toLocaleString()} limit</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-600">Rating</p>
                      <div className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{agent.rating}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-slate-600">Cost</p>
                      <p className="font-medium">{agent.cost}/mo</p>
                    </div>
                    <div>
                      <p className="text-slate-600">Performance</p>
                      <div className="flex items-center gap-1">
                        {agent.performance.startsWith("+") ? (
                          <TrendingUp className="h-3 w-3 text-emerald-500" />
                        ) : agent.performance.startsWith("-") ? (
                          <TrendingDown className="h-3 w-3 text-red-500" />
                        ) : null}
                        <span
                          className={`font-medium text-xs ${
                            agent.performance.startsWith("+")
                              ? "text-emerald-600"
                              : agent.performance.startsWith("-")
                                ? "text-red-600"
                                : "text-slate-600"
                          }`}
                        >
                          {agent.performance}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-slate-600">Last Used</p>
                      <p className="font-medium text-xs">{agent.lastUsed}</p>
                    </div>
                  </div>

                  <div className="flex gap-2 pt-2">
                    <Button
                      size="sm"
                      className="flex-1 bg-blue-600 hover:bg-blue-700"
                      disabled={agent.status === "Paused"}
                    >
                      {agent.status === "Paused" ? (
                        <>
                          <Play className="h-3 w-3 mr-1" />
                          Resume
                        </>
                      ) : (
                        <>
                          <Zap className="h-3 w-3 mr-1" />
                          Use Now
                        </>
                      )}
                    </Button>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Settings className="h-3 w-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="border border-slate-200">
            <CardContent className="p-0">
              <div className="divide-y divide-slate-200">
                {filteredAgents.map((agent) => (
                  <div key={agent.id} className="p-4 hover:bg-slate-50 transition-colors">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={agent.image || "/placeholder.svg"} />
                          <AvatarFallback>{agent.name.slice(0, 2)}</AvatarFallback>
                        </Avatar>

                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-semibold text-slate-800 truncate">{agent.name}</h3>
                            <Badge
                              className={`text-xs ${
                                agent.status === "Active"
                                  ? "bg-emerald-100 text-emerald-700"
                                  : agent.status === "Paused"
                                    ? "bg-amber-100 text-amber-700"
                                    : "bg-blue-100 text-blue-700"
                              }`}
                            >
                              {agent.status}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {agent.plan}
                            </Badge>
                          </div>
                          <p className="text-sm text-slate-600 mb-2">{agent.category}</p>
                          <p className="text-sm text-slate-500 line-clamp-1">{agent.description}</p>
                        </div>

                        <div className="hidden md:flex items-center gap-8 text-sm">
                          <div className="text-center">
                            <p className="text-slate-600">Usage</p>
                            <p className="font-medium">{agent.usage}%</p>
                          </div>
                          <div className="text-center">
                            <p className="text-slate-600">Rating</p>
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium">{agent.rating}</span>
                            </div>
                          </div>
                          <div className="text-center">
                            <p className="text-slate-600">Cost</p>
                            <p className="font-medium">{agent.cost}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-slate-600">Performance</p>
                            <div className="flex items-center gap-1">
                              {agent.performance.startsWith("+") ? (
                                <TrendingUp className="h-3 w-3 text-emerald-500" />
                              ) : agent.performance.startsWith("-") ? (
                                <TrendingDown className="h-3 w-3 text-red-500" />
                              ) : null}
                              <span
                                className={`font-medium ${
                                  agent.performance.startsWith("+")
                                    ? "text-emerald-600"
                                    : agent.performance.startsWith("-")
                                      ? "text-red-600"
                                      : "text-slate-600"
                                }`}
                              >
                                {agent.performance}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          size="sm"
                          className="bg-blue-600 hover:bg-blue-700"
                          disabled={agent.status === "Paused"}
                        >
                          {agent.status === "Paused" ? (
                            <>
                              <Play className="h-3 w-3 mr-1" />
                              Resume
                            </>
                          ) : (
                            <>
                              <Zap className="h-3 w-3 mr-1" />
                              Use Now
                            </>
                          )}
                        </Button>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          <Settings className="h-3 w-3" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <BarChart3 className="h-4 w-4 mr-2" />
                              Analytics
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Trash2 className="h-4 w-4 mr-2" />
                              Remove
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Empty State */}
        {filteredAgents.length === 0 && (
          <Card className="border border-slate-200">
            <CardContent className="text-center py-12">
              <Bot className="h-12 w-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-slate-800 mb-2">No agents found</h3>
              <p className="text-slate-600 mb-4">
                {searchTerm || selectedCategory !== "all" || selectedStatus !== "all"
                  ? "Try adjusting your filters to see more results."
                  : "You haven't subscribed to any agents yet."}
              </p>
              <Link href="/marketplace">
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Browse Marketplace
                </Button>
              </Link>
            </CardContent>
          </Card>
        )}
      </div>
    </DashboardLayout>
  )
}
