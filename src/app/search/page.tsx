"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Search, ArrowRight, BookOpen, Notebook, PenSquare, MessageSquareMore, Route, Brain, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/shared/animated-section";
import { subjects } from "@/lib/data/subjects";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Suspense } from "react";

const iconMap: Record<string, React.ElementType> = {
  subject: BookOpen,
  note: Notebook,
  mcq: PenSquare,
  question: MessageSquareMore,
  roadmap: Route,
  ai: Brain,
};

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);

  const filteredSubjects = subjects.filter((s) =>
    s.name.toLowerCase().includes(query.toLowerCase()) ||
    s.description.toLowerCase().includes(query.toLowerCase())
  ).slice(0, 6);

  const results = query ? [
    ...filteredSubjects.map((s) => ({
      title: s.name,
      description: s.description,
      url: `/subjects/${s.slug}`,
      type: "subject" as const,
      badge: `${s.topics} topics · ${s.questions} questions`,
    })),
    { title: `MCQs in ${query}`, description: `Practice multiple choice questions`, url: `/mcqs?q=${query}`, type: "mcq" as const, badge: "MCQs" },
    { title: `Interview Questions about ${query}`, description: `Prepare for technical interviews`, url: `/interview?q=${query}`, type: "question" as const, badge: "Interview" },
    { title: `Ask AI about ${query}`, description: `Get AI-powered explanations`, url: `/ai?q=${query}`, type: "ai" as const, badge: "AI" },
  ] : [];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Search <span className="text-gradient">Suresh.AI</span>
          </h1>
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search subjects, notes, questions..."
              className="pl-12 h-14 text-lg rounded-2xl"
              autoFocus
            />
          </div>
        </AnimatedSection>

        {query && (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground mb-4">
              {results.length} results for &ldquo;{query}&rdquo;
            </p>
            {results.map((result, i) => {
              const Icon = iconMap[result.type] || Search;
              return (
                <AnimatedSection key={i} delay={i * 0.03}>
                  <Link href={result.url}>
                    <div className="flex items-center gap-4 p-4 rounded-2xl border border-border bg-card hover:border-primary/20 transition-all duration-200 group">
                      <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium group-hover:text-primary transition-colors">{result.title}</h3>
                        <p className="text-sm text-muted-foreground">{result.description}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {"badge" in result && result.badge && (
                          <Badge variant="secondary" size="sm">{result.badge}</Badge>
                        )}
                        <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
        )}

        {!query && (
          <div className="text-center py-20">
            <Search className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="text-muted-foreground">Type to search across all subjects, notes, questions, and more.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense>
      <SearchContent />
    </Suspense>
  );
}
