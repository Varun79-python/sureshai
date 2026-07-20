import { Skeleton } from "@/components/ui/skeleton";

export default function AILoading() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header skeleton */}
      <div className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-40">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Skeleton className="w-9 h-9 rounded-xl" />
            <div>
              <Skeleton className="h-5 w-24 mb-1" />
              <Skeleton className="h-3 w-32" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-20 rounded-lg" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
        </div>
      </div>

      {/* Chat area skeleton */}
      <div className="flex-1 overflow-hidden">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
          {/* Welcome skeleton */}
          <div className="flex flex-col items-center justify-center min-h-[50vh]">
            <Skeleton className="w-20 h-20 rounded-3xl mb-6" />
            <Skeleton className="h-8 w-40 mb-3" />
            <Skeleton className="h-5 w-80 mb-8" />

            {/* Feature grid skeleton */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-sm mb-8">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50 border border-border">
                  <Skeleton className="w-8 h-8 rounded-lg shrink-0" />
                  <div className="flex-1">
                    <Skeleton className="h-4 w-20 mb-1.5" />
                    <Skeleton className="h-3 w-28" />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick starters skeleton */}
            <div className="flex flex-wrap justify-center gap-2 w-full max-w-md">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Skeleton key={i} className="h-9 rounded-xl flex-1 min-w-[100px] max-w-[140px]" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Input skeleton */}
      <div className="border-t border-border bg-background/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <Skeleton className="h-12 w-full rounded-2xl" />
          <div className="flex justify-between mt-2 px-1">
            <Skeleton className="h-3 w-48" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      </div>
    </div>
  );
}
