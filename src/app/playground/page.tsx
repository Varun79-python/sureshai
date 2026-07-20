"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AnimatedSection } from "@/components/shared/animated-section";
import { Play, Copy, Check, Terminal, Code2, RotateCcw, FlaskConical } from "lucide-react";

const codeSnippets = [
  {
    title: "Hello World",
    language: "python",
    code: `# Python Program
print("Hello, Engineering World!")
print("Welcome to Suresh.AI")

# Simple calculation
def fibonacci(n):
    if n <= 1:
        return n
    return fibonacci(n-1) + fibonacci(n-2)

# Print first 10 Fibonacci numbers
for i in range(10):
    print(f"F({i}) = {fibonacci(i)}")`,
  },
  {
    title: "Data Structures",
    language: "python",
    code: `# Linked List Implementation
class Node:
    def __init__(self, data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None
    
    def append(self, data):
        if not self.head:
            self.head = Node(data)
            return
        curr = self.head
        while curr.next:
            curr = curr.next
        curr.next = Node(data)
    
    def display(self):
        curr = self.head
        while curr:
            print(curr.data, end=" -> ")
            curr = curr.next
        print("None")

# Test
ll = LinkedList()
ll.append(10)
ll.append(20)
ll.append(30)
ll.display()`,
  },
  {
    title: "Sorting Algorithm",
    language: "python",
    code: `# Quick Sort Implementation
def quicksort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[len(arr) // 2]
    left = [x for x in arr if x < pivot]
    middle = [x for x in arr if x == pivot]
    right = [x for x in arr if x > pivot]
    return quicksort(left) + middle + quicksort(right)

# Test
arr = [64, 34, 25, 12, 22, 11, 90]
print("Original:", arr)
sorted_arr = quicksort(arr)
print("Sorted:", sorted_arr)`,
  },
];

export default function PlaygroundPage() {
  const [output, setOutput] = useState("");
  const [activeTab, setActiveTab] = useState(codeSnippets[0].title);
  const [copied, setCopied] = useState(false);

  const activeSnippet = codeSnippets.find((s) => s.title === activeTab) || codeSnippets[0];

  const handleRun = () => {
    setOutput("> Program executed successfully!\n\nHello, Engineering World!\nWelcome to Suresh.AI\nF(0) = 0\nF(1) = 1\nF(2) = 1\nF(3) = 2\nF(4) = 3\nF(5) = 5\nF(6) = 8\nF(7) = 13\nF(8) = 21\nF(9) = 34");
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activeSnippet.code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="mb-8">
          <Badge variant="premium" size="lg" className="mb-4">
            <FlaskConical className="h-3.5 w-3.5 mr-1" />
            Code Playground
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Write, Run, and <span className="text-gradient">Experiment</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Practice coding directly in your browser. Try out algorithms, data structures, and more.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Code snippets sidebar */}
          <div className="lg:col-span-1">
            <Card>
              <CardContent className="p-4">
                <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                  <Code2 className="h-4 w-4 text-primary" />
                  Examples
                </h3>
                <div className="space-y-1">
                  {codeSnippets.map((snippet) => (
                    <button
                      key={snippet.title}
                      onClick={() => setActiveTab(snippet.title)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                        activeTab === snippet.title
                          ? 'bg-primary/5 text-primary font-medium'
                          : 'text-muted-foreground hover:bg-secondary'
                      }`}
                    >
                      {snippet.title}
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Code editor */}
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-0">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" size="sm">{activeSnippet.language}</Badge>
                    <span className="text-sm font-medium">{activeSnippet.title}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={handleCopy}>
                      {copied ? <Check className="h-4 w-4 text-success" /> : <Copy className="h-4 w-4" />}
                    </Button>
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <RotateCcw className="h-4 w-4" />
                    </Button>
                    <Button size="sm" className="gap-1.5" onClick={handleRun}>
                      <Play className="h-4 w-4" /> Run
                    </Button>
                  </div>
                </div>
                <div className="p-4 bg-zinc-950 dark:bg-black">
                  <pre className="text-sm font-mono text-green-400 leading-relaxed overflow-x-auto">
                    <code>{activeSnippet.code}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>

            {/* Output */}
            <Card className="mt-4">
              <CardContent className="p-0">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-border">
                  <Terminal className="h-4 w-4 text-muted-foreground" />
                  <span className="text-xs font-medium text-muted-foreground">Output</span>
                </div>
                <pre className="p-4 text-sm font-mono text-foreground bg-background min-h-[120px] leading-relaxed">
                  {output || <span className="text-muted-foreground">Click Run to see the output...</span>}
                </pre>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
