"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, MessageSquare, Trash2, X, Search, Pencil, Check } from "lucide-react";
import type { Conversation } from "@/hooks/useChat";

interface ChatSidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onNew: () => void;
  onDelete: (id: string) => void;
  onRename: (id: string, title: string) => void;
  isOpen: boolean;
  onClose: () => void;
}

function formatTime(timestamp: number): string {
  const diff = Date.now() - timestamp;
  const minutes = Math.floor(diff / 60000);
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export function ChatSidebar({
  conversations,
  activeId,
  onSelect,
  onNew,
  onDelete,
  onRename,
  isOpen,
  onClose,
}: ChatSidebarProps) {
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);

  const filtered = conversations.filter((c) =>
    c.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleRename = useCallback(
    (id: string) => {
      if (editValue.trim()) {
        onRename(id, editValue.trim());
      }
      setEditingId(null);
    },
    [editValue, onRename]
  );

  const handleDelete = useCallback(
    (id: string) => {
      if (confirmDeleteId === id) {
        onDelete(id);
        setConfirmDeleteId(null);
      } else {
        setConfirmDeleteId(id);
        // Auto-reset after 3 seconds
        setTimeout(() => setConfirmDeleteId((prev) => (prev === id ? null : prev)), 3000);
      }
    },
    [confirmDeleteId, onDelete]
  );

  // Group conversations by time
  const now = Date.now();
  const today: Conversation[] = [];
  const yesterday: Conversation[] = [];
  const older: Conversation[] = [];

  filtered.forEach((c) => {
    const diff = now - c.updatedAt;
    if (diff < 86400000) today.push(c);
    else if (diff < 172800000) yesterday.push(c);
    else older.push(c);
  });

  const renderGroup = (label: string, items: Conversation[]) => {
    if (items.length === 0) return null;
    return (
      <div className="mb-4" role="group" aria-label={label}>
        <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground px-3 mb-1.5">
          {label}
        </p>
        {items.map((conv) => (
          <div
            key={conv.id}
            className={`group relative flex items-center gap-2 px-3 py-2 mx-2 rounded-lg cursor-pointer transition-colors ${
              conv.id === activeId
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-secondary hover:text-foreground"
            }`}
            onClick={() => {
              onSelect(conv.id);
              onClose();
            }}
            role="option"
            aria-selected={conv.id === activeId}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(conv.id);
                onClose();
              }
            }}
          >
            <MessageSquare className="h-4 w-4 shrink-0" aria-hidden="true" />
            {editingId === conv.id ? (
              <div className="flex-1 flex items-center gap-1">
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleRename(conv.id);
                    if (e.key === "Escape") setEditingId(null);
                  }}
                  onBlur={() => handleRename(conv.id)}
                  className="flex-1 bg-transparent text-sm outline-none border-b border-primary"
                  autoFocus
                  aria-label="Rename conversation"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRename(conv.id);
                  }}
                  className="text-success"
                  aria-label="Confirm rename"
                >
                  <Check className="h-3.5 w-3.5" />
                </button>
              </div>
            ) : (
              <>
                <span className="flex-1 text-sm truncate">{conv.title}</span>
                <div className="flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setEditingId(conv.id);
                      setEditValue(conv.title);
                    }}
                    className="p-1 rounded hover:bg-background/50 transition-colors"
                    title="Rename"
                    aria-label={`Rename "${conv.title}"`}
                  >
                    <Pencil className="h-3 w-3" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDelete(conv.id);
                    }}
                    className={`p-1 rounded transition-colors ${
                      confirmDeleteId === conv.id
                        ? "bg-danger/10 text-danger"
                        : "hover:bg-danger/10 hover:text-danger"
                    }`}
                    title={confirmDeleteId === conv.id ? "Click again to confirm" : "Delete"}
                    aria-label={
                      confirmDeleteId === conv.id
                        ? `Confirm delete "${conv.title}"`
                        : `Delete "${conv.title}"`
                    }
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    );
  };

  return (
    <>
      {/* Mobile overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            onClick={onClose}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="fixed inset-y-0 left-0 w-72 bg-card border-r border-border z-50 flex flex-col"
            role="dialog"
            aria-label="Conversation history"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <span className="text-sm font-semibold text-foreground">Conversations</span>
              <button
                onClick={onClose}
                className="p-1.5 rounded-lg hover:bg-secondary text-muted-foreground lg:hidden"
                aria-label="Close sidebar"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* New chat */}
            <div className="px-3 py-3">
              <button
                onClick={() => {
                  onNew();
                  onClose();
                }}
                className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-xl border border-dashed border-border hover:border-primary/50 hover:bg-primary/5 text-sm text-muted-foreground hover:text-foreground transition-all"
              >
                <Plus className="h-4 w-4" />
                New Chat
              </button>
            </div>

            {/* Search */}
            <div className="px-3 pb-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" aria-hidden="true" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search conversations..."
                  className="w-full pl-9 pr-3 py-2 rounded-lg bg-secondary border border-border text-sm text-foreground placeholder-muted-foreground outline-none focus:border-primary/50 transition-colors"
                  aria-label="Search conversations"
                />
              </div>
            </div>

            {/* Conversation list */}
            <div className="flex-1 overflow-y-auto pb-4" role="listbox" aria-label="Conversations">
              {filtered.length === 0 ? (
                <div className="text-center py-12 px-4">
                  <MessageSquare className="h-8 w-8 text-muted-foreground/30 mx-auto mb-3" aria-hidden="true" />
                  <p className="text-sm text-muted-foreground">
                    {search ? "No matching conversations" : "No conversations yet"}
                  </p>
                </div>
              ) : (
                <>
                  {renderGroup("Today", today)}
                  {renderGroup("Yesterday", yesterday)}
                  {renderGroup("Older", older)}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
