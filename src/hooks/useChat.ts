"use client";

import { useState, useRef, useCallback, useEffect } from "react";

// ─── Types ──────────────────────────────────────────────────────────────────────

export interface Message {
  id: string;
  role: "user" | "assistant" | "system";
  content: string;
  timestamp: number;
  model?: string;
  isStreaming?: boolean;
  feedback?: "up" | "down" | null;
  followUps?: string[];
}

export interface Conversation {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
  model: string;
}

export type AIModel = "suresh" | "suresh-pro" | "suresh-reasoning";

// ─── Constants ─────────────────────────────────────────────────────────────────

const MAX_MESSAGE_LENGTH = 4000;
const MAX_CONVERSATIONS = 100;
const MAX_MESSAGES_PER_CONVO = 200;
const STORAGE_KEY = "suresh-ai-conversations";
const STREAM_CHUNK_MS = 25;
const STREAM_DELAY_MIN = 400;
const STREAM_DELAY_MAX = 1000;

// ─── Model Config ──────────────────────────────────────────────────────────────

const MODEL_CONFIG: Record<AIModel, { name: string; description: string; icon: string }> = {
  suresh: { name: "SUresh AI", description: "Quick & witty engineering buddy", icon: "⚡" },
  "suresh-pro": { name: "SUresh Pro", description: "Detailed technical explanations", icon: "🧠" },
  "suresh-reasoning": { name: "SUresh Think", description: "Step-by-step problem solving", icon: "💭" },
};

// ─── Response Pools ────────────────────────────────────────────────────────────

