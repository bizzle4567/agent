"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  FileText,
  Download,
  Calendar,
  DollarSign,
  Users,
  Package,
  Star,
  BarChart3,
  PieChart,
  Activity,
  Target,
  Clock,
  CheckCircle,
} from "lucide-react"
import SellerLayout from "@/components/seller-layout"

const reportTypes = [
  {
    id: "sales",
    title: "Sales Report",
    description: "Detailed breakdown of sales performance, revenue, and trends",
    icon: DollarSign,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
    lastGenerated: "2024-01-22",
    frequency: "Daily",
  },
  {
    id: "agents",
    title: "Agent Performance",
    description: "Individual agent metrics, ratings, and customer feedback",
    icon: Package,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    lastGenerated: "2024-01-21",
    frequency: "Weekly",
  },
  {
    id: "customers",
    title: "Customer Analytics",
    description: "Customer behavior, demographics, and purchase patterns",
    icon: Users,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    lastGenerated: "2024-01-20",
    frequency: "Monthly",
  },
  {
    id: "reviews",
    title: "Reviews & Ratings",
    description: "Customer satisfaction metrics and review analysis",
    icon: Star,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    lastGenerated: "2024-01-19",
    frequency: "Weekly",
  },
  {
    id: "financial",
    title: "Financial Summary",
    description: "Earnings, commissions, payouts, and tax information",
    icon: BarChart3,
    color: "text-indigo-600",
    bgColor: "bg-indigo-50",
    lastGenerated: "2024-01-18",
    frequency: "Monthly",
  },
  {
    id: "marketing",
    title: "Marketing Insights",
    description: "Traffic sources, conversion rates, and marketing ROI",
    icon: Target,
    color: "text-pink-600",
    bgColor: "bg-pink-50",
    lastGenerated: "2024-01-17",
    frequency: "Weekly",
  },
]

