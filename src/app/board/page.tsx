"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ko } from "date-fns/locale";
import { Eye, Heart, HeartIcon } from "lucide-react";

interface Post {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  views: number;
  likes: number;
}

export default function BoardPage() {
  const router = useRouter();
  const userId = "user123"; // 임시 사용자 ID

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);
  const [likeModal, setLikeModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [likedMap, setLikedMap] = useState<Record<number, Set<string>>>({});

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      title: "첫 번째 게시글",
      content: "게시판에 오신 것을 환영합니다!",
      date: "2025-03-26",
      author: "홍길동",
      views: 120,
      likes: 15,
    },
    {
      id: 2,
      title: "두 번째 게시글",
      content: "이 게시판은 Next.js로 만들어졌어요.",
      date: "2024-03-27",
      author: "김영희",
      views: 85,
      likes: 8,
    },
    {
      id: 3,
      title: "오늘의 게시글",
      content: "오늘 등록된 게시글입니다.",
      date: format(new Date(), "yyyy-MM-dd"),
      author: "이철수",
      views: 22,
      likes: 4,
    },
  ]);

  const toggleCalendar = () => setShowCalendar((prev) => !prev);

  const filteredPosts = posts.filter(
    (post) =>
      format(new Date(post.date), "yyyy-MM-dd") ===
      format(selectedDate, "yyyy-MM-dd")
  );

  const handleLike = (postId: number) => {
    const isLiked = likedMap[postId]?.has(userId);

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id !== postId) return post;
        return {
          ...post,
          likes: isLiked ? post.likes - 1 : post.likes + 1,
        };
      })
    );

    setLikedMap((prev) => {
      const updated = { ...prev };
      if (!updated[postId]) updated[postId] = new Set();
      if (isLiked) {
        updated[postId].delete(userId);
      } else {
        updated[postId].add(userId);
      }
      return updated;
    });

    setModalMessage(
      isLiked ? "좋아요가 취소되었습니다." : "좋아요가 등록되었습니다!"
    );
    setLikeModal(true);
  };

  return (
    <div className="min-h-screen px-4 py-10 bg-gray-50">
      <div className="max-w-2xl mx-auto space-y-6 pb-20">
        <h1 className="text-3xl font-bold text-center">📋 게시판</h1>

        <div className="space-y-4">
          <div className="flex justify-between items-center flex-wrap gap-2">
            <h2 className="text-xl font-semibold">🗂️ 게시글 목록</h2>
            <div className="flex flex-col items-end relative">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleCalendar}
                className="text-muted-foreground"
              >
                📅 {format(selectedDate, "yyyy년 MM월 dd일", { locale: ko })}
              </Button>

              {showCalendar && (
                <div className="absolute top-full mt-2 z-50">
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      if (date) {
                        setSelectedDate(date);
                        setShowCalendar(false);
                      }
                    }}
                    locale={ko}
                    formatters={{
                      formatCaption: (month) =>
                        format(month, "yyyy년 M월", { locale: ko }),
                    }}
                    className="rounded-md border bg-white shadow"
                  />
                </div>
              )}
            </div>
          </div>

          {filteredPosts.length === 0 ? (
            <p className="text-muted-foreground">
              선택된 날짜에 게시글이 없습니다.
            </p>
          ) : (
            filteredPosts.map((post) => {
              const isLiked = likedMap[post.id]?.has(userId);
              return (
                <Card
                  key={post.id}
                  className="transition-all duration-300 hover:shadow-lg hover:scale-[1.01]"
                >
                  <CardContent className="p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <h3 className="font-bold text-lg">{post.title}</h3>
                      <span className="text-xs text-gray-500">
                        {format(new Date(post.date), "yyyy.MM.dd")}
                      </span>
                    </div>

                    <p className="text-sm text-gray-600">{post.content}</p>

                    <div className="flex justify-between items-center text-sm text-muted-foreground">
                      <span>작성자: {post.author}</span>
                      <div className="flex items-center gap-3">
                        <span className="flex items-center gap-1">
                          <Eye className="w-4 h-4" />
                          {post.views}
                        </span>
                        <button
                          onClick={() => handleLike(post.id)}
                          className="flex items-center gap-1 hover:text-red-500 transition"
                        >
                          <Heart
                            className={`w-4 h-4 ${
                              isLiked ? "fill-red-500 text-red-500" : ""
                            }`}
                          />
                          {post.likes}
                        </button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>

      <Button
        onClick={() => router.push("/board/add")}
        className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 text-base shadow-md"
      >
        + 게시글 작성
      </Button>

      <Dialog open={likeModal} onOpenChange={setLikeModal}>
        <DialogContent className="text-center animate-pulse text-base">
          <DialogTitle className="sr-only">좋아요 알림</DialogTitle>
          {modalMessage}
        </DialogContent>
      </Dialog>
    </div>
  );
}
