import { Skeleton } from "@/components/ui/skeleton";

export default function PlaygroundLoading() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Skeleton className="h-6 w-48 mb-4 rounded-full" />
          <Skeleton className="h-10 w-80 mb-2" />
          <Skeleton className="h-5 w-96" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 space-y-4">
            <Skeleton className="h-10 w-full rounded-xl" />
            <Skeleton className="h-10 w-full rounded-xl" />
            <Skeleton className="h-10 w-full rounded-xl" />
          </div>
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-border p-6">
              <Skeleton className="h-64 w-full rounded-xl" />
              <div className="flex gap-2 mt-4">
                <Skeleton className="h-10 w-24 rounded-xl" />
                <Skeleton className="h-10 w-24 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
