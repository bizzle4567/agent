"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Search, Star, Heart, Grid3X3, List, SlidersHorizontal } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

const agents = [
  {
    id: 1,
    name: "CustomerCare Pro",
    category: "Customer Service",
    rating: 4.9,
    reviews: 234,
    price: 15000,
    image: "/placeholder.svg?height=200&width=300",
    description: "24/7 customer support automation with Nigerian context understanding",
    tags: ["AI", "Support", "Automation"],
    seller: "TechSolutions NG",
    featured: true,
  },
  {
    id: 2,
    name: "SalesBot Nigeria",
    category: "Sales Automation",
    rating: 4.8,
    reviews: 189,
    price: 25000,
    image: "/placeholder.svg?height=200&width=300",
    description: "Lead generation and conversion optimization for Nigerian markets",
    tags: ["Sales", "CRM", "Lead Gen"],
    seller: "SalesForce Africa",
    featured: true,
  },
  {
    id: 3,
    name: "ContentCreator AI",
    category: "Content Creation",
    rating: 4.7,
    reviews: 156,
    price: 12000,
    image: "/placeholder.svg?height=200&width=300",
    description: "Generate engaging content in English, Pidgin, and local languages",
    tags: ["Content", "Writing", "Multilingual"],
    seller: "Creative Minds",
    featured: false,
  },
  {
    id: 4,
    name: "DataAnalyzer Pro",
    category: "Data Analysis",
    rating: 4.6,
    reviews: 98,
    price: 30000,
    image: "/placeholder.svg?height=200&width=300",
    description: "Advanced data analytics and insights for business intelligence",
    tags: ["Analytics", "BI", "Reports"],
    seller: "DataCorp Nigeria",
    featured: false,
  },
  {
    id: 5,
    name: "MarketingBot",
    category: "Marketing",
    rating: 4.5,
    reviews: 145,
    price: 18000,
    image: "/placeholder.svg?height=200&width=300",
    description: "Automated marketing campaigns and social media management",
    tags: ["Marketing", "Social Media", "Campaigns"],
    seller: "Digital Marketing Pro",
    featured: false,
  },
  {
    id: 6,
    name: "FinanceAssistant",
    category: "Finance",
    rating: 4.8,
    reviews: 87,
    price: 22000,
    image: "/placeholder.svg?height=200&width=300",
    description: "Financial planning and expense tracking for Nigerian businesses",
    tags: ["Finance", "Accounting", "Planning"],
    seller: "FinTech Solutions",
    featured: false,
  },
  {
    id: 7,
    name: "ChatBot Express",
    category: "Customer Service",
    rating: 4.4,
    reviews: 203,
    price: 8000,
    image: "/placeholder.svg?height=200&width=300",
    description: "Quick setup chatbot for small businesses and startups",
    tags: ["Chatbot", "Quick Setup", "SME"],
    seller: "Bot Builders",
    featured: false,
  },
  {
    id: 8,
    name: "HR Assistant Pro",
    category: "Human Resources",
    rating: 4.6,
    reviews: 112,
    price: 20000,
    image: "/placeholder.svg?height=200&width=300",
    description: "Streamline HR processes with intelligent automation",
    tags: ["HR", "Recruitment", "Automation"],
    seller: "HR Tech Solutions",
    featured: false,
  },
  {
    id: 9,
    name: "E-commerce Bot",
    category: "E-commerce",
    rating: 4.7,
    reviews: 178,
    price: 16000,
    image: "/placeholder.svg?height=200&width=300",
    description: "Boost online sales with intelligent product recommendations",
    tags: ["E-commerce", "Sales", "Recommendations"],
    seller: "Commerce AI",
    featured: true,
  },
  {
    id: 10,
    name: "Legal Assistant",
    category: "Legal",
    rating: 4.5,
    reviews: 89,
    price: 35000,
    image: "/placeholder.svg?height=200&width=300",
    description: "Legal document analysis and contract review automation",
    tags: ["Legal", "Documents", "Analysis"],
    seller: "LegalTech NG",
    featured: false,
  },
  {
    id: 11,
    name: "Social Media Manager",
    category: "Marketing",
    rating: 4.3,
    reviews: 167,
    price: 14000,
    image: "/placeholder.svg?height=200&width=300",
    description: "Automate social media posting and engagement tracking",
    tags: ["Social Media", "Automation", "Analytics"],
    seller: "Social Pro",
    featured: false,
  },
  {
    id: 12,
    name: "Inventory Tracker",
    category: "Operations",
    rating: 4.6,
    reviews: 134,
    price: 19000,
    image: "/placeholder.svg?height=200&width=300",
    description: "Smart inventory management and stock level optimization",
    tags: ["Inventory", "Operations", "Optimization"],
    seller: "Operations AI",
    featured: false,
  },
]

