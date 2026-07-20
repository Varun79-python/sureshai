"use client";

import { useState, memo, useCallback } from "react";
import { motion } from "framer-motion";
import { Bot, User, Copy, Check, RotateCcw, ThumbsUp, ThumbsDown, Volume2 } from "lucide-react";
import { MarkdownRenderer } from "./MarkdownRenderer";
import type { Message } from "@/hooks/useChat";

interface ChatMessageProps {
  message: Message;
  isStreaming?: boolean;
  onCopy: (content: string) => void;
  onRegenerate?: () => void;
  onFeedback?: (feedback: "up" | "down" | null) => void;
  onSpeak?: (content: string) => void;
  showFollowUps?: boolean;
  onFollowUp?: (question: string) => void;
}

export const ChatMessage = memo(function ChatMessage({
  message,
  isStreaming,
  onCopy,
  onRegenerate,
  onFeedback,
  onSpeak,
  showFollowUps,
  onFollowUp,
}: ChatMessageProps) {
  const [copied, setCopied] = useState(false);
  const isUser = message.role === "user";

  const handleCopy = useCallback(() => {
    const cleaned = message.content.replace(/\*\*/g, "").replace(/`/g, "");
    navigator.clipboard.writeText(cleaned).catch(() => {});
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, [message.content]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className={`flex gap-3 group ${isUser ? "flex-row-reverse" : ""}`}
      role="article"
      aria-label={isUser ? "Your message" : "AI response"}
    >
      {/* Avatar */}
      <div
        className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center shadow-sm ${
          isUser
            ? "bg-gradient-to-br from-primary to-primary-dark"
            : "bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500"
        }`}
        aria-hidden="true"
      >
        {isUser ? <User className="h-4 w-4 text-white" /> : <Bot className="h-4 w-4 text-white" />}
      </div>

      {/* Message bubble */}
      <div className={`max-w-[85%] sm:max-w-[78%] ${isUser ? "items-end" : "items-start"} flex flex-col`}>
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? "bg-primary text-white rounded-tr-md"
              : "bg-card text-card-foreground border border-border rounded-tl-md shadow-sm"
          }`}
        >
          {isUser ? (
            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
          ) : (
            <MarkdownRenderer content={message.content} isStreaming={isStreaming} />
          )}
        </div>

        {/* Action bar - only for assistant messages */}
        {!isUser && !isStreaming && (
          <div className="flex items-center gap-0.5 mt-1.5 px-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              title={copied ? "Copied!" : "Copy"}
              aria-label={copied ? "Copied to clipboard" : "Copy message"}
            >
              {copied ? <Check className="h-3.5 w-3.5 text-success" /> : <Copy className="h-3.5 w-3.5" />}
            </button>
            {onSpeak && (
              <button
                onClick={() => onSpeak(message.content)}
                className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                title="Read aloud"
                aria-label="Read message aloud"
              >
                <Volume2 className="h-3.5 w-3.5" />
              </button>
            )}
            {onRegenerate && (
              <button
                onClick={onRegenerate}
                className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                title="Regenerate"
                aria-label="Regenerate response"
              >
                <RotateCcw className="h-3.5 w-3.5" />
              </button>
            )}
            <div className="w-px h-3.5 bg-border mx-0.5" aria-hidden="true" />
            <button
              onClick={() => onFeedback?.(message.feedback === "up" ? null : "up")}
              className={`p-1.5 rounded-lg transition-colors ${
                message.feedback === "up"
                  ? "bg-success/10 text-success"
                  : "hover:bg-secondary text-muted-foreground hover:text-foreground"
              }`}
              title="Good response"
              aria-label={message.feedback === "up" ? "Remove upvote" : "Upvote response"}
              aria-pressed={message.feedback === "up"}
            >
              <ThumbsUp className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => onFeedback?.(message.feedback === "down" ? null : "down")}
              className={`p-1.5 rounded-lg transition-colors ${
                message.feedback === "down"
                  ? "bg-danger/10 text-danger"
                  : "hover:bg-secondary text-muted-foreground hover:text-foreground"
              }`}
              title="Bad response"
              aria-label={message.feedback === "down" ? "Remove downvote" : "Downvote response"}
              aria-pressed={message.feedback === "down"}
            >
              <ThumbsDown className="h-3.5 w-3.5" />
            </button>
          </div>
        )}

        {/* Follow-up suggestions */}
        {!isUser && !isStreaming && showFollowUps && message.followUps && message.followUps.length > 0 && onFollowUp && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.3 }}
            className="flex flex-wrap gap-1.5 mt-2"
            role="group"
            aria-label="Suggested follow-up questions"
          >
            {message.followUps.map((q) => (
              <button
                key={q}
                onClick={() => onFollowUp(q)}
                className="px-3 py-1.5 rounded-full text-xs bg-secondary hover:bg-secondary/80 text-muted-foreground hover:text-foreground border border-border hover:border-primary/30 transition-all duration-200"
                aria-label={`Ask: ${q}`}
              >
                {q}
              </button>
            ))}
          </motion.div>
        )}
      </div>
    </motion.div>
  );
});
