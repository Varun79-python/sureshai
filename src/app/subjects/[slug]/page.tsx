import { subjects } from "@/lib/data/subjects";
import { SubjectDetailClient } from "./client";

export function generateStaticParams() {
  return subjects.map((s) => ({
    slug: s.slug,
  }));
}

export default async function SubjectDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  return <SubjectDetailClient slug={slug} />;
}
