export interface UserUsagePattern {
  userId: string
  agentCategories: { [category: string]: number }
  usageHours: { [agentId: string]: number }
  spendingPattern: { [priceRange: string]: number }
  timeOfDayUsage: { [hour: string]: number }
  featureUsage: { [feature: string]: number }
  ratingHistory: { [agentId: string]: number }
}

export interface Agent {
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

export interface RecommendationScore {
  agentId: string
  score: number
  reasons: string[]
  confidence: number
  category: "trending" | "similar_usage" | "category_match" | "feature_match" | "price_match"
}

export class RecommendationEngine {
  private static instance: RecommendationEngine
  private userPatterns: Map<string, UserUsagePattern> = new Map()
  private agents: Agent[] = []

  static getInstance(): RecommendationEngine {
    if (!RecommendationEngine.instance) {
      RecommendationEngine.instance = new RecommendationEngine()
    }
    return RecommendationEngine.instance
  }

  // Initialize with sample data
  constructor() {
    this.initializeSampleData()
  }

  private initializeSampleData() {
    // Sample agents data
    this.agents = [
      {
        id: "1",
        name: "EmailMarketer Pro",
        category: "Email Marketing",
        price: 25000,
        rating: 4.8,
        reviews: 234,
        features: ["automation", "analytics", "templates", "segmentation"],
        description: "Advanced email marketing automation with AI-powered personalization",
        image: "/placeholder.svg?height=60&width=60",
        tags: ["marketing", "automation", "email", "analytics"],
        complexity: "intermediate",
        useCases: ["lead nurturing", "customer retention", "product launches"],
      },
      {
        id: "2",
        name: "SocialMedia Manager",
        category: "Social Media",
        price: 30000,
        rating: 4.7,
        reviews: 189,
        features: ["scheduling", "analytics", "content_creation", "engagement"],
        description: "Comprehensive social media management across all platforms",
        image: "/placeholder.svg?height=60&width=60",
        tags: ["social", "content", "scheduling", "analytics"],
        complexity: "beginner",
        useCases: ["brand awareness", "community management", "content distribution"],
      },
      {
        id: "3",
        name: "SEO Optimizer",
        category: "SEO & Marketing",
        price: 40000,
        rating: 4.9,
        reviews: 156,
        features: ["keyword_research", "content_optimization", "backlink_analysis", "reporting"],
        description: "AI-powered SEO optimization for better search rankings",
        image: "/placeholder.svg?height=60&width=60",
        tags: ["seo", "optimization", "keywords", "analytics"],
        complexity: "advanced",
        useCases: ["organic traffic", "search rankings", "content strategy"],
      },
      {
        id: "4",
        name: "ChatBot Builder",
        category: "Customer Service",
        price: 35000,
        rating: 4.6,
        reviews: 298,
        features: ["nlp", "integration", "analytics", "customization"],
        description: "Build intelligent chatbots for customer support",
        image: "/placeholder.svg?height=60&width=60",
        tags: ["chatbot", "customer_service", "automation", "nlp"],
        complexity: "intermediate",
        useCases: ["customer support", "lead qualification", "faq automation"],
      },
      {
        id: "5",
        name: "Content Generator",
        category: "Content Creation",
        price: 20000,
        rating: 4.5,
        reviews: 412,
        features: ["ai_writing", "templates", "seo_optimization", "plagiarism_check"],
        description: "Generate high-quality content with AI assistance",
        image: "/placeholder.svg?height=60&width=60",
        tags: ["content", "writing", "ai", "seo"],
        complexity: "beginner",
        useCases: ["blog writing", "social posts", "product descriptions"],
      },
      {
        id: "6",
        name: "Analytics Dashboard",
        category: "Analytics",
        price: 45000,
        rating: 4.8,
        reviews: 167,
        features: ["data_visualization", "reporting", "integration", "alerts"],
        description: "Comprehensive analytics and reporting dashboard",
        image: "/placeholder.svg?height=60&width=60",
        tags: ["analytics", "reporting", "data", "visualization"],
        complexity: "advanced",
        useCases: ["business intelligence", "performance tracking", "data analysis"],
      },
      {
        id: "7",
        name: "Lead Generator",
        category: "Sales Automation",
        price: 38000,
        rating: 4.7,
        reviews: 203,
        features: ["lead_scoring", "automation", "crm_integration", "analytics"],
        description: "Automated lead generation and qualification system",
        image: "/placeholder.svg?height=60&width=60",
        tags: ["leads", "sales", "automation", "crm"],
        complexity: "intermediate",
        useCases: ["lead generation", "sales pipeline", "prospect research"],
      },
      {
        id: "8",
        name: "Voice Assistant",
        category: "Voice Technology",
        price: 50000,
        rating: 4.4,
        reviews: 89,
        features: ["voice_recognition", "nlp", "integration", "customization"],
        description: "Custom voice assistant for business applications",
        image: "/placeholder.svg?height=60&width=60",
        tags: ["voice", "assistant", "nlp", "automation"],
        complexity: "advanced",
        useCases: ["voice commands", "accessibility", "hands-free operation"],
      },
    ]

    // Sample user pattern
    this.userPatterns.set("user123", {
      userId: "user123",
      agentCategories: {
        "Customer Service": 45,
        "Sales Automation": 30,
        "Content Creation": 25,
        "Email Marketing": 15,
        Analytics: 10,
      },
      usageHours: {
        "1": 85, // CustomerCare Pro
        "2": 92, // SalesBot Nigeria
        "3": 45, // ContentCreator AI
        "4": 78, // DataAnalyzer Pro
      },
      spendingPattern: {
        "0-25000": 2,
        "25000-50000": 4,
        "50000+": 2,
      },
      timeOfDayUsage: {
        "9": 20,
        "10": 35,
        "11": 40,
        "14": 30,
        "15": 25,
        "16": 15,
      },
      featureUsage: {
        automation: 85,
        analytics: 70,
        integration: 60,
        customization: 45,
        reporting: 55,
      },
      ratingHistory: {
        "1": 4.9,
        "2": 4.8,
        "3": 4.7,
        "4": 4.6,
      },
    })
  }

