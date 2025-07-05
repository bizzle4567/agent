"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star, Search, Heart, ShoppingCart, Eye, Sparkles, Brain, ArrowRight } from "lucide-react"
import { recommendationEngine, type Agent } from "@/lib/recommendation-engine"
import Link from "next/link"

interface RecommendationWithAgent {
  agentId: string
  score: number
  reasons: string[]
  confidence: number
  category: "trending" | "similar_usage" | "category_match" | "feature_match" | "price_match"
  agent: Agent
}

const categoryIcons = {
  "Email Marketing": "📧",
  "Social Media": "📱",
  "SEO & Marketing": "🔍",
  "Customer Service": "💬",
  "Content Creation": "✍️",
  Analytics: "📊",
  "Sales Automation": "💼",
  "Voice Technology": "🎤",
}

const categoryColors = {
  trending: "bg-purple-100 text-purple-700 border-purple-200",
  similar_usage: "bg-blue-100 text-blue-700 border-blue-200",
  category_match: "bg-emerald-100 text-emerald-700 border-emerald-200",
  feature_match: "bg-amber-100 text-amber-700 border-amber-200",
  price_match: "bg-rose-100 text-rose-700 border-rose-200",
}

const categoryLabels = {
  trending: "Trending",
  similar_usage: "Similar Usage",
  category_match: "Category Match",
  feature_match: "Feature Match",
  price_match: "Budget Match",
}

