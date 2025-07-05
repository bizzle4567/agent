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

export default function AdminAddAgentPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    shortDescription: "",
    longDescription: "",
    tags: [] as string[],
    images: [] as (string | File)[],
    videoUrl: "",
    demoUrl: "",
    selectedFeatures: [] as string[],
    specifications: {} as Record<string, string>,
    pricingModel: "",
    price: "",
    subscriptionPlans: [] as any[],
    freeTrialDays: "",
    apiDocumentation: "",
    integrationMethods: [] as string[],
    supportedPlatforms: [] as string[],
    companyName: "",
    contactEmail: "",
    supportEmail: "",
    website: "",
    termsOfService: "",
    privacyPolicy: "",
    refundPolicy: "",
  })
  const [newTag, setNewTag] = useState("")
  const [dragActive, setDragActive] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    setErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files) return
    const fileArr = Array.from(files)
    if (formData.images.length + fileArr.length > 5) {
      setErrors((prev) => ({ ...prev, images: "You can upload up to 5 images." }))
      return
    }
    handleInputChange("images", [...formData.images, ...fileArr])
  }

  const removeImage = (idx: number) => {
    handleInputChange(
      "images",
      formData.images.filter((_, i) => i !== idx)
    )
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

  const validateStep = () => {
    let stepErrors: Record<string, string> = {}
    if (currentStep === 1) {
      if (!formData.name) stepErrors.name = "Agent name is required."
      if (!formData.category) stepErrors.category = "Category is required."
      if (!formData.shortDescription) stepErrors.shortDescription = "Short description is required."
      if (!formData.longDescription) stepErrors.longDescription = "Detailed description is required."
    }
    if (currentStep === 2) {
      if (!formData.images.length) stepErrors.images = "At least one image is required."
    }
    if (currentStep === 3) {
      if (!formData.selectedFeatures.length) stepErrors.selectedFeatures = "Select at least one feature."
    }
    if (currentStep === 4) {
      if (!formData.pricingModel) stepErrors.pricingModel = "Select a pricing model."
      if (formData.pricingModel === "one-time" && !formData.price) stepErrors.price = "Price is required."
    }
    if (currentStep === 5) {
      if (!formData.companyName) stepErrors.companyName = "Company name is required."
      if (!formData.contactEmail) stepErrors.contactEmail = "Contact email is required."
    }
    setErrors(stepErrors)
    return Object.keys(stepErrors).length === 0
  }

  const handleNext = () => {
    if (currentStep < 6) {
      if (!validateStep()) return
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = async () => {
    if (!validateStep()) return
    try {
      const agentData = {
        name: formData.name,
        category: formData.category,
        short_description: formData.shortDescription,
        long_description: formData.longDescription,
        tags: formData.tags,
        video_url: formData.videoUrl,
        demo_url: formData.demoUrl,
        features: formData.selectedFeatures,
        specifications: formData.specifications,
        pricing_model: formData.pricingModel,
        price: formData.price,
        free_trial_days: formData.freeTrialDays,
        company_name: formData.companyName,
        contact_email: formData.contactEmail,
        support_email: formData.supportEmail,
        website: formData.website,
        status: "approved", // Admin adds are auto-approved
        created_at: new Date().toISOString(),
      }
      // TODO: handle image upload to storage and save URLs
      // For now, skip images
      const { error } = await (await import("@/lib/supabaseClient")).supabase.from("agents").insert([agentData])
      if (error) {
        setErrors({ submit: error.message })
        return
      }
      alert("Agent added successfully!")
      // Optionally reset form or redirect
    } catch (err: any) {
      setErrors({ submit: err.message || "Submission failed" })
    }
  }

  const steps = [
    { number: 1, title: "Basic Info", icon: <FileText className="h-4 w-4" /> },
    { number: 2, title: "Media & Demo", icon: <ImageIcon className="h-4 w-4" /> },
    { number: 3, title: "Features & Specs", icon: <Code className="h-4 w-4" /> },
    { number: 4, title: "Pricing", icon: <TrendingUp className="h-4 w-4" /> },
    { number: 5, title: "Seller Info", icon: <Rocket className="h-4 w-4" /> },
    { number: 6, title: "Review & Submit", icon: <CheckCircle className="h-4 w-4" /> },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />
      <div className="pt-20 pb-8">
        <div className="max-w-3xl mx-auto px-4">
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center">
                <Rocket className="h-8 w-8 text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-slate-800 to-slate-600 bg-clip-text text-transparent mb-2">
              Add New AI Agent
            </h1>
            <p className="text-lg text-slate-600">Admins can add new agents directly to the marketplace</p>
          </div>
          {/* ...existing code for steps, form, and navigation (copy from user-facing form, adjust as above)... */}
        </div>
      </div>
      <Footer />
    </div>
  )
}
