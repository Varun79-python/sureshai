"use client";

import {
  BookOpen,
  Cpu,
  Code2,
  Binary,
  Network,
  Database,
  Shield,
  Cloud,
  Brain,
  BarChart3,
  Atom,
  Beaker,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/shared/animated-section";
import Link from "next/link";

const subjects = [
  {
    name: "Data Structures",
    slug: "data-structures",
    icon: Binary,
    color: "#2563eb",
    bg: "bg-blue-50 dark:bg-blue-950/30",
    topics: 45,
    questions: 1200,
    description: "Arrays, Linked Lists, Trees, Graphs, and more",
  },
  {
    name: "Algorithms",
    slug: "algorithms",
    icon: Code2,
    color: "#7c3aed",
    bg: "bg-purple-50 dark:bg-purple-950/30",
    topics: 38,
    questions: 980,
    description: "Sorting, Searching, DP, Greedy, Backtracking",
  },
  {
    name: "Operating Systems",
    slug: "operating-systems",
    icon: Cpu,
    color: "#0891b2",
    bg: "bg-cyan-50 dark:bg-cyan-950/30",
    topics: 32,
    questions: 850,
    description: "Processes, Memory, File Systems, Scheduling",
  },
  {
    name: "DBMS",
    slug: "dbms",
    icon: Database,
    color: "#059669",
    bg: "bg-emerald-50 dark:bg-emerald-950/30",
    topics: 28,
    questions: 720,
    description: "SQL, Normalization, Transactions, Indexing",
  },
  {
    name: "Computer Networks",
    slug: "computer-networks",
    icon: Network,
    color: "#dc2626",
    bg: "bg-red-50 dark:bg-red-950/30",
    topics: 30,
    questions: 680,
    description: "TCP/IP, Routing, HTTP, DNS, Security",
  },
  {
    name: "Machine Learning",
    slug: "machine-learning",
    icon: Brain,
    color: "#d97706",
    bg: "bg-amber-50 dark:bg-amber-950/30",
    topics: 42,
    questions: 1100,
    description: "Regression, Classification, Neural Networks, NLP",
  },
  {
    name: "Cyber Security",
    slug: "cyber-security",
    icon: Shield,
    color: "#16a34a",
    bg: "bg-green-50 dark:bg-green-950/30",
    topics: 25,
    questions: 650,
    description: "Cryptography, Network Security, Ethical Hacking",
  },
  {
    name: "Cloud Computing",
    slug: "cloud-computing",
    icon: Cloud,
    color: "#0284c7",
    bg: "bg-sky-50 dark:bg-sky-950/30",
    topics: 22,
    questions: 540,
    description: "AWS, Azure, Docker, Kubernetes, DevOps",
  },
];

export function FeaturedSubjects() {
  return (
    <section className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <Badge variant="premium" size="lg" className="mb-4">
            Explore Subjects
          </Badge>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Everything You Need to{" "}
            <span className="text-gradient">Succeed</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From core engineering fundamentals to cutting-edge AI — we cover
            every subject across all semesters and branches.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {subjects.map((subject, i) => {
            const Icon = subject.icon;
            return (
              <AnimatedSection key={subject.slug} delay={i * 0.05}>
                <Link href={`/subjects/${subject.slug}`}>
                  <Card className="group h-full cursor-pointer overflow-hidden border-border/50 hover:border-primary/20 transition-all duration-300">
                    <CardContent className="p-6">
                      <div
                        className={`w-12 h-12 rounded-2xl ${subject.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                      >
                        <Icon
                          className="h-6 w-6"
                          style={{ color: subject.color }}
                        />
                      </div>
                      <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                        {subject.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {subject.description}
                      </p>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{subject.topics} topics</span>
                        <span>·</span>
                        <span>{subject.questions.toLocaleString()} Qs</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>

        <AnimatedSection className="text-center mt-10">
          <Link href="/subjects">
            <span className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-dark transition-colors">
              View all 28 subjects
              <span aria-hidden="true">→</span>
            </span>
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
