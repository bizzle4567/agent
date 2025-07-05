"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Upload, Plus, X, CheckCircle, Zap, Rocket, TrendingUp, Code, FileText, ImageIcon } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

const categories = [
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

const features = [
  "24/7 Support",
  "API Access",
  "Custom Training",
  "Multi-language",
  "Real-time Analytics",
  "Mobile Responsive",
  "Cloud Integration",
  "Data Export",
  "White-label",
  "GDPR Compliant",
]

const pricingModels = [
  { id: "one-time", label: "One-time Purchase", description: "Single payment for lifetime access" },
  { id: "subscription", label: "Subscription", description: "Recurring monthly or yearly payments" },
  { id: "usage-based", label: "Usage-based", description: "Pay per use or transaction" },
  { id: "freemium", label: "Freemium", description: "Free tier with premium upgrades" },
]

export default function ListAgentPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    // Basic Info
    name: "",
    category: "",
    shortDescription: "",
    longDescription: "",
    tags: [] as string[],

    // Media
    images: [] as string[],
    videoUrl: "",
    demoUrl: "",

    // Features & Specs
    selectedFeatures: [] as string[],
    specifications: {} as Record<string, string>,

    // Pricing
    pricingModel: "",
    price: "",
    subscriptionPlans: [] as any[],
    freeTrialDays: "",

    // Technical
    apiDocumentation: "",
    integrationMethods: [] as string[],
    supportedPlatforms: [] as string[],

    // Seller Info
    companyName: "",
    contactEmail: "",
    supportEmail: "",
    website: "",

    // Legal
    termsOfService: "",
    privacyPolicy: "",
    refundPolicy: "",
  })

  const [newTag, setNewTag] = useState("")
  const [dragActive, setDragActive] = useState(false)

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      handleInputChange("tags", [...formData.tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    handleInputChange(
      "tags",
      formData.tags.filter((tag) => tag !== tagToRemove),
    )
  }

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    console.log("Agent listing submitted:", formData)
    // Handle form submission
  }

  const steps = [
    { number: 1, title: "Basic Info", icon: <FileText className="h-4 w-4" /> },
    { number: 2, title: "Media & Demo", icon: <ImageIcon className="h-4 w-4" /> },
    { number: 3, title: "Features & Specs", icon: <Code className="h-4 w-4" /> },
    { number: 4, title: "Pricing", icon: <TrendingUp className="h-4 w-4" /> },
    { number: 5, title: "Review & Submit", icon: <CheckCircle className="h-4 w-4" /> },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />

      <div className="pt-20 pb-8">
        <div className="max-w-3xl mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
                <Rocket className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
              List Your AI Agent
            </h1>
            <p className="text-lg text-slate-600">Share your AI innovation with thousands of Nigerian businesses</p>
          </div>

          {/* Progress Steps */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => (
                <div key={step.number} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                      currentStep >= step.number
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 border-blue-500 text-white"
                        : "border-slate-300 text-slate-400 bg-white"
                    }`}
                  >
                    {currentStep > step.number ? <CheckCircle className="h-5 w-5" /> : step.icon}
                  </div>
                  <div className="ml-2 hidden md:block">
                    <div
                      className={`text-xs font-medium ${
                        currentStep >= step.number ? "text-blue-600" : "text-slate-500"
                      }`}
                    >
                      {step.title}
                    </div>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`w-6 h-0.5 mx-3 ${
                        currentStep > step.number ? "bg-gradient-to-r from-blue-500 to-purple-600" : "bg-slate-300"
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Form Content */}
          <Card className="border border-slate-200 bg-white">
            <CardContent className="p-6">
              {/* Step 1: Basic Info */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Tell us about your AI Agent</h2>
                    <p className="text-slate-600">Provide basic information that will help users discover your agent</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-slate-700 font-medium">
                        Agent Name *
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => handleInputChange("name", e.target.value)}
                        placeholder="e.g., CustomerCare Pro"
                        className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="category" className="text-slate-700 font-medium">
                        Category *
                      </Label>
                      <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
                        <SelectTrigger className="border-slate-200 focus:border-blue-500">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shortDescription" className="text-slate-700 font-medium">
                      Short Description *
                    </Label>
                    <Input
                      id="shortDescription"
                      value={formData.shortDescription}
                      onChange={(e) => handleInputChange("shortDescription", e.target.value)}
                      placeholder="Brief one-line description of what your agent does"
                      className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="longDescription" className="text-slate-700 font-medium">
                      Detailed Description *
                    </Label>
                    <Textarea
                      id="longDescription"
                      value={formData.longDescription}
                      onChange={(e) => handleInputChange("longDescription", e.target.value)}
                      placeholder="Provide a comprehensive description of your agent's capabilities..."
                      rows={4}
                      className="border-slate-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-slate-700 font-medium">Tags</Label>
                    <div className="flex gap-2">
                      <Input
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="Add a tag"
                        className="flex-1 border-slate-200 focus:border-blue-500"
                        onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                      />
                      <Button
                        type="button"
                        onClick={addTag}
                        className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {formData.tags.map((tag, index) => (
                        <Badge
                          key={index}
                          className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-800 border border-emerald-200 px-3 py-1"
                        >
                          {tag}
                          <button type="button" onClick={() => removeTag(tag)} className="ml-2 hover:text-red-600">
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Media & Demo */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Showcase Your Agent</h2>
                    <p className="text-slate-600">Add images, videos, and demos to help users understand your agent</p>
                  </div>

                  {/* Image Upload */}
                  <div className="space-y-3">
                    <Label className="text-slate-700 font-medium">Agent Images *</Label>
                    <div
                      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
                        dragActive ? "border-blue-500 bg-blue-50" : "border-slate-300 hover:border-slate-400"
                      }`}
                      onDragEnter={() => setDragActive(true)}
                      onDragLeave={() => setDragActive(false)}
                    >
                      <Upload className="h-10 w-10 text-slate-400 mx-auto mb-3" />
                      <p className="text-slate-600 mb-2">Drag and drop images here, or click to browse</p>
                      <p className="text-sm text-slate-500">PNG, JPG up to 5MB each</p>
                      <Button type="button" variant="outline" className="mt-3 bg-transparent">
                        Choose Files
                      </Button>
                    </div>
                  </div>

                  {/* Video & Demo URLs */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="videoUrl" className="text-slate-700 font-medium">
                        Demo Video URL
                      </Label>
                      <Input
                        id="videoUrl"
                        value={formData.videoUrl}
                        onChange={(e) => handleInputChange("videoUrl", e.target.value)}
                        placeholder="https://youtube.com/watch?v=..."
                        className="border-slate-200 focus:border-blue-500"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="demoUrl" className="text-slate-700 font-medium">
                        Live Demo URL
                      </Label>
                      <Input
                        id="demoUrl"
                        value={formData.demoUrl}
                        onChange={(e) => handleInputChange("demoUrl", e.target.value)}
                        placeholder="https://demo.youragent.com"
                        className="border-slate-200 focus:border-blue-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Features & Specs */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Features & Specifications</h2>
                    <p className="text-slate-600">Highlight what makes your agent special</p>
                  </div>

                  {/* Features Selection */}
                  <div className="space-y-3">
                    <Label className="text-slate-700 font-medium">Key Features</Label>
                    <div className="grid md:grid-cols-2 gap-2">
                      {features.map((feature) => (
                        <div
                          key={feature}
                          className="flex items-center space-x-2 p-2 border border-slate-200 rounded-lg hover:bg-slate-50"
                        >
                          <Checkbox
                            id={feature}
                            checked={formData.selectedFeatures.includes(feature)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                handleInputChange("selectedFeatures", [...formData.selectedFeatures, feature])
                              } else {
                                handleInputChange(
                                  "selectedFeatures",
                                  formData.selectedFeatures.filter((f) => f !== feature),
                                )
                              }
                            }}
                          />
                          <Label htmlFor={feature} className="text-sm cursor-pointer">
                            {feature}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Technical Specifications */}
                  <div className="space-y-3">
                    <Label className="text-slate-700 font-medium">Technical Specifications</Label>
                    <div className="grid md:grid-cols-2 gap-3">
                      {[
                        { key: "responseTime", label: "Response Time", placeholder: "< 2 seconds" },
                        { key: "uptime", label: "Uptime Guarantee", placeholder: "99.9%" },
                        { key: "languages", label: "Supported Languages", placeholder: "English, Pidgin, etc." },
                        { key: "integrations", label: "Integration Methods", placeholder: "API, Webhook, Widget" },
                      ].map((spec) => (
                        <div key={spec.key} className="space-y-1">
                          <Label htmlFor={spec.key} className="text-sm text-slate-600">
                            {spec.label}
                          </Label>
                          <Input
                            id={spec.key}
                            value={formData.specifications[spec.key] || ""}
                            onChange={(e) =>
                              handleInputChange("specifications", {
                                ...formData.specifications,
                                [spec.key]: e.target.value,
                              })
                            }
                            placeholder={spec.placeholder}
                            className="border-slate-200 focus:border-blue-500"
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Step 4: Pricing */}
              {currentStep === 4 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Pricing Strategy</h2>
                    <p className="text-slate-600">Set your pricing model and plans</p>
                  </div>

                  {/* Pricing Model */}
                  <div className="space-y-3">
                    <Label className="text-slate-700 font-medium">Pricing Model *</Label>
                    <RadioGroup
                      value={formData.pricingModel}
                      onValueChange={(value) => handleInputChange("pricingModel", value)}
                    >
                      {pricingModels.map((model) => (
                        <div
                          key={model.id}
                          className="flex items-start space-x-3 p-3 border border-slate-200 rounded-lg hover:bg-slate-50"
                        >
                          <RadioGroupItem value={model.id} id={model.id} className="mt-1" />
                          <div className="flex-1">
                            <Label htmlFor={model.id} className="font-medium text-slate-800 cursor-pointer">
                              {model.label}
                            </Label>
                            <p className="text-sm text-slate-600 mt-1">{model.description}</p>
                          </div>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>

                  {/* Pricing Details */}
                  {formData.pricingModel === "one-time" && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="price" className="text-slate-700 font-medium">
                          Price (₦) *
                        </Label>
                        <Input
                          id="price"
                          type="number"
                          value={formData.price}
                          onChange={(e) => handleInputChange("price", e.target.value)}
                          placeholder="15000"
                          className="border-slate-200 focus:border-blue-500"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="freeTrialDays" className="text-slate-700 font-medium">
                          Free Trial (Days)
                        </Label>
                        <Input
                          id="freeTrialDays"
                          type="number"
                          value={formData.freeTrialDays}
                          onChange={(e) => handleInputChange("freeTrialDays", e.target.value)}
                          placeholder="14"
                          className="border-slate-200 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Step 5: Review & Submit */}
              {currentStep === 5 && (
                <div className="space-y-6">
                  <div className="text-center mb-6">
                    <h2 className="text-xl font-bold text-slate-800 mb-2">Review Your Listing</h2>
                    <p className="text-slate-600">Double-check everything before submitting</p>
                  </div>

                  {/* Summary Cards */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <Card className="border border-slate-200 bg-gradient-to-br from-blue-50 to-purple-50">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <FileText className="h-4 w-4 text-blue-600" />
                          Basic Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm pt-0">
                        <div>
                          <strong>Name:</strong> {formData.name || "Not set"}
                        </div>
                        <div>
                          <strong>Category:</strong> {formData.category || "Not set"}
                        </div>
                        <div>
                          <strong>Tags:</strong> {formData.tags.length} tags
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="border border-slate-200 bg-gradient-to-br from-emerald-50 to-teal-50">
                      <CardHeader className="pb-3">
                        <CardTitle className="text-base flex items-center gap-2">
                          <TrendingUp className="h-4 w-4 text-emerald-600" />
                          Pricing & Features
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-2 text-sm pt-0">
                        <div>
                          <strong>Model:</strong> {formData.pricingModel || "Not set"}
                        </div>
                        <div>
                          <strong>Price:</strong> {formData.price ? `₦${formData.price}` : "Not set"}
                        </div>
                        <div>
                          <strong>Features:</strong> {formData.selectedFeatures.length} selected
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Terms Agreement */}
                  <div className="p-4 bg-slate-50 rounded-lg border border-slate-200">
                    <div className="space-y-3">
                      <div className="flex items-start space-x-3">
                        <Checkbox id="sellerTerms" />
                        <Label htmlFor="sellerTerms" className="text-sm text-slate-700 leading-relaxed">
                          I agree to the{" "}
                          <a href="/seller-terms" className="text-blue-600 hover:underline">
                            Seller Terms of Service
                          </a>
                        </Label>
                      </div>
                      <div className="flex items-start space-x-3">
                        <Checkbox id="qualityGuidelines" />
                        <Label htmlFor="qualityGuidelines" className="text-sm text-slate-700 leading-relaxed">
                          I confirm that my agent meets the{" "}
                          <a href="/quality-guidelines" className="text-blue-600 hover:underline">
                            Quality Guidelines
                          </a>
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* What Happens Next */}
                  <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
                    <h3 className="font-semibold text-blue-800 mb-3 flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      What Happens Next?
                    </h3>
                    <div className="space-y-2 text-sm text-blue-700">
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                          1
                        </div>
                        <span>Your agent will be reviewed by our team (usually within 24-48 hours)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                          2
                        </div>
                        <span>You'll receive an email with feedback or approval notification</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                          3
                        </div>
                        <span>Once approved, your agent goes live on the marketplace</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                          4
                        </div>
                        <span>Start earning from sales with weekly payouts</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6 border-t border-slate-200">
                <Button
                  variant="outline"
                  onClick={handleBack}
                  disabled={currentStep === 1}
                  className="px-6 border-slate-300 hover:border-slate-400 bg-transparent"
                >
                  Back
                </Button>

                {currentStep < 5 ? (
                  <Button
                    onClick={handleNext}
                    className="px-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    onClick={handleSubmit}
                    className="px-6 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                  >
                    <Rocket className="h-4 w-4 mr-2" />
                    Submit for Review
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  )
}
