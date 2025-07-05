import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Header from "@/components/header"

export default function CartLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />

      <div className="pt-20 pb-8">
        <div className="max-w-6xl mx-auto px-4">
          {/* Header Skeleton */}
          <div className="mb-8">
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Cart Items Skeleton */}
            <div className="lg:col-span-2 space-y-4">
              {Array.from({ length: 2 }).map((_, i) => (
                <Card key={i} className="border border-slate-200">
                  <CardContent className="p-6">
                    <div className="flex gap-4">
                      <Skeleton className="w-20 h-20 rounded-lg" />
                      <div className="flex-1">
                        <Skeleton className="h-5 w-3/4 mb-2" />
                        <Skeleton className="h-4 w-1/2 mb-3" />
                        <div className="flex gap-2 mb-4">
                          <Skeleton className="h-6 w-16" />
                          <Skeleton className="h-6 w-20" />
                        </div>
                        <div className="flex justify-between items-center">
                          <Skeleton className="h-8 w-24" />
                          <Skeleton className="h-6 w-20" />
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary Skeleton */}
            <div className="lg:col-span-1">
              <Card className="border border-slate-200">
                <CardHeader>
                  <Skeleton className="h-6 w-32" />
                </CardHeader>
                <CardContent className="space-y-4">
                  <Skeleton className="h-10 w-full" />
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <div className="flex justify-between">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-16" />
                    </div>
                    <div className="flex justify-between">
                      <Skeleton className="h-5 w-12" />
                      <Skeleton className="h-5 w-24" />
                    </div>
                  </div>
                  <Skeleton className="h-12 w-full" />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
