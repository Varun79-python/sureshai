import { Skeleton } from "@/components/ui/skeleton";

export default function AuthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center pt-24 pb-16">
      <div className="w-full max-w-md mx-auto px-4">
        <div className="rounded-2xl border border-border p-8">
          <div className="text-center mb-6">
            <Skeleton className="h-10 w-10 rounded-xl mx-auto mb-4" />
            <Skeleton className="h-6 w-40 mx-auto mb-2" />
            <Skeleton className="h-4 w-56 mx-auto" />
          </div>
          <div className="space-y-4">
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
          <Skeleton className="h-10 w-full rounded-xl mt-6" />
        </div>
      </div>
    </div>
  );
}
