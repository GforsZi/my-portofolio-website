"use client";

import * as React from "react";
import Link from "next/link";
import { createPortal } from "react-dom";
import { AtSign, Briefcase, GitBranch } from "lucide-react";

import { getSetting } from "@/content/site";
import type { AppSettingsModel } from "@/generated/prisma/models";
import { cn } from "@/lib/utils";

const socialIcons = {
  github: GitBranch,
  linkedin: Briefcase,
  twitter: AtSign,
} as const;

function useMounted() {
  return React.useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export function MobileNav({ settings }: { settings: AppSettingsModel[] }) {
  const [open, setOpen] = React.useState(false);
  const mounted = useMounted();

  const socials = {
    github: getSetting(settings, "social", "github") ?? "#",
    linkedin: getSetting(settings, "social", "linkedin") ?? "#",
    twitter: getSetting(settings, "social", "twitter") ?? "#",
  } as const;

  React.useEffect(() => {
    if (!open) return;
    document.body.style.overflow = "hidden";
    const close = () => setOpen(false);
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("popstate", close);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("popstate", close);
    };
  }, [open]);

  return (
    <div className="sm:hidden">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Tutup menu" : "Buka menu"}
        className="group relative flex size-9 items-center justify-center rounded-lg border border-border/60 bg-background/60 transition-colors hover:border-secondary/60 hover:text-secondary"
      >
        <span
          className={cn(
            "absolute h-0.5 w-4 rounded-full bg-current transition-all duration-300",
            open ? "rotate-45" : "-translate-y-1.5 group-hover:w-5",
          )}
        />
        <span
          className={cn(
            "absolute h-0.5 w-4 rounded-full bg-current transition-all duration-300",
            open ? "opacity-0" : "group-hover:w-5",
          )}
        />
        <span
          className={cn(
            "absolute h-0.5 w-4 rounded-full bg-current transition-all duration-300",
            open ? "-rotate-45" : "translate-y-1.5 group-hover:w-5",
          )}
        />
      </button>

      {mounted
        ? createPortal(
            <div
              className={cn(
                "fixed inset-x-0 top-14 bottom-0 z-50 overflow-hidden transition-all duration-500 ease-out sm:hidden",
                open
                  ? "pointer-events-auto visible opacity-100"
                  : "pointer-events-none invisible opacity-0",
              )}
              aria-hidden={!open}
            >
              <div className="absolute inset-0 bg-background/90 backdrop-blur-2xl" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(21,145,220,0.18),transparent_55%)]" />
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(21,145,220,0.07)_1px,transparent_1px),linear-gradient(to_bottom,rgba(21,145,220,0.07)_1px,transparent_1px)] bg-[size:28px_28px]" />

              <div
                className={cn(
                  "relative flex h-full flex-col justify-center px-6 pb-8 pt-10 transition-all duration-500 ease-out",
                  open ? "translate-y-0 opacity-100" : "-translate-y-6 opacity-0",
                )}
              >
                <div
                  className={cn(
                    "transition-all duration-500",
                    open ? "delay-300 opacity-100" : "opacity-0",
                  )}
                >
                  <p className="mb-3 font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
                    Koneksi
                  </p>
                <div className="flex gap-3">
                  {(Object.keys(socialIcons) as Array<keyof typeof socialIcons>).map((key) => {
                    const Icon = socialIcons[key];
                    return (
                      <Link
                        key={key}
                        href={socials[key]}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={key}
                        className="flex size-10 items-center justify-center rounded-lg border border-border/60 text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-secondary/60 hover:text-secondary hover:shadow-[0_0_20px_rgba(21,145,220,0.35)]"
                      >
                        <Icon className="size-4" />
                      </Link>
                    );
                  })}
                </div>
                </div>
              </div>
            </div>,
            document.body,
          )
        : null}
    </div>
  );
}
