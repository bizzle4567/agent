"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MessageSquare, Search, Send, Paperclip, Star, Clock, CheckCheck, Filter, Archive, Trash2 } from "lucide-react"
import SellerLayout from "@/components/seller-layout"
import { cn } from "@/lib/utils"

const conversations = [
  {
    id: 1,
    customer: {
      name: "Adebayo Ogundimu",
      email: "adebayo@techcorp.ng",
      avatar: "/placeholder.svg?height=40&width=40",
      company: "TechCorp Nigeria",
    },
    subject: "Integration support for CustomerCare Pro",
    lastMessage: "Thanks for the quick response! The integration is working perfectly now.",
    timestamp: "2 hours ago",
    status: "unread",
    priority: "high",
    agent: "CustomerCare Pro",
    messageCount: 8,
    rating: 5,
  },
  {
    id: 2,
    customer: {
      name: "Kemi Adebisi",
      email: "kemi@startupng.com",
      avatar: "/placeholder.svg?height=40&width=40",
      company: "StartupNG",
    },
    subject: "Custom training for SalesBot Nigeria",
    lastMessage: "Can we schedule a call to discuss the custom training requirements?",
    timestamp: "4 hours ago",
    status: "read",
    priority: "medium",
    agent: "SalesBot Nigeria",
    messageCount: 5,
    rating: null,
  },
  {
    id: 3,
    customer: {
      name: "Chinedu Okoro",
      email: "chinedu@ecommerce.ng",
      avatar: "/placeholder.svg?height=40&width=40",
      company: "E-commerce Solutions",
    },
    subject: "Feature request for DataAnalyzer Pro",
    lastMessage: "The new analytics dashboard looks great! When will it be available?",
    timestamp: "1 day ago",
    status: "read",
    priority: "low",
    agent: "DataAnalyzer Pro",
    messageCount: 12,
    rating: 4,
  },
  {
    id: 4,
    customer: {
      name: "Fatima Hassan",
      email: "fatima@consulting.ng",
      avatar: "/placeholder.svg?height=40&width=40",
      company: "Hassan Consulting",
    },
    subject: "Billing inquiry",
    lastMessage: "I need clarification on the recent invoice charges.",
    timestamp: "2 days ago",
    status: "unread",
    priority: "high",
    agent: "General",
    messageCount: 3,
    rating: null,
  },
  {
    id: 5,
    customer: {
      name: "Olumide Adeyemi",
      email: "olumide@fintech.ng",
      avatar: "/placeholder.svg?height=40&width=40",
      company: "FinTech Innovations",
    },
    subject: "Performance optimization tips",
    lastMessage: "The optimization tips you shared have improved our conversion rate by 25%!",
    timestamp: "3 days ago",
    status: "read",
    priority: "medium",
    agent: "CustomerCare Pro",
    messageCount: 6,
    rating: 5,
  },
]

