export interface UpdatePostPayload {
  title: string;
  content: string;
  category: string;
}

export async function updatePost(postId: number, payload: UpdatePostPayload) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/post/${postId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    if (!res.ok) {
      const text = await res.text();
      throw new Error(`게시글 수정 실패: ${text || res.statusText}`);
    }

    // 응답이 비어 있을 수 있으니 json 파싱 X
    return true;
  } catch (error) {
    console.error("게시글 수정 에러:", error);
    throw error;
  }
}
