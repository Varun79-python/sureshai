"use client";

import { AnimatedSection, AnimatedCounter } from "@/components/shared/animated-section";
import { BookOpen, Users, Award, Star, Brain, FileText } from "lucide-react";

const stats = [
  { icon: BookOpen, value: 500, suffix: "+", label: "Topics Covered" },
  { icon: Brain, value: 10000, suffix: "+", label: "Practice Questions" },
  { icon: FileText, value: 2000, suffix: "+", label: "Study Notes" },
  { icon: Users, value: 100000, suffix: "+", label: "Active Students" },
  { icon: Award, value: 50, suffix: "+", label: "Subjects" },
  { icon: Star, value: 4.9, suffix: "", label: "Avg. Rating" },
];

export function Stats() {
  return (
    <section className="py-20 bg-gradient-to-br from-primary/5 via-background to-accent/5">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <AnimatedSection
                key={stat.label}
                delay={i * 0.05}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-2xl bg-primary/5 flex items-center justify-center mx-auto mb-4">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <div className="text-2xl sm:text-3xl font-bold text-gradient mb-1">
                  <AnimatedCounter value={stat.value} />{stat.suffix}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </AnimatedSection>
            );
          })}
        </AnimatedSection>
      </div>
    </section>
  );
}
