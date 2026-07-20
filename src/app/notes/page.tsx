"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { AnimatedSection } from "@/components/shared/animated-section";
import { Search, FileText, Clock, User, Download, Share2, BookOpen } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

const notes = [
  { title: "Complete Guide to Data Structures", slug: "complete-guide-data-structures", subject: "Data Structures", excerpt: "Arrays, Linked Lists, Stacks, Queues, Trees, Graphs — everything covered with examples.", author: "Dr. Suresh Kumar", readTime: "25 min", topics: 12, downloads: 3400 },
  { title: "Operating System Concepts Explained", slug: "os-concepts-explained", subject: "Operating Systems", excerpt: "Deep dive into process management, memory management, file systems, and I/O.", author: "Prof. Meena Sharma", readTime: "30 min", topics: 15, downloads: 2800 },
  { title: "Machine Learning Fundamentals", slug: "ml-fundamentals", subject: "Machine Learning", excerpt: "From linear regression to neural networks — a comprehensive overview of ML.", author: "Dr. Rajesh Patel", readTime: "35 min", topics: 18, downloads: 4200 },
  { title: "DBMS Interview Questions & Answers", slug: "dbms-interview-qa", subject: "DBMS", excerpt: "Most frequently asked DBMS interview questions with detailed explanations.", author: "Ananya Gupta", readTime: "20 min", topics: 10, downloads: 1900 },
  { title: "Computer Networks — Complete Notes", slug: "computer-networks-notes", subject: "Computer Networks", excerpt: "TCP/IP, OSI model, routing protocols, network security, and more.", author: "Prof. Vikram Singh", readTime: "40 min", topics: 20, downloads: 3100 },
  { title: "Python Programming Handbook", slug: "python-handbook", subject: "Python Programming", excerpt: "Python from basics to advanced: OOP, modules, NumPy, Pandas, Flask.", author: "Sneha Reddy", readTime: "45 min", topics: 22, downloads: 5600 },
  { title: "Digital Electronics Notes", slug: "digital-electronics-notes", subject: "Digital Electronics", excerpt: "Logic gates, Boolean algebra, flip-flops, counters, and multiplexers.", author: "Prof. Arun Kumar", readTime: "25 min", topics: 12, downloads: 2100 },
  { title: "Thermodynamics Study Guide", slug: "thermodynamics-guide", subject: "Thermodynamics", excerpt: "Laws of thermodynamics, entropy, cycles, heat transfer, and refrigeration.", author: "Dr. Priya Patel", readTime: "30 min", topics: 14, downloads: 1800 },
  { title: "Control Systems — Quick Reference", slug: "control-systems-reference", subject: "Control Systems", excerpt: "Transfer functions, stability, root locus, bode plots, state space.", author: "Prof. Meena Sharma", readTime: "20 min", topics: 10, downloads: 1500 },
  { title: "Embedded Systems Programming", slug: "embedded-programming", subject: "Embedded Systems", excerpt: "ARM Cortex-M, GPIO, interrupts, RTOS, and IoT connectivity.", author: "Dr. Rajesh Patel", readTime: "35 min", topics: 16, downloads: 2400 },
];

const subjects = ["All", "Data Structures", "Operating Systems", "Machine Learning", "DBMS", "Computer Networks", "Python Programming", "Digital Electronics", "Thermodynamics", "Control Systems", "Embedded Systems"];

export default function NotesPage() {
  const [search, setSearch] = useState("");
  const [subject, setSubject] = useState("All");

  const filtered = notes.filter((n) => {
    const matchesSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.excerpt.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = subject === "All" || n.subject === subject;
    return matchesSearch && matchesSubject;
  });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-10">
          <Badge variant="premium" size="lg" className="mb-4">
            <FileText className="h-3.5 w-3.5 mr-1" />
            Study Notes
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Beautifully Written <span className="text-gradient">Study Notes</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Expert-crafted notes with syntax highlighting, diagrams, and interactive elements across all engineering subjects.
          </p>
        </AnimatedSection>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search notes..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-11 h-12" />
          </div>
          <div className="flex gap-2 flex-wrap overflow-x-auto">
            {subjects.slice(0, 6).map((s) => (
              <button key={s} onClick={() => setSubject(s)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  subject === s ? "bg-primary text-white shadow-sm" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >{s}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((note, i) => (
            <AnimatedSection key={note.slug} delay={i * 0.05}>
              <Link href={`/notes/${note.slug}`}>
                <Card className="group h-full cursor-pointer hover:border-primary/20 transition-all duration-300">
                  <CardContent className="p-6">
                    <div className="flex items-start gap-1 mb-3">
                      <Badge variant="secondary" size="sm">{note.subject}</Badge>
                    </div>
                    <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">{note.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{note.excerpt}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><User className="h-3 w-3" /> {note.author}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {note.readTime}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-3 pt-3 border-t border-border text-xs text-muted-foreground">
                      <span>{note.topics} topics</span>
                      <span>·</span>
                      <span className="flex items-center gap-1"><Download className="h-3 w-3" /> {note.downloads.toLocaleString()}</span>
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
