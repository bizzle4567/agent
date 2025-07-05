"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Star, Search, MessageSquare, ThumbsUp, Flag, Calendar, TrendingUp, Award } from "lucide-react"
import SellerLayout from "@/components/seller-layout"

const reviewStats = [
  {
    title: "Average Rating",
    value: "4.8",
    change: "+0.2",
    icon: Star,
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
  },
  {
    title: "Total Reviews",
    value: "1,247",
    change: "+15.3%",
    icon: MessageSquare,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
  },
  {
    title: "5-Star Reviews",
    value: "892",
    change: "+18.2%",
    icon: Award,
    color: "text-emerald-600",
    bgColor: "bg-emerald-50",
  },
  {
    title: "Response Rate",
    value: "94%",
    change: "+5.1%",
    icon: TrendingUp,
    color: "text-purple-600",
    bgColor: "bg-purple-50",
  },
]

const reviews = [
  {
    id: 1,
    customer: {
      name: "Adebayo Ogundimu",
      avatar: "/placeholder.svg?height=40&width=40",
      company: "TechCorp Nigeria",
      verified: true,
    },
    agent: "CustomerCare Pro",
    rating: 5,
    title: "Exceptional customer service automation",
    review:
      "This AI agent has transformed our customer service operations. The response time has improved by 80% and customer satisfaction scores have never been higher. The integration was seamless and the support team was incredibly helpful throughout the process.",
    date: "2024-01-20",
    helpful: 12,
    replied: true,
    response:
      "Thank you so much for this wonderful review! We're thrilled that CustomerCare Pro has made such a positive impact on your operations. We're always here to help if you need any assistance.",
    responseDate: "2024-01-21",
    tags: ["Integration", "Support", "Performance"],
  },
  {
    id: 2,
    customer: {
      name: "Kemi Adebisi",
      avatar: "/placeholder.svg?height=40&width=40",
      company: "StartupNG",
      verified: true,
    },
    agent: "SalesBot Nigeria",
    rating: 4,
    title: "Great for lead generation",
    review:
      "SalesBot Nigeria has been a game-changer for our lead generation efforts. It's helped us qualify leads more effectively and our conversion rate has improved significantly. The only minor issue is that sometimes it needs fine-tuning for industry-specific terminology.",
    date: "2024-01-18",
    helpful: 8,
    replied: false,
    tags: ["Lead Generation", "Conversion"],
  },
  {
    id: 3,
    customer: {
      name: "Chinedu Okoro",
      avatar: "/placeholder.svg?height=40&width=40",
      company: "E-commerce Solutions",
      verified: true,
    },
    agent: "DataAnalyzer Pro",
    rating: 5,
    title: "Incredible insights and analytics",
    review:
      "The depth of analytics and insights provided by DataAnalyzer Pro is simply incredible. It's helped us identify trends we never would have spotted manually. The ROI has been substantial - we've optimized our inventory management and increased profits by 30%.",
    date: "2024-01-15",
    helpful: 15,
    replied: true,
    response:
      "We're so happy to hear about your success with DataAnalyzer Pro! A 30% profit increase is fantastic. Thank you for sharing your experience.",
    responseDate: "2024-01-16",
    tags: ["Analytics", "ROI", "Optimization"],
  },
  {
    id: 4,
    customer: {
      name: "Fatima Hassan",
      avatar: "/placeholder.svg?height=40&width=40",
      company: "Hassan Consulting",
      verified: false,
    },
    agent: "ContentCreator AI",
    rating: 3,
    title: "Good but needs improvement",
    review:
      "ContentCreator AI produces decent content, but it sometimes lacks the local Nigerian context that our clients expect. The grammar and structure are good, but it could benefit from more training on Nigerian business culture and communication styles.",
    date: "2024-01-12",
    helpful: 5,
    replied: false,
    tags: ["Content Quality", "Localization"],
  },
  {
    id: 5,
    customer: {
      name: "Olumide Adeyemi",
      avatar: "/placeholder.svg?height=40&width=40",
      company: "FinTech Innovations",
      verified: true,
    },
    agent: "CustomerCare Pro",
    rating: 5,
    title: "Outstanding performance and reliability",
    review:
      "We've been using CustomerCare Pro for 6 months now and it's been outstanding. The uptime is excellent, responses are accurate, and our customers love the quick resolution times. Highly recommend for any business looking to scale their customer support.",
    date: "2024-01-10",
    helpful: 20,
    replied: true,
    response:
      "Thank you for being such a loyal customer! We're proud to be part of your success story and look forward to continuing to serve you.",
    responseDate: "2024-01-11",
    tags: ["Reliability", "Performance", "Scaling"],
  },
]

