import { notFound } from "next/navigation";
import { getNoteContent, getAllNotes, notesContent } from "@/lib/data/notes-content";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bookmark, Download, Printer, Share2, Clock, User, BookOpen } from "lucide-react";
import Link from "next/link";
import type { Metadata } from "next";

// HTML sanitizer — escapes dangerous characters to prevent XSS
function sanitizeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function generateStaticParams() {
  return Object.keys(notesContent).map((slug) => ({ slug }));
}

export async function generateMetadata(props: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await props.params;
  const note = getNoteContent(slug);
  if (!note) return { title: "Note Not Found" };
  return {
    title: `${note.title} — Suresh.AI Notes`,
    description: note.excerpt,
    openGraph: { title: note.title, description: note.excerpt, type: "article" },
  };
}

export default async function NoteDetailPage(props: { params: Promise<{ slug: string }> }) {
  const { slug } = await props.params;
  const note = getNoteContent(slug);
  if (!note) notFound();

  // Convert markdown-like content to sanitized HTML
  const htmlContent = note.content
    .split("\n")
    .map((line) => {
      if (line.startsWith("### ")) return `<h3>${sanitizeHtml(line.slice(4))}</h3>`;
      if (line.startsWith("## ")) return `<h2>${sanitizeHtml(line.slice(3))}</h2>`;
      if (line.startsWith("---")) return `<hr />`;
      if (line.match(/^\d\.\s/)) return `<li>${sanitizeHtml(line.replace(/^\d\.\s/, ""))}</li>`;
      if (line.startsWith("- ")) return `<li>${sanitizeHtml(line.slice(2))}</li>`;
      if (line.startsWith("| ")) return sanitizeHtml(line);
      if (line.startsWith("**") && line.endsWith("**")) return `<strong>${sanitizeHtml(line.slice(2, -2))}</strong>`;
      if (line.match(/`[^`]+`/)) {
        const safe = sanitizeHtml(line);
        return `<p>${safe.replace(/`([^`]+)`/g, "<code>$1</code>")}</p>`;
      }
      if (line.trim() === "") return "";
      return `<p>${sanitizeHtml(line)}</p>`;
    })
    .join("\n");

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Link
          href="/notes"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Notes
        </Link>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3 flex-wrap">
            <Badge variant="premium" size="sm">{note.subject}</Badge>
            {note.tags.slice(0, 3).map((tag) => (
              <Badge key={tag} variant="secondary" size="sm">{tag}</Badge>
            ))}
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{note.title}</h1>
          <p className="text-muted-foreground mb-4">{note.excerpt}</p>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><User className="h-4 w-4" /> {note.author}</span>
            <span className="flex items-center gap-1"><Clock className="h-4 w-4" /> {note.readTime}</span>
            <span className="flex items-center gap-1"><BookOpen className="h-4 w-4" /> Study Material</span>
          </div>
          <div className="flex gap-2 mt-6 flex-wrap">
            <Button variant="outline" size="sm" className="gap-2"><Bookmark className="h-4 w-4" /> Save</Button>
            <Button variant="outline" size="sm" className="gap-2"><Download className="h-4 w-4" /> PDF</Button>
            <Button variant="outline" size="sm" className="gap-2"><Printer className="h-4 w-4" /> Print</Button>
            <Button variant="outline" size="sm" className="gap-2"><Share2 className="h-4 w-4" /> Share</Button>
          </div>
        </div>

        <article className="rounded-2xl border border-border bg-card p-6 sm:p-8 lg:p-10">
          <div
            className="prose prose-zinc dark:prose-invert max-w-none
              prose-headings:font-bold prose-headings:tracking-tight
              prose-h2:text-2xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:pb-2 prose-h2:border-b prose-h2:border-border
              prose-h3:text-xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-foreground
              prose-p:text-base prose-p:leading-7 prose-p:text-muted-foreground prose-p:my-3
              prose-strong:text-foreground prose-strong:font-semibold
              prose-code:text-sm prose-code:bg-secondary prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-primary
              prose-pre:bg-secondary prose-pre:rounded-xl prose-pre:border prose-pre:border-border prose-pre:p-4
              prose-li:text-muted-foreground prose-li:my-1
              prose-hr:border-border prose-hr:my-8
              prose-table:w-full prose-table:border-collapse
              prose-th:bg-secondary prose-th:px-4 prose-th:py-2 prose-th:text-left prose-th:text-sm prose-th:font-semibold
              prose-td:px-4 prose-td:py-2 prose-td:text-sm prose-td:border-b prose-td:border-border
            "
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </article>
      </div>
    </div>
  );
}
