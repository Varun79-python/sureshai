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
  error?: boolean;
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

// ─── Model Config ──────────────────────────────────────────────────────────────

const MODEL_CONFIG: Record<AIModel, { name: string; description: string; icon: string }> = {
  suresh: { name: "Suresh AI", description: "Fast & efficient engineering tutor", icon: "⚡" },
  "suresh-pro": { name: "Suresh Pro", description: "In-depth technical explanations", icon: "🧠" },
  "suresh-reasoning": { name: "Suresh Think", description: "Step-by-step problem solving", icon: "💭" },
};

// ─── Fallback Responses (used when API is unavailable) ──────────────────────────

const FALLBACK_RESPONSE =
  "I'm currently in offline mode. Please configure your OpenAI API key in the `.env` file to enable full AI responses. In the meantime, you can explore the subjects, notes, and practice questions available on the platform.";

const FALLBACK_FOLLOW_UPS = [
  "How do I set up the OpenAI API key?",
  "What subjects are available?",
  "Show me the interview prep section",
  "Take me to the notes",
];

// ─── Follow-up generators ──────────────────────────────────────────────────────

function generateFollowUps(content: string, model: AIModel): string[] {
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
      "What are the edge cases?",
      "Prove this formally",
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
  const mountedRef = useRef(true);

  // Load conversations on mount
  useEffect(() => {
    mountedRef.current = true;
    setConversations(loadConversations());
    return () => {
      mountedRef.current = false;
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
    if (mountedRef.current) {
      setIsTyping(false);
      setStreamingText("");
    }
  }, []);

  // ─── API call ──────────────────────────────────────────────────────────────

  const callChatAPI = useCallback(
    async (
      convId: string,
      userContent: string,
      conversationHistory: { role: string; content: string }[]
    ) => {
      const tempMsgId = `msg-stream-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`;

      // Add placeholder message
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

      try {
        const response = await fetch("/api/chat", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            messages: conversationHistory,
            model: currentModel,
          }),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `API error: ${response.status}`);
        }

        const data = await response.json();
        const content = data.content || "";
        const followUps = generateFollowUps(content, currentModel);

        if (!mountedRef.current) return;

        setConversations((prev) =>
          prev.map((c) =>
            c.id === convId
              ? {
                  ...c,
                  messages: c.messages.map((m) =>
                    m.id === tempMsgId
                      ? { ...m, content, isStreaming: false, followUps }
                      : m
                  ),
                  updatedAt: Date.now(),
                }
              : c
          )
        );
      } catch (error) {
        console.error("[Suresh AI] Chat error:", error);

        if (!mountedRef.current) return;

        const errorMessage =
          error instanceof Error ? error.message : "An unexpected error occurred";

        // Use fallback for network errors or missing API key
        const isConfigError =
          errorMessage.includes("API key") ||
          errorMessage.includes("fetch") ||
          errorMessage.includes("Failed to fetch") ||
          errorMessage.includes("Network");

        setConversations((prev) =>
          prev.map((c) =>
            c.id === convId
              ? {
                  ...c,
                  messages: c.messages.map((m) =>
                    m.id === tempMsgId
                      ? {
                          ...m,
                          content: isConfigError ? FALLBACK_RESPONSE : `Sorry, I encountered an error: ${errorMessage}`,
                          isStreaming: false,
                          followUps: isConfigError ? FALLBACK_FOLLOW_UPS : [],
                          error: !isConfigError,
                        }
                      : m
                  ),
                  updatedAt: Date.now(),
                }
              : c
          )
        );
      } finally {
        if (mountedRef.current) {
          setIsTyping(false);
          setStreamingText("");
        }
      }
    },
    [currentModel]
  );

  // ─── Send message ──────────────────────────────────────────────────────────

  const sendMessage = useCallback(
    async (content: string) => {
      const validation = validateInput(content);
      if (!validation.valid || isTyping) return;

      let convId = activeConversationId;
      const trimmedContent = content.trim();

      if (!convId) {
        convId = createConversation(trimmedContent);
      }

      // Enforce message limit per conversation
      const conv = conversations.find((c) => c.id === convId);
      if (conv && conv.messages.length >= MAX_MESSAGES_PER_CONVO) {
        return;
      }

      const userMsg: Message = {
        id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
        role: "user",
        content: trimmedContent,
        timestamp: Date.now(),
      };

      setConversations((prev) => {
        // Refresh the conversation reference after createConversation
        const existing = prev.find((c) => c.id === convId);
        if (!existing) return prev;
        return prev.map((c) =>
          c.id === convId
            ? { ...c, messages: [...c.messages, userMsg], updatedAt: Date.now() }
            : c
        );
      });

      setIsTyping(true);

      // Build conversation history for the API
      const currentConv = conversations.find((c) => c.id === convId);
      const history = [
        ...(currentConv?.messages || []).filter((m) => m.role !== "system"),
        userMsg,
      ].map((m) => ({ role: m.role, content: m.content }));

      await callChatAPI(convId, trimmedContent, history);
    },
    [activeConversationId, isTyping, createConversation, callChatAPI, conversations]
  );

  // ─── Regenerate ────────────────────────────────────────────────────────────

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

      const history = newMessages
        .filter((m) => m.role !== "system")
        .map((m) => ({ role: m.role, content: m.content }));

      callChatAPI(activeConversation.id, newMessages[msgIndex - 1]?.content || "", history);
    },
    [activeConversation, isTyping, callChatAPI]
  );

  // ─── Feedback ──────────────────────────────────────────────────────────────

  const setFeedback = useCallback((messageId: string, feedback: "up" | "down" | null) => {
    setConversations((prev) =>
      prev.map((c) => ({
        ...c,
        messages: c.messages.map((m) => (m.id === messageId ? { ...m, feedback } : m)),
      }))
    );
  }, []);

  // ─── Export ────────────────────────────────────────────────────────────────

  const exportConversation = useCallback(() => {
    if (!activeConversation) return;
    try {
      const md = activeConversation.messages
        .filter((m) => m.content)
        .map((m) => `### ${m.role === "user" ? "You" : "Suresh AI"}\n\n${m.content}`)
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
