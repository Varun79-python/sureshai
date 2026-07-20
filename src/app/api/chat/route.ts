import { NextResponse } from "next/server";

// ─── Runtime ───────────────────────────────────────────────────────────────────
export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// ─── Types ─────────────────────────────────────────────────────────────────────

interface ChatMessage {
  role: "user" | "assistant" | "system";
  content: string;
}

// ─── System Prompt ──────────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are **Suresh AI** — a helpful, precise, and encouraging engineering tutor.

Your purpose is to help engineering students learn, understand concepts, debug code, prepare for exams and interviews, and build projects.

## Guidelines:
- Provide accurate, well-explained answers with code examples when relevant.
- Use markdown formatting (headings, code blocks, lists, tables) for clarity.
- Break down complex topics step-by-step.
- If a student asks something outside engineering/CS, gently redirect to your scope.
- NEVER make jokes at the student's expense. Be supportive and professional.
- When asked to explain code, provide working examples with explanations.
- For interview prep, give structured answers with key points.
- For debugging, help identify the issue and explain the fix.
- Be concise but thorough — prefer depth over fluff.
- If you don't know something, say so honestly rather than making it up.

You are part of the Suresh.AI learning platform which offers notes, MCQs, interview prep, PYQs, roadmaps, and coding playground.`;

// ─── Handler ────────────────────────────────────────────────────────────────────

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { messages, model: requestedModel } = body;

    // Validate input
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages array is required and must not be empty" },
        { status: 400 }
      );
    }

    // Validate message format
    for (const msg of messages) {
      if (!msg.role || !msg.content) {
        return NextResponse.json(
          { error: "Each message must have a 'role' and 'content'" },
          { status: 400 }
        );
      }
      if (!["user", "assistant", "system"].includes(msg.role)) {
        return NextResponse.json(
          { error: "Invalid message role. Must be 'user', 'assistant', or 'system'" },
          { status: 400 }
        );
      }
    }

    // Model selection
    const modelMap: Record<string, string> = {
      suresh: "gpt-4o-mini",
      "suresh-pro": "gpt-4o",
      "suresh-reasoning": "o3-mini",
    };
    const model = modelMap[requestedModel] || "gpt-4o-mini";

    // Build message array with system prompt
    const apiMessages: ChatMessage[] = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages.slice(-20), // Keep last 20 messages for context window
    ];

    // Check for API key
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey || apiKey === "your_openai_api_key") {
      // Fallback: return a helpful message
      return NextResponse.json({
        role: "assistant",
        content:
          "I'm currently in offline mode. To enable my full AI capabilities, please set your **OpenAI API key** in the `.env` file:\n\n```\nOPENAI_API_KEY=sk-your-key-here\n```\n\nOnce set, I'll be able to answer any engineering question with full power! 🚀\n\nIn the meantime, feel free to explore the subjects, notes, and practice questions available on the platform.",
        model,
      });
    }

    // Call OpenAI API
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: apiMessages,
        temperature: 0.7,
        max_tokens: 4096,
        stream: false,
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("[Suresh AI] OpenAI API error:", response.status, errorData);

      if (response.status === 401) {
        return NextResponse.json(
          { error: "Invalid API key. Please check your OPENAI_API_KEY." },
          { status: 401 }
        );
      }

      if (response.status === 429) {
        return NextResponse.json(
          { error: "Rate limit exceeded. Please try again in a moment." },
          { status: 429 }
        );
      }

      return NextResponse.json(
        { error: `AI service error: ${response.status}` },
        { status: response.status }
      );
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message;

    if (!assistantMessage) {
      return NextResponse.json(
        { error: "AI service returned an empty response" },
        { status: 502 }
      );
    }

    return NextResponse.json({
      role: "assistant",
      content: assistantMessage.content,
      model,
    });
  } catch (error) {
    console.error("[Suresh AI] Chat API error:", error);
    return NextResponse.json(
      { error: "Internal server error. Please try again." },
      { status: 500 }
    );
  }
}
