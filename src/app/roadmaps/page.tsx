"use client";

import { roadmaps } from "@/lib/data/roadmaps";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/shared/animated-section";
import { Route, ArrowRight, Clock, BarChart3, CheckCircle2 } from "lucide-react";
import Link from "next/link";

const iconMap: Record<string, string> = {
  Code2: "</>",
  Brain: "🧠",
  Cpu: "⚡",
  Shield: "🛡",
  Cloud: "☁",
  BarChart3: "📊",
};

export default function RoadmapsPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-10">
          <Badge variant="premium" size="lg" className="mb-4">
            <Route className="h-3.5 w-3.5 mr-1" />
            Learning Roadmaps
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Step-by-Step <span className="text-gradient">Career Roadmaps</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Curated learning paths to guide you from beginner to job-ready professional. Each roadmap includes prerequisites, step-by-step topics, and curated resources.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {roadmaps.map((rm, i) => (
            <AnimatedSection key={rm.slug} delay={i * 0.08}>
              <Link href={`/roadmaps/${rm.slug}`}>
                <Card className="group cursor-pointer hover:border-primary/20 transition-all duration-300 h-full">
                  <CardContent className="p-6 sm:p-8">
                    <div className="flex items-start gap-4 mb-6">
                      <div
                        className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                        style={{ backgroundColor: rm.color + "15" }}
                      >
                        <span>{iconMap[rm.icon] || "📚"}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h2 className="text-xl font-semibold mb-1 group-hover:text-primary transition-colors">
                          {rm.title}
                        </h2>
                        <p className="text-sm text-muted-foreground">
                          {rm.description}
                        </p>
                      </div>
                    </div>

                    {/* Progress indicator */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <BarChart3 className="h-4 w-4" /> {rm.steps.length} steps
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" /> {rm.estimatedTime}
                      </span>
                      <Badge
                        variant={rm.difficulty === "beginner" ? "success" : rm.difficulty === "intermediate" ? "warning" : "destructive"}
                        size="sm"
                      >
                        {rm.difficulty}
                      </Badge>
                    </div>

                    {/* Steps preview */}
                    <div className="space-y-2 mb-4">
                      {rm.steps.slice(0, 4).map((step, si) => (
                        <div key={step.id} className="flex items-center gap-3 text-sm">
                          <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center shrink-0">
                            <span className="text-[10px] font-medium text-muted-foreground">{si + 1}</span>
                          </div>
                          <span className="text-muted-foreground">{step.title}</span>
                        </div>
                      ))}
                      {rm.steps.length > 4 && (
                        <div className="text-sm text-primary font-medium pl-9">
                          +{rm.steps.length - 4} more steps
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-2 text-sm font-medium text-primary group-hover:gap-3 transition-all">
                      View Roadmap <ArrowRight className="h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
