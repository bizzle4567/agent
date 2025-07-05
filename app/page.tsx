import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Star, Users, TrendingUp, Zap, Shield, BarChart3, Target, MessageSquare } from "lucide-react"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="pt-20">
        {/* Main Content Container */}
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Side - Main Content */}
            <div className="space-y-16">
              {/* Hero Section */}
              <section className="text-center lg:text-left">
                <Badge className="mb-6 bg-emerald-100 text-emerald-700 hover:bg-emerald-100">NG MARKETPLACE</Badge>

                {/* Profile Images */}
                <div className="flex justify-center lg:justify-start mb-8">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`w-16 h-16 rounded-full border-4 border-white overflow-hidden ${
                          i === 3 ? "w-20 h-20 z-10" : ""
                        }`}
                      >
                        <img
                          src={`/placeholder.svg?height=80&width=80`}
                          alt={`User ${i}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <h1 className="text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-tight">
                  The AI Agent Platform
                </h1>

                <p className="text-xl text-slate-600 mb-8 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                  Now with 500+ AI agents, 9jaAgents empowers 5,000+ strategic Nigerian businesses to manage{" "}
                  <span className="text-emerald-600 font-medium">customer</span> information, drive{" "}
                  <span className="text-emerald-600 font-medium">performance</span>, capture team{" "}
                  <span className="text-emerald-600 font-medium">sentiment</span>, and report key{" "}
                  <span className="text-emerald-600 font-medium">insights</span> - all in one place.
                </p>

                <Button size="lg" className="bg-teal-700 hover:bg-teal-800 text-white px-8 py-4 text-lg">
                  Request a demo
                </Button>

                {/* Stats */}
                <div className="flex justify-center lg:justify-start gap-8 mt-8 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4" />
                    <span>4.7 out of 5.0</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4" />
                    <span>4.5 on Capterra</span>
                  </div>
                </div>
              </section>

              {/* Company Logos */}
              <section>
                <p className="text-center lg:text-left text-sm text-slate-500 mb-6 uppercase tracking-wide">
                  POWERING THE WORLD'S BEST COMPANIES
                </p>
                <div className="flex flex-wrap justify-center lg:justify-start items-center gap-8 opacity-60">
                  {["Webflow", "Discord", "Duolingo", "Asana", "LinkedIn", "Indeed", "Zoom"].map((company) => (
                    <div key={company} className="text-slate-400 font-medium text-lg">
                      {company}
                    </div>
                  ))}
                </div>
              </section>

              {/* Why Choose Us */}
              <section>
                <h2 className="text-sm font-medium text-slate-700 mb-6">Why Choose Us</h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <Card className="bg-emerald-500 text-white border-0">
                    <CardContent className="p-8">
                      <div className="text-4xl font-bold mb-2">5K+</div>
                      <div className="text-emerald-100">Organizations trust</div>
                    </CardContent>
                  </Card>
                  <Card className="bg-slate-100 border-0">
                    <CardContent className="p-8">
                      <div className="text-4xl font-bold text-slate-800 mb-2">78%</div>
                      <div className="text-slate-600">Reduces administration time</div>
                    </CardContent>
                  </Card>
                </div>
              </section>

              {/* AI-Driven Tools */}
              <section>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <h2 className="text-3xl font-bold text-slate-900 mb-4">
                      Empowers businesses with <span className="text-emerald-600">AI-driven</span> tools to optimize
                      teams, <span className="text-slate-400">boost productivity, and drive success</span>
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="bg-emerald-100 border-0">
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-emerald-700 mb-1">25%</div>
                        <div className="text-sm text-emerald-600">Reduced Manual Work</div>
                      </CardContent>
                    </Card>
                    <Card className="bg-slate-100 border-0">
                      <CardContent className="p-6 text-center">
                        <div className="text-3xl font-bold text-slate-700 mb-1">6M</div>
                        <div className="text-sm text-slate-600">Pieces of Feedback Shared</div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Side - Feature Cards */}
            <div className="space-y-6">
              {/* Empowered Managers Card */}
              <Card className="border border-slate-200 shadow-lg">
                <CardContent className="p-6">
                  <Badge className="mb-4 bg-emerald-100 text-emerald-700">Business Intelligence</Badge>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">
                    Empowered Managers, Higher Performing Teams
                  </h3>
                  <p className="text-slate-600 mb-6">
                    Seamlessly connect performance review cycles and 1:1s into compensation decisions, creating far more
                    accurate pay outcomes.
                  </p>

                  {/* Analytics Section */}
                  <div className="bg-slate-50 rounded-lg p-4 mb-4">
                    <div className="flex justify-between items-center mb-3">
                      <h4 className="font-medium text-slate-800">Analytics</h4>
                      <span className="text-sm text-slate-500">Results</span>
                    </div>
                    <div className="flex items-end gap-2 h-16">
                      {[60, 80, 45, 90, 70].map((height, i) => (
                        <div
                          key={i}
                          className={`rounded-t ${
                            i === 3 ? "bg-blue-500" : i === 4 ? "bg-purple-500" : "bg-emerald-400"
                          }`}
                          style={{ height: `${height}%`, width: "20%" }}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Growth Metric */}
                  <div className="bg-teal-700 text-white rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <div className="text-sm opacity-90">Grow</div>
                        <div className="text-2xl font-bold">Reduced Turnover 27%</div>
                      </div>
                      <div className="text-4xl font-bold">27%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Goals & OKRs Card */}
              <Card className="border border-slate-200 shadow-lg">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Goals</h3>
                  <div className="space-y-3">
                    {[
                      { title: "Increase Operational Revenue", progress: 85, color: "bg-blue-500" },
                      { title: "Improve Customer Satisfaction", progress: 70, color: "bg-emerald-500" },
                      { title: "Enhance Product Quality", progress: 90, color: "bg-yellow-500" },
                      { title: "Expand Market Reach", progress: 60, color: "bg-purple-500" },
                    ].map((goal, i) => (
                      <div key={i} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-slate-700">{goal.title}</span>
                          <span className="text-slate-500">{goal.progress}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-2">
                          <div
                            className={`${goal.color} h-2 rounded-full transition-all duration-500`}
                            style={{ width: `${goal.progress}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-medium text-blue-900 mb-2">OKRs & Goals</h4>
                    <p className="text-sm text-blue-700">
                      Focus individuals and teams on your company's priorities and track progress and data each step of
                      the way.
                    </p>
                  </div>
                </CardContent>
              </Card>

              {/* Operational Excellence Card */}
              <Card className="border border-slate-200 shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="relative mb-6">
                    <div className="w-32 h-32 bg-gradient-to-br from-emerald-200 to-teal-300 rounded-full mx-auto flex items-center justify-center">
                      <div className="grid grid-cols-3 gap-2">
                        {[Target, MessageSquare, BarChart3, Users, Zap, Shield, TrendingUp, Star].map(
                          (Icon, i) =>
                            i < 6 && (
                              <div key={i} className="w-6 h-6 bg-white rounded-lg flex items-center justify-center">
                                <Icon className="h-3 w-3 text-teal-600" />
                              </div>
                            ),
                        )}
                      </div>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-4">Build An Operationally Excellent Company</h3>
                  <Button className="bg-teal-700 hover:bg-teal-800">Discover Now</Button>
                </CardContent>
              </Card>

              {/* Workplace Power Card */}
              <Card className="border border-slate-200 shadow-lg">
                <CardContent className="p-6">
                  <Badge className="mb-4 bg-blue-100 text-blue-700">Business Operations</Badge>
                  <h3 className="text-2xl font-bold text-slate-900 mb-6 text-center">
                    Built To Power Your Entire Workplace
                  </h3>

                  <div className="flex justify-between items-center mb-4">
                    <div className="text-center">
                      <img
                        src="/placeholder.svg?height=60&width=60"
                        alt="Executive"
                        className="w-12 h-12 rounded-full mx-auto mb-2"
                      />
                      <div className="text-xs text-slate-600">Executives</div>
                    </div>

                    <div className="flex-1 mx-4 bg-teal-700 text-white rounded-lg p-4 relative">
                      <div className="text-xs mb-2">
                        "I love that HireSphere makes it so our people leaders don't have to hunt for information about
                        their teams. Whether they are having one-on-ones, giving feedback, or engaging in conversations,
                        our managers have all the context they need in their fingertips thanks to HireSphere."
                      </div>
                      <div className="flex items-center gap-2 mt-2">
                        <img
                          src="/placeholder.svg?height=24&width=24"
                          alt="Sheila Mahon"
                          className="w-6 h-6 rounded-full"
                        />
                        <div className="text-xs">Sheila Mahon</div>
                      </div>
                    </div>

                    <div className="text-center">
                      <img
                        src="/placeholder.svg?height=60&width=60"
                        alt="Employee"
                        className="w-12 h-12 rounded-full mx-auto mb-2"
                      />
                      <div className="text-xs text-slate-600">Employees</div>
                    </div>
                  </div>

                  <div className="flex justify-between text-center">
                    <div className="text-xs text-slate-600">HR Leaders</div>
                    <div className="text-xs text-slate-600">Managers</div>
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
