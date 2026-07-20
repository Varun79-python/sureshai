import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Tutor",
  description:
    "Get instant help with engineering concepts, code debugging, interview prep, and exam questions from Suresh AI — your personal AI engineering tutor.",
  openGraph: {
    title: "Suresh AI Tutor — Engineering Learning Assistant",
    description:
      "Get instant help with engineering concepts, code debugging, interview prep, and exam questions from Suresh AI.",
  },
};

export default function AILayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Hide the root layout footer on the AI chat page to prevent whitespace gaps and layout shifting */}
      <style>{`
        body:has(main .ai-chat-page) footer {
          display: none !important;
        }
      `}</style>
      {children}
    </>
  );
}
