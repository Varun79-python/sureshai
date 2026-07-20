"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain, RefreshCw, Menu, Download, ChevronDown, Zap, BrainCircuit, Lightbulb } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { AIModel } from "@/hooks/useChat";

interface ChatHeaderProps {
  currentModel: AIModel;
  models: Record<AIModel, { name: string; description: string; icon: string }>;
  onModelChange: (model: AIModel) => void;
  onReset: () => void;
  onExport?: () => void;
  onToggleSidebar?: () => void;
  conversationTitle?: string;
  messageCount?: number;
}

const modelIcons: Record<AIModel, React.ReactNode> = {
  suresh: <Zap className="h-4 w-4" />,
  "suresh-pro": <BrainCircuit className="h-4 w-4" />,
  "suresh-reasoning": <Lightbulb className="h-4 w-4" />,
};

export function ChatHeader({
  currentModel,
  models,
  onModelChange,
  onReset,
  onExport,
  onToggleSidebar,
  conversationTitle,
  messageCount,
}: ChatHeaderProps) {
  const [showModelPicker, setShowModelPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const closePicker = useCallback(() => setShowModelPicker(false), []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(e.target as Node)) {
        closePicker();
      }
    };
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && showModelPicker) {
        closePicker();
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [showModelPicker, closePicker]);

  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-xl sticky top-0 z-40" role="banner">
      <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-3">
          {onToggleSidebar && (
            <button
              onClick={onToggleSidebar}
              className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors lg:hidden"
              aria-label="Open conversation sidebar"
            >
              <Menu className="h-4 w-4" />
            </button>
          )}
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 via-blue-500 to-cyan-500 flex items-center justify-center shadow-md" aria-hidden="true">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <div className="hidden sm:block">
              <div className="flex items-center gap-2">
                <span className="text-base font-bold tracking-tight">
                  <span className="text-gradient-brand">SUresh AI</span>
                </span>
                <Badge variant="warning" size="sm" className="text-[10px]">
                  Unhinged Edition
                </Badge>
              </div>
              {conversationTitle && (
                <p className="text-[10px] text-muted-foreground truncate max-w-[200px]">
                  {conversationTitle}
                  {messageCount ? ` · ${messageCount} messages` : ""}
                </p>
              )}
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-1.5">
          {/* Model selector */}
          <div className="relative" ref={pickerRef}>
            <button
              ref={buttonRef}
              onClick={() => setShowModelPicker(!showModelPicker)}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-secondary hover:bg-secondary/80 border border-border hover:border-primary/30 transition-all"
              aria-haspopup="listbox"
              aria-expanded={showModelPicker}
              aria-label={`Current model: ${models[currentModel].name}. Click to change.`}
            >
              {modelIcons[currentModel]}
              <span className="hidden sm:inline">{models[currentModel].name}</span>
              <ChevronDown className={`h-3 w-3 text-muted-foreground transition-transform ${showModelPicker ? "rotate-180" : ""}`} />
            </button>

            <AnimatePresence>
              {showModelPicker && (
                <motion.div
                  initial={{ opacity: 0, y: -8, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -8, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  className="absolute right-0 top-full mt-2 w-64 bg-card border border-border rounded-xl shadow-xl overflow-hidden z-50"
                  role="listbox"
                  aria-label="Select model"
                >
                  <div className="p-2">
                    <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-2 py-1.5">
                      Select Model
                    </p>
                    {(Object.keys(models) as AIModel[]).map((key) => (
                      <button
                        key={key}
                        onClick={() => {
                          onModelChange(key);
                          closePicker();
                        }}
                        className={`w-full flex items-start gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                          key === currentModel
                            ? "bg-primary/10 text-primary"
                            : "hover:bg-secondary text-foreground"
                        }`}
                        role="option"
                        aria-selected={key === currentModel}
                      >
                        <div className="mt-0.5">{modelIcons[key]}</div>
                        <div className="text-left">
                          <p className="text-sm font-medium">{models[key].name}</p>
                          <p className="text-[11px] text-muted-foreground">{models[key].description}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {onExport && (
            <button
              onClick={onExport}
              className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
              title="Export chat as Markdown"
              aria-label="Export conversation"
            >
              <Download className="h-4 w-4" />
            </button>
          )}

          <button
            onClick={onReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-muted-foreground hover:text-foreground hover:bg-secondary transition-all"
            aria-label="Start new chat"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">New Chat</span>
          </button>
        </div>
      </div>
    </header>
  );
}
