import "./globals.css";
import Link from "next/link";
import type { ReactNode } from "react";

export const metadata = {
  title: "AI IT Ops Dashboard",
  description: "AI-Powered Vulnerability Management & Support Assistant",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-zinc-50 text-zinc-900">
        <div className="flex min-h-screen">
          <aside className="w-64 bg-white border-r border-zinc-200 p-4 hidden md:block">
            <div className="font-bold text-xl mb-6">Agentic Ops</div>
            <nav className="space-y-2">
              <Link href="/" className="block px-3 py-2 rounded hover:bg-zinc-100">Dashboard</Link>
              <Link href="/tickets" className="block px-3 py-2 rounded hover:bg-zinc-100">Tickets</Link>
              <Link href="/vulnerabilities" className="block px-3 py-2 rounded hover:bg-zinc-100">Vulnerabilities</Link>
              <Link href="/endpoints" className="block px-3 py-2 rounded hover:bg-zinc-100">Endpoints</Link>
              <Link href="/settings" className="block px-3 py-2 rounded hover:bg-zinc-100">Settings</Link>
            </nav>
          </aside>
          <main className="flex-1">
            <header className="sticky top-0 z-10 bg-white border-b border-zinc-200">
              <div className="container py-4 flex items-center justify-between">
                <div className="font-semibold">AI-Powered Vulnerability Management & Support</div>
                <div className="text-sm text-zinc-500">Live Demo</div>
              </div>
            </header>
            <div className="container py-6">{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}
