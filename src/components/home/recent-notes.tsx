"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/shared/animated-section";
import { FileText, ArrowRight, Clock, User } from "lucide-react";
import Link from "next/link";

const notes = [
  {
    title: "Complete Guide to Data Structures",
    slug: "complete-guide-data-structures",
    subject: "Data Structures",
    excerpt: "Arrays, Linked Lists, Stacks, Queues, Trees, Graphs — everything covered with examples.",
    author: "Dr. Suresh Kumar",
    readTime: "25 min",
    topics: 12,
  },
  {
    title: "Operating System Concepts Explained",
    slug: "os-concepts-explained",
    subject: "Operating Systems",
    excerpt: "Deep dive into process management, memory management, file systems, and I/O.",
    author: "Prof. Meena Sharma",
    readTime: "30 min",
    topics: 15,
  },
  {
    title: "Machine Learning Fundamentals",
    slug: "ml-fundamentals",
    subject: "Machine Learning",
    excerpt: "From linear regression to neural networks — a comprehensive overview of ML.",
    author: "Dr. Rajesh Patel",
    readTime: "35 min",
    topics: 18,
  },
  {
    title: "DBMS Interview Questions & Answers",
    slug: "dbms-interview-qa",
    subject: "DBMS",
    excerpt: "Most frequently asked DBMS interview questions with detailed explanations.",
    author: "Ananya Gupta",
    readTime: "20 min",
    topics: 10,
  },
];

export function RecentNotes() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="flex flex-col sm:flex-row sm:items-end justify-between mb-14">
          <div>
            <Badge variant="premium" size="lg" className="mb-4">
              <FileText className="h-3.5 w-3.5 mr-1" />
              Recent Notes
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
              Beautifully Written{" "}
              <span className="text-gradient">Study Notes</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl">
              Expert-crafted notes with syntax highlighting, diagrams, and
              interactive elements.
            </p>
          </div>
          <Link
            href="/notes"
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-dark transition-colors mt-4 sm:mt-0 shrink-0"
          >
            Browse all notes
            <ArrowRight className="h-4 w-4" />
          </Link>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {notes.map((note, i) => (
            <AnimatedSection key={note.slug} delay={i * 0.08}>
              <Link href={`/notes/${note.slug}`}>
                <Card className="group h-full cursor-pointer hover:border-primary/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-1 mb-3">
                      <Badge variant="secondary" size="sm">
                        {note.subject}
                      </Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                      {note.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                      {note.excerpt}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <User className="h-3 w-3" />
                        {note.author}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {note.readTime}
                      </span>
                      <span>{note.topics} topics</span>
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
