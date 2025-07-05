"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {
  Search,
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  FileText,
  Video,
  Users,
  Clock,
  CheckCircle,
  ArrowRight,
  Book,
  Headphones,
} from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

const faqCategories = [
  {
    title: "Getting Started",
    faqs: [
      {
        question: "How do I create an account on 9jaAgents?",
        answer:
          "Creating an account is simple! Click the 'Sign Up' button in the top right corner, fill in your details, and verify your email address. You can also sign up using your Google account for faster registration.",
      },
      {
        question: "What types of AI agents are available?",
        answer:
          "We offer AI agents across multiple categories including Customer Service, Sales Automation, Content Creation, Data Analysis, Marketing, Finance, HR, E-commerce, Legal, and Operations. Each agent is designed to solve specific business challenges.",
      },
      {
        question: "How do I purchase an AI agent?",
        answer:
          "Browse our marketplace, select an agent that fits your needs, click 'View Details' to learn more, then click 'Purchase'. You can pay using bank transfer, card payment, or mobile money. After payment, you'll receive setup instructions.",
      },
      {
        question: "Is there a free trial available?",
        answer:
          "Many of our AI agents offer free trials ranging from 7 to 30 days. Look for the 'Free Trial' badge on agent listings. During the trial, you'll have full access to test the agent's capabilities before making a purchase decision.",
      },
    ],
  },
  {
    title: "Payments & Billing",
    faqs: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept various payment methods including Nigerian bank transfers, debit/credit cards (Visa, Mastercard), mobile money (MTN, Airtel, Glo, 9mobile), and digital wallets like Paystack and Flutterwave.",
      },
      {
        question: "Are there any hidden fees?",
        answer:
          "No hidden fees! The price you see is what you pay. We're transparent about all costs including any applicable taxes. Some premium features or additional usage beyond included limits may incur extra charges, which are clearly stated.",
      },
      {
        question: "Can I get a refund?",
        answer:
          "Yes, we offer a 30-day money-back guarantee for most agents. If you're not satisfied with your purchase, contact our support team within 30 days for a full refund. Custom-built agents may have different refund terms.",
      },
      {
        question: "How does billing work for subscription agents?",
        answer:
          "Subscription agents are billed monthly or annually based on your chosen plan. You'll receive email notifications before each billing cycle. You can upgrade, downgrade, or cancel your subscription anytime from your dashboard.",
      },
    ],
  },
  {
    title: "Technical Support",
    faqs: [
      {
        question: "How do I integrate an AI agent with my existing systems?",
        answer:
          "Most agents come with detailed integration guides and API documentation. Our technical support team can assist with setup, and many sellers offer implementation services. We also have video tutorials and code examples available.",
      },
      {
        question: "What if an agent stops working?",
        answer:
          "If you experience issues with an agent, first check our troubleshooting guide. If the problem persists, contact the agent seller directly or our support team. We guarantee 99.9% uptime and will work quickly to resolve any issues.",
      },
      {
        question: "Can I customize an AI agent for my specific needs?",
        answer:
          "Many agents offer customization options, and some sellers provide custom development services. You can also post a request in our marketplace for developers to create a bespoke solution for your business requirements.",
      },
      {
        question: "Do you provide training on how to use the agents?",
        answer:
          "Yes! We offer comprehensive training resources including video tutorials, documentation, webinars, and one-on-one training sessions. Many agent sellers also provide training as part of their service package.",
      },
    ],
  },
  {
    title: "Selling on 9jaAgents",
    faqs: [
      {
        question: "How do I become a seller on 9jaAgents?",
        answer:
          "To become a seller, apply through our seller program. You'll need to provide business information, demonstrate your AI expertise, and submit sample agents for review. Once approved, you can start listing your agents on our marketplace.",
      },
      {
        question: "What commission does 9jaAgents charge?",
        answer:
          "We charge a competitive commission rate of 15-25% depending on your seller tier and sales volume. Higher-volume sellers get reduced rates. There are no upfront fees - you only pay when you make sales.",
      },
      {
        question: "How do I get paid for my sales?",
        answer:
          "Payments are processed weekly to your registered Nigerian bank account. You can track your earnings in real-time through your seller dashboard. We handle all payment processing and customer billing on your behalf.",
      },
      {
        question: "What support do you provide to sellers?",
        answer:
          "We provide marketing support, technical assistance, seller training programs, and dedicated account management for top performers. You'll also have access to analytics tools and promotional opportunities.",
      },
    ],
  },
]

