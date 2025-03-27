"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function NewPostPage() {
  const router = useRouter();
  const [form, setForm] = useState({ title: "", content: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.content) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    // TODO: 게시글 등록 로직 추가
    console.log("작성된 글:", form);

    router.push("/board");
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl space-y-4 bg-white p-6 rounded-xl shadow border"
      >
        <h1 className="text-2xl font-bold">📝 게시글 작성</h1>

        <Input
          name="title"
          placeholder="제목을 입력하세요"
          value={form.title}
          onChange={handleChange}
          required
        />

        <Textarea
          name="content"
          placeholder="내용을 입력하세요"
          value={form.content}
          onChange={handleChange}
          rows={10}
          required
        />

        <div className="flex justify-end space-x-2">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            취소
          </Button>
          <Button type="submit">등록</Button>
        </div>
      </form>
    </div>
  );
}
