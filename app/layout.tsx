import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TapSmart – Learn Tech with Confidence",
  description:
    "TapSmart helps senior citizens learn technology through simple step-by-step interactive lessons, voice guidance, and AI assistance.",
  keywords: [
    "TapSmart",
    "senior learning app",
    "learn technology easily",
    "interactive learning",
    "AI tutor",
    "digital literacy",
  ],
  authors: [{ name: "Eshita Das" }],
  openGraph: {
    title: "TapSmart – Interactive Learning for Seniors",
    description:
      "Simple, step-by-step tech learning with AI guidance and gamification.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning suppressContentEditableWarning>
        {/* 🌐 App Container */}
        <main>
          {children}
        </main>

      </body>
    </html>
  );
}
