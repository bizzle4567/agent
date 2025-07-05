"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Bot, Menu, X, Bell, ShoppingCart, User, Settings, LogOut, BarChart3, Package } from "lucide-react"
import AuthModal from "./auth-modal"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false)
  const [authMode, setAuthMode] = useState<"login" | "signup">("login")
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const handleAuthSuccess = () => {
    setIsLoggedIn(true)
    setIsAuthModalOpen(false)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
  }

  const notificationCount = 5
  const cartCount = 3

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">9jaAgents</span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              <Link href="/marketplace" className="text-slate-600 hover:text-slate-800 font-medium transition-colors">
                Marketplace
              </Link>
              <Link href="/leaderboard" className="text-slate-600 hover:text-slate-800 font-medium transition-colors">
                Leaderboard
              </Link>
              <Link href="/about" className="text-slate-600 hover:text-slate-800 font-medium transition-colors">
                About
              </Link>
              <Link href="/help" className="text-slate-600 hover:text-slate-800 font-medium transition-colors">
                Help
              </Link>
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  {/* Notifications */}
                  <Link href="/notifications">
                    <Button variant="ghost" size="sm" className="relative">
                      <Bell className="h-5 w-5" />
                      {notificationCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 rounded-full p-0 flex items-center justify-center">
                          {notificationCount}
                        </Badge>
                      )}
                    </Button>
                  </Link>

                  {/* Cart */}
                  <Link href="/cart">
                    <Button variant="ghost" size="sm" className="relative">
                      <ShoppingCart className="h-5 w-5" />
                      {cartCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs w-5 h-5 rounded-full p-0 flex items-center justify-center">
                          {cartCount}
                        </Badge>
                      )}
                    </Button>
                  </Link>

                  {/* List Agent Button */}
                  <Link href="/list-agent">
                    <Button className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white hidden md:flex">
                      List Your Agent
                    </Button>
                  </Link>

                  {/* User Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="/placeholder.svg?height=32&width=32" />
                        <AvatarFallback>JA</AvatarFallback>
                      </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-48">
                      <DropdownMenuItem asChild>
                        <Link href="/dashboard" className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/seller" className="flex items-center">
                          <BarChart3 className="h-4 w-4 mr-2" />
                          Seller Dashboard
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href="/seller/agents" className="flex items-center">
                          <Package className="h-4 w-4 mr-2" />
                          My Agents
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Settings className="h-4 w-4 mr-2" />
                        Settings
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign out
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <>
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setAuthMode("login")
                      setIsAuthModalOpen(true)
                    }}
                    className="hidden md:flex"
                  >
                    Sign In
                  </Button>
                  <Button
                    onClick={() => {
                      setAuthMode("signup")
                      setIsAuthModalOpen(true)
                    }}
                    className="bg-blue-600 hover:bg-blue-700 hidden md:flex"
                  >
                    Get Started
                  </Button>
                </>
              )}

              {/* Mobile menu button */}
              <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200">
              <nav className="flex flex-col gap-4">
                <Link
                  href="/marketplace"
                  className="text-slate-600 hover:text-slate-800 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Marketplace
                </Link>
                <Link
                  href="/leaderboard"
                  className="text-slate-600 hover:text-slate-800 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Leaderboard
                </Link>
                <Link
                  href="/about"
                  className="text-slate-600 hover:text-slate-800 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/help"
                  className="text-slate-600 hover:text-slate-800 font-medium transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Help
                </Link>
                {isLoggedIn ? (
                  <>
                    <Link
                      href="/list-agent"
                      className="text-slate-600 hover:text-slate-800 font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      List Your Agent
                    </Link>
                    <Link
                      href="/seller"
                      className="text-slate-600 hover:text-slate-800 font-medium transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      Seller Dashboard
                    </Link>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        handleLogout()
                        setIsMenuOpen(false)
                      }}
                      className="justify-start text-red-600 hover:text-red-700"
                    >
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <div className="flex flex-col gap-2 pt-2">
                    <Button
                      variant="ghost"
                      onClick={() => {
                        setAuthMode("login")
                        setIsAuthModalOpen(true)
                        setIsMenuOpen(false)
                      }}
                      className="justify-start"
                    >
                      Sign In
                    </Button>
                    <Button
                      onClick={() => {
                        setAuthMode("signup")
                        setIsAuthModalOpen(true)
                        setIsMenuOpen(false)
                      }}
                      className="bg-blue-600 hover:bg-blue-700 justify-start"
                    >
                      Get Started
                    </Button>
                  </div>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        mode={authMode}
        onModeChange={setAuthMode}
        onSuccess={handleAuthSuccess}
      />
    </>
  )
}
