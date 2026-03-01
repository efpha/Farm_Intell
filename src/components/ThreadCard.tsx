import { MessageCircle } from "lucide-react";
import { Thread } from "../types/discussionTypes";
import { CATEGORY_COLOURS } from "../constants/categoryColours";
import { timeAgo, displayName } from "../lib/discussionUtils";

type ThreadCardProps = {
  thread: Thread;
};

export default function ThreadCard({ thread }: ThreadCardProps) {
  const categoryName = thread.categories?.name ?? "General";
  const badgeClass =
    CATEGORY_COLOURS[categoryName] ?? "bg-slate-100 text-slate-600 border-slate-200";
  const author = thread.users?.email ? displayName(thread.users.email) : "Unknown";

  return (
    <div className="rounded-2xl border bg-white p-5 shadow-sm transition-shadow hover:shadow-md cursor-pointer">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h4 className="text-base font-semibold leading-snug">{thread.title}</h4>
          <p className="mt-1 line-clamp-2 text-sm text-slate-600">{thread.content}</p>
        </div>
        <span className={`flex-shrink-0 rounded-full border px-3 py-1 text-xs font-medium ${badgeClass}`}>
          {categoryName}
        </span>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span>
          Posted by <span className="font-medium text-slate-700">{author}</span>
        </span>
        <span className="flex items-center gap-1.5">
          {timeAgo(thread.created_at)}
          {thread.reply_count !== undefined && (
            <>
              <span>•</span>
              <MessageCircle className="h-3.5 w-3.5" />
              {thread.reply_count} {thread.reply_count === 1 ? "reply" : "replies"}
            </>
          )}
        </span>
      </div>
    </div>
  );
}