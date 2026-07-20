"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, BrainCircuit, Code, BookOpen, GraduationCap, Rocket } from "lucide-react";
import { useChat } from "@/hooks/useChat";
import { ChatMessage } from "@/components/chat/ChatMessage";
import { ChatInput } from "@/components/chat/ChatInput";
import { ChatSidebar } from "@/components/chat/ChatSidebar";

const WELCOME_FEATURES = [
  { icon: <Code className="h-4 w-4" />, label: "Code Help", desc: "Debug, explain, write code" },
  { icon: <BookOpen className="h-4 w-4" />, label: "Explain Concepts", desc: "Engineering & CS topics" },
  { icon: <GraduationCap className="h-4 w-4" />, label: "Exam Prep", desc: "MCQs, interview questions" },
  { icon: <Rocket className="h-4 w-4" />, label: "Project Ideas", desc: "From simple to ambitious" },
];

const QUICK_QUESTIONS = [
  "Explain Big O notation with examples",
  "What is the difference between SQL and NoSQL?",
  "How does garbage collection work in Java?",
  "Explain TCP/IP protocol stack",
  "What is a RESTful API?",
  "How do hash tables work?",
];

export default function AIPage() {
  const {
    conversations,
    activeConversation,
    activeConversationId,
    messages,
    isTyping,
    currentModel,
    streamingText,
    models,
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
  } = useChat();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, streamingText]);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && sidebarOpen) {
        setSidebarOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [sidebarOpen]);

  const handleSend = useCallback(
    (text: string) => {
      sendMessage(text);
    },
    [sendMessage]
  );

  const handleCopy = useCallback((content: string) => {
    navigator.clipboard.writeText(content).catch(() => {});
  }, []);

  const handleSpeak = useCallback((content: string) => {
    if (!("speechSynthesis" in window)) return;
    speechSynthesis.cancel();
    const clean = content
      .replace(/```[\s\S]*?```/g, "code block omitted")
      .replace(/`([^`]+)`/g, "$1")
      .replace(/[*_#~>]/g, "")
      .replace(/[^\w\s.,!?;:'\-\n]/g, "");
    const utterance = new SpeechSynthesisUtterance(clean);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    speechSynthesis.speak(utterance);
  }, []);

  const handleNewChat = useCallback(() => {
    createConversation();
  }, [createConversation]);

  const handleReset = useCallback(() => {
    if (isTyping) stopGeneration();
    if ("speechSynthesis" in window) speechSynthesis.cancel();
    createConversation();
  }, [isTyping, stopGeneration, createConversation]);

  const showEmptyState = messages.length === 0;

  // Find the last assistant message for follow-up display
  const lastAssistantMsg = [...messages].reverse().find((m) => m.role === "assistant");
  const lastAssistantId = lastAssistantMsg?.id ?? null;

  return (
    <div className="h-full flex flex-col bg-background overflow-hidden">
      {/* Sidebar */}
      <ChatSidebar
        conversations={conversations}
        activeId={activeConversationId}
        onSelect={setActiveConversationId}
        onNew={handleNewChat}
        onDelete={deleteConversation}
        onRename={updateConversationTitle}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      {/* Floating sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="fixed top-20 left-4 z-50 p-2.5 rounded-xl bg-card border border-border shadow-lg hover:bg-secondary transition-colors lg:hidden"
        aria-label="Open conversation sidebar"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {/* Main chat area */}
      <main className="flex-1 flex flex-col overflow-hidden" role="main">
        <div ref={chatContainerRef} className="flex-1 overflow-y-auto min-h-0">
          <div className="max-w-3xl mx-auto px-4 py-6">
            <AnimatePresence mode="wait">
              {showEmptyState ? (
                /* Welcome screen */
                <motion.div
                  key="welcome"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.4 }}
                  className="flex flex-col items-center justify-center min-h-[60vh] text-center"
                >
                  {/* Logo */}
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 rounded-3xl bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 flex items-center justify-center shadow-xl mb-6"
                    aria-hidden="true"
                  >
                    <BrainCircuit className="h-10 w-10 text-white" />
                  </motion.div>

                  <motion.h1
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl sm:text-4xl font-bold mb-2"
                  >
                    <span className="text-gradient-brand">Suresh AI</span>
                  </motion.h1>

                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-muted-foreground mb-8 max-w-md"
                  >
                    Your personal AI engineering tutor. Ask about algorithms, data structures,
                    system design, interview prep, or any engineering topic.
                  </motion.p>

                  {/* Feature grid */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="grid grid-cols-2 gap-3 mb-8 w-full max-w-sm"
                    role="list"
                    aria-label="Capabilities"
                  >
                    {WELCOME_FEATURES.map((feat, i) => (
                      <motion.div
                        key={feat.label}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="flex items-start gap-3 p-3 rounded-xl bg-secondary/50 border border-border text-left"
                        role="listitem"
                      >
                        <div className="p-2 rounded-lg bg-primary/10 text-primary shrink-0" aria-hidden="true">
                          {feat.icon}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{feat.label}</p>
                          <p className="text-[11px] text-muted-foreground">{feat.desc}</p>
                        </div>
                      </motion.div>
                    ))}
                  </motion.div>

                  {/* Quick starters */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="w-full max-w-md"
                  >
                    <p className="text-xs text-muted-foreground mb-3 font-medium">
                      <Sparkles className="h-3 w-3 inline mr-1" aria-hidden="true" />
                      Suggested questions
                    </p>
                    <div className="flex flex-wrap justify-center gap-2" role="group" aria-label="Suggested questions">
                      {QUICK_QUESTIONS.map((q) => (
                        <button
                          key={q}
                          onClick={() => handleSend(q)}
                          className="px-4 py-2 rounded-xl bg-secondary border border-border text-xs text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all duration-200"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ) : (
                /* Messages */
                <motion.div
                  key="messages"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-4"
                  role="log"
                  aria-label="Chat messages"
                  aria-live="polite"
                >
                  {messages.map((msg) => (
                    <ChatMessage
                      key={msg.id}
                      message={msg}
                      isStreaming={msg.isStreaming}
                      onCopy={handleCopy}
                      onRegenerate={
                        msg.role === "assistant" && !isTyping && !msg.error
                          ? () => regenerateMessage(msg.id)
                          : undefined
                      }
                      onFeedback={
                        msg.role === "assistant" ? (fb) => setFeedback(msg.id, fb) : undefined
                      }
                      onSpeak={msg.role === "assistant" ? handleSpeak : undefined}
                      showFollowUps={msg.id === lastAssistantId && !isTyping}
                      onFollowUp={handleSend}
                    />
                  ))}

                  {/* Typing indicator */}
                  <AnimatePresence>
                    {isTyping && messages.length > 0 && messages[messages.length - 1]?.role === "user" && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="flex gap-3"
                        role="status"
                        aria-label="AI is thinking"
                      >
                        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 flex items-center justify-center shrink-0 shadow-sm" aria-hidden="true">
                          <BrainCircuit className="h-4 w-4 text-white" />
                        </div>
                        <div className="bg-card border border-border rounded-2xl rounded-tl-md px-5 py-3.5 shadow-sm">
                          <div className="flex gap-1.5">
                            <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "0ms" }} />
                            <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "200ms" }} />
                            <span className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: "400ms" }} />
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div ref={messagesEndRef} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Input */}
        <ChatInput
          onSend={handleSend}
          onStop={stopGeneration}
          isTyping={isTyping}
          placeholder={
            showEmptyState
              ? "Ask me anything about engineering..."
              : "Type your message..."
          }
        />
      </main>
    </div>
  );
}
