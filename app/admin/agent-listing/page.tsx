"use client"
import AdminLayout from "@/components/admin-layout"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
  const [showAdd, setShowAdd] = useState(false)
  const [addForm, setAddForm] = useState({
    name: "",
    category: "",
    owner_id: "",
  })
  const [addError, setAddError] = useState("")
  const [addLoading, setAddLoading] = useState(false)
  async function handleAddAgent(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setAddError("")
    setAddLoading(true)
    if (!addForm.name || !addForm.category || !addForm.owner_id) {
      setAddError("All fields are required.")
      setAddLoading(false)
      return
    }
    const { error } = await supabase.from("agents").insert([
      {
        name: addForm.name,
        category: addForm.category,
        owner_id: addForm.owner_id,
        status: "approved",
        created_at: new Date().toISOString(),
      },
    ])
    if (error) setAddError(error.message)
    else {
      setAddForm({ name: "", category: "", owner_id: "" })
      setShowAdd(false)
      // refetch agents
      // @ts-ignore
      await (typeof fetchAgents === 'function' ? fetchAgents() : null)
    }
    setAddLoading(false)
  }
import { CheckCircle, XCircle, Edit, Trash2, Zap } from "lucide-react"

export default function AdminAgentListingPage() {
  const [agents, setAgents] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [error, setError] = useState("")

  useEffect(() => {
    fetchAgents()
  }, [])

  async function fetchAgents() {
    setLoading(true)
    const { data, error } = await supabase.from("agents").select("*").order("created_at", { ascending: false })
    setAgents(data || [])
    setLoading(false)
  }

  async function handleApprove(id: string) {
    setActionLoading(id+"-approve")
    setError("")
    const { error } = await supabase.from("agents").update({ status: "approved" }).eq("id", id)
    if (error) setError(error.message)
    await fetchAgents()
    setActionLoading(null)
  }

  async function handleReject(id: string) {
    setActionLoading(id+"-reject")
    setError("")
    const { error } = await supabase.from("agents").update({ status: "rejected" }).eq("id", id)
    if (error) setError(error.message)
    await fetchAgents()
    setActionLoading(null)
  }

  async function handleDelete(id: string) {
    setActionLoading(id+"-delete")
    setError("")
    const { error } = await supabase.from("agents").delete().eq("id", id)
    if (error) setError(error.message)
    await fetchAgents()
    setActionLoading(null)
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto py-8">
        <h1 className="text-2xl font-bold mb-6">Agent Submissions & Management</h1>
        <div className="mb-6 flex items-center gap-4">
          <Button onClick={() => setShowAdd((v) => !v)} variant="outline" className="bg-white border-blue-200">
            {showAdd ? "Cancel" : "Add New Agent"}
          </Button>
        </div>
        {showAdd && (
          <form onSubmit={handleAddAgent} className="mb-8 bg-slate-50 border border-slate-200 rounded-lg p-6 max-w-xl">
            <div className="grid md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium mb-1">Agent Name</label>
                <Input value={addForm.name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddForm(f => ({ ...f, name: e.target.value }))} placeholder="Agent Name" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category</label>
                <Input value={addForm.category} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddForm(f => ({ ...f, category: e.target.value }))} placeholder="Category" />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Owner ID</label>
                <Input value={addForm.owner_id} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAddForm(f => ({ ...f, owner_id: e.target.value }))} placeholder="Owner ID" />
              </div>
            </div>
            {addError && <div className="text-red-500 text-sm mb-2">{addError}</div>}
            <Button type="submit" disabled={addLoading} className="bg-blue-600 text-white">
              {addLoading ? "Adding..." : "Add Agent"}
            </Button>
          </form>
        )}
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border">
            <thead>
              <tr className="bg-slate-100 border-b">
                <th className="py-2 px-3 text-left">Name</th>
                <th className="py-2 px-3 text-left">Owner</th>
                <th className="py-2 px-3 text-left">Category</th>
                <th className="py-2 px-3 text-left">Status</th>
                <th className="py-2 px-3 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr><td colSpan={5} className="py-6 text-center">Loading...</td></tr>
              ) : agents.length === 0 ? (
                <tr><td colSpan={5} className="py-6 text-center">No agents found.</td></tr>
              ) : (
                agents.map(agent => (
                  <tr key={agent.id} className="border-b">
                    <td className="py-2 px-3 font-medium">{agent.name}</td>
                    <td className="py-2 px-3">{agent.owner_id || agent.companyName || "-"}</td>
                    <td className="py-2 px-3">{agent.category}</td>
                    <td className="py-2 px-3">
                      {agent.status === "approved" ? (
                        <span className="inline-flex items-center gap-1 text-green-700"><CheckCircle className="h-4 w-4" /> Approved</span>
                      ) : agent.status === "rejected" ? (
                        <span className="inline-flex items-center gap-1 text-red-600"><XCircle className="h-4 w-4" /> Rejected</span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-yellow-600"><Zap className="h-4 w-4" /> Pending</span>
                      )}
                    </td>
                    <td className="py-2 px-3 flex gap-2">
                      {agent.status !== "approved" && (
                        <Button size="sm" variant="outline" disabled={actionLoading===agent.id+"-approve"} onClick={() => handleApprove(agent.id)}>
                          <CheckCircle className="h-4 w-4 mr-1" /> Approve
                        </Button>
                      )}
                      {agent.status !== "rejected" && (
                        <Button size="sm" variant="outline" disabled={actionLoading===agent.id+"-reject"} onClick={() => handleReject(agent.id)}>
                          <XCircle className="h-4 w-4 mr-1" /> Reject
                        </Button>
                      )}
                      <Button size="sm" variant="outline" disabled={actionLoading===agent.id+"-delete"} onClick={() => handleDelete(agent.id)}>
                        <Trash2 className="h-4 w-4 mr-1" /> Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
