"use client"

import { useState } from "react";
import { useBreadcrumb } from "@/components/layouts/BreadcrumbProvider";

export interface NavItem {
  sectionId: string;
  label: string;
  href: string;
}

interface NavbarProps {
  items?: NavItem[];
  defaultActiveId?: string;
  className?: string;
}

const defaultItems: NavItem[] = [
  { sectionId: "welcome", label: "Welcome", href: "/#" },
  { sectionId: "weapons", label: "Weapons", href: "/#weapons" },
  { sectionId: "journey", label: "Journey", href: "/#journey" },
  { sectionId: "completed-missions", label: "Completed Missions", href: "/#completed-missions" },
  { sectionId: "contact", label: "Contact", href: "#contact" },
];


export default function NavLink({
  items = defaultItems,
  defaultActiveId = "weapons",
  className = "",
}: NavbarProps) {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(defaultActiveId);
  const { title } = useBreadcrumb();

  return (
    <nav
      className={`h-fit lg:h-screen w-fit border-2 lg:border-none border-border backdrop-blur lg:!backdrop-blur-none px-4 lg:px-0 lg:bg-transparent bottom-4 right-4 lg:inset-0 flex flex-col-reverse items-end justify-end lg:justify-center lg:items-start fixed z-40 isolate font-primary ${className}`}
    >
      <button
        type="button"
        aria-label="Toggle menu"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="lg:hidden my-6 w-fit flex flex-col gap-2 items-end"
      >
        <span className="bg-foreground w-10 h-[2px] block" />
        <span className="bg-foreground w-6 h-[2px] block" />
        <span className="bg-foreground w-4 h-[2px] block" />
      </button>

      <ul className={`${open ? "block" : "hidden"} lg:block pl-4 text-sm`}>
        {title && title.map((title) => {
          const isActive = title.id === activeId;
          return (
            <li
              key={title.id}
              data-active={isActive}
              className="flex flex-row-reverse lg:flex-row py-3 items-center lg:justify-start gap-6 relative
                [&:not(:first-child):not(:last-child)]:after:h-full
                first:after:translate-y-1/2 last:after:-translate-y-1/2
                after:content-[''] after:absolute after:w-px after:h-1/2 after:bg-foreground/30
                before:content-[''] before:inline-block before:w-3 before:h-px before:bg-foreground/30
                text-foreground uppercase group"
            >
              <a
                href={'#' + title.id}
                onClick={() => setActiveId(title.id)}
                className={`before:content-[''] before:absolute before:-bottom-2 before:right-0 lg:before:left-0
                  before:h-[2px] before:w-0 before:bg-foreground before:transition-all before:duration-500
                  relative font-thin transition-all duration-500
                  ${isActive ? "font-bold before:w-1/2" : ""}`}
              >
                {title.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
