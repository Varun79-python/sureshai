"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AnimatedSection } from "@/components/shared/animated-section";
import { GraduationCap, Clock, ArrowRight, User } from "lucide-react";
import Link from "next/link";

const posts = [
  { title: "How to Prepare for GATE 2025: Complete Strategy Guide", slug: "gate-preparation-guide", author: "Dr. Suresh Kumar", date: "Mar 15, 2026", readTime: "8 min", category: "Exam Prep", excerpt: "A comprehensive strategy to crack GATE 2025 with subject-wise preparation tips, time management, and recommended resources." },
  { title: "Top 10 Data Structures Every Engineer Must Know", slug: "top-ds-engineers", author: "Prof. Meena Sharma", date: "Mar 12, 2026", readTime: "6 min", category: "Programming", excerpt: "Master these essential data structures to excel in technical interviews and competitive programming." },
  { title: "The Ultimate Guide to Technical Interview Preparation", slug: "tech-interview-guide", author: "Ananya Gupta", date: "Mar 10, 2026", readTime: "10 min", category: "Career", excerpt: "From resume screening to offer letter — everything you need to know about cracking tech interviews at top companies." },
  { title: "Understanding Transformer Architecture in NLP", slug: "transformer-nlp", author: "Dr. Rajesh Patel", date: "Mar 8, 2026", readTime: "12 min", category: "AI/ML", excerpt: "A deep dive into the Transformer architecture that revolutionized natural language processing." },
  { title: "Embedded Systems Career Roadmap for 2026", slug: "embedded-career-2026", author: "Prof. Vikram Singh", date: "Mar 5, 2026", readTime: "7 min", category: "Career", excerpt: "Your complete guide to building a successful career in embedded systems and IoT." },
  { title: "5 Common Mistakes in Operating System Exams", slug: "os-exam-mistakes", author: "Sneha Reddy", date: "Mar 3, 2026", readTime: "5 min", category: "Exam Prep", excerpt: "Avoid these common pitfalls in OS exams and improve your scores significantly." },
];

export default function BlogPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-10">
          <Badge variant="premium" size="lg" className="mb-4">
            <GraduationCap className="h-3.5 w-3.5 mr-1" />
            Blog
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Insights for <span className="text-gradient">Engineering Students</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Expert advice, study tips, career guidance, and deep dives into engineering topics.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <AnimatedSection key={post.slug} delay={i * 0.05}>
              <Card className="group h-full cursor-pointer hover:border-primary/20 transition-all duration-300">
                <CardContent className="p-6">
                  <Badge variant="secondary" size="sm" className="mb-3">{post.category}</Badge>
                  <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><User className="h-3 w-3" /> {post.author}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {post.readTime}</span>
                  </div>
                  <div className="text-xs text-muted-foreground mt-2">{post.date}</div>
                  <div className="mt-4 flex items-center gap-1 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                    Read More <ArrowRight className="h-4 w-4" />
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
