"use client";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/shared/animated-section";
import { ArrowRight, TrendingUp, Zap } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const questions = [
  {
    id: 1,
    question: "Explain the difference between process and thread.",
    subject: "Operating Systems",
    difficulty: "easy",
    slug: "process-vs-thread",
  },
  {
    id: 2,
    question: "How does TCP three-way handshake work?",
    subject: "Computer Networks",
    difficulty: "medium",
    slug: "tcp-three-way-handshake",
  },
  {
    id: 3,
    question: "Explain normalization in DBMS with examples.",
    subject: "DBMS",
    difficulty: "medium",
    slug: "normalization-dbms",
  },
  {
    id: 4,
    question: "What is the difference between supervised and unsupervised learning?",
    subject: "Machine Learning",
    difficulty: "easy",
    slug: "supervised-vs-unsupervised",
  },
  {
    id: 5,
    question: "Explain virtual memory and paging.",
    subject: "Operating Systems",
    difficulty: "hard",
    slug: "virtual-memory-paging",
  },
  {
    id: 6,
    question: "How does RSA encryption work?",
    subject: "Cyber Security",
    difficulty: "hard",
    slug: "rsa-encryption",
  },
];

const difficultyColor: Record<string, string> = {
  easy: "text-success bg-success/10 border-success/20",
  medium: "text-warning bg-warning/10 border-warning/20",
  hard: "text-danger bg-danger/10 border-danger/20",
};

export function TrendingQuestions() {
  return (
    <section className="py-20 sm:py-28 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between mb-14">
          <div>
            <Badge variant="premium" size="lg" className="mb-4">
              <TrendingUp className="h-3.5 w-3.5 mr-1" />
              Trending Now
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Popular Questions{" "}
              <span className="text-gradient">Asked in Exams</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Master the questions that appear most frequently in university
              exams and technical interviews.
            </p>
          </div>
          <Link
            href="/interview"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors mt-4 sm:mt-0 shrink-0"
          >
            View all questions
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {questions.map((q, i) => (
            <AnimatedSection key={q.id} delay={i * 0.05}>
              <Link href={`/subjects/${q.slug}`}>
                <Card className="group cursor-pointer h-full hover:border-primary/20 transition-all duration-300">
                  <CardContent className="p-5">
                    <div className="flex items-start gap-3">
                      <Zap className="h-4 w-4 text-primary mt-1 shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium leading-relaxed group-hover:text-primary transition-colors mb-3">
                          {q.question}
                        </p>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge
                            variant="secondary"
                            size="sm"
                            className="text-[10px]"
                          >
                            {q.subject}
                          </Badge>
                          <span
                            className={cn(
                              "px-2 py-0.5 rounded-full text-[10px] font-medium border",
                              difficultyColor[q.difficulty]
                            )}
                          >
                            {q.difficulty}
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
