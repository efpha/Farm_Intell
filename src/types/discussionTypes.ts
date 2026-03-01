export type Thread = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  reply_count?: number;
  categories: { name: string } | null;
  users: { email: string } | null;
};

export type Category = {
  id: number;
  name: string;
};