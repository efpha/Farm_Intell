import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { createThread, fetchCategories } from "../services/threadService";
import { useToast } from "./toast/toast"

type Category = {
  id: number;
  name: string;
};

type ThreadFormProps = {
  isOpen: boolean;
  onClose: () => void;
  onThreadCreated: () => void;
};

export default function ThreadForm({ isOpen, onClose, onThreadCreated }: ThreadFormProps) {
  const [threadCategory, setThreadCategory] = useState<number>(1);
  const [threadTitle, setThreadTitle] = useState("");
  const [threadContent, setThreadContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { success, error } = useToast(); 
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [categoriesError, setCategoriesError] = useState<string | null>(null);

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

  const resetForm = () => {
    setThreadTitle("");
    setThreadContent("");
    setThreadCategory(1);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await createThread(threadTitle, threadContent, threadCategory);
      resetForm();
      onThreadCreated();
      onClose();
      success("Discussion posted!", "Your thread is now live for the community."); 
    } catch (err: any) {
      error("Failed to post", err.message ?? "Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[999] grid place-items-center bg-black/50 p-4">
      <div className="w-full max-w-xl rounded-2xl bg-white p-6 shadow-xl">
        {/* Modal Header */}
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="text-xl font-semibold">Start a Conversation</h2>
          <button
            type="button"
            onClick={handleClose}
            disabled={isSubmitting}
            className="rounded-xl p-2 hover:bg-slate-100 disabled:opacity-50"
          >
            <X className="h-5 w-5 text-slate-600" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col">
          {/* Category */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Discussion Category
            </label>
            <select
              value={threadCategory}
              onChange={(e) => setThreadCategory(Number(e.target.value))}
              className="w-full rounded-xl border px-4 py-2 text-sm outline-none focus:border-emerald-500"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          {/* Title */}
          <div className="mb-4">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Topic Title
            </label>
            <input
              type="text"
              value={threadTitle}
              onChange={(e) => setThreadTitle(e.target.value)}
              placeholder="e.g. Best organic fertilizer for Wheat?"
              required
              className="w-full rounded-xl border px-4 py-2 text-sm outline-none focus:border-emerald-500"
            />
          </div>

          {/* Content */}
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-slate-700">
              Content Details
            </label>
            <textarea
              value={threadContent}
              onChange={(e) => setThreadContent(e.target.value)}
              placeholder="Describe your question or share your knowledge here..."
              required
              className="min-h-[150px] w-full resize-y rounded-xl border px-4 py-2 text-sm outline-none focus:border-emerald-500"
            />
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="rounded-xl border px-4 py-2 text-sm hover:bg-slate-50 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-xl bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 disabled:opacity-50"
            >
              {isSubmitting ? "Posting..." : "Post Discussion"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}