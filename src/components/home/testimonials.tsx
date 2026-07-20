"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/shared/animated-section";
import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Priya Sharma",
    role: "CSE Student, IIT Bombay",
    content:
      "Suresh.AI completely transformed how I prepare for exams. The AI tutor explains complex topics in minutes, and the question bank is incredibly comprehensive.",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "ECE Student, NIT Trichy",
    content:
      "The roadmaps and interview preparation modules are gold. I secured a job at Qualcomm thanks to the embedded systems track. Highly recommended!",
    rating: 5,
  },
  {
    name: "Ananya Patel",
    role: "AI/ML Student, IIIT Hyderabad",
    content:
      "The MCQs with detailed explanations and PYQs with solutions helped me score top marks in every semester. This is the ultimate study companion.",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    role: "Mechanical Engineer, BITS Pilani",
    content:
      "From thermodynamics to CAD — every subject is covered with beautiful notes and interactive content. The dark mode is a lifesaver for late-night study sessions.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <Badge variant="premium" size="lg" className="mb-4">
            Testimonials
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Loved by Students{" "}
            <span className="text-gradient">Everywhere</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Join 100,000+ engineering students who are learning smarter with
            Suresh.AI.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {testimonials.map((t, i) => (
            <AnimatedSection key={t.name} delay={i * 0.1}>
              <Card className="h-full">
                <CardContent className="p-6">
                  <Quote className="h-8 w-8 text-primary/20 mb-4" />
                  <p className="text-sm leading-relaxed text-muted-foreground mb-6">
                    &ldquo;{t.content}&rdquo;
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarFallback className="bg-primary/10 text-primary text-xs">
                        {t.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{t.name}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                    <div className="flex gap-0.5">
                      {Array.from({ length: t.rating }).map((_, i) => (
                        <Star
                          key={i}
                          className="h-3.5 w-3.5 fill-warning text-warning"
                        />
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
