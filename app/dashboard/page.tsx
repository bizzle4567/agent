"use client"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  TrendingUp,
  ShoppingCart,
  Star,
  Plus,
  Bot,
  Clock,
  Activity,
  CreditCard,
  BarChart3,
  PlayCircle,
  Settings,
  HelpCircle,
} from "lucide-react"
import { DollarSign } from "lucide-react"
import DashboardLayout from "@/components/dashboard-layout"
import RecommendationsWidget from "@/components/recommendations-widget"
import Link from "next/link"
import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabaseClient"

// Custom hook for count-up animation
function useCountUp(end: number, duration = 2000) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(end * easeOutQuart))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration])

  return count
}

// Fetch real dashboard stats from Supabase
function useDashboardStats(userId: string | null) {
  const [stats, setStats] = useState({
    activeAgents: 0,
    totalSpent: 0,
    usageHours: 0, // Placeholder, update if you have a table for this
    avgRating: 0,
  });
  useEffect(() => {
    if (!userId) return;
    async function fetchStats() {
      // 1. Active Agents
      const { count: activeAgents } = await supabase
        .from('agents')
        .select('*', { count: 'exact', head: true })
        .eq('owner_id', userId);

      // 2. Total Spent
      const { data: orders, error: ordersError } = await supabase
        .from('orders')
        .select('amount')
        .eq('user_id', userId);
      const totalSpent = orders && Array.isArray(orders)
        ? orders.reduce((sum, o) => sum + Number(o.amount || 0), 0)
        : 0;

      // 3. Avg. Rating Given
      const { data: reviews, error: reviewsError } = await supabase
        .from('reviews')
        .select('rating')
        .eq('user_id', userId);
      const avgRating = reviews && reviews.length > 0
        ? (reviews.reduce((sum, r) => sum + (r.rating || 0), 0) / reviews.length)
        : 0;

      // 4. Usage Hours (placeholder, update if you have a table for this)
      setStats({
        activeAgents: activeAgents || 0,
        totalSpent,
        usageHours: 0,
        avgRating: Number(avgRating.toFixed(1)),
      });
    }
    fetchStats();
  }, [userId]);
  return stats;
}




export default function UserDashboard() {
  // Minimal, clean, user-focused dashboard redesign from scratch
  return (
    <DashboardLayout>
      <div className="w-full max-w-5xl mx-auto py-8 px-4 md:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900 mb-1">Welcome back 👋</h1>
            <p className="text-slate-500 text-base">Your personal AI agent dashboard</p>
          </div>
          <div className="flex gap-2">
            <Link href="/marketplace">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white flex items-center gap-2">
                <Plus className="h-4 w-4" /> Discover Agents
              </Button>
            </Link>
          </div>
        </div>
        {/* Stats Overview (live data) */}
        {/* TODO: Implement StatsOverview component or import it here */}
        {/* Main Content: Agents & Activity */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* My Agents */}
          <Card className="col-span-2 border border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">My Active Agents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* TODO: Replace with real agent data from Supabase */}
                <div className="text-slate-400 text-sm">No agents found.</div>
              </div>
            </CardContent>
          </Card>

          {/* Activity & Usage Pie Chart */}
          <div className="flex flex-col gap-6">
            <Card className="border border-slate-200">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Usage Breakdown</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  {/* Simple static pie chart */}
                  <svg width="90" height="90" viewBox="0 0 36 36" className="mb-2">
                    <circle cx="18" cy="18" r="16" fill="#f1f5f9" />
                    <path d="M18 2 a 16 16 0 0 1 13.856 24.142" fill="none" stroke="#2563eb" strokeWidth="3.5" strokeDasharray="60, 100" />
                    <path d="M18 2 a 16 16 0 1 1 -13.856 24.142" fill="none" stroke="#22d3ee" strokeWidth="3.5" strokeDasharray="40, 100" />
                  </svg>
                  <div className="flex gap-2 text-xs text-slate-500">
                    <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-blue-600"></span> Agents</span>
                    <span className="flex items-center gap-1"><span className="inline-block w-2 h-2 rounded-full bg-cyan-400"></span> Analytics</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="border border-slate-200">
              <CardHeader>
                <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {/* TODO: Replace with real activity data from Supabase */}
                  <div className="text-slate-400 text-sm">No recent activity.</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

    </DashboardLayout>
  )
}


