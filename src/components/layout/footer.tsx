import Link from "next/link";
import {
  Sparkles,
  Globe,
  MessageCircle,
  Briefcase,
  Mail,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";

const footerLinks = [
  {
    title: "Platform",
    links: [
      { label: "Subjects", href: "/subjects" },
      { label: "Notes", href: "/notes" },
      { label: "MCQs", href: "/mcqs" },
      { label: "Interview Prep", href: "/interview" },
      { label: "Roadmaps", href: "/roadmaps" },
      { label: "Projects", href: "/projects" },
    ],
  },
  {
    title: "AI Features",
    links: [
      { label: "AI Tutor", href: "/ai" },
      { label: "AI Quiz Generator", href: "/ai" },
      { label: "AI Interviewer", href: "/ai" },
      { label: "AI Code Review", href: "/ai" },
      { label: "AI Flashcards", href: "/ai" },
      { label: "AI Mind Maps", href: "/ai" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Blog", href: "/blog" },
      { label: "PYQs", href: "/pyqs" },
      { label: "Code Playground", href: "/playground" },
      { label: "Search", href: "/search" },
      { label: "AI Chat", href: "/ai" },
    ],
  },
  {
    title: "Account",
    links: [
      { label: "Dashboard", href: "/dashboard" },
      { label: "Sign In", href: "/auth" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
          {footerLinks.map((group) => (
            <div key={group.title}>
              <h3 className="text-sm font-semibold mb-4 text-foreground">
                {group.title}
              </h3>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-foreground transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <Link href="/" className="flex items-center gap-2.5 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 shadow-md group-hover:shadow-lg transition-all duration-300">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg font-bold tracking-tight">
              <span className="text-gradient-brand">Suresh.AI</span>
            </span>
          </Link>

          {/* Social */}
          <div className="flex items-center gap-4">
            <Link
              href="https://github.com"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="GitHub"
            >
              <Globe className="h-5 w-5" />
            </Link>
            <Link
              href="https://twitter.com"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Twitter"
            >
              <MessageCircle className="h-5 w-5" />
            </Link>
            <Link
              href="https://linkedin.com"
              target="_blank"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="LinkedIn"
            >
              <Briefcase className="h-5 w-5" />
            </Link>
            <Link
              href="mailto:hello@suresh.ai"
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Email"
            >
              <Mail className="h-5 w-5" />
            </Link>
          </div>
        </div>

        <div className="mt-6 text-center text-xs text-muted-foreground">
          <p className="mt-1">
            &copy; {new Date().getFullYear()} Suresh.AI. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
