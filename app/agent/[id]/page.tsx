"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Star,
  Heart,
  Share2,
  Download,
  Shield,
  Zap,
  Clock,
  CheckCircle,
  Play,
  Code,
  MessageSquare,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  ArrowLeft,
  ExternalLink,
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"
import PurchaseModal from "@/components/purchase-modal"

// Mock data - in real app, this would come from API based on the ID
const agentData = {
  id: 1,
  name: "CustomerCare Pro",
  category: "Customer Service",
  shortDescription: "24/7 customer support automation with Nigerian context understanding",
  longDescription: `CustomerCare Pro is an advanced AI-powered customer service agent specifically designed for Nigerian businesses. It understands local languages, cultural nuances, and business practices to provide exceptional customer support around the clock.

The agent can handle multiple customer inquiries simultaneously, resolve common issues instantly, and escalate complex problems to human agents when necessary. It's trained on Nigerian business scenarios and can communicate in English, Pidgin, and basic phrases in major local languages.

Perfect for e-commerce stores, service businesses, and any company looking to improve customer satisfaction while reducing support costs.`,
  price: 15000,
  originalPrice: 20000,
  rating: 4.9,
  totalReviews: 234,
  totalSales: 1247,
  images: [
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
    "/placeholder.svg?height=400&width=600",
  ],
  videoUrl: "https://example.com/demo-video",
  tags: ["AI", "Customer Support", "Automation", "Nigerian Context", "Multi-language"],
  features: [
    "24/7 automated customer support",
    "Nigerian language and cultural understanding",
    "Multi-channel integration (WhatsApp, SMS, Email, Web)",
    "Intelligent ticket routing and escalation",
    "Real-time analytics and reporting",
    "Custom knowledge base integration",
    "Mobile-responsive chat interface",
    "GDPR and data privacy compliant",
  ],
  specifications: {
    "Response Time": "< 2 seconds",
    "Languages Supported": "English, Pidgin, Basic Yoruba/Hausa/Igbo",
    "Integration Methods": "API, Webhook, Widget",
    "Uptime Guarantee": "99.9%",
    "Data Storage": "Nigerian servers",
    "Support Channels": "WhatsApp, Email, SMS, Web Chat",
    "Concurrent Users": "Unlimited",
    "Setup Time": "15 minutes",
  },
  seller: {
    id: 1,
    name: "TechSolutions NG",
    avatar: "/placeholder.svg?height=60&width=60",
    rating: 4.8,
    totalAgents: 8,
    totalSales: 2456,
    joinedDate: "January 2023",
    verified: true,
    description:
      "Leading AI solutions provider in Nigeria, specializing in customer service automation and business intelligence tools.",
    location: "Lagos, Nigeria",
    responseTime: "Within 2 hours",
  },
  pricingPlans: [
    {
      name: "Starter",
      price: 15000,
      period: "month",
      features: ["Up to 1,000 conversations/month", "Basic analytics", "Email support", "Standard integrations"],
      popular: false,
    },
    {
      name: "Professional",
      price: 35000,
      period: "month",
      features: [
        "Up to 5,000 conversations/month",
        "Advanced analytics",
        "Priority support",
        "All integrations",
        "Custom branding",
        "API access",
      ],
      popular: true,
    },
    {
      name: "Enterprise",
      price: 75000,
      period: "month",
      features: [
        "Unlimited conversations",
        "Real-time analytics",
        "24/7 phone support",
        "Custom integrations",
        "White-label solution",
        "Dedicated account manager",
      ],
      popular: false,
    },
  ],
  freeTrialDays: 14,
  hasFreeTrial: true,
}

