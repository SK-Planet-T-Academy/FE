"use client";

import { useParams } from "next/navigation";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { posts, comments, Post, Comment } from "@/data/posts";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";

export default function PostDetailPage() {
  const params = useParams();
  const postId = Number(params.id);

  const [post, setPost] = useState<Post | null>(null);
  const [relatedComments, setRelatedComments] = useState<Comment[]>([]);
  const [showCommentForm, setShowCommentForm] = useState(false);
  const [newComment, setNewComment] = useState({
    author: "",
    content: "",
  });

  useEffect(() => {
    const foundPost = posts.find((p) => p.id === postId);
    const filteredComments = comments.filter((c) => c.postId === postId);
    setPost(foundPost ?? null);
    setRelatedComments(filteredComments);
  }, [postId]);

  const handleAddComment = () => {
    if (!newComment.author || !newComment.content) {
      alert("작성자와 내용을 모두 입력해주세요.");
      return;
    }

    const newCommentData: Comment = {
      id: Math.floor(Math.random() * 100000),
      postId,
      author: newComment.author,
      content: newComment.content,
      createdAt: new Date().toISOString(),
    };

    setRelatedComments((prev) => [...prev, newCommentData]);
    setNewComment({ author: "", content: "" });
    setShowCommentForm(false);
  };

  if (!post) {
    return (
      <p className="text-center mt-20 text-gray-500">
        게시글을 찾을 수 없습니다.
      </p>
    );
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-10 space-y-6">
      <h1 className="text-3xl font-bold">{post.title}</h1>
      <p className="text-sm text-muted-foreground">
        작성자: {post.author} | 작성일:{" "}
        {format(new Date(post.date), "yyyy.MM.dd")}
      </p>
      <p className="text-base text-gray-700 whitespace-pre-line">
        {post.content}
      </p>

      <hr />

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">💬 댓글</h2>
          <Button size="sm" onClick={() => setShowCommentForm((prev) => !prev)}>
            {showCommentForm ? "취소" : "댓글 작성하기"}
          </Button>
        </div>

        {showCommentForm && (
          <div className="space-y-2 border p-4 rounded-md">
            <Input
              placeholder="작성자"
              value={newComment.author}
              onChange={(e) =>
                setNewComment((prev) => ({ ...prev, author: e.target.value }))
              }
            />
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

        {relatedComments.length === 0 ? (
          <p className="text-sm text-muted-foreground">댓글이 없습니다.</p>
        ) : (
          relatedComments.map((comment) => (
            <Card key={comment.id}>
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
