"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ko } from "date-fns/locale";

interface Post {
  id: number;
  title: string;
  content: string;
  date: string; // ISO 문자열
}

export default function BoardPage() {
  const router = useRouter();

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [showCalendar, setShowCalendar] = useState(false);

  const posts: Post[] = [
    {
      id: 1,
      title: "첫 번째 게시글",
      content: "게시판에 오신 것을 환영합니다!",
      date: "2025-03-26",
    },
    {
      id: 2,
      title: "두 번째 게시글",
      content: "이 게시판은 Next.js로 만들어졌어요.",
      date: "2024-03-27",
    },
    {
      id: 3,
      title: "오늘의 게시글",
      content: "오늘 등록된 게시글입니다.",
      date: format(new Date(), "yyyy-MM-dd"),
    },
  ];

  const filteredPosts = posts.filter(
    (post) =>
      format(new Date(post.date), "yyyy-MM-dd") ===
      format(selectedDate, "yyyy-MM-dd")
  );

  const toggleCalendar = () => setShowCalendar((prev) => !prev);

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
          {/* 🔽 게시글 목록 제목 + 날짜 선택 */}
          <div className="flex justify-between items-center flex-wrap gap-2">
            <h2 className="text-xl font-semibold">🗂️ 게시글 목록</h2>
            <div className="flex flex-col items-end relative">
              <button
                onClick={toggleCalendar}
                className="text-sm text-muted-foreground hover:text-gray-500"
              >
                📅
                {format(selectedDate, "yyyy년 MM월 dd일", { locale: ko })}
              </button>

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
            filteredPosts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">{post.title}</h3>
                    <span className="text-xs text-gray-500">
                      {format(new Date(post.date), "yyyy.MM.dd")}
                    </span>
                  </div>
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
