"use client";

import type { SkillWithCategory } from "@/content/site";
import LogoLoop, { type LogoItem } from "@/components/ui/logo-loop";
import { getSkillIcon } from "@/components/ui/skill-icons";

const upLogos = ["Livewire", "React", "Vue.js"];
const downLogos = ["Livewire", "React", "Vue.js"];

const toLogoItems = (names: string[]): LogoItem[] =>
  names
    .map((name) => getSkillIcon(name))
    .filter((renderIcon): renderIcon is NonNullable<typeof renderIcon> => Boolean(renderIcon))
    .map((renderIcon) => ({
      node: renderIcon({
        className: "h-[var(--logoloop-logoHeight)] w-auto",
      }),
    }));

export function SkillsSection({ skills }: { skills: SkillWithCategory[] }) {
  if (skills.length === 0) return null;

  const logos = toLogoItems(skills.map((skill) => skill.name));

  return (
    <section id="keahlian">
      <div style={{ height: "75px", position: "relative", overflow: "hidden" }}>
        <LogoLoop
          logos={logos.length > 0 ? logos : toLogoItems(upLogos)}
          speed={100}
          direction="left"
          logoHeight={60}
          gap={30}
          hoverSpeed={70}
          scaleOnHover
          fadeOut
          fadeOutColor="var(--background)"
          ariaLabel="Technology partners"
        />
      </div>
      <div style={{ height: "75px", position: "relative", overflow: "hidden" }}>
        <LogoLoop
          logos={logos.length > 0 ? logos : toLogoItems(downLogos)}
          speed={100}
          direction="right"
          logoHeight={60}
          gap={30}
          hoverSpeed={-70}
          scaleOnHover
          fadeOut
          fadeOutColor="var(--background)"
          ariaLabel="Technology partners"
        />
      </div>

    </section>
  );
}
