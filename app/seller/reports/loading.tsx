import SellerLayout from "@/components/seller-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function ReportsLoading() {
  return (
    <SellerLayout>
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Skeleton className="h-8 w-64 mb-2" />
            <Skeleton className="h-4 w-96" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-40" />
            <Skeleton className="h-10 w-32" />
          </div>
        </div>

        {/* Quick Stats Skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="border border-slate-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <Skeleton className="h-10 w-10 rounded-lg" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-4 w-32 mb-1" />
                <Skeleton className="h-3 w-20" />
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Report Types Skeleton */}
        <Card className="border border-slate-200">
          <CardHeader>
            <Skeleton className="h-6 w-40" />
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="p-6 border border-slate-200 rounded-lg">
                  <div className="flex items-center gap-3 mb-4">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <div>
                      <Skeleton className="h-5 w-32 mb-2" />
                      <Skeleton className="h-4 w-16 rounded-full" />
                    </div>
                  </div>
                  <Skeleton className="h-12 w-full mb-4" />
                  <Skeleton className="h-3 w-40 mb-4" />
                  <Skeleton className="h-10 w-full" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent Reports Skeleton */}
          <Card className="border border-slate-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-8 w-20" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-64 mb-2" />
                      <Skeleton className="h-3 w-32 mb-2" />
                      <Skeleton className="h-3 w-80" />
                    </div>
                    <Skeleton className="h-8 w-8" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Scheduled Reports Skeleton */}
          <Card className="border border-slate-200">
            <CardHeader>
              <div className="flex justify-between items-center">
                <Skeleton className="h-6 w-40" />
                <Skeleton className="h-8 w-32" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 bg-slate-50 rounded-lg">
                    <Skeleton className="h-10 w-10 rounded-lg" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-48 mb-2" />
                      <Skeleton className="h-3 w-32 mb-2" />
                      <Skeleton className="h-3 w-64" />
                    </div>
                    <Skeleton className="h-8 w-16" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Custom Report Builder Skeleton */}
        <Card className="border border-slate-200">
          <CardHeader>
            <Skeleton className="h-6 w-48" />
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="p-6 border-2 border-dashed border-slate-200 rounded-lg text-center">
                  <Skeleton className="h-12 w-12 mx-auto mb-4" />
                  <Skeleton className="h-5 w-32 mx-auto mb-2" />
                  <Skeleton className="h-12 w-full mb-4" />
                  <Skeleton className="h-8 w-24 mx-auto" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </SellerLayout>
  )
}
