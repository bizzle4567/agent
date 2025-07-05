import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Users, Target, Zap, Shield, Heart, Globe, Award, TrendingUp } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

const teamMembers = [
  {
    name: "Adebayo Ogundimu",
    role: "CEO & Co-Founder",
    bio: "Former Microsoft AI researcher with 10+ years in enterprise software. Passionate about democratizing AI for African businesses.",
    image: "/placeholder.svg?height=120&width=120",
    linkedin: "#",
  },
  {
    name: "Kemi Adebisi",
    role: "CTO & Co-Founder",
    bio: "Ex-Google engineer specializing in machine learning infrastructure. Built scalable AI systems serving millions of users.",
    image: "/placeholder.svg?height=120&width=120",
    linkedin: "#",
  },
  {
    name: "Chinedu Okoro",
    role: "Head of Product",
    bio: "Product leader with experience at Paystack and Flutterwave. Expert in building user-centric fintech and AI products.",
    image: "/placeholder.svg?height=120&width=120",
    linkedin: "#",
  },
  {
    name: "Fatima Hassan",
    role: "Head of Marketing",
    bio: "Growth marketing specialist who scaled multiple Nigerian startups. Passionate about connecting technology with local markets.",
    image: "/placeholder.svg?height=120&width=120",
    linkedin: "#",
  },
  {
    name: "Tunde Bakare",
    role: "Head of Engineering",
    bio: "Full-stack engineer with expertise in distributed systems. Previously built infrastructure at Interswitch and Andela.",
    image: "/placeholder.svg?height=120&width=120",
    linkedin: "#",
  },
  {
    name: "Amina Yusuf",
    role: "Head of Customer Success",
    bio: "Customer experience expert with deep understanding of Nigerian business needs. Former operations lead at Jumia.",
    image: "/placeholder.svg?height=120&width=120",
    linkedin: "#",
  },
]

const values = [
  {
    icon: <Heart className="h-8 w-8 text-red-500" />,
    title: "Nigerian-First",
    description:
      "We understand the unique challenges and opportunities of the Nigerian market, building solutions that truly serve our community.",
  },
  {
    icon: <Shield className="h-8 w-8 text-blue-500" />,
    title: "Trust & Security",
    description:
      "Every agent is thoroughly vetted, and all transactions are secured with enterprise-grade encryption and fraud protection.",
  },
  {
    icon: <Users className="h-8 w-8 text-emerald-500" />,
    title: "Community Driven",
    description:
      "Our platform thrives on the collective intelligence of developers, businesses, and AI enthusiasts working together.",
  },
  {
    icon: <Zap className="h-8 w-8 text-yellow-500" />,
    title: "Innovation",
    description:
      "We're constantly pushing the boundaries of what's possible with AI, bringing cutting-edge technology to everyday businesses.",
  },
]

const milestones = [
  {
    year: "2023",
    title: "Company Founded",
    description: "9jaAgents was born from the vision to democratize AI for Nigerian businesses",
  },
  {
    year: "2023",
    title: "First 100 Agents",
    description: "Reached our first milestone with 100 AI agents across 10 categories",
  },
  {
    year: "2024",
    title: "₦1B in Transactions",
    description: "Processed over ₦1 billion in AI agent transactions, empowering thousands of businesses",
  },
  {
    year: "2024",
    title: "500+ Agents",
    description: "Expanded to 500+ AI agents with presence in all major Nigerian cities",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-20 px-4 bg-gradient-to-br from-blue-50 via-purple-50 to-emerald-50">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border border-emerald-200 hover:from-emerald-200 hover:to-teal-200">
              About 9jaAgents
            </Badge>
            <h1 className="text-5xl font-bold text-slate-800 mb-6">
              Empowering Nigeria with{" "}
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-emerald-600 bg-clip-text text-transparent">
                Intelligent Automation
              </span>
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed max-w-3xl mx-auto">
              We're building the future of work in Nigeria by making AI accessible, affordable, and tailored to local
              business needs. Our platform connects innovative AI solutions with the entrepreneurs and enterprises
              driving Nigeria's digital transformation.
            </p>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-20 px-4">
          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-slate-800 mb-6">Our Mission</h2>
                <p className="text-lg text-slate-600 leading-relaxed mb-8">
                  To democratize artificial intelligence for Nigerian businesses by providing a trusted marketplace
                  where entrepreneurs can discover, deploy, and benefit from AI-powered solutions that understand our
                  unique market dynamics, languages, and business culture.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-blue-600 mb-2">500+</div>
                    <div className="text-sm text-slate-600">AI Agents</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-emerald-600 mb-2">10K+</div>
                    <div className="text-sm text-slate-600">Businesses Served</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600 mb-2">₦2.4B</div>
                    <div className="text-sm text-slate-600">Platform Revenue</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-orange-600 mb-2">36</div>
                    <div className="text-sm text-slate-600">States Covered</div>
                  </div>
                </div>
              </div>
              <div className="relative">
                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl p-8 h-96 flex items-center justify-center">
                  <div className="grid grid-cols-3 gap-4">
                    {[Target, Users, Globe, Zap, Award, TrendingUp].map((Icon, i) => (
                      <div key={i} className="w-16 h-16 bg-white rounded-xl flex items-center justify-center shadow-lg">
                        <Icon className="h-8 w-8 text-blue-600" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Our Values</h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                The principles that guide everything we do and every decision we make
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="border border-slate-200 hover:shadow-lg transition-shadow text-center">
                  <CardContent className="p-8">
                    <div className="flex justify-center mb-6">{value.icon}</div>
                    <h3 className="text-xl font-semibold text-slate-800 mb-4">{value.title}</h3>
                    <p className="text-slate-600 leading-relaxed">{value.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Timeline */}
        <section className="py-20 px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Our Journey</h2>
              <p className="text-xl text-slate-600">Key milestones in building Nigeria's AI marketplace</p>
            </div>

            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-8 items-center">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold">
                      {milestone.year}
                    </div>
                  </div>
                  <Card className="flex-1 border border-slate-200">
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold text-slate-800 mb-2">{milestone.title}</h3>
                      <p className="text-slate-600">{milestone.description}</p>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 px-4 bg-slate-50">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-slate-800 mb-4">Meet Our Team</h2>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Passionate professionals dedicated to transforming how Nigerian businesses leverage AI
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <Card key={index} className="border border-slate-200 hover:shadow-lg transition-shadow">
                  <CardContent className="p-8 text-center">
                    <Avatar className="h-24 w-24 mx-auto mb-6">
                      <AvatarImage src={member.image || "/placeholder.svg"} />
                      <AvatarFallback className="text-lg">
                        {member.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="text-xl font-semibold text-slate-800 mb-2">{member.name}</h3>
                    <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                    <p className="text-slate-600 text-sm leading-relaxed">{member.bio}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-purple-600">
          <div className="max-w-4xl mx-auto text-center text-white">
            <h2 className="text-3xl font-bold mb-4">Ready to Join the AI Revolution?</h2>
            <p className="text-xl mb-8 opacity-90">
              Whether you're looking to deploy AI solutions or build and sell your own agents, we're here to support
              your journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/marketplace">
                <Button size="lg" className="bg-white text-blue-600 hover:bg-slate-100 px-8">
                  Explore Marketplace
                </Button>
              </Link>
              <Link href="/contact">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-blue-600 px-8 bg-transparent"
                >
                  Get in Touch
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
