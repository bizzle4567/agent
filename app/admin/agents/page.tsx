"use client"
import AdminLayout from "@/components/admin-layout"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bot, CheckCircle, XCircle, Trash2 } from "lucide-react"

export default function AdminAgentsPage() {
  const [agents, setAgents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAgents() {
      setLoading(true)
      const { data } = await supabase.from("agents").select("*")
      setAgents(data || [])
      setLoading(false)
    }
    fetchAgents()
  }, [])

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
      <div className="max-w-5xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Agents</h1>
        <Card>
          <CardHeader>
            <CardTitle>All Agents</CardTitle>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div>Loading agents...</div>
            ) : agents.length === 0 ? (
              <div>No agents found.</div>
            ) : (
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
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
