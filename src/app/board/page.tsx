"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Post {
  id: number;
  title: string;
  content: string;
}

export default function BoardPage() {
  const router = useRouter();

  // 임시 게시글 (하드코딩)
  const posts: Post[] = [
    {
      id: 1,
      title: "첫 번째 게시글",
      content: "게시판에 오신 것을 환영합니다!",
    },
    {
      id: 2,
      title: "두 번째 게시글",
      content: "이 게시판은 Next.js로 만들어졌어요.",
    },
  ];

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-50">
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center">📋 게시판</h1>

        <div className="text-right">
          <Button onClick={() => router.push("/board/add")}>
            + 게시글 작성
          </Button>
        </div>

        <div className="space-y-4">
          <h2 className="text-xl font-semibold">🗂️ 전체 게시글</h2>
          {posts.length === 0 ? (
            <p className="text-muted-foreground">아직 게시글이 없습니다.</p>
          ) : (
            posts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4 space-y-1">
                  <h3 className="font-bold text-lg">{post.title}</h3>
                  <p className="text-sm text-gray-600">{post.content}</p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
