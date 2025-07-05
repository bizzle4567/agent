"use client"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function AgentListingTest() {
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

  return (
    <Card className="mt-8">
      <CardHeader>
        <CardTitle>Test: All Agents Listing</CardTitle>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div>Loading...</div>
        ) : agents.length === 0 ? (
          <div>No agents found in database.</div>
        ) : (
          <ul className="space-y-2">
            {agents.map(agent => (
              <li key={agent.id} className="border-b py-2">
                <span className="font-bold">{agent.name}</span> (Owner: {agent.owner_id})
              </li>
            ))}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
