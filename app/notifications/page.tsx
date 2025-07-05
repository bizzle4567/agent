"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Bell, CheckCircle, AlertCircle, DollarSign, Star, MessageSquare, Settings, Trash2 } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const notifications = [
  {
    id: 1,
    type: "sale",
    title: "New Sale: CustomerCare Pro",
    message: "Your agent was purchased by Kemi Adebayo from Lagos Business Hub",
    amount: "₦25,000",
    time: "2 minutes ago",
    read: false,
    icon: <DollarSign className="h-5 w-5 text-green-600" />,
    color: "bg-green-50 border-green-200",
  },
  {
    id: 2,
    type: "review",
    title: "New 5-Star Review",
    message: "Amazing customer service agent! Helped us reduce response time by 80%",
    time: "1 hour ago",
    read: false,
    icon: <Star className="h-5 w-5 text-yellow-500" />,
    color: "bg-yellow-50 border-yellow-200",
  },
  {
    id: 3,
    type: "message",
    title: "New Message from Buyer",
    message: "Hi, I'm interested in your Sales Automation agent. Can we discuss customization?",
    time: "3 hours ago",
    read: false,
    icon: <MessageSquare className="h-5 w-5 text-blue-600" />,
    color: "bg-blue-50 border-blue-200",
  },
  {
    id: 4,
    type: "system",
    title: "Agent Approved",
    message: "Your agent 'DataAnalyzer Pro' has been approved and is now live on the marketplace",
    time: "1 day ago",
    read: true,
    icon: <CheckCircle className="h-5 w-5 text-green-600" />,
    color: "bg-gray-50 border-gray-200",
  },
  {
    id: 5,
    type: "sale",
    title: "Payment Processed",
    message: "Weekly payout of ₦150,000 has been sent to your bank account",
    time: "2 days ago",
    read: true,
    icon: <DollarSign className="h-5 w-5 text-green-600" />,
    color: "bg-gray-50 border-gray-200",
  },
  {
    id: 6,
    type: "system",
    title: "Profile Update Required",
    message: "Please update your tax information to continue receiving payments",
    time: "3 days ago",
    read: true,
    icon: <AlertCircle className="h-5 w-5 text-orange-500" />,
    color: "bg-gray-50 border-gray-200",
  },
]

export default function NotificationsPage() {
  const [notificationList, setNotificationList] = useState(notifications)
  const [activeTab, setActiveTab] = useState("all")

  const unreadCount = notificationList.filter((n) => !n.read).length

  const markAsRead = (id: number) => {
    setNotificationList((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotificationList((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const deleteNotification = (id: number) => {
    setNotificationList((prev) => prev.filter((notification) => notification.id !== id))
  }

  const filteredNotifications = notificationList.filter((notification) => {
    if (activeTab === "all") return true
    if (activeTab === "unread") return !notification.read
    return notification.type === activeTab
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />

      <div className="pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                <Bell className="h-8 w-8 text-blue-600" />
                Notifications
                {unreadCount > 0 && <Badge className="bg-red-500 text-white">{unreadCount} new</Badge>}
              </h1>
              <p className="text-slate-600 mt-2">Stay updated with your agent sales and marketplace activity</p>
            </div>

            {unreadCount > 0 && (
              <Button onClick={markAllAsRead} variant="outline" className="flex items-center gap-2 bg-transparent">
                <CheckCircle className="h-4 w-4" />
                Mark all as read
              </Button>
            )}
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
            <TabsList className="grid w-full grid-cols-5 bg-white border border-slate-200">
              <TabsTrigger value="all" className="flex items-center gap-2">
                All
                <Badge variant="secondary" className="text-xs">
                  {notificationList.length}
                </Badge>
              </TabsTrigger>
              <TabsTrigger value="unread" className="flex items-center gap-2">
                Unread
                {unreadCount > 0 && <Badge className="bg-red-500 text-white text-xs">{unreadCount}</Badge>}
              </TabsTrigger>
              <TabsTrigger value="sale">Sales</TabsTrigger>
              <TabsTrigger value="review">Reviews</TabsTrigger>
              <TabsTrigger value="system">System</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab} className="mt-6">
              <div className="space-y-4">
                {filteredNotifications.length === 0 ? (
                  <Card className="border border-slate-200">
                    <CardContent className="flex flex-col items-center justify-center py-12">
                      <Bell className="h-12 w-12 text-slate-400 mb-4" />
                      <h3 className="text-lg font-medium text-slate-600 mb-2">No notifications</h3>
                      <p className="text-slate-500 text-center">
                        {activeTab === "unread"
                          ? "All caught up! No unread notifications."
                          : "You don't have any notifications in this category yet."}
                      </p>
                    </CardContent>
                  </Card>
                ) : (
                  filteredNotifications.map((notification) => (
                    <Card
                      key={notification.id}
                      className={`border transition-all hover:shadow-md ${
                        notification.read ? "bg-white border-slate-200" : notification.color
                      }`}
                    >
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0">{notification.icon}</div>

                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-4">
                              <div className="flex-1">
                                <h3 className="font-semibold text-slate-800 mb-1">
                                  {notification.title}
                                  {!notification.read && (
                                    <Badge className="ml-2 bg-blue-100 text-blue-800 text-xs">New</Badge>
                                  )}
                                </h3>
                                <p className="text-slate-600 text-sm leading-relaxed">{notification.message}</p>
                                {notification.amount && (
                                  <div className="mt-2">
                                    <Badge className="bg-green-100 text-green-800 font-semibold">
                                      {notification.amount}
                                    </Badge>
                                  </div>
                                )}
                              </div>

                              <div className="flex items-center gap-2">
                                <span className="text-xs text-slate-500 whitespace-nowrap">{notification.time}</span>
                                <div className="flex gap-1">
                                  {!notification.read && (
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => markAsRead(notification.id)}
                                      className="h-8 w-8 p-0"
                                    >
                                      <CheckCircle className="h-4 w-4" />
                                    </Button>
                                  )}
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => deleteNotification(notification.id)}
                                    className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>

          {/* Notification Settings */}
          <Card className="border border-slate-200 mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Notification Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-slate-800">Email Notifications</h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-slate-700">New sales and purchases</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-slate-700">Reviews and ratings</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-slate-700">Messages from buyers</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-slate-700">Marketing updates</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-medium text-slate-800">Push Notifications</h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-slate-700">Instant sale notifications</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm text-slate-700">New messages</span>
                    </label>
                    <label className="flex items-center gap-3">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm text-slate-700">Weekly summaries</span>
                    </label>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-slate-200">
                <Button className="bg-blue-600 hover:bg-blue-700">Save Settings</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
