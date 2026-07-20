"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatedSection } from "@/components/shared/animated-section";
import {
  Play,
  Terminal,
  RotateCcw,
  Copy,
  Check,
  FlaskConical,
  Loader2,
  ChevronDown,
  AlertCircle,
  Info,
} from "lucide-react";

// ── Language definitions ──────────────────────────────────────────
const LANGUAGES = [
  { id: "javascript", label: "JavaScript", mode: "client" as const, note: "" },
  { id: "typescript", label: "TypeScript", mode: "client" as const, note: "Runs as JS (skip compilation)" },
  { id: "python", label: "Python", mode: "wasm" as const, note: "Pyodide WASM (auto-loaded)" },
  { id: "sql", label: "SQL", mode: "wasm" as const, note: "sql.js WASM (auto-loaded)" },
  { id: "html", label: "HTML/CSS", mode: "client" as const, note: "Renders in sandboxed iframe" },
  // Server-side only
  { id: "c", label: "C (GCC)", mode: "server" as const, note: "" },
  { id: "c++", label: "C++", mode: "server" as const, note: "" },
  { id: "java", label: "Java", mode: "server" as const, note: "" },
  { id: "go", label: "Go", mode: "server" as const, note: "" },
  { id: "rust", label: "Rust", mode: "server" as const, note: "" },
  { id: "ruby", label: "Ruby", mode: "server" as const, note: "" },
  { id: "php", label: "PHP", mode: "server" as const, note: "" },
  { id: "swift", label: "Swift", mode: "server" as const, note: "" },
  { id: "kotlin", label: "Kotlin", mode: "server" as const, note: "" },
  { id: "bash", label: "Bash", mode: "server" as const, note: "" },
  { id: "csharp", label: "C#", mode: "server" as const, note: "" },
];

// ── Preset code examples ──────────────────────────────────────────
const EXAMPLES: Record<string, string> = {
  javascript: `// JavaScript — Hello, World!
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log("Hello, Engineering World!");
console.log("First 10 Fibonacci numbers:");
for (let i = 0; i < 10; i++) {
  console.log(\`  F(\${i}) = \${fibonacci(i)}\`);
}`,

  typescript: `// TypeScript — Hello, World!
function fibonacci(n: number): number {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
console.log("Hello, Engineering World!");
for (let i = 0; i < 10; i++) {
  console.log(\`F(\${i}) = \${fibonacci(i)}\`);
}`,

  python: `# Python — Hello, Engineering World!
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print("Hello, Engineering World!")
print("First 10 Fibonacci numbers:")
for i in range(10):
    print(f"  F({i}) = {fibonacci(i)}")`,

  sql: `-- SQL — Sample Queries
CREATE TABLE students (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    branch TEXT,
    cgpa REAL
);
INSERT INTO students VALUES (1, 'Alice', 'CSE', 8.5);
INSERT INTO students VALUES (2, 'Bob', 'ECE', 7.8);
INSERT INTO students VALUES (3, 'Charlie', 'ME', 6.9);
SELECT * FROM students ORDER BY cgpa DESC;`,

  html: `<!-- HTML + CSS + JS -->
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: system-ui; display: flex; justify-content: center; align-items: center; min-height: 200px; background: #1a1a2e; color: white; margin: 0; }
    .card { background: #16213e; padding: 2rem; border-radius: 16px; text-align: center; box-shadow: 0 8px 32px rgba(0,0,0,0.3); }
    h1 { color: #4f8cff; margin: 0 0 0.5rem; }
    p { color: #a0aec0; margin: 0; }
    button { margin-top: 1rem; padding: 0.5rem 1.5rem; border: none; border-radius: 8px; background: #4f8cff; color: white; cursor: pointer; }
  </style>
</head>
<body>
  <div class="card">
    <h1>Hello!</h1>
    <p id="msg">Click the button</p>
    <button onclick="document.getElementById('msg').textContent = 'Clicked! ' + new Date().toLocaleTimeString()">Click Me</button>
  </div>
</body>
</html>`,

  c: `/* C — requires a server execution backend (e.g., Piston API) */`,
  "c++": `/* C++ — requires a server execution backend */`,
  java: `/* Java — requires a server execution backend */`,
  go: `/* Go — requires a server execution backend */`,
  rust: `/* Rust — requires a server execution backend */`,
  ruby: `/* Ruby — requires a server execution backend */`,
  php: `/* PHP — requires a server execution backend */`,
  swift: `/* Swift — requires a server execution backend */`,
  kotlin: `/* Kotlin — requires a server execution backend */`,
  bash: `# Bash — requires a server execution backend`,
  csharp: `/* C# — requires a server execution backend */`,
};

