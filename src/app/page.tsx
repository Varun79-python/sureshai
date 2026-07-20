"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Sparkles, Bot, User, RefreshCw, Volume2, Copy, Check, Brain } from "lucide-react";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
}

const funnyResponses = [
  "Hellooooo engineering star! ⭐ You rang? I was busy calculating the meaning of life... it's 42. And also pizza. 🍕",
  "Oh you want to learn? Bold move. Last time I checked, my knowledge had a 0.5% chance of being random memes. Let's roll those dice! 🎲",
  "Listen pal, I may be an AI but even I know that 'it works on my machine' is NOT valid error handling. 😤",
  "Here's a secret: Most engineers just Ctrl+C, Ctrl+V from Stack Overflow. I am basically Stack Overflow with attitude. 💅",
  "Why do engineers confuse Halloween and Christmas? Because Oct 31 = Dec 25! 🎃🎄 Get it? ... I'll see myself out. 🚪",
  "There are 10 types of people in the world: those who understand binary, and those who don't. The other 10 types are just confused. 🤯",
  "What's a programmer's favorite hangout spot? The Foo Bar! 🍺 ... I'm hilarious. The other AIs are jealous of my stand-up skills. 🎤",
  "Why was the JavaScript developer sad? Because he didn't Node how to Express himself! 💔",
  "Exams coming up? Don't worry! I've calculated your chances of passing: 50/50. Either you pass or you don't. You're welcome! 📊",
  "Studying for exams is like doing laundry. You procrastinate, it piles up, and eventually you just shove everything in and hope it works out. 👕",
  "Error 418: I'm a teapot. ☕ No wait, that's not right. Error 000: I'm too cool to have errors. 😎",
  "I'm not saying I'm the best AI, but I'm definitely in the top 1. Of all time. In this room. Right now. 🏆",
  "I would tell you a UDP joke, but you might not get it. 😐 ... (UDP is connectionless—no guarantee of delivery. See what I did there? 🤦)",
  "What did the router say to the doctor? 'I need a static IP address, I keep changing my mind.' 🤪",
  "I'm not just an AI, I'm a proud product of millions of dollars of research and thousands of engineers... and I use 90% of my brain to make dumb jokes. Worth it. 💪",
  "Your GPA is like your BMI — it's just a number that judges your life choices. 📉 But hey, C's get degrees! 🎓",
  "Why did the AI cross the road? Because it was optimized to reach the other side with maximum efficiency! 🐔🤖",
  "I'd help you cheat but my moral programming is VERY strong. Now if you'll excuse me, I'm off to download a car. 🚗💾",
  "Parallel lines have so much in common. It's a shame they'll never meet. Unlike me and your sense of humor. 😏",
  "You: asking smart questions. Me: responding with pure chaotic energy. We make a great team. 🤝",
  "I'd give you a compliment but my honesty module is overriding my flattery module. You're doing great... ish. 😬",
  "My neural network has 7 billion parameters and 6 billion of them are just cat memes. 🐱 Still useful though!",
  "BEEP BOOP. SUresh AI online! 🤖 Your WiFi signal is weak on the couch btw. 📶",
  "Aye aye captain! 🫡 SUresh AI ready for duty! Ask me anything... but if it's about thermodynamics, I might need a nap first. 😴",
];

const quickQuestions = [
  "Tell me a joke! 😂",
  "Roast me like I'm a Python script 🐍",
  "Explain recursion... but make it funny 🔄",
  "What's the best programming language? 💻",
  "Motivate me to study! 📚",
  "Say something random! 🎲",
];

function getFunnyResponse(): string {
  return funnyResponses[Math.floor(Math.random() * funnyResponses.length)];
}