const messageHistory = [
  {
    id: 1,
    sender: "customer",
    message:
      "Hi! I'm having trouble integrating the CustomerCare Pro agent with our existing CRM system. Can you help?",
    timestamp: "2024-01-22 09:30 AM",
    attachments: [],
  },
  {
    id: 2,
    sender: "seller",
    message:
      "Hello Adebayo! I'd be happy to help you with the CRM integration. Can you tell me which CRM system you're using?",
    timestamp: "2024-01-22 09:45 AM",
    attachments: [],
  },
  {
    id: 3,
    sender: "customer",
    message: "We're using Salesforce. I've tried following the documentation but I'm getting authentication errors.",
    timestamp: "2024-01-22 10:15 AM",
    attachments: ["error-log.txt"],
  },
  {
    id: 4,
    sender: "seller",
    message:
      "I see the issue from your error log. The API key format has changed recently. Let me send you the updated integration guide.",
    timestamp: "2024-01-22 10:30 AM",
    attachments: ["salesforce-integration-guide-v2.pdf"],
  },
  {
    id: 5,
    sender: "customer",
    message: "Thanks for the quick response! The integration is working perfectly now.",
    timestamp: "2024-01-22 11:00 AM",
    attachments: [],
  },
]

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0])
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [priorityFilter, setPriorityFilter] = useState("all")
  const [newMessage, setNewMessage] = useState("")

  const filteredConversations = conversations.filter((conversation) => {
    const matchesSearch =
      conversation.customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversation.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conversation.customer.company.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || conversation.status === statusFilter
    const matchesPriority = priorityFilter === "all" || conversation.priority === priorityFilter

    return matchesSearch && matchesStatus && matchesPriority
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high":
        return "bg-red-100 text-red-700"
      case "medium":
        return "bg-yellow-100 text-yellow-700"
      case "low":
        return "bg-green-100 text-green-700"
      default:
        return "bg-gray-100 text-gray-700"
    }
  }

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Here you would typically send the message to your backend
      console.log("Sending message:", newMessage)
      setNewMessage("")
    }
  }

  return (
    <SellerLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">Messages</h1>
            <p className="text-slate-600">Communicate with your customers and provide support.</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" className="bg-transparent">
              <Archive className="h-4 w-4 mr-2" />
              Archive
            </Button>
            <Button variant="outline" className="bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List */}
          <Card className="border border-slate-200 lg:col-span-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">Conversations</CardTitle>
                <Badge className="bg-red-100 text-red-700">
                  {conversations.filter((c) => c.status === "unread").length} unread
                </Badge>
              </div>

              {/* Search and Filters */}
              <div className="space-y-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                  <Input
                    placeholder="Search conversations..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>

                <div className="flex gap-2">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="unread">Unread</SelectItem>
                      <SelectItem value="read">Read</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                    <SelectTrigger className="flex-1">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <div className="max-h-[calc(100vh-400px)] overflow-y-auto">
                {filteredConversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={cn(
                      "p-4 border-b border-slate-100 cursor-pointer hover:bg-slate-50 transition-colors",
                      selectedConversation?.id === conversation.id && "bg-emerald-50 border-emerald-200",
                    )}
                    onClick={() => setSelectedConversation(conversation)}
                  >
                    <div className="flex items-start gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={conversation.customer.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {conversation.customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-medium text-slate-800 truncate">{conversation.customer.name}</h4>
                          <div className="flex items-center gap-1">
                            {conversation.status === "unread" && (
                              <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                            )}
                            <Badge className={`text-xs ${getPriorityColor(conversation.priority)}`}>
                              {conversation.priority}
                            </Badge>
                          </div>
                        </div>

                        <p className="text-sm font-medium text-slate-700 mb-1 truncate">{conversation.subject}</p>

                        <p className="text-xs text-slate-500 mb-2 line-clamp-2">{conversation.lastMessage}</p>

                        <div className="flex items-center justify-between text-xs text-slate-400">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {conversation.timestamp}
                          </span>
                          <div className="flex items-center gap-2">
                            <span>{conversation.messageCount} messages</span>
                            {conversation.rating && (
                              <div className="flex items-center gap-1">
                                <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                <span>{conversation.rating}</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Message Thread */}
          <Card className="border border-slate-200 lg:col-span-2">
            {selectedConversation ? (
              <>
                <CardHeader className="border-b border-slate-200">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={selectedConversation.customer.avatar || "/placeholder.svg"} />
                        <AvatarFallback>
                          {selectedConversation.customer.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-medium text-slate-800">{selectedConversation.customer.name}</h3>
                        <p className="text-sm text-slate-500">
                          {selectedConversation.customer.company} • {selectedConversation.agent}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <Badge className={`text-xs ${getPriorityColor(selectedConversation.priority)}`}>
                        {selectedConversation.priority} priority
                      </Badge>
                      <Button variant="ghost" size="sm">
                        <Archive className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-medium text-slate-800">{selectedConversation.subject}</h4>
                  </div>
                </CardHeader>

                <CardContent className="p-0">
                  {/* Message History */}
                  <div className="max-h-[calc(100vh-500px)] overflow-y-auto p-4 space-y-4">
                    {messageHistory.map((message) => (
                      <div
                        key={message.id}
                        className={cn("flex gap-3", message.sender === "seller" ? "flex-row-reverse" : "flex-row")}
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={
                              message.sender === "seller"
                                ? "/placeholder.svg?height=32&width=32"
                                : selectedConversation.customer.avatar
                            }
                          />
                          <AvatarFallback>
                            {message.sender === "seller"
                              ? "JA"
                              : selectedConversation.customer.name
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                          </AvatarFallback>
                        </Avatar>

                        <div
                          className={cn(
                            "max-w-[70%] space-y-2",
                            message.sender === "seller" ? "items-end" : "items-start",
                          )}
                        >
                          <div
                            className={cn(
                              "p-3 rounded-lg",
                              message.sender === "seller" ? "bg-emerald-500 text-white" : "bg-slate-100 text-slate-800",
                            )}
                          >
                            <p className="text-sm">{message.message}</p>

                            {message.attachments.length > 0 && (
                              <div className="mt-2 space-y-1">
                                {message.attachments.map((attachment, index) => (
                                  <div key={index} className="flex items-center gap-2 text-xs">
                                    <Paperclip className="h-3 w-3" />
                                    <span>{attachment}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          <div
                            className={cn(
                              "flex items-center gap-2 text-xs text-slate-400",
                              message.sender === "seller" ? "justify-end" : "justify-start",
                            )}
                          >
                            <span>{message.timestamp}</span>
                            {message.sender === "seller" && <CheckCheck className="h-3 w-3 text-emerald-500" />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Message Input */}
                  <div className="border-t border-slate-200 p-4">
                    <div className="flex gap-3">
                      <div className="flex-1">
                        <Textarea
                          placeholder="Type your message..."
                          value={newMessage}
                          onChange={(e) => setNewMessage(e.target.value)}
                          className="min-h-[80px] resize-none"
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault()
                              handleSendMessage()
                            }
                          }}
                        />
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="sm">
                              <Paperclip className="h-4 w-4" />
                            </Button>
                            <span className="text-xs text-slate-400">
                              Press Enter to send, Shift+Enter for new line
                            </span>
                          </div>
                          <Button
                            onClick={handleSendMessage}
                            disabled={!newMessage.trim()}
                            className="bg-emerald-600 hover:bg-emerald-700"
                          >
                            <Send className="h-4 w-4 mr-2" />
                            Send
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </>
            ) : (
              <CardContent className="flex items-center justify-center h-full">
                <div className="text-center">
                  <MessageSquare className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-slate-600 mb-2">Select a conversation</h3>
                  <p className="text-slate-400">Choose a conversation from the list to start messaging</p>
                </div>
              </CardContent>
            )}
          </Card>
        </div>
      </div>
    </SellerLayout>
  )
}
