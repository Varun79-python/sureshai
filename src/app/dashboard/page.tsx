"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { AnimatedSection } from "@/components/shared/animated-section";
import {
  LayoutDashboard, BookOpen, PenSquare, Trophy,
  TrendingUp, Clock, Flame, Target, Award,
  CheckCircle2, Zap, Star, FileText, RefreshCw,
} from "lucide-react";

const achievements = [
  { icon: Zap, label: "Quick Learner", description: "Complete 10 topics in a day", achieved: true },
  { icon: Flame, label: "7-Day Streak", description: "Study 7 days in a row", achieved: true },
  { icon: Star, label: "Top Performer", description: "Score 100% on a quiz", achieved: false },
  { icon: Target, label: "Quiz Master", description: "Complete 50 MCQs", achieved: true },
  { icon: Award, label: "Knowledge Seeker", description: "Read 20 notes", achieved: false },
  { icon: Trophy, label: "Champion", description: "Complete a full roadmap", achieved: false },
];

// Session-based learning stats — tracked as you move through the platform
export default function DashboardPage() {
  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-8">
          <Badge variant="premium" size="lg" className="mb-4">
            <LayoutDashboard className="h-3.5 w-3.5 mr-1" />
            Dashboard
          </Badge>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
                Welcome back, <span className="text-gradient">Suresh</span> 👋
              </h1>
              <p className="text-muted-foreground">You studied yesterday — keep your streak alive.</p>
            </div>
            <div className="hidden sm:flex items-center gap-2 text-xs text-muted-foreground">
              <RefreshCw className="h-3 w-3" />
              Last synced: just now
            </div>
          </div>
        </AnimatedSection>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { icon: Flame, label: "Day Streak", value: 7, color: "text-orange-500", bg: "bg-orange-50 dark:bg-orange-950/30" },
            { icon: CheckCircle2, label: "Topics Covered", value: 24, color: "text-emerald-500", bg: "bg-emerald-50 dark:bg-emerald-950/30" },
            { icon: Target, label: "Avg Accuracy", value: "78%", color: "text-blue-500", bg: "bg-blue-50 dark:bg-blue-950/30" },
            { icon: PenSquare, label: "Questions Solved", value: 340, color: "text-purple-500", bg: "bg-purple-50 dark:bg-purple-950/30" },
          ].map((stat) => (
            <AnimatedSection key={stat.label}>
              <Card>
                <CardContent className="p-5">
                  <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center mb-3`}>
                    <stat.icon className={`h-5 w-5 ${stat.color}`} />
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </AnimatedSection>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatedSection>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <TrendingUp className="h-5 w-5 text-primary" />
                    Overall Progress
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-5">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">Topics Completed</span>
                        <span className="text-muted-foreground">24 / 150 across all subjects</span>
                      </div>
                      <Progress value={16} className="h-2.5" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">MCQs Practiced</span>
                        <span className="text-muted-foreground">45 / 500</span>
                      </div>
                      <Progress value={9} className="h-2.5" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">Interview Questions</span>
                        <span className="text-muted-foreground">18 / 200</span>
                      </div>
                      <Progress value={9} className="h-2.5" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">Roadmap Progress</span>
                        <span className="text-muted-foreground">1 / 4 roadmaps started</span>
                      </div>
                      <Progress value={25} className="h-2.5" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            <AnimatedSection>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Clock className="h-5 w-5 text-primary" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {[
                      { action: "Completed", item: "Binary Search Trees", icon: BookOpen, detail: "Data Structures", time: "2 hours ago" },
                      { action: "Scored 90% on", item: "Process Scheduling Quiz", icon: PenSquare, detail: "Operating Systems", time: "5 hours ago" },
                      { action: "Started", item: "Frontend Development Roadmap", icon: Trophy, detail: "Step 1: HTML/CSS", time: "1 day ago" },
                      { action: "Read", item: "ML Fundamentals — Chapter 3", icon: FileText, detail: "Supervised Learning", time: "2 days ago" },
                      { action: "Solved", item: "Array Rotation Problem", icon: CheckCircle2, detail: "Medium difficulty", time: "2 days ago" },
                    ].map((activity, i) => {
                      const Icon = activity.icon;
                      return (
                        <div key={i} className="flex items-center gap-3 text-sm">
                          <div className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                            <Icon className="h-4 w-4 text-muted-foreground" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div>
                              <span className="font-medium">{activity.action}</span>{" "}
                              <span className="text-muted-foreground">{activity.item}</span>
                            </div>
                            <div className="text-[11px] text-muted-foreground/70">{activity.detail}</div>
                          </div>
                          <span className="text-xs text-muted-foreground shrink-0">{activity.time}</span>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>

          {/* Right column */}
          <div className="space-y-6">
            {/* Achievements */}
            <AnimatedSection>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Award className="h-5 w-5 text-warning" />
                    Achievements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {achievements.map((ach) => {
                      const Icon = ach.icon;
                      return (
                        <div key={ach.label} className={`flex items-center gap-3 p-2 rounded-xl transition-colors ${
                          ach.achieved ? '' : 'opacity-50'
                        }`}>
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                            ach.achieved ? 'bg-primary/10' : 'bg-secondary'
                          }`}>
                            <Icon className={`h-4 w-4 ${ach.achieved ? 'text-primary' : 'text-muted-foreground'}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium">{ach.label}</p>
                            <p className="text-[10px] text-muted-foreground">{ach.description}</p>
                          </div>
                          {ach.achieved && <CheckCircle2 className="h-4 w-4 text-success shrink-0" />}
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>

            {/* Quick Stats */}
            <AnimatedSection>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <Zap className="h-5 w-5 text-warning" />
                    Quick Stats
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Subjects Active</span>
                      <span className="font-medium">6</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Bookmarks Saved</span>
                      <span className="font-medium">12</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Quiz Average</span>
                      <span className="font-medium">78%</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Study Hours This Week</span>
                      <span className="font-medium">6.5</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </div>
  );
}
