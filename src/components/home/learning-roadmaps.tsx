"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/shared/animated-section";
import {
  Route,
  ArrowRight,
  Code2,
  Brain,
  Cpu,
  Shield,
  Cloud,
  Database,
  BarChart3,
  CircuitBoard,
  Smartphone,
} from "lucide-react";
import Link from "next/link";

const roadmaps = [
  {
    title: "Frontend Development",
    slug: "frontend-development",
    icon: Code2,
    color: "#2563eb",
    steps: 12,
    duration: "6 months",
    difficulty: "beginner",
  },
  {
    title: "AI & Machine Learning",
    slug: "ai-machine-learning",
    icon: Brain,
    color: "#7c3aed",
    steps: 15,
    duration: "12 months",
    difficulty: "intermediate",
  },
  {
    title: "Embedded Systems",
    slug: "embedded-systems",
    icon: Cpu,
    color: "#0891b2",
    steps: 10,
    duration: "8 months",
    difficulty: "advanced",
  },
  {
    title: "Cyber Security",
    slug: "cyber-security",
    icon: Shield,
    color: "#059669",
    steps: 11,
    duration: "9 months",
    difficulty: "intermediate",
  },
  {
    title: "Cloud & DevOps",
    slug: "cloud-devops",
    icon: Cloud,
    color: "#d97706",
    steps: 13,
    duration: "10 months",
    difficulty: "intermediate",
  },
  {
    title: "Data Science",
    slug: "data-science",
    icon: BarChart3,
    color: "#dc2626",
    steps: 14,
    duration: "12 months",
    difficulty: "intermediate",
  },
];

export function LearningRoadmaps() {
  return (
    <section className="py-20 sm:py-28 bg-secondary/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between mb-14">
          <div>
            <Badge variant="premium" size="lg" className="mb-4">
              <Route className="h-3.5 w-3.5 mr-1" />
              Learning Roadmaps
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Step-by-Step{" "}
              <span className="text-gradient">Career Roadmaps</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Curated learning paths to guide you from beginner to job-ready
              professional.
            </p>
          </div>
          <Link
            href="/roadmaps"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors mt-4 sm:mt-0 shrink-0"
          >
            View all roadmaps
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {roadmaps.map((rm, i) => {
            const Icon = rm.icon;
            return (
              <AnimatedSection key={rm.slug} delay={i * 0.05}>
                <Link href={`/roadmaps/${rm.slug}`}>
                  <Card className="group h-full cursor-pointer hover:border-primary/20 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{
                            backgroundColor: rm.color + "15",
                            color: rm.color,
                          }}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold group-hover:text-primary transition-colors">
                            {rm.title}
                          </h3>
                          <p className="text-xs text-muted-foreground capitalize">
                            {rm.difficulty} · {rm.duration}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>{rm.steps} steps</span>
                        <span>·</span>
                        <span>{rm.duration}</span>
                        <span>·</span>
                        <Badge
                          variant={
                            rm.difficulty === "beginner"
                              ? "success"
                              : rm.difficulty === "intermediate"
                              ? "warning"
                              : "destructive"
                          }
                          size="sm"
                        >
                          {rm.difficulty}
                        </Badge>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>
      </div>
    </section>
  );
}
