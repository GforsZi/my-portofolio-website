"use client";

import type { CSSProperties } from "react";
import type { SkillWithCategory } from "@/content/site";
import LogoLoop, { type LogoItem } from "@/components/ui/logo-loop";
import { useRegisterBreadcrumb } from "@/hooks/use-register-breadcrumb";

const UP_CATEGORIES = [
  "skill-category-bahasa",
  "skill-category-framework",
  "skill-category-library",
  "skill-category-database",
];

const DOWN_CATEGORIES = [
  "skill-category-tools",
  "skill-category-os",
  "skill-category-cli",
];

const toLogoItems = (skills: SkillWithCategory[]): LogoItem[] =>
  skills.map((skill) => ({
    src: skill.imgUrl,
    alt: skill.name,
    title: skill.name,
    width: 24,
    height: 24,
  }));

function SkillLogo({ src, alt }: { src: string; alt: string }) {
  const style: CSSProperties = {
    display: "inline-block",
    width: "var(--logoloop-logoHeight)",
    height: "var(--logoloop-logoHeight)",
    backgroundColor: "currentColor",
    WebkitMaskImage: `url(${src})`,
    maskImage: `url(${src})`,
    WebkitMaskSize: "contain",
    maskSize: "contain",
    WebkitMaskRepeat: "no-repeat",
    maskRepeat: "no-repeat",
    WebkitMaskPosition: "center",
    maskPosition: "center",
  };

  return (
    <span
      role="img"
      aria-label={alt}
      title={alt}
      style={style}
      className="pointer-events-none [-webkit-user-drag:none] transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover/item:scale-120"
    />
  );
}

const renderSkillLogo = (item: LogoItem) => {
  const src = (item as { src?: string }).src ?? "";
  const alt = (item as { alt?: string }).alt ?? "";
  return <SkillLogo src={src} alt={alt} />;
};

export function SkillsSection({ skills }: { skills: SkillWithCategory[] }) {
  useRegisterBreadcrumb("skill", "Skill");

  const upLogos = toLogoItems(
    skills.filter((skill) => UP_CATEGORIES.includes(skill.skillCategoryId)),
  );
  const downLogos = toLogoItems(
    skills.filter((skill) => DOWN_CATEGORIES.includes(skill.skillCategoryId)),
  );

  if (upLogos.length === 0 && downLogos.length === 0) return null;

  return (
    <section id="skill">
      <div style={{ height: "75px", position: "relative", overflow: "hidden" }}>
        <LogoLoop
          logos={upLogos}
          speed={100}
          direction="left"
          logoHeight={60}
          gap={30}
          hoverSpeed={70}
          scaleOnHover
          fadeOut
          fadeOutColor="var(--background)"
          renderItem={renderSkillLogo}
          ariaLabel="Programming languages, frameworks, libraries, and databases"
        />
      </div>
      <div style={{ height: "75px", position: "relative", overflow: "hidden" }}>
        <LogoLoop
          logos={downLogos}
          speed={100}
          direction="right"
          logoHeight={60}
          gap={30}
          hoverSpeed={-70}
          scaleOnHover
          fadeOut
          fadeOutColor="var(--background)"
          renderItem={renderSkillLogo}
          ariaLabel="Tools, operating systems, and CLI utilities"
        />
      </div>
    </section>
  );
}
