"use client"
import AdminLayout from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useRouter, useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

export default function AdminCustomerDetailPage() {
  const router = useRouter()
  const { id } = useParams() as { id: string }
  const [user, setUser] = useState<any>(null)
  const [agents, setAgents] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [blocking, setBlocking] = useState(false)
  const [removing, setRemoving] = useState(false)
  const [error, setError] = useState("")

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      const { data: userData } = await supabase.from("users").select("*").eq("id", id).single()
      setUser(userData)
      const { data: agentData } = await supabase.from("agents").select("*").eq("owner_id", id)
      setAgents(agentData || [])
      const { data: orderData } = await supabase.from("orders").select("*").eq("user_id", id)
      setOrders(orderData || [])
      setLoading(false)
    }
    if (id) fetchData()
  }, [id])

  async function handleBlock(blocked: boolean) {
    setBlocking(true)
    setError("")
    const { error } = await supabase.from("users").update({ blocked }).eq("id", id)
    if (error) setError(error.message)
    else setUser((u: any) => ({ ...u, blocked }))
    setBlocking(false)
  }

  async function handleRemove() {
    setRemoving(true)
    setError("")
    const { error } = await supabase.from("users").delete().eq("id", id)
    if (error) setError(error.message)
    else router.push("/admin/customers")
    setRemoving(false)
  }

  if (loading) return <div className="p-8">Loading user details...</div>
  if (!user) return <div className="p-8 text-red-500">User not found.</div>

  const totalSpent = orders.reduce((sum, o) => sum + Number(o.amount || 0), 0)

  return (
    <AdminLayout>
      <div className="max-w-4xl mx-auto py-8 space-y-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
          <div>
            <h1 className="text-2xl font-bold mb-1 flex items-center gap-2">
              {user.name || '-'} <span className="text-slate-400 font-normal">({user.email})</span>
              {user.blocked ? <Badge className="bg-red-100 text-red-700">Blocked</Badge> : null}
            </h1>
            <div className="text-slate-500 text-sm">User ID: <span className="font-mono">{user.id}</span></div>
            <div className="text-slate-500 text-sm">Joined: {user.created_at ? new Date(user.created_at).toLocaleDateString() : '-'}</div>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => handleBlock(!user.blocked)} disabled={blocking}>
              {user.blocked ? 'Unblock' : 'Block'}
            </Button>
            <Button variant="destructive" onClick={handleRemove} disabled={removing}>
              Remove
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Agents Created</CardTitle>
            </CardHeader>
            <CardContent>
              {agents.length === 0 ? (
                <div className="text-slate-400">No agents created by this user.</div>
              ) : (
                <ul className="space-y-2">
                  {agents.map((a: any) => (
                    <li key={a.id} className="border-b py-1">
                      <span className="font-medium">{a.name}</span> <span className="text-xs text-slate-500">({a.id})</span>
                    </li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Payments/Orders</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-2 text-slate-500 text-sm">Total Spent: <span className="font-bold">₦{totalSpent.toLocaleString()}</span></div>
              {orders.length === 0 ? (
                <div className="text-slate-400">No payments/orders found.</div>
              ) : (
                <table className="min-w-full text-xs border">
                  <thead>
                    <tr className="border-b bg-slate-50">
                      <th className="text-left py-1 px-2">Order ID</th>
                      <th className="text-left py-1 px-2">Amount</th>
                      <th className="text-left py-1 px-2">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((o: any) => (
                      <tr key={o.id} className="border-b">
                        <td className="py-1 px-2 font-mono">{o.id}</td>
                        <td className="py-1 px-2">₦{Number(o.amount).toLocaleString()}</td>
                        <td className="py-1 px-2">{o.created_at ? new Date(o.created_at).toLocaleDateString() : '-'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </AdminLayout>
  )
}
