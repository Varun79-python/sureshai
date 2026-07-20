"use client";

import { useParams } from "next/navigation";
import { roadmaps, getRoadmapBySlug } from "@/lib/data/roadmaps";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AnimatedSection } from "@/components/shared/animated-section";
import {
  ArrowLeft, Clock, BarChart3, CheckCircle2, Circle,
  BookOpen, ExternalLink, Award,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";

export default function RoadmapDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const roadmap = getRoadmapBySlug(slug);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);

  if (!roadmap) {
    notFound();
  }

  const toggleStep = (stepId: string) => {
    setCompletedSteps((prev) =>
      prev.includes(stepId)
        ? prev.filter((id) => id !== stepId)
        : [...prev, stepId]
    );
  };

  const progress = Math.round((completedSteps.length / roadmap.steps.length) * 100);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link href="/roadmaps" className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" /> Back to Roadmaps
        </Link>

        <AnimatedSection className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <Badge variant={roadmap.difficulty === "beginner" ? "success" : roadmap.difficulty === "intermediate" ? "warning" : "destructive"}>
                  {roadmap.difficulty}
                </Badge>
                <Badge variant="secondary">{roadmap.estimatedTime}</Badge>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">{roadmap.title}</h1>
              <p className="text-lg text-muted-foreground">{roadmap.description}</p>
            </div>
          </div>

          {/* Progress */}
          <div className="mt-8 p-6 rounded-2xl border border-border bg-card">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-medium">Your Progress</span>
              <span className="text-sm text-muted-foreground">
                {completedSteps.length}/{roadmap.steps.length} steps
              </span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
        </AnimatedSection>

        {/* Prerequisites */}
        {roadmap.prerequisites.length > 0 && (
          <AnimatedSection className="mb-8">
            <div className="p-5 rounded-2xl border border-border bg-card">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Award className="h-5 w-5 text-warning" /> Prerequisites
              </h2>
              <ul className="space-y-2">
                {roadmap.prerequisites.map((prereq) => (
                  <li key={prereq} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <CheckCircle2 className="h-4 w-4 text-success shrink-0" />
                    {prereq}
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>
        )}

        {/* Steps */}
        <div className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-primary" />
            Learning Path
          </h2>
          {roadmap.steps.map((step, i) => (
            <AnimatedSection key={step.id} delay={i * 0.05}>
              <Card className={`cursor-pointer transition-all duration-300 ${
                completedSteps.includes(step.id) ? 'border-success/30 bg-success/[0.02]' : 'hover:border-primary/20'
              }`}>
                <CardContent className="p-5" onClick={() => toggleStep(step.id)}>
                  <div className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 mt-0.5 transition-colors ${
                      completedSteps.includes(step.id)
                        ? 'bg-success/10 text-success'
                        : 'bg-secondary text-muted-foreground'
                    }`}>
                      {completedSteps.includes(step.id)
                        ? <CheckCircle2 className="h-5 w-5" />
                        : <span className="text-sm font-medium">{i + 1}</span>
                      }
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold ${completedSteps.includes(step.id) ? 'text-success' : ''}`}>
                          {step.title}
                        </h3>
                        <Badge variant="outline" size="sm">{step.duration}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{step.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {step.topics.map((topic) => (
                          <Badge key={topic} variant="secondary" size="sm">{topic}</Badge>
                        ))}
                      </div>
                      {step.resources.length > 0 && (
                        <div className="mt-3 flex flex-wrap gap-2">
                          {step.resources.map((res) => (
                            <span key={res} className="inline-flex items-center gap-1 text-xs text-primary">
                              <ExternalLink className="h-3 w-3" /> {res}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        {/* Resources */}
        {roadmap.resources.length > 0 && (
          <AnimatedSection className="mt-8">
            <div className="p-5 rounded-2xl border border-border bg-card">
              <h2 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" /> Recommended Resources
              </h2>
              <div className="flex flex-wrap gap-2">
                {roadmap.resources.map((res) => (
                  <Badge key={res} variant="secondary" size="lg">{res}</Badge>
                ))}
              </div>
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}
