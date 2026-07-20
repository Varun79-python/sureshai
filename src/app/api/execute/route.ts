import { NextRequest, NextResponse } from "next/server";

/**
 * Code Execution API
 *
 * This endpoint proxies to the Piston API (https://github.com/engineer-man/piston)
 * for server-side language execution (C, C++, Java, Go, Rust, etc.).
 *
 * The Piston public API is currently whitelist-only, so this endpoint
 * returns a helpful message guiding users to self-host Piston.
 *
 * Languages that run client-side (JavaScript, Python via Pyodide, SQL via sql.js)
 * do NOT use this endpoint — they execute directly in the browser.
 */

export async function POST(_request: NextRequest) {
  return NextResponse.json(
    {
      error:
        "Server-side execution requires a Piston API instance. " +
        "Self-host your own: https://github.com/engineer-man/piston\n\n" +
        "Languages that run in-browser (no server needed):\n" +
        "  • JavaScript / TypeScript — browser engine\n" +
        "  • Python — Pyodide (WebAssembly)\n" +
        "  • SQL — sql.js (WebAssembly)\n" +
        "  • HTML/CSS — sandboxed iframe",
    },
    { status: 501 }
  );
}