const quickStats = [
  {
    title: "Reports Generated",
    value: "47",
    change: "+12",
    period: "this month",
    icon: FileText,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "Data Points",
    value: "2.4M",
    change: "+18.2%",
    period: "vs last month",
    icon: Activity,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Avg. Generation Time",
    value: "2.3s",
    change: "-0.5s",
    period: "improvement",
    icon: Clock,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
  {
    title: "Success Rate",
    value: "99.8%",
    change: "+0.2%",
    period: "uptime",
    icon: CheckCircle,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
]

const recentReports = [
  {
    id: "RPT-24001",
    title: "Monthly Sales Summary - January 2024",
    type: "Sales Report",
    generatedDate: "2024-01-22 09:30 AM",
    size: "2.4 MB",
    format: "PDF",
    status: "completed",
    downloadCount: 3,
  },
  {
    id: "RPT-24002",
    title: "Agent Performance Analysis - Week 3",
    type: "Agent Performance",
    generatedDate: "2024-01-21 02:15 PM",
    size: "1.8 MB",
    format: "Excel",
    status: "completed",
    downloadCount: 1,
  },
  {
    id: "RPT-24003",
    title: "Customer Demographics Report - Q4 2023",
    type: "Customer Analytics",
    generatedDate: "2024-01-20 11:45 AM",
    size: "3.2 MB",
    format: "PDF",
    status: "completed",
    downloadCount: 5,
  },
  {
    id: "RPT-24004",
    title: "Reviews Analysis - January 2024",
    type: "Reviews & Ratings",
    generatedDate: "2024-01-19 04:20 PM",
    size: "1.5 MB",
    format: "PDF",
    status: "processing",
    downloadCount: 0,
  },
  {
    id: "RPT-24005",
    title: "Financial Summary - 2023 Annual",
    type: "Financial Summary",
    generatedDate: "2024-01-18 10:00 AM",
    size: "4.1 MB",
    format: "Excel",
    status: "completed",
    downloadCount: 8,
  },
]

const scheduledReports = [
  {
    id: "SCH-001",
    title: "Daily Sales Summary",
    type: "Sales Report",
    frequency: "Daily",
    nextRun: "2024-01-23 06:00 AM",
    recipients: ["jerry@9jaagents.com"],
    format: "PDF",
    active: true,
  },
  {
    id: "SCH-002",
    title: "Weekly Agent Performance",
    type: "Agent Performance",
    frequency: "Weekly",
    nextRun: "2024-01-28 08:00 AM",
    recipients: ["jerry@9jaagents.com", "team@9jaagents.com"],
    format: "Excel",
    active: true,
  },
  {
    id: "SCH-003",
    title: "Monthly Financial Report",
    type: "Financial Summary",
    frequency: "Monthly",
    nextRun: "2024-02-01 09:00 AM",
    recipients: ["jerry@9jaagents.com"],
    format: "PDF",
    active: false,
  },
]

export default function ReportsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d")
  const [selectedFormat, setSelectedFormat] = useState("pdf")

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "completed":
        return "bg-emerald-100 text-emerald-700"
      case "processing":
        return "bg-yellow-100 text-yellow-700"
      case "failed":
        return "bg-red-100 text-red-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const handleGenerateReport = (reportType: string) => {
    console.log(`Generating ${reportType} report...`)
    // Here you would typically trigger report generation
  }

  return (
    <SellerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Reports & Analytics</h1>
            <p className="text-slate-600">Generate detailed reports and insights for your business.</p>
          </div>
          <div className="flex gap-3">
            <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
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
            <Select value={selectedFormat} onValueChange={setSelectedFormat}>
              <SelectTrigger className="w-32">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">PDF</SelectItem>
                <SelectItem value="excel">Excel</SelectItem>
                <SelectItem value="csv">CSV</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickStats.map((stat, index) => (
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
                  <p className="text-xs text-slate-500 mt-1">{stat.period}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Report Types */}
        <Card className="border border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">Available Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reportTypes.map((report) => (
                <div
                  key={report.id}
                  className="p-6 border border-slate-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg ${report.bgColor}`}>
                      <report.icon className={`h-6 w-6 ${report.color}`} />
                    </div>
                    <div>
                      <h3 className="font-medium text-slate-800">{report.title}</h3>
                      <Badge variant="outline" className="text-xs mt-1">
                        {report.frequency}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mb-4">{report.description}</p>

                  <div className="flex items-center justify-between text-xs text-slate-500 mb-4">
                    <span>Last generated: {report.lastGenerated}</span>
                  </div>

                  <Button
                    onClick={() => handleGenerateReport(report.id)}
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    size="sm"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Generate Report
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Reports */}
          <Card className="border border-slate-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Recent Reports</CardTitle>
                <Button variant="ghost" size="sm" className="text-emerald-600">
                  View All
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report) => (
                  <div key={report.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                    <div className="p-2 bg-white rounded-lg">
                      <FileText className="h-5 w-5 text-slate-600" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-slate-800 text-sm">{report.title}</h4>
                        <Badge className={`text-xs ${getStatusColor(report.status)}`}>{report.status}</Badge>
                      </div>
                      <p className="text-xs text-slate-500 mb-1">{report.type}</p>
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span>{report.generatedDate}</span>
                        <span>{report.size}</span>
                        <span>{report.format}</span>
                        <span>{report.downloadCount} downloads</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {report.status === "completed" && (
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Scheduled Reports */}
          <Card className="border border-slate-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Scheduled Reports</CardTitle>
                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-700">
                  + New Schedule
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledReports.map((schedule) => (
                  <div key={schedule.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                    <div className="p-2 bg-white rounded-lg">
                      <Clock className="h-5 w-5 text-slate-600" />
                    </div>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-medium text-slate-800 text-sm">{schedule.title}</h4>
                        <Badge
                          className={`text-xs ${
                            schedule.active ? "bg-emerald-100 text-emerald-700" : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {schedule.active ? "Active" : "Paused"}
                        </Badge>
                      </div>
                      <p className="text-xs text-slate-500 mb-1">
                        {schedule.type} • {schedule.frequency}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-slate-400">
                        <span>Next: {schedule.nextRun}</span>
                        <span>{schedule.recipients.length} recipients</span>
                        <span>{schedule.format}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Report Templates */}
        <Card className="border border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">Custom Report Builder</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="p-6 border-2 border-dashed border-slate-200 rounded-lg text-center hover:border-emerald-300 transition-colors cursor-pointer">
                <PieChart className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="font-medium text-slate-800 mb-2">Sales Analytics</h3>
                <p className="text-sm text-slate-600 mb-4">
                  Create custom sales performance reports with specific metrics
                </p>
                <Button variant="outline" size="sm">
                  Create Template
                </Button>
              </div>

              <div className="p-6 border-2 border-dashed border-slate-200 rounded-lg text-center hover:border-emerald-300 transition-colors cursor-pointer">
                <BarChart3 className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="font-medium text-slate-800 mb-2">Agent Comparison</h3>
                <p className="text-sm text-slate-600 mb-4">Compare performance across different AI agents</p>
                <Button variant="outline" size="sm">
                  Create Template
                </Button>
              </div>

              <div className="p-6 border-2 border-dashed border-slate-200 rounded-lg text-center hover:border-emerald-300 transition-colors cursor-pointer">
                <Target className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="font-medium text-slate-800 mb-2">Goal Tracking</h3>
                <p className="text-sm text-slate-600 mb-4">Track progress towards your business goals and targets</p>
                <Button variant="outline" size="sm">
                  Create Template
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SellerLayout>
  )
}
