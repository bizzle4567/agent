"use client"
import AdminLayout from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AdminSettingsPage() {
  return (
    <AdminLayout>
      <div className="max-w-2xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Admin Settings</h1>
        <Card>
          <CardHeader>
            <CardTitle>Platform Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <label className="block font-medium mb-1">Platform Name</label>
                <input className="w-full border rounded px-3 py-2" placeholder="Your platform name" />
              </div>
              <div>
                <label className="block font-medium mb-1">Support Email</label>
                <input className="w-full border rounded px-3 py-2" placeholder="support@example.com" />
              </div>
              <div>
                <label className="block font-medium mb-1">Platform Payment Type</label>
                <select className="w-full border rounded px-3 py-2">
                  <option value="card">Card</option>
                  <option value="bank">Bank Transfer</option>
                  <option value="crypto">Crypto</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Maintenance Mode</label>
                <select className="w-full border rounded px-3 py-2">
                  <option value="off">Off</option>
                  <option value="on">On</option>
                </select>
              </div>
              <div>
                <label className="block font-medium mb-1">Add New Admin</label>
                <input className="w-full border rounded px-3 py-2" placeholder="Admin email or user ID" />
                <button className="bg-green-600 text-white px-4 py-2 rounded mt-2">Add Admin</button>
              </div>
              <div>
                <label className="block font-medium mb-1">Remove Admin</label>
                <input className="w-full border rounded px-3 py-2" placeholder="Admin email or user ID" />
                <button className="bg-red-600 text-white px-4 py-2 rounded mt-2">Remove Admin</button>
              </div>
              <button className="bg-blue-600 text-white px-4 py-2 rounded mt-4">Save Settings</button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
