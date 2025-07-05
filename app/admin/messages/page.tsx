"use client"
import AdminLayout from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminMessagesPage() {
  // Example: You can expand this with real messages from Supabase
  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Messages</h1>
        <Card>
          <CardHeader>
            <CardTitle>Platform Messages</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-slate-500">No messages yet.</div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
