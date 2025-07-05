"use client"
import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { supabase } from "@/lib/supabaseClient"
import AdminLayout from "@/components/admin-layout"
import { Bot, CheckCircle, XCircle, Trash2, Plus, DollarSign } from "lucide-react"
import AgentListingTest from "./agent-listing-test"

export default function AdminDashboard() {
  const [agents, setAgents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [revenue, setRevenue] = useState(0)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      // Fetch all agents
      const { data: agentsData } = await supabase.from("agents").select("*")
      setAgents(agentsData || [])
      // Fetch total revenue (sum of all orders)
      const { data: orders } = await supabase.from("orders").select("amount")
      const total = orders && Array.isArray(orders)
        ? orders.reduce((sum, o) => sum + Number(o.amount || 0), 0)
        : 0
      setRevenue(total)
      setLoading(false)
    }
    fetchData()
  }, [])

  // Admin actions (verify, block, remove) - stub handlers
  const handleVerify = async (agentId: string, verified: boolean) => {
    await supabase.from("agents").update({ verified }).eq("id", agentId)
    setAgents((prev) => prev.map(a => a.id === agentId ? { ...a, verified } : a))
  }
  const handleBlock = async (agentId: string, blocked: boolean) => {
    await supabase.from("agents").update({ blocked }).eq("id", agentId)
    setAgents((prev) => prev.map(a => a.id === agentId ? { ...a, blocked } : a))
  }
  const handleRemove = async (agentId: string) => {
    await supabase.from("agents").delete().eq("id", agentId)
    setAgents((prev) => prev.filter(a => a.id !== agentId))
  }

  return (
    <AdminLayout>
      <div className="w-full max-w-6xl mx-auto py-8 px-4 md:px-8">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-blue-50 border-blue-200 border-l-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <Bot className="h-6 w-6 text-blue-600" />
                <div>
                  <p className="text-lg font-bold">{agents.length}</p>
                  <p className="text-xs text-slate-600">Total Agents</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-green-50 border-green-200 border-l-4">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <DollarSign className="h-6 w-6 text-green-600" />
                <div>
                  <p className="text-lg font-bold">₦{revenue.toLocaleString()}</p>
                  <p className="text-xs text-slate-600">Total Revenue</p>
                </div>
              </div>
            </CardContent>
          </Card>
          {/* Add more stats as needed */}
        </div>
        <Card>
          <CardHeader>
            <CardTitle>All Agents</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-slate-500">Loading agents...</div>
            ) : agents.length === 0 ? (
              <div className="text-slate-400">No agents found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2 px-3">Name</th>
                      <th className="text-left py-2 px-3">Owner</th>
                      <th className="text-left py-2 px-3">Status</th>
                      <th className="text-left py-2 px-3">Verified</th>
                      <th className="text-left py-2 px-3">Blocked</th>
                      <th className="text-left py-2 px-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {agents.map(agent => (
                      <tr key={agent.id} className="border-b hover:bg-slate-50">
                        <td className="py-2 px-3 font-medium">{agent.name}</td>
                        <td className="py-2 px-3">{agent.owner_id}</td>
                        <td className="py-2 px-3">{agent.status || "-"}</td>
                        <td className="py-2 px-3">
                          {agent.verified ? (
                            <Badge className="bg-green-100 text-green-700">Verified</Badge>
                          ) : (
                            <Badge className="bg-slate-100 text-slate-700">Unverified</Badge>
                          )}
                        </td>
                        <td className="py-2 px-3">
                          {agent.blocked ? (
                            <Badge className="bg-red-100 text-red-700">Blocked</Badge>
                          ) : (
                            <Badge className="bg-green-100 text-green-700">Active</Badge>
                          )}
                        </td>
                        <td className="py-2 px-3 flex gap-2">
                          <Button size="sm" variant="outline" onClick={() => handleVerify(agent.id, !agent.verified)}>
                            {agent.verified ? <XCircle className="h-4 w-4 text-red-500" /> : <CheckCircle className="h-4 w-4 text-green-500" />}
                            {agent.verified ? "Unverify" : "Verify"}
                          </Button>
                          <Button size="sm" variant="outline" onClick={() => handleBlock(agent.id, !agent.blocked)}>
                            {agent.blocked ? <CheckCircle className="h-4 w-4 text-green-500" /> : <XCircle className="h-4 w-4 text-red-500" />}
                            {agent.blocked ? "Unblock" : "Block"}
                          </Button>
                          <Button size="sm" variant="destructive" onClick={() => handleRemove(agent.id)}>
                            <Trash2 className="h-4 w-4" /> Remove
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
        {/* Agent listing test below */}
        <AgentListingTest />
      </div>
    </AdminLayout>
  )
}
