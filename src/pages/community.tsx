import { useRef, useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Search,
  Plus,
  Compass,
  Trophy,
  Bot,
  Flame,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  Loader2,
  X,
  LogIn,
  UserPlus,
} from "lucide-react";
import ThreadForm from "../components/threadForm";
import { fetchCategories, fetchThreads } from "../services/threadService";
import { isUserLoggedIn } from "../lib/authServices";
import { useToast } from "../components/toast/toast";

type Category = {
  id: number;
  name: string;
};

type Thread = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  reply_count?: number;
  categories: { name: string } | null;
  users: { email: string } | null;
};


function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60_000);

  if (mins < 1) return "just now";
  if (mins < 60) return `${mins} minute${mins !== 1 ? "s" : ""} ago`;

  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs} hour${hrs !== 1 ? "s" : ""} ago`;

  const days = Math.floor(hrs / 24);
  return `${days} day${days !== 1 ? "s" : ""} ago`;
}

function displayName(email: string): string {
  return email.split("@")[0];
}

const CATEGORY_COLOURS: Record<string, string> = {
  "General Farming": "bg-green-50 text-green-700 border-green-100",
  "Crop Protection": "bg-amber-50 text-amber-700 border-amber-100",
  "Soil Health": "bg-emerald-50 text-emerald-700 border-emerald-100",
  "Equipment Advice": "bg-blue-50 text-blue-700 border-blue-100",
  "Agri AI": "bg-violet-50 text-violet-700 border-violet-100",
  "Agriculture Product Prices": "bg-orange-50 text-orange-700 border-orange-100",
};

function AuthPromptModal({
  isOpen,
  onClose,
  onLogin,
  onRegister,
}: {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onRegister: () => void;
}) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: "rgba(15, 23, 42, 0.6)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl bg-white p-8 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: "modalPop 0.22s cubic-bezier(0.34, 1.56, 0.64, 1)",
        }}
      >
        {/* Close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
        >
          <X className="h-4 w-4" />
        </button>

        {/* Icon */}
        <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50">
          <MessageCircle className="h-7 w-7 text-emerald-600" />
        </div>

        {/* Copy */}
        <h2 className="text-center text-xl font-bold text-slate-900">
          Join the conversation
        </h2>
        <p className="mt-2 text-center text-sm text-slate-500 leading-relaxed">
          You need an account to create posts and share your farming knowledge
          with the community.
        </p>

        {/* Actions */}
        <div className="mt-7 flex flex-col gap-3">
          <button
            onClick={onLogin}
            className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-emerald-700 active:scale-95"
          >
            <LogIn className="h-4 w-4" />
            Sign in to your account
          </button>
          <button
            onClick={onRegister}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 active:scale-95"
          >
            <UserPlus className="h-4 w-4" />
            Create a free account
          </button>
        </div>

        <p className="mt-5 text-center text-xs text-slate-400">
          Just browsing?{" "}
          <button
            onClick={onClose}
            className="font-medium text-emerald-600 hover:underline"
          >
            Continue reading
          </button>
        </p>
      </div>

      <style>{`
        @keyframes modalPop {
          from { opacity: 0; transform: scale(0.92) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default function CommunityForumPage() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAuthPromptOpen, setIsAuthPromptOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  const [threads, setThreads] = useState<Thread[]>([]);
  const [loadingThreads, setLoadingThreads] = useState(true);
  const filterScrollRef = useRef<HTMLDivElement>(null);

  const { error } = useToast();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((err) => error("Failed to load categories", err.message));
  }, []);

  const loadThreads = async () => {
    setLoadingThreads(true);
    try {
      const data = await fetchThreads();
      setThreads(data);
    } catch (err: any) {
      error("Failed to load threads", err.message);
    } finally {
      setLoadingThreads(false);
    }
  };

  useEffect(() => {
    loadThreads();
  }, []);

  const handleCreatePost = async () => {
    const loggedIn = await isUserLoggedIn();
    if (!loggedIn) {
      setIsAuthPromptOpen(true);
      return;
    }
    setIsModalOpen(true);
  };

  const filtered = threads.filter((t) => {
    const matchesSearch =
      search.trim() === "" ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.content.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      activeCategory === null ||
      t.categories?.name === categories.find((c) => c.id === activeCategory)?.name;
    return matchesSearch && matchesCategory;
  });

  const scrollFilters = (direction: "left" | "right") => {
    filterScrollRef.current?.scrollBy({
      left: direction === "left" ? -200 : 200,
      behavior: "smooth",
    });
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">

      {/* ── Auth Prompt Modal ── */}
      <AuthPromptModal
        isOpen={isAuthPromptOpen}
        onClose={() => setIsAuthPromptOpen(false)}
        onLogin={() => {
          setIsAuthPromptOpen(false);
          navigate("/login", { state: { from: location.pathname } });
        }}
        onRegister={() => {
          setIsAuthPromptOpen(false);
          navigate("/register", { state: { from: location.pathname } });
        }}
      />

      {/* ── Filter + Search Bar ── */}
      <div className="flex flex-col mt-4 gap-3 px-4 lg:flex-row lg:items-center lg:px-6">

        {/* Filters row */}
        <div className="order-2 flex items-center gap-3 min-w-0 flex-1 lg:order-none">
          <button
            type="button"
            onClick={() => scrollFilters("left")}
            aria-label="Scroll filters left"
            className="hidden lg:flex flex-shrink-0 items-center justify-center rounded-full border bg-white p-1.5 shadow-sm hover:bg-slate-50 cursor-pointer"
          >
            <ChevronLeft className="h-4 w-4 text-slate-600" />
          </button>

          <div className="relative min-w-0 flex-1">
            <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-8 bg-gradient-to-r from-slate-50 to-transparent" />
            <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-8 bg-gradient-to-l from-slate-50 to-transparent" />
            <div
              ref={filterScrollRef}
              className="flex items-center gap-3 overflow-x-auto px-1 lg:px-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              <button
                type="button"
                onClick={() => setActiveCategory(null)}
                className={`flex-shrink-0 rounded-xl px-3 py-2 text-xs lg:text-sm font-medium transition-colors ${
                  activeCategory === null
                    ? "bg-emerald-600 text-white"
                    : "bg-white border text-slate-600 hover:bg-slate-50"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(activeCategory === cat.id ? null : cat.id)}
                  className={`flex-shrink-0 rounded-xl px-3 py-2 text-xs lg:text-sm font-medium transition-colors ${
                    activeCategory === cat.id
                      ? "bg-emerald-600 text-white"
                      : "bg-white border text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => scrollFilters("right")}
            aria-label="Scroll filters right"
            className="hidden lg:flex flex-shrink-0 items-center justify-center rounded-full border bg-white p-1.5 shadow-sm hover:bg-slate-50 cursor-pointer"
          >
            <ChevronRight className="h-4 w-4 text-slate-600" />
          </button>
        </div>

        {/* Search bar */}
        <div className="order-1 w-full lg:order-none lg:w-72 xl:w-80 flex-shrink-0">
          <div className="flex items-center gap-2 rounded-xl border bg-white px-3 py-2 shadow-sm">
            <Search className="h-4 w-4 flex-shrink-0 text-slate-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
              placeholder="Search topics or solutions..."
            />
          </div>
        </div>
      </div>

      {/* ── Layout ── */}
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 lg:grid-cols-12">

        {/* Left Sidebar */}
        <aside className="space-y-6 lg:col-span-3">
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
                <div className="text-sm font-medium text-slate-700">Loading...</div>
                <div className="mt-1 inline-flex rounded-full bg-slate-200 px-3 py-1 text-xs text-slate-700">
                  Badge Status
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="mb-4 flex items-center gap-2 text-base font-semibold">
              <Compass className="h-5 w-5 text-blue-600" />
              Navigation
            </h3>
            <div className="flex flex-col gap-3">
              <a
                href="#"
                className="rounded-xl border px-4 py-2 text-sm hover:bg-slate-50 transition-colors"
              >
                My Discussions
              </a>
              <a
                href="#"
                className="rounded-xl border px-4 py-2 text-sm hover:bg-slate-50 transition-colors"
              >
                My Replies
              </a>

              {/* ── Auth-gated Create Post button ── */}
              <button
                type="button"
                onClick={handleCreatePost}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors active:scale-95"
              >
                <Plus className="h-4 w-4" />
                Create post
              </button>
            </div>
          </div>
        </aside>

        {/* ── Main Feed ── */}
        <main className="space-y-4 lg:col-span-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-slate-900">Community Discussions</h2>
            {!loadingThreads && (
              <span className="text-sm text-slate-500">
                {filtered.length} post{filtered.length !== 1 ? "s" : ""}
              </span>
            )}
          </div>

          {/* Loading */}
          {loadingThreads && (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border bg-white py-16 shadow-sm">
              <Loader2 className="h-6 w-6 animate-spin text-emerald-600" />
              <p className="text-sm text-slate-500">Loading discussions...</p>
            </div>
          )}

          {/* Empty state */}
          {!loadingThreads && filtered.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-3 rounded-2xl border bg-white py-16 shadow-sm">
              <MessageCircle className="h-8 w-8 text-slate-300" />
              <p className="text-sm font-medium text-slate-500">No discussions found</p>
              <p className="text-xs text-slate-400">Try a different search or category</p>
            </div>
          )}

          {/* Thread cards — viewable by everyone */}
          {!loadingThreads &&
            filtered.map((thread) => {
              const categoryName = thread.categories?.name ?? "General";
              const badgeClass =
                CATEGORY_COLOURS[categoryName] ?? "bg-slate-100 text-slate-600 border-slate-200";
              const author = thread.users?.email
                ? displayName(thread.users.email)
                : "Unknown";

              return (
                <div
                  key={thread.id}
                  className="rounded-2xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md cursor-pointer"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <h4 className="text-base font-semibold leading-snug">{thread.title}</h4>
                      <p className="mt-1 line-clamp-2 text-sm text-slate-600">{thread.content}</p>
                    </div>
                    <span
                      className={`flex-shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${badgeClass}`}
                    >
                      {categoryName}
                    </span>
                  </div>

                  <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
                    <span>
                      Posted by{" "}
                      <span className="font-medium text-slate-700">{author}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      {timeAgo(thread.created_at)}
                      {thread.reply_count !== undefined && (
                        <>
                          <span>•</span>
                          <MessageCircle className="h-3.5 w-3.5" />
                          {thread.reply_count}{" "}
                          {thread.reply_count === 1 ? "reply" : "replies"}
                        </>
                      )}
                    </span>
                  </div>
                </div>
              );
            })}
        </main>

        {/* Right Widgets */}
        <aside className="space-y-6 lg:col-span-3">
          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="mb-3 flex items-center gap-2 text-base font-semibold">
              <Bot className="h-5 w-5 text-indigo-600" />
              AgriAI Insights
            </h3>
            <p className="text-sm text-slate-600">
              AI is currently monitoring the forum for spam and helpful opportunities.
            </p>
            <div className="mt-4 flex items-center justify-between rounded-2xl bg-slate-50 p-4">
              <span className="rounded-full bg-emerald-600 px-3 py-1 text-xs font-semibold text-white">
                Active
              </span>
              <span className="text-xs text-slate-500">Moderating Content</span>
            </div>
          </div>

          <div className="rounded-2xl border bg-white p-5 shadow-sm">
            <h3 className="mb-3 flex items-center gap-2 text-base font-semibold">
              <Flame className="h-5 w-5 text-rose-600" />
              Trending Topics
            </h3>
            <div className="text-sm text-slate-600">Real-time trends appearing soon...</div>
          </div>
        </aside>
      </div>

      {/* Thread Form Modal — only reachable when authenticated */}
      <ThreadForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onThreadCreated={loadThreads}
      />
    </div>
  );
}