"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { Search, ArrowRight, Clock, TrendingUp, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

interface SearchSuggestion {
  label: string;
  type: string;
  href: string;
}

const popularSearches = [
  "Data Structures",
  "Machine Learning",
  "Operating Systems",
  "DBMS",
  "Computer Networks",
  "Python",
];

const recentSearches = [
  "Calculus",
  "Linear Algebra",
  "Algorithms",
];

export function SearchCommand({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => {
    if (open && inputRef.current) {
      inputRef.current.focus();
    }
  }, [open]);

  const suggestions: SearchSuggestion[] = query
    ? [
        { label: `Search "${query}" in Subjects`, type: "subject", href: `/subjects?q=${query}` },
        { label: `Search "${query}" in Notes`, type: "note", href: `/notes?q=${query}` },
        { label: `Search "${query}" in MCQs`, type: "mcq", href: `/mcqs?q=${query}` },
        { label: `Search "${query}" in Questions`, type: "question", href: `/interview?q=${query}` },
        { label: `Ask AI about "${query}"`, type: "ai", href: `/ai?q=${query}` },
      ]
    : [];

  return (
    <>
      {/* Search trigger */}
      <button
        onClick={() => setOpen(true)}
        className={cn(
          "flex items-center gap-2 h-10 px-4 rounded-xl border border-input bg-background text-sm text-muted-foreground hover:border-primary/30 hover:shadow-sm transition-all duration-200 w-full max-w-md",
          className
        )}
      >
        <Search className="h-4 w-4 shrink-0" />
        <span className="flex-1 text-left">Search subjects, notes, questions...</span>
        <kbd className="hidden sm:inline-flex items-center gap-1 rounded-lg border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
          <span>⌘</span>K
        </kbd>
      </button>

      {/* Search modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-start justify-center pt-[15vh] px-4"
          >
            <div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="relative w-full max-w-2xl rounded-2xl border border-border bg-background shadow-2xl overflow-hidden"
            >
              {/* Search input */}
              <div className="flex items-center gap-3 px-4 border-b border-border">
                <Search className="h-5 w-5 text-muted-foreground shrink-0" />
                <Input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search subjects, notes, questions..."
                  className="border-0 h-14 px-0 text-base bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/50"
                />
                {query && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-lg shrink-0"
                    onClick={() => setQuery("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>

              {/* Suggestions */}
              <div className="max-h-80 overflow-y-auto p-2">
                {query ? (
                  <div className="space-y-0.5">
                    <div className="px-3 py-2 text-xs font-medium text-muted-foreground">
                      Suggestions
                    </div>
                    {suggestions.map((suggestion, i) => (
                      <Link
                        key={i}
                        href={suggestion.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-secondary transition-colors group"
                      >
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                        <span className="text-sm flex-1">{suggestion.label}</span>
                        <span className="text-[10px] uppercase text-muted-foreground font-medium">
                          {suggestion.type}
                        </span>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <>
                    {/* Recent searches */}
                    <div className="mb-2">
                      <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        Recent
                      </div>
                      <div className="flex flex-wrap gap-2 px-3">
                        {recentSearches.map((term) => (
                          <button
                            key={term}
                            onClick={() => setQuery(term)}
                            className="px-3 py-1.5 rounded-lg bg-secondary text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Popular searches */}
                    <div>
                      <div className="flex items-center gap-2 px-3 py-2 text-xs font-medium text-muted-foreground">
                        <TrendingUp className="h-3 w-3" />
                        Popular
                      </div>
                      <div className="flex flex-wrap gap-2 px-3">
                        {popularSearches.map((term) => (
                          <button
                            key={term}
                            onClick={() => setQuery(term)}
                            className="px-3 py-1.5 rounded-lg bg-primary/5 text-xs font-medium text-primary hover:bg-primary/10 transition-colors"
                          >
                            {term}
                          </button>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>

              {/* Footer */}
              <div className="border-t border-border px-4 py-3 flex items-center gap-4 text-[10px] text-muted-foreground">
                <span>↑↓ Navigate</span>
                <span>↵ Open</span>
                <span>Esc Close</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
