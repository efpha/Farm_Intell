export type Thread = {
  id: number;
  title: string;
  content: string;
  created_at: string;
  reply_count?: number;
  Categories: { name: string } | null; //in the DB category_id is a foreign key to the Categories table, so we can fetch the category name using a join
  profiles?: { username: string } | null;
};

export type Category = {
  id: number;
  name: string;
};