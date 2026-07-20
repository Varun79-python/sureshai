"use client";

import { useParams } from "next/navigation";
import { companies, getCompanyBySlug, getQuestionsByCompany } from "@/lib/data/companies";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/shared/animated-section";
import { ArrowLeft, Building2, MessageSquareMore, ChevronRight } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";

export default function CompanyDetailPage() {
  const params = useParams();
  const slug = params.company as string;
  const company = getCompanyBySlug(slug);
  const [expandedId, setExpandedId] = useState<string | null>(null);

  if (!company) {
    notFound();
  }

  const questions = getQuestionsByCompany(slug);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link href="/interview" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Companies
        </Link>

        <AnimatedSection className="mb-10">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
              <span className="text-2xl font-bold text-primary">{company.logo}</span>
            </div>
            <div>
              <Badge variant="premium" size="sm" className="mb-2">{company.industries.join(", ")}</Badge>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight">{company.name}</h1>
              <p className="text-muted-foreground mt-1">{company.description}</p>
            </div>
          </div>
        </AnimatedSection>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <MessageSquareMore className="h-5 w-5 text-primary" />
            Interview Questions ({questions.length})
          </h2>

          {questions.map((q, i) => (
            <AnimatedSection key={q.id} delay={i * 0.05}>
              <Card className="cursor-pointer hover:border-primary/20 transition-all duration-300"
                onClick={() => setExpandedId(expandedId === q.id ? null : q.id)}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <Badge variant="outline" size="sm">{q.topic}</Badge>
                        <Badge variant={q.difficulty === "easy" ? "success" : q.difficulty === "medium" ? "warning" : "destructive"} size="sm">{q.difficulty}</Badge>
                        <Badge variant="secondary" size="sm">{q.role}</Badge>
                      </div>
                      <h3 className="font-medium">{q.question}</h3>
                      {expandedId === q.id && (
                        <div className="mt-4 p-4 rounded-xl bg-secondary/50 text-sm leading-relaxed">
                          <p className="font-medium mb-2 text-foreground">Answer:</p>
                          <p className="text-muted-foreground whitespace-pre-wrap">{q.answer}</p>
                          {q.tags.length > 0 && (
                            <div className="flex flex-wrap gap-1 mt-3">
                              {q.tags.map((tag) => (
                                <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                    <ChevronRight className={`h-5 w-5 text-muted-foreground shrink-0 mt-1 transition-transform duration-200 ${expandedId === q.id ? 'rotate-90' : ''}`} />
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
