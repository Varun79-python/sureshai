"use client";

import { useState, memo, useCallback, Component, type ReactNode } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Copy, Check, AlertTriangle } from "lucide-react";

// ─── Error Boundary ────────────────────────────────────────────────────────────

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class MarkdownErrorBoundary extends Component<
  { children: ReactNode; fallback?: ReactNode },
  ErrorBoundaryState
> {
  constructor(props: { children: ReactNode; fallback?: ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center gap-2 p-3 rounded-lg bg-danger/5 border border-danger/20 text-danger text-sm">
            <AlertTriangle className="h-4 w-4 shrink-0" />
            <span>Failed to render message. The content may contain unsupported formatting.</span>
          </div>
        )
      );
    }
    return this.props.children;
  }
}

// ─── Copy Button ───────────────────────────────────────────────────────────────

function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  return (
    <button
      onClick={handleCopy}
      className="absolute top-2 right-2 p-1.5 rounded-md bg-secondary/80 hover:bg-secondary text-muted-foreground hover:text-foreground transition-all opacity-0 group-hover:opacity-100"
      title={copied ? "Copied!" : "Copy code"}
      aria-label={copied ? "Copied to clipboard" : "Copy code block"}
    >
      {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
    </button>
  );
}

// ─── Markdown Renderer ─────────────────────────────────────────────────────────

interface MarkdownRendererProps {
  content: string;
  isStreaming?: boolean;
}

export const MarkdownRenderer = memo(function MarkdownRenderer({
  content,
  isStreaming,
}: MarkdownRendererProps) {
  if (!content) return null;

  return (
    <MarkdownErrorBoundary>
      <div className="text-sm leading-relaxed max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            code({ className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              const isInline = !match && !String(children).includes("\n");

              if (isInline) {
                return (
                  <code
                    className="px-1.5 py-0.5 rounded-md bg-secondary text-primary font-mono text-[0.85em]"
                    {...props}
                  >
                    {children}
                  </code>
                );
              }

              const codeString = String(children).replace(/\n$/, "");
              const language = match?.[1] || "code";

              return (
                <div className="relative group my-3 rounded-xl border border-border overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-2 bg-secondary/50 border-b border-border">
                    <span className="text-xs font-mono text-muted-foreground">{language}</span>
                    <CopyButton code={codeString} />
                  </div>
                  <pre className="p-4 overflow-x-auto bg-card text-card-foreground text-sm leading-relaxed">
                    <code className={className} {...props}>
                      {codeString}
                    </code>
                  </pre>
                </div>
              );
            },
            p({ children }) {
              return <p className="text-sm leading-relaxed my-1.5">{children}</p>;
            },
            h1({ children }) {
              return <h1 className="text-xl font-bold mt-6 mb-3 text-foreground">{children}</h1>;
            },
            h2({ children }) {
              return <h2 className="text-lg font-semibold mt-5 mb-2 text-foreground">{children}</h2>;
            },
            h3({ children }) {
              return <h3 className="text-base font-semibold mt-4 mb-2 text-foreground">{children}</h3>;
            },
            ul({ children }) {
              return <ul className="list-disc list-inside space-y-1 my-2 text-sm">{children}</ul>;
            },
            ol({ children }) {
              return <ol className="list-decimal list-inside space-y-1 my-2 text-sm">{children}</ol>;
            },
            li({ children }) {
              return <li className="text-sm leading-relaxed">{children}</li>;
            },
            blockquote({ children }) {
              return (
                <blockquote className="border-l-4 border-primary/40 pl-4 py-1 my-3 bg-primary/5 rounded-r-lg text-sm italic text-muted-foreground">
                  {children}
                </blockquote>
              );
            },
            a({ href, children }) {
              return (
                <a
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline underline-offset-2"
                >
                  {children}
                </a>
              );
            },
            table({ children }) {
              return (
                <div className="overflow-x-auto my-3 rounded-lg border border-border">
                  <table className="w-full text-sm">{children}</table>
                </div>
              );
            },
            thead({ children }) {
              return <thead className="bg-secondary/50 border-b border-border">{children}</thead>;
            },
            th({ children }) {
              return <th className="px-3 py-2 text-left font-semibold text-foreground">{children}</th>;
            },
            td({ children }) {
              return <td className="px-3 py-2 border-b border-border last:border-b-0">{children}</td>;
            },
            hr() {
              return <hr className="my-4 border-border" />;
            },
            strong({ children }) {
              return <strong className="font-semibold text-foreground">{children}</strong>;
            },
            em({ children }) {
              return <em className="italic">{children}</em>;
            },
          }}
        >
          {content}
        </ReactMarkdown>
        {isStreaming && (
          <span className="inline-block w-2 h-4 bg-primary animate-pulse ml-0.5 align-middle" aria-label="AI is typing" />
        )}
      </div>
    </MarkdownErrorBoundary>
  );
});