// ── Language → file extension ─────────────────────────────────────
const FILE_EXTENSIONS: Record<string, string> = {
  javascript: "js",
  typescript: "ts",
  python: "py",
  sql: "sql",
  html: "html",
  c: "c",
  "c++": "cpp",
  java: "java",
  go: "go",
  rust: "rs",
  ruby: "rb",
  php: "php",
  swift: "swift",
  kotlin: "kt",
  bash: "sh",
  csharp: "cs",
};

// ── In-browser JavaScript runner ──────────────────────────────────
function runJavaScript(code: string): { output: string; error: string | null; time: number } {
  const logs: string[] = [];
  const start = performance.now();

  const mockConsole = {
    log: (...args: unknown[]) => logs.push(args.map(String).join(" ")),
    info: (...args: unknown[]) => logs.push("[info] " + args.map(String).join(" ")),
    warn: (...args: unknown[]) => logs.push("[warn] " + args.map(String).join(" ")),
    error: (...args: unknown[]) => logs.push("[error] " + args.map(String).join(" ")),
  };

  try {
    const fn = new Function("console", code);
    fn(mockConsole);
    const elapsed = (performance.now() - start) / 1000;
    return { output: logs.join("\n") || "(no output)", error: null, time: elapsed };
  } catch (err) {
    const elapsed = (performance.now() - start) / 1000;
    const msg = err instanceof Error ? err.message : String(err);
    return { output: logs.join("\n"), error: msg, time: elapsed };
  }
}

// ── Pyodide loader (singleton) ────────────────────────────────────
let pyodideInstance: unknown = null;
let pyodideLoading: Promise<unknown> | null = null;

async function loadPyodideRuntime(): Promise<unknown> {
  if (pyodideInstance) return pyodideInstance;
  if (pyodideLoading) return pyodideLoading;

  pyodideLoading = (async () => {
    try {
      // Dynamically load Pyodide from CDN
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/pyodide.js";
      document.head.appendChild(script);

      await new Promise<void>((resolve, reject) => {
        script.onload = () => resolve();
        script.onerror = () => reject(new Error("Failed to load Pyodide script"));
      });

      // @ts-expect-error - Pyodide is loaded globally
      const pyodide = await globalThis.loadPyodide({
        indexURL: "https://cdn.jsdelivr.net/pyodide/v0.25.0/full/",
      });
      pyodideInstance = pyodide;
      return pyodide;
    } finally {
      pyodideLoading = null;
    }
  })();

  return pyodideLoading;
}

async function runPython(code: string): Promise<{ output: string; error: string | null; time: number }> {
  const start = performance.now();
  try {
    const pyodide: any = await loadPyodideRuntime();

    // Capture stdout
    const stdout: string[] = [];
    pyodide.setStdout({
      batched: (text: string) => stdout.push(text),
    });

    // Note: pyodide.runPythonAsync supports top-level await
    await pyodide.runPythonAsync(code);
    const elapsed = (performance.now() - start) / 1000;

    // Restore default
    pyodide.setStdout({ batched: (text: string) => {} });

    return { output: stdout.join("\n") || "(no output)", error: null, time: elapsed };
  } catch (err) {
    const elapsed = (performance.now() - start) / 1000;
    const msg = err instanceof Error ? err.message : String(err);
    return { output: "", error: msg, time: elapsed };
  }
}

