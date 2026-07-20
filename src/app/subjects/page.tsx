"use client";

import { useState } from "react";
import { subjects } from "@/lib/data/subjects";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AnimatedSection } from "@/components/shared/animated-section";
import {
  Search,
  BookOpen,
  Binary,
  Code2,
  Cpu,
  Database,
  Network,
  Brain,
  Shield,
  Cloud,
  Atom,
  Beaker,
  CircuitBoard,
  BarChart3,
  Zap,
  Flame,
  Waves,
  Sigma,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

const iconMap: Record<string, React.ElementType> = {
  Sigma, Binary, Code2, Cpu, Database, Network,
  Brain, Shield, Cloud, Atom, Beaker, CircuitBoard,
  BarChart3, Zap, Flame, Waves, BookOpen,
};

export default function SubjectsPage() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const categories = ["All", "Core", "CSE", "ECE", "EEE", "ME", "CE", "AI", "Programming", "Placements"];

  const filtered = subjects.filter((s) => {
    const matchesSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = category === "All" || s.category === category;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-10">
          <Badge variant="premium" size="lg" className="mb-4">
            <BookOpen className="h-3.5 w-3.5 mr-1" />
            Subjects
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Explore <span className="text-gradient">Engineering Subjects</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Browse 50+ subjects across all engineering branches and semesters.
            Each subject includes comprehensive notes, questions, and MCQs.
          </p>
        </AnimatedSection>

        {/* Search & Filter */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search subjects..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-11 h-12"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={cn(
                  "px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                  category === cat
                    ? "bg-primary text-white shadow-sm"
                    : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Subjects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((subject, i) => {
            const Icon = iconMap[subject.icon] || BookOpen;
            return (
              <AnimatedSection key={subject.slug} delay={i * 0.03}>
                <Link href={`/subjects/${subject.slug}`}>
                  <Card className="group h-full cursor-pointer hover:border-primary/20 transition-all duration-300">
                    <CardContent className="p-6">
                      <div
                        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform"
                        style={{ backgroundColor: subject.color + "15", color: subject.color }}
                      >
                        <Icon className="h-6 w-6" />
                      </div>
                      <h3 className="text-lg font-semibold mb-1 group-hover:text-primary transition-colors">
                        {subject.name}
                      </h3>
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                        {subject.description}
                      </p>
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        <Badge variant="secondary" size="sm">{subject.category}</Badge>
                        {subject.semester.slice(0, 2).map((sem) => (
                          <Badge key={sem} variant="outline" size="sm">Sem {sem}</Badge>
                        ))}
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{subject.topics} topics</span>
                        <span>·</span>
                        <span>{subject.questions.toLocaleString()} Qs</span>
                        <span>·</span>
                        <span>{subject.notes} notes</span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </AnimatedSection>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No subjects found matching your search.</p>
          </div>
        )}
      </div>
    </div>
  );
}
