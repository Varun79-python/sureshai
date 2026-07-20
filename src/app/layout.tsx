import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/providers/theme-provider";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Suresh.AI — AI-Powered Engineering Learning Platform",
    template: "%s | Suresh.AI",
  },
  description:
    "Master engineering with AI-powered learning. Access 10,000+ questions, 500+ topics, notes, MCQs, interview prep, PYQs, and personalized roadmaps.",
  keywords: [
    "engineering",
    "learning",
    "AI",
    "education",
    "notes",
    "MCQs",
    "interview preparation",
    "study platform",
  ],
  authors: [{ name: "Suresh.AI" }],
  openGraph: {
    title: "Suresh.AI — AI-Powered Engineering Learning Platform",
    description:
      "Master engineering with AI-powered learning. Notes, MCQs, interview prep, PYQs, and more.",
    url: "https://suresh.ai",
    siteName: "Suresh.AI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Suresh.AI — AI-Powered Engineering Learning Platform",
    description:
      "Master engineering with AI-powered learning. Notes, MCQs, interview prep, PYQs, and more.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${manrope.variable}`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
