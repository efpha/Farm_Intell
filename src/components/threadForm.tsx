import { useState, useEffect, useRef } from "react";
import { X, Video, Paperclip, Send } from "lucide-react";
import { createThread, fetchCategories } from "../services/threadService";
import { useToast } from "./toast/toast";
import { uploadMedia } from "../lib/storageServices";

type Category = {
  id: number;
  name: string;
};

type MediaAttachment = {
  file: File;
  preview: string;
  type: "image" | "video";
};

type ThreadFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onThreadCreated: () => void;
};

export default function ThreadForm({
  isOpen,
  onClose,
  onThreadCreated,
}: ThreadFormProps) {
  const [threadCategory, setThreadCategory] = useState<number>(1);
  const [threadContent, setThreadContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [, setLoadingCategories] = useState(true);
  const [, setCategoriesError] = useState<string | null>(null);
  const [media, setMedia] = useState<MediaAttachment[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { success, error } = useToast();

  useEffect(() => {
    const fetchCategoriesData = async () => {
      try {
        const data = await fetchCategories();
        setCategories(data);
        if (data.length > 0) setThreadCategory(data[0].id);
      } catch (err: any) {
        setCategoriesError(err.message || "Failed to load categories");
      } finally {
        setLoadingCategories(false);
      }
    };
    fetchCategoriesData();
  }, []);

  const resetForm = () => {
    setThreadContent("");
    setThreadCategory(categories[0]?.id ?? 1);
    media.forEach((m) => URL.revokeObjectURL(m.preview));
    setMedia([]);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleMediaSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const newMedia: MediaAttachment[] = files
      .filter((f) => f.type.startsWith("image/") || f.type.startsWith("video/"))
      .slice(0, 4 - media.length)
      .map((f) => ({
        file: f,
        preview: URL.createObjectURL(f),
        type: f.type.startsWith("image/") ? "image" : "video",
      }));
    setMedia((prev) => [...prev, ...newMedia]);
    // reset input so same file can be re-selected
    e.target.value = "";
  };

  const removeMedia = (index: number) => {
    setMedia((prev) => {
      URL.revokeObjectURL(prev[index].preview);
      return prev.filter((_, i) => i !== index);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!threadContent.trim()) return;

    setIsSubmitting(true);

    try {
      let mediaUrls: string[] = [];

      if (media.length > 0) {
        mediaUrls = await Promise.all(
          media.map((m) => uploadMedia(m.file))
        );
      }

      await createThread(
        "", 
        threadContent, 
        threadCategory,
        mediaUrls
      );

      resetForm();
      onThreadCreated();
      onClose();

      success("Discussion posted!", "Your thread is now live.");
    } catch (err: any) {
      error("Failed to post", err.message ?? "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] grid place-items-center bg-black/40 p-4">
      <div
        className="w-full max-w-2xl rounded-2xl bg-white overflow-hidden"
        style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.14)" }}
      >
        {/* ── Header bar ── */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <span className="text-base font-semibold text-slate-800 tracking-tight">
            New Post
          </span>

          {/* Category dropdown — top right */}
          <div className="flex items-center gap-3">
            <select
              value={threadCategory}
              onChange={(e) => setThreadCategory(Number(e.target.value))}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-medium text-slate-700 outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 cursor-pointer"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>

            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="rounded-lg p-1.5 hover:bg-slate-100 disabled:opacity-50 transition-colors"
            >
              <X className="h-4 w-4 text-slate-500" />
            </button>
          </div>
        </div>

        {/* ── Form body ── */}
        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Main textarea — no shadow, clean border */}
          <textarea
            value={threadContent}
            onChange={(e) => setThreadContent(e.target.value)}
            placeholder="What's on your mind? Share a question or knowledge with the community…"
            required
            rows={8}
            className="w-full resize-none border-0 border-b border-slate-100 px-5 py-4 text-sm text-slate-800 placeholder:text-slate-400 outline-none focus:ring-0"
            style={{ minHeight: 180 }}
          />

          {/* ── Media previews ── */}
          {media.length > 0 && (
            <div className="flex flex-wrap gap-2 px-5 pt-3">
              {media.map((m, i) => (
                <div key={i} className="relative rounded-lg overflow-hidden border border-slate-200 w-20 h-20 flex-shrink-0">
                  {m.type === "image" ? (
                    <img
                      src={m.preview}
                      alt=""
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <video
                      src={m.preview}
                      className="w-full h-full object-cover"
                      muted
                    />
                  )}
                  <button
                    type="button"
                    onClick={() => removeMedia(i)}
                    className="absolute top-0.5 right-0.5 rounded-full bg-black/60 p-0.5 hover:bg-black/80 transition-colors"
                  >
                    <X className="h-3 w-3 text-white" />
                  </button>
                  {m.type === "video" && (
                    <div className="absolute bottom-0.5 left-0.5 rounded bg-black/60 px-1 py-0.5">
                      <Video className="h-2.5 w-2.5 text-white" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* ── Bottom action bar ── */}
          <div className="flex items-center justify-between px-4 py-3 gap-3">
            {/* Left: media attach */}
            <div className="flex items-center gap-1">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*,video/*"
                multiple
                className="hidden"
                onChange={handleMediaSelect}
                disabled={media.length >= 4}
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                disabled={media.length >= 4 || isSubmitting}
                title="Attach image or video (max 4)"
                className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium text-slate-500 hover:bg-slate-100 hover:text-slate-700 disabled:opacity-40 transition-colors"
              >
                <Paperclip className="h-4 w-4" />
                <span>
                  {media.length > 0
                    ? `${media.length}/4 attached`
                    : "Attach media"}
                </span>
              </button>
            </div>

            {/* Right: post button */}
            <button
              type="submit"
              disabled={isSubmitting || !threadContent.trim()}
              className="flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <Send className="h-4 w-4" />
              {isSubmitting ? "Posting…" : "Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}