  // Main recommendation method
  getRecommendations(userId: string, limit = 6): RecommendationScore[] {
    const userPattern = this.userPatterns.get(userId)
    if (!userPattern) {
      return this.getTrendingRecommendations(limit)
    }

    const scores: RecommendationScore[] = []

    // Get user's current agents to exclude from recommendations
    const currentAgentIds = Object.keys(userPattern.usageHours)

    for (const agent of this.agents) {
      if (currentAgentIds.includes(agent.id)) continue

      const score = this.calculateRecommendationScore(agent, userPattern)
      scores.push(score)
    }

    // Sort by score and return top recommendations
    return scores.sort((a, b) => b.score - a.score).slice(0, limit)
  }

  private calculateRecommendationScore(agent: Agent, userPattern: UserUsagePattern): RecommendationScore {
    let score = 0
    const reasons: string[] = []
    let confidence = 0

    // Category preference scoring (40% weight)
    const categoryScore = (userPattern.agentCategories[agent.category] || 0) / 100
    score += categoryScore * 0.4
    if (categoryScore > 0.3) {
      reasons.push(`Popular in ${agent.category} category`)
      confidence += 0.3
    }

    // Feature matching (25% weight)
    const featureMatches = agent.features.filter(
      (feature) => userPattern.featureUsage[feature] && userPattern.featureUsage[feature] > 50,
    )
    const featureScore = featureMatches.length / agent.features.length
    score += featureScore * 0.25
    if (featureMatches.length > 0) {
      reasons.push(`Matches your ${featureMatches.join(", ")} usage`)
      confidence += 0.25
    }

    // Price range preference (15% weight)
    const priceRange = this.getPriceRange(agent.price)
    const priceScore = (userPattern.spendingPattern[priceRange] || 0) / 10
    score += Math.min(priceScore, 1) * 0.15
    if (priceScore > 0.5) {
      reasons.push(`Fits your budget range`)
      confidence += 0.15
    }

    // Rating and popularity (10% weight)
    const popularityScore = (agent.rating / 5) * (Math.log(agent.reviews + 1) / 10)
    score += popularityScore * 0.1
    if (agent.rating >= 4.5) {
      reasons.push(`Highly rated (${agent.rating}★)`)
      confidence += 0.1
    }

    // Complexity matching (10% weight)
    const complexityScore = this.getComplexityScore(agent.complexity, userPattern)
    score += complexityScore * 0.1
    if (complexityScore > 0.7) {
      reasons.push(`Matches your experience level`)
      confidence += 0.1
    }

    // Determine category
    let category: RecommendationScore["category"] = "similar_usage"
    if (categoryScore > 0.5) category = "category_match"
    else if (featureScore > 0.6) category = "feature_match"
    else if (priceScore > 0.7) category = "price_match"
    else if (agent.reviews > 200) category = "trending"

    return {
      agentId: agent.id,
      score: Math.min(score, 1),
      reasons: reasons.slice(0, 3), // Limit to top 3 reasons
      confidence: Math.min(confidence, 1),
      category,
    }
  }

