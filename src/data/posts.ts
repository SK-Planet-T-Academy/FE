// src/data/posts.ts
export interface Post {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  views: number;
  likes: number;
}

export const posts: Post[] = [
  {
    id: 1,
    title: "첫 번째 게시글",
    content: "게시판에 오신 것을 환영합니다!",
    date: "2025-03-25",
    author: "강준호",
    views: 120,
    likes: 15,
  },
  {
    id: 2,
    title: "두 번째 게시글",
    content: "이 게시판은 Next.js로 만들어졌어요.",
    date: "2025-03-26",
    author: "박소연",
    views: 85,
    likes: 8,
  },
  {
    id: 3,
    title: "오늘의 게시글",
    content: "오늘 등록된 게시글입니다.",
    date: "2025-03-27",
    author: "신강희",
    views: 22,
    likes: 4,
  },
];

export interface Comment {
  id: number;
  postId: number;
  author: string;
  content: string;
  createdAt: string;
}

export const comments: Comment[] = [
  {
    id: 1,
    postId: 1,
    author: "조영호",
    content: "정말 유익한 글이네요!",
    createdAt: "2025-03-27",
  },
  {
    id: 2,
    postId: 1,
    author: "신강희",
    content: "좋은 정보 감사합니다.",
    createdAt: "2025-03-27",
  },
  {
    id: 3,
    postId: 2,
    author: "강준호",
    content: "정말 유익한 글이네요!?",
    createdAt: "2025-03-27",
  },
  {
    id: 4,
    postId: 2,
    author: "신강희",
    content: "좋은 정보 감사합니다~",
    createdAt: "2025-03-27",
  },
  {
    id: 5,
    postId: 3,
    author: "박소연",
    content: "좋은 정보 감사합니다~",
    createdAt: "2025-03-27",
  },
];
