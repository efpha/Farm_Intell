import { useRef, useState, useEffect } from "react";
import {
  Search,
  Plus,
  Compass,
  Trophy,
  Bot,
  Flame,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import ThreadForm from "../components/threadForm";
import { fetchCategories } from "../services/threadService";

type Category = {
  id: number;
  name: string;
};

export default function CommunityForumPage() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);
  const filterScrollRef = useRef<HTMLDivElement>(null);   // Ref for the scrollable filter row

  //Set categories from supabase to state
  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (err: any) {
        setCategoriesError(err.message || "Failed to load categories");
      } finally {
        setLoadingCategories(false);
      }
    };

    fetchCategoriesData();
  }, []);

  const scrollFilters = (direction: "left" | "right") => {
    if (!filterScrollRef.current) return;
    filterScrollRef.current.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-50">
        <div className="mx-auto max-w-7xl px-4 py-3">
          {/* Scrollable filter buttons */}
          <div className="flex items-center gap-2">

            {/* Left arrow — desktop only */}
            <button
              type="button"
              onClick={() => scrollFilters("left")}
              aria-label="Scroll filters left"
              className="hidden lg:flex flex-shrink-0 items-center justify-center rounded-full border p-1.5 shadow-sm hover:bg-slate-50 cursor-pointer"
            >
              <ChevronLeft className="h-4 w-4 text-slate-600" />
            </button>

            {/* Scrollable row with fade edges */}
            <div className="relative min-w-0 flex-1">
              <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8" />
              <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8" />

              <div
                ref={filterScrollRef}
                className="flex items-center gap-3 overflow-x-auto px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              >
                {categories.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    className="flex-shrink-0 rounded-xl bg-emerald-600 px-3 py-2 text-sm text-white transition-colors hover:bg-emerald-700"
                  >
                    {cat.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Right arrow — desktop only */}
            <button
              type="button"
              onClick={() => scrollFilters("right")}
              aria-label="Scroll filters right"
              className="hidden lg:flex flex-shrink-0 items-center justify-center rounded-full border bg-white p-1.5 shadow-sm hover:bg-slate-50 cursor-pointer"
            >
              <ChevronRight className="h-4 w-4 text-slate-600" />
            </button>

          </div>
        </div>
      </nav>

      {/* Layout */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-12">
        {/* Left Sidebar */}
        <aside className="space-y-6 lg:col-span-3">
          {/* Reputation */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-base font-semibold">
              <Trophy className="h-5 w-5 text-amber-600" />
              My Reputation
            </h3>

            <div className="flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-slate-900">--</div>
                <div className="text-xs text-slate-500">Total Points</div>
              </div>

              <div className="text-right">
                <div className="text-sm font-medium text-slate-700">
                  Loading...
                </div>
                <div className="mt-1 inline-flex rounded-full bg-slate-200 px-3 py-1 text-xs text-slate-700">
                  Badge Status
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-base font-semibold">
              <Compass className="h-5 w-5 text-blue-600" />
              Navigation
            </h3>

            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="rounded-xl border px-4 py-2 text-sm hover:bg-slate-50"
              >
                My Discussions
              </a>

              <a
                href="#"
                className="rounded-xl border px-4 py-2 text-sm hover:bg-slate-50"
              >
                My Replies
              </a>

              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700"
              >
                <Plus className="h-4 w-4" />
                Create post
              </button>
            </div>
          </div>
        </aside>

        {/* Main Feed */}
        <main className="space-y-4 lg:col-span-6">
          {/* Feed Header */}
          <div className="flex flex-col gap-3 rounded-2xl border bg-white p-5 shadow-sm sm:flex-row sm:items-center sm:justify-between">
            <div className="flex w-full items-center gap-2 rounded-xl border bg-white px-3 py-2">
              <Search className="h-4 w-4 text-slate-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                placeholder="Search for experts, topics, or solutions..."
              />
            </div>
          </div>

          {/* Threads Feed */}
          <div className="space-y-4">
            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-base font-semibold">
                    Best organic fertilizer for Wheat?
                  </h4>
                  <p className="mt-1 text-sm text-slate-600">
                    Share your experience with organic fertilizers, compost, or
                    manure-based solutions for wheat farming.
                  </p>
                </div>
                <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                  Soil Health
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>Posted by Farmer_Kenya</span>
                <span>2 hours ago • 14 replies</span>
              </div>
            </div>

            <div className="rounded-2xl border bg-white p-5 shadow-sm">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h4 className="text-base font-semibold">
                    How do you control Fall Armyworm effectively?
                  </h4>
                  <p className="mt-1 text-sm text-slate-600">
                    Looking for the best practical methods used in maize farms.
                  </p>
                </div>
                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700">
                  Crop Protection
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                <span>Posted by AgriExpert</span>
                <span>1 day ago • 42 replies</span>
              </div>
            </div>
          </div>
        </main>

        {/* Right Widgets */}
        <aside className="space-y-6 lg:col-span-3">
          {/* AI Insights */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="mb-3 flex items-center gap-2 text-base font-semibold">
              <Bot className="h-5 w-5 text-indigo-600" />
              AgriAI Insights
            </h3>

            <p className="text-sm text-slate-600">
              AI is currently monitoring the forum for spam and helpful
              opportunities.
            </p>

            <div className="mt-4 flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                Active
              </span>
              <span className="text-xs text-slate-500">Moderating Content</span>
            </div>
          </div>

          {/* Trending */}
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="mb-3 flex items-center gap-2 text-base font-semibold">
              <Flame className="h-5 w-5 text-rose-600" />
              Trending Topics
            </h3>

            <div className="text-sm text-slate-600">
              Real-time trends appearing soon...
            </div>
          </div>
        </aside>
      </div>

      {/* Thread Form Modal */}
      <ThreadForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onThreadCreated={() => console.log("Thread created successfully")}
      />
    </div>
  );
}