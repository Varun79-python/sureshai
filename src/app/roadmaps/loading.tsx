import { Skeleton } from "@/components/ui/skeleton";

export default function RoadmapsLoading() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Skeleton className="h-6 w-44 mb-4 rounded-full" />
          <Skeleton className="h-10 w-96 mb-4" />
          <Skeleton className="h-6 w-72" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-border p-6 sm:p-8">
              <div className="flex gap-4 mb-6">
                <Skeleton className="w-14 h-14 rounded-2xl" />
                <div className="flex-1">
                  <Skeleton className="h-6 w-48 mb-2" />
                  <Skeleton className="h-4 w-full" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-5 w-full rounded-xl" />
                <Skeleton className="h-5 w-full rounded-xl" />
                <Skeleton className="h-5 w-3/4 rounded-xl" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
