export async function getPostById(postId: number) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/post/${postId}`,
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || "게시글 조회에 실패했습니다.");
    }

    return await res.json();
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error("게시글 조회 에러:", err.message);
      throw err;
    } else {
      throw new Error("알 수 없는 오류가 발생했습니다.");
    }
  }
}
