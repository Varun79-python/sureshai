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

const BASE_URL = "https://sureshai.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Suresh.AI — AI-Powered Engineering Learning Platform",
    template: "%s | Suresh.AI",
  },
  description:
    "Master engineering with AI-powered learning. Access 10,000+ questions, 500+ topics, notes, MCQs, interview prep, PYQs, and personalized roadmaps.",
  keywords: [
    "engineering",
    "AI tutor",
    "computer science",
    "data structures",
    "algorithms",
    "interview prep",
    "MCQs",
    "study notes",
    "engineering exams",
    "Suresh AI",
  ],
  authors: [{ name: "Suresh.AI" }],
  creator: "Suresh.AI",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sureshai.vercel.app",
    siteName: "Suresh.AI",
    title: "Suresh.AI — AI-Powered Engineering Learning Platform",
    description:
      "Master engineering with AI-powered learning. Access 10,000+ questions, 500+ topics, notes, MCQs, interview prep, PYQs, and personalized roadmaps.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Suresh.AI - Engineering Learning Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Suresh.AI — AI-Powered Engineering Learning Platform",
    description:
      "Master engineering with AI-powered learning. Access 10,000+ questions, 500+ topics, notes, MCQs, interview prep, PYQs, and personalized roadmaps.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
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
