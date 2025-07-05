import Link from "next/link"
import { Bot, Twitter, Github, Linkedin, Mail } from "lucide-react"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">9jaAgents</span>
            </Link>
            <p className="text-slate-400 text-sm leading-relaxed">
              The premier marketplace for AI agents in Nigeria. Discover, deploy, and monetize intelligent automation.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/marketplace" className="hover:text-white">
                  Marketplace
                </Link>
              </li>
              <li>
                <Link href="/categories" className="hover:text-white">
                  Categories
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="hover:text-white">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-white">
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/about" className="hover:text-white">
                  About
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/careers" className="hover:text-white">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <Link href="/help" className="hover:text-white">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="/docs" className="hover:text-white">
                  Documentation
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-white">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 mt-6 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-slate-400 text-sm">© 2024 9jaAgents. All rights reserved.</p>

          <div className="flex items-center gap-4 mt-4 md:mt-0">
            <Link href="#" className="text-slate-400 hover:text-white">
              <Twitter className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-slate-400 hover:text-white">
              <Github className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-slate-400 hover:text-white">
              <Linkedin className="h-5 w-5" />
            </Link>
            <Link href="#" className="text-slate-400 hover:text-white">
              <Mail className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
