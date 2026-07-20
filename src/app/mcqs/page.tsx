"use client";

import { useState, useEffect } from "react";
import { mcqs } from "@/lib/data/questions";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AnimatedSection } from "@/components/shared/animated-section";
import { Search, PenSquare, Timer, RotateCcw, CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { subjects } from "@/lib/data/subjects";

export default function MCQsPage() {
  const [search, setSearch] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("All");
  const [difficultyFilter, setDifficultyFilter] = useState("All");
  const [currentMcqs, setCurrentMcqs] = useState(mcqs);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showResults, setShowResults] = useState(false);
  const [timer, setTimer] = useState(0);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (timerRunning) {
      interval = setInterval(() => setTimer((t) => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timerRunning]);

  const filteredMcqs = currentMcqs.filter((m) => {
    const matchesSearch = m.question.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = subjectFilter === "All" || m.subject === subjectFilter;
    const matchesDifficulty = difficultyFilter === "All" || m.difficulty === difficultyFilter;
    return matchesSearch && matchesSubject && matchesDifficulty;
  });

  const handleSelect = (mcqId: string, optionIndex: number) => {
    if (!showResults) {
      setSelectedAnswers((prev) => ({ ...prev, [mcqId]: optionIndex }));
    }
  };

  const handleSubmit = () => {
    setShowResults(true);
    setTimerRunning(false);
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
    setTimer(0);
    setCurrentMcqs(mcqs.sort(() => Math.random() - 0.5).slice(0, 10));
  };

  const startTimer = () => {
    setTimerRunning(true);
  };

  const score = showResults
    ? filteredMcqs.filter((m) => selectedAnswers[m.id] === m.correctAnswer).length
    : 0;

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-10">
          <Badge variant="premium" size="lg" className="mb-4">
            <PenSquare className="h-3.5 w-3.5 mr-1" />
            Practice MCQs
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Test Your Knowledge with <span className="text-gradient">MCQs</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Practice thousands of multiple-choice questions across all engineering subjects with instant feedback and detailed explanations.
          </p>
        </AnimatedSection>

        {/* Controls */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search MCQs..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-11 h-12" />
          </div>
          <select
            value={subjectFilter}
            onChange={(e) => setSubjectFilter(e.target.value)}
            className="h-12 rounded-xl border border-input bg-background px-4 text-sm"
          >
            <option value="All">All Subjects</option>
            {subjects.slice(0, 10).map((s) => (
              <option key={s.slug} value={s.name}>{s.name}</option>
            ))}
          </select>
          <select
            value={difficultyFilter}
            onChange={(e) => setDifficultyFilter(e.target.value)}
            className="h-12 rounded-xl border border-input bg-background px-4 text-sm"
          >
            <option value="All">All Levels</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        {/* Timer & Actions */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2 text-sm">
            <Timer className="h-4 w-4 text-muted-foreground" />
            <span className="font-mono">{formatTime(timer)}</span>
            {!timerRunning && !showResults && (
              <Button variant="outline" size="sm" onClick={startTimer} className="ml-2">Start Timer</Button>
            )}
          </div>
          <div className="flex gap-2">
            {!showResults && filteredMcqs.length > 0 && (
              <Button onClick={handleSubmit} variant="premium" size="sm" disabled={Object.keys(selectedAnswers).length === 0}>
                Submit Answers
              </Button>
            )}
            <Button onClick={handleReset} variant="outline" size="sm" className="gap-2">
              <RotateCcw className="h-4 w-4" /> New Quiz
            </Button>
          </div>
        </div>

        {/* Score */}
        {showResults && (
          <div className="mb-8 p-6 rounded-2xl border bg-card">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
                <CheckCircle2 className="h-8 w-8 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">Your Score: {score}/{filteredMcqs.length}</h2>
                <p className="text-muted-foreground">
                  Accuracy: {((score / filteredMcqs.length) * 100).toFixed(0)}% · Time: {formatTime(timer)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* MCQs */}
        <div className="space-y-6">
          {filteredMcqs.map((mcq, i) => (
            <AnimatedSection key={mcq.id} delay={i * 0.03}>
              <div className="rounded-2xl border border-border bg-card p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Badge variant="secondary" size="sm">{mcq.subject}</Badge>
                  <Badge variant={mcq.difficulty === "easy" ? "success" : mcq.difficulty === "medium" ? "warning" : "destructive"} size="sm">{mcq.difficulty}</Badge>
                </div>
                <h3 className="font-medium mb-4">
                  <span className="text-primary font-bold mr-2">{i + 1}.</span>
                  {mcq.question}
                </h3>
                <div className="space-y-2">
                  {mcq.options.map((opt, optIndex) => {
                    const isSelected = selectedAnswers[mcq.id] === optIndex;
                    const isCorrectAnswer = showResults && optIndex === mcq.correctAnswer;
                    const isWrongSelection = showResults && isSelected && !isCorrectAnswer;

                    return (
                      <button
                        key={optIndex}
                        onClick={() => handleSelect(mcq.id, optIndex)}
                        className={cn(
                          "w-full text-left p-3 rounded-xl border transition-all duration-200 text-sm flex items-center gap-3",
                          isCorrectAnswer && "border-success bg-success/5",
                          isWrongSelection && "border-danger bg-danger/5",
                          isSelected && !showResults && "border-primary/30 bg-primary/5",
                          !isSelected && !showResults && "border-border hover:border-primary/30",
                          showResults && !isCorrectAnswer && !isWrongSelection && "border-border opacity-70"
                        )}
                        disabled={showResults}
                      >
                        <span className={cn(
                          "w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-medium shrink-0",
                          isCorrectAnswer && "border-success text-success bg-success/10",
                          isWrongSelection && "border-danger text-danger bg-danger/10",
                          isSelected && !showResults && "border-primary text-primary",
                          !isSelected && "border-muted-foreground/30"
                        )}>
                          {isCorrectAnswer ? "✓" : isWrongSelection ? "✗" : String.fromCharCode(65 + optIndex)}
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>
                {showResults && (
                  <div className="mt-4 p-4 rounded-xl bg-secondary/50">
                    <p className="text-sm text-muted-foreground">{mcq.explanation}</p>
                  </div>
                )}
              </div>
            </AnimatedSection>
          ))}
        </div>

        {filteredMcqs.length === 0 && (
          <div className="text-center py-20">
            <p className="text-muted-foreground text-lg">No MCQs found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
