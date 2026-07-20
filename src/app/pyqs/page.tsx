"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { AnimatedSection } from "@/components/shared/animated-section";
import { Search, FileText, Download, Calendar, GraduationCap, ExternalLink } from "lucide-react";

const pyqs = [
  { year: 2024, exam: "Semester Exam", subject: "Data Structures", questions: 8, downloads: 3400 },
  { year: 2024, exam: "Semester Exam", subject: "Operating Systems", questions: 7, downloads: 2800 },
  { year: 2023, exam: "Semester Exam", subject: "DBMS", questions: 8, downloads: 3100 },
  { year: 2023, exam: "Semester Exam", subject: "Computer Networks", questions: 7, downloads: 2500 },
  { year: 2023, exam: "GATE", subject: "General Aptitude", questions: 10, downloads: 8900 },
  { year: 2024, exam: "GATE", subject: "Computer Science", questions: 65, downloads: 12000 },
  { year: 2024, exam: "Semester Exam", subject: "Machine Learning", questions: 8, downloads: 2200 },
  { year: 2022, exam: "GATE", subject: "Electronics", questions: 65, downloads: 7800 },
  { year: 2023, exam: "Semester Exam", subject: "Python Programming", questions: 6, downloads: 1900 },
  { year: 2024, exam: "Placement Test", subject: "Aptitude", questions: 30, downloads: 15000 },
  { year: 2024, exam: "Semester Exam", subject: "Digital Electronics", questions: 7, downloads: 2100 },
  { year: 2023, exam: "Semester Exam", subject: "Thermodynamics", questions: 8, downloads: 1800 },
];

export default function PYQsPage() {
  const [search, setSearch] = useState("");

  const filtered = pyqs.filter((p) =>
    p.subject.toLowerCase().includes(search.toLowerCase()) ||
    p.exam.toLowerCase().includes(search.toLowerCase())
  );

  const uniqueExams = ["All", ...Array.from(new Set(pyqs.map((p) => p.exam)))];
  const [examFilter, setExamFilter] = useState("All");

  const displayPyqs = filtered.filter((p) => examFilter === "All" || p.exam === examFilter);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-10">
          <Badge variant="premium" size="lg" className="mb-4">
            <FileText className="h-3.5 w-3.5 mr-1" />
            Previous Year Questions
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Ace Your Exams with <span className="text-gradient">PYQs</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Practice with real exam questions from previous years. Includes semester exams, GATE, and placement tests.
          </p>
        </AnimatedSection>

        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search PYQs..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-11 h-12" />
          </div>
          <div className="flex gap-2 flex-wrap">
            {uniqueExams.slice(0, 5).map((exam) => (
              <button key={exam} onClick={() => setExamFilter(exam)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  examFilter === exam ? "bg-primary text-white shadow-sm" : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
                }`}
              >{exam}</button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {displayPyqs.map((pyq, i) => (
            <AnimatedSection key={`${pyq.subject}-${pyq.year}-${i}`} delay={i * 0.03}>
              <Card className="group cursor-pointer hover:border-primary/20 transition-all duration-300">
                <CardContent className="p-5">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="w-10 h-10 rounded-xl bg-primary/5 flex items-center justify-center shrink-0">
                      <GraduationCap className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold group-hover:text-primary transition-colors">{pyq.subject}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <Badge variant="secondary" size="sm">{pyq.exam}</Badge>
                        <span className="flex items-center gap-1 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3" /> {pyq.year}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{pyq.questions} questions</span>
                    <span className="flex items-center gap-1 text-muted-foreground">
                      <Download className="h-3 w-3" /> {pyq.downloads.toLocaleString()}
                    </span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full mt-3 gap-2 group-hover:border-primary/30">
                    <ExternalLink className="h-4 w-4" /> View Paper
                  </Button>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
