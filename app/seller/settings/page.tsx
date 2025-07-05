"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { User, CreditCard, Bell, Shield, Globe, Camera, Save, Eye, EyeOff, Trash2, AlertTriangle } from "lucide-react"
import SellerLayout from "@/components/seller-layout"

export default function SellerSettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    newOrders: true,
    orderUpdates: true,
    newReviews: true,
    paymentReceived: true,
    marketingEmails: false,
    weeklyReports: true,
  })

  const [profile, setProfile] = useState({
    fullName: "Jerry Alvez",
    email: "jerry@example.com",
    phone: "+234 801 234 5678",
    businessName: "TechSolutions NG",
    description:
      "Leading AI solutions provider in Nigeria, specializing in customer service automation and business intelligence tools.",
    location: "Lagos, Nigeria",
    website: "https://techsolutions.ng",
    avatar: "/placeholder.svg?height=100&width=100",
  })

  const handleNotificationChange = (key: string, value: boolean) => {
    setNotifications((prev) => ({ ...prev, [key]: value }))
  }

  const handleProfileChange = (key: string, value: string) => {
    setProfile((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <SellerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Settings</h1>
            <p className="text-slate-600">Manage your seller account and preferences</p>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-white border border-slate-200 rounded-xl p-1">
            <TabsTrigger value="profile" className="rounded-lg">
              <User className="h-4 w-4 mr-2" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="billing" className="rounded-lg">
              <CreditCard className="h-4 w-4 mr-2" />
              Billing
            </TabsTrigger>
            <TabsTrigger value="notifications" className="rounded-lg">
              <Bell className="h-4 w-4 mr-2" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="security" className="rounded-lg">
              <Shield className="h-4 w-4 mr-2" />
              Security
            </TabsTrigger>
            <TabsTrigger value="preferences" className="rounded-lg">
              <Globe className="h-4 w-4 mr-2" />
              Preferences
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="border border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">Profile Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar Section */}
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={profile.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="text-lg">
                      {profile.fullName
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <Button variant="outline" className="bg-transparent">
                      <Camera className="h-4 w-4 mr-2" />
                      Change Photo
                    </Button>
                    <p className="text-sm text-slate-500 mt-2">JPG, GIF or PNG. Max size of 2MB.</p>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      value={profile.fullName}
                      onChange={(e) => handleProfileChange("fullName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={profile.email}
                      onChange={(e) => handleProfileChange("email", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profile.phone}
                      onChange={(e) => handleProfileChange("phone", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profile.location}
                      onChange={(e) => handleProfileChange("location", e.target.value)}
                    />
                  </div>
                </div>

                {/* Business Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-slate-800">Business Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="businessName">Business Name</Label>
                      <Input
                        id="businessName"
                        value={profile.businessName}
                        onChange={(e) => handleProfileChange("businessName", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        value={profile.website}
                        onChange={(e) => handleProfileChange("website", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="description">Business Description</Label>
                    <Textarea
                      id="description"
                      rows={4}
                      value={profile.description}
                      onChange={(e) => handleProfileChange("description", e.target.value)}
                      placeholder="Tell customers about your business..."
                    />
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button className="bg-emerald-600 hover:bg-emerald-700">
                    <Save className="h-4 w-4 mr-2" />
                    Save Changes
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg">Payment Methods</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 border border-slate-200 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                          <CreditCard className="h-4 w-4 text-blue-600" />
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">GTBank Account</p>
                          <p className="text-sm text-slate-500">****1234</p>
                        </div>
                      </div>
                      <Button variant="ghost" size="sm">
                        Edit
                      </Button>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full bg-transparent">
                    Add Payment Method
                  </Button>
                </CardContent>
              </Card>

              <Card className="border border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg">Payout Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="payoutFrequency">Payout Frequency</Label>
                    <Select defaultValue="weekly">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="daily">Daily</SelectItem>
                        <SelectItem value="weekly">Weekly</SelectItem>
                        <SelectItem value="monthly">Monthly</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="minimumPayout">Minimum Payout Amount</Label>
                    <Input id="minimumPayout" defaultValue="₦10,000" />
                  </div>
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Update Payout Settings</Button>
                </CardContent>
              </Card>
            </div>

            <Card className="border border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">Transaction History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { date: "Mar 15, 2024", description: "Weekly payout", amount: "+₦245,000", status: "Completed" },
                    { date: "Mar 8, 2024", description: "Weekly payout", amount: "+₦189,500", status: "Completed" },
                    { date: "Mar 1, 2024", description: "Weekly payout", amount: "+₦312,750", status: "Completed" },
                    { date: "Feb 23, 2024", description: "Platform fee", amount: "-₦15,600", status: "Completed" },
                  ].map((transaction, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-800">{transaction.description}</p>
                        <p className="text-sm text-slate-500">{transaction.date}</p>
                      </div>
                      <div className="text-right">
                        <p
                          className={`font-bold ${
                            transaction.amount.startsWith("+") ? "text-emerald-600" : "text-red-600"
                          }`}
                        >
                          {transaction.amount}
                        </p>
                        <p className="text-sm text-slate-500">{transaction.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="border border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">Email Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {Object.entries({
                  newOrders: "New order notifications",
                  orderUpdates: "Order status updates",
                  newReviews: "New review notifications",
                  paymentReceived: "Payment received notifications",
                  marketingEmails: "Marketing and promotional emails",
                  weeklyReports: "Weekly performance reports",
                }).map(([key, label]) => (
                  <div key={key} className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-slate-800">{label}</p>
                      <p className="text-sm text-slate-500">
                        {key === "newOrders" && "Get notified when you receive new orders"}
                        {key === "orderUpdates" && "Updates about order processing and delivery"}
                        {key === "newReviews" && "When customers leave reviews on your agents"}
                        {key === "paymentReceived" && "Confirmation when payments are processed"}
                        {key === "marketingEmails" && "Tips, updates, and promotional content"}
                        {key === "weeklyReports" && "Summary of your weekly performance"}
                      </p>
                    </div>
                    <Switch
                      checked={notifications[key as keyof typeof notifications]}
                      onCheckedChange={(checked) => handleNotificationChange(key, checked)}
                    />
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card className="border border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">Push Notifications</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800">Browser notifications</p>
                    <p className="text-sm text-slate-500">Receive notifications in your browser</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800">Mobile notifications</p>
                    <p className="text-sm text-slate-500">Receive notifications on your mobile device</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="border border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">Change Password</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="currentPassword">Current Password</Label>
                  <div className="relative">
                    <Input id="currentPassword" type={showPassword ? "text" : "password"} className="pr-10" />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label html For="newPassword">
                    New Password
                  </Label>
                  <Input id="newPassword" type="password" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirm New Password</Label>
                  <Input id="confirmPassword" type="password" />
                </div>
                <Button className="bg-emerald-600 hover:bg-emerald-700">Update Password</Button>
              </CardContent>
            </Card>

            <Card className="border border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">Two-Factor Authentication</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800">SMS Authentication</p>
                    <p className="text-sm text-slate-500">Receive verification codes via SMS</p>
                  </div>
                  <Switch />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800">Authenticator App</p>
                    <p className="text-sm text-slate-500">Use an authenticator app for verification</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">Login Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { device: "Chrome on Windows", location: "Lagos, Nigeria", time: "2 hours ago", current: true },
                    { device: "Safari on iPhone", location: "Lagos, Nigeria", time: "1 day ago", current: false },
                    { device: "Chrome on Android", location: "Abuja, Nigeria", time: "3 days ago", current: false },
                  ].map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-800">{session.device}</p>
                        <p className="text-sm text-slate-500">
                          {session.location} • {session.time}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        {session.current && (
                          <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-1 rounded">Current</span>
                        )}
                        {!session.current && (
                          <Button variant="ghost" size="sm" className="text-red-600">
                            Revoke
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences" className="space-y-6">
            <Card className="border border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">General Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select defaultValue="en">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="en">English</SelectItem>
                        <SelectItem value="yo">Yoruba</SelectItem>
                        <SelectItem value="ig">Igbo</SelectItem>
                        <SelectItem value="ha">Hausa</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select defaultValue="africa/lagos">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="africa/lagos">Africa/Lagos (WAT)</SelectItem>
                        <SelectItem value="utc">UTC</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select defaultValue="ngn">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ngn">Nigerian Naira (₦)</SelectItem>
                        <SelectItem value="usd">US Dollar ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="dateFormat">Date Format</Label>
                    <Select defaultValue="dd/mm/yyyy">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dd/mm/yyyy">DD/MM/YYYY</SelectItem>
                        <SelectItem value="mm/dd/yyyy">MM/DD/YYYY</SelectItem>
                        <SelectItem value="yyyy-mm-dd">YYYY-MM-DD</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-slate-200">
              <CardHeader>
                <CardTitle className="text-lg">Privacy Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800">Public profile</p>
                    <p className="text-sm text-slate-500">Make your seller profile visible to customers</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800">Show online status</p>
                    <p className="text-sm text-slate-500">Let customers see when you're online</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-slate-800">Analytics tracking</p>
                    <p className="text-sm text-slate-500">Help us improve by sharing usage data</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="border border-red-200 bg-red-50">
              <CardHeader>
                <CardTitle className="text-lg text-red-800 flex items-center gap-2">
                  <AlertTriangle className="h-5 w-5" />
                  Danger Zone
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-red-800">Delete Account</p>
                    <p className="text-sm text-red-600">
                      Permanently delete your seller account and all associated data
                    </p>
                  </div>
                  <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </SellerLayout>
  )
}
