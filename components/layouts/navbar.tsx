"use client"
import Link from "next/link";

import { MobileNav } from "@/components/layouts/mobile-nav";
import { ThemeToggle } from "@/components/layouts/theme-toggle";
import { Button } from "@/components/ui/button";
import { RandomizedTextEffect } from '@/components/ui/randomized-text';
import { siteConfig } from "@/content/site";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-4 sm:px-8">
        <Button asChild variant="link" className="px-0 font-heading text-base font-semibold">
          <Link href="/"><RandomizedTextEffect text={siteConfig.name} /></Link>
        </Button>

        <div className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 sm:flex">
            {siteConfig.navLinks.map((link) => (
              <li key={link.href}>
                <Button asChild variant="ghost" size="sm">
                  <Link href={link.href}>{link.label}</Link>
                </Button>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <MobileNav />
        </div>
      </nav>
    </header>
  );
}
