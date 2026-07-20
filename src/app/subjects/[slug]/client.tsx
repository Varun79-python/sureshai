"use client";

import { subjects, getSubjectBySlug } from "@/lib/data/subjects";
import { questions, mcqs, getQuestionsBySubject, getMCQsBySubject } from "@/lib/data/questions";
import { getSubjectContent } from "@/lib/data/subject-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen, Clock, FileText, PenSquare, MessageSquare,
  ChevronRight, Bookmark, Download, Share2, ArrowLeft,
  CheckCircle2, PlayCircle, Sparkles, ExternalLink,
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AnimatedSection } from "@/components/shared/animated-section";
import { useState } from "react";

const iconMap: Record<string, string> = {
  Sigma: "Σ", Binary: "01", Code2: "</>", Cpu: "⚡",
  Database: "DB", Network: "🌐", Brain: "🧠", Shield: "🛡",
  Cloud: "☁", Atom: "⚛", Beaker: "🧪",
};

export function SubjectDetailClient({ slug }: { slug: string }) {
  const [activeTab, setActiveTab] = useState("overview");
  const subject = getSubjectBySlug(slug);

  if (!subject) {
    notFound();
  }

  const subjectQuestions = getQuestionsBySubject(slug);
  const subjectMcqs = getMCQsBySubject(slug);
  const content = getSubjectContent(slug);

  const topics = content?.topics ?? [
    { name: "Introduction", completed: true },
    { name: "Basic Concepts", completed: true },
    { name: "Core Principles", completed: false },
    { name: "Advanced Topics", completed: false },
    { name: "Practical Applications", completed: false },
    { name: "Review & Assessment", completed: false },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <Link
          href="/subjects"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Subjects
        </Link>

        {/* Header */}
        <AnimatedSection className="mb-10">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-6">
            <div className="flex items-start gap-4">
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl shrink-0"
                style={{ backgroundColor: subject.color + "15", color: subject.color }}
              >
                {iconMap[subject.icon] || "📚"}
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="premium" size="sm">{subject.category}</Badge>
                  {subject.semester.slice(0, 3).map((sem) => (
                    <Badge key={sem} variant="secondary" size="sm">Sem {sem}</Badge>
                  ))}
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
                  {subject.name}
                </h1>
                <p className="text-lg text-muted-foreground">{subject.description}</p>
                <div className="flex items-center gap-4 mt-3 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <FileText className="h-4 w-4" /> {subject.topics} Topics
                  </span>
                  <span className="flex items-center gap-1">
                    <PenSquare className="h-4 w-4" /> {subject.questions} Questions
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen className="h-4 w-4" /> {subject.notes} Notes
                  </span>
                </div>
              </div>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button variant="outline" size="sm" className="gap-2">
                <Bookmark className="h-4 w-4" /> Save
              </Button>
              <Button variant="premium" size="sm" className="gap-2">
                <PlayCircle className="h-4 w-4" /> Start Learning
              </Button>
            </div>
          </div>
        </AnimatedSection>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="w-full sm:w-auto overflow-x-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="topics">Topics</TabsTrigger>
            <TabsTrigger value="questions">Questions</TabsTrigger>
            <TabsTrigger value="mcqs">MCQs</TabsTrigger>
            <TabsTrigger value="notes">Notes</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h2 className="text-xl font-semibold mb-4">About this Subject</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    {subject.description}. This subject covers {subject.topics} topics with {subject.questions} practice
                    questions and {subject.notes} detailed study notes. Suitable for semester
                    {subject.semester.join(", ")} students in {subject.branches.join(", ")} branches.
                  </p>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6">
                  <h2 className="text-xl font-semibold mb-4">Quick Stats</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { label: "Topics", value: subject.topics, icon: FileText, color: "text-primary" },
                      { label: "Questions", value: subject.questions, icon: PenSquare, color: "text-accent" },
                      { label: "MCQs", value: subjectMcqs.length, icon: CheckCircle2, color: "text-success" },
                      { label: "Notes", value: subject.notes, icon: BookOpen, color: "text-warning" },
                    ].map((stat) => {
                      const Icon = stat.icon;
                      return (
                        <div key={stat.label} className="text-center p-4 rounded-xl bg-secondary/50">
                          <Icon className={`h-5 w-5 mx-auto mb-2 ${stat.color}`} />
                          <div className="text-2xl font-bold">{stat.value}</div>
                          <div className="text-xs text-muted-foreground">{stat.label}</div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <h2 className="text-lg font-semibold mb-4">Topics Progress</h2>
                  <div className="space-y-3">
                    {topics.map((topic) => (
                      <div key={topic.name} className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          topic.completed ? 'border-success bg-success/10' : 'border-muted-foreground/30'
                        }`}>
                          {topic.completed && <CheckCircle2 className="h-3.5 w-3.5 text-success" />}
                        </div>
                        <span className={`text-sm ${topic.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {topic.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-2xl border border-border bg-card p-6">
                  <h2 className="text-lg font-semibold mb-4">Branches</h2>
                  <div className="flex flex-wrap gap-2">
                    {subject.branches.map((b) => (
                      <Badge key={b} variant="secondary">{b}</Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="questions" className="mt-6">
            <div className="space-y-4">
              {subjectQuestions.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-secondary flex items-center justify-center">
                    <PenSquare className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">Questions Being Added</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Practice questions for this subject are being written by our educators. In the meantime, ask Suresh AI to generate custom practice problems for you.
                  </p>
                  <Link href="/ai">
                    <Button variant="premium" size="sm" className="gap-2">
                      <Sparkles className="h-4 w-4" /> Ask AI Tutor
                    </Button>
                  </Link>
                </div>
              )}
              {subjectQuestions.map((q, i) => (
                <AnimatedSection key={q.id} delay={i * 0.05}>
                  <div className="rounded-2xl border border-border bg-card p-6 hover:border-primary/20 transition-all">
                    <div className="flex items-start gap-3">
                      <span className="text-sm font-medium text-primary shrink-0 mt-0.5">{i + 1}.</span>
                      <div className="flex-1">
                        <h3 className="font-medium mb-2">{q.question}</h3>
                        <div className="flex items-center gap-2 mb-3">
                          <Badge variant={
                            q.difficulty === "easy" ? "success" : q.difficulty === "medium" ? "warning" : "destructive"
                          } size="sm">{q.difficulty}</Badge>
                          <Badge variant="secondary" size="sm">{q.type}</Badge>
                          {q.tags.slice(0, 2).map((tag) => (
                            <Badge key={tag} variant="outline" size="sm">{tag}</Badge>
                          ))}
                        </div>
                        <details className="group">
                          <summary className="text-sm text-primary cursor-pointer hover:underline">
                            Show Answer
                          </summary>
                          <div className="mt-3 p-4 rounded-xl bg-secondary/50 text-sm leading-relaxed">
                            <p className="font-medium mb-2">Answer:</p>
                            <p>{q.answer}</p>
                            <p className="font-medium mt-3 mb-1">Explanation:</p>
                            <p className="text-muted-foreground">{q.explanation}</p>
                          </div>
                        </details>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="mcqs" className="mt-6">
            <div className="space-y-6">
              {subjectMcqs.length === 0 && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-secondary flex items-center justify-center">
                    <CheckCircle2 className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">MCQs Being Added</h3>
                  <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                    Multiple choice questions for {subject.name} are being curated. Browse available MCQs from other subjects or ask Suresh AI to quiz you on this topic.
                  </p>
                  <div className="flex items-center justify-center gap-3">
                    <Link href="/mcqs">
                      <Button variant="outline" size="sm" className="gap-2">
                        Browse All MCQs
                      </Button>
                    </Link>
                    <Link href="/ai">
                      <Button variant="premium" size="sm" className="gap-2">
                        <Sparkles className="h-4 w-4" /> Practice with AI
                      </Button>
                    </Link>
                  </div>
                </div>
              )}
              {subjectMcqs.map((mcq, i) => (
                <AnimatedSection key={mcq.id} delay={i * 0.05}>
                  <MCQCard mcq={mcq} index={i} />
                </AnimatedSection>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="topics" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {topics.map((topic, i) => (
                <AnimatedSection key={topic.name} delay={i * 0.05}>
                  <div className="rounded-2xl border border-border bg-card p-5 hover:border-primary/20 transition-all cursor-pointer group">
                    <div className="flex items-center justify-between mb-2">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        topic.completed ? 'bg-success/10' : 'bg-secondary'
                      }`}>
                        {topic.completed
                          ? <CheckCircle2 className="h-4 w-4 text-success" />
                          : <BookOpen className="h-4 w-4 text-muted-foreground" />
                        }
                      </div>
                      <ChevronRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                    <h3 className="font-medium text-sm">{topic.name}</h3>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="notes" className="mt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {(content?.chapters ?? [
                { title: `${subject.name} — Fundamentals`, description: "Core concepts and foundational principles with detailed explanations and examples.", readTime: "15 min" },
                { title: `${subject.name} — Advanced Topics`, description: "In-depth coverage of advanced topics with problem-solving techniques and applications.", readTime: "20 min" },
                { title: `${subject.name} — Practical Applications`, description: "Real-world applications, case studies, and hands-on practice problems.", readTime: "15 min" },
                { title: `${subject.name} — Exam Preparation Guide`, description: "Comprehensive review with key formulas, quick references, and practice question sets.", readTime: "20 min" },
              ]).map((chapter, i) => (
                <AnimatedSection key={i} delay={i * 0.05}>
                  <div className="rounded-2xl border border-border bg-card p-6 hover:border-primary/20 transition-all cursor-pointer group">
                    <Badge variant="secondary" size="sm" className="mb-2">{subject.name}</Badge>
                    <h3 className="font-semibold mb-2 group-hover:text-primary transition-colors">
                      {chapter.title}
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      {chapter.description}
                    </p>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {chapter.readTime}</span>
                      <span className="flex items-center gap-1"><Download className="h-3 w-3" /> PDF</span>
                      <span className="flex items-center gap-1"><Share2 className="h-3 w-3" /> Share</span>
                    </div>
                  </div>
                </AnimatedSection>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="resources" className="mt-6">
            <div className="rounded-2xl border border-border bg-card p-6">
              <h2 className="text-xl font-semibold mb-4">Recommended Resources</h2>
              <div className="space-y-4">
                {(content?.resources ?? [
                  { name: "Standard Textbook", description: "Comprehensive textbook aligned with the curriculum", type: "book" },
                  { name: "Video Lecture Series", description: "NPTEL and YouTube playlists by IIT professors", type: "video" },
                  { name: "Reference Materials", description: "Additional books and online resources", type: "reference" },
                  { name: "Online Course", description: "Structured learning on Coursera, edX, or MIT OCW", type: "course" },
                ]).map((res, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors">
                    <div className={`p-2 rounded-lg ${
                      res.type === "book" ? "bg-blue-500/10 text-blue-500" :
                      res.type === "video" ? "bg-red-500/10 text-red-500" :
                      res.type === "course" ? "bg-green-500/10 text-green-500" :
                      "bg-purple-500/10 text-purple-500"
                    }`}>
                      {res.type === "book" ? <BookOpen className="h-4 w-4" /> :
                       res.type === "video" ? <PlayCircle className="h-4 w-4" /> :
                       res.type === "course" ? <Sparkles className="h-4 w-4" /> :
                       <ExternalLink className="h-4 w-4" />}
                    </div>
                    <div>
                      <p className="text-sm font-medium">{res.name}</p>
                      <p className="text-xs text-muted-foreground">{res.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function MCQCard({ mcq, index }: { mcq: { id: string; question: string; options: string[]; correctAnswer: number; explanation: string; difficulty: string; tags: string[] }; index: number }) {
  const [selected, setSelected] = useState<number | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleSelect = (optIndex: number) => {
    if (showResult) return;
    setSelected(optIndex);
    setShowResult(true);
  };

  const isCorrect = selected === mcq.correctAnswer;

  return (
    <div className="rounded-2xl border border-border bg-card p-6">
      <div className="flex items-start gap-3 mb-4">
        <span className="text-sm font-medium text-primary shrink-0 mt-0.5">{index + 1}.</span>
        <div className="flex-1">
          <h3 className="font-medium mb-3">{mcq.question}</h3>
          <div className="space-y-2">
            {mcq.options.map((opt, optIndex) => {
              let variant = "border-border hover:border-primary/30" as string;
              if (showResult && optIndex === mcq.correctAnswer) {
                variant = "border-success bg-success/5";
              } else if (showResult && selected === optIndex && !isCorrect) {
                variant = "border-danger bg-danger/5";
              } else if (selected === optIndex) {
                variant = "border-primary/30 bg-primary/5";
              }
              return (
                <button
                  key={optIndex}
                  onClick={() => handleSelect(optIndex)}
                  className={`w-full text-left p-3 rounded-xl border ${variant} transition-all duration-200 text-sm flex items-center gap-3`}
                >
                  <span className={`w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium shrink-0 ${
                    showResult && optIndex === mcq.correctAnswer
                      ? 'border-success text-success'
                      : showResult && selected === optIndex && !isCorrect
                      ? 'border-danger text-danger'
                      : 'border-muted-foreground/30'
                  }`}>
                    {String.fromCharCode(65 + optIndex)}
                  </span>
                  {opt}
                </button>
              );
            })}
          </div>
          {showResult && (
            <div className={`mt-4 p-4 rounded-xl ${isCorrect ? 'bg-success/5 border border-success/20' : 'bg-danger/5 border border-danger/20'}`}>
              <p className={`text-sm font-medium mb-1 ${isCorrect ? 'text-success' : 'text-danger'}`}>
                {isCorrect ? '✓ Correct!' : '✗ Incorrect'}
              </p>
              <p className="text-sm text-muted-foreground">{mcq.explanation}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
