"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ArrowRight, Heart, Eye, Sparkles, TrendingUp } from "lucide-react"
import { recommendationEngine } from "@/lib/recommendation-engine"
import Link from "next/link"

interface RecommendationWithAgent {
  agentId: string
  score: number
  reasons: string[]
  confidence: number
  category: "trending" | "similar_usage" | "category_match" | "feature_match" | "price_match"
  agent: {
    id: string
    name: string
    category: string
    price: number
    rating: number
    reviews: number
    features: string[]
    description: string
    image: string
    tags: string[]
    complexity: "beginner" | "intermediate" | "advanced"
    useCases: string[]
  }
}

const categoryColors = {
  trending: "bg-purple-100 text-purple-700",
  similar_usage: "bg-blue-100 text-blue-700",
  category_match: "bg-emerald-100 text-emerald-700",
  feature_match: "bg-amber-100 text-amber-700",
  price_match: "bg-rose-100 text-rose-700",
}

const categoryIcons = {
  trending: TrendingUp,
  similar_usage: Eye,
  category_match: Star,
  feature_match: Sparkles,
  price_match: Heart,
}

export default function RecommendationsWidget() {
  const [recommendations, setRecommendations] = useState<RecommendationWithAgent[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate loading and fetch recommendations
    setTimeout(() => {
      const recs = recommendationEngine.getRecommendationsWithAgents("user123", 3)
      setRecommendations(recs)
      setLoading(false)
    }, 500)
  }, [])

  if (loading) {
    return (
      <Card className="border border-slate-200">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            AI Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="flex items-start gap-3">
                  <div className="w-12 h-12 bg-slate-200 rounded-lg"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                    <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                    <div className="h-3 bg-slate-200 rounded w-2/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border border-slate-200">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-blue-600" />
            AI Recommendations
          </CardTitle>
          <Link href="/recommendations">
            <Button variant="ghost" size="sm" className="text-blue-600 flex items-center gap-1">
              View All
              <ArrowRight className="h-3 w-3" />
            </Button>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {recommendations.map((rec, index) => {
            const CategoryIcon = categoryIcons[rec.category]
            return (
              <div
                key={rec.agentId}
                className="border border-slate-200 rounded-lg p-4 hover:shadow-md transition-shadow group"
              >
                <div className="flex items-start gap-3 mb-3">
                  <img
                    src={rec.agent.image || "/placeholder.svg"}
                    alt={rec.agent.name}
                    className="w-12 h-12 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-slate-800 group-hover:text-blue-600 transition-colors">
                        {rec.agent.name}
                      </h4>
                      <Badge className={`text-xs ${categoryColors[rec.category]}`}>
                        <CategoryIcon className="h-3 w-3 mr-1" />
                        {rec.category === "similar_usage"
                          ? "Similar"
                          : rec.category === "category_match"
                            ? "Category"
                            : rec.category === "feature_match"
                              ? "Features"
                              : rec.category === "price_match"
                                ? "Budget"
                                : "Trending"}
                      </Badge>
                    </div>
                    <p className="text-sm text-slate-500 mb-1">{rec.agent.category}</p>
                    <p className="text-xs text-slate-600 line-clamp-2">{rec.agent.description}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 mb-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{rec.agent.rating}</span>
                    </div>
                    <span className="text-sm font-bold text-slate-800">₦{rec.agent.price.toLocaleString()}</span>
                  </div>
                </div>

                <div className="mb-3">
                  <div className="text-xs text-slate-500 font-medium mb-1">Why recommended:</div>
                  <div className="text-xs text-slate-600">{rec.reasons[0]}</div>
                </div>

                <div className="flex gap-2">
                  <Link href={`/agent/${rec.agentId}`} className="flex-1">
                    <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700 text-xs">
                      <Eye className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </Link>
                  <Button size="sm" variant="outline" className="bg-transparent">
                    <Heart className="h-3 w-3 text-slate-400" />
                  </Button>
                </div>
              </div>
            )
          })}
        </div>

        <div className="mt-4 p-3 bg-blue-50 rounded-lg">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium text-blue-800">Personalized for You</span>
          </div>
          <p className="text-xs text-blue-700">
            These recommendations are based on your usage patterns, preferences, and similar users' choices.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
