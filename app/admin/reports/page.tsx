"use client"
import AdminLayout from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminReportsPage() {
  // Example: You can expand this with real reports from Supabase
  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Reports</h1>
        <Card>
          <CardHeader>
            <CardTitle>Platform Reports</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-500">No reports available.</div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
