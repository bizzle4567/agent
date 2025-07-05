"use client"
import AdminLayout from "@/components/admin-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function AdminCustomersPage() {
  const [customers, setCustomers] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")
  const [selected, setSelected] = useState<any | null>(null)
  const [modalOpen, setModalOpen] = useState(false)
  const [agents, setAgents] = useState<any[]>([])
  const [orders, setOrders] = useState<any[]>([])
  const [modalLoading, setModalLoading] = useState(false)

  useEffect(() => {
    async function fetchCustomers() {
      setLoading(true)
      const { data } = await supabase.from("users").select("*")
      setCustomers(data || [])
      setLoading(false)
    }
    fetchCustomers()
  }, [])

  const filtered = customers.filter((c) =>
    c.email?.toLowerCase().includes(search.toLowerCase()) ||
    c.id?.toLowerCase().includes(search.toLowerCase()) ||
    c.name?.toLowerCase().includes(search.toLowerCase())
  )

  async function openModal(user: any) {
    setSelected(user)
    setModalOpen(true)
    setModalLoading(true)
    // Fetch agents and orders for this user
    const { data: agentData } = await supabase.from("agents").select("*").eq("owner_id", user.id)
    setAgents(agentData || [])
    const { data: orderData } = await supabase.from("orders").select("*").eq("user_id", user.id)
    setOrders(orderData || [])
    setModalLoading(false)
  }

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto py-8">
        <h1 className="text-3xl font-bold mb-6 flex items-center gap-3">Customers <Badge className="bg-blue-100 text-blue-700">{customers.length}</Badge></h1>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>All Customers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <input
                className="border rounded px-3 py-2 w-full md:w-80"
                placeholder="Search by email or ID..."
                value={search}
                onChange={e => setSearch(e.target.value)}
              />
              <Button variant="outline" className="w-fit">Export CSV</Button>
            </div>
            {loading ? (
              <div>Loading customers...</div>
            ) : filtered.length === 0 ? (
              <div>No customers found.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full text-sm border">
                  <thead>
                    <tr className="border-b bg-slate-50">
                      <th className="text-left py-2 px-3">Avatar</th>
                      <th className="text-left py-2 px-3">Name</th>
                      <th className="text-left py-2 px-3">Username</th>
                      <th className="text-left py-2 px-3">Email</th>
                      <th className="text-left py-2 px-3">Joined</th>
                      <th className="text-left py-2 px-3">Agents</th>
                      <th className="text-left py-2 px-3">Role</th>
                      <th className="text-left py-2 px-3">Details</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((c) => (
                      <tr key={c.id} className="border-b hover:bg-slate-50">
                        <td className="py-2 px-3">
                          <Image src={c.avatar_url || "/placeholder-user.jpg"} alt="avatar" width={32} height={32} className="rounded-full object-cover" />
                        </td>
                        <td className="py-2 px-3 font-semibold">{c.name || '-'}</td>
                        <td className="py-2 px-3">{c.username || '-'}</td>
                        <td className="py-2 px-3">{c.email || '-'}</td>
                        <td className="py-2 px-3">{c.created_at ? new Date(c.created_at).toLocaleDateString() : '-'}</td>
                        <td className="py-2 px-3">{c.agent_count ?? '-'}</td>
                        <td className="py-2 px-3">{c.role || (c.is_seller ? 'Seller' : 'Buyer')}</td>
                        <td className="py-2 px-3">
                          <Button size="sm" variant="outline" onClick={() => openModal(c)}>View</Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            {/* Modal for user details */}
            {modalOpen && selected && (
              <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
                <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full p-8 relative">
                  <button className="absolute top-3 right-4 text-2xl text-slate-400 hover:text-slate-700" onClick={() => setModalOpen(false)}>&times;</button>
                  <div className="flex items-center gap-4 mb-4">
                    <Image src={selected.avatar_url || "/placeholder-user.jpg"} alt="avatar" width={56} height={56} className="rounded-full object-cover border" />
                    <div>
                      <div className="text-xl font-bold flex items-center gap-2">{selected.name || '-'} <span className="text-slate-400 font-normal">({selected.email})</span></div>
                      <div className="text-slate-500 text-sm">Username: {selected.username || '-'}</div>
                      <div className="text-slate-500 text-sm">Role: {selected.role || (selected.is_seller ? 'Seller' : 'Buyer')}</div>
                      <div className="text-slate-500 text-sm">Joined: {selected.created_at ? new Date(selected.created_at).toLocaleDateString() : '-'}</div>
                      <div className="text-slate-500 text-sm">Blocked: {selected.blocked ? <Badge className="bg-red-100 text-red-700">Yes</Badge> : <Badge className="bg-green-100 text-green-700">No</Badge>}</div>
                    </div>
                  </div>
                  {modalLoading ? (
                    <div className="text-center py-8">Loading details...</div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <div className="font-semibold mb-2">Agents Created</div>
                        {agents.length === 0 ? (
                          <div className="text-slate-400 text-sm">No agents created by this user.</div>
                        ) : (
                          <ul className="space-y-1 text-sm">
                            {agents.map((a: any) => (
                              <li key={a.id} className="border-b py-1 flex justify-between items-center">
                                <span>{a.name}</span>
                                <span className="text-xs text-slate-400">{a.id}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div>
                        <div className="font-semibold mb-2">Payments/Orders</div>
                        <div className="mb-1 text-slate-500 text-xs">Total Spent: <span className="font-bold">₦{orders.reduce((sum, o) => sum + Number(o.amount || 0), 0).toLocaleString()}</span></div>
                        {orders.length === 0 ? (
                          <div className="text-slate-400 text-sm">No payments/orders found.</div>
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
                      </div>
                    </div>
                  )}
                  <div className="flex gap-2 mt-6 justify-end">
                    <Button variant="outline" onClick={() => window.location.href = `/admin/customers/${selected.id}`}>Full Details</Button>
                    <Button variant="destructive">Remove</Button>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}

