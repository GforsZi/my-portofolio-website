import Link from "next/link";

import { siteConfig } from "@/content/site";

const footerLinks = [
  { href: siteConfig.socials.github, label: "GitHub" },
  { href: siteConfig.socials.linkedin, label: "LinkedIn" },
  { href: siteConfig.socials.twitter, label: "Twitter" },
];

export function Footer() {
  return (
    <footer className="border-t bg-background">
      <div className="mx-auto flex w-full max-w-3xl flex-col items-center justify-between gap-2 px-4 py-6 text-sm text-muted-foreground sm:flex-row sm:px-8">
        <p>© {new Date().getFullYear()} {siteConfig.name}</p>
        <div className="flex items-center gap-4">
          {footerLinks.map((link) => (
            <Link key={link.label} href={link.href} target="_blank" rel="noopener noreferrer">
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