const reviews = [
  {
    id: 1,
    user: {
      name: "Adebayo Ogundimu",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    rating: 5,
    date: "2 weeks ago",
    title: "Excellent customer service automation",
    content:
      "This agent has transformed our customer support. It handles 80% of our inquiries automatically and the Nigerian context understanding is impressive. Our customers love the Pidgin support!",
    helpful: 23,
    plan: "Professional",
    verified: true,
  },
  {
    id: 2,
    user: {
      name: "Kemi Adebisi",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    rating: 5,
    date: "1 month ago",
    title: "Perfect for e-commerce",
    content:
      "Integrated seamlessly with our online store. The WhatsApp integration is a game-changer for Nigerian customers. Setup was quick and support team was very helpful.",
    helpful: 18,
    plan: "Starter",
    verified: true,
  },
  {
    id: 3,
    user: {
      name: "Chinedu Okoro",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: false,
    },
    rating: 4,
    date: "3 weeks ago",
    title: "Good but needs improvement",
    content:
      "Works well overall but sometimes struggles with complex Yoruba phrases. The analytics dashboard is very detailed and helpful for tracking performance.",
    helpful: 12,
    plan: "Professional",
    verified: true,
  },
  {
    id: 4,
    user: {
      name: "Fatima Hassan",
      avatar: "/placeholder.svg?height=40&width=40",
      verified: true,
    },
    rating: 5,
    date: "1 week ago",
    title: "Highly recommended",
    content:
      "Best investment we've made for our business. Customer satisfaction has increased by 40% since implementation. The agent learns from interactions and gets better over time.",
    helpful: 31,
    plan: "Enterprise",
    verified: true,
  },
]

const relatedAgents = [
  {
    id: 2,
    name: "SalesBot Nigeria",
    category: "Sales Automation",
    price: 25000,
    rating: 4.8,
    reviews: 189,
    image: "/placeholder.svg?height=200&width=300",
    seller: "SalesForce Africa",
  },
  {
    id: 3,
    name: "ChatBot Express",
    category: "Customer Service",
    price: 8000,
    rating: 4.4,
    reviews: 203,
    image: "/placeholder.svg?height=200&width=300",
    seller: "Bot Builders",
  },
  {
    id: 4,
    name: "Support Assistant Pro",
    category: "Customer Service",
    price: 18000,
    rating: 4.6,
    reviews: 156,
    image: "/placeholder.svg?height=200&width=300",
    seller: "AI Support Co",
  },
]

export default function AgentDetailPage({ params }: { params: { id: string } }) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedPlan, setSelectedPlan] = useState(1) // Professional plan selected by default
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)
  const [isWishlisted, setIsWishlisted] = useState(false)

  const ratingDistribution = [
    { stars: 5, count: 156, percentage: 67 },
    { stars: 4, count: 45, percentage: 19 },
    { stars: 3, count: 23, percentage: 10 },
    { stars: 2, count: 7, percentage: 3 },
    { stars: 1, count: 3, percentage: 1 },
  ]

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-slate-600 mb-6">
            <Link href="/marketplace" className="hover:text-blue-600 flex items-center gap-1">
              <ArrowLeft className="h-4 w-4" />
              Back to Marketplace
            </Link>
            <span>/</span>
            <span>{agentData.category}</span>
            <span>/</span>
            <span className="text-slate-800 font-medium">{agentData.name}</span>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Agent Images */}
              <Card className="border border-slate-200">
                <CardContent className="p-0">
                  <div className="relative">
                    <img
                      src={agentData.images[selectedImage] || "/placeholder.svg"}
                      alt={agentData.name}
                      className="w-full h-96 object-cover rounded-t-lg"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className="bg-emerald-500 text-white">
                        {agentData.hasFreeTrial && `${agentData.freeTrialDays}-Day Free Trial`}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4 flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-white/90 hover:bg-white"
                        onClick={() => setIsWishlisted(!isWishlisted)}
                      >
                        <Heart className={`h-4 w-4 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`} />
                      </Button>
                      <Button size="sm" variant="outline" className="bg-white/90 hover:bg-white">
                        <Share2 className="h-4 w-4" />
                      </Button>
                    </div>
                    {agentData.videoUrl && (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Button size="lg" className="bg-blue-600 hover:bg-blue-700 rounded-full w-16 h-16">
                          <Play className="h-6 w-6 ml-1" />
                        </Button>
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <div className="flex gap-2 overflow-x-auto">
                      {agentData.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setSelectedImage(index)}
                          className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-colors ${
                            selectedImage === index ? "border-blue-500" : "border-slate-200"
                          }`}
                        >
                          <img
                            src={image || "/placeholder.svg"}
                            alt={`View ${index + 1}`}
                            className="w-full h-full object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Agent Details Tabs */}
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4 bg-white border border-slate-200 rounded-xl p-1">
                  <TabsTrigger value="overview" className="rounded-lg">
                    Overview
                  </TabsTrigger>
                  <TabsTrigger value="features" className="rounded-lg">
                    Features
                  </TabsTrigger>
                  <TabsTrigger value="reviews" className="rounded-lg">
                    Reviews ({agentData.totalReviews})
                  </TabsTrigger>
                  <TabsTrigger value="support" className="rounded-lg">
                    Support
                  </TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview">
                  <Card className="border border-slate-200">
                    <CardContent className="p-8">
                      <div className="prose max-w-none">
                        <h3 className="text-xl font-semibold text-slate-800 mb-4">About this Agent</h3>
                        <div className="text-slate-600 leading-relaxed whitespace-pre-line mb-6">
                          {agentData.longDescription}
                        </div>

                        <h4 className="text-lg font-semibold text-slate-800 mb-4">Technical Specifications</h4>
                        <div className="grid md:grid-cols-2 gap-4">
                          {Object.entries(agentData.specifications).map(([key, value]) => (
                            <div key={key} className="flex justify-between p-3 bg-slate-50 rounded-lg">
                              <span className="font-medium text-slate-700">{key}:</span>
                              <span className="text-slate-600">{value}</span>
                            </div>
                          ))}
                        </div>

                        <h4 className="text-lg font-semibold text-slate-800 mb-4 mt-8">Tags</h4>
                        <div className="flex flex-wrap gap-2">
                          {agentData.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="bg-blue-50 text-blue-700">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Features Tab */}
                <TabsContent value="features">
                  <Card className="border border-slate-200">
                    <CardContent className="p-8">
                      <h3 className="text-xl font-semibold text-slate-800 mb-6">Key Features</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        {agentData.features.map((feature, index) => (
                          <div key={index} className="flex items-start gap-3 p-4 bg-slate-50 rounded-lg">
                            <CheckCircle className="h-5 w-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                            <span className="text-slate-700">{feature}</span>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                        <div className="flex items-center gap-3 mb-4">
                          <Shield className="h-6 w-6 text-blue-600" />
                          <h4 className="text-lg font-semibold text-slate-800">Security & Compliance</h4>
                        </div>
                        <div className="grid md:grid-cols-3 gap-4 text-sm">
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-500" />
                            <span>GDPR Compliant</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-500" />
                            <span>Data Encryption</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-emerald-500" />
                            <span>Nigerian Servers</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews">
                  <div className="space-y-6">
                    {/* Rating Summary */}
                    <Card className="border border-slate-200">
                      <CardContent className="p-8">
                        <div className="grid md:grid-cols-2 gap-8">
                          <div className="text-center">
                            <div className="text-5xl font-bold text-slate-800 mb-2">{agentData.rating}</div>
                            <div className="flex justify-center gap-1 mb-2">
                              {[1, 2, 3, 4, 5].map((star) => (
                                <Star
                                  key={star}
                                  className={`h-5 w-5 ${
                                    star <= Math.floor(agentData.rating)
                                      ? "fill-yellow-400 text-yellow-400"
                                      : "text-slate-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <div className="text-slate-600">Based on {agentData.totalReviews} reviews</div>
                          </div>

                          <div className="space-y-2">
                            {ratingDistribution.map((rating) => (
                              <div key={rating.stars} className="flex items-center gap-3">
                                <span className="text-sm text-slate-600 w-8">{rating.stars}★</span>
                                <Progress value={rating.percentage} className="flex-1 h-2" />
                                <span className="text-sm text-slate-600 w-8">{rating.count}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Individual Reviews */}
                    <div className="space-y-4">
                      {reviews.map((review) => (
                        <Card key={review.id} className="border border-slate-200">
                          <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                              <Avatar className="h-12 w-12">
                                <AvatarImage src={review.user.avatar || "/placeholder.svg"} />
                                <AvatarFallback>
                                  {review.user.name
                                    .split(" ")
                                    .map((n) => n[0])
                                    .join("")}
                                </AvatarFallback>
                              </Avatar>

                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  <span className="font-medium text-slate-800">{review.user.name}</span>
                                  {review.user.verified && (
                                    <CheckCircle className="h-4 w-4 text-blue-500" title="Verified User" />
                                  )}
                                  <Badge variant="secondary" className="text-xs">
                                    {review.plan}
                                  </Badge>
                                  <span className="text-sm text-slate-500">• {review.date}</span>
                                </div>

                                <div className="flex items-center gap-2 mb-3">
                                  <div className="flex gap-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={`h-4 w-4 ${
                                          star <= review.rating ? "fill-yellow-400 text-yellow-400" : "text-slate-300"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                  {review.verified && (
                                    <Badge className="bg-emerald-100 text-emerald-700 text-xs">Verified Purchase</Badge>
                                  )}
                                </div>

                                <h4 className="font-medium text-slate-800 mb-2">{review.title}</h4>
                                <p className="text-slate-600 leading-relaxed mb-4">{review.content}</p>

                                <div className="flex items-center gap-4">
                                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700">
                                    <ThumbsUp className="h-4 w-4 mr-1" />
                                    Helpful ({review.helpful})
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700">
                                    <ThumbsDown className="h-4 w-4 mr-1" />
                                    Not helpful
                                  </Button>
                                  <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-700">
                                    <MessageSquare className="h-4 w-4 mr-1" />
                                    Reply
                                  </Button>
                                </div>
                              </div>

                              <Button variant="ghost" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                    </div>

                    <div className="text-center">
                      <Button variant="outline" className="bg-transparent">
                        Load More Reviews
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                {/* Support Tab */}
                <TabsContent value="support">
                  <Card className="border border-slate-200">
                    <CardContent className="p-8">
                      <h3 className="text-xl font-semibold text-slate-800 mb-6">Support & Documentation</h3>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                            <Code className="h-6 w-6 text-blue-500" />
                            <div>
                              <h4 className="font-medium text-slate-800">API Documentation</h4>
                              <p className="text-sm text-slate-600">Complete integration guide and API reference</p>
                            </div>
                            <ExternalLink className="h-4 w-4 text-slate-400 ml-auto" />
                          </div>

                          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                            <Play className="h-6 w-6 text-emerald-500" />
                            <div>
                              <h4 className="font-medium text-slate-800">Video Tutorials</h4>
                              <p className="text-sm text-slate-600">Step-by-step setup and configuration guides</p>
                            </div>
                            <ExternalLink className="h-4 w-4 text-slate-400 ml-auto" />
                          </div>

                          <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-lg">
                            <MessageSquare className="h-6 w-6 text-purple-500" />
                            <div>
                              <h4 className="font-medium text-slate-800">Community Forum</h4>
                              <p className="text-sm text-slate-600">Connect with other users and get help</p>
                            </div>
                            <ExternalLink className="h-4 w-4 text-slate-400 ml-auto" />
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="p-4 border border-slate-200 rounded-lg">
                            <h4 className="font-medium text-slate-800 mb-2">Support Response Times</h4>
                            <div className="space-y-2 text-sm">
                              <div className="flex justify-between">
                                <span className="text-slate-600">Email Support:</span>
                                <span className="font-medium">Within 2 hours</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">Live Chat:</span>
                                <span className="font-medium">Instant</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-slate-600">Phone Support:</span>
                                <span className="font-medium">Business hours</span>
                              </div>
                            </div>
                          </div>

                          <div className="p-4 bg-blue-50 rounded-lg">
                            <h4 className="font-medium text-blue-900 mb-2">Need Help?</h4>
                            <p className="text-sm text-blue-700 mb-3">
                              Our support team is ready to help you get started with this agent.
                            </p>
                            <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                              Contact Support
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Purchase Card */}
              <Card className="border border-slate-200 sticky top-24">
                <CardContent className="p-6">
                  <div className="mb-6">
                    <div className="flex items-center gap-2 mb-2">
                      <h1 className="text-2xl font-bold text-slate-800">{agentData.name}</h1>
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                        {agentData.category}
                      </Badge>
                    </div>
                    <p className="text-slate-600 mb-4">{agentData.shortDescription}</p>

                    <div className="flex items-center gap-4 mb-4">
                      <div className="flex items-center gap-1">
                        <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{agentData.rating}</span>
                        <span className="text-slate-500">({agentData.totalReviews})</span>
                      </div>
                      <div className="flex items-center gap-1 text-slate-500">
                        <Download className="h-4 w-4" />
                        <span>{agentData.totalSales} sales</span>
                      </div>
                    </div>
                  </div>

                  {/* Pricing Plans */}
                  <div className="space-y-4 mb-6">
                    <h3 className="font-semibold text-slate-800">Choose Your Plan</h3>
                    {agentData.pricingPlans.map((plan, index) => (
                      <div
                        key={index}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-colors ${
                          selectedPlan === index
                            ? "border-blue-500 bg-blue-50"
                            : "border-slate-200 hover:border-slate-300"
                        }`}
                        onClick={() => setSelectedPlan(index)}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            <span className="font-medium text-slate-800">{plan.name}</span>
                            {plan.popular && <Badge className="bg-emerald-500 text-white text-xs">Popular</Badge>}
                          </div>
                          <div className="text-right">
                            <span className="text-xl font-bold text-slate-800">₦{plan.price.toLocaleString()}</span>
                            <span className="text-slate-500">/{plan.period}</span>
                          </div>
                        </div>
                        <ul className="text-sm text-slate-600 space-y-1">
                          {plan.features.slice(0, 2).map((feature, fIndex) => (
                            <li key={fIndex} className="flex items-center gap-2">
                              <CheckCircle className="h-3 w-3 text-emerald-500" />
                              {feature}
                            </li>
                          ))}
                          {plan.features.length > 2 && (
                            <li className="text-blue-600">+{plan.features.length - 2} more features</li>
                          )}
                        </ul>
                      </div>
                    ))}
                  </div>

                  {/* Action Buttons */}
                  <div className="space-y-3">
                    {agentData.hasFreeTrial && (
                      <Button className="w-full bg-emerald-600 hover:bg-emerald-700" size="lg">
                        <Zap className="h-4 w-4 mr-2" />
                        Start {agentData.freeTrialDays}-Day Free Trial
                      </Button>
                    )}
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      size="lg"
                      onClick={() => setShowPurchaseModal(true)}
                    >
                      Purchase Now - ₦{agentData.pricingPlans[selectedPlan].price.toLocaleString()}
                    </Button>
                    <Button variant="outline" className="w-full bg-transparent" size="lg">
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Contact Seller
                    </Button>
                  </div>

                  {/* Trust Indicators */}
                  <div className="mt-6 pt-6 border-t border-slate-200">
                    <div className="flex items-center gap-4 text-sm text-slate-600">
                      <div className="flex items-center gap-1">
                        <Shield className="h-4 w-4 text-emerald-500" />
                        <span>Secure Payment</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4 text-blue-500" />
                        <span>Instant Access</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Seller Info */}
              <Card className="border border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg">Seller Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4 mb-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage src={agentData.seller.avatar || "/placeholder.svg"} />
                      <AvatarFallback>
                        {agentData.seller.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-slate-800">{agentData.seller.name}</h3>
                        {agentData.seller.verified && (
                          <CheckCircle className="h-4 w-4 text-blue-500" title="Verified Seller" />
                        )}
                      </div>
                      <div className="flex items-center gap-1 mb-2">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{agentData.seller.rating}</span>
                        <span className="text-sm text-slate-500">seller rating</span>
                      </div>
                      <p className="text-sm text-slate-600">{agentData.seller.location}</p>
                    </div>
                  </div>

                  <p className="text-sm text-slate-600 mb-4">{agentData.seller.description}</p>

                  <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
                    <div>
                      <span className="text-slate-500">Total Agents:</span>
                      <span className="font-medium text-slate-800 ml-1">{agentData.seller.totalAgents}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Total Sales:</span>
                      <span className="font-medium text-slate-800 ml-1">{agentData.seller.totalSales}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Joined:</span>
                      <span className="font-medium text-slate-800 ml-1">{agentData.seller.joinedDate}</span>
                    </div>
                    <div>
                      <span className="text-slate-500">Response:</span>
                      <span className="font-medium text-slate-800 ml-1">{agentData.seller.responseTime}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <Link href={`/seller/${agentData.seller.id}`} className="flex-1">
                      <Button variant="outline" className="w-full bg-transparent">
                        View Profile
                      </Button>
                    </Link>
                    <Button variant="outline" className="bg-transparent">
                      <MessageSquare className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Related Agents */}
              <Card className="border border-slate-200">
                <CardHeader>
                  <CardTitle className="text-lg">Related Agents</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {relatedAgents.map((agent) => (
                    <Link key={agent.id} href={`/agent/${agent.id}`}>
                      <div className="flex gap-3 p-3 rounded-lg hover:bg-slate-50 transition-colors cursor-pointer">
                        <img
                          src={agent.image || "/placeholder.svg"}
                          alt={agent.name}
                          className="w-16 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-slate-800 text-sm mb-1">{agent.name}</h4>
                          <p className="text-xs text-slate-500 mb-1">by {agent.seller}</p>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1">
                              <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                              <span className="text-xs font-medium">{agent.rating}</span>
                              <span className="text-xs text-slate-500">({agent.reviews})</span>
                            </div>
                            <span className="text-sm font-bold text-slate-800">₦{agent.price.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Purchase Modal */}
      <PurchaseModal
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        agent={agentData}
        selectedPlan={agentData.pricingPlans[selectedPlan]}
      />
    </div>
  )
}
