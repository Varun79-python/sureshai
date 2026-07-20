"use client";

import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, Home } from "lucide-react";
import Link from "next/link";

export default function AIError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error for monitoring in production
    console.error("[SUresh AI] Chat error:", error);
  }, [error]);

  const isDev = process.env.NODE_ENV === "development";

  return (
    <div className="min-h-screen pt-24 pb-16 flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-6">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <h2 className="text-2xl font-bold mb-2">Something went wrong</h2>
        <p className="text-muted-foreground mb-2">
          SUresh AI hit an unexpected error. This usually resolves on its own.
        </p>

        {isDev && error.message && (
          <div className="mb-6 p-4 rounded-xl bg-secondary border border-border text-left">
            <p className="text-xs font-mono text-destructive break-all">{error.message}</p>
            {error.digest && (
              <p className="text-xs font-mono text-muted-foreground mt-1">Digest: {error.digest}</p>
            )}
          </div>
        )}

        <div className="flex items-center justify-center gap-3 mt-6">
          <Button onClick={reset} className="gap-2">
            <RefreshCw className="h-4 w-4" /> Try Again
          </Button>
          <Link href="/">
            <Button variant="outline" className="gap-2">
              <Home className="h-4 w-4" /> Go Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
