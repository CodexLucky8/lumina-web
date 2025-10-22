import Link from "next/link";
import { Button } from "@/components/Button";

const links = [
  { href: "/assessments/stress-check", label: "Stress Check" },
  { href: "/therapy", label: "Therapy" },
  { href: "/community", label: "Community" },
  { href: "/dashboard", label: "Dashboard" }
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-brand-charcoal/10 bg-white/70 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <Link href="/" className="text-lg font-semibold text-brand-charcoal">
          Lumina
        </Link>
        <nav className="hidden items-center gap-6 text-sm font-medium text-brand-charcoal md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="hover:text-brand-charcoal/70">
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Button variant="secondary" href="/assessments/stress-check">
            Start Assessment
          </Button>
        </div>
      </div>
    </header>
  );
}
