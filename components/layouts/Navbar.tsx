"use client"
import Link from "next/link";

import { MobileNav } from "@/components/layouts/MobileNav";
import { ThemeToggle } from "@/components/layouts/ThemeToggle";
import { Button } from "@/components/ui/button";
import { RandomizedTextEffect } from '@/components/ui/randomized-text';
import { getSetting, siteConfig } from "@/content/site";
import type { AppSettingsModel } from "@/generated/prisma/models";

export function Navbar({ settings }: { settings: AppSettingsModel[] }) {
  const siteName = getSetting(settings, "site", "name") ?? siteConfig.name;

  return (
    <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
      <nav className="mx-auto flex h-14 w-full max-w-3xl items-center justify-between px-4 sm:px-8">
        <Button asChild variant="link" className="px-0 font-heading text-base font-semibold">
          <Link href="/"><RandomizedTextEffect text={siteName} /></Link>
        </Button>

        <div className="flex items-center gap-1">
          <ThemeToggle />
          <MobileNav settings={settings} />
        </div>
      </nav>
    </header>
  );
}