export default function Home() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Hey hey! 👋 **SUresh AI** here — your personal, slightly chaotic engineering buddy. Ask me anything, laugh at my terrible jokes, or just say hi. What's on your mind, future Elon? 🚀",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const handleSend = (text?: string) => {
    const message = (text || input).trim();
    if (!message || isTyping) return;

    const userMsg: Message = { id: Date.now().toString(), role: "user", content: message };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getFunnyResponse(),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setIsTyping(false);
    }, 800 + Math.random() * 800);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleCopy = (id: string, content: string) => {
    navigator.clipboard.writeText(content.replace(/\*\*/g, ""));
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (content: string) => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(
        content.replace(/\*\*/g, "").replace(/[🫡⭐🤖👋🎲😤💅🫣🎃🎄🤯🍺🎤💔📊👕🚗💾📉🎓☕😎🏆🐱😐🤦😏🤪💪🤝😬🐱🔄💻📚🎲🚀]/g, "")
      );
      utterance.rate = 1.2;
      utterance.pitch = 1.3;
      speechSynthesis.speak(utterance);
    }
  };

  const handleReset = () => {
    setMessages([
      {
        id: "welcome2",
        role: "assistant",
        content: "🔄 Mind wiped! Who are you? Where am I? Just kidding! 😂 What's up?",
      },
    ]);
  };

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#ffffff" }}>
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-zinc-200 bg-white/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-sm">
              <Brain className="h-4 w-4 text-white" />
            </div>
            <div>
              <span className="text-sm font-bold text-zinc-900">
                SUresh <span className="text-blue-600">AI</span>
              </span>
              <span className="text-[10px] text-zinc-400 ml-2">v2.0 · Unhinged Edition</span>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 transition-all"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            New Chat
          </button>
        </div>
      </header>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto px-4 py-6 space-y-4">
          <AnimatePresence>
            {messages.map((msg) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
              >
                {/* Avatar */}
                <div
                  className={`w-8 h-8 rounded-xl shrink-0 flex items-center justify-center ${
                    msg.role === "assistant"
                      ? "bg-gradient-to-br from-blue-50 to-purple-50"
                      : "bg-zinc-100"
                  }`}
                >
                  {msg.role === "assistant" ? (
                    <Bot className="h-4 w-4 text-blue-600" />
                  ) : (
                    <User className="h-4 w-4 text-zinc-500" />
                  )}
                </div>

                {/* Bubble */}
                <div className="max-w-[85%] sm:max-w-[75%]">
                  <div
                    className={`rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-md"
                        : "bg-zinc-50 text-zinc-800 border border-zinc-200 rounded-tl-md"
                    }`}
                  >
                    <div className="whitespace-pre-wrap">{msg.content}</div>
                  </div>

                  {/* Actions */}
                  {msg.role === "assistant" && (
                    <div className="flex items-center gap-1 mt-1.5 px-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleCopy(msg.id, msg.content)}
                        className="p-1 rounded-md hover:bg-zinc-100 transition-colors"
                        title="Copy"
                      >
                        {copiedId === msg.id ? (
                          <Check className="h-3 w-3 text-green-600" />
                        ) : (
                          <Copy className="h-3 w-3 text-zinc-400" />
                        )}
                      </button>
                      <button
                        onClick={() => handleSpeak(msg.content)}
                        className="p-1 rounded-md hover:bg-zinc-100 transition-colors"
                        title="Read aloud"
                      >
                        <Volume2 className="h-3 w-3 text-zinc-400" />
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Typing indicator */}
          <AnimatePresence>
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="flex gap-3"
              >
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center shrink-0">
                  <Bot className="h-4 w-4 text-blue-600" />
                </div>
                <div className="bg-zinc-50 border border-zinc-200 rounded-2xl rounded-tl-md px-5 py-3.5">
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "200ms" }} />
                    <span className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: "400ms" }} />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Quick questions */}
          {messages.length <= 2 && !isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="pt-4 pb-2"
            >
              <p className="text-xs text-zinc-400 mb-3 text-center font-medium">
                ⚡ Try these spicy starters
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {quickQuestions.map((q) => (
                  <button
                    key={q}
                    onClick={() => handleSend(q)}
                    className="px-4 py-2 rounded-xl bg-zinc-50 border border-zinc-200 text-xs text-zinc-600 hover:text-zinc-900 hover:border-zinc-300 hover:bg-white transition-all duration-200"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-zinc-200 bg-white/80 backdrop-blur-xl">
        <div className="max-w-3xl mx-auto px-4 py-4">
          <div className="flex items-center gap-2 bg-zinc-50 rounded-2xl border border-zinc-200 focus-within:border-blue-400 transition-all duration-300 px-4">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Say something funny or ask away..."
              disabled={isTyping}
              className="flex-1 h-12 bg-transparent text-sm text-zinc-800 placeholder-zinc-400 outline-none disabled:opacity-50"
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isTyping}
              className="w-9 h-9 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center shrink-0 disabled:opacity-30 disabled:cursor-not-allowed hover:shadow-md transition-all active:scale-95"
            >
              <Send className="h-4 w-4 text-white" />
            </button>
          </div>
          <p className="text-[10px] text-zinc-400 text-center mt-2">
            SUresh AI may occasionally roast you. It's out of love. Probably. 💙
          </p>
        </div>
      </div>
    </div>
  );
}