  private getPriceRange(price: number): string {
    if (price <= 25000) return "0-25000"
    if (price <= 50000) return "25000-50000"
    return "50000+"
  }

  private getComplexityScore(agentComplexity: string, userPattern: UserUsagePattern): number {
    // Determine user's experience level based on usage patterns
    const totalUsage = Object.values(userPattern.usageHours).reduce((sum, hours) => sum + hours, 0)
    const avgRating =
      Object.values(userPattern.ratingHistory).reduce((sum, rating) => sum + rating, 0) /
      Object.values(userPattern.ratingHistory).length

    let userLevel: string
    if (totalUsage > 200 && avgRating > 4.5) userLevel = "advanced"
    else if (totalUsage > 100) userLevel = "intermediate"
    else userLevel = "beginner"

    // Score based on complexity match
    if (userLevel === agentComplexity) return 1
    if (userLevel === "intermediate" && agentComplexity !== "advanced") return 0.8
    if (userLevel === "advanced" && agentComplexity !== "beginner") return 0.8
    return 0.5
  }

  private getTrendingRecommendations(limit: number): RecommendationScore[] {
    return this.agents
      .sort((a, b) => b.reviews - a.reviews)
      .slice(0, limit)
      .map((agent) => ({
        agentId: agent.id,
        score: agent.rating / 5,
        reasons: [`Trending with ${agent.reviews} reviews`, `${agent.rating}★ rating`],
        confidence: 0.7,
        category: "trending" as const,
      }))
  }

  // Get agent by ID
  getAgentById(id: string): Agent | undefined {
    return this.agents.find((agent) => agent.id === id)
  }

  // Get recommendations with full agent data
  getRecommendationsWithAgents(userId: string, limit = 6) {
    const recommendations = this.getRecommendations(userId, limit)
    return recommendations.map((rec) => ({
      ...rec,
      agent: this.getAgentById(rec.agentId)!,
    }))
  }

  // Update user pattern (called when user interacts with agents)
  updateUserPattern(userId: string, updates: Partial<UserUsagePattern>) {
    const existing = this.userPatterns.get(userId) || {
      userId,
      agentCategories: {},
      usageHours: {},
      spendingPattern: {},
      timeOfDayUsage: {},
      featureUsage: {},
      ratingHistory: {},
    }

    this.userPatterns.set(userId, { ...existing, ...updates })
  }

  // Get category-based recommendations
  getCategoryRecommendations(category: string, limit = 4): Agent[] {
    return this.agents
      .filter((agent) => agent.category === category)
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)
  }

  // Get similar agents based on features
  getSimilarAgents(agentId: string, limit = 3): Agent[] {
    const targetAgent = this.getAgentById(agentId)
    if (!targetAgent) return []

    return this.agents
      .filter((agent) => agent.id !== agentId)
      .map((agent) => ({
        agent,
        similarity: this.calculateSimilarity(targetAgent, agent),
      }))
      .sort((a, b) => b.similarity - a.similarity)
      .slice(0, limit)
      .map((item) => item.agent)
  }

  private calculateSimilarity(agent1: Agent, agent2: Agent): number {
    let similarity = 0

    // Category match
    if (agent1.category === agent2.category) similarity += 0.4

    // Feature overlap
    const commonFeatures = agent1.features.filter((f) => agent2.features.includes(f))
    similarity += (commonFeatures.length / Math.max(agent1.features.length, agent2.features.length)) * 0.3

    // Price similarity
    const priceDiff = Math.abs(agent1.price - agent2.price) / Math.max(agent1.price, agent2.price)
    similarity += (1 - priceDiff) * 0.2

    // Complexity match
    if (agent1.complexity === agent2.complexity) similarity += 0.1

    return similarity
  }
}

// Export singleton instance
export const recommendationEngine = RecommendationEngine.getInstance()
