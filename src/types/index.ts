export interface Subject {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  topics: number;
  questions: number;
  notes: number;
  category: string;
  semester: number[];
  branches: string[];
}

export interface Topic {
  id: string;
  title: string;
  slug: string;
  subjectId: string;
  subjectName: string;
  description: string;
  content?: TopicContent;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
}

export interface TopicContent {
  introduction: string;
  definition: string;
  theory: string;
  working?: string;
  examples: Example[];
  advantages: string[];
  disadvantages: string[];
  applications: string[];
  keyPoints: string[];
  summary: string;
  relatedTopics: string[];
  references: string[];
}

export interface Example {
  title: string;
  description: string;
  code?: string;
  diagram?: string;
}

export interface Question {
  id: string;
  question: string;
  answer: string;
  explanation: string;
  difficulty: "easy" | "medium" | "hard";
  subject: string;
  subjectSlug: string;
  topic: string;
  tags: string[];
  type: "short" | "long" | "numerical" | "mcq" | "coding" | "scenario";
  year?: number;
  references?: string[];
  relatedQuestions?: string[];
}

export interface MCQ {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  subject: string;
  subjectSlug: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
}

export interface Note {
  id: string;
  title: string;
  slug: string;
  subject: string;
  subjectSlug: string;
  topic: string;
  content: string;
  excerpt: string;
  author: string;
  authorAvatar?: string;
  readTime: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  tags: string[];
  bookmarks: number;
  downloads: number;
  createdAt: string;
  updatedAt: string;
}

export interface Roadmap {
  id: string;
  title: string;
  slug: string;
  description: string;
  icon: string;
  color: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  estimatedTime: string;
  steps: RoadmapStep[];
  prerequisites: string[];
  resources: string[];
}

export interface RoadmapStep {
  id: string;
  title: string;
  description: string;
  topics: string[];
  resources: string[];
  duration: string;
}

export interface InterviewQuestion {
  id: string;
  question: string;
  answer: string;
  company: string;
  role: string;
  topic: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
}

export interface Company {
  id: string;
  name: string;
  slug: string;
  logo: string;
  description: string;
  industries: string[];
  questionCount: number;
}

export interface UserProgress {
  completedTopics: string[];
  quizScores: { [quizId: string]: number };
  bookmarks: string[];
  dailyStreak: number;
  lastActive: string;
  achievements: string[];
  totalQuestionsAnswered: number;
  accuracy: number;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface SearchResult {
  id: string;
  title: string;
  description: string;
  url: string;
  type: "subject" | "topic" | "note" | "question" | "mcq" | "roadmap";
  subject?: string;
  difficulty?: string;
}

export interface AIChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export interface PYQ {
  id: string;
  year: number;
  exam: string;
  subject: string;
  subjectSlug: string;
  questions: Question[];
  downloadUrl?: string;
}
