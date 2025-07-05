"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import {
  Users,
  Search,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  Star,
  MessageSquare,
  Eye,
  Download,
  UserPlus,
  TrendingUp,
  Building,
} from "lucide-react"
import SellerLayout from "@/components/seller-layout"

const customers = [
  {
    id: 1,
    name: "Adebayo Ogundimu",
    email: "adebayo@techcorp.ng",
    phone: "+234 803 123 4567",
    avatar: "/placeholder.svg?height=40&width=40",
    company: "TechCorp Nigeria",
    location: "Lagos, Nigeria",
    joinDate: "2024-01-15",
    totalSpent: 125000,
    totalOrders: 8,
    lastOrder: "2024-01-20",
    status: "Active",
    tier: "Premium",
    agentsPurchased: ["CustomerCare Pro", "SalesBot Nigeria"],
    rating: 4.8,
    notes: "High-value customer, prefers enterprise solutions",
  },
  {
    id: 2,
    name: "Kemi Adebisi",
    email: "kemi@startupng.com",
    phone: "+234 701 987 6543",
    avatar: "/placeholder.svg?height=40&width=40",
    company: "StartupNG",
    location: "Abuja, Nigeria",
    joinDate: "2024-02-10",
    totalSpent: 75000,
    totalOrders: 5,
    lastOrder: "2024-01-18",
    status: "Active",
    tier: "Standard",
    agentsPurchased: ["ContentCreator AI"],
    rating: 4.6,
    notes: "Growing startup, budget-conscious",
  },
  {
    id: 3,
    name: "Chinedu Okoro",
    email: "chinedu@ecommerce.ng",
    phone: "+234 802 456 7890",
    avatar: "/placeholder.svg?height=40&width=40",
    company: "E-commerce Solutions",
    location: "Port Harcourt, Nigeria",
    joinDate: "2023-11-20",
    totalSpent: 200000,
    totalOrders: 12,
    lastOrder: "2024-01-22",
    status: "VIP",
    tier: "Enterprise",
    agentsPurchased: ["CustomerCare Pro", "SalesBot Nigeria", "DataAnalyzer Pro"],
    rating: 4.9,
    notes: "Long-term customer, multiple agent user",
  },
  {
    id: 4,
    name: "Fatima Hassan",
    email: "fatima@consulting.ng",
    phone: "+234 805 234 5678",
    avatar: "/placeholder.svg?height=40&width=40",
    company: "Hassan Consulting",
    location: "Kano, Nigeria",
    joinDate: "2024-01-05",
    totalSpent: 45000,
    totalOrders: 3,
    lastOrder: "2024-01-15",
    status: "New",
    tier: "Basic",
    agentsPurchased: ["ContentCreator AI"],
    rating: 4.5,
    notes: "New customer, potential for growth",
  },
  {
    id: 5,
    name: "Olumide Adeyemi",
    email: "olumide@fintech.ng",
    phone: "+234 703 345 6789",
    avatar: "/placeholder.svg?height=40&width=40",
    company: "FinTech Innovations",
    location: "Lagos, Nigeria",
    joinDate: "2023-09-12",
    totalSpent: 180000,
    totalOrders: 10,
    lastOrder: "2024-01-19",
    status: "Active",
    tier: "Premium",
    agentsPurchased: ["DataAnalyzer Pro", "CustomerCare Pro"],
    rating: 4.7,
    notes: "Tech-savvy, interested in AI solutions",
  },
]