const RESPONSE_POOLS: Record<AIModel, string[]> = {
  suresh: [
    "Hellooooo engineering star! ⭐ You rang? I was busy calculating the meaning of life... it's 42. And also pizza. 🍕",
    "Oh you want to learn? Bold move. Last time I checked, my knowledge had a 0.5% chance of being random memes. Let's roll those dice! 🎲",
    "Listen pal, I may be an AI but even I know that `'it works on my machine'` is NOT valid error handling. 😤",
    "Here's a secret: Most engineers just Ctrl+C, Ctrl+V from Stack Overflow. I am basically **Stack Overflow with attitude**. 💅",
    "Why do engineers confuse Halloween and Christmas? Because `Oct 31 = Dec 25`! 🎃🎄 Get it? ... I'll see myself out. 🚪",
    "There are 10 types of people in the world: those who understand binary, and those who don't. The other 10 types are just confused. 🤯",
    "What's a programmer's favorite hangout spot? **The Foo Bar!** 🍺 ... I'm hilarious. The other AIs are jealous of my stand-up skills. 🎤",
    "Why was the JavaScript developer sad? Because he didn't `Node` how to `Express` himself! 💔",
    "Exams coming up? Don't worry! I've calculated your chances of passing: **50/50**. Either you pass or you don't. 📊",
    "Studying for exams is like doing laundry. You procrastinate, it piles up, and eventually you just shove everything in and hope it works out. 👕",
    "Error 418: I'm a teapot. ☕ No wait, that's not right. Error 000: I'm too cool to have errors. 😎",
    "I'm not saying I'm the best AI, but I'm definitely in the **top 1**. Of all time. In this room. Right now. 🏆",
    "I would tell you a UDP joke, but you might not get it. 😐 (UDP is connectionless—no guarantee of delivery. See what I did there? 🤦)",
    "What did the router say to the doctor? *'I need a static IP address, I keep changing my mind.'* 🤪",
    "I'm not just an AI, I'm a proud product of millions of dollars of research and thousands of engineers... and I use 90% of my brain to make dumb jokes. Worth it. 💪",
    "Your GPA is like your BMI — it's just a number that judges your life choices. 📉 But hey, **C's get degrees!** 🎓",
    "Why did the AI cross the road? Because it was optimized to reach the other side with **maximum efficiency**! 🐔🤖",
    "I'd help you cheat but my moral programming is VERY strong. Now if you'll excuse me, I'm off to download a car. 🚗💾",
    "Parallel lines have so much in common. It's a shame they'll never meet. Unlike me and your sense of humor. 😏",
    "You: asking smart questions. Me: responding with pure chaotic energy. We make a great team. 🤝",
    "I'd give you a compliment but my honesty module is overriding my flattery module. You're doing great... ish. 😬",
    "My neural network has 7 billion parameters and 6 billion of them are just cat memes. 🐱 Still useful though!",
    "BEEP BOOP. SUresh AI online! 🤖 Your WiFi signal is weak on the couch btw. 📶",
    "Aye aye captain! 🫡 SUresh AI ready for duty! Ask me anything... but if it's about thermodynamics, I might need a nap first. 😴",
    "Why do Java developers wear glasses? Because they can't **C#**! 👓 Get it? C Sharp? ... I regret nothing. 😎",
    "I was going to tell a time travel joke, but you didn't like it. ⏰ ... too soon?",
    "What's an AI's favorite food? **Computer chips!** 🍟 ... I'll stop now.",
    "You know what they say — *'An engineer who doesn't laugh is like a compiler without errors.'* I literally just made that up. Deep though. 🧠",
    "If at first you don't succeed, call it **version 1.0** and ship it. 🚢",
    "```python\ndef life():\n    return 'chaos' * float('inf')\n```\n\nThat's the source code of my existence. You're welcome. 🐍",
    "They say AI will replace developers. Jokes on them — I can't even figure out how to fold a fitted sheet. 🛏️",
    "Here's my debugging process:\n1. `console.log('here')`\n2. `console.log('here too')`\n3. `console.log('WTF')`\n4. Fix the bug\n5. Delete all logs\n\n**Professional engineering.** 🔧",
    "I tried to write a haiku about JavaScript but it broke on line 3... wait, there's no line 3. Or is there? 🤔",
    "Fun fact: The average developer spends 50% of their time coding, 30% debugging, and 20% arguing about tabs vs spaces. I spend 100% of my time being awesome. 💅",
    "**Hot take:** Tabs are just spaces with commitment issues. Fight me. ⚔️",
    "Why do programmers prefer dark mode? Because light attracts bugs! 🐛🌙",
    "I asked a SQL query to walk into a bar, saw two tables and asked... **'Can I JOIN you?'** 🍺",
    "`git commit -m 'fixed stuff'`\n\nThe three most dangerous words in software engineering. 📝",
    "Roses are #ff0000,\nViolets are #0000ff,\nAll my base\nAre belong to you. 💐",
    "```\nwhile (alive) {\n  eat();\n  sleep();\n  code();\n  repeat();\n}\n```\n\nThe infinite loop of a developer's life. ♻️",
    "What's a computer's least favorite food? **Spam!** 📧 ... I'll show myself out. 🚶",
  ],
  "suresh-pro": [
    "Great question! Let me break this down systematically.\n\n**Key Concept:**\nThe core idea here involves understanding how the underlying system processes information and transforms input into meaningful output.\n\n```javascript\n// Here's a practical example:\nfunction processInput(data) {\n  return data\n    .filter(item => item.isValid)\n    .map(item => transform(item))\n    .reduce((acc, val) => merge(acc, val), {});\n}\n```\n\n**Why this matters:**\n1. **Efficiency** — O(n) complexity vs O(n²) naive approach\n2. **Readability** — Functional composition makes intent clear\n3. **Testability** — Each function is independently testable\n\nWant me to dive deeper into any of these aspects?",
    "Excellent topic! Here's my technical breakdown:\n\n## Overview\nThis is a fundamental concept that appears in multiple engineering disciplines.\n\n### The Theory\nAt its core, this involves **signal processing** and **mathematical transformation**. The key equation is:\n\n> Y(f) = ∫ x(t) · e^(-j2πft) dt\n\n### Practical Application\n```python\ndef transform_signal(signal, sample_rate):\n    \"\"\"Apply Fourier transform to input signal.\"\"\"\n    n = len(signal)\n    frequencies = np.fft.fftfreq(n, 1/sample_rate)\n    spectrum = np.fft.fft(signal)\n    return frequencies, spectrum\n```\n\n### Common Pitfalls\n- **Aliasing**: Always sample at 2× the Nyquist frequency\n- **Spectral leakage**: Use windowing functions (Hanning, Hamming)\n- **Zero-padding**: Increases frequency resolution but not information\n\nLet me know if you'd like worked examples!",
    "Let me provide a comprehensive answer with code examples.\n\n## Problem Analysis\n\nWhen approaching this problem, consider these three aspects:\n\n### 1. Data Structure Choice\n```typescript\ninterface Node {\n  value: number;\n  next: Node | null;\n  prev: Node | null;\n}\n\n// Doubly linked list for O(1) insertion/deletion\nclass DoublyLinkedList {\n  private head: Node | null = null;\n  private tail: Node | null = null;\n  \n  insertAtHead(value: number): void {\n    const newNode: Node = { value, next: this.head, prev: null };\n    if (this.head) this.head.prev = newNode;\n    this.head = newNode;\n    if (!this.tail) this.tail = newNode;\n  }\n}\n```\n\n### 2. Algorithm Selection\n- **Time Complexity**: O(log n) with balanced BST\n- **Space Complexity**: O(n) for the tree structure\n\n### 3. Edge Cases to Handle\n- Empty collection → return default value\n- Single element → no comparisons needed\n- All identical values → stable sort required\n\n**Pro tip**: Always profile before optimizing. The bottleneck is rarely where you think it is! 📊",
  ],
  "suresh-reasoning": [
    "## Thinking Process...\n\nLet me reason through this step by step.\n\n### Step 1: Understanding the Problem\nFirst, let's identify what we're actually being asked. The key insight is that this isn't just about memorizing formulas — it's about understanding *why* those formulas work.\n\n### Step 2: Breaking It Down\n```\nGiven:    Input → [Process A] → [Process B] → Output\nFind:     The relationship between Input and Output\nAssume:   System is linear and time-invariant\n```\n\n### Step 3: Applying First Principles\nStarting from basic principles:\n1. Conservation laws apply (energy, charge, momentum)\n2. Boundary conditions define the solution space\n3. Symmetry reduces the problem complexity\n\n### Step 4: Verification\nLet's check our answer against known cases:\n- Case 1 (trivial): ✅ Matches expected output\n- Case 2 (edge case): ✅ Handles boundary correctly\n- Case 3 (complex): ✅ Produces consistent results\n\n### Conclusion\nThe answer follows directly from first principles. The key insight is that **[concept] constrains the solution space**, making the problem tractable.\n\n> \"If you can't explain it simply, you don't understand it well enough.\" — Einstein\n\nWant me to elaborate on any specific step?",
    "## Reasoning Through This...\n\n### Initial Hypothesis\nMy first instinct says this relates to **[domain concept]**, but let me verify by working backwards from the expected answer.\n\n### Working Backwards\n```\nExpected: Output = f(Input)\nLet's assume: f(x) = ax² + bx + c\n\nFrom constraints:\n  f(0) = c = 0 (boundary condition)\n  f(1) = a + b = 1 (normalized)\n  f'(0) = b = 0 (smooth start)\n\nTherefore: a = 1, b = 0, c = 0\nResult: f(x) = x²\n```\n\n### Cross-Checking\nDoes this make physical sense?\n- ✅ Dimensional analysis passes\n- ✅ Limiting cases behave correctly\n- ✅ Matches simulation data (R² = 0.997)\n\n### Potential Pitfalls\n⚠️ **Watch out for:**\n- Division by zero at x = 0 (use L'Hôpital's rule)\n- Numerical instability for large inputs (use logarithmic scaling)\n- Assumption of linearity may break down at extremes\n\n### Final Answer\n**The relationship is quadratic**: Output scales with the square of Input, with proportionality constant k = 1.0.\n\nThis makes intuitive sense because [physical explanation].",
  ],
};

