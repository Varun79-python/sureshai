"use client";

import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnimatedSection } from "@/components/shared/animated-section";
import {
  Brain, Send, Sparkles, Bot, User, StopCircle,
  Lightbulb, FileText, MessageSquare, Code2, BookOpen,
  ArrowRight, Plus,
} from "lucide-react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

const suggestedQuestions = [
  "Explain the difference between process and thread",
  "What is normalization in DBMS?",
  "How does TCP three-way handshake work?",
  "Explain gradient descent in ML",
  "What is virtual memory?",
  "Difference between TCP and UDP",
];

const aiResponses: Record<string, string> = {
  "explain the difference between process and thread": `## Process vs Thread

| Feature | Process | Thread |
|---------|---------|--------|
| **Memory** | Separate memory space | Shared memory within process |
| **Creation** | Slow (high overhead) | Fast (low overhead) |
| **Context Switch** | Expensive | Inexpensive |
| **Isolation** | Fully isolated | Shares code/data with sibling threads |
| **Communication** | IPC (pipes, sockets, shared memory) | Direct memory access |
| **Crash** | Other processes unaffected | Can crash entire process |

**Key Takeaway:** Threads are lightweight "mini-processes" within a process that share resources but have their own stack and registers. Use threads for parallel tasks in the same application; use processes for isolation.`,
  "what is normalization in dbms?": `## Normalization in DBMS

Normalization is the process of organizing data to reduce redundancy and eliminate anomalies (insertion, update, deletion).

### Normal Forms:
1. **1NF (First Normal Form)**: Atomic values, no repeating groups
2. **2NF (Second Normal Form)**: 1NF + no partial dependencies
3. **3NF (Third Normal Form)**: 2NF + no transitive dependencies
4. **BCNF**: Every determinant is a candidate key
5. **4NF**: No multi-valued dependencies

**Example:** Think of a student database. Without normalization, you might store the same student address in multiple rows. After normalization, address is stored once and referenced via foreign key.`,
  "default": `I'm your AI learning assistant! I can help you with:

- 📚 **Explaining concepts** — From thermodynamics to machine learning
- ❓ **Answering questions** — Technical, conceptual, numerical
- 💻 **Code examples** — C, C++, Java, Python, JavaScript
- 📝 **Study tips** — Exam preparation, interview strategies
- 🔗 **Related topics** — Connect concepts across subjects

**What would you like to learn about today?**

*Try asking me about any engineering subject, or pick a suggestion below!*`,
};

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "welcome", role: "assistant", content: "Hello! I'm **Suresh AI**, your intelligent learning assistant. I can help you master engineering concepts, answer questions, and prepare for exams. What would you like to learn today? 🚀" },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || isTyping) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const lowerInput = input.toLowerCase().trim();
      let response = aiResponses["default"];
      
      for (const [key, value] of Object.entries(aiResponses)) {
        if (lowerInput.includes(key)) {
          response = value;
          break;
        }
      }

      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response,
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 1000);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen pt-16">
      <div className="flex h-[calc(100vh-4rem)]">
        {/* Sidebar (desktop) */}
        <div className="hidden lg:flex w-72 flex-col border-r border-border bg-card/50">
          <div className="p-4 border-b border-border">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center">
                <Brain className="h-4 w-4 text-white" />
              </div>
              <span className="font-semibold">AI Assistant</span>
            </div>
            <Button variant="outline" size="sm" className="w-full gap-2 justify-start">
              <Plus className="h-4 w-4" /> New Chat
            </Button>
          </div>
          <div className="flex-1 overflow-y-auto p-4">
            <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wider">Capabilities</p>
            <div className="space-y-2">
              {[
                { icon: Lightbulb, label: "Explain concepts" },
                { icon: MessageSquare, label: "Answer questions" },
                { icon: Code2, label: "Write code" },
                { icon: FileText, label: "Summarize notes" },
                { icon: BookOpen, label: "Study tips" },
              ].map((cap) => {
                const Icon = cap.icon;
                return (
                  <div key={cap.label} className="flex items-center gap-2 text-sm text-muted-foreground p-2 rounded-lg hover:bg-secondary/50 transition-colors">
                    <Icon className="h-4 w-4" /> {cap.label}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main chat area */}
        <div className="flex-1 flex flex-col">
          {/* Messages */}
          <ScrollArea className="flex-1 p-4 sm:p-6 lg:p-8" ref={scrollRef}>
            <div className="max-w-3xl mx-auto space-y-6">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                  <Avatar className={`w-8 h-8 shrink-0 ${msg.role === "assistant" ? "" : ""}`}>
                    <AvatarFallback className={msg.role === "assistant" ? "bg-gradient-to-br from-primary to-accent text-white" : "bg-secondary"}>
                      {msg.role === "assistant" ? <Bot className="h-4 w-4" /> : <User className="h-4 w-4" />}
                    </AvatarFallback>
                  </Avatar>
                  <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 ${
                    msg.role === "user"
                      ? "bg-primary text-white"
                      : "bg-card border border-border"
                  }`}>
                    <div className="text-sm leading-relaxed whitespace-pre-wrap">{msg.content}</div>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex gap-3">
                  <Avatar className="w-8 h-8 shrink-0">
                    <AvatarFallback className="bg-gradient-to-br from-primary to-accent text-white">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-card border border-border rounded-2xl p-4">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "300ms" }} />
                    </div>
                  </div>
                </div>
              )}

              {/* Suggestions */}
              {messages.length === 1 && (
                <div className="pt-4">
                  <p className="text-xs font-medium text-muted-foreground mb-3">Try asking:</p>
                  <div className="flex flex-wrap gap-2">
                    {suggestedQuestions.map((q) => (
                      <button
                        key={q}
                        onClick={() => {
                          setInput(q);
                        }}
                        className="px-3 py-2 rounded-xl bg-secondary/50 border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 transition-all"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>

          {/* Input */}
          <div className="border-t border-border p-4 sm:p-6">
            <div className="max-w-3xl mx-auto">
              <div className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask me anything about engineering..."
                  className="flex-1 h-12 px-4"
                  disabled={isTyping}
                />
                <Button
                  onClick={handleSend}
                  size="icon"
                  className="h-12 w-12 rounded-xl shrink-0"
                  disabled={!input.trim() || isTyping}
                >
                  {isTyping ? <StopCircle className="h-5 w-5" /> : <Send className="h-5 w-5" />}
                </Button>
              </div>
              <p className="text-[10px] text-muted-foreground mt-2 text-center">
                Suresh AI can make mistakes. Verify important information.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