export default function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState<RecommendationWithAgent[]>([])
  const [filteredRecommendations, setFilteredRecommendations] = useState<RecommendationWithAgent[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [selectedType, setSelectedType] = useState("all")
  const [priceRange, setPriceRange] = useState("all")

  useEffect(() => {
    // Simulate loading and fetch recommendations
    setTimeout(() => {
      const recs = recommendationEngine.getRecommendationsWithAgents("user123", 12)
      setRecommendations(recs)
      setFilteredRecommendations(recs)
      setLoading(false)
    }, 1000)
  }, [])

  useEffect(() => {
    let filtered = recommendations

    // Search filter
    if (searchQuery) {
      filtered = filtered.filter(
        (rec) =>
          rec.agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          rec.agent.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          rec.agent.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
      )
    }

    // Category filter
    if (selectedCategory !== "all") {
      filtered = filtered.filter((rec) => rec.agent.category === selectedCategory)
    }

    // Type filter
    if (selectedType !== "all") {
      filtered = filtered.filter((rec) => rec.category === selectedType)
    }

    // Price filter
    if (priceRange !== "all") {
      filtered = filtered.filter((rec) => {
        const price = rec.agent.price
        switch (priceRange) {
          case "0-25000":
            return price <= 25000
          case "25000-50000":
            return price > 25000 && price <= 50000
          case "50000+":
            return price > 50000
          default:
            return true
        }
      })
    }

    setFilteredRecommendations(filtered)
  }, [recommendations, searchQuery, selectedCategory, selectedType, priceRange])

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.8) return "text-emerald-600"
    if (confidence >= 0.6) return "text-amber-600"
    return "text-slate-600"
  }

  const getConfidenceLabel = (confidence: number) => {
    if (confidence >= 0.8) return "High Match"
    if (confidence >= 0.6) return "Good Match"
    return "Potential Match"
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-slate-200 rounded w-1/3"></div>
            <div className="grid md:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-slate-200 rounded-lg"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
                <Brain className="h-8 w-8 text-blue-600" />
                AI Recommendations
              </h1>
              <p className="text-slate-600 mt-2">
                Personalized agent suggestions based on your usage patterns and preferences
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className="bg-blue-100 text-blue-700 px-3 py-1">
                <Sparkles className="h-4 w-4 mr-1" />
                {recommendations.length} Suggestions
              </Badge>
            </div>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative flex-1 min-w-64">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
              <Input
                placeholder="Search recommendations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {Object.keys(categoryIcons).map((category) => (
                  <SelectItem key={category} value={category}>
                    {categoryIcons[category as keyof typeof categoryIcons]} {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Recommendation Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="trending">🔥 Trending</SelectItem>
                <SelectItem value="similar_usage">🎯 Similar Usage</SelectItem>
                <SelectItem value="category_match">📂 Category Match</SelectItem>
                <SelectItem value="feature_match">⚡ Feature Match</SelectItem>
                <SelectItem value="price_match">💰 Budget Match</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priceRange} onValueChange={setPriceRange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Price Range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Prices</SelectItem>
                <SelectItem value="0-25000">₦0 - ₦25,000</SelectItem>
                <SelectItem value="25000-50000">₦25,000 - ₦50,000</SelectItem>
                <SelectItem value="50000+">₦50,000+</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <Tabs defaultValue="grid" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList>
              <TabsTrigger value="grid">Grid View</TabsTrigger>
              <TabsTrigger value="list">List View</TabsTrigger>
            </TabsList>
            <div className="text-sm text-slate-600">
              Showing {filteredRecommendations.length} of {recommendations.length} recommendations
            </div>
          </div>

          <TabsContent value="grid">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecommendations.map((rec, index) => (
                <Card
                  key={rec.agentId}
                  className="border border-slate-200 hover:shadow-lg transition-all duration-300 group"
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={rec.agent.image || "/placeholder.svg"}
                          alt={rec.agent.name}
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
                            {rec.agent.name}
                          </h3>
                          <p className="text-sm text-slate-500">{rec.agent.category}</p>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Heart className="h-4 w-4 text-slate-400 hover:text-red-500" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <Badge className={`text-xs ${categoryColors[rec.category]} border`}>
                        {categoryLabels[rec.category]}
                      </Badge>
                      <Badge variant="outline" className={`text-xs ${getConfidenceColor(rec.confidence)}`}>
                        {getConfidenceLabel(rec.confidence)}
                      </Badge>
                    </div>

                    <p className="text-sm text-slate-600 line-clamp-2 mb-3">{rec.agent.description}</p>

                    <div className="space-y-2">
                      <div className="text-xs text-slate-500 font-medium">Why recommended:</div>
                      <div className="space-y-1">
                        {rec.reasons.map((reason, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-xs text-slate-600">
                            <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                            {reason}
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{rec.agent.rating}</span>
                        <span className="text-xs text-slate-500">({rec.agent.reviews})</span>
                      </div>
                      <span className="text-lg font-bold text-slate-800">₦{rec.agent.price.toLocaleString()}</span>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {rec.agent.features.slice(0, 3).map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature.replace("_", " ")}
                        </Badge>
                      ))}
                      {rec.agent.features.length > 3 && (
                        <Badge variant="secondary" className="text-xs">
                          +{rec.agent.features.length - 3} more
                        </Badge>
                      )}
                    </div>

                    <div className="flex gap-2">
                      <Link href={`/agent/${rec.agentId}`} className="flex-1">
                        <Button size="sm" className="w-full bg-blue-600 hover:bg-blue-700">
                          <Eye className="h-3 w-3 mr-1" />
                          View Details
                        </Button>
                      </Link>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        <ShoppingCart className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="list">
            <div className="space-y-4">
              {filteredRecommendations.map((rec, index) => (
                <Card key={rec.agentId} className="border border-slate-200 hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-6">
                      <img
                        src={rec.agent.image || "/placeholder.svg"}
                        alt={rec.agent.name}
                        className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
                      />

                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-lg font-semibold text-slate-800 mb-1">{rec.agent.name}</h3>
                            <p className="text-slate-600 mb-2">{rec.agent.description}</p>
                            <div className="flex items-center gap-4 text-sm text-slate-500">
                              <span>{rec.agent.category}</span>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                                <span>
                                  {rec.agent.rating} ({rec.agent.reviews})
                                </span>
                              </div>
                              <Badge className="text-xs bg-slate-100 text-slate-700">{rec.agent.complexity}</Badge>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-xl font-bold text-slate-800 mb-2">
                              ₦{rec.agent.price.toLocaleString()}
                            </div>
                            <div className="flex gap-2">
                              <Badge className={`text-xs ${categoryColors[rec.category]} border`}>
                                {categoryLabels[rec.category]}
                              </Badge>
                              <Badge variant="outline" className={`text-xs ${getConfidenceColor(rec.confidence)}`}>
                                {getConfidenceLabel(rec.confidence)}
                              </Badge>
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="space-y-1">
                            <div className="text-xs text-slate-500 font-medium">Why recommended:</div>
                            <div className="flex flex-wrap gap-4">
                              {rec.reasons.map((reason, idx) => (
                                <span key={idx} className="text-xs text-slate-600 flex items-center gap-1">
                                  <div className="w-1 h-1 bg-blue-500 rounded-full"></div>
                                  {reason}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button variant="ghost" size="sm">
                              <Heart className="h-4 w-4 text-slate-400" />
                            </Button>
                            <Link href={`/agent/${rec.agentId}`}>
                              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                                View Details
                                <ArrowRight className="h-3 w-3 ml-1" />
                              </Button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {filteredRecommendations.length === 0 && (
          <div className="text-center py-12">
            <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="h-8 w-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-medium text-slate-800 mb-2">No recommendations found</h3>
            <p className="text-slate-600 mb-4">Try adjusting your filters or search terms</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("all")
                setSelectedType("all")
                setPriceRange("all")
              }}
              variant="outline"
            >
              Clear Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}
