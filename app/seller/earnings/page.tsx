"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Download,
  CreditCard,
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  Banknote,
} from "lucide-react"
import SellerLayout from "@/components/seller-layout"

const earningsStats = [
  {
    title: "Total Earnings",
    value: "₦2,847,500",
    change: "+18.2%",
    trend: "up",
    period: "vs last month",
    icon: DollarSign,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Available Balance",
    value: "₦425,000",
    change: "+12.5%",
    trend: "up",
    period: "ready to withdraw",
    icon: Wallet,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Pending Earnings",
    value: "₦187,500",
    change: "-5.2%",
    trend: "down",
    period: "processing",
    icon: Clock,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    title: "This Month",
    value: "₦312,000",
    change: "+25.8%",
    trend: "up",
    period: "vs last month",
    icon: TrendingUp,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
]

const monthlyEarnings = [
  { month: "Jan", earnings: 180000, orders: 120, commission: 18000 },
  { month: "Feb", earnings: 220000, orders: 145, commission: 22000 },
  { month: "Mar", earnings: 280000, orders: 180, commission: 28000 },
  { month: "Apr", earnings: 320000, orders: 210, commission: 32000 },
  { month: "May", earnings: 380000, orders: 250, commission: 38000 },
  { month: "Jun", earnings: 420000, orders: 280, commission: 42000 },
]

const transactions = [
  {
    id: "TXN-24001",
    type: "sale",
    agent: "CustomerCare Pro",
    customer: "Adebayo Ogundimu",
    amount: 35000,
    commission: 3500,
    netEarnings: 31500,
    status: "completed",
    date: "2024-01-22",
    payoutDate: "2024-01-29",
  },
  {
    id: "TXN-24002",
    type: "sale",
    agent: "SalesBot Nigeria",
    customer: "Kemi Adebisi",
    amount: 25000,
    commission: 2500,
    netEarnings: 22500,
    status: "pending",
    date: "2024-01-21",
    payoutDate: "2024-01-28",
  },
  {
    id: "TXN-24003",
    type: "refund",
    agent: "ContentCreator AI",
    customer: "Chinedu Okoro",
    amount: -15000,
    commission: -1500,
    netEarnings: -13500,
    status: "processed",
    date: "2024-01-20",
    payoutDate: "2024-01-27",
  },
  {
    id: "TXN-24004",
    type: "sale",
    agent: "DataAnalyzer Pro",
    customer: "Fatima Hassan",
    amount: 45000,
    commission: 4500,
    netEarnings: 40500,
    status: "completed",
    date: "2024-01-19",
    payoutDate: "2024-01-26",
  },
  {
    id: "TXN-24005",
    type: "sale",
    agent: "CustomerCare Pro",
    customer: "Olumide Adeyemi",
    amount: 35000,
    commission: 3500,
    netEarnings: 31500,
    status: "pending",
    date: "2024-01-18",
    payoutDate: "2024-01-25",
  },
]

const payoutHistory = [
  {
    id: "PAY-24001",
    amount: 450000,
    method: "Bank Transfer",
    account: "GTBank - ***1234",
    status: "completed",
    date: "2024-01-15",
    reference: "GTB/TRF/240115/001",
  },
  {
    id: "PAY-24002",
    amount: 380000,
    method: "Bank Transfer",
    account: "GTBank - ***1234",
    status: "completed",
    date: "2024-01-01",
    reference: "GTB/TRF/240101/001",
  },
  {
    id: "PAY-24003",
    amount: 320000,
    method: "Bank Transfer",
    account: "GTBank - ***1234",
    status: "completed",
    date: "2023-12-15",
    reference: "GTB/TRF/231215/001",
  },
]

export default function EarningsPage() {
  const [timeFilter, setTimeFilter] = useState("30d")
  const [transactionFilter, setTransactionFilter] = useState("all")

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-emerald-100 text-emerald-700"
      case "pending":
        return "bg-yellow-100 text-yellow-700"
      case "processed":
        return "bg-blue-100 text-blue-700"
      case "failed":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const getTransactionIcon = (type: string) => {
    switch (type) {
      case "sale":
        return <ArrowUpRight className="h-4 w-4 text-emerald-500" />
      case "refund":
        return <ArrowDownRight className="h-4 w-4 text-red-500" />
      default:
        return <DollarSign className="h-4 w-4 text-slate-500" />
    }
  }

  const filteredTransactions = transactions.filter((transaction) => {
    if (transactionFilter === "all") return true
    return transaction.type === transactionFilter
  })

  return (
    <SellerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Earnings</h1>
            <p className="text-slate-600">Track your revenue, commissions, and payouts.</p>
          </div>
          <div className="flex gap-3">
            <Select value={timeFilter} onValueChange={setTimeFilter}>
              <SelectTrigger className="w-40">
                <Calendar className="h-4 w-4 mr-2" />
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
            <Button className="bg-emerald-600 hover:bg-emerald-700">
              <CreditCard className="h-4 w-4 mr-2" />
              Request Payout
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {earningsStats.map((stat, index) => (
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

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Earnings Chart */}
          <Card className="lg:col-span-2 border border-slate-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Earnings Overview</CardTitle>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" className="text-xs bg-emerald-50 text-emerald-600">
                    Earnings
                  </Button>
                  <Button variant="ghost" size="sm" className="text-xs">
                    Orders
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <p className="text-2xl font-bold text-slate-800">₦2,847,500</p>
                <p className="text-sm text-slate-500 flex items-center gap-1">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                  +18.2% from last period
                </p>
              </div>
              {/* Chart placeholder */}
              <div className="h-64 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg flex items-end justify-center p-4">
                <div className="w-full h-full relative flex items-end justify-between gap-2">
                  {monthlyEarnings.map((data, index) => (
                    <div key={index} className="flex flex-col items-center gap-2 flex-1">
                      <div
                        className="bg-emerald-500 rounded-t w-full transition-all duration-500 hover:bg-emerald-600 relative group"
                        style={{ height: `${(data.earnings / 420000) * 100}%` }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-slate-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                          ₦{data.earnings.toLocaleString()}
                        </div>
                      </div>
                      <span className="text-xs text-slate-600">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payout Summary */}
          <Card className="border border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg">Payout Summary</CardTitle>
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
                      strokeDashoffset="65.94"
                      className="transition-all duration-500"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-xl font-bold text-slate-800">70%</span>
                  </div>
                </div>
                <p className="text-sm text-slate-600 mb-2">Available for Payout</p>
                <p className="text-xs text-slate-500">₦425K / ₦607K total</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm text-slate-600">Available</span>
                  </div>
                  <span className="font-medium text-slate-800">₦425,000</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm text-slate-600">Pending</span>
                  </div>
                  <span className="font-medium text-slate-800">₦187,500</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Banknote className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-slate-600">Next Payout</span>
                  </div>
                  <span className="font-medium text-slate-800">Jan 29</span>
                </div>
              </div>

              <Button className="w-full bg-emerald-600 hover:bg-emerald-700">
                <CreditCard className="h-4 w-4 mr-2" />
                Request Payout
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Transactions */}
          <Card className="border border-slate-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Recent Transactions</CardTitle>
                <Select value={transactionFilter} onValueChange={setTransactionFilter}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All</SelectItem>
                    <SelectItem value="sale">Sales</SelectItem>
                    <SelectItem value="refund">Refunds</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                    <div className="p-2 bg-white rounded-lg">{getTransactionIcon(transaction.type)}</div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-slate-800">{transaction.agent}</h4>
                        <Badge className={`text-xs ${getStatusColor(transaction.status)}`}>{transaction.status}</Badge>
                      </div>
                      <p className="text-sm text-slate-500 mb-1">{transaction.customer}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span>{transaction.date}</span>
                        <span>Payout: {transaction.payoutDate}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className={`font-bold ${transaction.amount > 0 ? "text-emerald-600" : "text-red-600"}`}>
                        {transaction.amount > 0 ? "+" : ""}₦{Math.abs(transaction.netEarnings).toLocaleString()}
                      </p>
                      <p className="text-xs text-slate-500">
                        Commission: ₦{Math.abs(transaction.commission).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payout History */}
          <Card className="border border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg">Payout History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {payoutHistory.map((payout) => (
                  <div key={payout.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                    <div className="p-2 bg-emerald-50 rounded-lg">
                      <CreditCard className="h-5 w-5 text-emerald-600" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-slate-800">{payout.method}</h4>
                        <Badge className={`text-xs ${getStatusColor(payout.status)}`}>{payout.status}</Badge>
                      </div>
                      <p className="text-sm text-slate-500 mb-1">{payout.account}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span>{payout.date}</span>
                        <span>Ref: {payout.reference}</span>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="font-bold text-slate-800">₦{payout.amount.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Commission Breakdown */}
        <Card className="border border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">Commission Breakdown by Agent</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { agent: "CustomerCare Pro", sales: 234, commission: 234000, rate: "10%" },
                { agent: "SalesBot Nigeria", sales: 189, commission: 189000, rate: "10%" },
                { agent: "ContentCreator AI", sales: 156, commission: 156000, rate: "10%" },
                { agent: "DataAnalyzer Pro", sales: 98, commission: 98000, rate: "10%" },
              ].map((item, index) => (
                <div key={index} className="p-4 bg-gradient-to-br from-slate-50 to-slate-100 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-slate-800">{item.agent}</h4>
                    <Badge className="bg-emerald-100 text-emerald-700 text-xs">{item.rate}</Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Sales:</span>
                      <span className="font-medium">{item.sales}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Commission:</span>
                      <span className="font-medium">₦{item.commission.toLocaleString()}</span>
                    </div>
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
