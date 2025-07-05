import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import Header from "@/components/header"

export default function NotificationsLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <Header />

      <div className="pt-20 pb-8">
        <div className="max-w-4xl mx-auto px-4">
          {/* Header Skeleton */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <Skeleton className="h-8 w-64 mb-2" />
              <Skeleton className="h-4 w-96" />
            </div>
            <Skeleton className="h-10 w-32" />
          </div>

          {/* Tabs Skeleton */}
          <div className="mb-6">
            <Skeleton className="h-12 w-full" />
          </div>

          {/* Notifications Skeleton */}
          <div className="space-y-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <Card key={i} className="border border-slate-200">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <Skeleton className="w-10 h-10 rounded-full" />
                    <div className="flex-1">
                      <Skeleton className="h-5 w-3/4 mb-2" />
                      <Skeleton className="h-4 w-full mb-2" />
                      <Skeleton className="h-4 w-1/2" />
                    </div>
                    <Skeleton className="h-4 w-16" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
