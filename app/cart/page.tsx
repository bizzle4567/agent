"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart, Trash2, Plus, Minus, CreditCard, Shield, Clock, Star, Tag, ArrowRight } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Link from "next/link"

const cartItems = [
  {
    id: 1,
    name: "CustomerCare Pro",
    seller: "TechSolutions NG",
    category: "Customer Service",
    price: 25000,
    originalPrice: 30000,
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.8,
    reviews: 124,
    features: ["24/7 Support", "Multi-language", "API Access"],
    discount: 17,
    quantity: 1,
  },
  {
    id: 2,
    name: "Sales Automation Bot",
    seller: "AI Innovations",
    category: "Sales Automation",
    price: 45000,
    originalPrice: 45000,
    image: "/placeholder.svg?height=80&width=80",
    rating: 4.9,
    reviews: 89,
    features: ["Lead Generation", "CRM Integration", "Analytics"],
    discount: 0,
    quantity: 1,
  },
]

export default function CartPage() {
  const [items, setItems] = useState(cartItems)
  const [promoCode, setPromoCode] = useState("")
  const [appliedPromo, setAppliedPromo] = useState("")

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setItems((prev) => prev.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setItems((prev) => prev.filter((item) => item.id !== id))
  }

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "welcome10") {
      setAppliedPromo("WELCOME10")
      setPromoCode("")
    }
  }

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const promoDiscount = appliedPromo === "WELCOME10" ? subtotal * 0.1 : 0
  const total = subtotal - promoDiscount

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
        <Header />
        <div className="pt-20 pb-8">
          <div className="max-w-4xl mx-auto px-4">
            <Card className="border border-slate-200">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <ShoppingCart className="h-16 w-16 text-slate-400 mb-6" />
                <h2 className="text-2xl font-bold text-slate-800 mb-4">Your cart is empty</h2>
                <p className="text-slate-600 text-center mb-8 max-w-md">
                  Discover amazing AI agents that can transform your business operations and boost productivity.
                </p>
                <Link href="/marketplace">
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    Browse Marketplace
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />

      <div className="pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
              <ShoppingCart className="h-8 w-8 text-blue-600" />
              Shopping Cart
              <Badge className="bg-blue-100 text-blue-800">{items.length} items</Badge>
            </h1>
            <p className="text-slate-600 mt-2">Review your selected AI agents before checkout</p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {items.map((item) => (
                <Card key={item.id} className="border border-slate-200">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      {/* Agent Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-20 h-20 rounded-lg object-cover border border-slate-200"
                        />
                      </div>

                      {/* Agent Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className="font-semibold text-slate-800 mb-1">{item.name}</h3>
                            <p className="text-sm text-slate-600 mb-2">by {item.seller}</p>

                            <div className="flex items-center gap-4 mb-3">
                              <Badge className="bg-blue-100 text-blue-800 text-xs">{item.category}</Badge>
                              <div className="flex items-center gap-1">
                                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                <span className="text-sm text-slate-600">
                                  {item.rating} ({item.reviews})
                                </span>
                              </div>
                            </div>

                            <div className="flex flex-wrap gap-2 mb-4">
                              {item.features.slice(0, 3).map((feature, index) => (
                                <Badge key={index} variant="outline" className="text-xs">
                                  {feature}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        {/* Price and Quantity */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center border border-slate-200 rounded-lg">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="px-3 py-1 text-sm font-medium">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                className="h-8 w-8 p-0"
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="flex items-center gap-2">
                              {item.discount > 0 && (
                                <span className="text-sm text-slate-500 line-through">
                                  ₦{item.originalPrice.toLocaleString()}
                                </span>
                              )}
                              <span className="text-lg font-bold text-slate-800">
                                ₦{(item.price * item.quantity).toLocaleString()}
                              </span>
                            </div>
                            {item.discount > 0 && (
                              <Badge className="bg-green-100 text-green-800 text-xs mt-1">{item.discount}% OFF</Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}

              {/* Continue Shopping */}
              <div className="pt-4">
                <Link href="/marketplace">
                  <Button variant="outline" className="flex items-center gap-2 bg-transparent">
                    <ArrowRight className="h-4 w-4 rotate-180" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="border border-slate-200 sticky top-24">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Promo Code */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-slate-700">Promo Code</label>
                    <div className="flex gap-2">
                      <Input
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Enter code"
                        className="flex-1"
                      />
                      <Button onClick={applyPromoCode} variant="outline" size="sm">
                        Apply
                      </Button>
                    </div>
                    {appliedPromo && (
                      <div className="flex items-center gap-2 text-green-600 text-sm">
                        <Tag className="h-4 w-4" />
                        {appliedPromo} applied
                      </div>
                    )}
                  </div>

                  <Separator />

                  {/* Price Breakdown */}
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Subtotal</span>
                      <span className="font-medium">₦{subtotal.toLocaleString()}</span>
                    </div>

                    {promoDiscount > 0 && (
                      <div className="flex justify-between text-sm text-green-600">
                        <span>Promo Discount</span>
                        <span>-₦{promoDiscount.toLocaleString()}</span>
                      </div>
                    )}

                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Processing Fee</span>
                      <span className="font-medium">Free</span>
                    </div>

                    <Separator />

                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span>₦{total.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    Proceed to Checkout
                  </Button>

                  {/* Security Info */}
                  <div className="flex items-center gap-2 text-sm text-slate-600 pt-4">
                    <Shield className="h-4 w-4 text-green-600" />
                    <span>Secure checkout with 256-bit SSL encryption</span>
                  </div>

                  {/* Money Back Guarantee */}
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center gap-2 text-green-800 text-sm font-medium mb-1">
                      <Clock className="h-4 w-4" />
                      30-Day Money Back Guarantee
                    </div>
                    <p className="text-green-700 text-xs">
                      Not satisfied? Get a full refund within 30 days of purchase.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
