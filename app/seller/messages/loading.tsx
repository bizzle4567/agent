import SellerLayout from "@/components/seller-layout"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function MessagesLoading() {
  return (
    <SellerLayout>
      <div className="space-y-6">
        {/* Header Skeleton */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <Skeleton className="h-8 w-48 mb-2" />
            <Skeleton className="h-4 w-80" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-24" />
            <Skeleton className="h-10 w-24" />
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 h-[calc(100vh-200px)]">
          {/* Conversations List Skeleton */}
          <Card className="border border-slate-200 lg:col-span-1">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-4">
                <Skeleton className="h-6 w-32" />
                <Skeleton className="h-6 w-16 rounded-full" />
              </div>
              <div className="space-y-3">
                <Skeleton className="h-10 w-full" />
                <div className="flex gap-2">
                  <Skeleton className="h-10 flex-1" />
                  <Skeleton className="h-10 flex-1" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <div className="space-y-4 p-4">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <Skeleton className="h-10 w-10 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-4 w-32 mb-2" />
                      <Skeleton className="h-4 w-48 mb-2" />
                      <Skeleton className="h-3 w-64 mb-2" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Message Thread Skeleton */}
          <Card className="border border-slate-200 lg:col-span-2">
            <CardHeader className="border-b border-slate-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div>
                    <Skeleton className="h-5 w-32 mb-1" />
                    <Skeleton className="h-4 w-48" />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Skeleton className="h-6 w-16 rounded-full" />
                  <Skeleton className="h-8 w-8" />
                  <Skeleton className="h-8 w-8" />
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <div className="space-y-4 mb-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className={`flex gap-3 ${i % 2 === 0 ? "flex-row" : "flex-row-reverse"}`}>
                    <Skeleton className="h-8 w-8 rounded-full" />
                    <div className="max-w-[70%]">
                      <Skeleton className={`h-16 w-64 rounded-lg mb-2`} />
                      <Skeleton className="h-3 w-20" />
                    </div>
                  </div>
                ))}
              </div>
              <div className="border-t pt-4">
                <Skeleton className="h-20 w-full mb-2" />
                <div className="flex justify-between">
                  <Skeleton className="h-8 w-24" />
                  <Skeleton className="h-10 w-20" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </SellerLayout>
  )
}
