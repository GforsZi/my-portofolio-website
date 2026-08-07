import { siteConfig } from "@/content/site";
import type { ProfileModel } from "@/generated/prisma/models";

export function About({ profile }: { profile: ProfileModel }) {
  if (!profile.bio) return null;

  return (
    <section id="tentang" className="scroll-mt-20 flex flex-col gap-2">
      <h2 className="font-heading text-lg font-medium">{siteConfig.sections.about}</h2>
      <p className="text-muted-foreground">{profile.bio}</p>
    </section>
  );
}
