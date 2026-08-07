import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { ProfileModel } from "@/generated/prisma/models";

export function Hero({ profile }: { profile: ProfileModel }) {
  return (
    <header className="flex flex-col gap-6 sm:flex-row sm:items-center">
      <Avatar size="lg" className="size-16">
        {profile.avatarUrl ? <AvatarImage src={profile.avatarUrl} alt={profile.name} /> : null}
        <AvatarFallback>{profile.name.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <h1 className="font-heading text-3xl font-semibold tracking-tight">{profile.name}</h1>
        <p className="text-muted-foreground">{profile.headline}</p>
        {profile.location ? <p className="text-sm text-muted-foreground">{profile.location}</p> : null}
      </div>
    </header>
  );
}
