"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  User,
  Bell,
  Shield,
  CreditCard,
  Key,
  Eye,
  Camera,
  Save,
  Trash2,
  Download,
  AlertTriangle,
  Check,
  X,
  Plus,
} from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import { useState } from "react"

export default function SettingsPage() {
  const [profileData, setProfileData] = useState({
    firstName: "Jerry",
    lastName: "Alvez",
    email: "jerry.alvez@example.com",
    phone: "+234 801 234 5678",
    location: "Lagos, Nigeria",
    bio: "AI enthusiast and business owner leveraging automation to scale operations.",
    website: "https://jerryalvez.com",
    company: "Alvez Enterprises",
    timezone: "Africa/Lagos",
    language: "English",
  })

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    pushNotifications: true,
    smsNotifications: false,
    marketingEmails: true,
    agentUpdates: true,
    billingAlerts: true,
    securityAlerts: true,
    weeklyReports: true,
  })

  const [privacy, setPrivacy] = useState({
    profileVisibility: "public",
    showUsageStats: true,
    showAgentList: false,
    allowDataCollection: true,
    shareAnalytics: false,
  })

  const [security, setSecurity] = useState({
    twoFactorEnabled: true,
    loginAlerts: true,
    sessionTimeout: "30",
    apiAccess: true,
  })

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-slate-800">Account Settings</h1>
            <p className="text-slate-600">Manage your account preferences and security settings</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Download className="h-4 w-4" />
              Export Data
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-2">
              <Save className="h-4 w-4" />
              Save Changes
            </Button>
          </div>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-2">
              <Eye className="h-4 w-4" />
              Privacy
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Security
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Billing
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card className="border border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-600" />
                  Profile Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Profile Picture */}
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" />
                    <AvatarFallback className="text-xl">JA</AvatarFallback>
                  </Avatar>
                  <div className="space-y-2">
                    <h3 className="font-medium text-slate-800">Profile Picture</h3>
                    <p className="text-sm text-slate-600">Upload a new profile picture</p>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <Camera className="h-4 w-4 mr-2" />
                        Upload Photo
                      </Button>
                      <Button size="sm" variant="outline" className="bg-transparent text-red-600 hover:text-red-700">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Remove
                      </Button>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Basic Information */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      id="firstName"
                      value={profileData.firstName}
                      onChange={(e) => setProfileData({ ...profileData, firstName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      id="lastName"
                      value={profileData.lastName}
                      onChange={(e) => setProfileData({ ...profileData, lastName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="flex gap-2">
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                      />
                      <Badge className="bg-emerald-100 text-emerald-700 self-center">Verified</Badge>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={profileData.location}
                      onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="company">Company</Label>
                    <Input
                      id="company"
                      value={profileData.company}
                      onChange={(e) => setProfileData({ ...profileData, company: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about yourself..."
                    value={profileData.bio}
                    onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                    rows={3}
                  />
                  <p className="text-xs text-slate-500">Brief description for your profile. Maximum 160 characters.</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={profileData.website}
                    onChange={(e) => setProfileData({ ...profileData, website: e.target.value })}
                  />
                </div>

                {/* Preferences */}
                <Separator />
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select
                      value={profileData.timezone}
                      onValueChange={(value) => setProfileData({ ...profileData, timezone: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Africa/Lagos">Africa/Lagos (WAT)</SelectItem>
                        <SelectItem value="UTC">UTC</SelectItem>
                        <SelectItem value="America/New_York">America/New_York (EST)</SelectItem>
                        <SelectItem value="Europe/London">Europe/London (GMT)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="language">Language</Label>
                    <Select
                      value={profileData.language}
                      onValueChange={(value) => setProfileData({ ...profileData, language: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="English">English</SelectItem>
                        <SelectItem value="Yoruba">Yoruba</SelectItem>
                        <SelectItem value="Hausa">Hausa</SelectItem>
                        <SelectItem value="Igbo">Igbo</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card className="border border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5 text-blue-600" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-slate-800">Email Notifications</h4>
                      <p className="text-sm text-slate-600">Receive notifications via email</p>
                    </div>
                    <Switch
                      checked={notifications.emailNotifications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, emailNotifications: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-slate-800">Push Notifications</h4>
                      <p className="text-sm text-slate-600">Receive push notifications in your browser</p>
                    </div>
                    <Switch
                      checked={notifications.pushNotifications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, pushNotifications: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-slate-800">SMS Notifications</h4>
                      <p className="text-sm text-slate-600">Receive important alerts via SMS</p>
                    </div>
                    <Switch
                      checked={notifications.smsNotifications}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, smsNotifications: checked })}
                    />
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-slate-800">Marketing Emails</h4>
                      <p className="text-sm text-slate-600">Receive updates about new features and promotions</p>
                    </div>
                    <Switch
                      checked={notifications.marketingEmails}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, marketingEmails: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-slate-800">Agent Updates</h4>
                      <p className="text-sm text-slate-600">Get notified when your agents have updates</p>
                    </div>
                    <Switch
                      checked={notifications.agentUpdates}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, agentUpdates: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-slate-800">Billing Alerts</h4>
                      <p className="text-sm text-slate-600">Receive notifications about billing and payments</p>
                    </div>
                    <Switch
                      checked={notifications.billingAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, billingAlerts: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-slate-800">Security Alerts</h4>
                      <p className="text-sm text-slate-600">Important security notifications (recommended)</p>
                    </div>
                    <Switch
                      checked={notifications.securityAlerts}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, securityAlerts: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-slate-800">Weekly Reports</h4>
                      <p className="text-sm text-slate-600">Receive weekly usage and performance reports</p>
                    </div>
                    <Switch
                      checked={notifications.weeklyReports}
                      onCheckedChange={(checked) => setNotifications({ ...notifications, weeklyReports: checked })}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Privacy Tab */}
          <TabsContent value="privacy" className="space-y-6">
            <Card className="border border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5 text-blue-600" />
                  Privacy Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="profileVisibility">Profile Visibility</Label>
                    <Select
                      value={privacy.profileVisibility}
                      onValueChange={(value) => setPrivacy({ ...privacy, profileVisibility: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="public">Public - Anyone can see your profile</SelectItem>
                        <SelectItem value="private">Private - Only you can see your profile</SelectItem>
                        <SelectItem value="friends">Friends - Only connections can see your profile</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-slate-800">Show Usage Statistics</h4>
                      <p className="text-sm text-slate-600">Allow others to see your agent usage statistics</p>
                    </div>
                    <Switch
                      checked={privacy.showUsageStats}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, showUsageStats: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-slate-800">Show Agent List</h4>
                      <p className="text-sm text-slate-600">Display the agents you use on your profile</p>
                    </div>
                    <Switch
                      checked={privacy.showAgentList}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, showAgentList: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-slate-800">Allow Data Collection</h4>
                      <p className="text-sm text-slate-600">Help improve our services by sharing usage data</p>
                    </div>
                    <Switch
                      checked={privacy.allowDataCollection}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, allowDataCollection: checked })}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-slate-800">Share Analytics</h4>
                      <p className="text-sm text-slate-600">Share anonymized analytics with third parties</p>
                    </div>
                    <Switch
                      checked={privacy.shareAnalytics}
                      onCheckedChange={(checked) => setPrivacy({ ...privacy, shareAnalytics: checked })}
                    />
                  </div>
                </div>

                <Separator />

                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex items-start gap-3">
                    <AlertTriangle className="h-5 w-5 text-amber-600 mt-0.5" />
                    <div>
                      <h4 className="font-medium text-amber-800">Data Export & Deletion</h4>
                      <p className="text-sm text-amber-700 mt-1">
                        You can request a copy of your data or delete your account at any time. These actions are
                        irreversible.
                      </p>
                      <div className="flex gap-2 mt-3">
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-transparent border-amber-300 text-amber-700 hover:bg-amber-100"
                        >
                          <Download className="h-4 w-4 mr-2" />
                          Export Data
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="bg-transparent border-red-300 text-red-700 hover:bg-red-100"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete Account
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card className="border border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5 text-blue-600" />
                  Security Settings
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Password Section */}
                <div className="space-y-4">
                  <h3 className="font-medium text-slate-800">Password</h3>
                  <div className="space-y-3">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input id="currentPassword" type="password" placeholder="Enter current password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newPassword">New Password</Label>
                      <Input id="newPassword" type="password" placeholder="Enter new password" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirmPassword">Confirm New Password</Label>
                      <Input id="confirmPassword" type="password" placeholder="Confirm new password" />
                    </div>
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                      Update Password
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Two-Factor Authentication */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <h4 className="font-medium text-slate-800">Two-Factor Authentication</h4>
                      <p className="text-sm text-slate-600">Add an extra layer of security to your account</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className="bg-emerald-100 text-emerald-700">Enabled</Badge>
                      <Switch
                        checked={security.twoFactorEnabled}
                        onCheckedChange={(checked) => setSecurity({ ...security, twoFactorEnabled: checked })}
                      />
                    </div>
                  </div>
                  {security.twoFactorEnabled && (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Check className="h-4 w-4 text-emerald-600" />
                        <span className="text-sm font-medium text-emerald-800">2FA is active</span>
                      </div>
                      <p className="text-sm text-emerald-700 mb-3">
                        Your account is protected with two-factor authentication using your mobile device.
                      </p>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent border-emerald-300 text-emerald-700"
                      >
                        Manage 2FA Settings
                      </Button>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Login Alerts */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium text-slate-800">Login Alerts</h4>
                    <p className="text-sm text-slate-600">Get notified of new login attempts</p>
                  </div>
                  <Switch
                    checked={security.loginAlerts}
                    onCheckedChange={(checked) => setSecurity({ ...security, loginAlerts: checked })}
                  />
                </div>

                {/* Session Timeout */}
                <div className="space-y-2">
                  <Label htmlFor="sessionTimeout">Session Timeout (minutes)</Label>
                  <Select
                    value={security.sessionTimeout}
                    onValueChange={(value) => setSecurity({ ...security, sessionTimeout: value })}
                  >
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="15">15 minutes</SelectItem>
                      <SelectItem value="30">30 minutes</SelectItem>
                      <SelectItem value="60">1 hour</SelectItem>
                      <SelectItem value="120">2 hours</SelectItem>
                      <SelectItem value="never">Never</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* API Access */}
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium text-slate-800">API Access</h4>
                    <p className="text-sm text-slate-600">Allow third-party applications to access your account</p>
                  </div>
                  <Switch
                    checked={security.apiAccess}
                    onCheckedChange={(checked) => setSecurity({ ...security, apiAccess: checked })}
                  />
                </div>

                {security.apiAccess && (
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-2">
                      <Key className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-800">API Keys</span>
                    </div>
                    <p className="text-sm text-blue-700 mb-3">
                      Manage your API keys for integrating with external applications.
                    </p>
                    <Button size="sm" variant="outline" className="bg-transparent border-blue-300 text-blue-700">
                      Manage API Keys
                    </Button>
                  </div>
                )}

                <Separator />

                {/* Active Sessions */}
                <div className="space-y-4">
                  <h3 className="font-medium text-slate-800">Active Sessions</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-800">Current Session</p>
                        <p className="text-sm text-slate-600">Chrome on Windows • Lagos, Nigeria</p>
                        <p className="text-xs text-slate-500">Last active: Now</p>
                      </div>
                      <Badge className="bg-emerald-100 text-emerald-700">Current</Badge>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium text-slate-800">Mobile Session</p>
                        <p className="text-sm text-slate-600">Safari on iPhone • Lagos, Nigeria</p>
                        <p className="text-xs text-slate-500">Last active: 2 hours ago</p>
                      </div>
                      <Button size="sm" variant="outline" className="bg-transparent text-red-600 hover:text-red-700">
                        <X className="h-4 w-4 mr-1" />
                        End
                      </Button>
                    </div>
                  </div>
                  <Button size="sm" variant="outline" className="bg-transparent text-red-600 hover:text-red-700">
                    End All Other Sessions
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card className="border border-slate-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5 text-blue-600" />
                  Billing & Payments
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Current Plan */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <h3 className="font-medium text-blue-800">Premium Plan</h3>
                      <p className="text-sm text-blue-700">₦25,000/month • Billed monthly</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-700">Active</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="bg-transparent border-blue-300 text-blue-700">
                      Change Plan
                    </Button>
                    <Button size="sm" variant="outline" className="bg-transparent border-blue-300 text-blue-700">
                      Cancel Subscription
                    </Button>
                  </div>
                </div>

                {/* Payment Methods */}
                <div className="space-y-4">
                  <h3 className="font-medium text-slate-800">Payment Methods</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-4 border border-slate-200 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                          <span className="text-xs text-white font-bold">VISA</span>
                        </div>
                        <div>
                          <p className="font-medium text-slate-800">•••• •••• •••• 4532</p>
                          <p className="text-sm text-slate-600">Expires 12/26</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge className="bg-emerald-100 text-emerald-700">Default</Badge>
                        <Button size="sm" variant="outline" className="bg-transparent">
                          Edit
                        </Button>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Plus className="h-4 w-4 mr-2" />
                      Add Payment Method
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Billing History */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-slate-800">Billing History</h3>
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Download className="h-4 w-4 mr-2" />
                      Download All
                    </Button>
                  </div>
                  <div className="space-y-3">
                    {[
                      { date: "Dec 1, 2024", amount: "₦25,000", status: "Paid", invoice: "INV-001" },
                      { date: "Nov 1, 2024", amount: "₦25,000", status: "Paid", invoice: "INV-002" },
                      { date: "Oct 1, 2024", amount: "₦25,000", status: "Paid", invoice: "INV-003" },
                    ].map((bill, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                        <div>
                          <p className="font-medium text-slate-800">{bill.invoice}</p>
                          <p className="text-sm text-slate-600">{bill.date}</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-medium text-slate-800">{bill.amount}</span>
                          <Badge className="bg-emerald-100 text-emerald-700">{bill.status}</Badge>
                          <Button size="sm" variant="outline" className="bg-transparent">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <Separator />

                {/* Billing Preferences */}
                <div className="space-y-4">
                  <h3 className="font-medium text-slate-800">Billing Preferences</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium text-slate-800">Auto-renewal</h4>
                        <p className="text-sm text-slate-600">Automatically renew your subscription</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <h4 className="font-medium text-slate-800">Email Receipts</h4>
                        <p className="text-sm text-slate-600">Send receipts to your email</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  )
}
