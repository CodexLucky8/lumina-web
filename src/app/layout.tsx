import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://lumina.example.com"),
  title: {
    default: "Lumina | Mental Wellness for Modern Teams",
    template: "%s | Lumina"
  },
  description:
    "Lumina helps teams navigate stress with guided assessments, therapy sessions, and a supportive community."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-gradient-to-b from-white via-white to-brand-sunshine/20">
        <Header />
        <main className="flex-1">
          <div className="mx-auto w-full max-w-6xl px-4 py-12">{children}</div>
        </main>
        <Footer />
      </body>
    </html>
  );
}
