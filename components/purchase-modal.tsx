"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { CreditCard, Smartphone, Building, Shield, CheckCircle } from "lucide-react"

interface PurchaseModalProps {
  isOpen: boolean
  onClose: () => void
  agent: any
  selectedPlan: any
}

export default function PurchaseModal({ isOpen, onClose, agent, selectedPlan }: PurchaseModalProps) {
  const [step, setStep] = useState(1) // 1: Plan confirmation, 2: Payment details, 3: Confirmation
  const [paymentMethod, setPaymentMethod] = useState("card")
  const [formData, setFormData] = useState({
    email: "",
    fullName: "",
    company: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: "",
    agreeToTerms: false,
  })

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const handlePurchase = () => {
    // Handle purchase logic here
    console.log("Purchase completed:", { agent, selectedPlan, formData, paymentMethod })
    setStep(3)
  }

  const tax = selectedPlan.price * 0.075 // 7.5% VAT
  const total = selectedPlan.price + tax

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            {step === 1 && "Confirm Your Purchase"}
            {step === 2 && "Payment Details"}
            {step === 3 && "Purchase Successful!"}
          </DialogTitle>
          <DialogDescription>
            {step === 1 && "Review your selected plan and proceed to payment"}
            {step === 2 && "Enter your payment information to complete the purchase"}
            {step === 3 && "Your AI agent is ready to use"}
          </DialogDescription>
        </DialogHeader>

        {/* Step 1: Plan Confirmation */}
        {step === 1 && (
          <div className="space-y-6">
            {/* Agent Summary */}
            <Card className="border border-slate-200">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <img
                    src={agent.images[0] || "/placeholder.svg"}
                    alt={agent.name}
                    className="w-20 h-20 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-slate-800 mb-1">{agent.name}</h3>
                    <p className="text-slate-600 text-sm mb-2">{agent.shortDescription}</p>
                    <div className="flex items-center gap-2">
                      <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                        {agent.category}
                      </Badge>
                      <span className="text-sm text-slate-500">by {agent.seller.name}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Selected Plan */}
            <Card className="border border-blue-200 bg-blue-50">
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="text-lg font-semibold text-slate-800">{selectedPlan.name} Plan</h4>
                    <p className="text-slate-600">Perfect for your business needs</p>
                  </div>
                  <div className="text-right">
                    <div className="text-2xl font-bold text-slate-800">₦{selectedPlan.price.toLocaleString()}</div>
                    <div className="text-slate-500">per {selectedPlan.period}</div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h5 className="font-medium text-slate-800">Included features:</h5>
                  {selectedPlan.features.map((feature: string, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-sm">
                      <CheckCircle className="h-4 w-4 text-emerald-500" />
                      <span className="text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Free Trial Notice */}
            {agent.hasFreeTrial && (
              <div className="p-4 bg-emerald-50 border border-emerald-200 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <CheckCircle className="h-5 w-5 text-emerald-600" />
                  <span className="font-medium text-emerald-800">Free Trial Included</span>
                </div>
                <p className="text-sm text-emerald-700">
                  Start with a {agent.freeTrialDays}-day free trial. You won't be charged until the trial period ends.
                  Cancel anytime during the trial at no cost.
                </p>
              </div>
            )}

            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Cancel
              </Button>
              <Button onClick={handleNext} className="flex-1 bg-blue-600 hover:bg-blue-700">
                Continue to Payment
              </Button>
            </div>
          </div>
        )}

        {/* Step 2: Payment Details */}
        {step === 2 && (
          <div className="space-y-6">
            {/* Contact Information */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">Contact Information</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Enter your full name"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="your@email.com"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="company">Company (Optional)</Label>
                  <Input
                    id="company"
                    value={formData.company}
                    onChange={(e) => handleInputChange("company", e.target.value)}
                    placeholder="Your company name"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="+234 xxx xxx xxxx"
                    required
                  />
                </div>
              </div>
            </div>

            <Separator />

            {/* Payment Method */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-slate-800">Payment Method</h3>
              <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                <div className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg">
                  <RadioGroupItem value="card" id="card" />
                  <CreditCard className="h-5 w-5 text-slate-600" />
                  <Label htmlFor="card" className="flex-1 cursor-pointer">
                    Credit/Debit Card
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg">
                  <RadioGroupItem value="bank" id="bank" />
                  <Building className="h-5 w-5 text-slate-600" />
                  <Label htmlFor="bank" className="flex-1 cursor-pointer">
                    Bank Transfer
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border border-slate-200 rounded-lg">
                  <RadioGroupItem value="mobile" id="mobile" />
                  <Smartphone className="h-5 w-5 text-slate-600" />
                  <Label htmlFor="mobile" className="flex-1 cursor-pointer">
                    Mobile Money
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {/* Card Details */}
            {paymentMethod === "card" && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="cardNumber">Card Number *</Label>
                  <Input
                    id="cardNumber"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="expiryDate">Expiry Date *</Label>
                    <Input
                      id="expiryDate"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="cvv">CVV *</Label>
                    <Input
                      id="cvv"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange("cvv", e.target.value)}
                      placeholder="123"
                      required
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Order Summary */}
            <Card className="border border-slate-200 bg-slate-50">
              <CardContent className="p-6">
                <h4 className="font-semibold text-slate-800 mb-4">Order Summary</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-600">{selectedPlan.name} Plan</span>
                    <span className="font-medium">₦{selectedPlan.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-600">VAT (7.5%)</span>
                    <span className="font-medium">₦{tax.toLocaleString()}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total</span>
                    <span>₦{total.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Terms Agreement */}
            <div className="flex items-start space-x-3">
              <Checkbox
                id="terms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm text-slate-600 leading-relaxed">
                I agree to the{" "}
                <a href="/terms" className="text-blue-600 hover:underline">
                  Terms of Service
                </a>
                ,{" "}
                <a href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </a>
                , and{" "}
                <a href="/refund" className="text-blue-600 hover:underline">
                  Refund Policy
                </a>
              </Label>
            </div>

            {/* Security Notice */}
            <div className="flex items-center gap-2 p-3 bg-green-50 border border-green-200 rounded-lg">
              <Shield className="h-5 w-5 text-green-600" />
              <span className="text-sm text-green-800">Your payment information is encrypted and secure</span>
            </div>

            <div className="flex gap-3">
              <Button variant="outline" onClick={handleBack} className="flex-1 bg-transparent">
                Back
              </Button>
              <Button
                onClick={handlePurchase}
                disabled={!formData.agreeToTerms}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                Complete Purchase
              </Button>
            </div>
          </div>
        )}

        {/* Step 3: Success */}
        {step === 3 && (
          <div className="text-center space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>

            <div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Purchase Successful!</h3>
              <p className="text-slate-600">
                You now have access to <strong>{agent.name}</strong>. Setup instructions have been sent to your email.
              </p>
            </div>

            <Card className="border border-slate-200 text-left">
              <CardContent className="p-6">
                <h4 className="font-semibold text-slate-800 mb-4">What's Next?</h4>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                      1
                    </div>
                    <span className="text-slate-700">Check your email for setup instructions</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                      2
                    </div>
                    <span className="text-slate-700">Access your dashboard to configure the agent</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center text-xs font-bold text-blue-600">
                      3
                    </div>
                    <span className="text-slate-700">Contact support if you need help with integration</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex gap-3">
              <Button variant="outline" onClick={onClose} className="flex-1 bg-transparent">
                Close
              </Button>
              <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Go to Dashboard</Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
