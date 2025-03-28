// src/api/comments/getByPostId.ts
export async function getCommentsByPostId(postId: number) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/comments/${postId}`
  );

  if (!res.ok) {
    throw new Error("댓글 조회에 실패했습니다.");
  }

  return await res.json();
}
