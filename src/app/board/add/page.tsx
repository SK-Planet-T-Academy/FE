"use client";

import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function NewPostPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    content: "",
    category: "", // 카테고리
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCategoryChange = (value: string) => {
    setForm((prev) => ({ ...prev, category: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.title || !form.content || !form.category) {
      alert("제목, 내용, 카테고리를 모두 입력해주세요.");
      return;
    }

    // 게시글 등록 로직 (추후 백엔드 연동)
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

        {/* 제목 입력 */}
        <Input
          name="title"
          placeholder="제목을 입력하세요"
          value={form.title}
          onChange={handleChange}
          required
        />

        {/* 카테고리 선택 */}
        <div className="space-y-2 relative z-10">
          <Label>카테고리</Label>
          <Select onValueChange={handleCategoryChange}>
            <SelectTrigger className="w-full relative z-10">
              <SelectValue placeholder="카테고리를 선택하세요" />
            </SelectTrigger>
            <SelectContent className="absolute z-[9999] top-full mt-1 bg-white border rounded shadow-md">
              <SelectItem value="잡담">잡담</SelectItem>
              <SelectItem value="QNA">QNA</SelectItem>
              <SelectItem value="복습">복습</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* 내용 입력 */}
        <div className="relative z-0">
          <Textarea
            name="content"
            placeholder="내용을 입력하세요"
            value={form.content}
            onChange={handleChange}
            rows={10}
            required
            className="relative z-0"
          />
        </div>

        {/* 버튼 */}
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
