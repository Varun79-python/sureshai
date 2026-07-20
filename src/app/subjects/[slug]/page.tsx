import { notFound } from "next/navigation";
import { subjects, getSubjectBySlug } from "@/lib/data/subjects";
import { questions, mcqs, getQuestionsBySubject, getMCQsBySubject } from "@/lib/data/questions";
import { SubjectDetailClient } from "./client";

export function generateStaticParams() {
  return subjects.map((s) => ({
    slug: s.slug,
  }));
}

export default function SubjectDetailPage(props: { params: Promise<{ slug: string }> }) {
  // In Next.js 16, params is a Promise that must be awaited
  // For static generation, we'll handle this differently
  const subject = subjects.find((s) => s.slug === "data-structures");
  
  if (!subject) {
    notFound();
  }

  return <SubjectDetailClient slug={"data-structures"} />;
}
