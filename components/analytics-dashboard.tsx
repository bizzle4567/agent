"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart3, Bot, Users, DollarSign } from "lucide-react"

export default function AnalyticsDashboard() {
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalAgents: 0,
    totalRevenue: 0,
    totalOrders: 0,
    recentOrders: [],
    recentUsers: [],
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let usersSub: any, agentsSub: any, ordersSub: any
    async function fetchStats() {
      setLoading(true)
      // Users
      const { count: totalUsers } = await supabase.from("users").select("*", { count: "exact", head: true })
      // Agents
      const { count: totalAgents } = await supabase.from("agents").select("*", { count: "exact", head: true })
      // Orders
      const { data: orders } = await supabase.from("orders").select("*")
      const totalRevenue = orders && Array.isArray(orders)
        ? orders.reduce((sum, o) => sum + Number(o.amount || 0), 0)
        : 0
      // Recent orders (last 5)
      const recentOrders = orders ? orders.slice(-5).reverse() : []
      // Recent users (last 5)
      const { data: users } = await supabase.from("users").select("*").order("created_at", { ascending: false }).limit(5)
      setStats({
        totalUsers: totalUsers || 0,
        totalAgents: totalAgents || 0,
        totalRevenue,
        totalOrders: orders ? orders.length : 0,
        recentOrders,
        recentUsers: users || [],
      })
      setLoading(false)
    }
    fetchStats()
    // Real-time subscriptions
    usersSub = supabase.channel('users-db-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'users' }, fetchStats).subscribe()
    agentsSub = supabase.channel('agents-db-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'agents' }, fetchStats).subscribe()
    ordersSub = supabase.channel('orders-db-changes').on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, fetchStats).subscribe()
    return () => {
      supabase.removeChannel(usersSub)
      supabase.removeChannel(agentsSub)
      supabase.removeChannel(ordersSub)
    }
  }, [])

  if (loading) return <div>Loading analytics...</div>

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Users className="h-6 w-6 text-blue-600" />
            <div>
              <p className="text-lg font-bold">{stats.totalUsers}</p>
              <p className="text-xs text-slate-600">Total Users</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <Bot className="h-6 w-6 text-green-600" />
            <div>
              <p className="text-lg font-bold">{stats.totalAgents}</p>
              <p className="text-xs text-slate-600">Total Agents</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <DollarSign className="h-6 w-6 text-yellow-600" />
            <div>
              <p className="text-lg font-bold">₦{stats.totalRevenue.toLocaleString()}</p>
              <p className="text-xs text-slate-600">Total Revenue</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 flex items-center gap-3">
            <BarChart3 className="h-6 w-6 text-cyan-600" />
            <div>
              <p className="text-lg font-bold">{stats.totalOrders}</p>
              <p className="text-xs text-slate-600">Total Orders</p>
            </div>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Orders</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.recentOrders.length === 0 ? (
              <div className="text-slate-400">No recent orders.</div>
            ) : (
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3">Order ID</th>
                    <th className="text-left py-2 px-3">User</th>
                    <th className="text-left py-2 px-3">Amount</th>
                    <th className="text-left py-2 px-3">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map((o: any) => (
                    <tr key={o.id} className="border-b">
                      <td className="py-2 px-3">{o.id}</td>
                      <td className="py-2 px-3">{o.user_id}</td>
                      <td className="py-2 px-3">₦{Number(o.amount).toLocaleString()}</td>
                      <td className="py-2 px-3">{o.created_at ? new Date(o.created_at).toLocaleString() : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Recent Users</CardTitle>
          </CardHeader>
          <CardContent>
            {stats.recentUsers.length === 0 ? (
              <div className="text-slate-400">No recent users.</div>
            ) : (
              <table className="min-w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2 px-3">User ID</th>
                    <th className="text-left py-2 px-3">Name</th>
                    <th className="text-left py-2 px-3">Email</th>
                    <th className="text-left py-2 px-3">Joined</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentUsers.map((u: any) => (
                    <tr key={u.id} className="border-b">
                      <td className="py-2 px-3">{u.id}</td>
                      <td className="py-2 px-3">{u.name || '-'}</td>
                      <td className="py-2 px-3">{u.email || '-'}</td>
                      <td className="py-2 px-3">{u.created_at ? new Date(u.created_at).toLocaleString() : "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
