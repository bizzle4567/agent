"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  ShoppingCart,
  Search,
  MoreHorizontal,
  Eye,
  MessageSquare,
  Download,
  Calendar,
  DollarSign,
  Package,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react"
import SellerLayout from "@/components/seller-layout"

const orders = [
  {
    id: "ORD-24001",
    customer: {
      name: "Adebayo Ogundimu",
      email: "adebayo@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    agent: {
      name: "CustomerCare Pro",
      plan: "Professional",
      image: "/placeholder.svg?height=40&width=40",
    },
    amount: 35000,
    status: "Completed",
    paymentStatus: "Paid",
    date: "2024-03-15T10:30:00Z",
    deliveryDate: "2024-03-15T11:00:00Z",
    orderType: "New Purchase",
  },
  {
    id: "ORD-24002",
    customer: {
      name: "Kemi Adebisi",
      email: "kemi@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    agent: {
      name: "SalesBot Nigeria",
      plan: "Starter",
      image: "/placeholder.svg?height=40&width=40",
    },
    amount: 15000,
    status: "Processing",
    paymentStatus: "Paid",
    date: "2024-03-15T14:20:00Z",
    deliveryDate: null,
    orderType: "New Purchase",
  },
  {
    id: "ORD-24003",
    customer: {
      name: "Chinedu Okoro",
      email: "chinedu@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    agent: {
      name: "ContentCreator AI",
      plan: "Enterprise",
      image: "/placeholder.svg?height=40&width=40",
    },
    amount: 75000,
    status: "Pending",
    paymentStatus: "Pending",
    date: "2024-03-15T16:45:00Z",
    deliveryDate: null,
    orderType: "Upgrade",
  },
  {
    id: "ORD-24004",
    customer: {
      name: "Fatima Hassan",
      email: "fatima@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    agent: {
      name: "CustomerCare Pro",
      plan: "Professional",
      image: "/placeholder.svg?height=40&width=40",
    },
    amount: 35000,
    status: "Completed",
    paymentStatus: "Paid",
    date: "2024-03-14T09:15:00Z",
    deliveryDate: "2024-03-14T09:45:00Z",
    orderType: "Renewal",
  },
  {
    id: "ORD-24005",
    customer: {
      name: "Ibrahim Musa",
      email: "ibrahim@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    agent: {
      name: "SalesBot Nigeria",
      plan: "Professional",
      image: "/placeholder.svg?height=40&width=40",
    },
    amount: 35000,
    status: "Cancelled",
    paymentStatus: "Refunded",
    date: "2024-03-14T13:30:00Z",
    deliveryDate: null,
    orderType: "New Purchase",
  },
  {
    id: "ORD-24006",
    customer: {
      name: "Blessing Okafor",
      email: "blessing@example.com",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    agent: {
      name: "ContentCreator AI",
      plan: "Starter",
      image: "/placeholder.svg?height=40&width=40",
    },
    amount: 12000,
    status: "Processing",
    paymentStatus: "Paid",
    date: "2024-03-14T11:20:00Z",
    deliveryDate: null,
    orderType: "New Purchase",
  },
]

const orderStats = [
  {
    title: "Total Orders",
    value: "1,247",
    change: "+12%",
    icon: ShoppingCart,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Pending Orders",
    value: "23",
    change: "+5",
    icon: Clock,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    title: "Completed Orders",
    value: "1,189",
    change: "+8%",
    icon: CheckCircle,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Order Value",
    value: "₦2.8M",
    change: "+15%",
    icon: DollarSign,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
]

export default function SellerOrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [selectedTab, setSelectedTab] = useState("all")

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.agent.name.toLowerCase().includes(searchTerm.toLowerCase())

    if (selectedTab === "all") return matchesSearch
    if (selectedTab === "pending") return matchesSearch && order.status === "Pending"
    if (selectedTab === "processing") return matchesSearch && order.status === "Processing"
    if (selectedTab === "completed") return matchesSearch && order.status === "Completed"
    if (selectedTab === "cancelled") return matchesSearch && order.status === "Cancelled"

    return matchesSearch
  })

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed":
        return "bg-emerald-100 text-emerald-700"
      case "Processing":
        return "bg-blue-100 text-blue-700"
      case "Pending":
        return "bg-yellow-100 text-yellow-700"
      case "Cancelled":
        return "bg-red-100 text-red-700"
      default:
        return "bg-slate-100 text-slate-700"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Completed":
        return <CheckCircle className="h-4 w-4" />
      case "Processing":
        return <Clock className="h-4 w-4" />
      case "Pending":
        return <AlertCircle className="h-4 w-4" />
      case "Cancelled":
        return <XCircle className="h-4 w-4" />
      default:
        return <Package className="h-4 w-4" />
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-NG", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  return (
    <SellerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Order Management</h1>
            <p className="text-slate-600">Track and manage all your agent sales</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export Orders
            </Button>
            <Button variant="outline" className="bg-transparent">
              <Calendar className="h-4 w-4 mr-2" />
              Date Range
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {orderStats.map((stat, index) => (
            <Card key={index} className="border border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 text-xs">{stat.change}</Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</p>
                  <p className="text-sm text-slate-600">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Orders Table */}
        <Card className="border border-slate-200">
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <CardTitle className="text-lg">Recent Orders</CardTitle>
              <div className="flex gap-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search orders..."
                    className="pl-10 w-80"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-5 bg-slate-100">
                <TabsTrigger value="all">All ({orders.length})</TabsTrigger>
                <TabsTrigger value="pending">
                  Pending ({orders.filter((o) => o.status === "Pending").length})
                </TabsTrigger>
                <TabsTrigger value="processing">
                  Processing ({orders.filter((o) => o.status === "Processing").length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed ({orders.filter((o) => o.status === "Completed").length})
                </TabsTrigger>
                <TabsTrigger value="cancelled">
                  Cancelled ({orders.filter((o) => o.status === "Cancelled").length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value={selectedTab}>
                {filteredOrders.length === 0 ? (
                  <div className="text-center py-12">
                    <ShoppingCart className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-slate-800 mb-2">No orders found</h3>
                    <p className="text-slate-600">
                      {searchTerm
                        ? "Try adjusting your search terms"
                        : "Orders will appear here when customers purchase your agents"}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredOrders.map((order) => (
                      <Card key={order.id} className="border border-slate-200 hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                          <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4 flex-1">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={order.customer.avatar || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {order.customer.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>

                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <h3 className="font-semibold text-slate-800">{order.id}</h3>
                                  <Badge className={`text-xs ${getStatusColor(order.status)}`}>
                                    {getStatusIcon(order.status)}
                                    <span className="ml-1">{order.status}</span>
                                  </Badge>
                                  <Badge variant="outline" className="text-xs">
                                    {order.orderType}
                                  </Badge>
                                </div>

                                <div className="grid md:grid-cols-2 gap-4 mb-3">
                                  <div>
                                    <p className="text-sm text-slate-500">Customer</p>
                                    <p className="font-medium text-slate-800">{order.customer.name}</p>
                                    <p className="text-xs text-slate-500">{order.customer.email}</p>
                                  </div>
                                  <div>
                                    <p className="text-sm text-slate-500">Agent & Plan</p>
                                    <p className="font-medium text-slate-800">{order.agent.name}</p>
                                    <p className="text-xs text-slate-500">{order.agent.plan} Plan</p>
                                  </div>
                                </div>

                                <div className="grid md:grid-cols-3 gap-4 text-sm">
                                  <div>
                                    <p className="text-slate-500">Order Date</p>
                                    <p className="font-medium text-slate-800">{formatDate(order.date)}</p>
                                  </div>
                                  <div>
                                    <p className="text-slate-500">Delivery Date</p>
                                    <p className="font-medium text-slate-800">
                                      {order.deliveryDate ? formatDate(order.deliveryDate) : "Pending"}
                                    </p>
                                  </div>
                                  <div>
                                    <p className="text-slate-500">Payment Status</p>
                                    <Badge
                                      className={`text-xs ${
                                        order.paymentStatus === "Paid"
                                          ? "bg-emerald-100 text-emerald-700"
                                          : order.paymentStatus === "Pending"
                                            ? "bg-yellow-100 text-yellow-700"
                                            : "bg-red-100 text-red-700"
                                      }`}
                                    >
                                      {order.paymentStatus}
                                    </Badge>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div className="text-right ml-4">
                              <p className="text-2xl font-bold text-slate-800 mb-2">₦{order.amount.toLocaleString()}</p>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreHorizontal className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem>
                                    <Eye className="h-4 w-4 mr-2" />
                                    View Details
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <MessageSquare className="h-4 w-4 mr-2" />
                                    Contact Customer
                                  </DropdownMenuItem>
                                  <DropdownMenuItem>
                                    <Download className="h-4 w-4 mr-2" />
                                    Download Invoice
                                  </DropdownMenuItem>
                                  <DropdownMenuSeparator />
                                  {order.status === "Pending" && (
                                    <>
                                      <DropdownMenuItem className="text-emerald-600">
                                        <CheckCircle className="h-4 w-4 mr-2" />
                                        Mark as Processing
                                      </DropdownMenuItem>
                                      <DropdownMenuItem className="text-red-600">
                                        <XCircle className="h-4 w-4 mr-2" />
                                        Cancel Order
                                      </DropdownMenuItem>
                                    </>
                                  )}
                                  {order.status === "Processing" && (
                                    <DropdownMenuItem className="text-emerald-600">
                                      <CheckCircle className="h-4 w-4 mr-2" />
                                      Mark as Completed
                                    </DropdownMenuItem>
                                  )}
                                </DropdownMenuContent>
                              </DropdownMenu>
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