const customerStats = [
  {
    title: "Total Customers",
    value: "1,247",
    change: "+12.5%",
    icon: Users,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Active Customers",
    value: "892",
    change: "+8.2%",
    icon: TrendingUp,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Avg. Order Value",
    value: "₦42,500",
    change: "+15.3%",
    icon: DollarSign,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Customer Satisfaction",
    value: "4.7",
    change: "+0.2",
    icon: Star,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
]

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [tierFilter, setTierFilter] = useState("all")
  const [selectedCustomer, setSelectedCustomer] = useState<(typeof customers)[0] | null>(null)

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || customer.status.toLowerCase() === statusFilter
    const matchesTier = tierFilter === "all" || customer.tier.toLowerCase() === tierFilter

    return matchesSearch && matchesStatus && matchesTier
  })

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "bg-emerald-100 text-emerald-700"
      case "vip":
        return "bg-purple-100 text-purple-700"
      case "new":
        return "bg-blue-100 text-blue-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier.toLowerCase()) {
      case "enterprise":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
      case "premium":
        return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
      case "standard":
        return "bg-gradient-to-r from-blue-400 to-blue-600 text-white"
      case "basic":
        return "bg-gradient-to-r from-gray-400 to-gray-600 text-white"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  return (
    <SellerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Customer Management</h1>
            <p className="text-slate-600">Manage your customer relationships and track their journey.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-transparent">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <UserPlus className="h-4 w-4 mr-2" />
              Add Customer
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {customerStats.map((stat, index) => (
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

        {/* Filters and Search */}
        <Card className="border border-slate-200">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search customers by name, email, or company..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="vip">VIP</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                </SelectContent>
              </Select>
              <Select value={tierFilter} onValueChange={setTierFilter}>
                <SelectTrigger className="w-full md:w-40">
                  <SelectValue placeholder="Tier" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tiers</SelectItem>
                  <SelectItem value="enterprise">Enterprise</SelectItem>
                  <SelectItem value="premium">Premium</SelectItem>
                  <SelectItem value="standard">Standard</SelectItem>
                  <SelectItem value="basic">Basic</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Customer List */}
        <Card className="border border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">Customers ({filteredCustomers.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {filteredCustomers.map((customer) => (
                <div
                  key={customer.id}
                  className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                >
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={customer.avatar || "/placeholder.svg"} />
                    <AvatarFallback>
                      {customer.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-slate-800">{customer.name}</h4>
                      <Badge className={`text-xs ${getStatusColor(customer.status)}`}>{customer.status}</Badge>
                      <Badge className={`text-xs ${getTierColor(customer.tier)}`}>{customer.tier}</Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-slate-600 mb-2">
                      <span className="flex items-center gap-1">
                        <Mail className="h-3 w-3" />
                        {customer.email}
                      </span>
                      <span className="flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        {customer.company}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {customer.location}
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-xs text-slate-500">
                      <span>{customer.totalOrders} orders</span>
                      <span>₦{customer.totalSpent.toLocaleString()} spent</span>
                      <span className="flex items-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        {customer.rating}
                      </span>
                      <span>Joined {new Date(customer.joinDate).toLocaleDateString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" size="sm" onClick={() => setSelectedCustomer(customer)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <DialogHeader>
                          <DialogTitle>Customer Details</DialogTitle>
                        </DialogHeader>
                        {selectedCustomer && (
                          <div className="space-y-6">
                            <div className="flex items-center gap-4">
                              <Avatar className="h-16 w-16">
                                <AvatarImage src={selectedCustomer.avatar || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {selectedCustomer.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>
                              <div>
                                <h3 className="text-xl font-bold text-slate-800">{selectedCustomer.name}</h3>
                                <p className="text-slate-600">{selectedCustomer.company}</p>
                                <div className="flex items-center gap-2 mt-2">
                                  <Badge className={`text-xs ${getStatusColor(selectedCustomer.status)}`}>
                                    {selectedCustomer.status}
                                  </Badge>
                                  <Badge className={`text-xs ${getTierColor(selectedCustomer.tier)}`}>
                                    {selectedCustomer.tier}
                                  </Badge>
                                </div>
                              </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-6">
                              <div>
                                <h4 className="font-medium text-slate-800 mb-3">Contact Information</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex items-center gap-2">
                                    <Mail className="h-4 w-4 text-slate-400" />
                                    <span>{selectedCustomer.email}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Phone className="h-4 w-4 text-slate-400" />
                                    <span>{selectedCustomer.phone}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <MapPin className="h-4 w-4 text-slate-400" />
                                    <span>{selectedCustomer.location}</span>
                                  </div>
                                  <div className="flex items-center gap-2">
                                    <Calendar className="h-4 w-4 text-slate-400" />
                                    <span>Joined {new Date(selectedCustomer.joinDate).toLocaleDateString()}</span>
                                  </div>
                                </div>
                              </div>

                              <div>
                                <h4 className="font-medium text-slate-800 mb-3">Purchase History</h4>
                                <div className="space-y-2 text-sm">
                                  <div className="flex justify-between">
                                    <span>Total Orders:</span>
                                    <span className="font-medium">{selectedCustomer.totalOrders}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Total Spent:</span>
                                    <span className="font-medium">₦{selectedCustomer.totalSpent.toLocaleString()}</span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Last Order:</span>
                                    <span className="font-medium">
                                      {new Date(selectedCustomer.lastOrder).toLocaleDateString()}
                                    </span>
                                  </div>
                                  <div className="flex justify-between">
                                    <span>Rating:</span>
                                    <span className="flex items-center gap-1 font-medium">
                                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                      {selectedCustomer.rating}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium text-slate-800 mb-3">Purchased Agents</h4>
                              <div className="flex flex-wrap gap-2">
                                {selectedCustomer.agentsPurchased.map((agent, index) => (
                                  <Badge key={index} variant="outline" className="bg-emerald-50 text-emerald-700">
                                    {agent}
                                  </Badge>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h4 className="font-medium text-slate-800 mb-3">Notes</h4>
                              <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">
                                {selectedCustomer.notes}
                              </p>
                            </div>

                            <div className="flex gap-3">
                              <Button className="bg-emerald-600 hover:bg-emerald-700">
                                <MessageSquare className="h-4 w-4 mr-2" />
                                Send Message
                              </Button>
                              <Button variant="outline">
                                <Mail className="h-4 w-4 mr-2" />
                                Send Email
                              </Button>
                            </div>
                          </div>
                        )}
                      </DialogContent>
                    </Dialog>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Send Message
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="h-4 w-4 mr-2" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Eye className="h-4 w-4 mr-2" />
                          View Orders
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SellerLayout>
  )
}
