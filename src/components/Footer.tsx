import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-brand-charcoal/10 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 text-sm text-brand-charcoal/70 md:flex-row md:items-center md:justify-between">
        <p>&copy; {new Date().getFullYear()} Lumina Health. All rights reserved.</p>
        <nav className="flex gap-4">
          <Link href="/privacy">Privacy</Link>
          <Link href="/terms">Terms</Link>
        </nav>
      </div>
    </footer>
  );
}
