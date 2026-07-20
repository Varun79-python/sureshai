import { Skeleton } from "@/components/ui/skeleton";

export default function InterviewLoading() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <Skeleton className="h-6 w-48 mb-4 rounded-full" />
          <Skeleton className="h-10 w-96 mb-4" />
          <Skeleton className="h-6 w-72" />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-14">
          {Array.from({ length: 12 }).map((_, i) => (
            <div key={i} className="rounded-2xl border border-border p-4 text-center">
              <Skeleton className="w-10 h-10 rounded-xl mx-auto mb-2" />
              <Skeleton className="h-4 w-20 mx-auto mb-1" />
              <Skeleton className="h-3 w-16 mx-auto" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