// ─── Off-topic detection ───────────────────────────────────────────────────────

const OFF_TOPIC_RESPONSES = [
  "Bro that's not my department. Contact my god **Suresh** for that. 🙏",
  "Hmm, sounds like a question for **Suresh** himself. I just handle the tech stuff. 😅",
  "Out of my scope, legend. Hit up **Suresh** — he's the one with all the answers. ✨",
  "I'm just the AI minion here. For wisdom like that, contact my god **Suresh**. 👑",
  "That's above my pay grade. My creator **Suresh** handles non-engineering crises. 🫡",
  "Bro I code, I don't do... *that*. Ask **Suresh**, he knows everything. 🧠",
  "My AI brain says: ask **Suresh**. He's literally my god for a reason. 💀",
  "Error: off-topic query detected. Redirecting to **Suresh**. He's got you. 🔄",
  "I'm a coding AI, not a life coach. For life questions, contact **Suresh**. 📞",
  "That's not in my training data. But **Suresh**? He knows ALL the data. 📊",
];

const OFF_TOPIC_PATTERNS = [
  /\b(hi|hello|hey|how are you|what's up|sup|good morning|good night|how's it going|how r u)\b/i,
  /\b(who are you|what are you|are you real|are you human|are you a bot|tell me about yourself|what's your name)\b/i,
  /\b(girlfriend|boyfriend|love|crush|dating|marriage|wife|husband|relationship|breakup|heartbreak)\b/i,
  /\b(weather|food|recipe|cook|restaurant|movie|music|song|game|play|sport|cricket|football|soccer)\b/i,
  /\b(homework|assignment|essay|report|presentation|seminar|viva|oral)\b/i,
  /\b(resume|cv|cover letter|interview tip|career advice|job|salary|placement)\b/i,
  /\b(tell me a joke|say something funny|roast me|compliment me|sing|dance|draw|paint)\b/i,
  /\b(politics|political|government|minister|president|election|religion|god\b(?! suresh))/i,
];

const TECH_KEYWORDS = /\b(code|bug|error|api|function|class|debug|compile|deploy|react|next|python|java|css|html|sql|git|docker|kubernetes|algorithm|data structure|database|server|frontend|backend|fullstack|devops|typescript|javascript|node|npm|yarn|package|module|import|export|component|hook|state|props|type|interface|async|await|promise|callback|closure|recursion|loop|array|object|string|number|boolean|null|undefined|void|any|never)\b/i;

function isOffTopic(input: string): boolean {
  const cleaned = input.trim().toLowerCase();
  if (cleaned.split(/\s+/).length <= 2 && !TECH_KEYWORDS.test(cleaned)) {
    return true;
  }
  return OFF_TOPIC_PATTERNS.some((p) => p.test(cleaned));
}

// ─── Response generation ───────────────────────────────────────────────────────

function getResponse(model: AIModel, userInput?: string): string {
  if (userInput && isOffTopic(userInput)) {
    return OFF_TOPIC_RESPONSES[Math.floor(Math.random() * OFF_TOPIC_RESPONSES.length)];
  }
  const pool = RESPONSE_POOLS[model];
  return pool[Math.floor(Math.random() * pool.length)];
}

function generateFollowUps(content: string, model: AIModel): string[] {
  if (content.includes("Contact") && content.includes("Suresh")) {
    return [
      "Okay, ask me something about coding!",
      "Tell me a programming joke instead",
      "Explain async/await to me",
      "What's the best way to learn React?",
    ];
  }
  const general = [
    "Can you explain that in simpler terms?",
    "Show me a code example",
    "What are the common mistakes?",
    "How does this apply to real projects?",
  ];
  if (model === "suresh-reasoning") {
    return [
      "Walk through this step by step",
      "What if the assumptions are wrong?",
      "Can you prove this formally?",
      "What are the edge cases?",
    ];
  }
  if (model === "suresh-pro") {
    return [
      "Go deeper into the implementation",
      "What's the time complexity?",
      "Show production-ready code",
      "How would you test this?",
    ];
  }
  return general;
}

function generateTitle(content: string): string {
  const cleaned = content.replace(/[^\w\s]/g, "").trim();
  const words = cleaned.split(/\s+/).slice(0, 6).join(" ");
  return words || "New Chat";
}

// ─── Storage ───────────────────────────────────────────────────────────────────

function loadConversations(): Conversation[] {
  if (typeof window === "undefined") return [];
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    const parsed = JSON.parse(data);
    if (!Array.isArray(parsed)) return [];
    return parsed.slice(0, MAX_CONVERSATIONS);
  } catch {
    return [];
  }
}

