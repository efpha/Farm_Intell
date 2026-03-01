// discussions.tsx
import { MessageCircle, Loader2 } from "lucide-react";
import { useDiscussions } from "../hooks/useDiscussions";
import ThreadCard from "../components/ThreadCard";
import { Thread } from "../types/discussionTypes";

type Props = {
  search: string;
  activeCategory: number | null;
};

export default function CommunityDiscussions({ search, activeCategory }: Props) {
  const { threads, categories, loadingThreads } = useDiscussions();

  const filtered = threads.filter((t: Thread) => {
    const matchesSearch =
      search.trim() === "" ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.content.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === null ||
      t.categories?.name === categories.find((c) => c.id === activeCategory)?.name;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4 lg:col-span-6">
      <div className="mx-auto max-w-3xl px-4 py-6 space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Community Discussions</h2>
          {!loadingThreads && (
            <span className="text-sm text-slate-500">
              {filtered.length} post{filtered.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        {loadingThreads && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border bg-white py-16 shadow-sm">
            <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
            <p className="text-sm text-slate-500">Loading discussions...</p>
          </div>
        )}

        {!loadingThreads && filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border bg-white py-16 shadow-sm">
            <MessageCircle className="h-8 w-8 text-slate-300" />
            <p className="text-sm font-medium text-slate-500">No discussions found</p>
            <p className="text-xs text-slate-400">Try a different search or category</p>
          </div>
        )}

        {!loadingThreads && filtered.map((thread) => (
          <ThreadCard key={thread.id} thread={thread} />
        ))}
      </div>
    </div>
  );
}