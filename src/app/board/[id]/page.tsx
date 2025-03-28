// src/app/board/[id]/page.tsx
"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { getPostById } from "@/api/posts/getById";
import { createComment } from "@/api/comments/create";
import { updatePost } from "@/api/posts/update";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

interface Comment {
  commentId: number;
  postId: number;
  author: string;
  content: string;
  createdAt: string;
}

interface Post {
  postId: number;
  state: boolean;
  title: string;
  content: string;
  likesCount: number;
  commentsCount: number;
  viewsCount: number;
  user: {
    id: number;
    email: string;
    name: string;
    isLogin: boolean;
  };
  category: string;
  createdAt: string;
  updatedAt: string;
  comments: Comment[];
}

export default function PostDetailPage() {
  const { id } = useParams();
  const postId = Number(id);

  const [post, setPost] = useState<Post | null>(null);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [newComment, setNewComment] = useState({ content: "" });
  const [editMode, setEditMode] = useState(false);
  const [editForm, setEditForm] = useState({
    title: "",
    content: "",
    category: "",
  });

  const userId =
    typeof window !== "undefined" ? localStorage.getItem("id") : null;

  useEffect(() => {
    async function fetchPost() {
      try {
        const data = await getPostById(postId);
        setPost(data);
        setEditForm({
          title: data.title,
          content: data.content,
          category: data.category,
        });
      } catch (err) {
        console.error("게시글 조회 실패:", err);
      }
    }
    fetchPost();
  }, [postId]);

  const handleAddComment = async () => {
    if (!userId || !newComment.content) {
      alert("로그인 후 내용을 입력해주세요.");
      return;
    }

    try {
      const response = await createComment({
        content: newComment.content,
        userId: Number(userId),
        postId,
      });

      const addedComment: Comment = {
        commentId: response.commentId,
        postId,
        author: response.post.user.name,
        content: response.content,
        createdAt: response.create_at,
      };

      setPost((prev) =>
        prev
          ? { ...prev, comments: [...(prev.comments || []), addedComment] }
          : null
      );

      setNewComment({ content: "" });
      setShowCommentForm(false);
    } catch (err) {
      console.error("댓글 작성 실패:", err);
      alert("댓글 작성에 실패했습니다.");
    }
  };

  const handleUpdatePost = async () => {
    try {
      const response = await updatePost(postId, editForm);
      alert("게시글이 수정되었습니다.");
      setPost((prev) =>
        prev &&
        response &&
        typeof response === "object" &&
        !Array.isArray(response)
          ? {
              ...prev,
              ...(typeof response === "object" && !Array.isArray(response)
                ? response
                : {}),
            }
          : prev
      );
      setEditMode(false);
    } catch (err) {
      console.error("게시글 수정 실패:", err);
      alert("게시글 수정에 실패했습니다.");
    }
  };

  if (!post) {
    return (
      <p className="text-center mt-20 text-gray-500">
        게시글을 찾을 수 없습니다.
      </p>
    );
  }

  const isAuthor = userId && post.user.id === Number(userId);

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
      {editMode ? (
        <div className="space-y-4">
          <Input
            value={editForm.title}
            onChange={(e) =>
              setEditForm((prev) => ({ ...prev, title: e.target.value }))
            }
            placeholder="제목을 입력하세요"
          />
          <Textarea
            value={editForm.content}
            onChange={(e) =>
              setEditForm((prev) => ({ ...prev, content: e.target.value }))
            }
            rows={10}
          />
          <Input
            value={editForm.category}
            onChange={(e) =>
              setEditForm((prev) => ({ ...prev, category: e.target.value }))
            }
            placeholder="카테고리"
          />
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setEditMode(false)}>
              취소
            </Button>
            <Button onClick={handleUpdatePost}>저장</Button>
          </div>
        </div>
      ) : (
        <>
          <h1 className="text-3xl font-bold">{post.title}</h1>
          <p className="text-sm text-muted-foreground">
            작성자: {post.user.name} | 작성일:{" "}
            {format(new Date(post.createdAt), "yyyy.MM.dd")}
          </p>
          <p className="text-base text-gray-700 whitespace-pre-line">
            {post.content}
          </p>
          {isAuthor && (
            <div className="flex justify-end">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditMode(true)}
              >
                게시글 수정
              </Button>
            </div>
          )}
        </>
      )}

      <hr />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">💬 댓글</h2>
          {!isAuthor && (
            <Button
              size="sm"
              onClick={() => setShowCommentForm((prev) => !prev)}
            >
              {showCommentForm ? "취소" : "댓글 작성하기"}
            </Button>
          )}
        </div>

        {!isAuthor && showCommentForm && (
          <div className="space-y-2 border p-4 rounded-md">
            <Textarea
              placeholder="댓글을 입력하세요"
              value={newComment.content}
              onChange={(e) =>
                setNewComment((prev) => ({ ...prev, content: e.target.value }))
              }
              rows={4}
            />
            <div className="flex justify-end">
              <Button size="sm" onClick={handleAddComment}>
                등록
              </Button>
            </div>
          </div>
        )}

        {post.comments?.length === 0 ? (
          <p className="text-sm text-muted-foreground">댓글이 없습니다.</p>
        ) : (
          post.comments?.map((comment) => (
            <Card key={comment.commentId}>
              <CardContent className="py-2 space-y-1">
                <p className="text-sm font-medium">{comment.author}</p>
                <p className="text-sm text-gray-600">{comment.content}</p>
                <p className="text-xs text-gray-400">
                  작성일: {format(new Date(comment.createdAt), "yyyy.MM.dd")}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
