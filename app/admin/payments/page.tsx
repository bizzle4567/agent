"use client"
import AdminLayout from "@/components/admin-layout"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default function AdminPaymentsPage() {
  const [payments, setPayments] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    async function fetchPayments() {
      setLoading(true)
      const { data } = await supabase.from("orders").select("*")
      setPayments(data || [])
      setLoading(false)
    }
    fetchPayments()
  }, [])

  const filtered = payments.filter((p) =>
    p.user_id?.toLowerCase().includes(search.toLowerCase()) ||
    p.id?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">Payments <Badge className="bg-green-100 text-green-700">{payments.length}</Badge></h1>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>All Payments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <input
                className="border rounded px-3 py-2 w-full md:w-80"
                placeholder="Search by user or order ID..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <Button variant="outline" className="w-fit">Export CSV</Button>
            </div>
            {loading ? (
              <div>Loading payments...</div>
            ) : filtered.length === 0 ? (
              <div>No payments found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border">
                  <thead>
                    <tr className="border-b bg-slate-50">
                      <th className="text-left py-2 px-3">Order ID</th>
                      <th className="text-left py-2 px-3">User</th>
                      <th className="text-left py-2 px-3">Amount</th>
                      <th className="text-left py-2 px-3">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((p) => (
                      <tr key={p.id} className="border-b hover:bg-slate-50">
                        <td className="py-2 px-3 font-mono text-xs">{p.id}</td>
                        <td className="py-2 px-3">{p.user_id}</td>
                        <td className="py-2 px-3">₦{Number(p.amount).toLocaleString()}</td>
                        <td className="py-2 px-3">{p.created_at ? new Date(p.created_at).toLocaleString() : "-"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
