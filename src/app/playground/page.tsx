"use client";

import { useState, useRef, useCallback } from "react";
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
} from "lucide-react";

// ── Language definitions ──────────────────────────────────────────
const LANGUAGES = [
  { id: "python", label: "Python" },
  { id: "javascript", label: "JavaScript" },
  { id: "typescript", label: "TypeScript" },
  { id: "java", label: "Java" },
  { id: "c", label: "C" },
  { id: "c++", label: "C++" },
  { id: "csharp", label: "C#" },
  { id: "go", label: "Go" },
  { id: "rust", label: "Rust" },
  { id: "ruby", label: "Ruby" },
  { id: "php", label: "PHP" },
  { id: "swift", label: "Swift" },
  { id: "kotlin", label: "Kotlin" },
  { id: "rscript", label: "R" },
  { id: "julia", label: "Julia" },
  { id: "dart", label: "Dart" },
  { id: "perl", label: "Perl" },
  { id: "haskell", label: "Haskell" },
  { id: "lua", label: "Lua" },
  { id: "bash", label: "Bash" },
  { id: "sqlite3", label: "SQL" },
];

// ── Example code snippets per language ─────────────────────────────
const EXAMPLES: Record<string, string> = {
  python: `# Python — Hello, Engineering World!
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print("Hello, Engineering World!")
print("First 10 Fibonacci numbers:")
for i in range(10):
    print(f"  F({i}) = {fibonacci(i)}")`,

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
console.log("First 10 Fibonacci numbers:");
for (let i = 0; i < 10; i++) {
    console.log(\`  F(\${i}) = \${fibonacci(i)}\`);
}`,

  java: `// Java — Hello, World!
public class Main {
    public static int fibonacci(int n) {
        if (n <= 1) return n;
        return fibonacci(n - 1) + fibonacci(n - 2);
    }

    public static void main(String[] args) {
        System.out.println("Hello, Engineering World!");
        System.out.println("First 10 Fibonacci numbers:");
        for (int i = 0; i < 10; i++) {
            System.out.println("  F(" + i + ") = " + fibonacci(i));
        }
    }
}`,

  c: `/* C — Hello, World! */
#include <stdio.h>

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    printf("Hello, Engineering World!\\n");
    printf("First 10 Fibonacci numbers:\\n");
    for (int i = 0; i < 10; i++) {
        printf("  F(%d) = %d\\n", i, fibonacci(i));
    }
    return 0;
}`,

  "c++": `/* C++ — Hello, World! */
#include <iostream>
using namespace std;

int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

int main() {
    cout << "Hello, Engineering World!" << endl;
    cout << "First 10 Fibonacci numbers:" << endl;
    for (int i = 0; i < 10; i++) {
        cout << "  F(" << i << ") = " << fibonacci(i) << endl;
    }
    return 0;
}`,

  csharp: `// C# — Hello, World!
using System;

class Program {
    static int Fibonacci(int n) {
        if (n <= 1) return n;
        return Fibonacci(n - 1) + Fibonacci(n - 2);
    }

    static void Main() {
        Console.WriteLine("Hello, Engineering World!");
        Console.WriteLine("First 10 Fibonacci numbers:");
        for (int i = 0; i < 10; i++) {
            Console.WriteLine($"  F({i}) = {Fibonacci(i)}");
        }
    }
}`,

  go: `// Go — Hello, World!
package main

import "fmt"

func fibonacci(n int) int {
    if n <= 1 {
        return n
    }
    return fibonacci(n-1) + fibonacci(n-2)
}

func main() {
    fmt.Println("Hello, Engineering World!")
    fmt.Println("First 10 Fibonacci numbers:")
    for i := 0; i < 10; i++ {
        fmt.Printf("  F(%d) = %d\\n", i, fibonacci(i))
    }
}`,

  rust: `// Rust — Hello, World!
fn fibonacci(n: u32) -> u32 {
    match n {
        0 | 1 => n,
        _ => fibonacci(n - 1) + fibonacci(n - 2),
    }
}

fn main() {
    println!("Hello, Engineering World!");
    println!("First 10 Fibonacci numbers:");
    for i in 0..10 {
        println!("  F({}) = {}", i, fibonacci(i));
    }
}`,

  ruby: `# Ruby — Hello, World!
def fibonacci(n)
    return n if n <= 1
    fibonacci(n - 1) + fibonacci(n - 2)
end

puts "Hello, Engineering World!"
puts "First 10 Fibonacci numbers:"
(0...10).each { |i| puts "  F(#{i}) = #{fibonacci(i)}" }`,

  php: `<?php
// PHP — Hello, World!
function fibonacci($n) {
    if ($n <= 1) return $n;
    return fibonacci($n - 1) + fibonacci($n - 2);
}

echo "Hello, Engineering World!\\n";
echo "First 10 Fibonacci numbers:\\n";
for ($i = 0; $i < 10; $i++) {
    echo "  F($i) = " . fibonacci($i) . "\\n";
}`,

  swift: `// Swift — Hello, World!
func fibonacci(_ n: Int) -> Int {
    if n <= 1 { return n }
    return fibonacci(n - 1) + fibonacci(n - 2)
}

print("Hello, Engineering World!")
print("First 10 Fibonacci numbers:")
for i in 0..<10 {
    print("  F(\(i)) = \(fibonacci(i))")
}`,

  kotlin: `// Kotlin — Hello, World!
fun fibonacci(n: Int): Int {
    if (n <= 1) return n
    return fibonacci(n - 1) + fibonacci(n - 2)
}

fun main() {
    println("Hello, Engineering World!")
    println("First 10 Fibonacci numbers:")
    for (i in 0 until 10) {
        println("  F(\$i) = \${fibonacci(i)}")
    }
}`,

  rscript: `# R — Hello, World!
fibonacci <- function(n) {
    if (n <= 1) return(n)
    return(fibonacci(n - 1) + fibonacci(n - 2))
}

cat("Hello, Engineering World!\\n")
cat("First 10 Fibonacci numbers:\\n")
for (i in 0:9) {
    cat(sprintf("  F(%d) = %d\\n", i, fibonacci(i)))
}`,

  julia: `# Julia — Hello, World!
function fibonacci(n)
    if n <= 1
        return n
    end
    return fibonacci(n - 1) + fibonacci(n - 2)
end

println("Hello, Engineering World!")
println("First 10 Fibonacci numbers:")
for i in 0:9
    println("  F($i) = $(fibonacci(i))")
end`,

  dart: `// Dart — Hello, World!
int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

void main() {
    print("Hello, Engineering World!");
    print("First 10 Fibonacci numbers:");
    for (int i = 0; i < 10; i++) {
        print("  F(\$i) = \${fibonacci(i)}");
    }
}`,

  perl: `# Perl — Hello, World!
sub fibonacci {
    my $n = shift;
    return $n if $n <= 1;
    return fibonacci($n - 1) + fibonacci($n - 2);
}

print "Hello, Engineering World!\\n";
print "First 10 Fibonacci numbers:\\n";
for my $i (0..9) {
    printf "  F(%d) = %d\\n", $i, fibonacci($i);
}`,

  haskell: `-- Haskell — Hello, World!
fibonacci :: Int -> Int
fibonacci 0 = 0
fibonacci 1 = 1
fibonacci n = fibonacci (n - 1) + fibonacci (n - 2)

main :: IO ()
main = do
    putStrLn "Hello, Engineering World!"
    putStrLn "First 10 Fibonacci numbers:"
    mapM_ (\\i -> putStrLn $ "  F(" ++ show i ++ ") = " ++ show (fibonacci i)) [0..9]`,

  lua: `-- Lua — Hello, World!
function fibonacci(n)
    if n <= 1 then return n end
    return fibonacci(n - 1) + fibonacci(n - 2)
end

print("Hello, Engineering World!")
print("First 10 Fibonacci numbers:")
for i = 0, 9 do
    print(string.format("  F(%d) = %d", i, fibonacci(i)))
end`,

  bash: `#!/bin/bash
# Bash — Hello, World!
fibonacci() {
    local n=$1
    if [ $n -le 1 ]; then
        echo $n
        return
    fi
    echo $(( $(fibonacci $((n - 1))) + $(fibonacci $((n - 2))) ))
}

echo "Hello, Engineering World!"
echo "First 10 Fibonacci numbers:"
for i in $(seq 0 9); do
    echo "  F($i) = $(fibonacci $i)"
done`,

  sqlite3: `-- SQL — Sample Queries
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
};

// ── Terminal output helper ──────────────────────────────────────────
function formatOutput(raw: string): string {
  return raw.replace(/\r\n/g, "\n").replace(/\r/g, "\n");
}

// ── Language → file extension mapping ───────────────────────────────
const FILE_EXTENSIONS: Record<string, string> = {
  python: "py",
  javascript: "js",
  typescript: "ts",
  java: "java",
  c: "c",
  "c++": "cpp",
  csharp: "cs",
  go: "go",
  rust: "rs",
  ruby: "rb",
  php: "php",
  swift: "swift",
  kotlin: "kt",
  rscript: "r",
  julia: "jl",
  dart: "dart",
  perl: "pl",
  haskell: "hs",
  lua: "lua",
  bash: "sh",
  sqlite3: "sql",
};

// ── Page component ──────────────────────────────────────────────────
export default function PlaygroundPage() {
  const [language, setLanguage] = useState("python");
  const [code, setCode] = useState(EXAMPLES["python"]);
  const [output, setOutput] = useState("");
  const [isRunning, setIsRunning] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [execTime, setExecTime] = useState<number | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleLanguageChange = useCallback(
    (langId: string) => {
      setLanguage(langId);
      setCode(EXAMPLES[langId] || "// Write your code here\n");
      setOutput("");
      setExecTime(null);
      setLangOpen(false);
    },
    []
  );

  const handleRun = useCallback(async () => {
    if (!code.trim()) return;
    setIsRunning(true);
    setOutput(""); // clear previous
    setExecTime(null);

    const start = performance.now();

    try {
      const res = await fetch("/api/execute", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ language, code }),
      });

      const data = await res.json();
      const elapsed = ((performance.now() - start) / 1000).toFixed(2);
      setExecTime(Number(elapsed));

      let out = "";

      if (data.compile?.output) {
        out += `[compile]\n${formatOutput(data.compile.output)}\n`;
      }

      if (data.stdout) {
        out += formatOutput(data.stdout);
      }

      if (data.stderr) {
        out += `\n[stderr]\n${formatOutput(data.stderr)}`;
      }

      if (data.error && !data.stdout && !data.stderr) {
        out += `[error] ${data.error}`;
      }

      if (data.code !== null && data.code !== 0) {
        out += `\n\n[exit code: ${data.code}]`;
      }

      if (!out.trim()) {
        out = "(no output)";
      }

      setOutput(out);
    } catch {
      setOutput("[error] Could not connect to execution service. Check your network and try again.");
    } finally {
      setIsRunning(false);
    }
  }, [language, code]);

  const handleReset = useCallback(() => {
    setCode(EXAMPLES[language] || "// Write your code here\n");
    setOutput("");
    setExecTime(null);
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
        const newVal = code.substring(0, start) + "    " + code.substring(end);
        setCode(newVal);
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
            Write and run code in 20+ languages. Choose a language, edit the code, and hit Run.
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
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${langOpen ? "rotate-180" : ""}`} />
            </button>
            {langOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setLangOpen(false)} />
                <div className="absolute top-full left-0 mt-1 z-50 w-56 max-h-72 overflow-y-auto rounded-xl border border-border bg-card shadow-xl backdrop-blur-xl">
                  {LANGUAGES.map((lang) => (
                    <button
                      key={lang.id}
                      onClick={() => handleLanguageChange(lang.id)}
                      className={`w-full text-left px-3.5 py-2 text-sm transition-colors hover:bg-secondary ${
                        language === lang.id
                          ? "text-primary font-medium bg-primary/5"
                          : "text-foreground"
                      }`}
                    >
                      {lang.label}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>

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

        {/* Editor + Output grid */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
          {/* Code editor */}
          <Card className="lg:col-span-3 overflow-hidden border-border">
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
              className="w-full min-h-[420px] lg:min-h-[520px] p-4 font-mono text-sm leading-relaxed bg-zinc-950 dark:bg-black text-green-400 resize-none outline-none border-0 selection:bg-primary/30"
              spellCheck={false}
              aria-label="Code editor"
            />
          </Card>

          {/* Terminal output */}
          <Card className="lg:col-span-2 overflow-hidden border-border flex flex-col">
            <div className="flex items-center gap-2 px-4 py-2.5 border-b border-border bg-card/50">
              <Terminal className="h-4 w-4 text-muted-foreground" />
              <span className="text-xs font-medium text-muted-foreground">Terminal Output</span>
              {isRunning && (
                <span className="ml-auto text-xs text-yellow-500 animate-pulse">⏳ running...</span>
              )}
              {execTime !== null && !isRunning && (
                <span className="ml-auto text-xs text-muted-foreground">
                  ⏱ {execTime}s
                </span>
              )}
            </div>
            <pre className="flex-1 p-4 font-mono text-sm leading-relaxed bg-black/90 dark:bg-black text-green-400/90 overflow-auto min-h-[300px] lg:min-h-[520px] whitespace-pre-wrap">
              {output ? (
                <code>{output}</code>
              ) : (
                <span className="text-zinc-500 italic">
                  {isRunning ? "⏳ Compiling & executing..." : 'Click "Run" to execute the code.'}
                </span>
              )}
            </pre>
          </Card>
        </div>
      </div>
    </div>
  );
}
