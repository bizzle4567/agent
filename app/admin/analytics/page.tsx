"use client"
import AdminLayout from "@/components/admin-layout"
import AnalyticsDashboard from "@/components/analytics-dashboard"

export default function AdminAnalyticsPage() {
  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Platform Analytics</h1>
        <AnalyticsDashboard />
      </div>
    </AdminLayout>
  )
}
