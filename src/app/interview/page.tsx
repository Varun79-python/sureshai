"use client";

import { useState } from "react";
import { companies, interviewQuestions } from "@/lib/data/companies";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/shared/animated-section";
import { Search, MessageSquareMore, Building2, ArrowRight, ChevronRight } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function InterviewPage() {
  const [search, setSearch] = useState("");

  const filteredCompanies = companies.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const allQuestions = interviewQuestions.filter((q) =>
    q.question.toLowerCase().includes(search.toLowerCase()) ||
    q.topic.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-10">
          <Badge variant="premium" size="lg" className="mb-4">
            <MessageSquareMore className="h-3.5 w-3.5 mr-1" />
            Interview Preparation
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Ace Your <span className="text-gradient">Technical Interviews</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Company-wise curated questions with detailed answers. Prepare for Google, Microsoft, Amazon, NVIDIA, and more.
          </p>
        </AnimatedSection>

        <div className="relative mb-10 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search companies or questions..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-11 h-12"
          />
        </div>

        {/* Companies Grid */}
        <AnimatedSection className="mb-14">
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Top Companies
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {filteredCompanies.slice(0, 18).map((company, i) => (
              <AnimatedSection key={company.slug} delay={i * 0.03}>
                <Link href={`/interview/${company.slug}`}>
                  <Card className="group cursor-pointer hover:border-primary/20 transition-all duration-300">
                    <CardContent className="p-4 text-center">
                      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center mx-auto mb-2 group-hover:scale-110 transition-transform">
                        <span className="text-sm font-bold text-primary">{company.logo}</span>
                      </div>
                      <h3 className="text-sm font-semibold group-hover:text-primary transition-colors">{company.name}</h3>
                      <p className="text-[10px] text-muted-foreground mt-1">{company.questionCount} questions</p>
                    </CardContent>
                  </Card>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>

        {/* Recent Questions */}
        <AnimatedSection>
          <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <MessageSquareMore className="h-5 w-5 text-primary" />
            Popular Questions
          </h2>
          <div className="space-y-4">
            {allQuestions.slice(0, 8).map((q, i) => (
              <AnimatedSection key={q.id} delay={i * 0.05}>
                <Card className="group cursor-pointer hover:border-primary/20 transition-all duration-300">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="secondary" size="sm">{q.company}</Badge>
                          <Badge variant="outline" size="sm">{q.topic}</Badge>
                          <Badge variant={
                            q.difficulty === "easy" ? "success" : q.difficulty === "medium" ? "warning" : "destructive"
                          } size="sm">{q.difficulty}</Badge>
                        </div>
                        <h3 className="font-medium group-hover:text-primary transition-colors">{q.question}</h3>
                      </div>
                      <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors shrink-0 mt-1" />
                    </div>
                  </CardContent>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
