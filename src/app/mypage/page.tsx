"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { format } from "date-fns";
import { logoutUser } from "@/api/auth/logout"; // 🔸 로그아웃 API 임포트
import { useRouter } from "next/navigation";
import { getUserById } from "@/api/user/getUser";

interface Post {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  views: number;
  likes: number;
}

interface Comment {
  id: number;
  postId: number;
  author: string;
  content: string;
  createdAt: string;
}

export default function MyPage() {
  const router = useRouter();

  const [userPosts, setUserPosts] = useState<Post[]>([]);
  const [likedPosts, setLikedPosts] = useState<Post[]>([]);
  const [comments, setComments] = useState<Comment[]>([]);
  const [activeSection, setActiveSection] = useState<
    "edit" | "posts" | "likes" | "comments"
  >("edit");

  const [userInfo, setUserInfo] = useState<{
    email: string;
    name: string;
  } | null>(null);

  useEffect(() => {
    const allPosts: Post[] = [
      {
        id: 1,
        title: "첫 번째 게시글",
        content: "게시판에 오신 것을 환영합니다!",
        date: "2025-03-26",
        author: "user123",
        views: 120,
        likes: 15,
      },
      {
        id: 2,
        title: "두 번째 게시글",
        content: "이 게시판은 Next.js로 만들어졌어요.",
        date: "2024-03-27",
        author: "kim",
        views: 85,
        likes: 8,
      },
    ];

    const allComments: Comment[] = [
      {
        id: 1,
        postId: 1,
        author: "user123",
        content: "좋은 글이네요!",
        createdAt: "2025-03-27",
      },
    ];

    setUserPosts(allPosts.filter((p) => p.author === "user123"));
    setLikedPosts(allPosts.filter((p) => [1].includes(p.id)));
    setComments(allComments.filter((c) => c.author === "user123"));

    const userId = localStorage.getItem("id");
    if (userId) {
      getUserById(userId)
        .then((data) => setUserInfo({ email: data.email, name: data.name }))
        .catch((err) => console.error("유저 정보 조회 실패:", err));
    }
  }, []);

  const handleLogout = async () => {
    const userId = localStorage.getItem("id");

    if (!userId) {
      alert("로그인 상태가 아닙니다.");
      return;
    }
    try {
      const response = await logoutUser(Number(userId));

      if (response.isLogin === false) {
        localStorage.removeItem("id");
        localStorage.removeItem("isLogin");

        alert("로그아웃 되었습니다.");
        router.push("/login");
      } else {
        alert("로그아웃 상태를 확인할 수 없습니다.");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        alert(err.message);
      } else {
        alert("로그아웃 중 오류가 발생했습니다.");
      }
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-10 px-4 space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">👤 마이페이지</h1>
        <Button variant="destructive" size="sm" onClick={handleLogout}>
          로그아웃
        </Button>
      </div>

      <div className="flex flex-wrap gap-2">
        <Button
          variant={activeSection === "edit" ? "default" : "outline"}
          onClick={() => setActiveSection("edit")}
        >
          유저 정보 수정
        </Button>
        <Button
          variant={activeSection === "posts" ? "default" : "outline"}
          onClick={() => setActiveSection("posts")}
        >
          작성한 게시글
        </Button>
        <Button
          variant={activeSection === "likes" ? "default" : "outline"}
          onClick={() => setActiveSection("likes")}
        >
          좋아요한 게시글
        </Button>
        <Button
          variant={activeSection === "comments" ? "default" : "outline"}
          onClick={() => setActiveSection("comments")}
        >
          작성한 댓글
        </Button>
      </div>

      {activeSection === "edit" && (
        <section>
          <h2 className="text-xl font-semibold mb-4">✏️ 유저 정보 수정</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              alert("정보가 저장되었습니다.");
            }}
            className="space-y-4"
          >
            <div>
              <label className="block text-sm font-medium mb-1">이메일</label>
              <input
                type="email"
                defaultValue={userInfo?.email}
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">이름</label>
              <input
                type="text"
                defaultValue={userInfo?.name}
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">비밀번호</label>
              <input
                type="password"
                placeholder="새 비밀번호 입력"
                className="w-full border rounded-md px-3 py-2 text-sm"
              />
            </div>
            <div className="flex justify-end">
              <Button type="submit">저장</Button>
            </div>
          </form>
        </section>
      )}

      {activeSection === "posts" && (
        <section>
          <h2 className="text-xl font-semibold mb-2">✍️ 내가 작성한 게시글</h2>
          {userPosts.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              작성한 게시글이 없습니다.
            </p>
          ) : (
            userPosts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4 space-y-1">
                  <p className="font-medium">{post.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(post.date), "yyyy.MM.dd")}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </section>
      )}

      {activeSection === "likes" && (
        <section>
          <h2 className="text-xl font-semibold mb-2">❤️ 좋아요한 게시글</h2>
          {likedPosts.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              좋아요한 게시글이 없습니다.
            </p>
          ) : (
            likedPosts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4 space-y-1">
                  <p className="font-medium">{post.title}</p>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(post.date), "yyyy.MM.dd")}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </section>
      )}

      {activeSection === "comments" && (
        <section>
          <h2 className="text-xl font-semibold mb-2">💬 내가 쓴 댓글</h2>
          {comments.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              작성한 댓글이 없습니다.
            </p>
          ) : (
            comments.map((comment) => (
              <Card key={comment.id}>
                <CardContent className="p-4">
                  <p className="text-sm">{comment.content}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    작성일: {format(new Date(comment.createdAt), "yyyy.MM.dd")}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </section>
      )}
    </div>
  );
}
