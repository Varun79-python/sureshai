import { NextRequest, NextResponse } from "next/server";

const PISTON_URL = "https://emkc.org/api/v2/piston/execute";

// Language version map for Piston API
const LANG_VERSIONS: Record<string, string> = {
  python: "3.10.0",
  javascript: "18.15.0",
  typescript: "5.0.3",
  java: "15.0.2",
  c: "10.2.0",
  "c++": "10.2.0",
  "csharp": "6.12.0",
  go: "1.16.2",
  rust: "1.68.2",
  ruby: "3.0.1",
  php: "8.2.3",
  swift: "5.3.3",
  kotlin: "1.8.20",
  scala: "3.2.2",
  rscript: "4.1.1",
  julia: "1.8.5",
  dart: "2.19.6",
  perl: "5.36.0",
  haskell: "9.0.1",
  lua: "5.4.4",
  bash: "5.2.0",
  sqlite3: "3.36.0",
};

// Language → file extension mapping
export const LANG_EXTENSIONS: Record<string, string> = {
  python: "py",
  javascript: "js",
  typescript: "ts",
  java: "java",
  c: "c",
  "c++": "cpp",
  csharp: "cs",
  go: "go",
  rust: "rs",
  ruby: "rb",
  php: "php",
  swift: "swift",
  kotlin: "kt",
  scala: "scala",
  rscript: "r",
  julia: "jl",
  dart: "dart",
  perl: "pl",
  haskell: "hs",
  lua: "lua",
  bash: "sh",
  sqlite3: "sql",
};

export const SUPPORTED_LANGUAGES = Object.keys(LANG_VERSIONS).sort();

export async function POST(request: NextRequest) {
  try {
    const { language, code, stdin } = await request.json();

    if (!language || !code) {
      return NextResponse.json(
        { error: "Missing required fields: language, code" },
        { status: 400 }
      );
    }

    const normalizedLang = language.toLowerCase().trim();
    const version = LANG_VERSIONS[normalizedLang];

    if (!version) {
      return NextResponse.json(
        {
          error: `Unsupported language: "${language}". Supported: ${SUPPORTED_LANGUAGES.join(", ")}`,
        },
        { status: 400 }
      );
    }

    const ext = LANG_EXTENSIONS[normalizedLang] || "txt";

    const payload = {
      language: normalizedLang,
      version,
      files: [
        {
          name: `main.${ext}`,
          content: code,
        },
      ],
      stdin: stdin || "",
      args: [],
      run_timeout: 10000,
      compile_timeout: 30000,
    };

    const response = await fetch(PISTON_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json(
        { error: `Execution service error: ${response.status} ${errorText}` },
        { status: 502 }
      );
    }

    const result = await response.json();

    return NextResponse.json({
      output: result.run?.output || "",
      stdout: result.run?.stdout || "",
      stderr: result.run?.stderr || "",
      error: result.run?.stderr || null,
      code: result.run?.code || null,
      signal: result.run?.signal || null,
      compile: result.compile
        ? {
            output: result.compile.output || "",
            code: result.compile.code,
          }
        : null,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Internal server error";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
