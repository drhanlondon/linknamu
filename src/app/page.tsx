    import LinkCard from "@/components/LinkCard";
import Profile from "@/components/Profile";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/data/profile";
import { getClickCounts } from "@/lib/clicks";

export const dynamic = "force-dynamic";

export default async function Home() {
  const counts = await getClickCounts();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 py-6">
      <div className="flex justify-end">
        <ThemeToggle />
      </div>
      <div className="mt-4">
        <Profile name={profile.name} bio={profile.bio} image={profile.image} />
      </div>
      <nav className="mt-8 flex flex-col gap-4">
        {profile.links.map((link) => (
          <LinkCard key={link.id} {...link} initialCount={counts[link.id] ?? 0} />
        ))}
      </nav>
    </main>
  );
}