const ratingDistribution = [
  { stars: 5, count: 892, percentage: 71.6 },
  { stars: 4, count: 234, percentage: 18.8 },
  { stars: 3, count: 87, percentage: 7.0 },
  { stars: 2, count: 23, percentage: 1.8 },
  { stars: 1, count: 11, percentage: 0.8 },
]

export default function ReviewsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [ratingFilter, setRatingFilter] = useState("all")
  const [agentFilter, setAgentFilter] = useState("all")
  const [responseFilter, setResponseFilter] = useState("all")
  const [selectedReview, setSelectedReview] = useState<(typeof reviews)[0] | null>(null)
  const [replyText, setReplyText] = useState("")

  const filteredReviews = reviews.filter((review) => {
    const matchesSearch =
      review.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.review.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRating = ratingFilter === "all" || review.rating.toString() === ratingFilter
    const matchesAgent = agentFilter === "all" || review.agent === agentFilter
    const matchesResponse =
      responseFilter === "all" ||
      (responseFilter === "replied" && review.replied) ||
      (responseFilter === "pending" && !review.replied)

    return matchesSearch && matchesRating && matchesAgent && matchesResponse
  })

  const renderStars = (rating: number, size: "sm" | "md" | "lg" = "md") => {
    const sizeClasses = {
      sm: "h-3 w-3",
      md: "h-4 w-4",
      lg: "h-5 w-5",
    }

    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClasses[size]} ${star <= rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"}`}
          />
        ))}
      </div>
    )
  }

  const handleReply = () => {
    if (replyText.trim() && selectedReview) {
      // Here you would typically send the reply to your backend
      console.log("Sending reply:", replyText)
      setReplyText("")
      // Update the review as replied
      setSelectedReview({
        ...selectedReview,
        replied: true,
        response: replyText,
        responseDate: new Date().toISOString().split("T")[0],
      })
    }
  }

  return (
    <SellerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Reviews & Ratings</h1>
            <p className="text-slate-600">Monitor customer feedback and manage your reputation.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-transparent">
              <Calendar className="h-4 w-4 mr-2" />
              Export Reviews
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviewStats.map((stat, index) => (
            <Card key={index} className="border border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <Badge className="bg-emerald-100 text-emerald-700 text-xs">{stat.change}</Badge>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-800 mb-1">{stat.value}</p>
                  <p className="text-sm text-slate-600">{stat.title}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Rating Distribution */}
          <Card className="border border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg">Rating Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {ratingDistribution.map((rating) => (
                  <div key={rating.stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-12">
                      <span className="text-sm font-medium">{rating.stars}</span>
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    </div>
                    <div className="flex-1 bg-slate-200 rounded-full h-2">
                      <div
                        className="bg-yellow-400 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${rating.percentage}%` }}
                      />
                    </div>
                    <div className="text-sm text-slate-600 w-16 text-right">{rating.count}</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                  <span className="text-lg font-bold text-slate-800">4.8</span>
                  <span className="text-sm text-slate-600">out of 5</span>
                </div>
                <p className="text-xs text-slate-500">Based on 1,247 reviews</p>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card className="lg:col-span-2 border border-slate-200">
            <CardHeader>
              <CardTitle className="text-lg">Review Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-slate-800 mb-3">Most Mentioned Tags</h4>
                  <div className="space-y-2">
                    {[
                      { tag: "Performance", count: 234 },
                      { tag: "Support", count: 189 },
                      { tag: "Integration", count: 156 },
                      { tag: "ROI", count: 134 },
                      { tag: "Reliability", count: 98 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <Badge variant="outline" className="bg-slate-50">
                          {item.tag}
                        </Badge>
                        <span className="text-sm text-slate-600">{item.count}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-slate-800 mb-3">Agent Performance</h4>
                  <div className="space-y-3">
                    {[
                      { agent: "CustomerCare Pro", rating: 4.9, reviews: 456 },
                      { agent: "SalesBot Nigeria", rating: 4.8, reviews: 342 },
                      { agent: "DataAnalyzer Pro", rating: 4.7, reviews: 289 },
                      { agent: "ContentCreator AI", rating: 4.6, reviews: 160 },
                    ].map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div>
                          <p className="font-medium text-slate-800 text-sm">{item.agent}</p>
                          <p className="text-xs text-slate-500">{item.reviews} reviews</p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm font-medium">{item.rating}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="border border-slate-200">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                <Input
                  placeholder="Search reviews by customer, title, or content..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={ratingFilter} onValueChange={setRatingFilter}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue placeholder="Rating" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Ratings</SelectItem>
                  <SelectItem value="5">5 Stars</SelectItem>
                  <SelectItem value="4">4 Stars</SelectItem>
                  <SelectItem value="3">3 Stars</SelectItem>
                  <SelectItem value="2">2 Stars</SelectItem>
                  <SelectItem value="1">1 Star</SelectItem>
                </SelectContent>
              </Select>
              <Select value={agentFilter} onValueChange={setAgentFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder="Agent" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Agents</SelectItem>
                  <SelectItem value="CustomerCare Pro">CustomerCare Pro</SelectItem>
                  <SelectItem value="SalesBot Nigeria">SalesBot Nigeria</SelectItem>
                  <SelectItem value="DataAnalyzer Pro">DataAnalyzer Pro</SelectItem>
                  <SelectItem value="ContentCreator AI">ContentCreator AI</SelectItem>
                </SelectContent>
              </Select>
              <Select value={responseFilter} onValueChange={setResponseFilter}>
                <SelectTrigger className="w-full md:w-32">
                  <SelectValue placeholder="Response" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="replied">Replied</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Reviews List */}
        <Card className="border border-slate-200">
          <CardHeader>
            <CardTitle className="text-lg">Customer Reviews ({filteredReviews.length})</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {filteredReviews.map((review) => (
                <div key={review.id} className="border border-slate-200 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={review.customer.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {review.customer.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium text-slate-800">{review.customer.name}</h4>
                          {review.customer.verified && (
                            <Badge className="bg-blue-100 text-blue-700 text-xs">Verified</Badge>
                          )}
                          <span className="text-sm text-slate-500">•</span>
                          <span className="text-sm text-slate-500">{review.customer.company}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          {renderStars(review.rating)}
                          <span className="text-sm text-slate-500">{review.date}</span>
                        </div>
                      </div>

                      <div className="mb-3">
                        <Badge variant="outline" className="bg-emerald-50 text-emerald-700 mb-2">
                          {review.agent}
                        </Badge>
                        <h5 className="font-medium text-slate-800 mb-2">{review.title}</h5>
                        <p className="text-slate-600 text-sm leading-relaxed">{review.review}</p>
                      </div>

                      <div className="flex items-center gap-4 mb-4">
                        <div className="flex flex-wrap gap-1">
                          {review.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs bg-slate-50">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-sm text-slate-500">
                          <button className="flex items-center gap-1 hover:text-slate-700">
                            <ThumbsUp className="h-4 w-4" />
                            Helpful ({review.helpful})
                          </button>
                          <button className="flex items-center gap-1 hover:text-slate-700">
                            <Flag className="h-4 w-4" />
                            Report
                          </button>
                        </div>

                        <div className="flex items-center gap-2">
                          {review.replied ? (
                            <Badge className="bg-emerald-100 text-emerald-700 text-xs">Replied</Badge>
                          ) : (
                            <Dialog>
                              <DialogTrigger asChild>
                                <Button size="sm" variant="outline" onClick={() => setSelectedReview(review)}>
                                  <MessageSquare className="h-4 w-4 mr-2" />
                                  Reply
                                </Button>
                              </DialogTrigger>
                              <DialogContent className="max-w-2xl">
                                <DialogHeader>
                                  <DialogTitle>Reply to Review</DialogTitle>
                                </DialogHeader>
                                <div className="space-y-4">
                                  <div className="p-4 bg-slate-50 rounded-lg">
                                    <div className="flex items-center gap-2 mb-2">
                                      <h4 className="font-medium">{review.customer.name}</h4>
                                      {renderStars(review.rating, "sm")}
                                    </div>
                                    <p className="text-sm text-slate-600">{review.review}</p>
                                  </div>

                                  <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-2">
                                      Your Response
                                    </label>
                                    <Textarea
                                      placeholder="Write a professional response to this review..."
                                      value={replyText}
                                      onChange={(e) => setReplyText(e.target.value)}
                                      className="min-h-[100px]"
                                    />
                                  </div>

                                  <div className="flex justify-end gap-3">
                                    <Button variant="outline">Cancel</Button>
                                    <Button
                                      onClick={handleReply}
                                      disabled={!replyText.trim()}
                                      className="bg-emerald-600 hover:bg-emerald-700"
                                    >
                                      Send Reply
                                    </Button>
                                  </div>
                                </div>
                              </DialogContent>
                            </Dialog>
                          )}
                        </div>
                      </div>

                      {review.replied && review.response && (
                        <div className="mt-4 p-4 bg-emerald-50 rounded-lg border-l-4 border-emerald-500">
                          <div className="flex items-center gap-2 mb-2">
                            <Avatar className="h-6 w-6">
                              <AvatarImage src="/placeholder.svg?height=24&width=24" />
                              <AvatarFallback className="text-xs">JA</AvatarFallback>
                            </Avatar>
                            <span className="text-sm font-medium text-slate-800">Your Response</span>
                            <span className="text-xs text-slate-500">• {review.responseDate}</span>
                          </div>
                          <p className="text-sm text-slate-600">{review.response}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SellerLayout>
  )
}
