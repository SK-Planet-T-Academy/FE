export async function getUserById(id: string | number) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/users/${id}`
    );

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(
        errorData.message || "유저 정보를 불러오는 데 실패했습니다."
      );
    }

    return await res.json();
  } catch (error) {
    console.error("유저 정보 조회 에러:", error);
    throw error;
  }
}
