import { Skeleton } from "@/components/ui/skeleton";

export default function RoadmapDetailLoading() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Skeleton className="h-4 w-28 mb-6" />
        <div className="mb-8">
          <Skeleton className="w-14 h-14 rounded-2xl mb-4" />
          <Skeleton className="h-10 w-72 mb-2" />
          <Skeleton className="h-5 w-full mb-1" />
          <Skeleton className="h-5 w-2/3 mb-4" />
          <div className="flex gap-4">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-24" />
          </div>
        </div>
        <div className="relative pl-8 space-y-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="relative">
              <Skeleton className="absolute -left-8 top-1 w-5 h-5 rounded-full" />
              <div className="rounded-2xl border border-border p-6">
                <Skeleton className="h-5 w-48 mb-2" />
                <Skeleton className="h-4 w-full mb-1" />
                <Skeleton className="h-4 w-3/4 mb-3" />
                <div className="flex gap-2">
                  <Skeleton className="h-5 w-20 rounded-full" />
                  <Skeleton className="h-5 w-16 rounded-full" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
