import SellerLayout from "@/components/seller-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ReviewsLoading() {
  return (
    <SellerLayout>
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Skeleton className="h-8 w-56 mb-2" />
            <Skeleton className="h-4 w-80" />
          </div>
          <Skeleton className="h-10 w-32" />
        </div>

        {/* Stats Cards Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="border border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-32" />
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Rating Distribution Skeleton */}
          <Card className="border border-slate-200">
            <CardHeader>
              <Skeleton className="h-6 w-40" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Skeleton className="h-4 w-12" />
                    <Skeleton className="h-2 flex-1 rounded-full" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Skeleton className="h-20 w-full rounded-lg" />
              </div>
            </CardContent>
          </Card>

          {/* Review Insights Skeleton */}
          <Card className="lg:col-span-2 border border-slate-200">
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Skeleton className="h-5 w-40 mb-3" />
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <Skeleton className="h-4 w-8" />
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <Skeleton className="h-5 w-40 mb-3" />
                  <div className="space-y-3">
                    {[...Array(4)].map((_, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div>
                          <Skeleton className="h-4 w-32 mb-1" />
                          <Skeleton className="h-3 w-20" />
                        </div>
                        <Skeleton className="h-4 w-12" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters Skeleton */}
        <Card className="border border-slate-200">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <Skeleton className="h-10 flex-1" />
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-48" />
              <Skeleton className="h-10 w-32" />
            </div>
          </CardContent>
        </Card>

        {/* Reviews List Skeleton */}
        <Card className="border border-slate-200">
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="border border-slate-200 rounded-lg p-6">
                  <div className="flex items-start gap-4">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <Skeleton className="h-5 w-48" />
                        <Skeleton className="h-4 w-32" />
                      </div>
                      <Skeleton className="h-6 w-24 mb-2 rounded-full" />
                      <Skeleton className="h-5 w-64 mb-2" />
                      <Skeleton className="h-16 w-full mb-4" />
                      <div className="flex gap-2 mb-4">
                        <Skeleton className="h-6 w-20 rounded-full" />
                        <Skeleton className="h-6 w-16 rounded-full" />
                        <Skeleton className="h-6 w-24 rounded-full" />
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex gap-4">
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                        <Skeleton className="h-8 w-20" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SellerLayout>
  )
}
