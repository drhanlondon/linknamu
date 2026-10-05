import LinkList from "@/components/LinkList";
import Profile from "@/components/Profile";
import ThemeToggle from "@/components/ThemeToggle";
import { profile } from "@/data/profile";

export default function Home() {
  return (
    <main className="mx-auto flex min-h-screen w-full max-w-md flex-col px-4 py-6">
      <div className="flex justify-end">
        <ThemeToggle />
      </div>
      <div className="mt-4">
        <Profile name={profile.name} bio={profile.bio} image={profile.image} />
      </div>
      <div className="mt-8">
        <LinkList links={profile.links} />
      </div>
    </main>
  );
}
