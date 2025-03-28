export interface CreateCommentPayload {
  content: string;
  userId: number;
  postId: number;
}

export async function createComment(payload: CreateCommentPayload) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.message || "댓글 작성에 실패했습니다.");
    }

    return await res.json();
  } catch (err) {
    console.error("댓글 작성 에러:", err);
    throw err;
  }
}
