interface Post {
  title: string;
  body: string;
  id: number;
  userId?: number;
}

type Posts = Post[];

export type { Post, Posts };
