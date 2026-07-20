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
      "The AI tutor helped me understand B+ tree indexing in minutes — something my textbook couldn't explain clearly. The code playground is fantastic for practicing DSA problems side by side with explanations.",
    rating: 5,
  },
  {
    name: "Rahul Verma",
    role: "ECE Student, NIT Trichy",
    content:
      "I've been using the embedded systems roadmap to prepare for campus placements. The step-by-step structure from GPIO to RTOS is exactly what our curriculum lacks. Really helped me connect theory with practice.",
    rating: 4,
  },
  {
    name: "Ananya Patel",
    role: "AI/ML Student, IIIT Hyderabad",
    content:
      "The ML notes are surprisingly detailed — they cover backpropagation and transformer architectures better than some paid courses I've tried. Wish there were more coding exercises though.",
    rating: 4,
  },
  {
    name: "Arjun Reddy",
    role: "ME Student, BITS Pilani",
    content:
      "Thermodynamics and fluid mechanics notes saved me during my end-sem exams. The PYQs with subject links let me jump straight from a question to the relevant study material. Clean interface, no distractions.",
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
            Here's what engineering students are saying about their experience
            with <span className="text-gradient-brand">Suresh.AI</span>.
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
