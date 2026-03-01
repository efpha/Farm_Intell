import { useState, useEffect } from "react";
import { fetchCategories, fetchThreads } from "../services/threadService";
import { useToast } from "../components/toast/toast";
import { Thread, Category } from "../types/discussionTypes";

export function useDiscussions() {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loadingThreads, setLoadingThreads] = useState(true);

  const { error } = useToast();

  useEffect(() => {
    fetchCategories()
      .then(setCategories)
      .catch((err: any) => error("Failed to load categories", err.message));
  }, []);

  useEffect(() => {
    setLoadingThreads(true);
    fetchThreads()
      .then(setThreads)
      .catch((err: any) => error("Failed to load threads", err.message))
      .finally(() => setLoadingThreads(false));
  }, []);

  return { threads, categories, loadingThreads };
}