// ── sql.js loader (singleton) ─────────────────────────────────────
let sqlJsInstance: unknown = null;
let sqlJsLoading: Promise<unknown> | null = null;

async function loadSqlJs(): Promise<any> {
  if (sqlJsInstance) return sqlJsInstance;
  if (sqlJsLoading) return sqlJsLoading;

  sqlJsLoading = (async () => {
    try {
      // @ts-expect-error - dynamic import from CDN
      const initSqlJs = await import("https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/sql-wasm.js");
      const SQL = await initSqlJs.default({
        locateFile: (file: string) =>
          `https://cdn.jsdelivr.net/npm/sql.js@1.10.3/dist/${file}`,
      });
      sqlJsInstance = SQL;
      return SQL;
    } finally {
      sqlJsLoading = null;
    }
  })();

  return sqlJsLoading;
}

async function runSql(code: string): Promise<{ output: string; error: string | null; time: number }> {
  const start = performance.now();
  try {
    const SQL: any = await loadSqlJs();
    const db = new SQL.Database();
    const statements = code.split(";").map((s) => s.trim()).filter(Boolean);
    const results: string[] = [];

    for (const stmt of statements) {
      try {
        const result = db.exec(stmt);
        if (result.length > 0) {
          for (const r of result) {
            if (r.columns && r.values) {
              results.push("| " + r.columns.join(" | ") + " |");
              results.push("|" + r.columns.map(() => "---").join("|") + "|");
              for (const row of r.values) {
                results.push("| " + row.map((v: unknown) => String(v ?? "NULL")).join(" | ") + " |");
              }
            }
          }
        }
      } catch (e) {
        // Statement like INSERT may not return rows but might succeed
        if (e instanceof Error && !e.message.includes("no such table")) {
          results.push("[error] " + e.message);
        }
      }
    }

    const elapsed = (performance.now() - start) / 1000;
    return { output: results.join("\n") || "(queries executed successfully)", error: null, time: elapsed };
  } catch (err) {
    const elapsed = (performance.now() - start) / 1000;
    const msg = err instanceof Error ? err.message : String(err);
    return { output: "", error: msg, time: elapsed };
  }
}

// ── HTML runner (sandboxed iframe) ─────────────────────────────────
function runHtml(code: string): { output: string; error: string | null; time: number } {
  const start = performance.now();
  const elapsed = (performance.now() - start) / 1000;
  return {
    output: "HTML preview will appear below.",
    error: null,
    time: elapsed,
  };
}