const supportChannels = [
  {
    icon: <MessageSquare className="h-8 w-8 text-blue-500" />,
    title: "Live Chat",
    description: "Get instant help from our support team",
    availability: "24/7 Available",
    action: "Start Chat",
    href: "#",
  },
  {
    icon: <Mail className="h-8 w-8 text-emerald-500" />,
    title: "Email Support",
    description: "Send us detailed questions and get comprehensive answers",
    availability: "Response within 2 hours",
    action: "Send Email",
    href: "mailto:support@9jaagents.com",
  },
  {
    icon: <Phone className="h-8 w-8 text-purple-500" />,
    title: "Phone Support",
    description: "Speak directly with our technical experts",
    availability: "Mon-Fri, 8AM-6PM WAT",
    action: "Call Now",
    href: "tel:+2341234567890",
  },
  {
    icon: <Users className="h-8 w-8 text-orange-500" />,
    title: "Community Forum",
    description: "Connect with other users and share experiences",
    availability: "Always Active",
    action: "Join Forum",
    href: "#",
  },
]

const resources = [
  {
    icon: <Book className="h-6 w-6 text-blue-500" />,
    title: "Documentation",
    description: "Comprehensive guides and API references",
    href: "#",
  },
  {
    icon: <Video className="h-6 w-6 text-emerald-500" />,
    title: "Video Tutorials",
    description: "Step-by-step video guides for all features",
    href: "#",
  },
  {
    icon: <FileText className="h-6 w-6 text-purple-500" />,
    title: "Best Practices",
    description: "Learn from successful implementations",
    href: "#",
  },
  {
    icon: <Headphones className="h-6 w-6 text-orange-500" />,
    title: "Webinars",
    description: "Live training sessions and Q&A",
    href: "#",
  },
]