const categories = [
  "All Categories",
  "Customer Service",
  "Sales Automation",
  "Content Creation",
  "Data Analysis",
  "Marketing",
  "Finance",
  "Human Resources",
  "E-commerce",
  "Legal",
  "Operations",
]

export default function MarketplacePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 })
  const [showFilters, setShowFilters] = useState(false)

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch =
      agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All Categories" || agent.category === selectedCategory
    const matchesPrice = agent.price >= priceRange.min && agent.price <= priceRange.max

    return matchesSearch && matchesCategory && matchesPrice
  })

  const sortedAgents = [...filteredAgents].sort((a, b) => {
    switch (sortBy) {
      case "featured":
        return b.featured ? 1 : -1
      case "rating":
        return b.rating - a.rating
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "newest":
        return b.id - a.id
      default:
        return 0
    }
  })

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8 text-center">
            <h1 className="text-4xl font-bold text-slate-800 mb-4">AI Agent Marketplace</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Discover and deploy powerful AI agents for your business. From customer service to sales automation.
            </p>
          </div>

          {/* Search and Filters */}
          <div className="bg-gradient-to-r from-white via-blue-50 to-purple-50 rounded-2xl shadow-lg border border-blue-100 p-6 mb-8">
            <div className="flex flex-col lg:flex-row gap-4">
              {/* Search */}
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <Input
                    placeholder="Search for AI agents..."
                    className="pl-12 h-12 text-lg border-blue-200 rounded-xl focus:border-blue-500 bg-white shadow-sm"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              {/* Category Filter */}
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full lg:w-56 h-12 rounded-xl border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Sort */}
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-48 h-12 rounded-xl border-slate-200">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="rating">Highest Rated</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                </SelectContent>
              </Select>

              {/* View Toggle */}
              <div className="flex border border-blue-200 rounded-xl overflow-hidden bg-white shadow-sm">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className={`rounded-none h-12 px-4 ${viewMode === "grid" ? "bg-gradient-to-r from-blue-500 to-purple-600" : ""}`}
                >
                  <Grid3X3 className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className={`rounded-none h-12 px-4 ${viewMode === "list" ? "bg-gradient-to-r from-blue-500 to-purple-600" : ""}`}
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>

              {/* Mobile Filters */}
              <Button
                variant="outline"
                size="sm"
                className="lg:hidden h-12 px-4 rounded-xl border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50 hover:from-blue-100 hover:to-purple-100"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar Filters */}
            <div className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-72 space-y-6`}>
              <div className="bg-gradient-to-br from-white to-blue-50 rounded-2xl shadow-lg border border-blue-100 p-6">
                <h3 className="font-semibold text-slate-800 mb-6 text-lg">Filters</h3>

                {/* Price Range */}
                <div className="space-y-4">
                  <h4 className="font-medium text-slate-700">Price Range</h4>
                  <div className="space-y-3">
                    <Input
                      type="number"
                      placeholder="Min price (₦)"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange((prev) => ({ ...prev, min: Number(e.target.value) }))}
                      className="rounded-lg"
                    />
                    <Input
                      type="number"
                      placeholder="Max price (₦)"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange((prev) => ({ ...prev, max: Number(e.target.value) }))}
                      className="rounded-lg"
                    />
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="space-y-4 pt-6 border-t border-slate-200">
                  <h4 className="font-medium text-slate-700">Rating</h4>
                  <div className="space-y-3">
                    {[4, 3, 2, 1].map((rating) => (
                      <div key={rating} className="flex items-center space-x-3">
                        <Checkbox id={`rating-${rating}`} />
                        <label htmlFor={`rating-${rating}`} className="flex items-center gap-2 text-sm cursor-pointer">
                          <span>{rating}</span>
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-slate-500">& up</span>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="space-y-4 pt-6 border-t border-slate-200">
                  <h4 className="font-medium text-slate-700">Features</h4>
                  <div className="space-y-3">
                    {["Free Trial", "API Access", "Custom Training", "Support Included"].map((feature) => (
                      <div key={feature} className="flex items-center space-x-3">
                        <Checkbox id={feature} />
                        <label htmlFor={feature} className="text-sm cursor-pointer">
                          {feature}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="flex justify-between items-center mb-8">
                <div>
                  <p className="text-slate-600 text-lg">
                    Showing <span className="font-semibold">{sortedAgents.length}</span> of{" "}
                    <span className="font-semibold">{agents.length}</span> agents
                  </p>
                </div>
              </div>

              {/* Agent Grid/List */}
              <div className={viewMode === "grid" ? "grid grid-cols-2 lg:grid-cols-4 gap-6" : "space-y-6"}>
                {sortedAgents.map((agent) => (
                  <AgentCard key={agent.id} agent={agent} viewMode={viewMode} />
                ))}
              </div>

              {sortedAgents.length === 0 && (
                <div className="text-center py-16">
                  <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-slate-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-800 mb-2">No agents found</h3>
                  <p className="text-slate-500 text-lg mb-6">Try adjusting your search criteria</p>
                  <Button
                    variant="outline"
                    className="bg-transparent"
                    onClick={() => {
                      setSearchQuery("")
                      setSelectedCategory("All Categories")
                      setPriceRange({ min: 0, max: 50000 })
                    }}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}

function AgentCard({ agent, viewMode }: { agent: any; viewMode: "grid" | "list" }) {
  if (viewMode === "list") {
    return (
      <Card className="border border-slate-200 hover:shadow-xl transition-all duration-300 hover:border-blue-200">
        <CardContent className="p-6">
          <div className="flex gap-6">
            <div className="relative">
              <img
                src={agent.image || "/placeholder.svg"}
                alt={agent.name}
                className="w-28 h-28 rounded-xl object-cover"
              />
              {agent.featured && (
                <Badge className="absolute -top-2 -right-2 bg-yellow-500 text-white text-xs">Featured</Badge>
              )}
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold text-slate-800 hover:text-blue-600 transition-colors">
                      {agent.name}
                    </h3>
                    <Badge variant="secondary" className="bg-blue-50 text-blue-700 text-xs">
                      {agent.category}
                    </Badge>
                  </div>
                  <p className="text-slate-600 mb-3 leading-relaxed">{agent.description}</p>
                  <div className="flex items-center gap-6 text-sm text-slate-500">
                    <span>by {agent.seller}</span>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{agent.rating}</span>
                      <span>({agent.reviews} reviews)</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-slate-800 mb-3">₦{agent.price.toLocaleString()}</p>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="bg-transparent">
                      <Heart className="h-4 w-4" />
                    </Button>
                    <Link href={`/agent/${agent.id}`}>
                      <Button size="sm" className="bg-blue-600 hover:bg-blue-700 px-6">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex gap-2">
                {agent.tags.map((tag: string) => (
                  <Badge key={tag} variant="secondary" className="text-xs bg-slate-100 text-slate-600">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border border-slate-200 hover:shadow-xl transition-all duration-300 group cursor-pointer hover:border-blue-200 hover:-translate-y-1">
      <CardContent className="p-0">
        <div className="relative">
          <img
            src={agent.image || "/placeholder.svg"}
            alt={agent.name}
            className="w-full h-48 object-cover rounded-t-xl"
          />
          {agent.featured && (
            <Badge className="absolute top-3 left-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs shadow-lg">
              Featured
            </Badge>
          )}
          <Button
            size="sm"
            variant="outline"
            className="absolute top-3 right-3 bg-white/90 hover:bg-white border-0 shadow-lg hover:shadow-xl transition-all"
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>

        <div className="p-5">
          <div className="flex justify-between items-start mb-3">
            <Badge
              variant="secondary"
              className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-800 border border-blue-200 text-xs"
            >
              {agent.category}
            </Badge>
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">{agent.rating}</span>
              <span className="text-xs text-slate-500">({agent.reviews})</span>
            </div>
          </div>

          <h3 className="text-lg font-semibold text-slate-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-1">
            {agent.name}
          </h3>
          <p className="text-slate-600 text-sm mb-4 line-clamp-2 leading-relaxed">{agent.description}</p>

          <div className="flex gap-1 mb-4">
            {agent.tags.slice(0, 2).map((tag: string) => (
              <Badge
                key={tag}
                variant="secondary"
                className="text-xs bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border border-emerald-200"
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex justify-between items-center">
            <div>
              <p className="text-xl font-bold text-slate-800">₦{agent.price.toLocaleString()}</p>
              <p className="text-xs text-slate-500">by {agent.seller}</p>
            </div>
            <Link href={`/agent/${agent.id}`}>
              <Button
                size="sm"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
              >
                View Details
              </Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
