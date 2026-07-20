import { subjects, getSubjectBySlug } from "@/lib/data/subjects";
import { notFound } from "next/navigation";
import { SubjectDetailClient } from "./client";
import type { Metadata } from "next";

export function generateStaticParams() {
  return subjects.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const subject = getSubjectBySlug(slug);
  if (!subject) return { title: "Subject Not Found" };
  return {
    title: `${subject.name} — Suresh.AI`,
    description: subject.description,
    openGraph: {
      title: `${subject.name} — Suresh.AI`,
      description: subject.description,
    },
  };
}

export default async function SubjectDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const subject = getSubjectBySlug(slug);
  if (!subject) notFound();
  return <SubjectDetailClient slug={slug} />;
}