export default function HelpPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    category: "general",
  })

  const filteredFAQs = faqCategories.map((category) => ({
    ...category,
    faqs: category.faqs.filter(
      (faq) =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase()),
    ),
  }))

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Contact form submitted:", contactForm)
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <Header />

      <div className="pt-20 pb-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center">
                <HelpCircle className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-slate-800 mb-4">Help & Support</h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Get the help you need to make the most of 9jaAgents. Find answers, get support, and learn best practices.
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
              <Input
                placeholder="Search for help articles, FAQs, and guides..."
                className="pl-12 h-14 text-lg border-slate-200 rounded-xl focus:border-blue-500 bg-white shadow-sm"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>

          {/* Support Channels */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {supportChannels.map((channel, index) => (
              <Card key={index} className="border border-slate-200 hover:shadow-lg transition-shadow text-center">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-4">{channel.icon}</div>
                  <h3 className="text-lg font-semibold text-slate-800 mb-2">{channel.title}</h3>
                  <p className="text-slate-600 text-sm mb-3">{channel.description}</p>
                  <div className="flex items-center justify-center gap-1 text-xs text-slate-500 mb-4">
                    <Clock className="h-3 w-3" />
                    {channel.availability}
                  </div>
                  <Link href={channel.href}>
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">{channel.action}</Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Main Content */}
          <Tabs defaultValue="faq" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 bg-white border border-slate-200 rounded-xl p-1">
              <TabsTrigger value="faq" className="rounded-lg">
                Frequently Asked Questions
              </TabsTrigger>
              <TabsTrigger value="resources" className="rounded-lg">
                Resources & Guides
              </TabsTrigger>
              <TabsTrigger value="contact" className="rounded-lg">
                Contact Support
              </TabsTrigger>
            </TabsList>

            {/* FAQ Section */}
            <TabsContent value="faq">
              <div className="space-y-8">
                {filteredFAQs.map((category, categoryIndex) => (
                  <Card key={categoryIndex} className="border border-slate-200">
                    <CardHeader>
                      <CardTitle className="text-xl flex items-center gap-2">
                        <CheckCircle className="h-5 w-5 text-emerald-500" />
                        {category.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Accordion type="single" collapsible className="space-y-2">
                        {category.faqs.map((faq, faqIndex) => (
                          <AccordionItem
                            key={faqIndex}
                            value={`${categoryIndex}-${faqIndex}`}
                            className="border border-slate-200 rounded-lg px-4"
                          >
                            <AccordionTrigger className="text-left hover:no-underline">{faq.question}</AccordionTrigger>
                            <AccordionContent className="text-slate-600 leading-relaxed">{faq.answer}</AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Resources Section */}
            <TabsContent value="resources">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-800">Learning Resources</h2>
                  <div className="space-y-4">
                    {resources.map((resource, index) => (
                      <Link key={index} href={resource.href}>
                        <Card className="border border-slate-200 hover:shadow-lg transition-shadow cursor-pointer">
                          <CardContent className="p-6">
                            <div className="flex items-center gap-4">
                              {resource.icon}
                              <div>
                                <h3 className="font-semibold text-slate-800">{resource.title}</h3>
                                <p className="text-sm text-slate-600">{resource.description}</p>
                              </div>
                              <ArrowRight className="h-5 w-5 text-slate-400 ml-auto" />
                            </div>
                          </CardContent>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className="space-y-6">
                  <h2 className="text-2xl font-bold text-slate-800">Quick Links</h2>
                  <Card className="border border-slate-200">
                    <CardContent className="p-6 space-y-4">
                      <Link
                        href="/marketplace"
                        className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        <span className="font-medium text-slate-800">Browse Marketplace</span>
                        <ArrowRight className="h-4 w-4 text-slate-600" />
                      </Link>
                      <Link
                        href="/dashboard"
                        className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        <span className="font-medium text-slate-800">My Dashboard</span>
                        <ArrowRight className="h-4 w-4 text-slate-600" />
                      </Link>
                      <Link
                        href="/about"
                        className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        <span className="font-medium text-slate-800">About 9jaAgents</span>
                        <ArrowRight className="h-4 w-4 text-slate-600" />
                      </Link>
                      <Link
                        href="/terms"
                        className="flex items-center justify-between p-3 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors"
                      >
                        <span className="font-medium text-slate-800">Terms of Service</span>
                        <ArrowRight className="h-4 w-4 text-slate-600" />
                      </Link>
                    </CardContent>
                  </Card>

                  <Card className="border border-slate-200 bg-gradient-to-br from-blue-50 to-purple-50">
                    <CardContent className="p-6 text-center">
                      <h3 className="text-lg font-semibold text-slate-800 mb-2">Need Personal Assistance?</h3>
                      <p className="text-slate-600 text-sm mb-4">
                        Our expert team is ready to help you succeed with AI automation
                      </p>
                      <Button className="bg-blue-600 hover:bg-blue-700">Schedule a Call</Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* Contact Section */}
            <TabsContent value="contact">
              <div className="grid lg:grid-cols-2 gap-8">
                <Card className="border border-slate-200">
                  <CardHeader>
                    <CardTitle className="text-xl">Send us a Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleContactSubmit} className="space-y-6">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Name</label>
                          <Input
                            value={contactForm.name}
                            onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                            placeholder="Your full name"
                            required
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
                          <Input
                            type="email"
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            placeholder="your@email.com"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
                        <select
                          className="w-full p-3 border border-slate-200 rounded-lg focus:border-blue-500 focus:outline-none"
                          value={contactForm.category}
                          onChange={(e) => setContactForm({ ...contactForm, category: e.target.value })}
                        >
                          <option value="general">General Inquiry</option>
                          <option value="technical">Technical Support</option>
                          <option value="billing">Billing & Payments</option>
                          <option value="seller">Seller Support</option>
                          <option value="partnership">Partnership</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Subject</label>
                        <Input
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          placeholder="Brief description of your inquiry"
                          required
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-slate-700 mb-2">Message</label>
                        <Textarea
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          placeholder="Please provide details about your inquiry..."
                          rows={6}
                          required
                        />
                      </div>

                      <Button type="submit" className="w-full bg-blue-600 hover:bg-blue-700">
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                <div className="space-y-6">
                  <Card className="border border-slate-200">
                    <CardHeader>
                      <CardTitle className="text-xl">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-blue-500" />
                        <div>
                          <div className="font-medium text-slate-800">Email</div>
                          <div className="text-slate-600">support@9jaagents.com</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Phone className="h-5 w-5 text-emerald-500" />
                        <div>
                          <div className="font-medium text-slate-800">Phone</div>
                          <div className="text-slate-600">+234 123 456 7890</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Clock className="h-5 w-5 text-purple-500" />
                        <div>
                          <div className="font-medium text-slate-800">Business Hours</div>
                          <div className="text-slate-600">Mon-Fri: 8AM-6PM WAT</div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border border-slate-200 bg-gradient-to-br from-emerald-50 to-blue-50">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-slate-800 mb-3">Response Time</h3>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-slate-600">Live Chat:</span>
                          <Badge className="bg-emerald-100 text-emerald-700">Instant</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Email:</span>
                          <Badge className="bg-blue-100 text-blue-700">2 hours</Badge>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-600">Phone:</span>
                          <Badge className="bg-purple-100 text-purple-700">Immediate</Badge>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <Footer />
    </div>
  )
}
