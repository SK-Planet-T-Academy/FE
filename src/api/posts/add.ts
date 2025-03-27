export interface CreatePostPayload {
  title: string;
  content: string;
  category: string;
  userId: number;
}

export async function createPost(payload: CreatePostPayload) {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "게시글 등록에 실패했습니다.");
    }

    return await res.json();
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("게시글 등록 에러:", err.message);
      throw err;
    } else {
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  }
}