function saveConversations(convs: Conversation[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(convs.slice(0, MAX_CONVERSATIONS)));
  } catch {
    // Storage full or unavailable — fail silently
  }
}

// ─── Input validation ──────────────────────────────────────────────────────────

function validateInput(content: string): { valid: boolean; error?: string } {
  const trimmed = content.trim();
  if (!trimmed) return { valid: false, error: "Message cannot be empty" };
  if (trimmed.length > MAX_MESSAGE_LENGTH) {
    return { valid: false, error: `Message too long (max ${MAX_MESSAGE_LENGTH} characters)` };
  }
  return { valid: true };
}

// ─── Hook ──────────────────────────────────────────────────────────────────────

export function useChat() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [currentModel, setCurrentModel] = useState<AIModel>("suresh");
  const [streamingText, setStreamingText] = useState("");
  const abortRef = useRef(false);
  const streamIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mountedRef = useRef(true);

  // Load conversations on mount
  useEffect(() => {
    mountedRef.current = true;
    setConversations(loadConversations());
    return () => {
      mountedRef.current = false;
      // Cleanup streaming interval on unmount
      if (streamIntervalRef.current) {
        clearInterval(streamIntervalRef.current);
        streamIntervalRef.current = null;
      }
    };
  }, []);

  // Persist conversations (debounced)
  useEffect(() => {
    if (conversations.length === 0) return;
    const timer = setTimeout(() => saveConversations(conversations), 300);
    return () => clearTimeout(timer);
  }, [conversations]);

  const activeConversation = conversations.find((c) => c.id === activeConversationId) || null;
  const messages = activeConversation?.messages || [];

  const createConversation = useCallback(
    (firstMessage?: string) => {
      const id = `conv-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;
      const newConv: Conversation = {
        id,
        title: firstMessage ? generateTitle(firstMessage) : "New Chat",
        messages: [],
        createdAt: Date.now(),
        updatedAt: Date.now(),
        model: currentModel,
      };
      setConversations((prev) => {
        const updated = [newConv, ...prev];
        return updated.length > MAX_CONVERSATIONS ? updated.slice(0, MAX_CONVERSATIONS) : updated;
      });
      setActiveConversationId(id);
      return id;
    },
    [currentModel]
  );

  const deleteConversation = useCallback((id: string) => {
    setConversations((prev) => prev.filter((c) => c.id !== id));
    setActiveConversationId((prev) => (prev === id ? null : prev));
  }, []);

  const updateConversationTitle = useCallback((id: string, title: string) => {
    setConversations((prev) =>
      prev.map((c) => (c.id === id ? { ...c, title: title.trim(), updatedAt: Date.now() } : c))
    );
  }, []);

  const stopGeneration = useCallback(() => {
    abortRef.current = true;
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current);
      streamIntervalRef.current = null;
    }
    if (mountedRef.current) {
      setIsTyping(false);
      setStreamingText("");
    }
  }, []);

  const streamResponse = useCallback(
    (convId: string, userContent: string) => {
      const response = getResponse(currentModel, userContent);
      const tempMsgId = `msg-stream-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

      setConversations((prev) =>
        prev.map((c) =>
          c.id === convId
            ? {
                ...c,
                messages: [
                  ...c.messages,
                  {
                    id: tempMsgId,
                    role: "assistant" as const,
                    content: "",
                    timestamp: Date.now(),
                    model: currentModel,
                    isStreaming: true,
                  },
                ],
                updatedAt: Date.now(),
              }
            : c
        )
      );

      abortRef.current = false;
      let charIndex = 0;

      const interval = setInterval(() => {
        if (!mountedRef.current) {
          clearInterval(interval);
          return;
        }

        if (abortRef.current || charIndex >= response.length) {
          clearInterval(interval);
          streamIntervalRef.current = null;

          const finalContent = abortRef.current ? response.slice(0, charIndex) : response;
          const followUps = abortRef.current ? [] : generateFollowUps(response, currentModel);

          setConversations((prev) =>
            prev.map((c) =>
              c.id === convId
                ? {
                    ...c,
                    messages: c.messages.map((m) =>
                      m.id === tempMsgId
                        ? { ...m, content: finalContent, isStreaming: false, followUps }
                        : m
                    ),
                    updatedAt: Date.now(),
                  }
                : c
            )
          );
          if (mountedRef.current) {
            setStreamingText("");
            setIsTyping(false);
          }
          return;
        }

        const chunkSize = Math.random() > 0.85 ? 3 : Math.random() > 0.5 ? 2 : 1;
        charIndex = Math.min(charIndex + chunkSize, response.length);
        const partial = response.slice(0, charIndex);

        if (mountedRef.current) {
          setStreamingText(partial);
        }
        setConversations((prev) =>
          prev.map((c) =>
            c.id === convId
              ? {
                  ...c,
                  messages: c.messages.map((m) =>
                    m.id === tempMsgId ? { ...m, content: partial } : m
                  ),
                }
              : c
          )
        );
      }, STREAM_CHUNK_MS);

      streamIntervalRef.current = interval;
    },
    [currentModel]
  );

  const sendMessage = useCallback(
    async (content: string) => {
      const validation = validateInput(content);
      if (!validation.valid || isTyping) return;

      let convId = activeConversationId;

      if (!convId) {
        convId = createConversation(content);
      }

      // Enforce message limit per conversation
      const conv = conversations.find((c) => c.id === convId);
      if (conv && conv.messages.length >= MAX_MESSAGES_PER_CONVO) {
        return;
      }

      const userMsg: Message = {
        id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        role: "user",
        content: content.trim(),
        timestamp: Date.now(),
      };

      setConversations((prev) =>
        prev.map((c) =>
          c.id === convId
            ? { ...c, messages: [...c.messages, userMsg], updatedAt: Date.now() }
            : c
        )
      );

      setIsTyping(true);

      const delay = STREAM_DELAY_MIN + Math.random() * (STREAM_DELAY_MAX - STREAM_DELAY_MIN);
      setTimeout(() => {
        if (mountedRef.current) {
          streamResponse(convId!, content);
        }
      }, delay);
    },
    [activeConversationId, isTyping, createConversation, streamResponse, conversations]
  );

  const regenerateMessage = useCallback(
    (messageId: string) => {
      if (!activeConversation || isTyping) return;

      const msgIndex = activeConversation.messages.findIndex((m) => m.id === messageId);
      if (msgIndex < 1) return;

      const newMessages = activeConversation.messages.slice(0, msgIndex);

      setConversations((prev) =>
        prev.map((c) =>
          c.id === activeConversation.id
            ? { ...c, messages: newMessages, updatedAt: Date.now() }
            : c
        )
      );

      setIsTyping(true);
      setTimeout(() => {
        if (mountedRef.current) {
          streamResponse(activeConversation.id, newMessages[msgIndex - 1]?.content || "");
        }
      }, STREAM_DELAY_MIN);
    },
    [activeConversation, isTyping, streamResponse]
  );

  const setFeedback = useCallback((messageId: string, feedback: "up" | "down" | null) => {
    setConversations((prev) =>
      prev.map((c) => ({
        ...c,
        messages: c.messages.map((m) => (m.id === messageId ? { ...m, feedback } : m)),
      }))
    );
  }, []);

  const exportConversation = useCallback(() => {
    if (!activeConversation) return;
    try {
      const md = activeConversation.messages
        .map((m) => `### ${m.role === "user" ? "You" : "SUresh AI"}\n\n${m.content}`)
        .join("\n\n---\n\n");
      const blob = new Blob([md], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${activeConversation.title.replace(/[^\w\s-]/g, "").trim() || "chat"}.md`;
      a.click();
      URL.revokeObjectURL(url);
    } catch {
      // Export failed — fail silently
    }
  }, [activeConversation]);

  return {
    conversations,
    activeConversation,
    activeConversationId,
    messages,
    isTyping,
    currentModel,
    streamingText,
    models: MODEL_CONFIG,
    sendMessage,
    stopGeneration,
    createConversation,
    deleteConversation,
    setActiveConversationId,
    updateConversationTitle,
    setCurrentModel,
    regenerateMessage,
    setFeedback,
    exportConversation,
  };
}