// ── Page component ─────────────────────────────────────────────────
export default function PlaygroundPage() {
  const [language, setLanguage] = useState("javascript");
  const [code, setCode] = useState(EXAMPLES["javascript"]);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [execTime, setExecTime] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showServerNote, setShowServerNote] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [htmlPreviewKey, setHtmlPreviewKey] = useState(0);

  // Cleanup Pyodide stdout on unmount
  useEffect(() => {
    return () => {
      if (pyodideInstance) {
        try {
          (pyodideInstance as any).setStdout({ batched: () => {} });
        } catch { /* ignore */ }
      }
    };
  }, []);

  const handleLanguageChange = useCallback(
    (langId: string) => {
      setLanguage(langId);
      setCode(EXAMPLES[langId] || "// Write your code here\n");
      setOutput("");
      setError(null);
      setExecTime(null);
      setShowServerNote(false);
      setLangOpen(false);
    },
    []
  );

  const handleRun = useCallback(async () => {
    if (!code.trim()) return;
    setIsRunning(true);
    setOutput("");
    setError(null);
    setExecTime(null);
    setShowServerNote(false);

    const lang = LANGUAGES.find((l) => l.id === language);
    if (!lang) return;

    // Server-side languages — show message
    if (lang.mode === "server") {
      setOutput(`╔══════════════════════════════════════════════════╗
║  Server-side execution required            ║
╠══════════════════════════════════════════════════╣
║  "${lang.label}" cannot run in the browser.      ║
║                                              ║
║  To enable: deploy a Piston API instance     ║
║  or set up a compatible code execution       ║
║  backend service.                            ║
║                                              ║
║  For now, try JavaScript, Python, or SQL     ║
║  which run directly in your browser.         ║
╚══════════════════════════════════════════════════╝`);
      setIsRunning(false);
      setShowServerNote(true);
      return;
    }

    try {
      let result: { output: string; error: string | null; time: number };

      switch (language) {
        case "javascript":
        case "typescript":
          result = runJavaScript(code);
          break;

        case "python":
          result = await runPython(code);
          break;

        case "sql":
          result = await runSql(code);
          break;

        case "html":
          result = runHtml(code);
          // Trigger iframe refresh
          setHtmlPreviewKey((k) => k + 1);
          break;

        default:
          result = { output: "(unknown language)", error: null, time: 0 };
      }

      setOutput(result.output);
      setError(result.error);
      setExecTime(result.time);
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      setError(msg);
      setOutput("");
    } finally {
      setIsRunning(false);
    }
  }, [language, code]);

  // Auto-render HTML preview after run
  useEffect(() => {
    if (language === "html" && output && htmlPreviewKey > 0 && iframeRef.current) {
      const blob = new Blob([code], { type: "text/html" });
      const url = URL.createObjectURL(blob);
      iframeRef.current.src = url;
      return () => URL.revokeObjectURL(url);
    }
  }, [htmlPreviewKey, language, code, output]);

  const handleReset = useCallback(() => {
    setCode(EXAMPLES[language] || "// Write your code here\n");
    setOutput("");
    setError(null);
    setExecTime(null);
    setShowServerNote(false);
  }, [language]);

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [code]);

  const handleTabInsert = useCallback(
    (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const ta = e.currentTarget;
        const start = ta.selectionStart;
        const end = ta.selectionEnd;
        setCode(code.substring(0, start) + "    " + code.substring(end));
        requestAnimationFrame(() => {
          ta.selectionStart = ta.selectionEnd = start + 4;
        });
      }
    },
    [code]
  );

  const currentLang = LANGUAGES.find((l) => l.id === language) || LANGUAGES[0];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <AnimatedSection className="mb-6">
          <Badge variant="premium" size="lg" className="mb-4">
            <FlaskConical className="h-3.5 w-3.5 mr-1" />
            Code Playground
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
            Code <span className="text-gradient">Execution Terminal</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Write and run code directly in your browser. JavaScript, TypeScript, Python (via Pyodide),
            SQL (via sql.js), and HTML render in real time.
          </p>
        </AnimatedSection>

        {/* Toolbar */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {/* Language selector */}
          <div className="relative">
            <button
              onClick={() => setLangOpen(!langOpen)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-border bg-card text-sm font-medium hover:bg-secondary transition-colors"
            >
              <span className="text-xs uppercase tracking-wider text-muted-foreground mr-0.5">Lang:</span>
              {currentLang.label}
              {currentLang.mode === "wasm" && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-blue-500/10 text-blue-500 font-mono">WASM</span>
              )}
              {currentLang.mode === "server" && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-yellow-500/10 text-yellow-500 font-mono">SRV</span>
              )}
              {currentLang.mode === "client" && (
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-green-500/10 text-green-500 font-mono">BROWSER</span>
              )}
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>
            {langOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                <div className="absolute top-full left-0 mt-1 z-50 w-64 max-h-80 overflow-y-auto rounded-xl border border-border bg-card shadow-xl backdrop-blur-xl">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => handleLanguageChange(lang.id)}
                      className={`w-full text-left px-3.5 py-2.5 text-sm transition-colors hover:bg-secondary flex items-center justify-between ${
                        language === lang.id
                          ? "text-primary font-medium bg-primary/5"
                          : "text-foreground"
                      }`}
                    >
                      <span>{lang.label}</span>
                      <span className={`text-[10px] px-1.5 py-0.5 rounded font-mono ${
                        lang.mode === "client"
                          ? "bg-green-500/10 text-green-500"
                          : lang.mode === "wasm"
                          ? "bg-blue-500/10 text-blue-500"
                          : "bg-yellow-500/10 text-yellow-500"
                      }`}>
                        {lang.mode === "client" ? "BROWSER" : lang.mode === "wasm" ? "WASM" : "SERVER"}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

          {currentLang.mode === "wasm" && (
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-muted-foreground">
              <Info className="h-3 w-3" />
              First run loads WASM (~8MB for Python, ~2MB for SQL)
            </div>
          )}

          <div className="flex-1" />

          <Button variant="outline" size="sm" onClick={handleReset} className="gap-1.5">
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </Button>

          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy}>
            {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
          </Button>

          <Button
            size="default"
            className="gap-1.5 px-5"
            onClick={handleRun}
            disabled={isRunning || !code.trim()}
          >
            {isRunning ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Running...
              </>
            ) : (
              <>
                <Play className="h-4 w-4" />
                Run
              </>
            )}
          </Button>
        </div>

        {/* Server-side notice */}
        {showServerNote && (
          <div className="mb-4 flex items-start gap-2.5 p-3 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-sm">
            <AlertCircle className="h-4 w-4 text-yellow-500 mt-0.5 shrink-0" />
            <div className="text-muted-foreground">
              <strong className="text-foreground">{currentLang.label}</strong> needs a server-side execution backend.
              Switch to <button onClick={() => handleLanguageChange("javascript")} className="text-primary underline underline-offset-2 hover:no-underline">JavaScript</button>,{" "}
              <button onClick={() => handleLanguageChange("python")} className="text-primary underline underline-offset-2 hover:no-underline">Python</button>, or{" "}
              <button onClick={() => handleLanguageChange("sql")} className="text-primary underline underline-offset-2 hover:no-underline">SQL</button>{" "}
              which run entirely in the browser with no extra setup.
            </div>
          </div>
        )}

        {/* Editor + Output grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Code editor */}
          <Card className={`overflow-hidden border-border ${language === "html" ? "lg:col-span-3" : "lg:col-span-3"}`}>
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-card/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <span className="text-xs text-muted-foreground ml-2 font-mono">
                {currentLang.label} — main.{FILE_EXTENSIONS[language] || "txt"}
              </span>
            </div>
            <textarea
              ref={textareaRef}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              onKeyDown={handleTabInsert}
              className="w-full min-h-[400px] lg:min-h-[500px] p-4 font-mono text-sm leading-relaxed bg-zinc-950 dark:bg-black text-green-400 resize-none outline-none border-0 selection:bg-primary/30"
              spellCheck={false}
              aria-label="Code editor"
            />
          </Card>

          {/* Terminal output */}
          <Card className="overflow-hidden border-border flex flex-col lg:col-span-2">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-card/50">
              <Terminal className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Terminal Output</span>
              {isRunning && (
                <span className="ml-auto text-xs text-yellow-500 animate-pulse">⏳ running...</span>
              )}
              {execTime !== null && !isRunning && (
                <span className="ml-auto text-xs text-muted-foreground">
                  ⏱ {execTime.toFixed(2)}s
                </span>
              )}
            </div>
            {language === "html" && output && !error && (
              <div className="border-b border-border">
                <iframe
                  ref={iframeRef}
                  title="HTML Preview"
                  className="w-full h-48 bg-white dark:bg-zinc-900"
                  sandbox="allow-scripts"
                />
              </div>
            )}
            <pre className="flex-1 p-4 font-mono text-sm leading-relaxed bg-black/90 dark:bg-black text-green-400/90 overflow-auto min-h-[280px] lg:min-h-[500px] whitespace-pre-wrap">
              {error ? (
                <code className="text-red-400">{error}</code>
              ) : output ? (
                <code>{output}</code>
              ) : (
                <span className="text-zinc-500 italic">
                  {isRunning
                    ? "⏳ Running..."
                    : currentLang.mode === "server"
                    ? "Select and run a BROWSER or WASM language"
                    : 'Click "Run" to execute the code.'}
                </span>
              )}
            </pre>
          </Card>
        </div>
      </div>
    </div>
  );
}
